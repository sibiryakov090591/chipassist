import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./style";
import ClickOutsideListener from "../ClickOutsideListener/ClickOutsideListener";

const DeleteButton = (props) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("component");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { onAction, onOpen, onClose } = props;

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

  return (
    <ClickOutsideListener onClickOutside={handleClickOutside}>
      <div className="delete-button" style={{ position: "relative" }}>
        <div onClick={handleClick} className={classes.removeItem}>
          <DeleteForeverIcon className={classes.removeIcon} />
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl} onClose={handleClose} className={classes.popper}>
          <div className={classes.popover}>
            <div className={classes.title}>{t("bom.delete_selected_boms")} ?</div>
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
                className={`${appTheme.buttonPrimary} ${classes.btn}`}
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

export default DeleteButton;
