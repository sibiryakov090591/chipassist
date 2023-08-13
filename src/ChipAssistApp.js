/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { batch } from "react-redux";
import React, { useEffect, useState, Suspense, lazy } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { INIT_SENTRY } from "@src/config";
import constants from "@src/constants/constants";
import useUserActivity from "@src/services/UserActivity/useUserActivity";
import useConsoleLogSave from "@src/hooks/useConsoleLogSave";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Reset from "@src/views/chipassist/Reset/Reset";
import Maintenance from "@src/views/chipassist/Maintenance";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import { getGeolocation, loadProfileInfoThunk } from "@src/store/profile/profileActions";
import loadMaintenanceThunk from "@src/store/maintenance/maintenanceActions";
import { checkUserActivityStatus, saveUtm } from "@src/store/common/commonActions";
import ErrorAppCrushSentry from "@src/components/ErrorAppCrushSentry";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "@src/static/css/style.css";
import Error404 from "@src/views/chipassist/Error404";
import HomePage from "@src/layouts/HomePage";
import RegisterSuccess from "@src/views/chipassist/Register/RegisterSuccess";
import RegisterClosedSuccess from "@src/views/chipassist/RegisterClosed/RegisterClosedSuccess";
import Login from "@src/views/chipassist/Login/Login";
import SearchResults from "@src/views/chipassist/Search/SearchResults";
import "semantic-ui-css/semantic.min.css";
import "./mixins/moment";
import "./mixins/validate";
import RFQModal from "@src/views/chipassist/Rfq/components/RFQModal";
import "@src/assets/scss/index.scss";
import LogOut from "@src/components/LogOut/LogOut";
import AlertBottomLeft from "@src/components/Alerts/AlertBottomLeft";
import AlertTopRight from "@src/components/Alerts/AlertTopRight";
import AlertModal from "@src/components/Alerts/AlertModal";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { getInitialCurrency } from "@src/utils/getInitials";
import IcsearchHomePage from "@src/views/chipassist/IcsearchHomePage/IcsearchHomePage";
import SellExcess from "@src/views/chipassist/SellExcess/SellExcess";
import { getServiceTax } from "@src/store/checkout/checkoutActions";
import ProgressModal from "@src/components/ProgressModal/ProgressModal";
import { loadCategoriesThunk } from "@src/store/categories/categoriesActions";
import { authCheckState, sendQuickRequestUnAuth } from "@src/store/authentication/authActions";
import Preloader from "@src/components/Preloader/Preloader";
import SupplierLayout from "@src/layouts/SupplierLayout/SupplierLayout";
import AddProductToListModal from "@src/components/Alerts/AddProductToListModal";
import Register from "@src/views/chipassist/Register/Register.tsx";
import ErrorRegister from "@src/views/chipassist/ErrorRegister/ErrorRegister";
import { getUtm, lazyLoader } from "@src/utils/utility";
import { loadMiscAction } from "@src/store/misc/miscActions";
import ChipassistHomePage from "@src/views/chipassist/ChipassistHomePage/ChipassistHomePage";
import CookieAlert from "@src/components/CookieAlert/CookieAlert";
import { getCurrency, getDefaultServiceCurrency } from "@src/store/currency/currencyActions";
import Statistics from "@src/views/supplier-response/Statistics/Statistics";
import SellerMessageModal from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageModal";
import { loadSellersWithProductLink } from "@src/store/products/productsActions";
import FAQ from "@src/views/chipassist/StaticPages/FAQ/FAQ";
import { getChatList, updateChatList } from "@src/store/chat/chatActions";
import ChatPage from "@src/views/chipassist/Chat/ChatPage";
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "./constants/server_constants";

const ProvidedErrorBoundary = INIT_SENTRY ? ErrorAppCrushSentry : ErrorBoundary;

const SupplierResponse = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "supplierResponse" */ "@src/views/supplier-response/Requests/SupplierResponse"),
  ),
);
const AdapterUpload = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "adapterUpload" */ "@src/views/supplier-response/Adapter/AdapterUpload"),
  ),
);
const ProductView = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "product" */ "@src/views/chipassist/Product/Product")),
);
// const Cart = lazy(() => lazyLoader(() => import(/* webpackChunkName: "cart" */ "@src/views/chipassist/Cart/Cart")));
const Bom = lazy(() => lazyLoader(() => import(/* webpackChunkName: "bom" */ "@src/views/chipassist/Bom/Bom")));
const Blog = lazy(() => lazyLoader(() => import(/* webpackChunkName: "blog" */ "@src/views/chipassist/Blog/Blog")));
const Article = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "blog" */ "@src/views/chipassist/Blog/components/Article/Article")),
);
const Pcb = lazy(() => lazyLoader(() => import(/* webpackChunkName: "pcb" */ "@src/views/chipassist/PcbNew/Pcb")));
const Policy = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "policy" */ "@src/views/chipassist/StaticPages/Policy")),
);
const About = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "policy" */ "@src/views/chipassist/StaticPages/AboutCompany/AboutCompany"),
  ),
);
const Terms = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "terms" */ "@src/views/chipassist/StaticPages/Terms")),
);
const PartnersTerms = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "terms" */ "@src/views/chipassist/StaticPages/PartnersTerms")),
);
const OrderConfirm = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "orderConfirm" */ "@src/views/chipassist/Orders/components/OrderConfirm/OrderConfirm"),
  ),
);
const Profile = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "profile" */ "@src/views/chipassist/Profile/Profile")),
);
const LoginAs = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "loginAs" */ "@src/views/chipassist/LoginAs/LoginAs")),
);
const Test = lazy(() => lazyLoader(() => import(/* webpackChunkName: "test" */ "@src/views/chipassist/Test/Test")));
const Catalog = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "catalog" */ "@src/views/chipassist/Catalog/Catalog")),
);
const CatalogResults = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "catalogResults" */ "@src/views/chipassist/Catalog/Results/CatalogResults"),
  ),
);

const RfqList = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "rfqList" */ "@src/views/chipassist/RfqList/RFQList")),
);

export function PrivateRoute({ children, isAuthenticated, prevEmail }) {
  if (!isAuthenticated && !isAuthPage(window.location.pathname)) {
    localStorage.setItem("previousLocation", window.location.pathname + window.location.search);
  }
  return isAuthenticated === true ? (
    children
  ) : (
    <Navigate to={prevEmail ? "/auth/login" : "/auth/registration"} replace />
  );
}

const ChipAssistApp = () => {
  const location = useLocation();
  const isRestricted = constants.closedRegistration;
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [chatUpdatingIntervalId, setChatUpdatingIntervalId] = useState(null);
  const dispatch = useAppDispatch();
  const isAuthToken = useAppSelector((state) => state.auth.token !== null);
  const maintenance = useAppSelector((state) => state.maintenance);
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const loadedChatPages = useAppSelector((state) => state.chat.chatList.loadedPages);
  const valueToken = useURLSearchParams("value", false, null, false);
  const [startRecord, stopRecord] = useUserActivity();

  useConsoleLogSave();

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
    const utm = getUtm();
    if (utm) dispatch(saveUtm(utm));
  }, []);

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
    batch(() => {
      // dispatch(loadStockListIds());
      dispatch(loadSellersWithProductLink());
      dispatch(loadMaintenanceThunk());
      dispatch(authCheckState());
      // dispatch(categoriesActions.getCategoriesThunk());
      if (constants.SHOW_FILTERS) dispatch(loadCategoriesThunk());
      dispatch(getServiceTax());
      dispatch(getDefaultServiceCurrency());
      dispatch(getCurrency(selectedCurrency)).catch(() => {
        setTimeout(() => dispatch(getCurrency(selectedCurrency)), 1000);
      });

      // dispatch(getCountriesThunk());
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
    if (isAuthenticated) {
      dispatch(getChatList(1));
    }
  }, [isAuthenticated, selectedPartner]);

  useEffect(() => {
    if (chatUpdatingIntervalId) clearInterval(chatUpdatingIntervalId);
    if (isAuthenticated && loadedChatPages.length) {
      const intervalId = setInterval(() => {
        const loadedPages = [...new Set(loadedChatPages)];
        loadedPages.forEach((page) => dispatch(updateChatList(page)));
      }, 30000);
      setChatUpdatingIntervalId(intervalId);
    }
  }, [isAuthenticated, loadedChatPages]);

  if (maintenance.loaded && maintenance.status === "CRITICAL") {
    return <Maintenance />;
  }

  return (
    <div style={{ height: "100%" }}>
      <ProvidedErrorBoundary>
        <HomePage>
          <Routes location={location}>
            <Route
              path="/electronica2022/*"
              element={<Navigate to={prevEmail ? "/auth/login" : "/auth/registration"} />}
            />
            <Route
              path="/elec2022china/*"
              element={<Navigate to={prevEmail ? "/auth/login" : "/auth/registration"} />}
            />
            <Route
              path="/Test"
              element={
                <Suspense fallback={<Preloader title={""} />}>
                  <Test />
                </Suspense>
              }
            />
            <Route path="/messages" element={<ChatPage />} />
            <Route
              path="/parts/*"
              element={
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={}>
                        <Catalog />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/*"
                    element={
                      <Suspense fallback={}>
                        <CatalogResults />
                      </Suspense>
                    }
                  />
                </Routes>
              }
            />
            <Route path="/" element={constants.id === ID_ICSEARCH ? <IcsearchHomePage /> : <ChipassistHomePage />} />
            {constants.id !== ID_ICSEARCH && <Route path="/sell-excess-inventory" element={<SellExcess />} />}
            <Route path="/auth/registration" element={<Register />} />
            <Route path="/registered" element={isRestricted ? <RegisterClosedSuccess /> : <RegisterSuccess />} />
            <Route path="/expired-link" element={<ErrorRegister />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/reset" element={<Reset />} />
            <Route path="/auth/reset/:token" element={<Reset />} />
            <Route path="/password/request/:token" element={<Reset />} />
            <Route
              path="/product/:partnumber/:productId"
              element={
                <Suspense fallback={}>
                  <ProductView />
                </Suspense>
              }
            />
            <Route path="/search" element={<SearchResults />} />
            {constants.id === ID_MASTER && (
              <Route
                path="/supplier-response"
                element={
                  <SupplierLayout>
                    <Suspense fallback={<Preloader title={""} />}>
                      <SupplierResponse />
                    </Suspense>
                  </SupplierLayout>
                }
              />
            )}
            {constants.id === ID_MASTER && (
              <Route
                path="/statistics"
                element={
                  <SupplierLayout>
                    <Statistics />
                  </SupplierLayout>
                }
              />
            )}
            {constants.id === ID_MASTER && (
              <Route
                path="/file-upload"
                element={
                  <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                    <SupplierLayout>
                      <Suspense fallback={<Preloader title={""} />}>
                        <AdapterUpload />
                      </Suspense>
                    </SupplierLayout>
                  </PrivateRoute>
                }
              />
            )}
            {/* <Route */}
            {/*  path="/cart" */}
            {/*  element={ */}
            {/*    <Suspense fallback={}> */}
            {/*      <Cart /> */}
            {/*    </Suspense> */}
            {/*  } */}
            {/* /> */}
            <Route
              path="/bom/*"
              element={
                <Routes>
                  <Route
                    path="bom-list"
                    element={
                      <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                        <Suspense fallback={}>
                          <Bom />
                        </Suspense>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="create-file"
                    element={
                      <Suspense fallback={<Preloader title={""} />}>
                        <Bom />
                      </Suspense>
                    }
                  />
                  <Route
                    path=":bomId"
                    element={
                      <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                        <Suspense fallback={}>
                          <Bom />
                        </Suspense>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              }
            />
            <Route
              path="/blog/*"
              element={
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={}>
                        <Blog />
                      </Suspense>
                    }
                  />
                  <Route
                    path=":slug"
                    element={
                      <Suspense fallback={}>
                        <Article />
                      </Suspense>
                    }
                  />
                </Routes>
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <Suspense fallback={}>
                    <OrderConfirm />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/order-confirm/:orderId"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <Suspense fallback={}>
                    <OrderConfirm />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/pcb"
              element={
                <Suspense fallback={}>
                  <Pcb />
                </Suspense>
              }
            />
            <Route
              path="/login-as"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Preloader title={""} />}>
                    <LoginAs />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/*"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Preloader title={""} />}>
                    <Profile />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                  <LogOut />
                </PrivateRoute>
              }
            />
            {constants.id !== ID_ICSEARCH && (
              <Route
                path="/privacy_policy"
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <Policy />
                  </Suspense>
                }
              />
            )}
            {constants.id !== ID_ICSEARCH && (
              <Route
                path={"/about_company"}
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <About />
                  </Suspense>
                }
              />
            )}
            {constants.id !== ID_ICSEARCH && (
              <Route
                path={"/FAQ"}
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <FAQ />
                  </Suspense>
                }
              />
            )}
            {constants.id !== ID_ICSEARCH && (
              <Route
                path={"/rfq-list-quotes"}
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <RfqList />
                  </Suspense>
                }
              />
            )}
            {constants.id !== ID_ICSEARCH && (
              <Route
                path="/terms_of_services"
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <Terms />
                  </Suspense>
                }
              />
            )}
            {[ID_CHIPASSIST, ID_MASTER].includes(constants.id) && (
              <Route
                path="/documents/partners/terms-and-conditions"
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <PartnersTerms />
                  </Suspense>
                }
              />
            )}
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </HomePage>
        {/* <FeedbackButton /> */}
        <ScrollUpButton />
        <RFQModal />
        <SellerMessageModal />
        <ProgressModal />
      </ProvidedErrorBoundary>

      <AlertBottomLeft />
      <AlertTopRight />
      <AlertModal />
      <AddProductToListModal />
      <CookieAlert />
    </div>
  );
};

export default ChipAssistApp;
