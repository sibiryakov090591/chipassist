import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { GroupItem, Row, GroupRfqData, CashModalItem } from "@src/store/bom/bomTypes";
import { isEven } from "@src/utils/bom";
import { Button, CircularProgress, TableCell, TableRow, TextField } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import { simpleSplitForHighlighter } from "@src/utils/search";
import { validateQuantity } from "@src/utils/product";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { formatMoney } from "@src/utils/formatters";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import useCurrency from "@src/hooks/useCurrency";
import { getRfqRowCount, saveCashModalProducts } from "@src/store/bom/bomActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";
import { useStyles as useBomEditorStyles } from "../style";

interface Props {
  isRfq: boolean;
  index: number;
  groupKey: string;
  items: Row[];
  itemsData: GroupItem[];
  rfqData: GroupRfqData;
  modalProducts: CashModalItem;
  isShowPriceHint: boolean;
  hintPrice: number;
  hiddenColumns: any;
  readonly: boolean;
  qtyChangeHandler: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
  onOpenProductSelectModal: () => void;
  toggleRfqApproved: () => void;
  deleteGroupHandler: () => void;
  deleteLineHandler: (lineId: number | string) => void;
}

const BomTableRow: React.FC<Props> = ({
  isRfq,
  index,
  items,
  itemsData,
  rfqData,
  modalProducts,
  isShowPriceHint,
  hintPrice,
  hiddenColumns,
  groupKey,
  readonly,
  qtyChangeHandler,
  onOpenProductSelectModal,
  toggleRfqApproved,
  deleteGroupHandler,
  deleteLineHandler,
}) => {
  const appTheme = useAppTheme();
  const { t } = useI18n("bom");
  const classes = useStyles();
  const bomEditorClasses = useBomEditorStyles();
  const { currency, currencyPrice } = useCurrency();
  const dispatch = useAppDispatch();

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [alternativesCount, setAlternativesCount] = useState(null);

  useEffect(() => {
    if (items) {
      // For REQUEST button
      setIsDisabledButton(items.some((row) => row.quantity <= 0));
    }
  }, [items]);

  useEffect(() => {
    if (itemsData.some((item) => !item.stockrecord)) {
      if (modalProducts && !modalProducts.rfqData) {
        dispatch(getRfqRowCount(items[0].part_number_ref)).then((res: GroupRfqData) => {
          dispatch(saveCashModalProducts(items[0].part_number_ref, modalProducts.products, res));
        });
      }
    }
  }, [itemsData]);

  useEffect(() => {
    if (itemsData && modalProducts) {
      let count = 0;
      modalProducts.products.forEach((prod) => {
        prod.stockrecords.forEach((sr) => {
          if (!itemsData.some((i) => i.stockrecord?.id === sr?.id)) {
            count += 1;
          }
        });
      });
      setAlternativesCount(count);
    }
  }, [modalProducts, itemsData]);

  const hiddenColumnsLength = useMemo(() => Object.keys(hiddenColumns).length, []);
  const restQtyHint = useMemo(() => {
    const stockrecord = itemsData.find((item) => item.stockrecord?.id === items[0].stockrecord)?.stockrecord;
    if (stockrecord) {
      const validQty = validateQuantity(items[0].quantity, stockrecord)?.validLowQuantity || items[0].quantity;
      const validNumInStock =
        validateQuantity(stockrecord.num_in_stock, stockrecord)?.validLowQuantity || stockrecord.num_in_stock;
      const restQty = validQty - validNumInStock;
      if (restQty > 0) {
        return {
          orderQty: validNumInStock,
          restQty: validateQuantity(restQty, stockrecord)?.validLowQuantity || restQty,
        };
      }
    }
    return null;
  }, [items, itemsData]);

  const onChangeHandler = (rowKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    qtyChangeHandler(e, rowKey);
  };

  return (
    <React.Fragment>
      {/* Items wrapper with index column, references row and confirm button */}
      <TableRow className={isEven(index) ? classes.oddRow : ""}>
        <TableCell rowSpan={items ? items.length + 1 : 2} className={classes.tdIndex}>
          {index}
        </TableCell>
        <TableCell className={classes.refRow}>
          <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{groupKey}</span>
        </TableCell>
        <TableCell className={`${classes.refRow} ${classes.quantityTd}`}>
          <span className={classes.tableQuantityRef}>{items[0].quantity_ref || 1}</span>
        </TableCell>
        <TableCell
          colSpan={6 - hiddenColumnsLength}
          rowSpan={isRfq && items?.length < 2 ? items.length + 1 : 1}
          className={isRfq ? "" : classes.refRow}
        >
          {isRfq && items?.length < 2 && (
            <div
              className={`${classes.notFoundProduct} ${
                items[0].approved ? classes.notFoundProductApproved : ""
              } product-not-found-message`}
            >
              {!rfqData && <CircularProgress size="1em" />}
              {rfqData &&
                (rfqData.total_num_in_stock > 0 ? (
                  <>
                    <span style={{ marginRight: 3 }}>
                      {formatMoney(items[0].approved ? items[0].quantity : rfqData.total_num_in_stock, 0, " ", " ")}
                    </span>
                    {items[0].approved ? t("bom.edit.product_not_found_approved") : t("bom.edit.product_not_found")}
                  </>
                ) : rfqData.status === "found" ? (
                  items[0].approved ? (
                    t("bom.edit.rfq_status_found_approved")
                  ) : (
                    t("bom.edit.rfq_status_found")
                  )
                ) : items[0].approved ? (
                  t("bom.edit.rfq_status_not_found_approved")
                ) : (
                  t("bom.edit.rfq_status_not_found")
                ))}
            </div>
          )}
        </TableCell>
        <TableCell rowSpan={items ? items.length + 1 : 2} className={classes.tdCheckButton}>
          <div style={{ display: "inline-block" }}>
            {!isRfq ? (
              <React.Fragment>
                {!readonly ? (
                  <>
                    <Button
                      className={`${appTheme.buttonPrimary} ${
                        !items.some((v) => !v.approved) ? appTheme.buttonCreate : ""
                      } ${classes.rowButton} bom-confirm-button`}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onOpenProductSelectModal}
                    >
                      {!items.some((v) => !v.approved) ? t("product_modal.saved") : t("product_modal.save")}
                    </Button>
                    <div style={{ position: "relative", height: 15 }}>
                      <div className={classes.unitsCount} onClick={onOpenProductSelectModal}>
                        {alternativesCount !== null ? (
                          <span className={`bom-units-count`}>
                            {alternativesCount + t("bom.column.units_count", { count: alternativesCount })}
                          </span>
                        ) : (
                          <span>
                            <CircularProgress size="1em" />
                            {t("bom.column.units_count", { count: 0 })}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <span
                    style={{ textTransform: "uppercase" }}
                    className={items[0].approved ? classes.statusConfirmed : ""}
                  >
                    {items[0].approved ? t("bom.edit.ordered") : t("bom.edit.not_ordered")}
                  </span>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {!readonly ? (
                  <Button
                    className={`${classes.rowButton} ${appTheme.buttonPrimary} ${
                      items[0].approved ? classes.yellowBtn : ""
                    }`}
                    variant="contained"
                    size="small"
                    onClick={toggleRfqApproved}
                    disabled={isDisabledButton}
                  >
                    {items[0].approved ? t("bom.edit.requested_btn") : t("bom.edit.request_btn")}
                  </Button>
                ) : (
                  <span
                    style={{ textTransform: "uppercase" }}
                    className={items[0].approved ? classes.statusRequested : ""}
                  >
                    {items[0].approved ? t("bom.edit.requested_btn") : t("bom.edit.not_ordered")}
                  </span>
                )}
              </React.Fragment>
            )}
          </div>
        </TableCell>
        {!readonly && (
          <>
            {!isRfq || items?.length < 2 ? (
              <TableCell rowSpan={items ? items.length + 1 : 2}>
                <ConfirmButton
                  onAction={deleteGroupHandler}
                  className={classes.deleteBom}
                  question={t("edit.delete_item")}
                  caption={t("common.delete")}
                />
              </TableCell>
            ) : (
              <TableCell />
            )}
          </>
        )}
      </TableRow>

      {/* Items body */}
      {items &&
        itemsData &&
        items.map((row) => {
          const { stockrecord, unitPrice, cost } = itemsData.find((itemData) => itemData.id === row.id);

          const qtyError = validateQuantity(row.quantity, stockrecord);
          const manufacturer = row.product && row.product.manufacturer?.name;

          return (
            <TableRow key={row.key} className={`bom-table-row ${isEven(index) ? classes.oddRow : ""}`}>
              <TableCell>
                <div style={{ paddingLeft: 15 }}>
                  <Highlighter
                    searchWords={simpleSplitForHighlighter(groupKey)}
                    textToHighlight={(row.product && row.product.upc) || groupKey}
                    autoEscape={true}
                  />
                </div>
              </TableCell>
              <TableCell className={classes.quantityTd}>
                <div style={{ display: "inline-block", textAlign: "center" }}>
                  <div style={{ position: "relative" }}>
                    <TextField
                      name="quantity"
                      size="small"
                      variant="outlined"
                      placeholder={t("column.qty")}
                      type="text"
                      value={row.quantity}
                      onChange={onChangeHandler(row.key)}
                      className={classes.tableQuantity}
                      error={!!qtyError || row.quantity > stockrecord?.num_in_stock}
                      disabled={readonly}
                    />
                    {(!!qtyError || row.quantity > stockrecord?.num_in_stock) && (
                      <div className={classes.errorWrapper}>
                        <ErrorOutlineIcon className={classes.errorIcon} />
                        <div className={classes.errorText}>
                          {!!qtyError && <div>{`${t(qtyError.i18message)} ${qtyError.amount}`}</div>}
                          {row.quantity > stockrecord?.num_in_stock && (
                            <div>{`${t("distributor.in_stock")}: ${stockrecord?.num_in_stock}`}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              {stockrecord ? (
                <>
                  {!hiddenColumns["distributor.in_stock"] && (
                    <TableCell className={`${classes.tdGroup} ${bomEditorClasses.numInStockTh}`}>
                      {formatMoney(stockrecord?.num_in_stock, 0) || "-"}
                    </TableCell>
                  )}
                  {!hiddenColumns["distributor.lead_period"] && (
                    <TableCell style={{ whiteSpace: "nowrap" }} className={classes.tdGroup}>
                      {stockrecord?.lead_period_str || stockrecord?.lead_period || "-"}
                    </TableCell>
                  )}
                  {!hiddenColumns["distributor.distributor"] && (
                    <TableCell className={classes.tdGroup}>{stockrecord?.partner_name || "-"}</TableCell>
                  )}
                  {!hiddenColumns["column.product"] && (
                    <TableCell className={classes.tdGroup}>{(stockrecord && manufacturer) || "-"}</TableCell>
                  )}
                  {!hiddenColumns["column.unit_price"] && (
                    <TableCell className={`${classes.tdGroup} ${classes.textAlignEnd}`}>
                      {formatMoney(currencyPrice(unitPrice, stockrecord?.price_currency)) || "-"}
                    </TableCell>
                  )}
                  {!hiddenColumns["column.total_price"] && (
                    <TableCell className={`${classes.tdGroup} ${classes.textAlignEnd}`}>{cost || "-"}</TableCell>
                  )}
                </>
              ) : (
                items?.length > 1 && (
                  <>
                    <TableCell
                      colSpan={6 - hiddenColumnsLength}
                      className={`${classes.tdGroup} ${
                        items[0]?.approved ? classes.requestedLine : classes.requestLine
                      }`}
                    >
                      {items[0]?.approved ? t("bom.edit.requested_line") : t("bom.edit.request_line")}
                    </TableCell>
                    <TableCell>
                      <ConfirmButton
                        onAction={() => deleteLineHandler(row.id)}
                        className={classes.deleteBom}
                        question={t("edit.delete_item")}
                        caption={t("common.delete")}
                      />
                    </TableCell>
                  </>
                )
              )}
            </TableRow>
          );
        })}
      {isShowPriceHint && items[0].approved && (
        <TableRow>
          <TableCell colSpan={11 - hiddenColumnsLength} className={classes.betterPriceHint}>
            {t("edit.better_price_1")}
            <span style={{ fontWeight: "bold" }}>{`${formatMoney(hintPrice)} ${currency?.symbol}`}</span>
            {t("edit.better_price_2")}
            <span
              style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
              onClick={onOpenProductSelectModal}
            >
              {t("bom.edit.alternatives")}
            </span>
          </TableCell>
        </TableRow>
      )}
      {!isShowPriceHint && items[0].approved && restQtyHint && (
        <TableRow>
          <TableCell colSpan={11 - hiddenColumnsLength} className={classes.betterPriceHint}>
            {t("product_modal.rest_qty_hint", {
              order_count: restQtyHint.orderQty,
              rest_count: restQtyHint.restQty,
            })}
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default BomTableRow;
