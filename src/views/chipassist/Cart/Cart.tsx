import React, { useEffect } from "react";
import { Box, Button, Container } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { closeCheckout, resetCheckout, getUserAddressThunk } from "@src/store/checkout/checkoutActions";
import { getCart, getCartItems } from "@src/store/cart/cartActions";
import { Page } from "@src/components";
import setUrl from "@src/utils/setUrl";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import constants from "@src/constants/constants";
import { ID_ELFARO } from "@src/constants/server_constants";
import { showAlertsModalMessageAction } from "@src/store/alerts/alertsActions";
import { useNavigate } from "react-router-dom";
import CartItems from "@src/views/chipassist/Cart/components/CartItems/CartItems";
import { useStyles } from "./cartStyles";
import CartCheckout from "./components/CartCheckout/CartCheckout";

type OrderType = "order" | "rfq";

// const setCartListUrl = (history: any, page: number, pageSize: number) => {
//   const params: any[] = [];
//   if (page) {
//     params.push(`page=${page}`);
//   }
//   if (pageSize) {
//     params.push(`page_size=${pageSize}`);
//   }
//   navigate({
//     pathname: "/cart",
//     search: params.length ? `?${params.join("&")}` : "",
//   });
// };

const Cart = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const cart = useAppSelector((state) => state.cart);
  const checkout = useAppSelector((state) => state.checkout);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);
  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);

  const storageKey = "cartShowBy";

  const page = useURLSearchParams("page", false, 1, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false);

  useEffect(() => {
    if (checkout.showSuccess) {
      dispatch(
        showAlertsModalMessageAction({
          title: t("bom.checkout.success_title"),
          description: t("bom.checkout.success_description"),
          severity: "success",
        }),
      );
    }
  }, [checkout.showSuccess]);

  useEffect(() => {
    if (isAuthenticated && profileInfo?.addresses?.length) {
      dispatch(getUserAddressThunk());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getCart(page, 100 || pageSize, true));
  }, [dispatch, cart.needsUpdateCounter, shouldUpdateBackend]);

  useEffect(() => {
    if (cart.total_pages > 1 && !cart.items.length && cart.info.id > 0) {
      setUrl(navigate, "/cart", page - 1, pageSize);
      dispatch(getCartItems(cart.info.id, page - 1, pageSize));
    }
  }, [cart.items.length]);

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, []);

  const handleCheckoutClose = () => {
    dispatch(closeCheckout());
  };

  // const reloadList = (page_size: number, in_page: number) => {
  //   const new_page = in_page || page;
  //   setCartListUrl(history, new_page, page_size);
  //   dispatch(getCartItems(cart.info.id, new_page, page_size));
  // };

  return (
    <Page title={t("title")} description={t("description")}>
      <Container maxWidth="xl">
        <Box mt={constants.id !== ID_ELFARO ? 5 : 0} mb={5}>
          {/* {!checkout.open && <CartItemsVer2 />} */}
          {!checkout.open && <CartItems />}
          {checkout.open && (
            <div className={classes.checkoutContainer}>
              <Button onClick={handleCheckoutClose} className={classes.checkoutBack}>
                <ArrowBack /> {t("back")}
              </Button>
              <CartCheckout />
            </div>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default Cart;
