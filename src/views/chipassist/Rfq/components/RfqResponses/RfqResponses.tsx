import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import { Table, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import moment from "moment";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { DATE_FORMAT } from "@src/config";
import { approveResponse } from "@src/store/rfq/rfqActions";
import { RfqItem } from "@src/store/rfq/rfqTypes";
import { useStyles } from "./style.js";

function RfqResponses(props: { rfq: RfqItem; onClose: any }) {
  const { rfq, onClose } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("rfq");
  const { currency, currencyPrice } = useCurrency();

  const onApprove = (rfqId: number, sellerId: string) => () => {
    dispatch(approveResponse(rfqId, sellerId));
  };

  return (
    <Dialog aria-labelledby="rfq answers" onClose={onClose} open={true} fullWidth>
      <div className={classes.modalContent}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">{t("sellers_responses")}</Typography>
        <Box mt={3}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("column.seller")}</TableCell>
                  <TableCell>{t("column.price")}</TableCell>
                  <TableCell>{t("column.delivery_date")}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rfq.response_rfq.map((response: Record<any, any>) => {
                  const priceClasses = clsx({
                    [classes.price]: true,
                    [classes.goodPrice]: response.price < rfq.price,
                    [classes.badPrice]: response.price > rfq.price,
                  });
                  return (
                    <TableRow key={response.id}>
                      <TableCell>{response.seller.name}</TableCell>
                      <TableCell>
                        <span className={priceClasses}>
                          {currencyPrice(response.price, currency.code)} {currency.symbol}
                        </span>
                      </TableCell>
                      <TableCell>
                        {response["delivery-date"] ? (
                          <span style={{ color: red[600] }}>
                            {moment(response["delivery-date"]).format(DATE_FORMAT)}
                          </span>
                        ) : (
                          <span style={{ color: green[600] }}>{moment(rfq.delivery_date).format(DATE_FORMAT)}</span>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {rfq.approved === response.seller.id ? (
                          <div className={classes.approved}>
                            {/* @ts-ignore */}
                            <CheckIcon size="small" />
                            <span>{t("column.approved")}</span>
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={onApprove(rfq.id, response.seller.id)}
                          >
                            {t("column.approve")}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </div>
    </Dialog>
  );
}

export default RfqResponses;
