import React, { useState, useEffect, useMemo } from "react";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Link,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { authFail, authSignup } from "@src/store/authentication/authActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { updatePrevEmail } from "@src/store/profile/profileActions";
import MenuItem from "@material-ui/core/MenuItem";
import SuccessModal from "@src/views/chipassist/HomeRestricted/SuccessModal/SuccessModal";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import { useStyles } from "./styles";

interface FormStateValues {
  email?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  inn?: string;
  policy_confirm?: boolean;
  receive_updates_confirm?: boolean;
}

interface FormStateErrors {
  email?: string[];
  first_name?: string[];
  last_name?: string[];
  country?: string[];
  inn?: string[];
  policy_confirm?: string[];
  receive_updates_confirm?: string[];
  [key: string]: string[];
}

interface FormStateTouched {
  email?: boolean;
  first_name?: boolean;
  last_name?: boolean;
  country?: boolean;
  inn?: boolean;
  policy_confirm?: boolean;
  receive_updates_confirm?: boolean;
  [key: string]: boolean;
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  wrongUserName: boolean;
}

const RegisterForm = (props: { className: string; isExample?: boolean; [x: string]: any }) => {
  const { className, isExample, ...rest } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch: any = useAppDispatch();
  const { t } = useI18n("register");
  // const navigate = useNavigate();
  const isIcSearch = constants.id === ID_ICSEARCH;

  const isLoading = useAppSelector((state) => state.auth.loading);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const countries = useAppSelector((state) => state.checkout.countries);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    wrongUserName: false,
  });
  const debouncedState = useDebounce(formState, 300);

  const schema = useMemo(() => {
    return {
      email: formSchema.email,
      first_name: formSchema.firstName,
      last_name: formSchema.lastName,
      ...(!isIcSearch && { policy_confirm: formSchema.policyConfirm }),
      inn: formSchema.inn,
      policy_confirm: formSchema.policyConfirm,
    };
  }, []);

  useEffect(() => {
    const country =
      (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
      defaultCountry;
    if (country) {
      setFormState((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            country: country.url || "",
          },
        };
      });
    }
  }, [geolocation, countries]);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
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
    // TODO: `event.persist()` is no longer needed since React 17.0
    event.persist();
    const { name, type, value, checked } = event.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    setFormState((prevState) => {
      const nextState = {
        ...prevState,
        values: {
          ...prevState.values,
          [name]:
            type === "checkbox"
              ? checked
              : name === "email"
              ? value?.replace(/ /g, "")
              : name === "inn"
              ? value?.replace(/\D/g, "")
              : value,
        },
        touched: {
          ...prevState.touched,
          [name]: type === "checkbox",
        },
        errors,
      };

      if (name === "email") {
        nextState.wrongUserName = prevState.wrongUserName && value === prevState.values.email;
      }

      return nextState;
    });
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
      const data = {
        ...formState.values,
        country:
          countries?.find((c) => c.url === formState.values.country)?.iso_3166_1_a3 ||
          (constants?.id !== ID_ICSEARCH &&
            countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.iso_3166_1_a3) ||
          defaultCountry.iso_3166_1_a3,
      };
      return dispatch(authSignup(data))
        .then(() => {
          localStorage.setItem("registered_email", formState.values.email);
          if (!localStorage.getItem("prev_user_email")) dispatch(updatePrevEmail(formState.values.email));
          setSuccessModalOpen(true);
        })
        .catch((err: any, response: any) => {
          console.log("authFail", err, response, err.error);
          dispatch(authFail(err));
          setFormState((prevState) => ({
            ...prevState,
            wrongUserName: true,
          }));
        });
    }

    return false;
  };

  const hasError = (field: keyof FormStateTouched) => !!(formState.touched[field] && formState.errors[field]);

  const onCloseModal = () => {
    setSuccessModalOpen(false);
    // navigate(localStorage.getItem("previousLocation") || "/");
  };

  return (
    <>
      <form {...rest} className={clsx(classes.root, className)} onSubmit={handleSubmit}>
        <div className={classes.fields}>
          <TextField
            error={hasError("first_name")}
            fullWidth
            helperText={hasError("first_name") ? t(formState.errors.first_name[0]) : null}
            label={`${t("form_labels.first_name")} *`}
            name="first_name"
            onChange={handleChange}
            onBlur={onBlurHandler("first_name")}
            value={formState.values.first_name || ""}
            variant="outlined"
          />
          <TextField
            error={hasError("last_name")}
            fullWidth
            helperText={hasError("last_name") ? t(formState.errors.last_name[0]) : null}
            label={`${t("form_labels.last_name")} *`}
            name="last_name"
            onChange={handleChange}
            onBlur={onBlurHandler("last_name")}
            value={formState.values.last_name || ""}
            variant="outlined"
          />
          <TextField
            error={hasError("email")}
            fullWidth
            helperText={hasError("email") ? t(formState.errors.email[0]) : null}
            label={`${t(
              constants.activateCorporateEmailValidation ? "form_labels.corp_email" : "form_labels.email",
            )} *`}
            name="email"
            onChange={handleChange}
            onBlur={onBlurHandler("email")}
            value={formState.values.email || ""}
            variant="outlined"
          />
          {isIcSearch ? (
            <TextField
              fullWidth
              variant="outlined"
              name="inn"
              label={"ИНН компании*"}
              value={formState.values.inn || ""}
              error={hasError("inn")}
              helperText={hasError("inn") ? t(formState.errors.inn[0]) : null}
              onChange={handleChange}
              onBlur={onBlurHandler("inn")}
              style={{ textAlign: "start" }}
            ></TextField>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              name="country"
              label={t("form_labels.country")}
              value={formState.values.country || ""}
              onChange={handleChange}
              onBlur={onBlurHandler("country")}
              select
              style={{ textAlign: "start" }}
            >
              {countries.map((item: Record<string, any>) => (
                <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                  {item.printable_name}
                </MenuItem>
              ))}
            </TextField>
          )}

          <div>
            <>
              {!isIcSearch && (
                <div className={classes.policy}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="receive_updates_confirm"
                        className={appTheme.checkbox}
                        checked={formState.values.receive_updates_confirm || false}
                        onChange={handleChange}
                      />
                    }
                    label={t("feedback.form.receive_updates_confirm")}
                  />
                </div>
              )}

              <div className={classes.policy}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="policy_confirm"
                      className={appTheme.checkbox}
                      checked={formState.values.policy_confirm || false}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <>
                      {t("feedback.form.policy_agree")}
                      {!isIcSearch && (
                        <>
                          <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank">
                            {t("feedback.form.terms_of_services")}
                          </Link>
                          {t("feedback.form.and")}
                        </>
                      )}
                      <Link className={appTheme.hyperlink} href={"/privacy_policy"} target="_blank">
                        {t("feedback.form.privacy_policy")}
                      </Link>
                      <span>&nbsp;*</span>
                    </>
                  }
                />
              </div>
            </>
            {hasError("policy_confirm") && (
              <FormHelperText error>{t(formState.errors.policy_confirm[0])}</FormHelperText>
            )}
            {formState.wrongUserName && <FormHelperText error>{t("term_error")}</FormHelperText>}
          </div>
        </div>
        <Button
          className={clsx(classes.submitButton, appTheme.buttonCreate)}
          disabled={isLoading}
          size="large"
          type="submit"
          variant="contained"
        >
          {isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
          {t("create_account")}
        </Button>
      </form>

      {successModalOpen && <SuccessModal onCloseModal={onCloseModal} />}
    </>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
