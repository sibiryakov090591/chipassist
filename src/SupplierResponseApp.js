import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { batch } from "react-redux";
import React, { useEffect, useState } from "react";
import { INIT_SENTRY } from "@src/config";
import useUserActivity from "@src/services/UserActivity/useUserActivity";
import useConsoleLogSave from "@src/hooks/useConsoleLogSave";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Reset from "@src/views/chipassist/Reset/Reset.tsx";
import Maintenance from "@src/views/chipassist/Maintenance";
import checkIsAuthenticated from "@src/utils/auth";
import { getGeolocation, loadProfileInfoThunk, onChangePartner } from "@src/store/profile/profileActions";
import loadMaintenanceThunk from "@src/store/maintenance/maintenanceActions";
import { checkUserActivityStatus } from "@src/store/common/commonActions";
import ErrorAppCrushSentry from "@src/components/ErrorAppCrushSentry";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "@src/static/css/style.css";
import Error404 from "@src/views/chipassist/Error404";
import SupplierLayout from "@src/layouts/SupplierLayout/SupplierLayout";
import Login from "@src/views/chipassist/Login/Login.tsx";
import "semantic-ui-css/semantic.min.css";
import "./mixins/moment";
import "./mixins/validate";
import "@src/assets/scss/index.scss";
import LogOut from "@src/components/LogOut/LogOut";
import AlertBottomLeft from "@src/components/Alerts/AlertBottomLeft";
import AlertTopRight from "@src/components/Alerts/AlertTopRight";
import AlertModal from "@src/components/Alerts/AlertModal";
import LoginAs from "@src/views/chipassist/LoginAs/LoginAs.tsx";
import SupplierResponse from "@src/views/supplier-response/Requests/SupplierResponse";
import Policy from "@src/views/chipassist/StaticPages/Policy";
import Terms from "@src/views/chipassist/StaticPages/Terms";
import SupplierResponseRegisterModal from "@src/components/Alerts/SupplierResponseRegisterModal";
import Help from "@src/views/supplier-response/Help/Help";
import AdapterUpload from "@src/views/supplier-response/Adapter/AdapterUpload";
import { getCurrency, getDefaultServiceCurrency } from "@src/store/currency/currencyActions";
import Statistics from "@src/views/supplier-response/Statistics/Statistics";
import ChatPage from "@src/views/chipassist/Chat/ChatPage";
import { getChatList, selectChat, updateChatList } from "@src/store/chat/chatActions";

const ProvidedErrorBoundary = INIT_SENTRY ? ErrorAppCrushSentry : ErrorBoundary;

export function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated === true ? children : <Navigate to={"/auth/login"} replace />;
}

const SupplierResponseApp = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [startRecord, stopRecord] = useUserActivity();
  useConsoleLogSave();

  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [chatUpdatingIntervalId, setChatUpdatingIntervalId] = useState(null);

  const isAuthToken = useAppSelector((state) => state.auth.token !== null);
  const maintenance = useAppSelector((state) => state.maintenance);
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const loadedChatPages = useAppSelector((state) => state.chat.chatList.loadedPages);

  // const selectedCurrency = getInitialCurrency(useURLSearchParams("currency", false, null, false));
  const selectedCurrency = "USD";
  const isShowChat = !!localStorage.getItem("isShowChat");

  useEffect(() => {
    // update old site version
    if (localStorage.getItem("need_force_update")) {
      localStorage.removeItem("need_force_update");
      window.location.reload();
    }
  }, [window.location.pathname, window.location.search]);

  useEffect(() => {
    batch(() => {
      dispatch(loadMaintenanceThunk());
      dispatch(getDefaultServiceCurrency());
      dispatch(getCurrency(selectedCurrency)).catch(() => {
        setTimeout(() => dispatch(getCurrency(selectedCurrency)), 1000);
      });
      dispatch(getGeolocation());
    });
  }, []);

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
    } else {
      stopRecord();
    }
  }, [isAuthToken]);

  useEffect(() => {
    if (isAuthenticated && !!selectedPartner) {
      dispatch(getChatList(1)).then((res) => {
        if (res.results?.length) dispatch(selectChat(res.results[0]));
      });
    }
  }, [isAuthenticated, selectedPartner]);

  useEffect(() => {
    if (isAuthenticated && !!selectedPartner && loadedChatPages.length) {
      if (chatUpdatingIntervalId) clearInterval(chatUpdatingIntervalId);
      const intervalId = setInterval(() => {
        const loadedPages = [...new Set(loadedChatPages)];
        loadedPages.forEach((page) => dispatch(updateChatList(page)));
      }, 30000);
      setChatUpdatingIntervalId(intervalId);
    }
  }, [isAuthenticated, loadedChatPages, selectedPartner]);

  useEffect(() => {
    let partner = false;
    if (isAuthenticated && partners?.length) {
      partner =
        partners.find((p) => p.name === "Test Demo Supplier") ||
        partners.find((p) => p.name === localStorage.getItem("selected_partner")) ||
        partners[0];
    }
    dispatch(onChangePartner(partner));
  }, [partners, isAuthenticated]);

  if (maintenance.loaded && maintenance.status === "CRITICAL") {
    return <Maintenance />;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <ProvidedErrorBoundary>
        <SupplierLayout>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/supplier-response" />} />
            <Route path="/supplier-response/*" element={<SupplierResponse />} />
            <Route path="/statistics" element={<Statistics />} />
            {isShowChat && <Route path="/chat" element={<ChatPage />} />}
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <LogOut />
                </PrivateRoute>
              }
            />
            <Route path="/auth/reset" element={<Reset />} />
            <Route path="/auth/reset/:token" element={<Reset />} />
            <Route path="/password/request/:token" element={<Reset />} />
            <Route
              path="/login-as"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <LoginAs />
                </PrivateRoute>
              }
            />
            <Route
              path="/file-upload"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdapterUpload />
                </PrivateRoute>
              }
            />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy_policy" element={<Policy />} />
            <Route path="/terms_of_services" element={<Terms />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </SupplierLayout>
      </ProvidedErrorBoundary>

      <SupplierResponseRegisterModal />
      <AlertBottomLeft />
      <AlertTopRight />
      <AlertModal />
    </div>
  );
};

export default SupplierResponseApp;
