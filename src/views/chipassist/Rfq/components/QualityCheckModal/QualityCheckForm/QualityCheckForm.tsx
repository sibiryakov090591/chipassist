import React, { useState, useEffect, useMemo } from "react";
import { batch } from "react-redux";
import {
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  Link,
  FormControlLabel,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { qualityCheckModalClose, sendQualityCheck } from "@src/store/rfq/rfqActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { authSignup, defaultRegisterData } from "@src/store/authentication/authActions";
import validate from "validate.js";
import MenuItem from "@material-ui/core/MenuItem";
import {
  progressModalOpen,
  progressModalSetPartNumber,
  changeMisc,
  saveRequestToLocalStorage,
} from "@src/store/progressModal/progressModalActions";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import InputPhone from "@src/components/InputPhone/InputPhone";
import { clsx } from "clsx";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import {
  newCompanyAddress,
  saveProfileInfo,
  updateCompanyAddress,
  updateProfileInfoThunk,
} from "@src/store/profile/profileActions";
import { useStyles } from "./styles";

interface Props {
  onCloseModalHandler?: () => void;
  isExample?: boolean;
  isAuth?: boolean;
}

interface SellerMessageItemInterface {
  message: string;
  quantity: number;
  price: number;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  inn: string;
  company_name: string;
  // company_type: string;
  // company_other_type: string;
  policy_confirm: boolean;
  receive_updates_confirm: boolean;
}

interface SellerMessageItemTouched {
  message?: boolean;
  quantity?: boolean;
  price?: boolean;
  country?: boolean;
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  inn?: boolean;
  company_name?: boolean;
  company_type?: boolean;
  company_other_type?: boolean;
  policy_confirm?: boolean;
  receive_updates_confirm?: boolean;
}

interface SellerMessageItemErrors {
  message?: string[];
  quantity?: string[];
  price?: string[];
  country?: string[];
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  inn?: string[];
  company_name?: string[];
  company_type?: string[];
  company_other_type?: string[];
  policy_confirm?: string[];
  receive_updates_confirm?: string[];
  [key: string]: string[];
}

export interface SellerMessageLocalStorageItem {
  partNumber: string;
  sellerId: string;
  message: string;
  quantity: number;
  price: number;
}

interface FormState {
  isValid: boolean;
  values: SellerMessageItemInterface;
  touched: SellerMessageItemTouched;
  errors: SellerMessageItemErrors;
}

const QualityCheckForm: React.FC<Props> = ({ onCloseModalHandler, isExample, isAuth }) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("rfq");
  const isICSearch = constants.id === ID_ICSEARCH;

  const { open, partNumber, sellerId, sellerName, stockrecordId, isSending } = useAppSelector(
    (state) => state.rfq.qualityCheckModal,
  );
  let isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  isAuthenticated = isExample ? isAuth : isAuthenticated;
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const countries = useAppSelector((state) => state.checkout.countries);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);

  const defaultState = (profile?: any): FormState => ({
    isValid: false,
    values: {
      quantity: 1,
      price: null,
      message: t("quality_check_message"),
      country:
        (profile?.defaultBillingAddress?.country &&
          countries?.find((c) => c.url.includes(profile?.defaultBillingAddress?.country?.split("/api/")[1]))?.url) ||
        (geolocation?.country_code_iso3 &&
          countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
        defaultCountry.url,
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      inn: profile?.defaultBillingAddress?.inn || "",
      company_name: profile?.defaultBillingAddress?.company_name || "",
      // company_type: "Distributor",
      // company_other_type: "",
      policy_confirm: false,
      receive_updates_confirm: false,
    },
    touched: {},
    errors: {},
  });

  const [phoneValue, setPhoneValue] = useState("");
  const [formState, setFormState] = useState<FormState>(defaultState());
  const [isLoading, setIsLoading] = useState(false);
  const debouncedState = useDebounce(formState, 300);

  useEffect(() => {
    const formErrors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  const schema = useMemo(() => {
    let sch: any = {
      firstName: formSchema.firstName,
      lastName: formSchema.lastName,
      company_name: formSchema.companyName,
      message: {
        presence: { allowEmpty: false, message: `^${t("form_labels.message")} ${t("column.required")}` },
      },
    };
    if (!isAuthenticated) {
      sch = {
        ...sch,
        email: formSchema.email,
        policy_confirm: formSchema.policyConfirm,
      };
    }
    return sch;
  }, [isAuthenticated]);

  useEffect(() => {
    if (profileInfo) {
      setFormState((prevState) => defaultState({ ...prevState.values, ...profileInfo }));
      setPhoneValue(profileInfo.defaultBillingAddress.phone_number_str);
    }
  }, [profileInfo]);

  useEffect(() => {
    if (open) {
      setFormState((prevState) => defaultState({ ...prevState.values, ...profileInfo }));
    } else if (!isAuthenticated) {
      localStorage.setItem(
        "seller_message_form_register_data",
        JSON.stringify({
          firstName: formState.values.firstName,
          lastName: formState.values.lastName,
          email: formState.values.email,
          company_name: formState.values.company_name,
          // company_type: formState.values.company_type,
          // company_other_type: formState.values.company_other_type,
          phoneValue,
        }),
      );
    }
  }, [open]);

  useEffect(() => {
    if (partNumber) {
      const registerData =
        localStorage.getItem("seller_message_form_register_data") &&
        JSON.parse(localStorage.getItem("seller_message_form_register_data"));
      if (!isAuthenticated && registerData) setPhoneValue(registerData.phoneValue);
      setFormState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          ...(!isAuthenticated && registerData && { firstName: registerData.firstName }),
          ...(!isAuthenticated && registerData && { lastName: registerData.lastName }),
          ...(!isAuthenticated && registerData && { email: registerData.email }),
          ...(!isAuthenticated && registerData && { company_name: registerData.company_name }),
          // ...(!isAuthenticated && registerData && { company_type: registerData.company_type }),
          // ...(!isAuthenticated && registerData && { company_other_type: registerData.company_other_type }),
        },
        touched: {
          ...prevState.touched,
          ...(!isAuthenticated && registerData?.firstName && { firstName: true }),
          ...(!isAuthenticated && registerData?.lastName && { lastName: true }),
          ...(!isAuthenticated && registerData?.email && { email: true }),
        },
      }));
    }
  }, [partNumber]);

  useEffect(() => {
    if (!isAuthenticated) {
      const country =
        (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
        defaultCountry;

      setFormState((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            country: country.url,
          },
        };
      });
    }
  }, [geolocation, countries, isAuthenticated]);

  const onBlurHandler = (name: string) => () => {
    return setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = e.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    if (type === "checkbox") {
      return setFormState((prevState) => ({
        ...prevState,
        values: { ...prevState.values, [name]: checked },
        touched: {
          ...prevState.touched,
          [name]: true,
        },
        errors,
      }));
    }

    if (isAuthenticated && !isExample && Object.keys(profileInfo).includes(name)) {
      const updatedProfileInfo = { ...profileInfo, [name]: value };
      dispatch(saveProfileInfo(updatedProfileInfo));
    }

    return setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: name === "email" ? value?.replace(/ /g, "") : value },
      touched: {
        ...prevState.touched,
        [name]: false,
      },
      errors,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        part_number: partNumber,
        stockrecord: stockrecordId,
        sellerId,
        sellerName,
        comment: formState.values.message,
        user: isAuthenticated ? profileInfo?.email : formState.values.email,
        wasAuthenticated: isAuthenticated,
      };

      dispatch(progressModalSetPartNumber(partNumber, "qualityCheck"));
      // dispatch(changeMisc("sellerMessage", formState.values, formState.values.email));

      if (isAuthenticated) {
        setIsLoading(true);
        if (profileInfo?.defaultBillingAddress?.id) {
          await dispatch(
            updateCompanyAddress(profileInfo?.defaultBillingAddress?.id, {
              ...profileInfo?.defaultBillingAddress,
              first_name: formState.values.firstName,
              last_name: formState.values.lastName,
              company_name: formState.values.company_name,
              phone_number_str: phoneValue ? `+${phoneValue.replace(/\+/g, "")}` : null,
              country: formState.values.country ? formState.values.country : null,
              line1: profileInfo?.defaultBillingAddress?.line1 || "-",
            }),
          );
        } else
          await dispatch(
            newCompanyAddress({
              first_name: formState.values.firstName,
              last_name: formState.values.lastName,
              company_name: formState.values.company_name,
              phone_number_str: phoneValue ? `+${phoneValue.replace(/\+/g, "")}` : null,
              country: formState.values.country ? formState.values.country : null,
              line1: profileInfo?.defaultBillingAddress?.line1 || "-",
            }),
          );
        await dispatch(updateProfileInfoThunk());

        dispatch(sendQualityCheck(data))
          .then(() => {
            if (onCloseModalHandler) dispatch(qualityCheckModalClose());
            setFormState(defaultState());
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        saveRequestToLocalStorage(data, data.part_number, "qualityCheck");
        dispatch(changeMisc("not_activated_request", { ...data, requestType: "qualityCheck" }, formState.values.email));

        const country =
          countries?.find((c) => c.url === formState.values.country) ||
          (constants?.id !== ID_ICSEARCH &&
            countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
          defaultCountry;
        // const company_name =
        //   formState.values.email.match(/@(.*)\./g) && formState.values.email.match(/@(.*)\./g)[0].replace(/[@.]/g, "");

        let registerData: any = {
          ...defaultRegisterData,
          email: formState.values.email,
          first_name: formState.values.firstName,
          last_name: formState.values.lastName,
          phone_number_str: phoneValue ? `+${phoneValue}` : null,
          company_name: formState.values.company_name,
          // company_variant:
          //   formState.values.company_type === "Other"
          //     ? formState.values.company_other_type
          //     : formState.values.company_type,
          policy_confirm: formState.values.policy_confirm,
          receive_updates_confirm: formState.values.receive_updates_confirm,
          country: country?.iso_3166_1_a3,
        };

        registerData = Object.fromEntries(
          Object.entries(registerData)
            .map((i: any) => {
              if (typeof i[1] === "boolean" || i[1]) return i;
              return false;
            })
            .filter((i: any) => !!i),
        );

        dispatch(authSignup(registerData, { subj: "qualityCheck" }))
          .then(() => {
            batch(() => {
              localStorage.removeItem("seller_message_form_register_data");
              localStorage.setItem("registered_email", formState.values.email);
              if (onCloseModalHandler) dispatch(qualityCheckModalClose());
              setFormState(defaultState());
              dispatch(progressModalOpen());
            });
          })
          .finally(() => setIsLoading(false));
      }
    }
    return false;
  };

  const errorProps = (name: keyof SellerMessageItemInterface) => {
    if (formState.touched[name] && formState.errors[name]) {
      return { error: true, helperText: formState.errors[name][0] };
    }
    return false;
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  return (
    <form className={classes.root} autoComplete="on" onSubmit={handleSubmit}>
      <div className={classes.formRow}>
        <TextField
          style={{ width: "100%" }}
          name="message"
          label={`${t("column.comment")} *`}
          multiline
          rows={isAuthenticated ? 4 : 2}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={formState.values.message || ""}
          onChange={handleChange}
          onBlur={onBlurHandler("message")}
          placeholder={t("form_labels.message")}
          {...errorProps("message")}
        />
      </div>
      {
        <>
          <div className={classes.formRow}>
            <TextField
              style={{ width: "100%" }}
              name="firstName"
              label={`${t("form_labels.first_name")} *`}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={formState.values.firstName}
              onBlur={onBlurHandler("firstName")}
              onChange={handleChange}
              {...errorProps("firstName")}
            />
            <TextField
              style={{ width: "100%" }}
              name="lastName"
              label={`${t("form_labels.last_name")} *`}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={formState.values.lastName}
              onBlur={onBlurHandler("lastName")}
              onChange={handleChange}
              {...errorProps("lastName")}
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              style={{ width: "100%" }}
              name="email"
              label={`${t(
                constants.activateCorporateEmailValidation ? "form_labels.corp_email" : "form_labels.email",
              )} *`}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={formState.values.email}
              onBlur={onBlurHandler("email")}
              onChange={handleChange}
              disabled={isAuthenticated}
              {...errorProps("email")}
            />
            <TextField
              style={{ width: "100%" }}
              name="company_name"
              label={`${t("form_labels.company_name")} *`}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={formState.values.company_name}
              onBlur={onBlurHandler("company_name")}
              onChange={handleChange}
              {...errorProps("company_name")}
            />
          </div>
          <div className={classes.formRow}>
            {/* <TextField */}
            {/*  style={{ textAlign: "start", width: "100%" }} */}
            {/*  name="company_type" */}
            {/*  label={`${t("column.company_type")} *`} */}
            {/*  variant="outlined" */}
            {/*  size="small" */}
            {/*  InputLabelProps={{ */}
            {/*    shrink: true, */}
            {/*  }} */}
            {/*  value={formState.values.company_type} */}
            {/*  select */}
            {/*  onChange={handleChange} */}
            {/* > */}
            {/*  <MenuItem value="Distributor">{t("column.distributor")}</MenuItem> */}
            {/*  <MenuItem value="Industrial manufacturer">{t("column.manufacturer")}</MenuItem> */}
            {/*  <MenuItem value="Design organization">{t("column.design")}</MenuItem> */}
            {/*  <MenuItem value="Supply chain services provider">{t("column.provider")}</MenuItem> */}
            {/*  <MenuItem value="Other">{t("column.other")}</MenuItem> */}
            {/* </TextField> */}
            <div className={classes.phone}>
              <InputPhone label={t("column.phone")} value={phoneValue} onChange={onChangePhoneHandler} small />
            </div>
            {isICSearch ? (
              <TextField
                variant="outlined"
                name="inn"
                size="small"
                label={`ИНН компании *`}
                value={formState.values.inn}
                onBlur={onBlurHandler("inn")}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isAuthenticated && !!profileInfo?.defaultBillingAddress?.inn}
                style={{ textAlign: "start", width: "100%" }}
                {...errorProps("inn")}
              ></TextField>
            ) : (
              <TextField
                variant="outlined"
                name="country"
                size="small"
                label={`${t("form_labels.delivery_to")} *`}
                value={formState.values.country}
                onBlur={onBlurHandler("country")}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                select
                style={{ textAlign: "start", width: "100%" }}
                {...errorProps("country")}
              >
                {countries?.map((i: Record<string, any>) => (
                  <MenuItem className={appTheme.selectMenuItem} key={i.url} value={i.url}>
                    {i.printable_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </div>
          {/* {formState.values.company_type === "Other" && ( */}
          {/*  <div className={classes.formRow}> */}
          {/*    <TextField */}
          {/*      style={{ width: "100%" }} */}
          {/*      name="company_other_type" */}
          {/*      label={`${t("column.company_other_type")} *`} */}
          {/*      variant="outlined" */}
          {/*      size="small" */}
          {/*      InputLabelProps={{ */}
          {/*        shrink: true, */}
          {/*      }} */}
          {/*      value={formState.values.company_other_type} */}
          {/*      onChange={handleChange} */}
          {/*      onBlur={onBlurHandler("company_other_type")} */}
          {/*      {...errorProps("company_other_type")} */}
          {/*    /> */}
          {/*  </div> */}
          {/* )} */}
          {!isAuthenticated && (
            <Box display="flex" flexDirection="column" ml={2} mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="receive_updates_confirm"
                    className={appTheme.checkbox}
                    checked={formState.values.receive_updates_confirm || false}
                    onChange={handleChange}
                  />
                }
                label={<>{t("feedback.form.receive_updates_confirm")}</>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="policy_confirm"
                    className={appTheme.checkbox}
                    checked={formState.values.policy_confirm}
                    onChange={handleChange}
                  />
                }
                label={
                  <>
                    {t("feedback.form.policy_agree")}
                    <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank">
                      {t("feedback.form.terms_of_services")}
                    </Link>
                    {t("feedback.form.and")}
                    <Link className={appTheme.hyperlink} href={"/privacy_policy"} target="_blank">
                      {t("feedback.form.privacy_policy")}
                    </Link>
                    <span>&nbsp;*</span>
                  </>
                }
              />
              {formState.touched?.policy_confirm &&
                !!formState.errors?.policy_confirm &&
                formState.errors.policy_confirm[0] && (
                  <FormHelperText error>{formState.errors.policy_confirm[0]}</FormHelperText>
                )}
            </Box>
          )}
        </>
      }

      <div className={clsx(commonClasses.actionsRow, classes.buttons)}>
        {onCloseModalHandler && (
          <Button
            variant="contained"
            type="reset"
            className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
            onClick={onCloseModalHandler}
          >
            {t("common.close")}
          </Button>
        )}

        <Button
          variant="contained"
          className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
          type="submit"
          disabled={isSending || isLoading}
        >
          {(isSending || isLoading) && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
          {isSending || isLoading ? t("seller_message.sending") : t("seller_message.send")}
        </Button>
      </div>
    </form>
  );
};

export default QualityCheckForm;
