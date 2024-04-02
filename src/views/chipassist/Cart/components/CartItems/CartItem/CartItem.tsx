import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
// import Select from "react-select";
import clsx from "clsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Tooltip, CircularProgress, Hidden, Box, Button } from "@material-ui/core";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import { getDateLag } from "@src/utils/date";
// import { invokeRestTransport, invokeWebsocketTransport } from "@src/services/useTransport";
import { NumberInput } from "@src/components/Inputs";
// import Dropdown from "@src/components/FiltersSelect/dropdown";
import { ExistingCartItem } from "@src/store/cart/cartTypes";
import {
  updateCartItem,
  // updateAuthCartItem,
  removeCartItem,
  // productUpdateStart,
  // productUpdateSave,
  // productUpdateThunk,
} from "@src/store/cart/cartActions";
import useAppTheme from "@src/theme/useAppTheme";
import { getCostAndQuantity, getPrice, isProductAvailable, validateQuantity } from "@src/utils/product";
import useDebounce from "@src/hooks/useDebounce";
import { formatMoney } from "@src/utils/formatters";
import { Stockrecord } from "@src/store/products/productTypes";
import InfoIcon from "@src/components/Icons/InfoIcon";
import { DataField, DataLabel, DataRow, DataValue } from "@src/components/DataTable/DataTable";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import placeholderImg from "@src/images/cpu.png";
// import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles as useCartItemsStyles } from "@src/views/chipassist/Cart/components/CartItems/cartItemsStyles";
import { useStyles } from "./cartItemStyles";
// import ItemErrors from "./components/ItemErrros";
// import ItemValid from "./components/ItemValid";

const CartItem = (props: {
  data: ExistingCartItem;
  moveToRfqHandler: (item: ExistingCartItem) => void;
  moveToOrderHandler: (item: ExistingCartItem) => void;
  socketClient: any;
  showUpdateButton: boolean;
}) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const cartItemsClasses = useCartItemsStyles();
  // const { socketClient } = props;
  const {
    basket_id,
    lineId,
    img,
    // name,
    // manufacture,
    stockrecord,
    description,
    // attribute,
    url,
    upc,
    quantity,
    isUpdating,
    isRemoving,
    // isDuplicate,
    // numInStock,
    errors,
    handleSetErrors,
    // isAuthenticated,
    rfq,
    // dateUpdated,
  } = props.data;
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");
  const { currency, currencyPrice } = useCurrency();

  // const sellers = useAppSelector((state) => state.sellers.items);
  // const countries = useAppSelector((state) => state.checkout.countries);

  // const [dynamicMoq, setDynamicMoq] = useState(0);
  const [mainImg, setMainImg] = useState(img);
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [sortedPrices, setSortedPrices] = useState<Stockrecord["prices"]>([]);
  // const [sellerData, setSellerData] = useState<{ [key: string]: any }>(null);

  const debouncedQuantityValue = useDebounce(quantityValue, 500);

  useEffect(() => {
    if (debouncedQuantityValue) {
      // const qtyLessMoq = debouncedQuantityValue < dynamicMoq;
      // if (!rfq && qtyLessMoq) {
      //   setQuantityValue(dynamicMoq);
      // }
      if (debouncedQuantityValue !== quantity) {
        // const qty = !rfq && qtyLessMoq ? dynamicMoq : debouncedQuantityValue;
        const qty = debouncedQuantityValue;
        // const { price } = getCostAndQuantity(!rfq && qtyLessMoq ? dynamicMoq : debouncedQuantityValue, stockrecord);
        const { price } = getCostAndQuantity(debouncedQuantityValue, stockrecord);
        const qtyError = validateQuantity(qty, stockrecord);
        if (!qtyError) {
          dispatch(
            updateCartItem(basket_id, lineId, {
              quantity: qty,
              price: price.id,
            }),
          );
        }
      }
    }
  }, [debouncedQuantityValue]);

  // useEffect(() => {
  //   if (sellers?.length && stockrecord) {
  //     const seller = sellers.find((i) => i.id === stockrecord.partner);
  //     const country = seller && countries.find((i) => i.iso_3166_1_a3 === seller.country);
  //     if (seller) {
  //       setSellerData({ ...seller, ...(country && { country }) });
  //     }
  //   }
  // }, [sellers, stockrecord]);

  useEffect(() => {
    if (stockrecord) {
      // const errorText = stockrecord.num_in_stock > 0 ? null : t("distributor.out_stock");
      //
      // if (errorText && !rfq) {
      //   handleSetErrors(lineId, "out_of_stock", errorText, rfq);
      // } else {
      //   handleSetErrors(lineId, "out_of_stock", null, rfq, true);
      // }
      //
      // if (stockrecord.errors?.length && !rfq) {
      //   handleSetErrors(lineId, "no_prices", t("distributor.no_prices"), rfq);
      // } else {
      //   handleSetErrors(lineId, "no_prices", null, rfq, true);
      // }
      //
      // setDynamicMoq(getDynamicMoq(stockrecord));
      // const qtyError = validateQuantity(quantityValue, stockrecord);
      // if (qtyError) handleSetErrors(lineId, "quantity", `${t(qtyError.i18message)} ${qtyError.amount}`, rfq);
      setSortedPrices([...stockrecord.prices].sort((a, b) => a.amount - b.amount).filter((v) => v.price));
    }
  }, [stockrecord]);

  const getError = (field: string, isRaw = true) => {
    const error = errors?.find((val) => val.id === lineId && val.field === field);
    if (!error) return false;
    return isRaw ? error.message : { error: true, helperText: error.message };
  };

  const onChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (!rfq && isProductAvailable(stockrecord)) {
      val = val > stockrecord?.num_in_stock ? stockrecord?.num_in_stock : val;
    }
    val = parseInt(val.toString().replace(/^0+/, ""));
    const qtyError = validateQuantity(val, stockrecord);

    if (qtyError) {
      handleSetErrors(lineId, "quantity", `${t(qtyError.i18message)} ${qtyError.amount}`, rfq);
    } else {
      handleSetErrors(lineId, "quantity", null, rfq, true);
    }
    setQuantityValue(val);
  };

  // const onDistributorChange = (val: any) => {
  //   setQuantitySelectOpen(false);
  //   dispatch(updateCartItem(basket_id, lineId, { stockrecord: val.value }));
  // };

  const onDeleteClick = () => {
    handleSetErrors(lineId, null, null, rfq, false, true);
    dispatch(removeCartItem(basket_id, lineId));
  };

  // const onUpdateProductClick = () => {
  //   invokeWebsocketTransport(() => {
  //     dispatch(productUpdateStart(lineId));
  //     socketClient.onMessage((data: any) => {
  //       dispatch(productUpdateSave(data, lineId));
  //     });
  //     socketClient.send({ upc: [upc], page_size: 700 });
  //   });
  //
  //   invokeRestTransport(() => {
  //     dispatch(productUpdateThunk(lineId));
  //   });
  // };

  // const onUpdatePriceClick = () => {
  //   const { price } = getCostAndQuantity(quantityValue, stockrecord);
  //   dispatch(updateAuthCartItem(basket_id, lineId, { price: price.id }));
  // };

  return (
    <DataRow
      className={clsx({ [classes.rowDisabled]: isUpdating || isRemoving, [classes.bordered]: true })}
      style={{ verticalAlign: "top" }}
    >
      <DataField
        style={{ paddingBottom: 10, justifyContent: "flex-start" }}
        className={cartItemsClasses.alignCenter}
        gridArea="product"
      >
        <DataValue style={{ position: "relative" }}>
          <Box
            display="flex"
            alignItems="center"
            className={clsx({ [classes.contentDisabled]: isUpdating || isRemoving })}
          >
            <Link to={url} className={classes.imageColumnVer2}>
              <img className={classes.img} src={mainImg} alt="Photo" onError={() => setMainImg(placeholderImg)} />
            </Link>
            <div>
              <Link className={clsx(classes.nameVer2, "cart-item-upc")} to={url}>
                {upc}
              </Link>
              <div>{description}</div>
            </div>
          </Box>
          {isUpdating && (
            <div className={`${classes.rowUpdating} cart-item-updating`}>
              <CircularProgress size="1em" style={{ marginRight: "7px" }} /> <b>{t("updating")}</b>
            </div>
          )}
          {isRemoving && (
            <div className={classes.rowUpdating}>
              <CircularProgress size="1em" style={{ marginRight: "7px" }} /> {t("removing")}
            </div>
          )}
        </DataValue>
      </DataField>
      <DataField gridArea="manufacturer" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>Производитель</DataLabel>
        <DataValue
          className={clsx(
            classes.alignCenter,
            classes.manufactureVer2,
            { [classes.contentDisabled]: isUpdating || isRemoving },
            "cart-distributor",
          )}
        >
          {stockrecord?.manufacturer?.name === "Not Specified"
            ? "Производитель не указан"
            : stockrecord?.manufacturer?.name || "-"}
        </DataValue>
      </DataField>
      <DataField gridArea="sellers" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>Поставщик</DataLabel>
        <DataValue
          className={clsx(classes.alignCenter, classes.manufactureVer2, {
            [classes.contentDisabled]: isUpdating || isRemoving,
          })}
        >
          {stockrecord?.partner_name || "-"}
        </DataValue>
      </DataField>
      <DataField gridArea="stock" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>{t("column.stock")}</DataLabel>
        <DataValue
          className={clsx(classes.alignCenter, classes.price, { [classes.contentDisabled]: isUpdating || isRemoving })}
        >
          {stockrecord?.num_in_stock ? (
            `${formatMoney(stockrecord.num_in_stock, 0)}`
          ) : (
            <span className={classes.rfqPrice}>{t("distributor.price_by_request")}</span>
          )}
        </DataValue>
      </DataField>
      <DataField gridArea="price" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>Цены за ед.</DataLabel>
        <DataValue className={clsx(classes.alignCenter, { [classes.contentDisabled]: isUpdating || isRemoving })}>
          {!sortedPrices?.length && <span className={classes.rfqPrice}>{t("distributor.price_by_request")}</span>}
          {!!sortedPrices?.length && (
            <React.Fragment>
              <div className={classes.priceMobile}>
                <span className={classes.price}>
                  {currency.symbol}
                  {formatMoney(currencyPrice(getPrice(quantityValue, stockrecord), stockrecord?.price_currency)) || 0}
                </span>
                {!!sortedPrices?.length && (
                  <Tooltip
                    enterTouchDelay={1}
                    classes={{ tooltip: classes.priceTooltip }}
                    title={
                      <React.Fragment>
                        <table className={classes.priceTooltipTable}>
                          <thead>
                            <tr>
                              <th style={{ fontWeight: 600 }}>{t("product.qty")}:</th>
                              {sortedPrices?.map((v) => (
                                <th key={v.id}>{formatMoney(v.amount, 0, ".", "`")}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: 600 }}>
                                {t("product.price")} {currency.symbol}:
                              </td>
                              {sortedPrices?.map((v) => (
                                <td key={`price_${v.id}`}>
                                  {formatMoney(currencyPrice(v.price, stockrecord?.price_currency))}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </React.Fragment>
                    }
                    placement="bottom"
                  >
                    <div style={{ cursor: "help", marginLeft: "5px" }}>
                      <InfoIcon className={classes.priceTooltipIcon} />
                    </div>
                  </Tooltip>
                )}
              </div>
              {/* <Hidden smDown> */}
              {/*  <div className={classes.distributorUpdated}> */}
              {/*    <div> */}
              {/*      {!!stockrecord?.date_updated && ( */}
              {/*        <React.Fragment> */}
              {/*          {t("distributor.updated")}: {getDateLag(new Date(), new Date(stockrecord?.date_updated))} */}
              {/*        </React.Fragment> */}
              {/*      )} */}
              {/*    </div> */}
              {/*  </div> */}
              {/* </Hidden> */}
            </React.Fragment>
          )}
          {/* {!rfq && getError("no_prices") && <div className={classes.error}>{getError("no_prices")}</div>} */}
        </DataValue>
      </DataField>
      <DataField gridArea="qty" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>{t("column.qty")}</DataLabel>
        <DataValue className={clsx(classes.alignCenter, { [classes.contentDisabled]: isUpdating || isRemoving })}>
          <div className={classes.qtyColumn}>
            <NumberInput
              className={classes.qty}
              name="quantity"
              variant="outlined"
              size="small"
              required
              onChange={onChangeQty}
              onFocus={(e: any) => e.target.select()}
              value={quantityValue}
              decimalScale={0}
              error={!!getError("quantity")}
            />
            {!!getError("quantity") && <div className={classes.errorMessage}>{getError("quantity")}</div>}
          </div>
        </DataValue>
      </DataField>
      {/* <DataField gridArea="total"> */}
      {/*  <DataLabel>{t("column.total")}</DataLabel> */}
      {/*  <DataValue className={clsx({ [classes.contentDisabled]: isUpdating || isRemoving })}> */}
      {/*    /!* {(!!rfq || !!stockrecord.low_stock_threshold) && ( *!/ */}
      {/*    {!sortedPrices?.length && <span className={classes.rfqPrice}>{t("distributor.price_by_request")}</span>} */}
      {/*    /!* {!rfq && !stockrecord.low_stock_threshold && ( *!/ */}
      {/*    {!!sortedPrices?.length && ( */}
      {/*      <span style={{ paddingTop: 10.5, paddingBottom: 10.5 }}> */}
      {/*        <b> */}
      {/*          {currency.symbol} */}
      {/*          {quantityValue */}
      {/*            ? formatMoney( */}
      {/*                currencyPrice(quantityValue * getPrice(quantityValue, stockrecord), stockrecord?.price_currency), */}
      {/*              ) */}
      {/*            : 0} */}
      {/*        </b> */}
      {/*      </span> */}
      {/*    )} */}
      {/*  </DataValue> */}
      {/* </DataField> */}
      <DataField
        gridArea="actions"
        className={clsx(classes.columnActions, cartItemsClasses.alignCenter, cartItemsClasses.justifyContentStart)}
      >
        <DataValue className={clsx({ [classes.contentDisabled]: isUpdating || isRemoving })}>
          <Hidden smDown>
            <HighlightOffIcon className={clsx(classes.remove, "cart-delete-button")} onClick={onDeleteClick} />
          </Hidden>
          <Hidden mdUp>
            <div className={classes.removeButtonWrapper}>
              <Button
                className={clsx(appTheme.buttonPrimary, classes.removeButton)}
                size="small"
                variant="contained"
                onClick={onDeleteClick}
              >
                {t("common.remove")}
              </Button>
            </div>
          </Hidden>
        </DataValue>
      </DataField>
      {/* <DataField gridArea="product-errors">
        <ItemErrors
          stockrecord={stockrecord}
          rfq={rfq}
          quantity={quantity}
          isUpdating={isUpdating}
          isAuthenticated={isAuthenticated}
          onUpdatePriceClick={onUpdatePriceClick}
          onUpdateProductClick={onUpdateProductClick}
          onMoveToRfqClick={() => props.moveToRfqHandler(props.data)}
          onMoveToOrderClick={() => props.moveToOrderHandler(props.data)}
          showUpdateButton={props.showUpdateButton}
        />
      </DataField> */}
      {/* <ItemErrors */}
      {/*  stockrecord={stockrecord} */}
      {/*  rfq={rfq} */}
      {/*  quantity={quantity} */}
      {/*  dateUpdated={dateUpdated} */}
      {/*  isUpdating={isUpdating} */}
      {/*  isAuthenticated={isAuthenticated} */}
      {/*  onUpdatePriceClick={onUpdatePriceClick} */}
      {/*  onUpdateProductClick={onUpdateProductClick} */}
      {/*  onMoveToRfqClick={() => props.moveToRfqHandler(props.data)} */}
      {/*  onMoveToOrderClick={() => props.moveToOrderHandler(props.data)} */}
      {/*  showUpdateButton={props.showUpdateButton} */}
      {/* /> */}
      {/* {!isDuplicate && !stockrecord.low_stock_threshold && ( */}
      {/* {!isDuplicate && ( */}
      {/*  <ItemValid */}
      {/*    stockrecord={stockrecord} */}
      {/*    rfq={rfq} */}
      {/*    quantity={quantityValue} */}
      {/*    sortedPrices={sortedPrices} */}
      {/*    isUpdating={isUpdating} */}
      {/*    onMoveToOrderClick={() => props.moveToOrderHandler(props.data)} */}
      {/*  /> */}
      {/* )} */}
    </DataRow>
  );
};

export default CartItem;
