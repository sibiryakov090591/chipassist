import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useAppSelector from "@src/hooks/useAppSelector";
// import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { showAlertBeforeUnloadAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import RFQListForm from "@src/views/chipassist/RfqList/components/Form/RFQListForm";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const BeforeUnloadModal = () => {
  const commonClasses = useCommonStyles();
  // const { t } = useI18n("progress_modal");
  const dispatch = useAppDispatch();

  const showAlertBeforeUnload = useAppSelector((state) => state.alerts.showAlertBeforeUnload);

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!sessionStorage.getItem("before_unload_alert_disabled")) {
        const mouseY = event.clientY;
        if (mouseY <= 0) dispatch(showAlertBeforeUnloadAction(true));
      }
    };
    const timeoutId = setTimeout(() => {
      document.body.addEventListener("mouseleave", listener);
    }, 30000);
    return () => {
      clearTimeout(timeoutId);
      document.body.removeEventListener("mouseleave", listener);
    };
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("before_unload_alert_disabled", "true");
    dispatch(showAlertBeforeUnloadAction(false));
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
          <div style={{ maxWidth: 950 }} className={commonClasses.paper}>
            <IconButton aria-label="close" className={commonClasses.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <h1>Haven&apos;t find necessary product? Leave a free request!</h1>
            <p>
              Leave a request for quotation and we&apos;ll check it against the offers from 100+ connected sellers.
              You&apos;ll receive the responses in your mailbox.
            </p>
            <div>
              <RFQListForm />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BeforeUnloadModal;
