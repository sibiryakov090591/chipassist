import React, { ChangeEvent } from "react";
// import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { GroupItem, Row } from "@src/store/bom/bomTypes";
import { isEven } from "@src/utils/bom";
import { TableCell, TableRow, TextField, Tooltip, Box, Checkbox } from "@material-ui/core";
// import Highlighter from "react-highlight-words";
// import { simpleSplitForHighlighter } from "@src/utils/search";
import { formatMoney } from "@src/utils/formatters";
import useCurrency from "@src/hooks/useCurrency";
import clsx from "clsx";
import StatusChip from "@src/components/StatusChip/StatusChip";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./styles";

interface Props {
  index: number;
  items: Row[];
  itemsData: GroupItem[];
  readonly: boolean;
  qtyChangeHandler: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
  partNumberChangeHandler: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
  toggleRfqApproved: () => void;
}

const BomTableRow: React.FC<Props> = ({
  index,
  items,
  itemsData,
  readonly,
  qtyChangeHandler,
  partNumberChangeHandler,
  toggleRfqApproved,
}) => {
  // const appTheme = useAppTheme();
  const { t } = useI18n("bom");
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { currency, currencyPrice } = useCurrency();

  const onChangeHandler = (rowKey: string, field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    switch (field) {
      case "quantity":
        qtyChangeHandler(e, rowKey);
        break;
      case "part_number":
        e.target.value = e.target.value.toUpperCase();
        partNumberChangeHandler(e, rowKey);
        break;
      default:
        break;
    }
  };

  const toggleApproved = (row: Row) => () => {
    if (row.part_number.split(" ").length === 1 && !row.errors) toggleRfqApproved();
  };

  return (
    <React.Fragment>
      {items &&
        itemsData &&
        items.map((row) => {
          const { stockrecord, unitPrice, isAvaible } = itemsData.find((itemData) => itemData.id === row.id);
          const manufacturer = row.product && row.product.manufacturer?.name;

          return (
            <TableRow key={row.key} className={`bom-table-row ${isEven(index) ? classes.oddRow : ""}`}>
              <TableCell className={classes.tdIndex}>{index}</TableCell>
              <TableCell>
                <div className={classes.tableQuantityRef}>{row.part_number_ref}</div>
                <div style={{ paddingLeft: 15 }}>
                  {/* <Highlighter */}
                  {/*  searchWords={simpleSplitForHighlighter(row.part_number_ref)} */}
                  {/*  textToHighlight={row.part_number} */}
                  {/*  autoEscape={true} */}
                  {/* /> */}
                  <TextField
                    name="part_number"
                    size="small"
                    variant="outlined"
                    placeholder={t("column.part_number")}
                    type="text"
                    value={row.part_number}
                    onChange={onChangeHandler(row.key, "part_number")}
                    className={classes.partNumberInput}
                    disabled={readonly}
                    error={!!row.errors?.length || !row.part_number}
                    helperText={!!row.errors?.length && row.errors[0].message}
                  />
                </div>
              </TableCell>
              <TableCell className={classes.quantityTd}>
                <div className={classes.tableQuantityRef}>{row.quantity_ref}</div>
                <div style={{ display: "inline-block", textAlign: "center" }}>
                  <div style={{ position: "relative" }}>
                    <TextField
                      name="quantity"
                      size="small"
                      variant="outlined"
                      placeholder={t("column.qty")}
                      type="text"
                      value={row.quantity}
                      onChange={onChangeHandler(row.key, "quantity")}
                      onFocus={(e: any) => e.target.select()}
                      className={classes.tableQuantity}
                      disabled={readonly}
                      error={!row.quantity}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {stockrecord ? (
                  <>
                    <div>
                      <span className={classes.strongSpan}>{stockrecord.num_in_stock}</span>{" "}
                      {t("edit.in_stock", { count: stockrecord.num_in_stock })}
                    </div>
                    {!isAvaible ? (
                      <div className={classes.info}>
                        {t("edit.rfq_info")} <span className={classes.strongSpan}>RFQ</span>
                      </div>
                    ) : (
                      <div className={classes.info}>
                        {t("column.unit_price")}:{" "}
                        <strong>
                          {formatMoney(currencyPrice(unitPrice, stockrecord?.price_currency)) || "-"} {currency.symbol}
                        </strong>{" "}
                        | {t("column.product")} <strong>{manufacturer}</strong> | {t("column.lead_time")}:{" "}
                        <strong>{stockrecord?.lead_period_str || stockrecord?.lead_period || "-"}</strong>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>{t("edit.out_stock")}</div>
                    <div className={classes.info}>{t("edit.out_stock_hint")}</div>
                  </>
                )}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {readonly ? (
                  <div className={row.approved ? classes.requestedLine : classes.requestLine}>
                    {row.approved ? t("bom.edit.requested_btn") : t("bom.edit.not_ordered")}
                  </div>
                ) : (
                  <Tooltip
                    enterTouchDelay={1}
                    classes={{ tooltip: commonClasses.tooltip }}
                    title={
                      <div>
                        {!!stockrecord && isAvaible && (
                          <Box display="flex">
                            <span style={{ marginRight: 3 }}>
                              <StatusChip isRfq={false} />
                            </span>{" "}
                            - {t("product.status_online_hint")}
                          </Box>
                        )}
                        {!!stockrecord && !isAvaible && (
                          <Box display="flex">
                            <span style={{ marginRight: 3 }}>
                              <StatusChip isRfq={true} />
                            </span>{" "}
                            - {t("product.status_rfq_hint")}
                          </Box>
                        )}
                        {!stockrecord && <div>{t("bom.edit.rfq_status_found_approved")}</div>}
                      </div>
                    }
                  >
                    <div
                      className={clsx(classes.statusIcon, {
                        [classes.available]: !!stockrecord && isAvaible,
                        [classes.rfq]: !!stockrecord && !isAvaible,
                        [classes.empty]: !stockrecord,
                      })}
                    />
                  </Tooltip>
                )}
              </TableCell>
              {!readonly && (
                <TableCell style={{ textAlign: "center" }}>
                  <Checkbox
                    className={classes.checkbox}
                    checked={row.approved}
                    onChange={toggleApproved(row)}
                    name="approved"
                    disabled={!row.quantity || !row.part_number || !!row.errors}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })}
    </React.Fragment>
  );
};

export default React.memo(BomTableRow, (prev, next) => {
  if (prev.items && next.items) {
    return !next.items.some((nextItem) => {
      const prevItem = prev.items.find((i) => i.key === nextItem.key);
      if (!prevItem) return true;
      const {
        approved: prevApproved,
        part_number: prevPn,
        quantity: prevQty,
        errors: prevErrors,
        stockrecord: prevSr,
      } = prevItem;
      const {
        approved: nextApproved,
        part_number: nextPn,
        quantity: nextQty,
        errors: nextErrors,
        stockrecord: nextSr,
      } = nextItem;

      if (prevApproved !== nextApproved) return true;
      if (prevPn !== nextPn) return true;
      if (prevQty !== nextQty) return true;
      if (prevSr !== nextSr) return true;
      if (prevErrors?.length !== nextErrors?.length) return true;

      return false;
    });
  }
  return true;
});
