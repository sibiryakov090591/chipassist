import React from "react";
import Button from "@material-ui/core/Button";
import { thMenu } from "react-icons-kit/typicons/thMenu";
import { Icon } from "react-icons-kit";
import { Box } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import ClickOutsideListener from "@src/components/ClickOutsideListener/ClickOutsideListener";
import useAppTheme from "@src/theme/useAppTheme";
import DescriptionIcon from "@material-ui/icons/Description";
import { useStyles } from "./style";

interface Props {
  buttonVariant?: "button" | "icon";
  type?: string;
  buttonClassName?: string;
  onExportCsv?: () => void;
  onExportXls?: () => void;
  onMerge?: () => void;
  onReadOnly?: () => void;
  onMakeCopy?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  readonly: boolean;
}

const MoreButton: React.FC<Props> = ({
  buttonVariant,
  type,
  buttonClassName,
  onExportCsv,
  onExportXls,
  onMerge,
  onReadOnly,
  onMakeCopy,
  onOpen,
  onClose,
  readonly,
  children,
}) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useI18n("bom");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onReadOnlyHandler = () => {
    setAnchorEl(null);
    if (onReadOnly) onReadOnly();
  };

  const onMakeCopyHandler = () => {
    onMakeCopy();
  };

  const onMergeHandler = () => {
    onMerge();
    handleClose();
  };

  const handleClickOutside = () => {
    setAnchorEl((prev) => {
      if (prev !== null) {
        if (onClose) onClose();
      }
      return null;
    });
  };

  const buttonComponent = () => {
    switch (type) {
      case "bomEdit":
        return (
          <div className={buttonClassName} onClick={handleClick}>
            <span>{children}</span> <DescriptionIcon />
          </div>
        );
      default:
        return (
          <Button variant="contained" color="primary" size="small" className={buttonClassName} onClick={handleClick}>
            {children}
          </Button>
        );
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ClickOutsideListener onClickOutside={handleClickOutside}>
      <div>
        {buttonVariant === "button" ? (
          buttonComponent()
        ) : (
          <Icon aria-describedby={id} className={classes.menuItem} icon={thMenu} onClick={handleClick} />
        )}

        <Popper id={id} open={open} anchorEl={anchorEl} className={classes.popper}>
          <div className={classes.popover}>
            <div className={classes.title}>{t("bom_actions")}</div>
            <Box display="flex-column" alignItems="center" justifyContent="center" mt={1}>
              {onExportCsv ? (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    style={{ backgroundColor: "lightgray", color: "#000" }}
                    className={classes.btn}
                    onClick={onExportCsv}
                  >
                    CSV
                  </Button>
                </div>
              ) : null}

              {onExportXls ? (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    style={{ backgroundColor: "lightgray", color: "#000" }}
                    className={classes.btn}
                    onClick={onExportXls}
                  >
                    Excel
                  </Button>
                </div>
              ) : null}

              {onReadOnly ? (
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    className={`${appTheme.buttonPrimary} ${classes.btn}`}
                    onClick={onReadOnlyHandler}
                  >
                    {t("readonly")} {readonly === true ? t("readonly_off") : t("readonly_on")}
                  </Button>
                </div>
              ) : null}

              {onMakeCopy ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.btn}
                    onClick={onMakeCopyHandler}
                  >
                    {t("copy_text")}
                  </Button>
                </div>
              ) : null}

              {onMerge ? (
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    className={`${appTheme.buttonPrimary} ${classes.btn} bom-merge-button`}
                    onClick={onMergeHandler}
                  >
                    {t("merge_btn")}
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
