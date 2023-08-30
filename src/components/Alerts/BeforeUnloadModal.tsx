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
import { clsx } from "clsx";
import { Button } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { changeMisc } from "@src/store/progressModal/progressModalActions";

const BeforeUnloadModal = () => {
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  // const { t } = useI18n("progress_modal");
  const dispatch = useAppDispatch();

  const showAlertBeforeUnload = useAppSelector((state) => state.alerts.showAlertBeforeUnload);

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!sessionStorage.getItem("before_unload_alert_disabled")) {
        const mouseY = event.clientY;
        if (mouseY <= 0) {
          dispatch(showAlertBeforeUnloadAction(true));
          dispatch(changeMisc("before_unload_modal_has_shown", "true"));
        }
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
        className={clsx(commonClasses.modal, "fullScreen")}
        open={showAlertBeforeUnload}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAlertBeforeUnload}>
          <div style={{ maxWidth: 800 }} className={clsx(commonClasses.paper, "fullScreen")}>
            <Button className={clsx(appTheme.buttonCreate, commonClasses.closeButton)} onClick={handleClose}>
              close
              <CloseIcon />
            </Button>
            <h1>No good offers? Leave a free request!</h1>
            <p>Leave a request for quotation and we&apos;ll check it against the offers from 100+ connected sellers.</p>
            <div>
              <RFQListForm isModalMode={true} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BeforeUnloadModal;
