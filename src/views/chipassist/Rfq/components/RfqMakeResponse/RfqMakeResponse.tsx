import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import { Table, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { useStyles as RfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { rfqResponse } from "@src/store/rfq/rfqActions";
import useAppTheme from "@src/theme/useAppTheme";
import { RfqItem } from "@src/store/rfq/rfqTypes";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./style.js";

interface RfqMakeResponseProps {
  onClose: () => void;
  onDeleteRfqFromStore: (id: number) => void;
  rfq: RfqItem;
  profile: Record<string, any>;
}

function RfqMakeResponse(props: RfqMakeResponseProps) {
  const { onClose, onDeleteRfqFromStore, rfq, profile } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const rfqModalClasses = RfqModalStyles();
  const [price, setPrice] = useState(rfq.price || "");
  const [partner, setPartner] = useState("");
  const [date, setDate] = useState();
  // moment
  //   .utc(rfq.delivery_date ? rfq.valid_date : {})
  //   .format()
  //   .slice(0, 19),
  const rfqResponseStatus = useAppSelector((state) => state.rfq.rfqResponse);
  const { currency, currencyPrice } = useCurrency();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();
  const { t } = useI18n("rfq");

  const hasResponse = rfq.response_rfq && rfq.response_rfq.length;

  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  const onChangeDate = useCallback((moment_date) => {
    const new_date = moment_date.format().slice(0, 19);
    setDate(new_date);
  }, []);

  const onChangePartner = useCallback((e) => {
    setPartner(e.target.value);
  }, []);

  const onSubmitResponse = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(rfqResponse(rfq.id, price, date, partner)).then(() => {
        onClose();
        if (onDeleteRfqFromStore) {
          onDeleteRfqFromStore(rfq.id);
        }
      });
    },
    [price, date, partner],
  );

  const partners = useMemo(() => {
    if (!rfq.seller.length) {
      return profile.partners.map((val: Record<string, any>) => ({ id: val.id, name: val.name }));
    }

    return rfq.seller && rfq.seller.length
      ? rfq.seller.filter((item) => {
          let inPartners = false;
          profile.partners.forEach((p: Record<string, any>) => {
            if (p.id === item.id) {
              inPartners = true;
            }
          });
          return inPartners;
        })
      : [];
  }, [rfq, profile]);

  const getAnswerPartnerName = () => {
    if (rfq.response_rfq && rfq.response_rfq.length) {
      if (rfq.response_rfq[0].seller.name) {
        return rfq.response_rfq[0].seller.name;
      }
      if (rfq.response_rfq[0].seller && rfq.seller && rfq.seller.length) {
        const p = rfq.seller.filter(
          // eslint-disable-next-line no-shadow
          (partner) => partner.id === rfq.response_rfq[0].seller.id,
        );

        return p && p.length ? p[0].name : "";
      }
    }
    return "";
  };

  useEffect(() => {
    if (partners.length === 1) {
      setPartner(partners[0].id);
    }
  }, []);

  return (
    <Dialog aria-labelledby="rfq answers" onClose={onClose} open={true} fullWidth>
      <form className={classes.modalContent} onSubmit={onSubmitResponse}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">{hasResponse ? t("response_your") : t("response_make")}</Typography>
        {hasResponse ? (
          <Box mt={3}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("column.price")}</TableCell>
                    <TableCell>{t("column.delviery_date")}</TableCell>
                    <TableCell>{t("column.partner")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {currencyPrice(parseFloat(rfq.response_rfq[0].price), currency.code)} {currency.symbol}
                    </TableCell>
                    <TableCell>
                      {rfq.response_rfq[0].delivery_date
                        ? new Date(rfq.response_rfq[0].delivery_date).toISOString()
                        : new Date(rfq.delivery_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getAnswerPartnerName()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Box>
        ) : (
          <Box mt={3} className={classes.fields}>
            <TextField
              id="price"
              label={t("column.price")}
              variant="outlined"
              fullWidth
              value={price} // TODO::price
              onChange={onChangePrice}
              size="small"
              required
            />
            <DatePicker
              className={rfqModalClasses.rfqDatePicker}
              name="date"
              required
              disableToolbar
              autoOk={true}
              format={"DD/MM/YYYY"}
              fullWidth
              label={t("column.date")}
              value={date}
              onChange={onChangeDate}
            />
            <TextField
              id="partner"
              select
              label={t("column.partner")}
              value={partner}
              onChange={onChangePartner}
              variant="outlined"
              size="small"
              required
            >
              {partners.map((item: Record<string, any>) => (
                <MenuItem className={appTheme.selectMenuItem} key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        <Box mt={3} display="flex" alignItems="center" className={classes.controls}>
          {!hasResponse && (
            <Button
              variant="contained"
              className={appTheme.buttonPrimary}
              disabled={rfqResponseStatus.loading || !partner}
              type="submit"
            >
              {t("common.submit")}
            </Button>
          )}

          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
          {rfqResponseStatus.loading && <span>{t("common.sending")}</span>}
          {rfqResponseStatus.error && <span className={classes.error}>{t("common.error")}</span>}
        </Box>
      </form>
    </Dialog>
  );
}

export default RfqMakeResponse;
