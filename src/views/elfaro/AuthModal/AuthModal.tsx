import { Modal } from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./AuthModalStyles";

const AuthModal: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const background = location.state && location.state.background;

  const handleClose = () => {
    navigate(location.state.background);
  };

  return (
    <Modal open={!!background} style={{ overflowY: "auto" }} onClose={handleClose}>
      <div style={{ width: "fit-content", margin: "0 auto", position: "relative" }}>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        {children}
      </div>
    </Modal>
  );
};

export default AuthModal;
