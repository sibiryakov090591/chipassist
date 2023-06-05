import React, { useState, useEffect, useMemo } from "react";
import { Button, Box, CircularProgress } from "@material-ui/core";
import Sticky from "react-sticky-el";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import clsx from "clsx";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Preloader from "@src/components/Preloader/Preloader";
import { updateCartItem } from "@src/store/cart/cartActions";
import { ExistingCartItem } from "@src/store/cart/cartTypes";
import useAppTheme from "@src/theme/useAppTheme";
import { getCostAndQuantity, getImage } from "@src/utils/product";
// import Alert from "@material-ui/lab/Alert";
// import { invokeRestTransport, invokeWebsocketTransport } from "@src/services/useTransport";
import { useSocketClient } from "@src/services/SocketClient";
import { formatMoney } from "@src/utils/formatters";
import FiltersContainer, { FilterResultsBar } from "@src/components/FiltersBar";
import { DataBody, DataField, DataHeader, DataRow, DataTable, DataValue } from "@src/components/DataTable/DataTable";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { getTotalPrices } from "@src/utils/cart";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import ConfirmRequestModal from "@src/views/chipassist/Cart/components/ConfirmRequestModal/ConfirmRequestModal";
import CartItem from "./CartItem/CartItem";
// import { useStyles as useCartPayStyles } from "../CartPay/cartPayStyles";
import { useStyles } from "./cartItemsStyles";

// type OrderType = "order" | "rfq";

// const setCartListUrl = (history: any, page: number, pageSize: number) => {
//   const params: any[] = [];
//   if (page) {
//     params.push(`page=${page}`);
//   }
//   if (pageSize) {
//     params.push(`page_size=${pageSize}`);
//   }
//   navigate({
//     pathname: "/cart",
//     search: params.length ? `?${params.join("&")}` : "",
//   });
// };

const CartItems = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  // const cartPayClasses = useCartPayStyles();
  const appTheme = useAppTheme();
  const { currency, currencyPrice } = useCurrency();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");
  const socketClient = useSocketClient("search");

  const serviceTax = useAppSelector((state) => state.checkout.serviceTax);
  const cart_loaded = useAppSelector((state) => state.cart.itemsLoaded);
  const cart = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const itemsUpdating = useAppSelector((state) => state.cart.itemsUpdating);
  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const inProgress = useAppSelector((state) => state.checkout.inProgress);

  const [errors, setErrors] = useState<ExistingCartItem["errors"]>([]);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [cartItems, setCartItems] = useState<ExistingCartItem[]>([]);
  const [cost, setCost] = useState<number>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  // const [isShowMinCostHint, setIsShowMinCostHint] = useState(false);
  const showCost = useMemo(() => {
    if (!cartItems) return false;
    return cartItems.some((i) => !i.rfq);
  }, [cartItems]);

  // const isShowMinTax = useMemo(() => [ID_MASTER, ID_CHIPASSIST, ID_ELFARO].includes(constants.id), []);
  // const isShowMinCost = useMemo(() => [ID_MASTER, ID_CHIPASSIST, ID_ELFARO].includes(constants.id), []);
  // const params = new URLSearchParams(location.search);
  // const storageKey = "cartShowBy";
  // const page = params.get("page") ? parseInt(params.get("page")) : 1;

  // const pageSize = params.get("page_size")
  //   ? parseUrlParam(`${parseInt(params.get("page_size")) || _pageSize}`)
  //   : localStorage.getItem(`${storageKey}`) || _pageSize;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isShowMinCost && showCost && cost) {
  //     const total = getTotalPrices(cost, serviceTax, currencyPrice).result;
  //     setIsShowMinCostHint(total < currencyPrice(100, "EUR"));
  //   }
  // }, [cost, isShowMinCost, showCost, serviceTax]);

  useEffect(() => {
    const items: ExistingCartItem[] = [];
    cart.items.forEach((item) => {
      const duplicateItem = cart.items.filter(
        (i) => i.stockrecord?.id === item.stockrecord?.id && !i.rfq && !!item.rfq,
      );

      const itemData: ExistingCartItem = {
        basket_id: cart.info.id,
        id: item.product.id,
        lineId: item.id,
        name: `${item.product.manufacturer ? item.product.manufacturer.name : "" || ""} ${item.product.upc}`,
        description: item.product.description,
        img: getImage(item.product),
        quantity: item.quantity,
        attribute: (!!item.attributes?.length && item.attributes[0].value) || null,
        url: `/product/${encodeURIComponent(item.product.upc)}/${
          constants.id === ID_ELFARO ? item.stockrecord?.id : item.product.id
        }/`,
        upc: item.product.upc,
        stockrecord: item.stockrecord,
        isDuplicate: !!duplicateItem[0],
        numInStock: duplicateItem[0]
          ? duplicateItem[0].stockrecord?.num_in_stock - duplicateItem[0].quantity
          : item.stockrecord?.num_in_stock,
        errors,
        handleSetErrors,
        rfq: item.rfq,
        isUpdating: cart.itemsUpdating.includes(item.id),
        isRemoving: cart.itemsRemoving.includes(item.id),
        isAuthenticated,
        dateUpdated: item.date_updated,
      };

      items.push(itemData);
    });

    setCartItems(items);
    setShowUpdateAlert(
      cart.items
        .filter((v) => !v.rfq)
        .some((v) => {
          const stockrecordErrors = v.stockrecord?.errors?.filter((err) => Number(err?.id) !== 4);
          return !!stockrecordErrors && !!stockrecordErrors.length;
        }),
    );
  }, [cart.items, itemsUpdating, errors]);

  useEffect(() => {
    const res = cart.items
      // .filter((v) => !v.rfq && !v.stockrecord.low_stock_threshold)
      .filter((v) => !v.rfq)
      .reduce((acc, item) => {
        const { price } = getCostAndQuantity(item.quantity, item.stockrecord);
        return acc + currencyPrice(price.price || null, item.stockrecord?.price_currency) * item.quantity;
      }, 0);
    setCost(res);
  }, [cart.items, currency, currencyList]);

  const handleCheckoutOpen = () => {
    // if (isAuthenticated) {
    //   dispatch(openCheckout());
    //   dispatch(authUserProfile());
    // } else {
    //   // localStorage.setItem("previousLocation", "/cart");
    //   navigate({
    //     pathname: prevEmail ? "/auth/login" : "/auth/registration",
    //     state: { background: location.state?.background || location },
    //   });
    // }
    setOpenConfirmModal(true);
  };

  // const onPageChangeHandle = (data: any) => {
  //   setUrl(history, "/cart", data.selected + 1, pageSize);
  //   dispatch(getCartItems(cart.info.id, data.selected + 1, pageSize));
  // };

  const handleSetErrors: ExistingCartItem["handleSetErrors"] = (
    id,
    field,
    message,
    rfq,
    isRemoveOne = false,
    isRemoveAll = false,
  ) => {
    if (isRemoveOne) {
      return setErrors((prevState) => [...prevState].filter((val) => val.id !== id || val.field !== field));
    }

    if (isRemoveAll) {
      return setErrors((prevState) => [...prevState].filter((val) => val.id !== id));
    }
    return setErrors((prevState) => [...prevState.filter((val) => val.id !== id), { id, field, message, rfq }]);
  };

  const handleMoveToRfq = (item: ExistingCartItem) => {
    dispatch(updateCartItem(item.basket_id, item.lineId, { rfq: 1 }));
    setErrors((prevState) => [...prevState].filter((val) => val.id !== item.lineId));
  };

  const handleMoveToOrder = (item: ExistingCartItem) => {
    dispatch(updateCartItem(item.basket_id, item.lineId, { rfq: 0 }));
  };

  const getStockErrors = useMemo(() => {
    return cart.items
      .filter((v) => !v.rfq)
      .reduce((acc, item) => {
        return acc + (item.stockrecord?.errors?.length || 0);
      }, 0);
  }, [cart.items]);

  // const reloadList = (page_size: number, in_page: number) => {
  //   const new_page = in_page || page;
  //   setCartListUrl(history, new_page, page_size);
  //   dispatch(getCartItems(cart.info.id, new_page, page_size));
  // };

  // const handleUpdateProducts = () => {
  //   cartItems
  //     .filter((v) => !!v.stockrecord.errors?.length)
  //     .forEach((v) => {
  //       invokeWebsocketTransport(() => {
  //         dispatch(productUpdateStart(v.lineId));
  //         socketClient.onMessage((data: any) => {
  //           dispatch(productUpdateSave(data, v.lineId));
  //         });
  //         socketClient.send({ upc: [v.upc], page_size: 700 });
  //       });

  //       invokeRestTransport(() => {
  //         dispatch(productUpdateThunk(v.lineId));
  //       });
  //     });
  // };

  const OrderBtn = (
    <Button
      variant="contained"
      color="secondary"
      className={clsx(classes.checkout, appTheme.buttonCreate)}
      onClick={handleCheckoutOpen}
      disabled={
        !!errors?.filter((v) => v.rfq === 0 || (v.rfq === 1 && v.field === "quantity")).length ||
        !!getStockErrors ||
        !cartItems.length ||
        !cart_loaded ||
        inProgress
      }
    >
      {inProgress && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
      {t("checkout")}
    </Button>
  );

  return (
    <>
      <h1 className={commonClasses.pageTitle}>{t("header")}</h1>
      <div>{t("header_description")}</div>
      <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
        <FiltersContainer>
          <FilterResultsBar count={cart?.count || 0} />
          <FilterCurrency />
        </FiltersContainer>
      </div>

      {((cart_loaded && !!cartItems.length) || (!cartItems.length && cart.total_pages > 1)) && (
        <React.Fragment>
          {/* <Hidden only={["xs", "sm"]}> */}
          {/*  <div className={classes.descStatus}> */}
          {/*    <StatusChip isRfq={false} /> */}
          {/*    <span>{t("order_header")}</span> */}
          {/*  </div> */}
          {/*  <div className={classes.descStatus}> */}
          {/*    <StatusChip isRfq={true} /> */}
          {/*    <span>{t("rfq_header")}</span> */}
          {/*  </div> */}
          {/* </Hidden> */}
          {cartItems.length > 7 && (
            <Sticky
              className={classes.stickyTotalHide}
              stickyClassName={`${classes.stickyTotal} ${constants.id === ID_ELFARO ? classes.stickyTotalElfaro : ""}`}
            >
              <div>
                <div className={classes.stickyTotalCost}>{t("total_cost")}:</div>
                <div>{t("total_order_desc")}</div>
                <div>{t("total_rfq_desc")}</div>
              </div>
              <div className={classes.stickyTotalRight}>
                {/* {!!serviceTax && ( */}
                {/*  <div className={classes.stickyTotalTax}> */}
                {/*    {t("order.service_fee", { tax: serviceTax })} */}
                {/*    {isShowMinTax && <span>{` (min ${formatMoney(currencyPrice(20, "EUR"))}${currency.symbol})`}</span>} */}
                {/*    :{" "} */}
                {/*    <strong> */}
                {/*      {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).tax || 0)} {currency.symbol} */}
                {/*    </strong> */}
                {/*  </div> */}
                {/* )} */}
                <div>
                  {t("column.total")}:{" "}
                  <strong>
                    {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).result || 0)} {currency.symbol}
                  </strong>
                  {!!serviceTax && <span> {t("column.service_fee")}</span>}
                </div>
                {OrderBtn}
              </div>
            </Sticky>
          )}
          {/* {showUpdateAlert && (
            <Alert
              icon={false}
              variant="filled"
              severity="warning"
              classes={{ root: classes.updateAlert, message: classes.alertMessage }}
            >
              <span>{t("products_update")}</span>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.updateAlertBtn}
                onClick={handleUpdateProducts}
                disabled={!!itemsUpdating.length}
              >
                {t("bom.edit.update_products")}
              </Button>
            </Alert>
          )} */}
          <DataTable
            className={clsx(classes.itemsContainer, appTheme.table)}
            gridClass={classes.itemsGrid}
            gridAreasBreakpoint="sm"
            gridLabelsBreakpoint="sm"
          >
            <DataHeader>
              <DataRow>
                <DataField className={`${classes.headerProduct}`} gridArea="product">
                  <DataValue>{t("column.product")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="distributor">
                  <DataValue>{t("column.distributor")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="lead">
                  <DataValue>{t("column.lead_time")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="moq">
                  <DataValue>{t("distributor.moq")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="stock">
                  <DataValue>{t("column.stock")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="price">
                  <DataValue>{t("column.price")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="qty">
                  <DataValue>{t("column.qty")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="total">
                  <DataValue>{t("column.total")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct}`} gridArea="actions" />
              </DataRow>
            </DataHeader>

            <DataBody>
              {cart_loaded &&
                cartItems
                  .filter((v) => !v.rfq)
                  .map((item) => (
                    <CartItem
                      data={item}
                      key={item.lineId}
                      moveToRfqHandler={handleMoveToRfq}
                      moveToOrderHandler={handleMoveToOrder}
                      socketClient={socketClient}
                      showUpdateButton={showUpdateAlert}
                    />
                  ))}
              {cart_loaded &&
                cartItems
                  .filter((v) => !!v.rfq)
                  .map((item) => (
                    <React.Fragment key={item.lineId}>
                      <CartItem
                        data={item}
                        key={item.lineId}
                        moveToRfqHandler={handleMoveToRfq}
                        moveToOrderHandler={handleMoveToOrder}
                        socketClient={socketClient}
                        showUpdateButton={showUpdateAlert}
                      />
                    </React.Fragment>
                  ))}
              {!cart_loaded && (
                <div className={classes.tableContentWhiteSpace}>
                  <Preloader title={t("pcb.opening_page")} />
                </div>
              )}
            </DataBody>
          </DataTable>
          <div className={classes.estRow}>
            <div></div>
            {showCost && (
              <div className={classes.estC}>
                {/* {!!serviceTax && ( */}
                {/*  <div className={classes.estTax}> */}
                {/*    {t("order.service_fee", { tax: serviceTax })} */}
                {/*    {isShowMinTax && <span>{` (min ${formatMoney(currencyPrice(20, "EUR"))}${currency.symbol})`}</span>} */}
                {/*    :{" "} */}
                {/*    <strong> */}
                {/*      {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).tax || 0)} {currency.symbol} */}
                {/*    </strong> */}
                {/*  </div> */}
                {/* )} */}
                <div className={classes.estTotal}>
                  {t("column.total")}:{" "}
                  <strong>
                    {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).result || 0)} {currency.symbol}
                  </strong>
                  {!!serviceTax && <span> {t("column.service_fee")}</span>}
                </div>
                {/* {isShowMinCostHint && ( */}
                {/*  <div className={clsx(cartPayClasses.minCost, classes.estTotal)}> */}
                {/*    {t("min_cost")} */}
                {/*    <strong>100€</strong> */}
                {/*  </div> */}
                {/* )} */}
                <ul className={classes.estTotalHint}>
                  {!!serviceTax && <li>{t("total_hint_1", { num: serviceTax })}</li>}
                  <li>{t("total_hint_2")}</li>
                </ul>
              </div>
            )}
          </div>
        </React.Fragment>
      )}

      {/* {cart_loaded && cart.total_pages > 1 && (
        <Box p={4} display="flex" justifyContent="center">
          <Paginate pageCount={cart.total_pages} activePage={page} onPageChange={onPageChangeHandle} />
        </Box>
      )} */}
      {cart_loaded && !cartItems.length && (
        <div className={classes.empty}>
          {t("empty_1")} <Link to={constants.id === ID_ELFARO ? "/" : "/search"}> {t("empty_2")} </Link> {t("empty_3")}
        </div>
      )}
      {!cart_loaded && (
        <Box>
          <br />
          <br />
          <Preloader title={t("loading")} />
        </Box>
      )}
      {/* {showCost && */}
      {/*  cart_loaded && */}
      {/*  !!cartItems.length && */}
      {/*  getTotalPrices(cost, serviceTax, currencyPrice).result < */}
      {/*    currencyPrice(constants.id === ID_ICSEARCH ? 100 : 1000, constants.id === ID_ICSEARCH ? "USD" : "EUR") && ( */}
      {/*    <div className={classes.deliveryHintWrapper}> */}
      {/*      <div className={classes.deliveryHint}>{t("delivery_hint")}</div> */}
      {/*    </div> */}
      {/*  )} */}
      {!!cartItems.length && <div className={classes.checkoutRow}>{OrderBtn}</div>}
      {openConfirmModal && <ConfirmRequestModal onClose={() => setOpenConfirmModal(false)} />}
    </>
  );
};

export default CartItems;
