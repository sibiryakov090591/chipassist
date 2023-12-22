/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Button, FormHelperText, TextField } from "@material-ui/core";
import {
  authFail,
  saveEmailAction,
  authStart,
  authSuccess,
  loginAsAction,
} from "@src/store/authentication/authActions";
import { getCart } from "@src/store/cart/cartActions";
import { isCartEnabled } from "@src/constants/common";
import { getUserAddressThunk } from "@src/store/checkout/checkoutActions";
import { useStyles } from "@src/views/chipassist/Login/components/LoginForm/styles";
import useAppTheme from "@src/theme/useAppTheme";
import { isAuthPage, setAuthToken } from "@src/utils/auth";
import { useNavigate } from "react-router-dom";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
  },
};

interface FormStateValues {
  username?: string;
  password?: string;
}

interface FormStateErrors {
  username?: string[];
  password?: string[];
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

const LoginFormAs = (props: { className: string }) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();
  const previousLocation = localStorage.getItem("previousLocation");

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    loginError: null,
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
      loginError: null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(authStart());
    const data: { email: string } & FormStateValues = { ...formState.values, email: "" };
    data.email = data.username;

    dispatch(loginAsAction(data.username))
      .then((res: any) => {
        const { token } = res;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 100);
        setAuthToken(token);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("email", data.email);
        dispatch(authSuccess(token));
        dispatch(saveEmailAction(data.email));
        if (previousLocation === null || isAuthPage(previousLocation)) {
          navigate("/");
        } else {
          navigate(-1);
        }
        if (isCartEnabled) dispatch(getCart());
        dispatch(getUserAddressThunk());
      })
      .catch((error: any) => {
        const textError = "Incorrect data";
        console.log("----- LOGIN_ERROR", error);
        setError(textError, error);
      });
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
          error={hasError("username")}
          fullWidth
          helperText={hasError("username") ? formState.errors.username[0] : null}
          label="Email address"
          name="username"
          id="username"
          onChange={handleChange}
          value={formState.values.username || ""}
          variant="outlined"
        />
      </div>
      {formState.loginError && <FormHelperText error>{formState.loginError}</FormHelperText>}
      <Button
        className={clsx(classes.submitButton, appTheme.buttonCreate)}
        disabled={!formState.isValid}
        size="large"
        type="submit"
        name="signin"
        variant="contained"
      >
        Sign in as
      </Button>
    </form>
  );
};

LoginFormAs.propTypes = {
  className: PropTypes.string,
};

export default LoginFormAs;
