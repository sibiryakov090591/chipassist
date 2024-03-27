import React, { useState, useEffect } from "react";
import { Button, Box, Hidden, CircularProgress, Tooltip } from "@material-ui/core";
import Sticky from "react-sticky-el";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Preloader from "@src/components/Preloader/Preloader";
import { ExistingCartItem, PriceRange } from "@src/store/cart/cartTypes";
import useAppTheme from "@src/theme/useAppTheme";
import list_icon from "@src/images/Icons/list-1.svg";
import { getImage, isProductAvailable } from "@src/utils/product";
import { useSocketClient } from "@src/services/SocketClient";
import FiltersContainer, { FilterResultsBar } from "@src/components/FiltersBar";
import { DataBody, DataField, DataHeader, DataRow, DataTable, DataValue } from "@src/components/DataTable/DataTable";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import CartItemVer2 from "@src/views/chipassist/Cart/components/CartItems/CartItem/CartItemVer2";
import ConfirmRequestModal from "@src/views/chipassist/Cart/components/ConfirmRequestModal/ConfirmRequestModal";
import HelpIcon from "@material-ui/icons/Help";
import { useStyles } from "./cartItemsStyles";

const CartItemsVer2 = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("cart");
  const socketClient = useSocketClient("search");

  const cart_loaded = useAppSelector((state) => state.cart.itemsLoaded);
  const cart = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const itemsUpdating = useAppSelector((state) => state.cart.itemsUpdating);
  const inProgress = useAppSelector((state) => state.checkout.inProgress);

  const [errors, setErrors] = useState<ExistingCartItem["errors"]>([]);
  const [cartItems, setCartItems] = useState<ExistingCartItem[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    const items: ExistingCartItem[] = [];
    cart.items.forEach((item) => {
      const priceRange: PriceRange = { from: null, to: null, fromCurrency: null, toCurrency: null };
      const sellers: string[] = [];

      if (item.product.stockrecords?.length) {
        item.product.stockrecords.forEach((sr) => {
          // Price range
          sr.prices.forEach((price) => {
            if (!priceRange.from || (priceRange.from && priceRange.from > price.price)) {
              priceRange.from = price.price;
              priceRange.fromCurrency = sr.price_currency;
            }
            if (!priceRange.to || (priceRange.to && priceRange.to < price.price)) {
              priceRange.to = price.price;
              priceRange.toCurrency = sr.price_currency;
            }
          });
          // Sellers
          const currentName = isProductAvailable(sr) ? sr.partner_name : "Eastern Asia";
          if (!sellers.find((name) => name === currentName)) {
            sellers.push(currentName);
          }
        });
      }

      const itemData: ExistingCartItem = {
        basket_id: cart.info.id,
        id: item.product.id,
        lineId: item.id,
        manufacture: {
          id: item.product.manufacturer ? item.product.manufacturer.id : null,
          name: item.product.manufacturer ? item.product.manufacturer.name : "",
        },
        description: item.product.description,
        img: getImage(item.product),
        quantity: item.quantity,
        url: `/product/${encodeURIComponent(item.product.upc)}/${
          item.product.stockrecords[0]?.id ? item.product.stockrecords[0]?.id : `?productId=${item.product.id}`
        }`,
        upc: item.product.upc,
        stockrecord: item.stockrecord,
        numInStock: item.product.stockrecords?.reduce((acc, sr) => acc + sr.num_in_stock, 0),
        errors,
        handleSetErrors,
        rfq: item.rfq,
        isUpdating: cart.itemsUpdating.includes(item.id),
        isRemoving: cart.itemsRemoving.includes(item.id),
        isAuthenticated,
        dateUpdated: item.date_updated,
        priceRange,
        sellers,
      };

      items.push(itemData);
    });
    setCartItems(items);
  }, [cart.items, itemsUpdating, errors]);

  const handleCheckoutOpen = () => {
    setOpenConfirmModal(true);
  };

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

  const OrderBtn = (
    <Button
      variant="contained"
      color="secondary"
      className={clsx(classes.checkout, appTheme.buttonCreate)}
      onClick={handleCheckoutOpen}
      disabled={
        !!errors?.filter((v) => v.rfq === 0 || (v.rfq === 1 && v.field === "quantity")).length ||
        !cartItems.length ||
        !cart_loaded ||
        inProgress
      }
    >
      {inProgress && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
      {t("common.rfq_submit")}
    </Button>
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Hidden xsDown>
          <img className={classes.listIcon} src={list_icon} alt="List icon" />
        </Hidden>
        <div>
          <h1 style={{ marginBottom: 5 }} className={commonClasses.pageTitle}>
            {t("header")}
          </h1>
          <div className={classes.description}>{t("header_description")}</div>
        </div>
      </Box>
      {!!cartItems.length && (
        <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
          <FiltersContainer>
            <FilterResultsBar count={cart?.count || 0} />
            <FilterCurrency />
          </FiltersContainer>
        </div>
      )}

      {((cart_loaded && !!cartItems.length) || (!cartItems.length && cart.total_pages > 1)) && (
        <React.Fragment>
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
              <div className={classes.stickyTotalRight}>{OrderBtn}</div>
            </Sticky>
          )}
          <DataTable
            className={clsx(classes.itemsContainer, appTheme.table)}
            gridClass={classes.itemsGridVer2}
            gridAreasBreakpoint="sm"
            gridLabelsBreakpoint="sm"
          >
            <DataHeader>
              <DataRow>
                <DataField
                  className={`${classes.headerProduct} ${classes.alignCenter} ${classes.justifyContentStart}`}
                  gridArea="product"
                >
                  <DataValue>{t("column.product")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="manufacturer">
                  <DataValue>Производители</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="stock">
                  <DataValue>На складе</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="sellers">
                  <DataValue>
                    <Box display="flex" alignItems="center">
                      Продавцы
                      <Tooltip
                        enterTouchDelay={1}
                        classes={{ tooltip: commonClasses.tooltip }}
                        title={
                          <div>{`${
                            constants.title || "ICSearch"
                          } автоматически запросит цены на этот продукт у всех подключенных поставщиков`}</div>
                        }
                      >
                        <HelpIcon style={{ marginLeft: 5, fontSize: 16 }} />
                      </Tooltip>
                    </Box>
                  </DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="price">
                  <DataValue>Диапазон цен</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="qty">
                  <DataValue>{t("column.qty")}</DataValue>
                </DataField>
                <DataField className={`${classes.headerProduct} ${classes.alignCenter}`} gridArea="actions" />
              </DataRow>
            </DataHeader>

            <DataBody>
              {cart_loaded &&
                cartItems.map((item) => <CartItemVer2 data={item} key={item.lineId} socketClient={socketClient} />)}
              {!cart_loaded && (
                <div className={classes.tableContentWhiteSpace}>
                  <Preloader title={t("pcb.opening_page")} />
                </div>
              )}
            </DataBody>
          </DataTable>
        </React.Fragment>
      )}
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
      {!!cartItems.length && <div className={classes.checkoutRow}>{OrderBtn}</div>}

      {openConfirmModal && <ConfirmRequestModal onClose={() => setOpenConfirmModal(false)} />}
    </>
  );
};

export default CartItemsVer2;
