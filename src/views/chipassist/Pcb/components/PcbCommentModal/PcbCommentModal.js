import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { pcbUpdate } from "@src/store/pcb/pcbActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./PcbCommentModalStyle.js";

function PcbCommentModal(props) {
  const { onClose, pcb } = props;
  const [isEdit] = useState(true);
  const refComment = useRef(false);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const pcbResponseStatus = useAppSelector((state) => state.pcb.pcbResponse);
  const dispatch = useAppDispatch();
  const { t } = useI18n("pcb");

  useEffect(() => {
    // setIsEdit(!pcb.comment);
  }, [pcb]);

  const onSubmitResponse = (e) => {
    e.preventDefault();
    // if (!isEdit) return setIsEdit(true);

    const data = { comment: refComment.current.value };
    dispatch(pcbUpdate(pcb.id, data)).then(() => {
      onClose();
    });

    return true;
  };

  return (
    <Dialog aria-labelledby="pcb comment" onClose={onClose} open={true} fullWidth>
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
            defaultValue={pcb.comment || ""}
            size="small"
            inputProps={{
              readOnly: !isEdit || !!pcb.response_pcb.length,
            }}
          />
        </Box>

        <Box mt={3} display="flex" alignItems="center" className={classes.controls}>
          <Button
            variant="contained"
            className={appTheme.buttonPrimary}
            disabled={pcbResponseStatus.loading || !!pcb.response_pcb.length}
            type="submit"
          >
            {isEdit ? t("common.submit") : t("common.edit")}
          </Button>
          <Button variant="contained" onClick={onClose}>
            {t("common.close")}
          </Button>
          {pcbResponseStatus.loading && <span>{t("common.sending")}</span>}
          {pcbResponseStatus.error && <span className={classes.error}>{t("common.error")}</span>}
        </Box>
      </form>
    </Dialog>
  );
}

export default PcbCommentModal;
