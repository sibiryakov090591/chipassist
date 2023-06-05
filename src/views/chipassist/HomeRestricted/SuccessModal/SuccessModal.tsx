import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  Box,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { authSignupAction, login } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import { useStyles as useProgressStyles } from "@src/components/ProgressModal/styles";
import { sendVerificationCode } from "@src/store/progressModal/progressModalActions";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-verification-code-input";
import { useStyles } from "./styles";

interface Props {
  onCloseModal: () => void;
}

const SuccessModal: React.FC<Props> = ({ onCloseModal }) => {
  const appTheme = useAppTheme();
  const { t } = useI18n("restricted.success_modal");
  const classes = useStyles();
  const progressClasses = useProgressStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const registerData = useAppSelector((state) => state.auth.registerData);

  const [checking, setChecking] = useState<number>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(60);
  const [values, setValues] = useState<Array<string>>([]);
  const [invalidCode, setInvalidCode] = useState(false);

  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer((prev) => prev - 1), 1000);
  }, [timer]);

  useEffect(() => {
    if (!confirmed && !localStorage.getItem("token")) {
      setTimeout(() => setChecking((prevState) => prevState + 1), 3000);
    } else {
      setConfirmed(true);
      onCloseModal();
      const previousLocation = localStorage.getItem("previousLocation");
      navigate(previousLocation || "/");
    }
  }, [checking]);

  useEffect(() => {
    if (values.length === 4) {
      const email = localStorage.getItem("registered_email");
      dispatch(sendVerificationCode(values, email)).then((codeRes: any) => {
        if (codeRes?.code) {
          navigate(`/password/request/${codeRes?.code}`, {
            state: { background: location.state?.background || location },
          });
          onCloseModal();
        } else if (codeRes?.token) {
          dispatch(login({ email: localStorage.getItem("registered_email") }, codeRes?.token, navigate, null));
          onCloseModal();
        } else {
          setInvalidCode(true);
        }
      });
    }
  }, [values]);

  const signUpAgain = () => {
    setTimer(60);
    if (registerData) dispatch(authSignupAction(registerData));
  };

  const handleOnChange = (value: string) => {
    if (invalidCode) setInvalidCode(false);
    setValues(value.split(""));
  };

  return (
    <Dialog open={true} onClose={onCloseModal}>
      <Box p={2} style={{ textAlign: "center" }}>
        <DialogTitle className={classes.dialog}>
          {confirmed ? (
            <span style={{ fontSize: "1.6rem", fontWeight: 600 }}>{t("confirmed.title")}</span>
          ) : (
            <span style={{ fontSize: "1.6rem", fontWeight: 600 }}>{t("un_auth.title")}</span>
          )}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          {confirmed ? (
            <p className={classes.description}>{t("confirmed.text_1")}</p>
          ) : (
            <>
              <p className={classes.description}>{t("un_auth.text_1")}</p>
              <div style={{ position: "relative", paddingBottom: 12 }}>
                <OtpInput
                  values={values}
                  type={"number"}
                  fields={4}
                  fieldWidth={isXsDown ? 42 : 56}
                  fieldHeight={isXsDown ? 58 : 72}
                  autoFocus={true}
                  loading={false}
                  className={progressClasses.code}
                  onChange={(value) => handleOnChange(value)}
                />
                {invalidCode && <div className={progressClasses.codeError}>Incorrect code</div>}
              </div>
              <div className={classes.text}>
                {t("un_auth.text_2")}
                <span className={classes.email}>{registerData?.email}</span>
              </div>
              <div>
                <strong>{t("un_auth.text_3")}</strong>
              </div>
            </>
          )}
        </DialogContent>
        <Box pt={2}>
          {registerData && !confirmed && (
            <>
              {timer > 0 ? (
                <div
                  className={classes.signUpAgainText}
                  dangerouslySetInnerHTML={{
                    __html: t("un_auth.text_4", { interpolation: { escapeValue: false }, sec: timer }),
                  }}
                />
              ) : (
                <span className={clsx(appTheme.hyperlink, classes.signUpAgainLink)} onClick={signUpAgain}>
                  {t("un_auth.send_link")}
                </span>
              )}
            </>
          )}
          <DialogActions style={{ justifyContent: "center" }}>
            {confirmed && (
              <Button
                className={`${appTheme.buttonCreate} ${classes.button}`}
                onClick={onCloseModal}
                color="primary"
                variant="contained"
              >
                {t("confirmed.button")}
              </Button>
            )}
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SuccessModal;
