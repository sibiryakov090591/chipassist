import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { hideRegisterModalAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
// import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./suppliersRegisterModalStyles";

const RegisterModal = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  // const { t } = useI18n("progress_modal");
  const dispatch = useAppDispatch();
  const appTheme = useAppTheme();

  const showedMessageAlert = useAppSelector((state) => state.alerts.showRegisterModal);

  const handleClose = () => {
    dispatch(hideRegisterModalAction());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={commonClasses.modal}
        open={showedMessageAlert}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showedMessageAlert}>
          <div className={commonClasses.paper}>
            <h1>Register</h1>
            <p className={classes.description}>
              То register as a supplier please send us a mail to{" "}
              <a href="mailto:connect@chipassist.com">connect@chipassist.com</a>
            </p>
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

export default RegisterModal;
