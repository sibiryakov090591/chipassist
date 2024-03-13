import React, { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  CircularProgress,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
} from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
// import { DatePicker } from "@material-ui/pickers";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
// import { useStyles as PcbModalStyles } from "@src/views/chipassist/Pcb/components/PcbModal/PcbModalStyles";
import { pcbResponse } from "@src/store/pcb/pcbActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import PcbMakeResponseTable from "../PcbMakeResponseTable/PcbMakeResponseTable";
import { useStyles } from "./style.js";

function PcbMakeResponse(props) {
  const { onClose, onDeletePcbFromStore, pcb, profile, isEditInstance } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  // const pcbModalClasses = PcbModalStyles();
  const [updateId, setUpdateId] = useState(null);
  const [price, setPrice] = useState(pcb ? pcb.price || "" : "");
  const [partner, setPartner] = useState("");
  // const [lead, setLead] = useState("");
  const [comment, setComment] = useState("");
  // const [date, setDate] = useState(
  //   moment
  //     .utc(pcb && pcb.valid_date ? pcb.valid_date : {})
  //     .format()
  //     .slice(0, 19),
  // );
  const pcbResponseStatus = useAppSelector((state) => state.pcb.pcbResponse);
  const dispatch = useAppDispatch();
  const { t } = useI18n("pcb");

  const hasResponse = pcb.response_pcb && pcb.response_pcb.length;

  const onEdit = (item) => {
    setUpdateId(item.id);
    setPrice(item.price);
    setPartner(item.seller.id);
    // setDate(item.valid_date);
    setComment(item.comment);
  };
  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);
  // const onChangeDate = useCallback((moment_date) => {
  //   const new_date = moment_date.format().slice(0, 19);
  //   setDate(new_date);
  // }, []);
  const onChangePartner = useCallback((e) => {
    setPartner(e.target.value);
  }, []);
  // const onChangeLead = useCallback((e) => {
  //   setLead(e.target.value);
  // }, []);
  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmitResponse = useCallback(
    (e) => {
      e.preventDefault();
      const status = e.currentTarget.value;

      const data = { price, seller: partner, status, comment };

      dispatch(pcbResponse(pcb.id, data, updateId)).then(() => {
        setUpdateId(null);
        onClose();
        if (onDeletePcbFromStore) {
          onDeletePcbFromStore(pcb.id);
        }
      });
    },
    [price, partner, comment],
  );

  const partners = useMemo(() => {
    const profilePcbPartners = profile.partners.filter((val) => val.pcb);
    if (!pcb.seller.length) {
      return profilePcbPartners.map((val) => ({ id: val.id, name: val.name }));
    }

    return pcb.seller && pcb.seller.length
      ? pcb.seller.filter((item) => {
          let inPartners = false;
          profilePcbPartners.forEach((p) => {
            if (p.id === item.id) {
              inPartners = true;
            }
          });
          return inPartners;
        })
      : [];
  }, [pcb, profile]);

  useEffect(() => {
    if (partners.length === 1) {
      setPartner(partners[0].id);
    }
  }, []);

  useEffect(() => {
    if (isEditInstance && pcb.id && pcb.response_pcb.length) onEdit(pcb.response_pcb[0]);
  }, [isEditInstance, pcb]);

  return (
    <Dialog aria-labelledby="pcb answers" onClose={onClose} open={true} fullWidth>
      <form className={`${classes.modalContent} pcb-make-response`}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">
          {hasResponse && !updateId ? t("response_your") : updateId ? t("response_make") : t("response_update")}
        </Typography>
        {hasResponse && !updateId ? (
          <Box mt={3}>
            <Paper>
              <PcbMakeResponseTable item={pcb} onEdit={onEdit} />
            </Paper>
          </Box>
        ) : (
          <React.Fragment>
            <Box mt={3} className={classes.fields}>
              <TextField
                id="price"
                label={t("column.price_response")}
                variant="outlined"
                fullWidth
                value={price} // TODO::price
                onChange={onChangePrice}
                size="small"
                required
              />
              {/* <DatePicker */}
              {/*  className={pcbModalClasses.pcbDatePicker} */}
              {/*  name="date" */}
              {/*  required */}
              {/*  disableToolbar */}
              {/*  autoOk={true} */}
              {/*  format={DATE_FORMAT} */}
              {/*  fullWidth */}
              {/*  label={t("column.valid_date_response")} */}
              {/*  value={date} */}
              {/*  onChange={onChangeDate} */}
              {/* /> */}
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
                {partners.map((item) => (
                  <MenuItem className={appTheme.selectMenuItem} key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField
              id="lead"
              label="Lead time (days)"
              value={lead}
              onChange={onChangeLead}
              variant="outlined"
              size="small"
            /> */}
            </Box>
            <div>
              <TextField
                name="comment"
                label={t("column.comment")}
                multiline
                rows={4}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={comment}
                onChange={onChangeComment}
                style={{ width: "100%", marginTop: 10 }}
              />
            </div>
          </React.Fragment>
        )}

        <div>
          {!!pcbResponseStatus.error && (
            <span className={classes.error}>{pcbResponseStatus.message || t("common.error")}</span>
          )}
        </div>

        <Box mt={3} display="flex" justifyContent="space-between" className={classes.controls}>
          <Button variant="contained" onClick={onClose}>
            {t("common.close")}
          </Button>

          {(!hasResponse || updateId) && (
            <Button
              variant="contained"
              className={appTheme.buttonPrimary}
              disabled={pcbResponseStatus.loading || !partner}
              type="submit"
              value="CREATED"
              onClick={onSubmitResponse}
            >
              {t("response_save")}
            </Button>
          )}
          {(!hasResponse || updateId) && (
            <Button
              variant="contained"
              className={appTheme.buttonPrimary}
              disabled={pcbResponseStatus.loading || !partner}
              type="submit"
              value="READY"
              onClick={onSubmitResponse}
            >
              {t("response_send")}
            </Button>
          )}
          {pcbResponseStatus.loading && <CircularProgress className={classes.progressCircle} size="2em" />}
        </Box>
      </form>
    </Dialog>
  );
}

export default PcbMakeResponse;
