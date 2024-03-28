import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import clsx from "clsx";
import { CircularProgress, Hidden, Box, Button } from "@material-ui/core";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { NumberInput } from "@src/components/Inputs";
import { ExistingCartItem } from "@src/store/cart/cartTypes";
import { updateCartItem, removeCartItem } from "@src/store/cart/cartActions";
import useAppTheme from "@src/theme/useAppTheme";
import useDebounce from "@src/hooks/useDebounce";
import { DataField, DataLabel, DataRow, DataValue } from "@src/components/DataTable/DataTable";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import placeholderImg from "@src/images/cpu.png";
import { formatMoney } from "@src/utils/formatters";
import { useStyles } from "./cartItemStyles";
import { useStyles as useCartItemsStyles } from "../cartItemsStyles";

const CartItemVer2 = (props: { data: ExistingCartItem; socketClient: any }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const cartItemsClasses = useCartItemsStyles();
  const {
    basket_id,
    lineId,
    img,
    upc,
    description,
    url,
    manufacture,
    quantity,
    isUpdating,
    isRemoving,
    numInStock,
    errors,
    rfq,
    handleSetErrors,
    priceRange,
    sellers,
  } = props.data;
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");
  const { currency, currencyPrice } = useCurrency();

  const [mainImg, setMainImg] = useState(img);
  const [quantityValue, setQuantityValue] = useState(quantity);
  const debouncedQuantityValue = useDebounce(quantityValue, 500);

  useEffect(() => {
    if (debouncedQuantityValue) {
      if (debouncedQuantityValue !== quantity) {
        dispatch(
          updateCartItem(basket_id, lineId, {
            quantity: debouncedQuantityValue,
          }),
        );
      }
    }
  }, [debouncedQuantityValue]);

  const getError = (field: string, isRaw = true) => {
    const error = errors?.find((val) => val.id === lineId && val.field === field);
    if (!error) return false;
    return isRaw ? error.message : { error: true, helperText: error.message };
  };

  const onChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    val = parseInt(val.toString().replace(/^0+/, ""));
    setQuantityValue(val);
    if (!val) {
      handleSetErrors(lineId, "quantity", `${t("distributor.min_qty_error")} 1`, rfq);
    } else {
      handleSetErrors(lineId, "quantity", null, rfq, true);
    }
  };

  const onDeleteClick = () => {
    dispatch(removeCartItem(basket_id, lineId));
  };

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
        <DataLabel className={classes.alignCenter}>Manufacturer(s)</DataLabel>
        <DataValue
          className={clsx(
            classes.alignCenter,
            classes.manufactureVer2,
            { [classes.contentDisabled]: isUpdating || isRemoving },
            "cart-distributor",
          )}
        >
          {manufacture.name}
          <div className={classes.manufactureOther}>И доступные альтернативы</div>
        </DataValue>
      </DataField>
      <DataField gridArea="stock" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>In stock</DataLabel>
        <DataValue
          className={clsx(classes.alignCenter, classes.price, { [classes.contentDisabled]: isUpdating || isRemoving })}
        >
          {numInStock ? (
            `${formatMoney(numInStock, 0)}+`
          ) : (
            <span className={classes.rfqPrice}>{t("distributor.price_by_request")}</span>
          )}
        </DataValue>
      </DataField>
      <DataField gridArea="sellers" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>Available from</DataLabel>
        <DataValue
          className={clsx(classes.alignCenter, classes.price, { [classes.contentDisabled]: isUpdating || isRemoving })}
        >
          {sellers.length ? `${sellers.length}+` : t("distributor.price_by_request")}
        </DataValue>
      </DataField>
      <DataField gridArea="price" className={cartItemsClasses.alignCenter}>
        <DataLabel className={classes.alignCenter}>Market pricing</DataLabel>
        <DataValue className={clsx(classes.alignCenter, { [classes.contentDisabled]: isUpdating || isRemoving })}>
          {!priceRange.from && <span className={classes.rfqPrice}>{t("distributor.price_by_request")}</span>}
          {!!priceRange.from && (
            <span className={classes.price}>
              <span>
                {formatMoney(currencyPrice(priceRange.from, priceRange.fromCurrency))} <b>{currency.symbol}</b>
              </span>{" "}
              -{" "}
              <span>
                {formatMoney(currencyPrice(priceRange.to, priceRange.toCurrency))} <b>{currency.symbol}</b>
              </span>
            </span>
          )}
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
    </DataRow>
  );
};

export default CartItemVer2;
