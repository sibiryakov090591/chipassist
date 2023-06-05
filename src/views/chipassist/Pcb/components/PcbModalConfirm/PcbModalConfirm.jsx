import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

function PcbModalConfirm({ onConfirm, onCancel }) {
  const { t } = useI18n("pcb");
  const onConfirmHandler = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const onCancelHandler = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onConfirmHandler}
      aria-labelledby="bom-confirm-title"
      aria-describedby="bom-confirm-description"
    >
      <DialogTitle id="bom-confirm-title">
        <span style={{ fontSize: "1.2em", fontWeight: 600 }}>{t("common.error")}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t("file.error")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelHandler} color="primary">
          {t("common.cancel")}
        </Button>
        <Button onClick={onConfirmHandler} color="primary" autoFocus>
          {t("common.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PcbModalConfirm;
