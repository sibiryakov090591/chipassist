import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Container from "@material-ui/core/Container";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Hidden,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { approveOrder, getOrder, AddressAction, downloadFile } from "@src/store/orders/ordersActions";
import Preloader from "@src/components/Preloader/Preloader";
import { formatMoney } from "@src/utils/formatters";
import useCurrency from "@src/hooks/useCurrency";
import clsx from "clsx";
import elfaro_logo from "@src/images/elfaro/elfaro_logo.png";
import useAppSelector from "@src/hooks/useAppSelector";
import OrderAddress from "@src/views/chipassist/Orders/components/OrderConfirm/components/OrderAddress/OrderAddress";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import FiltersContainer, { FilterResultsBar } from "@src/components/FiltersBar";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { getUserAddressThunk } from "@src/store/checkout/checkoutActions";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Checkbox from "@material-ui/core/Checkbox";
import AddressTable from "./components/AddressTable";
import OrderConfirmRow from "./components/OrderConfirmRow";
import { useStyles } from "./styles";
import EmptyState from "./components/EmptyState";

type DeclineReasonsState = {
  high_price: boolean;
  better_offer: boolean;
  long_time: boolean;
  incorrect_products: boolean;
  do_not_need: boolean;
  other: boolean;
  other_message: string;
};

const declineReasonsInitial = (): DeclineReasonsState => ({
  high_price: false,
  better_offer: false,
  long_time: false,
  incorrect_products: false,
  do_not_need: false,
  other: false,
  other_message: "",
});

const OrderConfirm: React.FC = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { t } = useI18n("order");
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const { currency, currencyPrice } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [pdfIsLoading, setPdfIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<any>(null);
  const [lines, setLines] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"decline" | "confirm">(null);
  const [declineReasons, setDeclineReasons] = useState(declineReasonsInitial());
  const declineLabels = React.useMemo<{ [key: string]: string }>(
    () => ({
      high_price: "Price is too high",
      better_offer: "Found a better offer",
      long_time: "Too long waiting time",
      incorrect_products: "An incorrect product offered",
      do_not_need: "Don’t need this product anymore",
      other: "Other",
    }),
    [],
  );

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const { address: shippingAddress, billingAddress, shippingDuplicate } = useAppSelector((state) => state.checkout);

  useEffect(() => dispatch(getUserAddressThunk()), []);

  useEffect(() => {
    setIsLoaded(false);
    dispatch(getOrder(+orderId))
      .then((res: any) => {
        setOrder(res);
        setLines(res.lines_data?.map((i: any) => ({ ...i, approved: true })) || []);
      })
      .finally(() => setIsLoaded(true));
  }, [orderId]);

  useEffect(() => {
    if (lines) {
      setTotal(
        lines.reduce((acc: number, i: any) => {
          if (!i.approved) return acc;
          return acc + Number(i.price_incl_tax || 0);
        }, 0),
      );
    }
  }, [lines]);

  const updateOrder = () => {
    setIsLoaded(false);
    dispatch(getOrder(+orderId)).then((res: any) => {
      setOrder(res);
      setLines(res.lines_data?.map((i: any) => ({ ...i, approved: true })) || []);
      setIsLoaded(true);
    });
  };

  const onChangeDecline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setDeclineReasons((prev) => ({
      ...prev,
      [name]: name === "other_message" ? value : checked,
    }));
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
    setDeclineReasons(declineReasonsInitial());
  };

  const onSubmit = async () => {
    setSending(true);

    let data: any = {};
    if (modalMode === "confirm") {
      // Address updating
      const billingAddressResult = await dispatch(AddressAction(billingAddress, true));
      let shippingAddressResult = null;
      if (!shippingDuplicate) {
        shippingAddressResult = await dispatch(AddressAction(shippingAddress));
      }

      const shippingAddressID = shippingDuplicate ? billingAddressResult?.data?.id : shippingAddressResult?.data?.id;
      const billingAddressID = billingAddressResult?.data?.id;

      if (lines.some((i) => !i.approved)) {
        const approvedLines = lines.filter((i) => i.approved);
        // Order UPDATED
        data = {
          Items: [
            { Data: "", DataArray: [], Name: "Type", Value: "RFQ" },
            { Data: "", DataArray: [], Name: "ContractorINN", Value: "" },
            { Data: "", DataArray: [], Name: "ContractorName", Value: "" },
            { Data: "", DataArray: [], Name: "UserID", Value: profileInfo.id },
            { Data: "", DataArray: [], Name: "Status", Value: "co updated" },
            { Data: "", DataArray: [], Name: "OrderID", Value: order.id },
            {
              Data: "",
              DataArray: [],
              Name: "ShippingAddressID",
              Value: shippingAddressID,
            },
            { Data: "", DataArray: [], Name: "BillingAddressID", Value: billingAddressID },
            { Data: "", DataArray: [], Name: "OrderUID", Value: "" },
            { Data: "", DataArray: [], Name: "OrderNumber", Value: order.number },
            { Data: "", DataArray: [], Name: "OrderDate", Value: "" },
            { Data: "", DataArray: [], Name: "RFQID", Value: "" },
            {
              Data: "",
              DataArray: approvedLines.map((line) => ({
                Items: [
                  { Data: "", DataArray: [], Name: "ProductID", Value: line.product?.id },
                  { Data: "", DataArray: [], Name: "ProductName", Value: line.upc },
                  { Data: "", DataArray: [], Name: "ProductQTY", Value: line.quantity },
                  {
                    Data: "",
                    DataArray: [],
                    Name: "ProductPrice",
                    Value: `${line.unit_price_excl_tax}${line.price_currency}`,
                  },
                  {
                    Data: "",
                    DataArray: [],
                    Name: "Comment",
                    Value: `${line.id}`,
                  },
                  { Data: "", DataArray: [], Name: "SupplierID", Value: "" },
                  { Data: "", DataArray: [], Name: "SupplierName", Value: "" },
                  { Data: "", DataArray: [], Name: "ProductDeliveryTime", Value: "" },
                ],
              })),
              Name: "Items",
              Value: "",
            },
            { Data: "", DataArray: [], Name: "ContactID", Value: profileInfo.id },
            { Data: "", DataArray: [], Name: "ContactSurname", Value: profileInfo.lastName },
            { Data: "", DataArray: [], Name: "ContactFirstname", Value: profileInfo.firstName },
            { Data: "", DataArray: [], Name: "ContactMiddlename", Value: "" },
            { Data: "", DataArray: [], Name: "ContactPhone", Value: "" },
            { Data: "", DataArray: [], Name: "ContactEmail", Value: profileInfo.email },
            { Data: "", DataArray: [], Name: "Payment", Value: "INVOICE" },
            { Data: "", DataArray: [], Name: "Source", Value: "email" },
          ],
        };
      } else {
        // Order ACCEPTED
        data = {
          Items: [
            { Data: "", DataArray: [], Name: "Status", Value: "co accepted" },
            { Data: "", DataArray: [], Name: "OrderID", Value: order.id },
            { Data: "", DataArray: [], Name: "ShippingAddressID", Value: shippingAddressID },
            { Data: "", DataArray: [], Name: "BillingAddressID", Value: billingAddressID },
          ],
        };
      }
    } else {
      // Order DECLINED
      data = {
        Items: [
          { Data: "", DataArray: [], Name: "Type", Value: "RFQ" },
          { Data: "", DataArray: [], Name: "ContractorINN", Value: "" },
          { Data: "", DataArray: [], Name: "ContractorName", Value: "" },
          { Data: "", DataArray: [], Name: "UserID", Value: profileInfo.id },
          { Data: "", DataArray: [], Name: "Status", Value: "co declined" },
          {
            Data: "",
            DataArray: [
              {
                Items: Object.entries(declineReasons).reduce(
                  (acc, item) =>
                    item[1] && item[0] !== "other"
                      ? [
                          ...acc,
                          item[0] === "other_message"
                            ? { Data: "", DataArray: [], Name: `Reason`, Value: `Other - ${item[1]}` }
                            : { Data: "", DataArray: [], Name: `Reason`, Value: declineLabels[item[0]] },
                        ]
                      : acc,
                  [],
                ),
              },
            ],
            Name: "Reason",
            Value: "",
          },
          { Data: "", DataArray: [], Name: "OrderID", Value: order.id },
          { Data: "", DataArray: [], Name: "OrderUID", Value: "" },
          { Data: "", DataArray: [], Name: "OrderNumber", Value: order.number },
          { Data: "", DataArray: [], Name: "OrderDate", Value: "" },
          { Data: "", DataArray: [], Name: "RFQID", Value: "" },
          {
            Data: "",
            DataArray: lines.map((line) => ({
              Items: [
                { Data: "", DataArray: [], Name: "ProductID", Value: "" },
                { Data: "", DataArray: [], Name: "ProductName", Value: line.upc },
                { Data: "", DataArray: [], Name: "ProductQTY", Value: line.quantity },
                {
                  Data: "",
                  DataArray: [],
                  Name: "ProductPrice",
                  Value: `${line.unit_price_excl_tax}${line.price_currency}`,
                },
                {
                  Data: "",
                  DataArray: [],
                  Name: "Comment",
                  Value: line.comment,
                },
                { Data: "", DataArray: [], Name: "SupplierID", Value: "" },
                { Data: "", DataArray: [], Name: "SupplierName", Value: "" },
                { Data: "", DataArray: [], Name: "ProductDeliveryTime", Value: "" },
              ],
            })),
            Name: "Items",
            Value: "",
          },
          { Data: "", DataArray: [], Name: "ContactID", Value: profileInfo.id },
          { Data: "", DataArray: [], Name: "ContactSurname", Value: profileInfo.lastName },
          { Data: "", DataArray: [], Name: "ContactFirstname", Value: profileInfo.firstName },
          { Data: "", DataArray: [], Name: "ContactMiddlename", Value: "" },
          { Data: "", DataArray: [], Name: "ContactPhone", Value: "" },
          { Data: "", DataArray: [], Name: "ContactEmail", Value: profileInfo.email },
          { Data: "", DataArray: [], Name: "Payment", Value: "INVOICE" },
          { Data: "", DataArray: [], Name: "Source", Value: "email" },
        ],
      };
    }

    return dispatch(approveOrder(data, order.id))
      .then((res: any) => {
        if (res?.status === "success") {
          setStep(1);
          setIsOpenModal(false);
          updateOrder();
        } else {
          setSending(false);
          setStep(1);
          setIsOpenModal(false);
          dispatch(
            showBottomLeftMessageAlertAction({
              text: t("cart.error_checkout"),
              severity: "warning",
            }),
          );
        }
      })
      .catch(() => {
        setSending(false);
        setStep(1);
        setIsOpenModal(false);
        dispatch(
          showBottomLeftMessageAlertAction({
            text: t("cart.error_checkout"),
            severity: "warning",
          }),
        );
      });
  };

  const setStepHandler = (number: number) => {
    if (isAuthenticated) {
      setStep(number);
    } else {
      navigate(prevEmail ? "/auth/login" : "/auth/registration", {
        state: { background: location.state?.background || location },
      });
    }
  };

  const onDeclineModalOpen = () => {
    setIsOpenModal(true);
    setModalMode("decline");
  };

  const onConfirmModalOpen = () => {
    setIsOpenModal(true);
    setModalMode("confirm");
  };

  const downloadPdf = (type: "order" | "invoice") => () => {
    setPdfIsLoading(true);
    dispatch(downloadFile(order.uid, type))
      .then((blob: Blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        }
      })
      .finally(() => setPdfIsLoading(false));
  };

  const escHandler = (event: any) => {
    if (event.keyCode === 27) {
      navigate({
        pathname: "/profile/orders",
      });
    }
  };

  const onChangeApproved = useCallback((id: number) => {
    setLines((prevState) => {
      const newState = [...prevState];
      const item = newState.find((i) => i.id === id);
      if (item) item.approved = !item.approved;
      return newState;
    });
  }, []);

  const onCheckAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLines((prevState) => prevState.map((i) => ({ ...i, approved: e.target.checked })));
  };

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);

    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);

  return (
    <Page title={t("orders")} description={t("page_description")}>
      <Container maxWidth="xl">
        <Box mt={5} mb={5}>
          <Card>
            <Box className={classes.wrapper}>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={{ pathname: "/profile/orders" }}
                className={appTheme.buttonPrimary}
              >
                {t("back")}
              </Button>
            </Box>
            <Divider />
            {!isLoaded && (
              <Box p={5} display="flex" justifyContent="center">
                <Preloader title="" />
              </Box>
            )}
            {isLoaded && !order && <EmptyState />}
            {isLoaded && order && step === 1 && (
              <>
                <Box className={classes.boxMargin}>
                  {order.status === "co sent" && (
                    <>
                      <Typography variant="h3" component="h3">
                        {t("confirm_order.title")}
                      </Typography>
                      <Typography style={{ fontSize: "1.2rem", paddingTop: 5 }} variant="subtitle1" component="p">
                        {t("confirm_order.sub_title")}
                      </Typography>
                    </>
                  )}
                  <Hidden mdUp>
                    <Typography variant="h3" component="h3" style={{ marginTop: 24 }}>
                      {t("order")}: <span>#{order.number}</span>
                    </Typography>
                    <Typography variant="h3" component="h3" style={{ marginTop: 24 }}>
                      {t("status")}:{" "}
                      <span
                        className={order.status === "co declined" ? classes.declinedStatus : classes.acceptedStatus}
                      >
                        {order.status}
                      </span>
                    </Typography>
                  </Hidden>
                  {!!order.shipping_address && (
                    <Box mt={4} mb={4}>
                      <Box className={classes.tableTitle}>{t("cart.address.shipping_title")}:</Box>
                      <AddressTable address={order.shipping_address} />
                    </Box>
                  )}
                  {!!order.billing_address && (
                    <Box mt={4} mb={4}>
                      <Box className={classes.tableTitle}>{t("cart.address.billing_title")}:</Box>
                      <AddressTable address={order.billing_address} isBilling={true} />
                    </Box>
                  )}
                </Box>
                <Box className={classes.boxMargin}>
                  <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin, classes.filtersRow)}>
                    <Hidden smDown>
                      <div className={classes.orderNumber}>
                        {t("order")}: <span>#{order.number}</span>
                      </div>
                      <div className={classes.orderStatus}>
                        {t("status")}:{" "}
                        <span
                          className={order.status === "co declined" ? classes.declinedStatus : classes.acceptedStatus}
                        >
                          {order.status}
                        </span>
                      </div>
                    </Hidden>
                    <FiltersContainer>
                      <FilterResultsBar count={lines?.length} />
                      <FilterCurrency />
                    </FiltersContainer>
                  </div>
                  <section className={classes.productTable}>
                    <section className={classes.tableHeader}>
                      <ul className={classes.tableAreas}>
                        <li className={classes.columnNumber}>№</li>
                        <li className={classes.columnPartnumber}>{t("bom.column.part_number")}</li>
                        <li className={clsx(classes.columnQty, classes.columnTextRight)}>{t("bom.column.qty")}</li>
                        <li className={clsx(classes.columnPrice, classes.columnTextRight)}>
                          {t("bom.column.unit_price")}, {currency.symbol}
                        </li>
                        <li className={clsx(classes.columnTotal, classes.columnTextRight)}>
                          {t("bom.column.total_price")}, {currency.symbol}
                        </li>
                        <li className={clsx(classes.columnApprove, classes.columnTextRight)}>
                          {t("bom.column.approved")}
                          {order.status === "co sent" && (
                            <div>
                              <Checkbox
                                className={classes.headerCheckbox}
                                checked={!lines.some((i) => !i.approved)}
                                onChange={onCheckAllHandler}
                              />
                            </div>
                          )}
                        </li>
                      </ul>
                    </section>
                    <section>
                      {lines.map((line: any, i) => {
                        const cost = formatMoney(currencyPrice(line.price_incl_tax, line.price_currency)) || "";
                        const unitPrice = formatMoney(currencyPrice(line.unit_retail_price, line.price_currency)) || "";
                        return (
                          <OrderConfirmRow
                            key={i}
                            index={i + 1}
                            item={line}
                            cost={cost}
                            unitPrice={unitPrice}
                            onChangeApproved={onChangeApproved}
                            classes={classes}
                            orderStatus={order?.status}
                          />
                        );
                      })}
                    </section>
                  </section>
                  <Box className={classes.totalContainer} display="flex" justifyContent="space-between" mt={2}>
                    <Box style={{ fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: order.conditions }} />
                    {total !== null && (
                      <Box className={classes.taxesWrapper}>
                        <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
                          <Box className={classes.taxesTitle}>{t("total_excl_vat")}:</Box>
                          <Box className={classes.taxesValue}>
                            {formatMoney(currencyPrice(total, order.currency)) || "0.00"} {currency.symbol}
                          </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
                          <Box className={classes.taxesTitle}>{t("vat")}:</Box>
                          <Box className={classes.taxesValue}>
                            {formatMoney(currencyPrice(+order.total_incl_tax - +order.total_excl_tax, order.currency))}{" "}
                            {currency.symbol}
                          </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
                          <Box className={classes.taxesTitle}>{t("shipping_tax")}:</Box>
                          <Box className={classes.taxesValue}>
                            {formatMoney(currencyPrice(order.shipping_incl_tax, order.currency))} {currency.symbol}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          className={classes.total}
                          style={{ width: "100%" }}
                        >
                          <Box className={clsx(classes.taxesTitle, classes.totalTitle)}>{t("total")}:</Box>
                          <Box className={classes.taxesValue}>
                            {formatMoney(
                              currencyPrice(
                                total + +order.shipping_incl_tax + (+order.total_incl_tax - +order.total_excl_tax),
                                order.currency,
                              ),
                            )}{" "}
                            {currency.symbol}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {order.status === "co sent" ? (
                    <Box display="flex" justifyContent="flex-end" className={classes.actionRow}>
                      <Button
                        disabled={sending}
                        className={appTheme.buttonPrimary}
                        onClick={onDeclineModalOpen}
                        variant="contained"
                      >
                        {sending && modalMode === "decline" && (
                          <CircularProgress className={commonClasses.progressCircle} size="1.5em" />
                        )}
                        {t("order.decline")}
                      </Button>
                      <Button
                        disabled={sending || lines.every((i) => !i.approved)}
                        className={appTheme.buttonCreate}
                        onClick={() => setStepHandler(2)}
                        variant="contained"
                      >
                        {sending && modalMode === "confirm" && (
                          <CircularProgress className={commonClasses.progressCircle} size="1.5em" />
                        )}
                        {sending && modalMode === "confirm" ? t("order.order") : t("order.continue")}
                      </Button>
                    </Box>
                  ) : (
                    <Box className={classes.actionRow} display="flex" justifyContent="flex-end">
                      {!!order.order_url && (
                        <Button
                          color="primary"
                          variant="contained"
                          className={clsx(appTheme.buttonPrimary, classes.button)}
                          onClick={downloadPdf("order")}
                          disabled={pdfIsLoading}
                        >
                          Offer
                          <OpenInNewIcon />
                        </Button>
                      )}
                      {!!order.invoice_url && (
                        <Button
                          color="primary"
                          variant="contained"
                          className={clsx(appTheme.buttonPrimary, classes.button)}
                          onClick={downloadPdf("invoice")}
                          disabled={pdfIsLoading}
                        >
                          Invoice
                          <OpenInNewIcon />
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
                <Box className={classes.boxMargin}>
                  <Divider />
                  <Box m={2}>
                    <Typography style={{ fontSize: 16 }} variant="subtitle1" component="p">
                      {t("confirm_order.footer")}
                      <a href="mailto:sales@elfaro.ee">sales@elfaro.ee</a>
                    </Typography>
                    <a href="https://chiponline.tech/" target="_blank" rel="noreferrer" className={classes.footerLogo}>
                      <img src={elfaro_logo} alt="logo" />
                    </a>
                    <address style={{ marginBottom: 4 }}>ChipOnline, 24000, Serbia, Subotica, Korzo 1</address>
                    <a href="tel:+381621257226">+381 62 1257 226</a> |{" "}
                    <a href="mailto:info@chiponline.tech">info@chiponline.tech</a> |{" "}
                    <a href="https://chiponline.tech/">https://chiponline.tech/</a>
                  </Box>
                </Box>
              </>
            )}

            {/* Addresses */}
            {step === 2 && (
              <Box className={classes.boxMargin}>
                <OrderAddress type="billing" setStepHandler={setStepHandler} openModal={onConfirmModalOpen} />
              </Box>
            )}
            {step === 3 && (
              <Box className={classes.boxMargin}>
                <OrderAddress type="shipping" setStepHandler={setStepHandler} openModal={onConfirmModalOpen} />
              </Box>
            )}
            {step === 4 && (
              <Box className={classes.boxMargin}>
                <OrderAddress type="company" setStepHandler={setStepHandler} openModal={onConfirmModalOpen} />
              </Box>
            )}
          </Card>
        </Box>
      </Container>

      {/* Confirm Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={commonClasses.modal}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={commonClasses.paper}>
          <h3>
            {modalMode === "confirm"
              ? "Are you sure you want to send the order now?"
              : "Are you sure you want to decline the order?"}
          </h3>
          {modalMode === "decline" && (
            <p>
              <em>Please provide the reason for decline:</em>
            </p>
          )}
          {modalMode === "decline" && (
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                name="high_price"
                label={declineLabels.high_price}
                control={<Checkbox checked={declineReasons.high_price} onChange={onChangeDecline} />}
              />
              <FormControlLabel
                name="better_offer"
                label={declineLabels.better_offer}
                control={<Checkbox checked={declineReasons.better_offer} onChange={onChangeDecline} />}
              />
              <FormControlLabel
                name="long_time"
                label={declineLabels.long_time}
                control={<Checkbox checked={declineReasons.long_time} onChange={onChangeDecline} />}
              />
              <FormControlLabel
                name="incorrect_products"
                label={declineLabels.incorrect_products}
                control={<Checkbox checked={declineReasons.incorrect_products} onChange={onChangeDecline} />}
              />
              <FormControlLabel
                name="do_not_need"
                label={declineLabels.do_not_need}
                control={<Checkbox checked={declineReasons.do_not_need} onChange={onChangeDecline} />}
              />
              <FormControlLabel
                name="other"
                label={declineLabels.other}
                control={<Checkbox checked={declineReasons.other} onChange={onChangeDecline} />}
              />
              {declineReasons.other && (
                <TextField
                  style={{ marginTop: 12 }}
                  name="other_message"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={declineReasons.other_message}
                  onChange={onChangeDecline}
                  placeholder={"Why are you canceling the order?"}
                />
              )}
            </Box>
          )}
          <br />
          <Box className={commonClasses.actionsRow} display="flex" justifyContent="flex-end">
            <Button className={clsx(appTheme.buttonPrimary)} color="primary" variant="contained" onClick={onCloseModal}>
              Close
            </Button>
            <Button
              className={modalMode === "confirm" ? appTheme.buttonCreate : appTheme.buttonCancel}
              color="primary"
              variant="contained"
              onClick={onSubmit}
              disabled={
                sending ||
                (modalMode === "decline" &&
                  !Object.entries(declineReasons).some((i) => (i[0] === "other" ? false : !!i[1])))
              }
            >
              {sending && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
              {modalMode === "confirm" ? "Order now" : "Decline"}
            </Button>
          </Box>
        </div>
      </Modal>
    </Page>
  );
};

export default OrderConfirm;
