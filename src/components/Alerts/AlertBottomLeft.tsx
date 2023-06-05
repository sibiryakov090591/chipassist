import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import useAppDispatch from "@src/hooks/useAppDispatch";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { hideBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertBottomLeft = () => {
  const classes = useStyles();

  const showAlertBottomLeft = useAppSelector((state) => state.alerts.showAlertBottomLeft);
  const alertBottomLeftMessage = useAppSelector((state) => state.alerts.alertBottomLeftMessage);

  const messageType = alertBottomLeftMessage?.severity || "info";
  const dispatch = useAppDispatch();

  const handleClose: any = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideBottomLeftMessageAlertAction());
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showAlertBottomLeft}
        autoHideDuration={alertBottomLeftMessage?.duration}
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
          {alertBottomLeftMessage && <div dangerouslySetInnerHTML={{ __html: alertBottomLeftMessage.text }}></div>}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertBottomLeft;
