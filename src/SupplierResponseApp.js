import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { batch } from "react-redux";
import React, { lazy, Suspense, useEffect, useState } from "react";
import useUserActivity from "@src/services/UserActivity/useUserActivity";
import useConsoleLogSave from "@src/hooks/useConsoleLogSave";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Reset from "@src/views/chipassist/Reset/Reset.tsx";
import checkIsAuthenticated, { getAuthToken } from "@src/utils/auth";
import {
  getGeolocation,
  getPartnerInfo,
  loadProfileInfoThunk,
  onChangePartner,
} from "@src/store/profile/profileActions";
import { checkUserActivityStatus } from "@src/store/common/commonActions";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "@src/static/css/style.css";
import Error404 from "@src/views/chipassist/Error404";
import SupplierLayout from "@src/layouts/SupplierLayout/SupplierLayout";
import Login from "@src/views/chipassist/Login/Login.tsx";
import "semantic-ui-css/semantic.min.css";
// import "./mixins/moment";
import "./mixins/validate";
import "@src/assets/scss/index.scss";
import LogOut from "@src/components/LogOut/LogOut";
import AlertBottomLeft from "@src/components/Alerts/AlertBottomLeft";
import AlertTopRight from "@src/components/Alerts/AlertTopRight";
import AlertModal from "@src/components/Alerts/AlertModal";
import LoginAs from "@src/views/chipassist/LoginAs/LoginAs.tsx";
import SupplierResponse from "@src/views/supplier-response/Requests/SupplierResponse";
import SupplierResponseRegisterModal from "@src/components/Alerts/SupplierResponseRegisterModal";
import { getCurrency, getDefaultServiceCurrency } from "@src/store/currency/currencyActions";
import { getChatList, updateChatList } from "@src/store/chat/chatActions";
import { getInitialCurrency } from "@src/utils/getInitials";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import constants from "@src/constants/constants";
import { ID_PCBONLINE } from "@src/constants/server_constants";
import { lazyLoader } from "@src/utils/utility";
import Preloader from "@src/components/Preloader/Preloader";

const ProvidedErrorBoundary = ErrorBoundary;

export function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated === true ? children : <Navigate to={"/auth/login"} replace />;
}

const Profile = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "profile" */ "@src/views/supplier-response/Profile/Profile")),
);
const About = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "about" */ "@src/views/supplier-response/About/About")),
);
const ChatPage = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "chat" */ "@src/views/chipassist/Chat/ChatPage")),
);
const Statistics = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "statistics" */ "@src/views/supplier-response/Statistics/Statistics")),
);
const Policy = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "policy" */ "@src/views/chipassist/StaticPages/Policy")),
);
const Terms = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "terms" */ "@src/views/chipassist/StaticPages/Terms")),
);
const Adapter = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "adapter" */ "@src/views/supplier-response/Adapter/Adapter")),
);

const SupplierResponseApp = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [startRecord, stopRecord] = useUserActivity();
  const isPCBOnline = constants.id === ID_PCBONLINE;
  useConsoleLogSave();

  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [chatUpdatingIntervalId, setChatUpdatingIntervalId] = useState(null);

  const isAuthToken = !!getAuthToken();
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const loadedChatPages = useAppSelector((state) => state.chat.chatList.loadedPages);

  const selectedCurrency = getInitialCurrency(useURLSearchParams("currency", false, null, false));

  useEffect(() => {
    // update old site version
    if (localStorage.getItem("need_force_update")) {
      localStorage.removeItem("need_force_update");
      window.location.reload();
    }
  }, [window.location.pathname, window.location.search]);

  useEffect(() => {
    batch(() => {
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
    if (isAuthenticated && selectedPartner) {
      dispatch(getChatList(1));
      dispatch(getPartnerInfo(selectedPartner.id));
    }
  }, [isAuthenticated, selectedPartner]);

  useEffect(() => {
    if (chatUpdatingIntervalId) clearInterval(chatUpdatingIntervalId);
    if (isAuthenticated && !!selectedPartner && loadedChatPages.length) {
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

  return (
    <div style={{ height: "100%" }}>
      <ProvidedErrorBoundary>
        <SupplierLayout>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/supplier-response" />} />
            <Route path="/supplier-response/*" element={<SupplierResponse />} />
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <LogOut />
                </PrivateRoute>
              }
            />
            <Route
              path="/login-as"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <LoginAs />
                </PrivateRoute>
              }
            />
            {!isPCBOnline && (
              <>
                <Route path="/auth/reset" element={<Reset />} />
                <Route path="/auth/reset/:token" element={<Reset />} />
                <Route path="/password/request/:token" element={<Reset />} />
                <Route
                  path="/statistics"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <Statistics />
                    </Suspense>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Suspense fallback={<Preloader title={""} />}>
                        <ChatPage />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile/*"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Suspense fallback={<Preloader title={""} />}>
                        <Profile />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/adapter/*"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Suspense fallback={<Preloader title={""} />}>
                        <Adapter />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="/privacy_policy"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <Policy />
                    </Suspense>
                  }
                />
                <Route
                  path="/terms_of_services"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <Terms />
                    </Suspense>
                  }
                />
              </>
            )}
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
