import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
// import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { Link } from "react-router-dom";
import { showAlertBeforeUnloadAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";

const BeforeUnloadModal = () => {
  const commonClasses = useCommonStyles();
  // const { t } = useI18n("progress_modal");
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const showAlertBeforeUnload = useAppSelector((state) => state.alerts.showAlertBeforeUnload);

  const handleClose = () => {
    sessionStorage.setItem("before_unload_alert_disabled", "true");
    dispatch(showAlertBeforeUnloadAction(false));
    window.close();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={commonClasses.modal}
        open={showAlertBeforeUnload}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAlertBeforeUnload}>
          <div className={commonClasses.paper}>
            <h1>Haven&apos;t find necessary product? Leave a free request!</h1>
            <p>
              Leave a request for quotation and we&apos;ll check it against the offers from 100+ connected sellers.
              You&apos;ll receive the responses in your mailbox.
            </p>
            <br />
            <div className={commonClasses.actionsRow}>
              <Button
                className={appTheme.buttonCreate}
                color="primary"
                variant="contained"
                component={Link}
                to="/rfq-list-quotes"
                onClick={() => dispatch(showAlertBeforeUnloadAction(false))}
              >
                Leave a request
              </Button>
              <Button className={appTheme.buttonPrimary} color="primary" variant="contained" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BeforeUnloadModal;
