import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { hideAlertsModalMessageAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import { useStyles } from "./alertModalStyles";

const AlertModal = () => {
  const classes = useStyles();
  const { t } = useI18n("progress_modal");
  const dispatch = useAppDispatch();
  const appTheme = useAppTheme();

  const showedMessageAlert = useAppSelector((state) => state.alerts.showAlertModal);
  const message = useAppSelector((state) => state.alerts.alertModalMessage);

  const handleClose = () => {
    dispatch(hideAlertsModalMessageAction());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showedMessageAlert}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showedMessageAlert}>
          <div className={classes.paper}>
            {message?.severity === "success" && <h1 className={classes.title}>{t("success_title")}</h1>}
            <h2 dangerouslySetInnerHTML={{ __html: message?.title }} />
            <p className={classes.description} dangerouslySetInnerHTML={{ __html: message?.description }} />
            <br />
            <Box display="flex" justifyContent="flex-end">
              <Button
                className={clsx(appTheme.buttonPrimary, "alert-modal-button")}
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                ok
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AlertModal;
