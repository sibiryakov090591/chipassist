/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import clsx from "clsx";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import passwordValidator from "password-validator";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { resetPasswordThunk } from "@src/store/profile/profileActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { authStart, login } from "@src/store/authentication/authActions";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

const NewPasswordForm = (props: { token: string; className: string }) => {
  const { className, token, ...rest } = props;
  const status = useAppSelector((state) => state.profile.resetPassword);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("reset");
  const navigate = useNavigate();
  // const { currencyPrice } = useCurrency();

  const [validateErrors, setValidateErrors] = useState<string[]>([]);
  const [notMatchError, setNotMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirm: "",
    username: localStorage.getItem("registered_email") || localStorage.getItem("reset_email") || "",
  });
  const isShowEmailField = !(localStorage.getItem("registered_email") || localStorage.getItem("reset_email"));

  const password = useRef(null);
  const confirm = useRef(null);

  // eslint-disable-next-line new-cap
  const schema = new passwordValidator();
  schema
    .not(/[А-Яа-я|ё]/gi) // Not RU letters
    .has()
    .digits(1) // Must have at least 1 digit
    .has()
    .letters(1) // Must have at least 1 letter
    .is()
    .min(9) // Minimum length 9
    .is()
    .max(100); // Maximum length 100

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "password") {
      const errorsList = schema.validate(value, { list: true });
      setValidateErrors(errorsList);
      setNotMatchError(values.confirm !== value);
    }

    if (name === "confirm") {
      setNotMatchError(values.password !== value);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (values.password !== values.confirm) {
      setNotMatchError(true);
      return;
    }

    if (!status.isLoading && !validateErrors.length) {
      dispatch(resetPasswordThunk(token, values.password, values.username))
        .then((res: { success: string; token?: string }) => {
          if (res.token) {
            dispatch(authStart());
            const data: { email: string; password: string; username: string } = {
              username: values.username,
              email: values.username,
              password: values.password,
            };
            dispatch(login(data, res.token, navigate, null));
          } else {
            setShowLoginForm(true);
          }
        })
        .catch((e: any) => {
          console.log("LOGIN_ERROR", e);
        });
    }
  };

  const getErrorsText = () => {
    const errorMessages: string[] = [];
    Object.keys(status.error).forEach((errorKey) => {
      const errorsArray = status.error[errorKey].split("ErrorDetail").slice(1);
      errorsArray.forEach((str: string) => {
        const errorMessage = str.split("'")[1];
        errorMessages.push(errorMessage);
      });
    });
    return errorMessages;
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);

    [password, confirm].forEach((ref) => {
      const input = ref.current.children[1].children[0];
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  };

  return (
    <>
      <form {...rest} className={clsx(classes.root, className)} onSubmit={onSubmit}>
        {!showLoginForm && (
          <>
            <div style={{ marginBottom: 20 }}>{t("reset.helper_text.title")}</div>
            <div className={classes.fields}>
              <div style={{ display: isShowEmailField ? "block" : "none" }} className={classes.textField}>
                <TextField
                  label={t("email")}
                  name="username"
                  id="username"
                  value={values.username || ""}
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  className={classes.input}
                  ref={password}
                  fullWidth
                  label={t("new_password")}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  error={validateErrors.length > 0}
                />
                <div className={`${classes.helper} ${validateErrors.length > 0 ? classes.helperActive : ""}`}>
                  {validateErrors.length > 0 && t(`reset.helper_text.${validateErrors[0]}`)}
                </div>
              </div>

              <div className={classes.textField}>
                <TextField
                  className={classes.input}
                  ref={confirm}
                  fullWidth
                  label={t("new_password_confirm")}
                  name="confirm"
                  onChange={handleChange}
                  type="password"
                  value={values.confirm}
                  variant="outlined"
                  error={notMatchError}
                />
                {showPassword ? (
                  <VisibilityOffIcon className={classes.visibilityIcon} onClick={showPasswordHandler} />
                ) : (
                  <VisibilityIcon className={classes.visibilityIcon} onClick={showPasswordHandler} />
                )}
                <div className={`${classes.helper} ${notMatchError ? classes.helperActive : ""}`}>
                  {t(`reset.helper_text.does_not_match`)}
                </div>
              </div>
            </div>
            <Button
              className={clsx(classes.submitButton, appTheme.buttonCreate)}
              color="secondary"
              disabled={!!validateErrors.length || status.isLoading || notMatchError}
              size="large"
              type="submit"
              name="signin"
              variant="contained"
            >
              {status.isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
              {t("common.submit")}
            </Button>
          </>
        )}
        {showLoginForm && (
          <>
            <Alert severity="success" style={{ marginTop: 10 }}>
              {t("password_changed")}
            </Alert>
            <Button variant="contained" color="primary" href="/auth/login" fullWidth style={{ marginTop: 10 }}>
              {t("login")}
            </Button>
          </>
        )}
        {status.error && (
          <Alert severity="error" style={{ marginTop: 10 }}>
            <ul style={{ paddingLeft: 10 }}>
              {getErrorsText().map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
      </form>
    </>
  );
};

export default NewPasswordForm;