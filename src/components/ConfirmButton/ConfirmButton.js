import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { DeleteButton } from "@src/components/Button";
import useAppTheme from "@src/theme/useAppTheme";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useStyles } from "./style";
import ClickOutsideListener from "../ClickOutsideListener/ClickOutsideListener";

const ConfirmButton = (props) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("component");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { onAction, onOpen, onClose, theme, className, caption, question, type, size, skipConfirm = false } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) onClose();
  };

  const handleAction = () => {
    handleClose();
    if (onAction) onAction();
  };

  const handleClickOutside = () => {
    setAnchorEl((prev) => {
      if (prev !== null) {
        if (onClose) onClose();
      }
      return null;
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const classBtn = className || classes.menuBtn;

  const buttonProps = {
    variant: "contained",
    size: size || "small",
    onClick: handleClick,
    className: classBtn,
  };

  const buttonComponent = () => {
    switch (type) {
      case "delete":
        return <DeleteButton {...buttonProps}>{caption || t("confirm.confirm")}</DeleteButton>;
      case "bomEdit":
        return (
          <div className={className} onClick={handleClick}>
            <span>{caption}</span> <DeleteOutlineIcon />
          </div>
        );
      default:
        return (
          <Button {...buttonProps} color="primary">
            {caption || t("confirm.confirm")}
          </Button>
        );
    }
  };

  return (
    <ClickOutsideListener onClickOutside={handleClickOutside}>
      <div className="delete-button" style={{ position: "relative" }}>
        {theme === "button" ? (
          buttonComponent()
        ) : (
          <HighlightOffIcon className={classes.removeItem} onClick={!skipConfirm ? handleClick : onAction} />
        )}

        <Popper id={id} open={open} anchorEl={anchorEl} onClose={handleClose} className={classes.popper}>
          <div className={classes.popover}>
            <div className={classes.title}>{question || caption || t("confirm.confirm")} ?</div>
            <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
              <Button
                size="small"
                variant="contained"
                className={`${appTheme.buttonCancel} confirm-yes`}
                onClick={handleAction}
              >
                {t("confirm.yes")}
              </Button>

              <Button
                size="small"
                color="primary"
                variant="contained"
                className={`${classes.btn} ${appTheme.buttonPrimary} test-confirm-no`}
                onClick={handleClose}
              >
                {t("confirm.no")}
              </Button>
            </Box>
          </div>
        </Popper>
      </div>
    </ClickOutsideListener>
  );
};

export default ConfirmButton;
