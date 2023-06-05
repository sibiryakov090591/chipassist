import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import useAppDispatch from "@src/hooks/useAppDispatch";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { hideTopRightMessageAlertAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertTopRight = () => {
  const classes = useStyles();

  const showAlertTopRight = useAppSelector((state) => state.alerts.showAlertTopRight);
  const alertTopRightMessage = useAppSelector((state) => state.alerts.alertTopRightMessage);

  const messageType = alertTopRightMessage?.severity || "info";
  const dispatch = useAppDispatch();

  const handleClose: any = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideTopRightMessageAlertAction());
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showAlertTopRight}
        autoHideDuration={alertTopRightMessage?.duration}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={messageType}>
          {alertTopRightMessage && <div dangerouslySetInnerHTML={{ __html: alertTopRightMessage.text }}></div>}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertTopRight;
