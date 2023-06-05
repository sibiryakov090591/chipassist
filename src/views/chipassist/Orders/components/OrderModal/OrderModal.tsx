import React from "react";
import { Button, DialogContent, DialogActions, Dialog, Box } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./styles";

interface Props {
  onCloseModal: () => void;
  cancelHandler: () => void;
}

const CheckoutModal: React.FC<Props> = ({ onCloseModal, cancelHandler }) => {
  const appTheme = useAppTheme();
  const { t } = useI18n("order");
  const classes = useStyles();

  const agreeHandler = () => {
    cancelHandler();
    onCloseModal();
  };

  return (
    <Dialog open={true} onClose={onCloseModal}>
      <Box p={2}>
        <DialogContent>
          <p className={classes.description}>{t("modal.description")}</p>
          <p className={classes.description}>{t("modal.confirm")}</p>
        </DialogContent>
        <Box pt={2}>
          <DialogActions>
            <Button className={`${appTheme.buttonPrimary}`} onClick={onCloseModal} variant="contained">
              {t("component.confirm.no")}
            </Button>
            <Button className={`${appTheme.buttonCancel}`} onClick={agreeHandler} color="primary" variant="contained">
              {t("component.confirm.yes")}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutModal;
