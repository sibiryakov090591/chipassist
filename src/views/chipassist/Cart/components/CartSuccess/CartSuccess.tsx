import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { hideSuccess } from "@src/store/checkout/checkoutActions";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles } from "./cartSuccessStyles";

const CartSuccess = () => {
  const classes = useStyles();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();
  const { t } = useI18n("cart");
  const orderId = useAppSelector((state) => state.checkout.orderId);

  const handleCloseClick = () => {
    dispatch(hideSuccess());
  };
  // number

  return (
    <div className={classes.checkoutSuccess}>
      <span>
        {t("checkout_success")}
        {constants.id !== ID_ELFARO && (
          <>
            <div>
              <RouterLink to={orderId ? `/profile/orders/?highlight=${orderId}` : `/profile/orders`}>
                {t("your_order")}
              </RouterLink>
            </div>
            <div>
              <RouterLink to={`/profile/requests`}>{t("your_rfq")}</RouterLink>
            </div>
          </>
        )}
      </span>
      <button className={classes.checkoutSuccessClose} onClick={handleCloseClick}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default CartSuccess;
