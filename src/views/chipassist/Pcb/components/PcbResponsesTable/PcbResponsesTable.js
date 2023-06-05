import React from "react";
import { Table, TableCell, TableHead, TableRow, Box, TableBody, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import red from "@material-ui/core/colors/red";
import moment from "moment";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { DATE_FORMAT } from "@src/config";
import { approveResponse } from "@src/store/pcb/pcbActions";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./style.js";

function PcbResponsesTable(props) {
  const { item, size, borders } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("pcb");
  const { currency, currencyPrice } = useCurrency();

  const onApprove = (pcbId, sellerId) => () => {
    dispatch(approveResponse(pcbId, sellerId));
  };

  return (
    <React.Fragment>
      {item.response_pcb &&
        item.response_pcb.map((response) => {
          const priceClasses = clsx({
            [classes.price]: true,
            [classes.goodPrice]: response.price < item.price,
            [classes.badPrice]: response.price > item.price,
          });
          return (
            <Box mb={2} key={response.id}>
              <Table size={size} className={borders && classes.borders}>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("column.seller")}</TableCell>
                    <TableCell>{t("column.price_response")}</TableCell>
                    <TableCell>{t("column.valid_date_response")}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{response.seller.name}</TableCell>
                    <TableCell>
                      <span className={priceClasses}>
                        {currencyPrice(response.price)} {currency.symbol}
                      </span>
                    </TableCell>
                    <TableCell>
                      {response.valid_date && (
                        <span style={{ color: red[600] }}>{moment(response.valid_date).format(DATE_FORMAT)}</span>
                      )}
                    </TableCell>
                    <TableCell align="right" className="test-pcb-row-approve">
                      {item.approved === response.seller.id ? (
                        <div className={classes.approved}>
                          <CheckIcon size="small" />
                          <span>{t("column.approved")}</span>
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          className={appTheme.buttonPrimary}
                          size="small"
                          onClick={onApprove(item.id, response.seller.id)}
                        >
                          {t("column.approve")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table size={size} className={borders && classes.borders}>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("column.comment")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{response.comment}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          );
        })}
    </React.Fragment>
  );
}

export default PcbResponsesTable;
