import React from "react";
import Button from "@material-ui/core/Button";
import { thMenu } from "react-icons-kit/typicons/thMenu";
import { withBaseIcon } from "react-icons-kit";
import { Box } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import ClickOutsideListener from "@src/components/ClickOutsideListener/ClickOutsideListener";
import { useStyles } from "./style";
// import ConfirmButton from "../../../.@src/components/ConfirmButton/ConfirmButton";

const Icon = withBaseIcon();

const MoreButton = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useI18n("pcb");
  const { onExportAsCSV, onExportAsExcel, onOpen, onClose } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) onClose();
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
  const id = open ? "simple-popover1" : undefined;

  return (
    <ClickOutsideListener onClickOutside={handleClickOutside}>
      <div>
        <Icon aria-describedby={id} className={classes.menuItem} icon={thMenu} onClick={handleClick} />

        <Popper id={id} open={open} anchorEl={anchorEl} onClose={handleClose} className={classes.popper}>
          <div className={classes.popover}>
            <div className={classes.title}>{t("pcb_actions")}</div>
            <Box display="flex-column" alignItems="center" justifyContent="center" mt={1}>
              {/* <ConfirmButton onAction={onDeletePcb} theme="button" caption="Delete" question="Delete PCB" /> */}

              {onExportAsCSV ? (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    style={{ backgroundColor: "lightgray", color: "#000" }}
                    className={classes.btn}
                    onClick={onExportAsCSV}
                  >
                    CSV
                  </Button>
                </div>
              ) : null}

              {onExportAsExcel ? (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    style={{ backgroundColor: "lightgray", color: "#000" }}
                    className={classes.btn}
                    onClick={onExportAsExcel}
                  >
                    Excel
                  </Button>
                </div>
              ) : null}
            </Box>
          </div>
        </Popper>
      </div>
    </ClickOutsideListener>
  );
};

export default MoreButton;
