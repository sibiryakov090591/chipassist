import React from "react";
import { Button, DialogContent, DialogActions, Dialog, Box, Checkbox, FormControlLabel } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import clsx from "clsx";
import { useStyles } from "./styles";

interface Props {
  onConfirmHandler: () => void;
  onCloseHandler: () => void;
}

const SetsModal: React.FC<Props> = ({ onConfirmHandler, onCloseHandler }) => {
  const appTheme = useAppTheme();
  const { t } = useI18n("bom.sets");
  const classes = useStyles();

  const [isHideModal, setIsHideModal] = React.useState(false);

  const onChange = () => {
    setIsHideModal(!isHideModal);
  };

  const onApplyHandler = () => {
    if (isHideModal) localStorage.setItem("hide_bom_sets_modal", "true");
    onConfirmHandler();
  };

  const onClose = () => {
    if (isHideModal) localStorage.setItem("hide_bom_sets_modal", "true");
    onCloseHandler();
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseHandler}
      aria-labelledby="bom-confirm-title"
      aria-describedby="bom-confirm-description"
    >
      <Box p={2}>
        <DialogContent>
          <h3>{t("title")}</h3>
          <Box className={classes.hint}>
            <p>{t("text_1")}</p>
          </Box>
        </DialogContent>
        <Box pt={2}>
          <DialogActions>
            <div>
              <FormControlLabel
                name="analytic"
                control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={isHideModal} />}
                label={"Don't show the alert again"}
              />
            </div>
            <Button
              className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
              onClick={onApplyHandler}
              color="primary"
              size="small"
              variant="contained"
            >
              {t("apply")}
            </Button>
            <Button
              className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
              onClick={onClose}
              size="small"
              variant="contained"
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SetsModal;
