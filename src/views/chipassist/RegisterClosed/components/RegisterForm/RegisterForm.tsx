import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { Button, Checkbox, FormHelperText, TextField, Typography, Link, CircularProgress } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

import { authFail, authSignup } from "@src/store/authentication/authActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

const schema = {
  first_name: {
    presence: { allowEmpty: false, message: "required" },
    length: {
      maximum: 128,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: "required" },
    length: {
      maximum: 128,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: "required" },
    length: {
      is: 11,
    },
  },
  company_name: {
    presence: { allowEmpty: false, message: "required" },
    length: {
      maximum: 128,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "required" },
    length: {
      maximum: 128,
    },
  },
  confirmPassword: {
    equality: "password",
  },
  policy: {
    presence: { allowEmpty: false, message: "required" },
    checked: true,
  },
};

interface FormStateValues {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone?: string;
  confirmPassword?: string;
  email?: string;
  password?: string;
  policy?: boolean;
}

interface FormStateErrors {
  first_name?: string[];
  last_name?: string[];
  company_name?: string[];
  phone?: string[];
  confirmPassword?: string[];
  email?: string[];
  password?: string[];
  policy?: string[];
}

interface FormStateTouched {
  first_name?: boolean;
  last_name?: boolean;
  company_name?: boolean;
  phone?: boolean;
  confirmPassword?: boolean;
  email?: boolean;
  password?: boolean;
  policy?: boolean;
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  wrongUserName: boolean;
}

const phoneMaskRegex = /[+()_-]/gi;

const RegisterForm = (props: { className: string; [x: string]: any }) => {
  const { className, ...rest } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch: any = useAppDispatch();
  const { t } = useI18n("register");
  const isLoading = useAppSelector((state) => state.auth.loading);

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    wrongUserName: false,
  });

  useEffect(() => {
    const errors = validate(
      { ...formState.values, phone: formState.values.phone?.replace(phoneMaskRegex, "") },
      schema,
    );

    setFormState((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: `event.persist()` is no longer needed since React 17.0
    event.persist();

    setFormState((prevState) => {
      const nextState = {
        ...prevState,
        values: {
          ...prevState.values,
          [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
        },
        touched: {
          ...prevState.touched,
          [event.target.name]: true,
        },
      };

      if (event.target.name === "email") {
        nextState.wrongUserName = prevState.wrongUserName && event.target.value === prevState.values.email;
      }

      return nextState;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.isValid) {
      dispatch(authSignup({ ...formState.values, phone: formState.values.phone.replace(phoneMaskRegex, "") }))
        .then((res: any) => {
          navigate(`/${res.redirect}`);
        })
        .catch((err: any) => {
          console.log("authFail", err.error);
          dispatch(authFail(err));
          setFormState((prevState) => ({
            ...prevState,
            wrongUserName: true,
          }));
        });
    }
  };

  const hasError = (field: keyof FormStateTouched) => !!(formState.touched[field] && formState.errors[field]);

  return (
    <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          error={hasError("first_name")}
          fullWidth
          helperText={hasError("first_name") ? t(formState.errors.first_name[0]) : null}
          label={t("first_name")}
          name="first_name"
          onChange={handleChange}
          value={formState.values.first_name || ""}
          variant="outlined"
          required
        />
        <TextField
          error={hasError("last_name")}
          fullWidth
          helperText={hasError("last_name") ? t(formState.errors.last_name[0]) : null}
          label={t("last_name")}
          name="last_name"
          onChange={handleChange}
          value={formState.values.last_name || ""}
          variant="outlined"
          required
        />
        <TextField
          error={hasError("company_name")}
          fullWidth
          helperText={hasError("company_name") ? t(formState.errors.company_name[0]) : null}
          label={t("company_name")}
          name="company_name"
          onChange={handleChange}
          value={formState.values.company_name || ""}
          variant="outlined"
          required
        />
        <InputMask mask="+7(999)999-9999" value={formState.values.phone || ""} onChange={handleChange} disabled={false}>
          <TextField
            error={hasError("phone")}
            fullWidth
            helperText={hasError("phone") ? t(formState.errors.phone[0]) : null}
            label={t("phone")}
            name="phone"
            variant="outlined"
            required
          />
        </InputMask>
        <TextField
          error={hasError("email")}
          fullWidth
          helperText={hasError("email") ? t(formState.errors.email[0]) : null}
          label={t("email")}
          name="email"
          onChange={handleChange}
          value={formState.values.email || ""}
          variant="outlined"
          required
        />
        <TextField
          error={hasError("password")}
          fullWidth
          helperText={hasError("password") ? t(formState.errors.password[0]) : null}
          label={t("password")}
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
          required
        />
        <TextField
          error={hasError("confirmPassword")}
          fullWidth
          helperText={hasError("confirmPassword") ? t(formState.errors.confirmPassword[0]) : null}
          label={t("confirmPassword")}
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.confirmPassword || ""}
          variant="outlined"
          required
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={clsx(classes.policyCheckbox, appTheme.checkbox)}
              color="default"
              name="policy"
              onChange={handleChange}
            />
            <Typography color="textSecondary" variant="body1">
              {`${t("term_1")} `}
              <Link component={RouterLink} to="#" underline="always" variant="h6" className={appTheme.hyperlink}>
                {t("term_2")}
              </Link>
            </Typography>
          </div>
          {hasError("policy") && <FormHelperText error>{t(formState.errors.policy[0])}</FormHelperText>}
          {formState.wrongUserName && <FormHelperText error>{t("term_error")}</FormHelperText>}
        </div>
      </div>
      <Button
        className={clsx(classes.submitButton, appTheme.buttonCreate)}
        disabled={!formState.isValid || isLoading}
        size="large"
        type="submit"
        variant="contained"
      >
        {isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
        {t("create_account")}
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
