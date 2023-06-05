import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { cancelInvoice } from "@src/store/checkout/checkoutActions";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
import { Link, useLocation } from "react-router-dom";
import OrderModal from "@src/views/chipassist/Orders/components/OrderModal/OrderModal";
import { DataField, DataLabel, DataRow, DataValue } from "@src/components/DataTable/DataTable";
import { isEven } from "@src/utils/bom";
import { useStyles } from "./styles";

const Order = (props) => {
  const { idx, number, date, total, orderCurrency, statusLabel, onCancel, highlight, index } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("order");
  const { currencyPrice, currency } = useCurrency();
  const location = useLocation();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  const onCancelInvoice = () => {
    setWillDelete(true);
    dispatch(cancelInvoice(idx)).then(() => {
      onCancel();
    });
  };

  const onCloseModal = () => {
    setCancelModalOpen(!cancelModalOpen);
  };

  return (
    <>
      <DataRow className={isEven(index) ? "" : classes.odd}>
        <DataField className={clsx(highlight && classes.trSelected)} gridArea="number">
          <DataLabel>{t("common.number")}</DataLabel>
          <DataValue>{number}</DataValue>
        </DataField>
        <DataField className={clsx(highlight && classes.trSelected)} gridArea="date">
          <DataLabel>{t("common.date")}</DataLabel>
          <DataValue>{date}</DataValue>
        </DataField>
        <DataField className={clsx(highlight && classes.trSelected)} gridArea="total">
          <DataLabel>{`${t("common.total")}, ${currency.symbol}`}</DataLabel>
          <DataValue>{formatMoney(currencyPrice(total, orderCurrency))}</DataValue>
        </DataField>
        <DataField className={clsx(highlight && classes.trSelected)} gridArea="status">
          <DataLabel>{t("common.status")}</DataLabel>
          <DataValue>{statusLabel}</DataValue>
        </DataField>
        <DataField className={clsx(highlight && classes.trSelected)} gridArea="actions">
          <DataValue>
            <Box display="flex" alignItems="center" justifyContent="flex-end" className={classes.actionRow}>
              <Button
                className={statusLabel === "co sent" ? appTheme.buttonCreate : appTheme.buttonPrimary}
                variant="contained"
                size="small"
                component={Link}
                to={{ pathname: `/order-confirm/${idx}`, state: { backQuery: location.search } }}
                style={{ marginRight: 15 }}
                disabled={willDelete}
              >
                {statusLabel === "co sent" ? t("accept") : t("open_invoice")}
              </Button>

              {/* {props.status !== "cancelled" && ( */}
              {/*  <Button */}
              {/*    size="small" */}
              {/*    className={clsx(classes.deleteBom, appTheme.buttonCancel)} */}
              {/*    onClick={() => setCancelModalOpen(true)} */}
              {/*    disabled={willDelete} */}
              {/*  > */}
              {/*    {t("common.cancel")} */}
              {/*  </Button> */}
              {/* )} */}
            </Box>
          </DataValue>
        </DataField>
      </DataRow>
      {cancelModalOpen && <OrderModal onCloseModal={onCloseModal} cancelHandler={onCancelInvoice} />}
    </>
  );
};

export default Order;
