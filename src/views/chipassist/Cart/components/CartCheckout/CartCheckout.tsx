import React, { useMemo } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import CartBillingAddress from "@src/views/chipassist/Cart/components/CartBillingAddress/CartBillingAddress";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import FiltersContainer, { FilterResultsBar } from "@src/components/FiltersBar";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import clsx from "clsx";
import CartPay from "../CartPay/CartPay";
import CartAddress from "../CartAddress/CartAddress";

const CartCheckout: React.FC = () => {
  const commonClasses = useCommonStyles();
  const { t } = useI18n("cart");
  const checkout = useAppSelector((state) => state.checkout);
  const cart = useAppSelector((state) => state.cart);

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
    <>
      <h1 className={commonClasses.pageTitle}>{t("checkout")}</h1>
      {checkout.step === 3 && (
        <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
          <FiltersContainer>
            <FilterResultsBar count={cart?.count || 0} />
            <FilterCurrency />
          </FiltersContainer>
        </div>
      )}

      {checkout.step === 1 && <CartAddress type="shipping" isValidBillingAddress={isValidBillingAddress} />}
      {checkout.step === 2 && <CartBillingAddress />}
      {checkout.step === 3 && <CartPay checkoutFrom="cart" isValidBillingAddress={isValidBillingAddress} />}
    </>
  );
};

export default CartCheckout;
