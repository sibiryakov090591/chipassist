import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Button, Hidden, Tooltip } from "@material-ui/core";
import { Stockrecord } from "@src/store/products/productTypes";
import { isProductAvailable, getPrice, getDynamicMoq } from "@src/utils/product";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { formatMoney } from "@src/utils/formatters";
import InfoIcon from "@src/components/Icons/InfoIcon";
import { getDateLag } from "@src/utils/date";
import { DataField } from "@src/components/DataTable/DataTable";
import { useStyles } from "../cartItemStyles";
import { useStyles as useCartStyles } from "../../../../cartStyles";

interface Props {
  stockrecord: Stockrecord;
  quantity: number;
  rfq: number;
  sortedPrices: Stockrecord["prices"];
  isUpdating: boolean;
  onMoveToOrderClick: () => void;
}
const ItemValid: React.FC<Props> = ({ stockrecord, quantity, rfq, sortedPrices, isUpdating, onMoveToOrderClick }) => {
  const classes = useStyles();
  const classesCart = useCartStyles();
  const { t } = useI18n("cart");
  const { currency, currencyPrice } = useCurrency();

  return (
    <React.Fragment>
      {!!rfq && isProductAvailable(stockrecord, quantity) && getDynamicMoq(stockrecord) <= quantity && (
        <React.Fragment>
          <DataField gridArea="product-errors" style={{ padding: 0, marginBottom: 10, borderTop: "none" }}>
            <Alert className={`${classes.alert} valid`} severity="info">
              <div className={`${classes.updatePriceText} ${classesCart.alertMessage} ${classes.alertValid}`}>
                <span>
                  {t("rfq_valid_item")}
                  <br />
                  {t("price_per_unit")}{" "}
                  <b>
                    {currency.symbol}
                    {formatMoney(currencyPrice(getPrice(quantity, stockrecord), stockrecord?.price_currency)) || 0}
                  </b>
                </span>
                <Button
                  disabled={isUpdating}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={`${classes.updatePriceBtn} ${classes.validBtn}`}
                  onClick={onMoveToOrderClick}
                >
                  {t("order_add_button")}
                </Button>
              </div>
            </Alert>
          </DataField>
          <Hidden smDown>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
            <DataField className={classes.alertValidRow} gridArea="false">
              <React.Fragment>
                <div style={{ display: "flex", whiteSpace: "nowrap" }}>
                  <span>
                    {currency.symbol}
                    {formatMoney(currencyPrice(getPrice(quantity, stockrecord), stockrecord?.price_currency)) || 0}
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
                                  <th key={v.id}>{formatMoney(v.amount, 2, ".", "`")}</th>
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
                        <Hidden smDown>
                          <InfoIcon className={classes.priceTooltipIcon} />
                        </Hidden>
                      </div>
                    </Tooltip>
                  )}
                </div>
                <Hidden smDown>
                  <div className={classes.distributorUpdated}>
                    <div>
                      {!!stockrecord?.date_updated && (
                        <React.Fragment>
                          {t("distributor.updated")}: {getDateLag(new Date(), new Date(stockrecord?.date_updated))}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </Hidden>
              </React.Fragment>
            </DataField>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
            <DataField className={classes.alertValidRow} gridArea="false">
              <span style={{ paddingTop: 10.5, paddingBottom: 10.5 }}>
                <b>
                  {currency.symbol}
                  {quantity
                    ? formatMoney(
                        currencyPrice(quantity * getPrice(quantity, stockrecord), stockrecord?.price_currency),
                      )
                    : 0}
                </b>
              </span>
            </DataField>
            <DataField className={classes.alertValidRow} gridArea="false"></DataField>
          </Hidden>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ItemValid;
