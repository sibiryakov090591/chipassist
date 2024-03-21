/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { batch } from "react-redux";
import React, { useEffect, useState, Suspense, lazy } from "react";
import ScrollUpButton from "react-scroll-up-button";
import constants from "@src/constants/constants";
import useUserActivity from "@src/services/UserActivity/useUserActivity";
import useConsoleLogSave from "@src/hooks/useConsoleLogSave";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import checkIsAuthenticated, { getAuthToken, isAuthPage } from "@src/utils/auth";
import { getGeolocation, loadProfileInfoThunk, onChangePartner } from "@src/store/profile/profileActions";
import { checkUserActivityStatus, saveHref, saveUtm } from "@src/store/common/commonActions";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "@src/static/css/style.css";
import HomePage from "@src/layouts/HomePage";
import SearchResults from "@src/views/chipassist/Search/SearchResults";
import "semantic-ui-css/semantic.min.css";
// import "./mixins/moment";
import "./mixins/validate";
import "@src/assets/scss/index.scss";
import LogOut from "@src/components/LogOut/LogOut";
import AlertBottomLeft from "@src/components/Alerts/AlertBottomLeft";
import AlertTopRight from "@src/components/Alerts/AlertTopRight";
import AlertModal from "@src/components/Alerts/AlertModal";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { getInitialCurrency } from "@src/utils/getInitials";
import IcsearchHomePage from "@src/views/chipassist/IcsearchHomePage/IcsearchHomePage";
import { getServiceTax } from "@src/store/checkout/checkoutActions";
import { authCheckState, sendQuickRequestUnAuth } from "@src/store/authentication/authActions";
import Preloader from "@src/components/Preloader/Preloader";
import { getUtm, lazyLoader } from "@src/utils/utility";
import { loadMiscAction } from "@src/store/misc/miscActions";
import CookieAlert from "@src/components/CookieAlert/CookieAlert";
import { getCurrency, getDefaultServiceCurrency } from "@src/store/currency/currencyActions";
import { getChatList, updateChatList } from "@src/store/chat/chatActions";
import { getAllSellers } from "@src/store/sellers/sellersActions";
import ChipAssistHomePage from "@src/views/chipassist/ChipassistHomePage/ChipassistHomePage";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { getAllManufacturers } from "@src/store/manufacturers/manufacturersActions";
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "./constants/server_constants";

const ProvidedErrorBoundary = ErrorBoundary;
const isShowFormExamplesPage = localStorage.getItem("show_form_example_page");

const ErrorRegister = lazy(() =>
  lazyLoader(() =>
    import(/* webpackChunkName: "error_register" */ "@src/views/chipassist/ErrorRegister/ErrorRegister"),
  ),
);
const Error404 = lazy(() => lazyLoader(() => import(/* webpackChunkName: "404" */ "@src/views/chipassist/Error404")));
const RFQModal = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "rfq_modal" */ "@src/views/chipassist/Rfq/components/RFQModal")),
);
const QualityCheckModal = lazy(() =>
  lazyLoader(() =>
    import(
      /* webpackChunkName: "quality_check_modal" */ "@src/views/chipassist/Rfq/components/QualityCheckModal/QualityCheckModal"
    ),
  ),
);
const SellerMessageModal = lazy(() =>
  lazyLoader(() =>
    import(
      /* webpackChunkName: "seller_message_modal" */ "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageModal"
    ),
  ),
);
const ProgressModal = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "progress_modal" */ "@src/components/ProgressModal/ProgressModal")),
);
const Reset = lazy(() => lazyLoader(() => import(/* webpackChunkName: "reset" */ "@src/views/chipassist/Reset/Reset")));
const RegisterSuccess = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "register_success" */ "@src/views/chipassist/Register/RegisterSuccess")),
);
const Register = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "register" */ "@src/views/chipassist/Register/Register")),
);
const ChatPage = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "faq" */ "@src/views/chipassist/Chat/ChatPage")),
);
const FAQ = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "faq" */ "@src/views/chipassist/StaticPages/FAQ/FAQ")),
);
const FormExamples = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "form_examples" */ "@src/views/chipassist/FormExamples/FormExamples")),
);
const SellExcess = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "sell_excess" */ "@src/views/chipassist/SellExcess/SellExcess")),
);
const PrivacyPolicy = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "privacy_policy" */ "@src/views/chipassist/StaticPages/PrivacyPolicy")),
);
const Unsubscribe = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "unsubscribe" */ "@src/views/chipassist/StaticPages/Unsubscribe")),
);
const ProductView = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "product" */ "@src/views/chipassist/Product/Product")),
);
const PaymentAndDelivery = lazy(() =>
  lazyLoader(() =>
    import(
      /* webpackChunkName: "payment_and_delivery" */ "@src/views/chipassist/StaticPages/PaymentAndDelivery/PaymentAndDelivery"
    ),
  ),
);
// const Cart = lazy(() => lazyLoader(() => import(/* webpackChunkName: "cart" */ "@src/views/chipassist/Cart/Cart")));
const Bom = lazy(() => lazyLoader(() => import(/* webpackChunkName: "bom" */ "@src/views/chipassist/Bom/Bom")));
const Brands = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "brands" */ "@src/views/chipassist/Brands/Brands")),
);
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
const Login = lazy(() => lazyLoader(() => import(/* webpackChunkName: "login" */ "@src/views/chipassist/Login/Login")));
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

const Manufacturer = lazy(() =>
  lazyLoader(() => import("@src/views/chipassist/StaticPages/Manufacturer/Manufacturer")),
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
  const isICSearch = constants.id === ID_ICSEARCH;
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [chatUpdatingIntervalId, setChatUpdatingIntervalId] = useState(null);

  const dispatch = useAppDispatch();
  const isAuthToken = !!getAuthToken();
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const loadedChatPages = useAppSelector((state) => state.chat.chatList.loadedPages);
  const { geolocation } = useAppSelector((state) => state.profile);

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
    if (constants.id === ID_MASTER) {
      let partner = false;
      if (isAuthenticated && partners?.length) {
        partner =
          partners.find((p) => p.name === "Test Demo Supplier") ||
          partners.find((p) => p.name === localStorage.getItem("selected_partner")) ||
          partners[0];
      }
      dispatch(onChangePartner(partner));
    }
  }, [partners, isAuthenticated]);

  useEffect(() => {
    const utm = getUtm();
    if (utm) dispatch(saveUtm(utm));
    dispatch(saveHref(window.location.href));
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
      dispatch(authCheckState());
      dispatch(getAllManufacturers());
      dispatch(getServiceTax());
      dispatch(getDefaultServiceCurrency());
      dispatch(getCurrency(selectedCurrency)).catch(() => {
        setTimeout(() => dispatch(getCurrency(selectedCurrency)), 1000);
      });
      dispatch(getAllSellers());
      dispatch(getGeolocation());
    });
  }, []);

  useEffect(() => {
    const { referrer } = document;
    const { origin, search, href } = window.location;
    const wasSent = sessionStorage.getItem("visit");
    if (!wasSent && referrer && !referrer.includes(origin) && search.includes("utm_")) {
      dispatch(
        sendFeedbackMessageThunk("visit", {
          href,
          referrer,
        }),
      ).then(() => {
        sessionStorage.setItem("visit", "true");
      });
    }
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
    if (isAuthenticated && !isICSearch) {
      dispatch(getChatList(1));
    }
  }, [isAuthenticated, selectedPartner]);

  useEffect(() => {
    if (chatUpdatingIntervalId) clearInterval(chatUpdatingIntervalId);
    if (isAuthenticated && loadedChatPages.length && !isICSearch) {
      const intervalId = setInterval(() => {
        const loadedPages = [...new Set(loadedChatPages)];
        loadedPages.forEach((page) => dispatch(updateChatList(page)));
      }, 30000);
      setChatUpdatingIntervalId(intervalId);
    }
  }, [isAuthenticated, loadedChatPages]);

  if (
    isICSearch &&
    localStorage.getItem("open_icsearch_password") !== "1234" &&
    geolocation?.loaded &&
    geolocation.country_code_iso3 !== "RUS"
  ) {
    return null;
  }

  return (
    <div style={{ height: "100%" }}>
      <ProvidedErrorBoundary>
        <HomePage>
          <Routes location={location}>
            <Route
              path="/Test"
              element={
                <Suspense fallback={<Preloader title={""} />}>
                  <Test />
                </Suspense>
              }
            />
            {!isICSearch && (
              <Route
                path="/messages"
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <PrivateRoute prevEmail={prevEmail} isAuthenticated={isAuthenticated}>
                      <ChatPage />
                    </PrivateRoute>
                  </Suspense>
                }
              />
            )}
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
            <Route path="/" element={constants.id === ID_ICSEARCH ? <IcsearchHomePage /> : <ChipAssistHomePage />} />
            {constants.id !== ID_ICSEARCH && (
              <Route
                path="/sell-excess-inventory"
                element={
                  <Suspense fallback={}>
                    <SellExcess />
                  </Suspense>
                }
              />
            )}
            <Route
              path="/auth/registration"
              element={
                <Suspense fallback={}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/registered"
              element={
                <Suspense fallback={}>
                  <RegisterSuccess />
                </Suspense>
              }
            />
            <Route
              path="/expired-link"
              element={
                <Suspense fallback={}>
                  <ErrorRegister />
                </Suspense>
              }
            />
            <Route
              path="/auth/login"
              element={
                <Suspense fallback={}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/auth/reset"
              element={
                <Suspense fallback={}>
                  <Reset />
                </Suspense>
              }
            />
            <Route
              path="/auth/reset/:token"
              element={
                <Suspense fallback={}>
                  <Reset />
                </Suspense>
              }
            />
            <Route
              path="/password/request/:token"
              element={
                <Suspense fallback={}>
                  <Reset />
                </Suspense>
              }
            />
            <Route
              path="/product/:partnumber/:stockrecordId"
              element={
                <Suspense fallback={}>
                  <ProductView />
                </Suspense>
              }
            />
            <Route
              path="/product/:partnumber"
              element={
                <Suspense fallback={}>
                  <ProductView />
                </Suspense>
              }
            />
            <Route path="/search" element={<SearchResults />} />
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
              path="/brands"
              element={
                <Suspense fallback={}>
                  <Brands />
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
            {constants.id === ID_ICSEARCH && (
              <>
                <Route
                  path="/privacy_policy"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <PrivacyPolicy />
                    </Suspense>
                  }
                />
                <Route
                  path="/payment_and_delivery"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <PaymentAndDelivery />
                    </Suspense>
                  }
                />
                <Route
                  path="/manufacturers/:name"
                  element={
                    <Suspense fallback={<Preloader title={""} />}>
                      <Manufacturer />
                    </Suspense>
                  }
                ></Route>
              </>
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
            <Route
              path={"/rfq-list-quotes"}
              element={
                <Suspense fallback={<Preloader title={""} />}>
                  <RfqList />
                </Suspense>
              }
            />
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
            {isShowFormExamplesPage && (
              <Route
                path={"/dev_tools/forms"}
                element={
                  <Suspense fallback={<Preloader title={""} />}>
                    <FormExamples />
                  </Suspense>
                }
              />
            )}
            <Route
              path="/email-unsubscribe"
              element={
                <Suspense fallback={<Preloader title={""} />}>
                  <Unsubscribe />
                </Suspense>
              }
            />
            <Route
              path="/*"
              element={
                <Suspense fallback={<Preloader title={""} />}>
                  <Error404 />
                </Suspense>
              }
            />
          </Routes>
        </HomePage>
        {/* <FeedbackButton /> */}
        {window.location.pathname !== "/messages" && <ScrollUpButton />}

        <Suspense fallback={}>
          <RFQModal />
        </Suspense>
        <Suspense fallback={}>
          <SellerMessageModal />
        </Suspense>
        <Suspense fallback={}>
          <QualityCheckModal />
        </Suspense>
        <Suspense fallback={}>
          <ProgressModal />
        </Suspense>
      </ProvidedErrorBoundary>

      <AlertBottomLeft />
      <AlertTopRight />
      <AlertModal />
      {/* <AddProductToListModal /> */}
      {!isICSearch && <CookieAlert />}
    </div>
  );
};

export default ChipAssistApp;
