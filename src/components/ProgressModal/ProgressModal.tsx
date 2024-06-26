import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop, Box, Button, useMediaQuery, useTheme } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import Preloader from "@src/components/Preloader/Preloader";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { authSignupAction, login, sendQuickRequestUnAuth } from "@src/store/authentication/authActions";
import clsx from "clsx";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/SuccessModal/styles";
import {
  changeMisc,
  progressModalClose,
  progressModalSetPartNumber,
  progressModalSuccess,
  sendVerificationCode,
} from "@src/store/progressModal/progressModalActions";
import { useLocation, useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import OtpInput from "react-verification-code-input";
import { deleteMiscAction, loadMiscAction } from "@src/store/misc/miscActions";
import { batch } from "react-redux";
import { getCart } from "@src/store/cart/cartActions";
import constants from "@src/constants/constants";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { clearRfqItem, rfqModalClose, saveRfqItem } from "@src/store/rfq/rfqActions";
import { useStyles } from "./styles";

const ProgressModal: React.FC = () => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("progress_modal");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const { open, inProgress, success, error, errorMessage, partNumber, requestType, tempRfq } = useAppSelector(
    (state) => state.progressModal,
  );
  const valueToken = useURLSearchParams("value", false, null, false);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null) || !!valueToken;
  const registerData = useAppSelector((state) => state.auth.registerData);

  const [checking, setChecking] = useState(0);
  const [timer, setTimer] = useState(60);
  const [values, setValues] = useState<Array<string>>([]);
  const [sending, setSending] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [tokenForSetPassword, setTokenForSetPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      if (open) {
        if (timer > 0) setTimeout(() => setTimer((prev) => prev - 1), 1000);
      } else {
        setTimer(60); // set timer after close
      }
    }
  }, [timer, open, isAuthenticated]);

  useEffect(() => {
    if (open && !isAuthenticated) {
      // waiting for the request to be sent (should be removed from localStorage)
      if (localStorage.getItem("progress_modal_data")) {
        setTimeout(() => setChecking((prevState) => prevState + 1), 3000);
      } else {
        setChecking(0);
        dispatch(progressModalSuccess());
        dispatch(getCart());
      }
    }
  }, [checking, open, isAuthenticated]);

  useEffect(() => {
    if (open && isAuthenticated && !!checking) {
      if (!localStorage.getItem("progress_modal_data")) {
        setChecking(0);
        dispatch(progressModalSuccess());
        dispatch(getCart());
      } else {
        setTimeout(() => setChecking((prevState) => prevState + 1), 3000);
      }
    }
  }, [isAuthenticated, checking, open]);

  useEffect(() => {
    if (values.length === 4) {
      const email = localStorage.getItem("registered_email");
      dispatch(sendVerificationCode(values, email)).then((codeRes: any) => {
        if (codeRes?.token) {
          setToken(codeRes.token);
          dispatch(loadMiscAction("not_activated_request", email)).then((res: any) => {
            const data = res?.data?.data || res?.data;
            if (
              data &&
              ["rfq", "pcb", "sellerMessage", "rfq_list", "qualityCheck", "order"].includes(data.requestType)
            ) {
              setSending(true);
              dispatch(sendQuickRequestUnAuth(res.data, codeRes.token, email)).then(() => {
                if (!codeRes?.code) dispatch(login({ email }, codeRes.token, navigate, null));
              });
            } else if (codeRes?.code) {
              // for quick Order
              // Quick order id disabled now
              dispatch(progressModalClose());
              window.scrollTo({ top: 0 });
              navigate(`/password/request/${codeRes.code}`, {
                state: { background: location.state?.background || location },
              });
            } else {
              dispatch(progressModalClose());
              dispatch(login({ email }, codeRes.token, navigate, null));
            }
          });
          if (codeRes?.code) setTokenForSetPassword(codeRes.code);
        } else {
          setInvalidCode(true);
        }
      });
    }
  }, [values]);

  useEffect(() => {
    if (!open) {
      batch(() => {
        setChecking(0);
        setTimer(60);
        setTokenForSetPassword("");
        setValues([]);
        setInvalidCode(false);
      });
    }
  }, [open]);

  useEffect(() => {
    if (success || error) setSending(false);
  }, [success, error]);

  const handleClose = () => {
    dispatch(progressModalClose());
    if (tokenForSetPassword) {
      window.scrollTo({ top: 0 });
      navigate(`/password/request/${tokenForSetPassword}`, {
        state: { background: location.state?.background || location },
      });
    }
    if (errorMessage?.includes("Incorrect partnumber")) {
      const email = localStorage.getItem("registered_email");
      dispatch(deleteMiscAction("not_activated_request", email));
      localStorage.removeItem("progress_modal_data");
    }
  };

  const signUpAgain = () => {
    setTimer(60);
    if (registerData) dispatch(authSignupAction(registerData, { subj: requestType }));
  };

  const handleOnChange = (value: string) => {
    if (invalidCode) setInvalidCode(false);
    setValues(value.split(""));
  };

  const handleSubmitResending = () => {
    const newPartNumber = errorMessage.split(" ").pop();
    dispatch(progressModalSetPartNumber(newPartNumber, "rfq"));

    console.log("MISC_SAVE:", { ...tempRfq.formState, partNumber: newPartNumber });
    dispatch(changeMisc("rfq", { ...tempRfq.formState, partNumber: newPartNumber }, tempRfq.formState.email));

    localStorage.setItem("before_unload_alert_disabled", "true");
    localStorage.setItem("product_request_hint_disabled", "true");

    if (isAuthenticated) {
      dispatch(saveRfqItem({ ...tempRfq.rfq, part_number: errorMessage.split(" ").pop() })).then(() => {
        batch(() => {
          dispatch(clearRfqItem());
          dispatch(rfqModalClose());
        });
      });
      // const email = localStorage.getItem("email");
      // console.log(email);
      // dispatch(deleteMiscAction("not_activated_request", email));
      localStorage.removeItem("progress_modal_data");
    } else {
      dispatch(
        saveRfqItem({ ...registerData, ...tempRfq.rfq, part_number: errorMessage.split(" ").pop() }, token),
      ).then(() => {
        batch(() => {
          dispatch(clearRfqItem());
          dispatch(rfqModalClose());
        });
      });
      const email = localStorage.getItem("registered_email");
      dispatch(deleteMiscAction("not_activated_request", email));
      localStorage.removeItem("progress_modal_data");
    }
    // }
    return false;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className={commonClasses.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={clsx(commonClasses.paper, classes.paper)}>
          {!isAuthenticated && !success && !error && partNumber && (
            <div className={classes.content}>
              {requestType === "rfq" && (
                <>
                  <h1
                    className={classes.title}
                    dangerouslySetInnerHTML={{
                      __html: t("progress.rfq_title", {
                        interpolation: { escapeValue: false },
                        partNumber,
                      }),
                    }}
                  />
                  <h2 className={classes.subTitle}>{t("progress.rfq_text")}</h2>
                </>
              )}
              {requestType === "pcb" && (
                <>
                  <h1 className={classes.title}>{t("progress.pcb_title")}</h1>
                  <h2 className={classes.subTitle}>{t("progress.pcb_text")}</h2>
                </>
              )}
              {requestType === "order" && (
                <>
                  <h1 className={classes.title}>{t("progress.order_title")}</h1>
                  <h2 className={classes.subTitle}>{t("progress.order_text")}</h2>
                </>
              )}
              {requestType === "sellerMessage" && (
                <>
                  <h1 className={classes.title}>{t("progress.message_title")}</h1>
                  <h2 className={classes.subTitle}>{t("progress.message_text")}</h2>
                </>
              )}
              {requestType === "qualityCheck" && (
                <>
                  <h1 className={classes.title}>Your request needs to be confirmed</h1>
                  <h2 className={classes.subTitle}>Please enter the verification code to confirm your request</h2>
                </>
              )}

              {requestType === "rfq_list" && (
                <>
                  <h1
                    className={classes.title}
                    dangerouslySetInnerHTML={{
                      __html: t("progress.rfq_title", {
                        interpolation: { escapeValue: false },
                        partNumber,
                      }),
                    }}
                  />
                  <h2 className={classes.subTitle}>{t("progress.rfq_text")}</h2>
                </>
              )}

              {inProgress && !sending && (
                <div style={{ position: "relative" }}>
                  <OtpInput
                    values={values}
                    type={"number"}
                    fields={4}
                    fieldWidth={isXsDown ? 42 : 56}
                    fieldHeight={isXsDown ? 58 : 72}
                    autoFocus={true}
                    loading={false}
                    className={classes.code}
                    onChange={(value) => handleOnChange(value)}
                  />
                  {invalidCode && <div className={classes.codeError}>Incorrect code</div>}
                </div>
              )}

              {inProgress && sending && <Preloader title={t("preloader")} />}

              <div className={classes.text}>
                {t("sent_email")}
                <span className={classes.email}>{registerData?.email}</span>
              </div>
              <div>
                <strong>{t("link_valid")}</strong>
              </div>
              {registerData && inProgress && (
                <Box pt={2}>
                  {timer > 0 ? (
                    <div
                      className={registerClasses.signUpAgainText}
                      dangerouslySetInnerHTML={{
                        __html: t("send_again", { interpolation: { escapeValue: false }, sec: timer }),
                      }}
                    />
                  ) : (
                    <span className={clsx(appTheme.hyperlink, registerClasses.signUpAgainLink)} onClick={signUpAgain}>
                      {t("send_link")}
                    </span>
                  )}
                </Box>
              )}
            </div>
          )}
          {isAuthenticated && inProgress && <Preloader title={t("preloader")} />}
          {(success || error) && partNumber && (
            <div className={classes.content}>
              {success && (
                <>
                  <h1 className={classes.title}>{t("success_title")}</h1>
                  {requestType === "rfq" && (
                    <>
                      <p className={classes.p}>{t("success.rfq_text_1", { name: constants.title })}</p>
                      <p className={classes.p}>{t("success.rfq_text_2")}</p>
                      <p className={classes.p}>{t("success.rfq_text_3")}</p>
                    </>
                  )}
                  {requestType === "pcb" && (
                    <>
                      <h2 className={classes.subTitle}>{t("success.pcb_text_1")}</h2>
                      <p className={classes.p}>{t("success.pcb_text_2")}</p>
                    </>
                  )}
                  {requestType === "qualityCheck" && (
                    <>
                      <p className={classes.p}>
                        Your request for quality check about <strong>{partNumber}</strong> has been sent.
                      </p>
                      <p className={classes.p}>{"You'll receive updates on your request by email."}</p>
                    </>
                  )}
                  {requestType === "order" && (
                    <>
                      <p className={classes.p}>{t("success.order_text_1")}</p>
                      <p className={classes.p}>{t("success.order_text_2")}</p>
                    </>
                  )}
                  {requestType === "sellerMessage" && (
                    <>
                      <p
                        className={classes.p}
                        dangerouslySetInnerHTML={{
                          __html: t("success.message_text_1", {
                            mpn: partNumber,
                          }),
                        }}
                      />
                      <p className={classes.p}>{t("success.message_text_2")}</p>
                    </>
                  )}
                  {requestType === "rfq_list" && (
                    <>
                      <p className={classes.p}>{t("success.rfq_text_1", { name: constants.title })}</p>
                      <p className={classes.p}>{t("success.rfq_text_2")}</p>
                      <p className={classes.p}>{t("success.rfq_text_3")}</p>
                    </>
                  )}
                </>
              )}
              {error && (
                <>
                  <h2 className={classes.error}>{t("error_title")}</h2>
                  <p className={classes.errorMessage}>
                    {errorMessage ? <div dangerouslySetInnerHTML={{ __html: errorMessage }} /> : t("error_message")}
                  </p>
                  {errorMessage.includes("Incorrect partnumber") && errorMessage.includes("Example:") && (
                    <p className={classes.errorMessage}>Would you like to send RFQ for the corrected part number?</p>
                  )}
                </>
              )}
            </div>
          )}
          {(success || error) && (
            <div className={classes.buttonContainer}>
              {errorMessage.includes("Incorrect partnumber") && errorMessage.includes("Example:") && (
                <Button
                  variant="contained"
                  className={appTheme.buttonCreate}
                  onClick={handleSubmitResending}
                  style={{ marginRight: "10px" }}
                >
                  {"Yes"}
                </Button>
              )}
              <Button variant="contained" type="reset" className={appTheme.buttonPrimary} onClick={handleClose}>
                {t("close_button")}
              </Button>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default ProgressModal;
