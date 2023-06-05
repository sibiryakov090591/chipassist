import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Box, Button } from "@material-ui/core";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import useAppTheme from "@src/theme/useAppTheme";
import { makeStyles } from "@material-ui/styles";

interface Props {
  action: any;
  onClose: any;
}

const useStyles = makeStyles(() => ({
  info: {
    marginTop: 16,
  },
  p: {
    fontSize: 16,
  },
}));

const MinCostModal: React.FC<Props> = ({ action, onClose }) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("cart");

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={commonClasses.modal}
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={commonClasses.paper}>
          <h3>
            {t("min_cost")}
            <strong>100€</strong>
          </h3>
          <div className={classes.info}>
            <p className={classes.p}>We are currently processing only orders for the amount of 100 euros and above.</p>
            <p className={classes.p}>You can add other products to the order or proceed to checkout.</p>
          </div>
          <br />
          <Box display="flex" justifyContent="flex-end">
            <Button className={appTheme.buttonPrimary} color="primary" variant="contained" onClick={onClose}>
              Continue shopping
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              className={appTheme.buttonCreate}
              color="primary"
              variant="contained"
              onClick={action}
            >
              Proceed to checkout
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default MinCostModal;
