import React from "react";
import { Table, TableCell, TableHead, TableBody, TableRow, Button } from "@material-ui/core";
import moment from "moment";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { DATE_FORMAT } from "@src/config";
import { useStyles } from "./style.js";

function PcbMakeResponseTable(props) {
  const { item, borders, onEdit } = props;
  const classes = useStyles();
  const { t } = useI18n("pcb");
  const { currency, currencyPrice } = useCurrency();

  const getAnswerPartnerName = () => {
    if (item.response_pcb && item.response_pcb.length) {
      if (item.response_pcb[0].seller.name) {
        return item.response_pcb[0].seller.name;
      }
      if (item.response_pcb[0].seller && item.seller && item.seller.length) {
        const p = item.seller.filter(
          // eslint-disable-next-line no-shadow
          (partner) => partner.id === item.response_pcb[0].seller.id,
        );

        return p && p.length ? p[0].name : "";
      }
    }
    return "";
  };

  return (
    <React.Fragment>
      <Table size="small" className={borders && classes.borders}>
        <TableHead>
          <TableRow>
            <TableCell>{t("column.price_response")}</TableCell>
            <TableCell>{t("column.valid_date_response")}</TableCell>
            <TableCell>{t("column.partner")}</TableCell>
            <TableCell>{t("column.status")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.response_pcb && !!item.response_pcb.length && (
            <TableRow>
              <TableCell>
                {currencyPrice(item.response_pcb[0].price)}
                {currency.symbol}
              </TableCell>
              <TableCell>
                {item.response_pcb[0].valid_date
                  ? moment(item.response_pcb[0].valid_date).format(DATE_FORMAT)
                  : item.valid_date
                  ? moment(item.valid_date).format(DATE_FORMAT)
                  : ""}
              </TableCell>
              <TableCell>{getAnswerPartnerName()}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" size="small" style={{ cursor: "inherit" }}>
                  {item.response_pcb[0].status}
                </Button>
              </TableCell>
              <TableCell>
                {item.response_pcb[0].status === "CREATED" && (
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    size="small"
                    onClick={() => onEdit(item.response_pcb[0])}
                  >
                    {t("common.edit")}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table size="small" className={borders && classes.borders}>
        <TableHead>
          <TableRow>
            <TableCell>{t("column.comment")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.response_pcb && !!item.response_pcb.length && (
            <TableRow>
              <TableCell>{item.response_pcb[0].comment}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default PcbMakeResponseTable;
