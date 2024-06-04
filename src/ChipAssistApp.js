/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React, { useState, Suspense, lazy, useEffect } from "react";
import ScrollUpButton from "react-scroll-up-button";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import checkIsAuthenticated, { getAuthToken, isAuthPage } from "@src/utils/auth";
import ErrorBoundary from "@src/components/ErrorBoundary";
import "@src/static/css/style.css";
import SearchResults from "@src/views/chipassist/Search/SearchResults";
import "semantic-ui-css/semantic.min.css";
// import "./mixins/moment";
import "./mixins/validate";
import "@src/assets/scss/index.scss";
import LogOut from "@src/components/LogOut/LogOut";
import AlertBottomLeft from "@src/components/Alerts/AlertBottomLeft";
import AlertTopRight from "@src/components/Alerts/AlertTopRight";
import AlertModal from "@src/components/Alerts/AlertModal";
import IcsearchHomePage from "@src/views/chipassist/IcsearchHomePage/IcsearchHomePage";
import Preloader from "@src/components/Preloader/Preloader";
import CookieAlert from "@src/components/CookieAlert/CookieAlert";
import ChipAssistHomePage from "@src/views/chipassist/ChipassistHomePage/ChipassistHomePage";
import HomePage from "@src/layouts/HomePage";
import { lazyLoader } from "@src/utils/utility";
import { loadProfileInfoThunk } from "@src/store/profile/profileActions";
import { checkUserActivityStatus } from "@src/store/common/commonActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "./constants/server_constants";

const ProvidedErrorBoundary = ErrorBoundary;
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
const Register = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "register" */ "@src/views/chipassist/Register/Register")),
);
const ChatPage = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "faq" */ "@src/views/chipassist/Chat/ChatPage")),
);
const FAQ = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "faq" */ "@src/views/chipassist/StaticPages/FAQ/FAQ")),
);
const PrivacyPolicy = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "privacy_policy" */ "@src/views/chipassist/StaticPages/PrivacyPolicy")),
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
const Cart = lazy(() => lazyLoader(() => import(/* webpackChunkName: "cart" */ "@src/views/chipassist/Cart/Cart")));
const Bom = lazy(() => lazyLoader(() => import(/* webpackChunkName: "bom" */ "@src/views/chipassist/Bom/Bom")));
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
const Profile = lazy(() =>
  lazyLoader(() => import(/* webpackChunkName: "profile" */ "@src/views/chipassist/Profile/Profile")),
);

const Login = lazy(() => lazyLoader(() => import(/* webpackChunkName: "login" */ "@src/views/chipassist/Login/Login")));

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
  const dispatch = useAppDispatch();
  const isICSearch = constants.id === ID_ICSEARCH;
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const isAuthToken = !!getAuthToken();
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);

  useEffect(() => {
    if (isAuthToken) {
      dispatch(loadProfileInfoThunk());
    }
    setIsAuthenticated(isAuthToken);
  }, [isAuthToken]);

  return (
    <div style={{ height: "100%" }}>
      <ProvidedErrorBoundary>
        <HomePage>
          <Routes location={location}>
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
            <Route path="/" element={constants.id === ID_ICSEARCH ? <IcsearchHomePage /> : <ChipAssistHomePage />} />
            <Route
              path="/auth/registration"
              element={
                <Suspense fallback={}>
                  <Register />
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
            <Route
              path="/cart"
              element={
                <Suspense fallback={}>
                  <Cart />
                </Suspense>
              }
            />
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
              path="/pcb"
              element={
                <Suspense fallback={}>
                  <Pcb />
                </Suspense>
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
      {!isICSearch && <CookieAlert />}
    </div>
  );
};

export default ChipAssistApp;
