/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Button, FormHelperText, TextField, CircularProgress } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { clearResetPasswordState, resetPasswordRequestThunk } from "@src/store/profile/profileActions";
import Alert from "@material-ui/lab/Alert";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import SuccessModal from "@src/views/chipassist/HomeRestricted/SuccessModal/SuccessModal";
import { useStyles } from "./styles";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "required" },
    email: true,
  },
};

interface FormStateValues {
  username?: string;
}

interface FormStateTouched {
  username?: boolean;
}

interface FormStateErrors {
  username?: string[];
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  loginError: string | null;
}

const ResetForm = (props: { className: string }) => {
  const { className, ...rest } = props;
  const status = useAppSelector((state) => state.profile.resetPasswordRequest);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("reset");

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    loginError: null,
  });
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("login_failure_email")) {
      setFormState((prev) => ({ ...prev, values: { username: localStorage.getItem("login_failure_email") } }));
    }

    return () => {
      dispatch(clearResetPasswordState());
    };
  }, []);

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
    const { name, value, type, checked } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: type === "checkbox" ? checked : name === "username" ? value?.replace(/ /g, "") : value,
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
    if (!status.isLoading) {
      dispatch(resetPasswordRequestThunk(formState.values.username)).then(() => {
        localStorage.setItem("reset_email", formState.values.username);
        localStorage.removeItem("login_failure_email");
        setSuccessModalOpen(true);
      });
    }
  };

  const hasError = (field: keyof FormStateTouched) => !!(formState.touched[field] && formState.errors[field]);

  const getErrorsText = () => {
    const errorMessages: string[] = [];
    Object.keys(status.error).forEach((errorKey) => {
      // This parser for old response errors object model
      // const errorsArray = status.error[errorKey].split("ErrorDetail").slice(1);
      // errorsArray.forEach((str: string) => {
      //   const errorMessage = str.split("'")[1];
      //   errorMessages.push(errorMessage);
      // });
      errorMessages.push(status.error[errorKey]);
    });
    return errorMessages;
  };

  const onCloseModal = () => setSuccessModalOpen(false);

  return (
    <>
      <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
        <div className={classes.fields}>
          <TextField
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
        </div>
        {formState.loginError && <FormHelperText error>{formState.loginError}</FormHelperText>}
        <Button
          className={clsx(classes.submitButton, appTheme.buttonCreate)}
          disabled={!formState.isValid || status.isLoading}
          size="large"
          type="submit"
          name="signin"
          variant="contained"
        >
          {status.isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
          {t("reset")}
        </Button>
        {status.success && (
          <Alert severity="success" style={{ marginTop: 10 }}>
            {t("reset_success")}
          </Alert>
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

      {successModalOpen && <SuccessModal onCloseModal={onCloseModal} type="reset" />}
    </>
  );
};

ResetForm.propTypes = {
  className: PropTypes.string,
};

export default ResetForm;
