import React, { useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { rfqUpdate } from "@src/store/rfq/rfqActions";
import useAppTheme from "@src/theme/useAppTheme";
import { RfqItem } from "@src/store/rfq/rfqTypes";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./RfqCommentModalStyle.js";

interface RfqCommentModalProps {
  onClose: () => void;
  rfq: RfqItem;
}

function RfqCommentModal({ onClose, rfq }: RfqCommentModalProps) {
  const [isEdit] = useState(true);
  const refComment = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const rfqResponseStatus = useAppSelector((state) => state.rfq.rfqResponse);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();
  const { t } = useI18n("rfq");

  const onSubmitResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { comment: refComment.current.value };

    dispatch(rfqUpdate(rfq, data)).then(() => {
      onClose();
    });

    return true;
  };

  return (
    <Dialog aria-labelledby="rfq comment" onClose={onClose} open={true} fullWidth>
      <form className={classes.modalContent} onSubmit={onSubmitResponse}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">{t("column.comment")}</Typography>
        <Box mt={3}>
          <TextField
            inputRef={refComment}
            className={!isEdit ? classes.fieldReadOnly : ""}
            name="comment"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            defaultValue={rfq.comment || ""}
            size="small"
            inputProps={{
              readOnly: !isEdit,
            }}
          />
        </Box>

        <Box mt={3} display="flex" alignItems="center" justifyContent="flex-end" className={classes.controls}>
          <Button className={appTheme.buttonPrimary} variant="contained" onClick={onClose}>
            {t("close")}
          </Button>
          <Button
            variant="contained"
            className={appTheme.buttonCreate}
            disabled={rfqResponseStatus.loading}
            type="submit"
          >
            {isEdit ? t("common.submit") : t("common.edit")}
          </Button>
          {rfqResponseStatus.loading && <span>{t("common.sending")}</span>}
          {rfqResponseStatus.error && <span className={classes.error}>{t("common.error")}</span>}
        </Box>
      </form>
    </Dialog>
  );
}

export default RfqCommentModal;
