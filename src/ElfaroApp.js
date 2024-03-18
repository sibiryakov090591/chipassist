/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useConsoleLogSave from "@src/hooks/useConsoleLogSave";
// import useSentryUserData from "@src/hooks/useSentryUserData";
import checkIsAuthenticated, { getAuthToken, isAuthPage } from "@src/utils/auth";
import useAppSelector from "@src/hooks/useAppSelector";
import ErrorBoundary from "@src/components/ErrorBoundary";

import "@src/static/css/style.css";
import "semantic-ui-css/semantic.min.css";
// import "./mixins/moment";
import "./mixins/validate";
import "@src/assets/scss/index.scss";
import { batch } from "react-redux";
import { Helmet } from "react-helmet-async";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { getInitialCurrency } from "@src/utils/getInitials";
import Error404 from "@src/views/chipassist/Error404";
import RFQModal from "@src/views/chipassist/Rfq/components/RFQModal";
import Test from "@src/views/chipassist/Test/Test";
import { getServiceTax } from "@src/store/checkout/checkoutActions";
import Pcb from "@src/views/elfaro/Pcb/Pcb";
import useUserActivity from "@src/services/UserActivity/useUserActivity";
import ProgressModal from "@src/components/ProgressModal/ProgressModal";
import { loadMiscAction, saveMiscAction } from "@src/store/misc/miscActions";
import ErrorRegister from "@src/views/chipassist/ErrorRegister/ErrorRegister";
import { getUtm } from "@src/utils/utility";
import CookieAlert from "@src/components/CookieAlert/CookieAlert";
import ScrollUpButton from "react-scroll-up-button";
import LoginAs from "@src/views/chipassist/LoginAs/LoginAs";
import { getCurrency, getDefaultServiceCurrency } from "@src/store/currency/currencyActions";
import Register from "@src/views/chipassist/Register/Register";
import { getAllSellers } from "@src/store/sellers/sellersActions";
import Product from "./views/elfaro/Product/Product";
import { checkUserActivityStatus, saveUtm } from "./store/common/commonActions";
import useAppDispatch from "./hooks/useAppDispatch";
// import Home from "./views/elfaro/Home/Home";
import Search from "./views/elfaro/Search/Search";
import ElfaroLayout from "./layouts/ElfaroLayout/ElfaroLayout";
import Login from "./views/chipassist/Login/Login";
import AuthModal from "./views/elfaro/AuthModal/AuthModal";
import Reset from "./views/chipassist/Reset/Reset";
import Policy from "./views/elfaro/StaticPages/Policy";
import Terms from "./views/elfaro/StaticPages/Terms";
import { getGeolocation, loadProfileInfoThunk } from "./store/profile/profileActions";
import { authCheckState, sendQuickRequestUnAuth } from "./store/authentication/authActions";
import LogOut from "./components/LogOut/LogOut";
import Cart from "./views/chipassist/Cart/Cart";
import AlertBottomLeft from "./components/Alerts/AlertBottomLeft";
import AlertTopRight from "./components/Alerts/AlertTopRight";
import AlertModal from "./components/Alerts/AlertModal";

const ProvidedErrorBoundary = ErrorBoundary;

export function PrivateRoute({ children, isAuthenticated, prevEmail }) {
  if (!isAuthenticated && !isAuthPage(window.location.pathname)) {
    localStorage.setItem("previousLocation", window.location.pathname + window.location.search);
  }
  return isAuthenticated === true ? (
    children
  ) : (
    <Navigate to={prevEmail ? "/auth/login" : "auth/registration"} state={{ background: { pathname: "/" } }} replace />
  );
}

const ElfaroApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const dispatch = useAppDispatch();
  const isAuthToken = !!getAuthToken();

  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const isShowQuickButton = useAppSelector((state) => state.common.isShowQuickButton);
  const valueToken = useURLSearchParams("value", false, null, false);
  const [startRecord, stopRecord] = useUserActivity();
  useConsoleLogSave();
  // useSentryUserData();
  const selectedCurrency = getInitialCurrency(useURLSearchParams("currency", false, null, false));

  // Send quick request
  useEffect(() => {
    const email = localStorage.getItem("registered_email") || null;
    if (valueToken) {
      dispatch(loadMiscAction("not_activated_request", email)).then((res) => {
        const data = res?.data?.data || res?.data;
        if (data && ["rfq", "pcb", "sellerMessage"].includes(data.requestType)) {
          dispatch(sendQuickRequestUnAuth(res.data, valueToken, email));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!location.state) {
      const modalPaths = ["/auth/login", "/auth/registration", "/auth/reset", "/password/request"];
      if (modalPaths.some((p) => location.pathname.includes(p))) {
        navigate(location.pathname + location.search, { state: { background: { pathname: "/" } } });
      }
    }
  }, []);

  useEffect(() => {
    const utm = getUtm();
    if (utm) dispatch(saveUtm(utm));
  }, []);

  useEffect(() => {
    batch(() => {
      dispatch(authCheckState());
      dispatch(getDefaultServiceCurrency());
      dispatch(getServiceTax());
      dispatch(getCurrency(selectedCurrency)).catch(() => {
        dispatch(getCurrency(selectedCurrency));
      });
      dispatch(getAllSellers());
      dispatch(getGeolocation());
    });
  }, []);

  useEffect(() => {
    dispatch(saveMiscAction("is_show_quick_button", isShowQuickButton));
  }, [isShowQuickButton]);

  // useEffect(() => {
  //   if (window.location.pathname === "/" && localStorage.getItem("previousLocation")) {
  //     navigate(localStorage.getItem("previousLocation"));
  //   }
  // }, []);

  useEffect(() => {
    if (!isAuthPage(window.location.pathname)) {
      localStorage.setItem("previousLocation", window.location.pathname + window.location.search);
      console.log("Set previousLocation: ", `${window.location.pathname + window.location.search}`);
    }
    // update old site version
    if (localStorage.getItem("need_force_update")) {
      localStorage.removeItem("need_force_update");
      window.location.reload();
    }
  }, [window.location.pathname, window.location.search]);

  useEffect(() => {
    if (isAuthToken) {
      dispatch(loadProfileInfoThunk());
    }
    setIsAuthenticated(isAuthToken);
    if (checkIsAuthenticated()) {
      if (checkUserActivityStatus()) {
        startRecord();
      } else {
        stopRecord();
      }
      // dispatch(loadProfileInfoThunk());
    } else {
      stopRecord();
    }
  }, [isAuthToken]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Helmet>
        <style>{"body { font-size: 16px; line-height: 1.5; } html { font-size: 16px; }"}</style>
      </Helmet>
      <ProvidedErrorBoundary>
        {background && (
          <Routes location={location}>
            <Route
              path="/auth/login"
              element={
                <AuthModal>
                  <Login />
                </AuthModal>
              }
            />
            <Route
              path="/auth/registration"
              element={
                <AuthModal>
                  <Register />
                </AuthModal>
              }
            />
            <Route
              path="/auth/reset"
              element={
                <AuthModal>
                  <Reset />
                </AuthModal>
              }
            />
            <Route
              path="/auth/reset/:token"
              element={
                <AuthModal>
                  <Reset />
                </AuthModal>
              }
            />
            <Route
              path="/password/request/:token"
              element={
                <AuthModal>
                  <Reset />
                </AuthModal>
              }
            />
          </Routes>
        )}
        <ElfaroLayout>
          <Routes location={background || location}>
            <Route path="/" element={<Search />} />
            <Route path="/expired-link" element={<ErrorRegister />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/login-as" element={<LoginAs />} />
            <Route path="/order-pcb" element={<Pcb />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:partnumber/:stockrecordId" element={<Product />} />
            <Route path="/privacy_policy" element={<Policy />} />
            <Route path="/terms_of_services" element={<Terms />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/logout"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <LogOut />
                </PrivateRoute>
              }
            />
            <Route path={"/*"} element={<Error404 />} />
          </Routes>
        </ElfaroLayout>
      </ProvidedErrorBoundary>

      <AlertBottomLeft />
      <AlertBottomLeft />
      <AlertTopRight />
      <AlertModal />
      <RFQModal />
      <ProgressModal />
      <CookieAlert />
      <ScrollUpButton />
    </div>
  );
};

export default ElfaroApp;
