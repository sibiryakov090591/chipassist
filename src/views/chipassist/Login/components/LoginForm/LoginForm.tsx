/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import * as Sentry from "@sentry/react";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, CircularProgress, FormHelperText, TextField } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { authFail, authLoginAction, authStart, login } from "@src/store/authentication/authActions";
import useAppTheme from "@src/theme/useAppTheme";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
// import useCurrency from "@src/hooks/useCurrency";
import { useNavigate } from "react-router-dom";
import useDebounce from "@src/hooks/useDebounce";
import { useStyles } from "./styles";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "required" },
    email: true,
  },
  password: {
    presence: { allowEmpty: false, message: "required" },
  },
};

interface FormStateValues {
  username?: string;
  password?: string;
}

interface FormStateErrors {
  username?: string[];
  password?: string[];
  [key: string]: string[];
}

interface FormStateTouched {
  username?: boolean;
  password?: boolean;
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  loginError: string | null;
}

const LoginForm = (props: { className: string; isExample?: boolean }) => {
  const { className, isExample, ...rest } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch: any = useAppDispatch();
  const { t } = useI18n("login");
  const isLoading = useAppSelector((state) => state.auth.loading);
  const backurl = useURLSearchParams("backurl", false, null, false);
  // const { currencyPrice } = useCurrency();

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    loginError: null,
  });
  const debouncedState = useDebounce(formState, 300);

  useEffect(() => {
    const formErrors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  const onBlurHandler = (name: string) => () => {
    return setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { name, type, value, checked } = event.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: type === "checkbox" ? checked : name === "username" ? value?.replace(/ /g, "") : value,
      },
      touched: {
        ...formState.touched,
        [name]: type === "checkbox",
      },
      errors,
      loginError: null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validate(formState.values, schema);
    if (errors) {
      return setFormState((prevState) => ({
        ...prevState,
        isValid: !errors,
        touched: Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        errors: errors || {},
      }));
    }

    if (!isExample) {
      dispatch(authStart());
      const data: { email: string } & FormStateValues = { ...formState.values, email: "" };
      data.email = data.username;

      return dispatch(authLoginAction(data))
        .then((res: any) => {
          const { token } = res;
          dispatch(login(data, token, navigate, { backurl }));
        })
        .catch((err: any) => {
          const textError = t("incorrect_em_or_pass");
          setError(textError, textError);
          localStorage.setItem("login_failure_email", formState.values.username);
          console.log("LOGIN_ERROR 3", err);
        });
    }
    return false;
  };

  const setError = (text: string, error: any) => {
    setFormState((prevState) => ({
      ...prevState,
      loginError: text,
    }));
    dispatch(authFail(error));
  };

  const hasError = (field: keyof FormStateTouched) => !!(formState.touched[field] && formState.errors[field]);

  return (
    <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          onBlur={onBlurHandler("username")}
          error={hasError("username")}
          fullWidth
          helperText={hasError("username") ? t(formState.errors.username[0]) : null}
          label={t("email")}
          name="username"
          id="username"
          onChange={handleChange}
          value={formState.values.username || ""}
          variant="outlined"
        />
        <TextField
          onBlur={onBlurHandler("password")}
          error={hasError("password")}
          fullWidth
          helperText={hasError("password") ? t(formState.errors.password[0]) : null}
          label={t("password")}
          name="password"
          id="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
      </div>
      {formState.loginError && <FormHelperText error>{formState.loginError}</FormHelperText>}
      <Button
        className={clsx(classes.submitButton, appTheme.buttonCreate)}
        disabled={isLoading}
        size="large"
        type="submit"
        name="signin"
        variant="contained"
      >
        {isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
        {t("sign_in")}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
