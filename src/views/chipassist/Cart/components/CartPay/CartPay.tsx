import React, { useEffect, useMemo, useRef, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Grid, Button, Box, CircularProgress } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import { isInvalidCardNumber, isInvalidCvc, isInvalidMonth, isInvalidYear } from "@src/utils/validation";
import {
  gotoStep,
  resetCheckout,
  saveCardData,
  sendRequestThunk,
  setCardPay,
  // switchSkipOnlinePay,
  // updateCardErrors,
} from "@src/store/checkout/checkoutActions";
// import { CheckoutCardErrors } from "@src/store/checkout/checkoutTypes";
import useAppTheme from "@src/theme/useAppTheme";
// import { closedRegistration } from "@src/constants/defaults";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { getPrice } from "@src/utils/product";
import { formatMoney } from "@src/utils/formatters";
import { cartCost, getTotalPrices } from "@src/utils/cart";
import useCurrency from "@src/hooks/useCurrency";
import {
  DataBody,
  DataField,
  DataHeader,
  DataLabel,
  DataRow,
  DataTable,
  DataValue,
} from "@src/components/DataTable/DataTable";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import constants from "@src/constants/constants";
import { saveRfqListItems } from "@src/store/rfq/rfqActions";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import logo from "@src/images/elfaro/elfaro_logo.png";
import { useStyles } from "./cartPayStyles";
import { useStyles as useCartStyles } from "../../cartStyles";
import { useStyles as useCartItemsStyles } from "../CartItems/cartItemsStyles";
import { useStyles as useCartItemStyles } from "../CartItems/CartItem/cartItemStyles";
// interface SecurionPay {
//   setPublicKey: (token: string) => void;
//   createCardToken: (formCurrent: any, fn: (token: any) => void) => void;
// }

// declare const Securionpay: SecurionPay;

interface Props {
  checkoutFrom: "bom" | "cart";
  isValidBillingAddress?: boolean;
}

const CartPay: React.FC<Props> = ({ checkoutFrom, isValidBillingAddress }) => {
  const form = useRef(null);
  // const [wasErrors, setWasErrors] = useState(false);
  const classes = useStyles();
  const cartClasses = useCartStyles();
  const cartItemsClasses = useCartItemsStyles();
  const cartItemClasses = useCartItemStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { currency, currencyPrice } = useCurrency();
  const { t } = useI18n("cart");
  const checkout = useAppSelector((state) => state.checkout);
  const serviceTax = useAppSelector((state) => state.checkout.serviceTax);
  const cartItems = useAppSelector((state) => state.cart.items);
  const bomCheckout = useAppSelector((state) => state.bom.bomCheckout);

  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);
  const showCost = useMemo(() => {
    if (!cartItems) return false;
    return cartItems.some((i) => !i.rfq);
  }, [cartItems]);

  // const errors = checkout.cardErrors;
  // const hasCardDataErrors =
  //   !!errors.number ||
  //   !!errors.expMonth ||
  //   !!errors.expYear ||
  //   !!errors.cvc ||
  //   !!errors.payServerError ||
  //   !!errors.apiServerError;

  // const [data, setData] = useState({
  //   ...checkout.cardData,
  // });

  const [cost, setCost] = useState<number>(null);
  const [data] = useState({
    ...checkout.cardData,
  });

  // const onChangeInput = (field: keyof CheckoutCardErrors, isNumber: boolean, maxLength: number) => (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   let { value } = e.target;
  //
  //   if (isNumber) {
  //     value = value.replace(/\D/g, "");
  //   }
  //
  //   if (maxLength && value.length > maxLength) {
  //     value = value.substring(0, maxLength);
  //   }
  //
  //   if (errors.payServerError) {
  //     dispatch(updateCardErrors({ ...errors, payServerError: "" }));
  //   }
  //
  //   if (wasErrors) {
  //     const updatedErrors = { ...errors };
  //     updatedErrors[field] = getFieldError(field, value);
  //     dispatch(updateCardErrors(updatedErrors));
  //   }
  //
  //   setData({
  //     ...data,
  //     [field]: value,
  //   });
  // };

  useEffect(() => {
    const res = cartCost(
      // cartItems.filter((item) => !item.rfq && !item.stockrecord.low_stock_threshold),
      cartItems.filter((item) => !item.rfq),
      currencyPrice,
    );
    setCost(res);
  }, [cartItems, currency]);

  const onClickPay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bomCheckout && checkoutFrom === "bom") {
      const rfqsList: any = [];
      Object.values(bomCheckout.items)
        .filter((v: any) => v.approved && !v.stockrecord)
        .forEach((item: any) => {
          const rfqData = {
            part_number: item.part_number,
            quantity: item.quantity,
          };
          rfqsList.push(rfqData);

          // dispatch(saveRfqItemFromBom(rfqData));
        });
      await dispatch(saveRfqListItems(rfqsList));
    }

    const res: any = await dispatch(sendRequestThunk([])); // TODO: set rfqList or back payCheckoutThunk
    if (!res?.id && res.status !== "success" && res.errorMessage) {
      dispatch(
        showBottomLeftMessageAlertAction(
          {
            text: res.errorMessage.slice(0, 128),
            severity: "error",
          },
          t("error_checkout"),
          res.apiStatus,
        ),
      );
      dispatch(resetCheckout());
    }
    return dispatch(saveCardData(data));

    // Hide card pay
    // if (false && validate()) {
    //   // dispatch(getToken(data));
    //   // eslint-disable-next-line no-undef
    //   Securionpay.setPublicKey("pk_test_1soPtET6SLiNaVwlLVwvK7xj");
    //   // eslint-disable-next-line no-undef
    //   Securionpay.createCardToken(form.current, async (token) => {
    //     const error = token && token.error && token.error.message;
    //
    //     if (error) {
    //       dispatch(
    //         updateCardErrors({
    //           ...checkout.errors,
    //           payServerError: error,
    //         }),
    //       );
    //       return;
    //     }
    //
    //     const res: any = await dispatch(payCheckoutThunk(token));
    //     if (!res?.id) {
    //       dispatch(
    //         showAlertMessageAction({
    //           text: res,
    //           severity: "error",
    //         }),
    //       );
    //       dispatch(resetCheckout());
    //     }
    //     dispatch(saveCardData(data));
    //   });
    // }
  };

  const onPrevStepClick = () => {
    dispatch(
      gotoStep((constants.showNewBillingAddress || checkout.shippingDuplicate) && isValidBillingAddress ? 1 : 2),
    );
    dispatch(saveCardData(data));
  };

  // const getFieldError = (field: string, value: string) => {
  //   let error = "";
  //
  //   switch (field) {
  //     case "number":
  //       if (isInvalidCardNumber(value)) {
  //         error = t("pay.number_error");
  //       }
  //       break;
  //     case "expMonth":
  //       if (isInvalidMonth(value)) {
  //         error = t("pay.expMonth_error");
  //       }
  //       break;
  //     case "expYear":
  //       if (isInvalidYear(value)) {
  //         error = t("pay.expYear_error");
  //       }
  //       break;
  //     case "cvc":
  //       if (isInvalidCvc(value)) {
  //         error = t("pay.cvc_error");
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   return error;
  // };

  // const validate = () => {
  //   let isValid = true;
  //   const updatedErrors = {
  //     ...errors,
  //     payServerError: "",
  //     apiServerError: "",
  //     number: getFieldError("number", data.number),
  //     expMonth: getFieldError("expMonth", data.expMonth),
  //     expYear: getFieldError("expYear", data.expYear),
  //     cvc: getFieldError("cvc", data.cvc),
  //   };
  //
  //   for (const val of Object.values(updatedErrors)) {
  //     if (val) {
  //       isValid = false;
  //     }
  //   }
  //
  //   if (!isValid) {
  //     setWasErrors(true);
  //   }
  //
  //   dispatch(updateCardErrors(updatedErrors));
  //
  //   return isValid;
  // };

  // const handleSkipChange = () => {
  //   dispatch(switchSkipOnlinePay());
  // };

  const handleCardPayChange = (val: boolean) => {
    dispatch(setCardPay(val));
  };

  // const minCostHint = () => {
  //   const total = getTotalPrices(cost, serviceTax, currencyPrice).result;
  //   const isMinCost = total < currencyPrice(100, "EUR");
  //   if (!isMinCost) return null;
  //
  //   return (
  //     <div className={clsx(classes.minCost, cartItemsClasses.estTotal)}>
  //       {t("min_cost")}
  //       <strong>100€</strong>
  //     </div>
  //   );
  // };

  return (
    <form onSubmit={onClickPay} ref={form} id="payment-form" className={classes.checkoutCardForm}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable gridClass={clsx(classes.tableAreas, appTheme.table)} gridAreasBreakpoint="xs">
            <DataHeader>
              <DataRow>
                <DataField gridArea="partnumber" className={cartItemsClasses.headerProduct}>
                  <DataValue>{t("bom.column.part_number")}</DataValue>
                </DataField>
                <DataField
                  className={`${cartItemsClasses.headerProduct} ${classes.columnDescription}`}
                  gridArea="description"
                >
                  <DataValue>{t("bom.column.description")}</DataValue>
                </DataField>
                <DataField className={`${cartItemsClasses.headerProduct} ${classes.columnTextRight}`} gridArea="qty">
                  <DataValue>{t("bom.column.qty")}</DataValue>
                </DataField>
                <DataField
                  className={`${cartItemsClasses.headerProduct} ${classes.columnTextRight}`}
                  gridArea="unit_price"
                >
                  <DataValue>{t("bom.column.unit_price")}</DataValue>
                </DataField>
                <DataField
                  className={`${cartItemsClasses.headerProduct} ${classes.columnTextRight}`}
                  gridArea="total_price"
                >
                  <DataValue>{t("bom.total_price")}</DataValue>
                </DataField>
              </DataRow>
            </DataHeader>
            <DataBody>
              {[...cartItems]
                ?.sort((a, b) => a.rfq - b.rfq)
                .map((item, index) => (
                  <DataRow key={item.id} className={index % 2 ? classes.evenRow : ""}>
                    <DataField gridArea="partnumber">
                      <DataLabel>{t("bom.column.part_number")}</DataLabel>
                      <DataValue>{item.product?.upc}</DataValue>
                    </DataField>
                    <DataField className={`${classes.columnDescription}`} gridArea="description">
                      <DataLabel>{t("bom.column.description")}</DataLabel>
                      <DataValue>{item.product?.description}</DataValue>
                    </DataField>
                    <DataField className={`${classes.columnTextRight}`} gridArea="qty">
                      <DataLabel>{t("bom.column.qty")}</DataLabel>
                      <DataValue>{item.quantity}</DataValue>
                    </DataField>
                    <DataField className={`${classes.columnTextRight}`} gridArea="unit_price">
                      <DataLabel>{t("bom.column.unit_price")}</DataLabel>
                      <DataValue>
                        {/* {(!!item.rfq || !!item.stockrecord.low_stock_threshold) && ( */}
                        {!!item.rfq && (
                          <span className={cartItemClasses.rfqPrice}>{t("distributor.price_by_request")}</span>
                        )}
                        {/* {!item.rfq && !item.stockrecord.low_stock_threshold && ( */}
                        {!item.rfq && (
                          <React.Fragment>
                            {currency.symbol}
                            {formatMoney(
                              currencyPrice(
                                getPrice(item.quantity, item.stockrecord),
                                item.stockrecord?.price_currency,
                              ),
                            )}
                          </React.Fragment>
                        )}
                      </DataValue>
                    </DataField>
                    <DataField className={`${classes.columnTextRight}`} gridArea="total_price">
                      <DataLabel>{t("bom.total_price")}</DataLabel>
                      <DataValue>
                        {/* {(!!item.rfq || !!item.stockrecord.low_stock_threshold) && ( */}
                        {!!item.rfq && (
                          <span className={cartItemClasses.rfqPrice}>{t("distributor.price_by_request")}</span>
                        )}
                        {/* {!item.rfq && !item.stockrecord.low_stock_threshold && ( */}
                        {!item.rfq && (
                          <React.Fragment>
                            {currency.symbol}
                            {formatMoney(
                              currencyPrice(
                                item.quantity * getPrice(item.quantity, item.stockrecord),
                                item.stockrecord?.price_currency,
                              ),
                            )}
                          </React.Fragment>
                        )}
                      </DataValue>
                    </DataField>
                  </DataRow>
                ))}
            </DataBody>
          </DataTable>
        </Grid>

        {showCost && (
          <Grid item xs={12}>
            <div className={cartItemsClasses.estRow}>
              <div style={{ textAlign: "left", flexShrink: 0 }}>
                {constants.isPossibleCardPay && (
                  <>
                    <p style={{ fontSize: "1.2rem" }}>Payment Method:</p>
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="outlined"
                        className={clsx(classes.payMethodButton, !checkout?.isCardPay && "active")}
                        onClick={() => handleCardPayChange(false)}
                      >
                        {t("pay.bank_method")}
                      </Button>
                      <Button
                        variant="outlined"
                        className={clsx(classes.payMethodButton, checkout?.isCardPay && "active")}
                        onClick={() => handleCardPayChange(true)}
                      >
                        {t("pay.cart_method")}
                      </Button>
                    </div>
                    <p style={{ marginLeft: 0 }} className={cartItemsClasses.estTotalHint}>
                      {t(!checkout?.isCardPay ? "pay.bank_method_hint" : "pay.cart_method_hint")}
                    </p>
                  </>
                )}
              </div>
              <div className={cartItemsClasses.estC}>
                {/* {!!serviceTax && ( */}
                {/*  <div className={cartItemsClasses.estTax}> */}
                {/*    {t("order.service_fee", { tax: serviceTax })} */}
                {/*    {isChipAssist && <span>{` (min ${formatMoney(currencyPrice(20, "EUR"))}${currency.symbol})`}</span>} */}
                {/*    :{" "} */}
                {/*    <strong> */}
                {/*      {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).tax || 0)} {currency.symbol} */}
                {/*    </strong> */}
                {/*  </div> */}
                {/* )} */}
                <div className={cartItemsClasses.estTotal}>
                  {t("column.total")}:{" "}
                  <strong>
                    {formatMoney(getTotalPrices(cost, serviceTax, currencyPrice).result || 0)} {currency.symbol}
                  </strong>
                  {!!serviceTax && <span> {t("column.service_fee")}</span>}
                </div>
                {/* {minCostHint()} */}
                <ul className={cartItemsClasses.estTotalHint}>
                  {!!serviceTax && <li>{t("total_hint_1", { num: serviceTax })}</li>}
                  <li>{t("total_hint_2")}</li>
                </ul>
              </div>
            </div>
          </Grid>
        )}

        {/* <Grid item xs={12}>
          <Box display="flex" justifyContent="end">
            <FormControlLabel
              control={
                <Checkbox className={appTheme.checkbox} checked={checkout?.isCardPay} onChange={handleCardPayChange} />
              }
              label={t("pay.card_pay")}
            />
          </Box>
        </Grid> */}

        {/* {checkout.canSkip && !closedRegistration && ( */}
        {/*  <FormControlLabel */}
        {/*    control={ */}
        {/*      <Checkbox */}
        {/*        className={appTheme.checkbox} */}
        {/*        checked={checkout.skipOnlinePay} */}
        {/*        onChange={handleSkipChange} */}
        {/*        name="skipOnlinePay" */}
        {/*      /> */}
        {/*    } */}
        {/*    label={t("pay.skip")} */}
        {/*  /> */}
        {/* )} */}

        {/* {!checkout.skipOnlinePay && !closedRegistration && ( */}
        {/*  <Grid item xs={12}> */}
        {/*    <div className={classes.checkoutCard}> */}
        {/*      <input */}
        {/*        className={`${classes.checkoutInput} ${classes.checkoutInputWide} ${ */}
        {/*          errors.number && classes.checkoutInputError */}
        {/*        }`} */}
        {/*        onChange={onChangeInput("number", true, 16)} */}
        {/*        value={data.number} */}
        {/*        id="checkout-card-number" */}
        {/*        placeholder="XXXX XXXX XXXX XXXX" */}
        {/*        data-securionpay="number" */}
        {/*        type="text" */}
        {/*      /> */}
        {/*      <div className={classes.checkoutCardRow}> */}
        {/*        <input */}
        {/*          onChange={onChangeInput("expMonth", true, 2)} */}
        {/*          value={data.expMonth} */}
        {/*          className={`${classes.checkoutCardSmInput} ${classes.checkoutInput} ${ */}
        {/*            errors.expMonth && classes.checkoutInputError */}
        {/*          }`} */}
        {/*          id="checkout-card-month" */}
        {/*          placeholder="MM" */}
        {/*          data-securionpay="expMonth" */}
        {/*          type="text" */}
        {/*        /> */}
        {/*        <span>/</span> */}
        {/*        <input */}
        {/*          onChange={onChangeInput("expYear", true, 2)} */}
        {/*          value={data.expYear} */}
        {/*          className={`${classes.checkoutCardSmInput} ${classes.checkoutInput}  ${ */}
        {/*            errors.expYear && classes.checkoutInputError */}
        {/*          }`} */}
        {/*          id="checkout-card-year" */}
        {/*          placeholder="YY" */}
        {/*          data-securionpay="expYear" */}
        {/*          type="text" */}
        {/*        /> */}
        {/*        <input */}
        {/*          onChange={onChangeInput("cvc", true, 3)} */}
        {/*          value={data.cvc} */}
        {/*          className={`${classes.checkoutCardCvc} ${classes.checkoutInput} ${ */}
        {/*            errors.cvc && classes.checkoutInputError */}
        {/*          }`} */}
        {/*          id="checkout-card-cvc" */}
        {/*          placeholder="CVC" */}
        {/*          data-securionpay="cvc" */}
        {/*          type="text" */}
        {/*        /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*    {hasCardDataErrors && ( */}
        {/*      <div className={`${classes.error} ${classes.cardError}`}> */}
        {/*        {!!errors.number && <div>{errors.number}</div>} */}
        {/*        {!!errors.expMonth && <div>{errors.expMonth}</div>} */}
        {/*        {!!errors.expYear && <div>{errors.expYear}</div>} */}
        {/*        {!!errors.cvc && <div>{errors.cvc}</div>} */}
        {/*        {!!errors.payServerError && <div>{errors.payServerError}</div>} */}
        {/*        {!!errors.apiServerError && <div>{errors.apiServerError}</div>} */}
        {/*      </div> */}
        {/*    )} */}
        {/*  </Grid> */}
        {/* )} */}

        {/* {showCost && */}
        {/*  getTotalPrices(cost, serviceTax, currencyPrice).result < */}
        {/*    currencyPrice(constants.id === ID_ICSEARCH ? 100 : 1000, constants.id === ID_ICSEARCH ? "USD" : "EUR") && ( */}
        {/*    <div className={cartItemsClasses.deliveryHintWrapper}> */}
        {/*      <div className={cartItemsClasses.deliveryHint}>{t("delivery_hint")}</div> */}
        {/*    </div> */}
        {/*  )} */}

        <Grid item xs={12}>
          <Box className={classes.actions}>
            <Button
              variant={"contained"}
              color={"secondary"}
              size={"large"}
              className={`${appTheme.buttonPrimary} ${classes.backButton}`}
              onClick={onPrevStepClick}
            >
              {t("pay.back")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={`${appTheme.buttonCreate} ${cartClasses.checkout}`}
              type="submit"
              disabled={checkout.inProgress || !cartItems.length}
              style={{ marginLeft: 10 }}
            >
              {checkout.inProgress && <CircularProgress className={classes.progressCircle} size="1.5em" />}
              {/* {checkout.canSkip && !checkout.skipOnlinePay && !closedRegistration ? t("pay.pay") : t("pay.submit")} */}
              {t("pay.submit")}
              {!checkout.inProgress && <ChevronRightIcon fontSize="small" />}
            </Button>
          </Box>
        </Grid>

        {isChipAssist && (
          <Box className={classes.elfaroWrapper}>
            <p className={classes.elfaroTitle}>{t("pay.elfaro_title")}</p>
            <address>
              Vesse poik, 4d, 11415, Tallinn, Estonia <br />
              <a href="tel:+37259007750">+372 5900 7750</a>
              <br />
              <a href="mailto:sales@elfaro.ee">sales@elfaro.ee</a>
              <br />
              <a href="https://www.elfaro.ee" target="_blank" rel="noreferrer">
                www.elfaro.ee
              </a>
              <br />
              <img className={classes.elfaroLogo} src={logo} alt="Elfaro logo" />
            </address>
          </Box>
        )}
      </Grid>
    </form>
  );
};

export default CartPay;
