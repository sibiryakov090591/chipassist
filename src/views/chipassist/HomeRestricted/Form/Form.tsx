import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Checkbox,
  Link,
} from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import clsx from "clsx";
import { batch } from "react-redux";
import validate from "validate.js";
import useAppTheme from "@src/theme/useAppTheme";
import InputPhone from "@src/components/InputPhone/InputPhone";
import MenuItem from "@material-ui/core/MenuItem";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { updatePrevEmail } from "@src/store/profile/profileActions";
import { authSignup } from "@src/store/authentication/authActions";
import { progressModalOpen } from "@src/store/progressModal/progressModalActions";
import { useNavigate } from "react-router-dom";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import { useStyles } from "./styles";

interface FormStateValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  city?: string;
  inn?: string;
  website?: string;
  address?: string;
  country?: string;
  business?: string;
  companyVariant?: string;
  receiveUpdatesConfirm?: boolean;
  resellerConfirm?: boolean;
  termsConfirm?: boolean;
  policyConfirm?: boolean;
}

interface FormStateTouched {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  company?: boolean;
  city?: boolean;
  inn?: boolean;
  website?: boolean;
  address?: boolean;
  country?: boolean;
  business?: boolean;
  [key: string]: boolean;
}

interface FormStateErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  company?: string[];
  city?: string[];
  inn?: string[];
  website?: string[];
  address?: string[];
  country?: string[];
  business?: string[];
  [key: string]: string[];
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  registerError: string | null;
}

const FormDataState: FormState = {
  isValid: false,
  values: {
    companyVariant: "end_user",
    receiveUpdatesConfirm: false,
    resellerConfirm: false,
    termsConfirm: false,
    policyConfirm: false,
  },
  touched: {},
  errors: {},
  registerError: null,
};

interface Props {
  showSuccessModal: () => void;
}

const Form: React.FC<Props> = ({ showSuccessModal }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("feedback");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const countries = useAppSelector((state) => state.checkout.countries);

  const [formState, setFormState] = useState<FormState>(FormDataState);
  const debouncedState = useDebounce(formState, 300);
  const [phoneValue, setPhoneValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(constants.extendedRegistration);

  const icSearch = constants.id === ID_ICSEARCH;

  useEffect(() => {
    const country =
      (!icSearch && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) || defaultCountry;
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

    if (constants.extendedRegistration) {
      const { resellerConfirm, termsConfirm, policyConfirm, companyVariant } = formState.values;
      if (termsConfirm && policyConfirm) {
        // eslint-disable-next-line no-unused-expressions
        companyVariant === "end_user"
          ? setIsDisabled(false)
          : resellerConfirm
          ? setIsDisabled(false)
          : setIsDisabled(true);
      } else {
        setIsDisabled(true);
      }
    }
  }, [debouncedState.values]);

  const schema = React.useMemo(() => {
    const res: any = {
      email: formSchema.email,
      firstName: formSchema.firstName,
      lastName: formSchema.lastName,
      company: formSchema.companyName,
      address: formSchema.address,
      inn: formSchema.inn,
    };

    if (constants.extendedRegistration && formState.values.companyVariant === "end_user") {
      res.business = {
        presence: { allowEmpty: false, message: `^${t("form.describe_title")}` },
      };
    }
    return res;
  }, [formState.values.companyVariant]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { name, type, value, checked } = event.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    setFormState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [name]: type === "checkbox" ? checked : name === "email" ? value?.replace(/ /g, "") : value,
        },
        touched: {
          ...prevState.touched,
          [name]: type === "checkbox",
        },
        errors,
      };
    });
  };

  const onBlurHandler = (name: string) => () => {
    return setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.isValid) return false;
    const errors = validate(formState.values, schema);
    if (errors) {
      return setFormState((prevState) => ({
        ...prevState,
        touched: Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        errors: errors || {},
      }));
    }

    setIsLoading(true);
    const {
      email,
      firstName,
      lastName,
      company,
      inn,
      address,
      country,
      website,
      companyVariant,
      policyConfirm,
      termsConfirm,
      resellerConfirm,
      business,
      receiveUpdatesConfirm,
      city,
    } = formState.values;

    const countryCode =
      countries?.find((c) => c.url === country)?.iso_3166_1_a3 ||
      (constants?.id !== ID_ICSEARCH && geolocation?.country_code_iso3) ||
      defaultCountry.iso_3166_1_a3;

    dispatch(
      authSignup({
        email,
        first_name: firstName,
        last_name: lastName,
        company_name: company,
        inn,
        phone_number_str: phoneValue ? `+${phoneValue.replace(/\+/g, "")}` : "-",
        line1: address,
        line2: website,
        country: countryCode,
        company_variant: companyVariant,
        policy_confirm: policyConfirm,
        conditions_confirm: termsConfirm,
        reseller_terms_confirm: resellerConfirm,
        field_of_business: business,
        receive_updates_confirm: receiveUpdatesConfirm,
        line4: city,
      }),
    ).then(() => {
      localStorage.setItem("registered_email", email);
      batch(() => {
        if (!localStorage.getItem("prev_user_email")) dispatch(updatePrevEmail(email));
        setIsLoading(false);
        setFormState((prevState) => {
          return {
            ...prevState,
            values: {
              ...prevState.values,
              ...FormDataState.values,
              address: "",
              email: "",
              firstName: "",
              lastName: "",
              website: "",
              company: "",
              inn: "",
              city: "",
            },
            touched: {},
            errors: {},
          };
        });
        setPhoneValue("");
      });
      if (localStorage.getItem("Quick_RFQ")) {
        dispatch(progressModalOpen());
        navigate("/");
      } else {
        showSuccessModal();
      }
    });
    return false;
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  const errorProps = (name: keyof FormStateTouched) => {
    if (formState.touched[name] && formState.errors[name]) {
      return { error: true, helperText: formState.errors[name][0] };
    }
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item sm={6} xs={12} className={classes.gridItem}>
          <TextField
            fullWidth
            label={`${t("form_labels.first_name")} *`}
            name="firstName"
            variant="outlined"
            onChange={handleChange}
            onBlur={onBlurHandler("firstName")}
            value={formState.values.firstName || ""}
            {...errorProps("firstName")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={clsx(classes.gridItem, classes.gridItemRightColumn)}>
          <TextField
            fullWidth
            label={`${t("form_labels.last_name")} *`}
            name="lastName"
            variant="outlined"
            onChange={handleChange}
            onBlur={onBlurHandler("lastName")}
            value={formState.values.lastName || ""}
            {...errorProps("lastName")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridItem}>
          <TextField
            fullWidth
            label={`${t(
              constants.activateCorporateEmailValidation ? "form_labels.corp_email" : "form_labels.email",
            )} *`}
            name="email"
            variant="outlined"
            onChange={handleChange}
            onBlur={onBlurHandler("email")}
            value={formState.values.email || ""}
            {...errorProps("email")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={clsx(classes.gridItem, classes.gridItemRightColumn)}>
          <div className={classes.phone}>
            <InputPhone value={phoneValue} onChange={onChangePhoneHandler} />
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridItem}>
          <TextField
            fullWidth
            label={`${t("form_labels.company_name")} *`}
            name="company"
            variant="outlined"
            onChange={handleChange}
            onBlur={onBlurHandler("company")}
            value={formState.values.company || ""}
            {...errorProps("company")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={clsx(classes.gridItem, classes.gridItemRightColumn)}>
          <TextField
            fullWidth
            label={t("form_labels.website")}
            name="website"
            variant="outlined"
            onChange={handleChange}
            onBlur={onBlurHandler("website")}
            value={formState.values.website || ""}
            {...errorProps("website")}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridItem}>
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
            {...errorProps("country")}
          >
            {countries.map((item: Record<string, any>) => (
              <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                {item.printable_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={6} xs={12} className={clsx(classes.gridItem, classes.gridItemRightColumn)}>
          {icSearch ? (
            <TextField
              fullWidth
              label={`${t("form_labels.inn")} *`}
              name="inn"
              variant="outlined"
              onChange={handleChange}
              onBlur={onBlurHandler("inn")}
              value={formState.values.inn || ""}
              {...errorProps("inn")}
            />
          ) : (
            <TextField
              fullWidth
              label={t("form_labels.city")}
              name="city"
              variant="outlined"
              onChange={handleChange}
              onBlur={onBlurHandler("city")}
              value={formState.values.city || ""}
              {...errorProps("city")}
            />
          )}
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TextField
            fullWidth
            label={`${t("form_labels.address")} *`}
            name="address"
            variant="outlined"
            multiline
            rows={6}
            onChange={handleChange}
            onBlur={onBlurHandler("address")}
            value={formState.values.address || ""}
            {...errorProps("address")}
          />
        </Grid>
      </Grid>
      {constants.extendedRegistration && (
        <>
          <Box style={{ textAlign: "start" }} mt={3} mb={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{t("form.end_user_title")}</FormLabel>
              <RadioGroup
                row
                name="companyVariant"
                value={formState.values.companyVariant || "end_user"}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="end_user"
                  control={<Radio className={appTheme.radio} color="primary" />}
                  label={t("form.end_user")}
                />
                <FormControlLabel
                  value="re_seller"
                  control={<Radio className={appTheme.radio} color="primary" />}
                  label={t("form.re_seller")}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {formState.values.companyVariant === "end_user" && (
            <Grid container spacing={3} style={{ marginBottom: 10 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={`${t("form.describe_title")} *`}
                  name="business"
                  variant="outlined"
                  multiline
                  rows={6}
                  onChange={handleChange}
                  onBlur={onBlurHandler("business")}
                  value={formState.values.business || ""}
                  {...errorProps("business")}
                />
              </Grid>
            </Grid>
          )}
          {formState.values.companyVariant === "re_seller" && (
            <Box className={classes.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="resellerConfirm"
                    className={`${appTheme.checkbox} ${classes.checkbox}`}
                    checked={formState.values.resellerConfirm}
                    onChange={handleChange}
                  />
                }
                label={<>{t("form.reseller_confirm")} *</>}
              />
            </Box>
          )}

          <Box className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsConfirm"
                  className={`${appTheme.checkbox} ${classes.checkbox}`}
                  checked={formState.values.termsConfirm}
                  onChange={handleChange}
                />
              }
              label={<>{t("form.authorized_confirm")} *</>}
            />
          </Box>
          <Box className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  name="policyConfirm"
                  className={appTheme.checkbox}
                  checked={formState.values.policyConfirm}
                  onChange={handleChange}
                />
              }
              label={
                <>
                  {t("form.policy_agree")}
                  <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank">
                    {t("form.terms_of_services")}
                  </Link>
                  {t("form.and")}
                  <Link className={appTheme.hyperlink} href={"/privacy_policy"} target="_blank">
                    {t("form.privacy_policy")}
                  </Link>{" "}
                  *
                </>
              }
            />
          </Box>
          <Box className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  name="receiveUpdatesConfirm"
                  className={appTheme.checkbox}
                  checked={formState.values.receiveUpdatesConfirm}
                  onChange={handleChange}
                />
              }
              label={t("form.receive_mail_confirm", { name: constants.title })}
            />
          </Box>
        </>
      )}
      <div style={{ display: "flex" }}>
        <Button
          className={clsx(classes.submitButton, appTheme.buttonPrimary)}
          size="large"
          disabled={isLoading || (constants.extendedRegistration && isDisabled) || !formState.isValid}
          type="submit"
          color="primary"
          variant="contained"
        >
          {isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
          {t("form.send")}
        </Button>
      </div>
    </form>
  );
};

export default Form;
