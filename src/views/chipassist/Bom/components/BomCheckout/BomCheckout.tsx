import React, { useEffect, useMemo } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Container, Typography } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { Page } from "@src/components";
import CartAddress from "@src/views/chipassist/Cart/components/CartAddress/CartAddress";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { getUserAddressThunk, resetCheckout } from "@src/store/checkout/checkoutActions";
import { updateBom } from "@src/store/bom/bomActions";
import { showAlertsModalMessageAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import CartPay from "@src/views/chipassist/Cart/components/CartPay/CartPay";
import CartBillingAddress from "@src/views/chipassist/Cart/components/CartBillingAddress/CartBillingAddress";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles } from "./bomCheckoutStyles";

const BomCheckout: React.FC = () => {
  const { bomId } = useParams();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useI18n("bom");

  const bomCheckout = useAppSelector((state) => state.bom.bomCheckout);
  const checkout = useAppSelector((state) => state.checkout);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);

  useEffect(() => {
    if (profileInfo?.addresses?.length) {
      dispatch(getUserAddressThunk());
    }
  }, []);

  useEffect(() => {
    if (!bomCheckout) navigate(`/bom/${bomId}`);
    return () => {
      dispatch(resetCheckout());
    };
  }, []);

  useEffect(() => {
    if (checkout.showSuccess) {
      dispatch(
        showAlertsModalMessageAction({
          title: t("checkout.success_title"),
          description: t("checkout.success_description"),
          severity: "success",
        }),
      );
      dispatch(updateBom(bomId, { readonly: true })).then(() => navigate(`/bom/${bomId}`));
    }
  }, [checkout.showSuccess]);

  const closeCheckoutHandler = () => {
    dispatch(resetCheckout());
    navigate(`/bom/${bomId}`);
  };

  const isValidBillingAddress = useMemo(() => {
    return Object.entries(checkout.billingAddress).every((entr) => {
      const [field, value] = entr;
      // Required fields array
      if (["line1"].includes(field)) {
        return !!value;
      }
      return true;
    });
  }, [checkout.billingAddress]);

  return (
    <Page title="Bom Checkout" description="Bom Checkout">
      <div id="main" className={classes.main}>
        <Container maxWidth="xl">
          <Typography variant="h4" component="h4">
            {bomCheckout && `${t("checkout_for")} ${bomCheckout.name}`}
          </Typography>
          <br />
          {checkout.step === 1 && (
            <CartAddress
              type="shipping"
              backHandler={closeCheckoutHandler}
              isValidBillingAddress={isValidBillingAddress}
            />
          )}
          {checkout.step === 2 && (
            <>{constants.id === ID_ELFARO ? <CartAddress type="billing" /> : <CartBillingAddress />}</>
          )}
          {checkout.step === 3 && <CartPay checkoutFrom="bom" isValidBillingAddress={isValidBillingAddress} />}
        </Container>
      </div>
    </Page>
  );
};

export default BomCheckout;
