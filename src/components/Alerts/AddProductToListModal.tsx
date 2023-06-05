import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { hideAddToListModalAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import { addCartItem } from "@src/store/cart/cartActions";
import { NumberInput } from "@src/components/Inputs";
import { useStyles } from "./alertModalStyles";

const AddProductToListModal = () => {
  const classes = useStyles();
  const { t } = useI18n("cart");
  const dispatch = useAppDispatch();
  const appTheme = useAppTheme();

  const [quantity, setQuantity] = useState(1);

  const product = useAppSelector((state) => state.alerts.addToListModal.product);
  const open = useAppSelector((state) => state.alerts.addToListModal.open);

  const handleClose = () => {
    dispatch(hideAddToListModalAction());
    setQuantity(1);
  };

  const handleAdd = () => {
    dispatch(addCartItem(product, null, quantity, null, true));
    handleClose();
  };

  const handleChangeQty = (e: any) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 className={classes.title} dangerouslySetInnerHTML={{ __html: t("added_list_title") }} />
            <p className={classes.description} dangerouslySetInnerHTML={{ __html: t("added_list_message") }} />
            <div className={classes.input}>
              <NumberInput
                variant="outlined"
                label={t("add_list_qty")}
                InputLabelProps={{
                  shrink: true,
                }}
                value={quantity}
                decimalScale={0}
                onChange={handleChangeQty}
                size="small"
              />
            </div>
            <Box display="flex" justifyContent="flex-end" className={classes.actionContainer}>
              <Button
                className={clsx(appTheme.buttonPrimary, "alert-modal-button")}
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className={clsx(appTheme.buttonCreate, "alert-modal-button")}
                color="primary"
                variant="contained"
                onClick={handleAdd}
              >
                Add to list
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProductToListModal;
