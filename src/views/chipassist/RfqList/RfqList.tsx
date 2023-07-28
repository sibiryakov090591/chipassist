import React, { useEffect, useMemo, useState } from "react";
import { Page } from "@src/components";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Link,
  TextField,
} from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import useStyles from "@src/views/chipassist/RfqList/RfqListStyle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import _, { findLastIndex } from "lodash";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useDebounce from "@src/hooks/useDebounce";
import validate from "validate.js";
import formSchema from "@src/utils/formSchema";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import MenuItem from "@material-ui/core/MenuItem";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import {
  changeMisc,
  progressModalOpen,
  progressModalSetPartNumber,
  saveRequestToLocalStorage,
} from "@src/store/progressModal/progressModalActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { authSignup, defaultRegisterData } from "@src/store/authentication/authActions";
import { batch } from "react-redux";
import { clearRfqItem, saveRfqListItems } from "@src/store/rfq/rfqActions";
import PaperPlane from "@src/images/Icons/paper-plane.svg";
import { NavLink } from "react-router-dom";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import { NumberInput } from "@src/components/Inputs";

interface RegInterface {
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  company_type: string;
  company_other_type: string;
  policy_confirm: boolean;
  receive_updates_confirm: boolean;
  comment: string;
}

interface RfqItem {
  isDisabled: boolean;
  index: number;
  MPN: string;
  manufacturer: string;
  quantity: number;
  price: number;
}

interface RfqTouched {
  isDisabled?: string[];
  index?: string[];
  MPN?: string[];
  manufacturer?: string[];
  quantity?: string[];
  price?: string[];
}

interface RfqErrors {
  isDisabled?: string[];
  index?: string[];
  MPN?: string[];
  manufacturer?: string[];
  quantity?: string[];
  price?: string[];
  [key: string]: string[];
}

interface RegTouched {
  comment?: string[];
  country?: string[];
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  company_type?: string[];
  company_other_type?: string[];
  policy_confirm?: string[];
  receive_updates_confirm?: string[];
}

interface RegErrors {
  comment?: string[];
  country?: string[];
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  company_type?: string[];
  company_other_type?: string[];
  policy_confirm?: string[];
  receive_updates_confirm?: string[];
  [key: string]: string[];
}

interface FormState {
  isValid: boolean;
  values: RegInterface;
  touched: RegTouched;
  errors: RegErrors;
}

interface RfqListFormState {
  isValid: boolean;
  values: RfqItem[];
  touched: RfqTouched[];
  errors: RfqErrors[];
}

const defaultState = (): FormState => ({
  isValid: false,
  values: {
    comment: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    company_type: "Distributor",
    company_other_type: "",
    policy_confirm: false,
    receive_updates_confirm: false,
  },
  touched: {},
  errors: {},
});

const defaultRfqListState = (): RfqListFormState => ({
  isValid: false,
  values: [
    {
      index: 1,
      isDisabled: false,
      MPN: "",
      manufacturer: "",
      quantity: null,
      price: 0,
    },
    {
      index: 2,
      isDisabled: true,
      MPN: "",
      manufacturer: "",
      quantity: null,
      price: 0,
    },
    {
      index: 3,
      isDisabled: true,
      MPN: "",
      manufacturer: "",
      quantity: null,
      price: 0,
    },
    {
      index: 4,
      isDisabled: true,
      MPN: "",
      manufacturer: "",
      quantity: null,
      price: 0,
    },
  ],
  touched: [],
  errors: [],
});

export const RfqList = () => {
  const maxRfqRows = 10;
  const { t } = useI18n("rfq");
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const currency = useAppSelector((state) => state.currency.selected);
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [formState, setFormState] = useState<FormState>(defaultState());
  const [rfqListState, setRfqListState] = useState<RfqListFormState>(defaultRfqListState());
  const debouncedState = useDebounce(formState, 300);
  const debouncedRfqState = useDebounce(rfqListState, 300);
  const countries = useAppSelector((state) => state.checkout.countries);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const [billingAddress, setBillingAddress] = useState(null);
  const [needToChange, setNeedToChange] = useState(false);
  const [prevFilledInputIndex, setPrevFilledInputIndex] = useState(0);
  const [phoneValue, setPhoneValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addButtonClickHandler = () => {
    const newRfq: RfqItem = {
      MPN: "",
      index: rfqListState.values.length,
      manufacturer: "",
      quantity: null,
      price: 0,
      isDisabled: true,
    };
    const lastRfq = rfqListState.values[rfqListState.values.length - 1];

    if (lastRfq.MPN !== "" || lastRfq.manufacturer !== "") {
      newRfq.isDisabled = false;
    }
    setRfqListState((prevState) => ({ ...prevState, values: [...prevState.values, newRfq] }));
    return 0;
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (profileInfo) {
      setBillingAddress(profileInfo.addresses?.sort((a, b) => a.id - b.id)[0] || null);
    }
  }, [profileInfo]);

  const rfqSchema = useMemo(() => {
    const sch: any = {
      MPN: {
        presence: { allowEmpty: false, message: `^${t("column.part_number")} ${t("column.required")}` },
      },
      quantity: {
        presence: { allowEmpty: false, message: `^${t("column.qty")} ${t("column.required")}` },
        numericality: {
          greaterThan: 0,
          notGreaterThan: `^${t("column.qty")} ${t("errors.not_greater_than", { count: 0 })}`,
        },
      },
    };

    return sch;
  }, []);

  const schema = useMemo(() => {
    let sch: any = {
      country: {
        presence: { allowEmpty: false, message: `^${t("form_labels.country")} ${t("column.required")}` },
      },
    };
    if (!isAuthenticated) {
      sch = {
        ...sch,
        email: formSchema.email,
        firstName: formSchema.firstName,
        lastName: formSchema.lastName,
        policy_confirm: formSchema.policyConfirm,

        ...(formState.values.company_type === "Other" && {
          company_other_type: {
            presence: { allowEmpty: false, message: `^${t("column.company_other_type")} ${t("column.required")}` },
          },
        }),
      };
    }
    return sch;
  }, [isAuthenticated, formState.values.company_type]);

  useEffect(() => {
    let country: any = null;
    if (billingAddress) country = countries?.find((c) => c.url === billingAddress.country);
    if (!country)
      country =
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
  }, [geolocation, countries, billingAddress]);

  useEffect(() => {
    const formErrors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  useEffect(() => {
    const rfqFormErrors = rfqListState.values.map((elem) => validate(elem, rfqSchema));
    setRfqListState((prevState) => ({
      ...prevState,
      isValid: rfqFormErrors.length === 0,
      errors: rfqFormErrors || [],
    }));
  }, [debouncedRfqState.values]);

  useEffect(() => {
    if (rfqListState.values) {
      const lastFilledIndex = findLastIndex(
        rfqListState.values,
        (element) => element.MPN !== "" || element.quantity !== null,
      );

      if (
        lastFilledIndex >= 0 &&
        rfqListState.values.length > 1 &&
        lastFilledIndex + 1 < rfqListState.values.length &&
        prevFilledInputIndex <= lastFilledIndex
      ) {
        setRfqListState((prevState) => ({
          ...prevState,
          values: [
            ...prevState.values.slice(0, lastFilledIndex + 1),
            { ...prevState.values[lastFilledIndex + 1], isDisabled: false },
            ...prevState.values.slice(lastFilledIndex + 2, prevState.values.length),
          ],
        }));
        setPrevFilledInputIndex(lastFilledIndex);
      } else if (lastFilledIndex < prevFilledInputIndex) {
        setRfqListState((prevState) => ({
          ...prevState,
          values: [
            ...prevState.values.slice(0, lastFilledIndex + 2),
            { ...prevState.values[lastFilledIndex + 2], isDisabled: true },
            ...prevState.values
              .slice(lastFilledIndex + 3, prevState.values.length)
              .map((elem) => ({ ...elem, isDisabled: true })),
          ],
        }));
        setPrevFilledInputIndex(lastFilledIndex);
      }
    }
  }, [needToChange]);

  const onBlurHandler = (name: string) => () => {
    return setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const onRfqBlurHandler = (name: string, index: number) => () => {
    return setRfqListState((prevState) => ({
      ...prevState,
      touched: [
        ...prevState.touched.slice(0, index),
        { ...prevState.touched[index], [name]: true },
        ...prevState.touched.slice(index + 1, prevState.touched.length),
      ],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = e.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    if (type === "checkbox") {
      return setFormState((prevState) => ({
        ...prevState,
        isValid: _.isEmpty(errors),
        values: { ...prevState.values, [name]: checked },
        touched: {
          ...prevState.touched,
          [name]: true,
        },
        errors,
      }));
    }

    return setFormState((prevState) => ({
      ...prevState,
      isValid: _.isEmpty(errors),
      values: { ...prevState.values, [name]: name === "email" ? value?.replace(/ /g, "") : value },
      touched: {
        ...prevState.touched,
        [name]: false,
      },
      errors,
    }));
  };

  const handleRfqListChange = (e: any, index: number) => {
    const { value, name } = e.target;
    const errors = [...rfqListState.errors];
    if (errors[index]) if (errors[index][name]) delete errors[index][name];
    setNeedToChange((prevState) => !prevState);

    const isErrorsOccured = errors.filter((elem) => elem !== undefined && !_.isEmpty(elem));
    return setRfqListState((prevState) => ({
      ...prevState,
      isValid: isErrorsOccured.length === 0,
      values: [
        ...prevState.values.slice(0, index),
        { ...prevState.values[index], [name]: value },
        ...prevState.values.slice(index + 1, prevState.values.length),
      ],
      touched: [
        ...prevState.touched.slice(0, index),
        { ...prevState.touched[index], [name]: false },
        ...prevState.touched.slice(index + 1, prevState.touched.length),
      ],
      errors,
    }));
  };

  const errorProps = (name: keyof RegInterface) => {
    if (formState.touched[name] && formState.errors[name]) {
      return { error: true, helperText: formState.errors[name][0] };
    }
    return false;
  };

  const rfqErrorProps = (name: keyof RfqItem, index: number) => {
    if (rfqListState.touched.length !== 0 && rfqListState.errors.length !== 0) {
      if (rfqListState.touched[index] && rfqListState.errors[index]) {
        if (rfqListState.touched[index][name] && rfqListState.errors[index][name]) {
          return { error: true, helperText: rfqListState.errors[index][name][0] };
        }
      }
    }
    return false;
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  const createDataRfqList = () => {
    return rfqListState.values
      .filter((elem) => elem.MPN !== "" && elem.quantity !== null)
      .map((rfq) => ({
        part_number: rfq.MPN,
        manufacturer: rfq.manufacturer,
        quantity: rfq.quantity,
        price: rfq.price,
      }));
  };

  const checkErrorInRfqList = () => {
    const rfqFormErrors = rfqListState.values.map((elem, index) =>
      index === 0 || elem.MPN !== "" || elem.quantity !== null ? validate(elem, rfqSchema) : undefined,
    );
    if (rfqFormErrors.filter((elem) => elem !== undefined).length !== 0) {
      const firstNotUndefined = rfqFormErrors.indexOf((elem: any) => elem !== undefined);
      setRfqListState((prevState) => ({
        ...prevState,
        isValid: firstNotUndefined === -1,
        touched: rfqFormErrors.map((error) =>
          error !== undefined ? Object.keys(error).reduce((acc, key) => ({ ...acc, [key]: true }), {}) : {},
        ),
        errors: rfqFormErrors || [],
      }));
      return true;
    }

    setRfqListState((prevState) => ({
      ...prevState,
      isValid: true,
      touched: [],
      errors: [],
    }));

    return false;
  };

  const onSendRfqClickHandler = () => {
    if (!isAuthenticated) {
      let isErrorOccurred = false;
      const errors = validate(formState.values, schema);
      console.log(errors);
      if (errors) {
        setFormState((prevState) => ({
          ...prevState,
          isValid: !errors,
          touched: Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
          errors: errors || {},
        }));
        isErrorOccurred = true;
      }

      if (isErrorOccurred || checkErrorInRfqList()) {
        return false;
      }
    }
    if (checkErrorInRfqList()) {
      return false;
    }
    const data = createDataRfqList();

    const country =
      countries?.find((c) => c.url === formState.values.country) ||
      (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
      defaultCountry;
    const phone = !isAuthenticated && phoneValue ? `+${phoneValue}` : billingAddress?.phone_number_str;
    let company_type: string;
    try {
      company_type = !isAuthenticated
        ? formState.values.company_type === "Other"
          ? formState.values.company_other_type
          : formState.values.company_type
        : billingAddress?.notes.match(/company_variant: (.+)/) &&
          billingAddress.notes.match(/company_variant: (.+)/)[0].split("company_variant: ")[1];
    } catch {
      company_type = null;
    }
    const company_name = !isAuthenticated
      ? formState.values.email.match(/@(.*)\./g) && formState.values.email.match(/@(.*)\./g)[0].replace(/[@.]/g, "")
      : billingAddress?.company_name;
    let comment = `Delivery to: ${country?.printable_name};`;
    if (phone) comment += ` Phone: ${phone};`;
    if (company_name) comment += ` Company name: ${company_name[0].toUpperCase()}${company_name.slice(1)};`;
    if (company_type) comment += ` Company type: ${company_type};`;
    if (formState.values.comment) comment += ` ${formState.values.comment};`;

    dispatch(progressModalSetPartNumber(`${data[0].part_number}, ... `, "rfq_list"));

    dispatch(changeMisc("rfq_list", { ...formState.values, comment, rfq_list: data }, formState.values.email));

    setIsLoading(true);
    if (isAuthenticated) {
      dispatch(saveRfqListItems(data))
        .then(() => {
          batch(() => {
            dispatch(clearRfqItem());
            setFormState((prevState) => ({
              ...defaultState(),
              values: {
                ...defaultState().values,
                country: prevState.values.country,
              },
            }));
          });
        })
        .finally(() => setIsLoading(false));
    } else {
      saveRequestToLocalStorage(data, [...data].map((rfq) => `${rfq.part_number}`).toString(), "rfq_list");
      dispatch(
        changeMisc(
          "not_activated_request",
          { ...{ ...formState.values, rfq_list: data }, requestType: "rfq_list" },
          formState.values.email,
        ),
      );

      let registerData = { ...defaultRegisterData };
      registerData.email = formState.values.email;
      registerData.first_name = formState.values.firstName;
      registerData.last_name = formState.values.lastName;
      registerData.phone_number_str = phoneValue ? `+${phoneValue}` : null;
      registerData.company_name = company_name ? `${company_name[0].toUpperCase()}${company_name.slice(1)}` : "";
      registerData.company_variant =
        formState.values.company_type === "Other" ? formState.values.company_other_type : formState.values.company_type;
      registerData.policy_confirm = formState.values.policy_confirm;
      registerData.receive_updates_confirm = formState.values.receive_updates_confirm;
      registerData.country = country?.iso_3166_1_a3;
      registerData = Object.fromEntries(
        Object.entries(registerData)
          .map((i: any) => {
            if (typeof i[1] === "boolean" || i[1]) return i;
            return false;
          })
          .filter((i: any) => !!i),
      );

      dispatch(authSignup(registerData, { subj: "rfq_list" }))
        .then(() => {
          batch(() => {
            localStorage.removeItem("rfq_form_register_data");
            localStorage.setItem("registered_email", formState.values.email);
            dispatch(clearRfqItem());
            setFormState((prevState) => ({
              ...defaultState(),
              values: {
                ...defaultState().values,
                country: prevState.values.country,
              },
            }));
            dispatch(progressModalOpen());
          });
        })
        .finally(() => setIsLoading(false));
    }
    return true;
  };
  return (
    <Page title={"Send group RFQs | ChipAssist"} description={"Send group RFQs to 100+ suppliers with ChipAssist"}>
      <Container maxWidth={"xl"} className={classes.pageContainer}>
        <section className={classes.section} style={isDownMd ? { marginTop: "1rem" } : null}>
          <Container maxWidth={"lg"} className={classes.mainContainer}>
            <Box className={classes.listBox}>
              <h1 className={classes.titleH1}>Enter your quote list</h1>
              {rfqListState.values.map((elem, key) => (
                <Box key={key} className={classes.rfqsBox}>
                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    name={"MPN"}
                    label={"Part Number"}
                    placeholder={"ex. KNP100"}
                    defaultValue={elem.MPN}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.rfqInput}
                    onChange={(event) => handleRfqListChange(event, key)}
                    onBlur={onRfqBlurHandler("MPN", key)}
                    {...(!elem.isDisabled ? { ...rfqErrorProps("MPN", key) } : false)}
                  />

                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    name={"manufacturer"}
                    label={"Manufacturer"}
                    placeholder={"ex. Schneider Electric"}
                    defaultValue={elem.manufacturer}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.rfqInput}
                    onChange={(event) => handleRfqListChange(event, key)}
                  />

                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    name={"quantity"}
                    label={"Quantity"}
                    placeholder={"ex. 100"}
                    defaultValue={elem.quantity}
                    style={!isDownMd ? { width: "20em" } : null}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth={isDownMd}
                    className={classes.rfqInput}
                    onChange={(event) => handleRfqListChange(event, key)}
                    onBlur={onRfqBlurHandler("quantity", key)}
                    {...rfqErrorProps("quantity", key)}
                  />

                  <NumberInput
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    name={"price"}
                    label={"Target Price"}
                    placeholder={"ex. 200"}
                    defaultValue={elem.price}
                    style={!isDownMd ? { width: "20em", marginRight: 0 } : null}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">{currency?.symbol || <span>&#8364;</span>}</InputAdornment>
                      ),
                    }}
                    value={elem.price}
                    onChange={(event: any) => handleRfqListChange(event, key)}
                    decimalScale={4}
                    isAllowedZero={true}
                  />
                </Box>
              ))}
              {rfqListState.values.length !== maxRfqRows && (
                <Button variant={"contained"} className={classes.addButton} onClick={addButtonClickHandler}>
                  + Add new line
                </Button>
              )}
            </Box>
          </Container>
        </section>

        <section className={classes.section}>
          <Container maxWidth={"lg"} className={classes.mainContainer}>
            <Box>
              <h3 className={classes.titleH3}>Add additional details into your request</h3>

              <TextField
                style={{ width: "100%" }}
                name="comment"
                label={t("column.form_comment")}
                multiline
                rows={4}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.values.comment || ""}
                onChange={handleChange}
                onBlur={onBlurHandler("comment")}
                placeholder={t("column.comment_placeholder")}
                {...errorProps("comment")}
              />
            </Box>
          </Container>
        </section>

        {!isAuthenticated && (
          <section className={clsx(classes.section)}>
            <Container maxWidth={"lg"} className={clsx(classes.mainContainer)}>
              <Box className={classes.regContainerStyle}>
                <h2 className={classes.titleH2}>Please provide an information about yourself </h2>
                <p style={{ color: "#456" }}>
                  If you already have an account you can <NavLink to={"/auth/login"}>login here</NavLink>
                </p>
                <Container maxWidth={"lg"}>
                  <Box className={`${classes.regBoxContainer} rfq-modal-form`}>
                    <Box className={classes.formRow}>
                      <TextField
                        name="firstName"
                        label={`${t("form_labels.first_name")} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "100%" }}
                        value={formState.values.firstName}
                        onBlur={onBlurHandler("firstName")}
                        onChange={handleChange}
                        disabled={isAuthenticated}
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
                        disabled={isAuthenticated}
                        {...errorProps("lastName")}
                      />
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
                    </Box>
                    <Box className={classes.formRow}>
                      <PhoneInputWrapper
                        label={t("column.phone")}
                        value={phoneValue}
                        onChange={onChangePhoneHandler}
                        small
                        style={{ margin: isDownMd ? "8px 0" : "13px", height: !isDownMd && "auto" }}
                      />
                      <TextField
                        style={{ textAlign: "start", width: "100%" }}
                        fullWidth
                        name="company_type"
                        label={`${t("column.company_type")} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formState.values.company_type}
                        select
                        onChange={handleChange}
                      >
                        <MenuItem value="Distributor">{t("column.distributor")}</MenuItem>
                        <MenuItem value="Industrial manufacturer">{t("column.manufacturer")}</MenuItem>
                        <MenuItem value="Design organization">{t("column.design")}</MenuItem>
                        <MenuItem value="Supply chain services provider">{t("column.provider")}</MenuItem>
                        <MenuItem value="Other">{t("column.other")}</MenuItem>
                      </TextField>

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

                      {formState.values.company_type === "Other" && (
                        <TextField
                          style={{ width: "100%" }}
                          name="company_other_type"
                          label={`${t("column.company_other_type")} *`}
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formState.values.company_other_type}
                          onChange={handleChange}
                          onBlur={onBlurHandler("company_other_type")}
                          {...errorProps("company_other_type")}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Box display="flex" flexDirection={isDownMd ? "column" : "row"} ml={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="receive_updates_confirm"
                            className={appTheme.checkbox}
                            checked={formState.values.receive_updates_confirm}
                            onChange={handleChange}
                          />
                        }
                        label={<>{t("feedback.form.receive_updates_confirm")}</>}
                      />

                      <Box display="flex" flexDirection="column" ml={2} style={{ marginLeft: 0 }}>
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
                              </Link>{" "}
                              *
                            </>
                          }
                        />
                        {formState.touched?.policy_confirm &&
                          !!formState.errors?.policy_confirm &&
                          formState.errors.policy_confirm[0] && (
                            <FormHelperText error>{formState.errors.policy_confirm[0]}</FormHelperText>
                          )}
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Container>
          </section>
        )}
        <section className={classes.section}>
          <Box className={classes.submitButtonContainer}>
            <Button
              variant={"contained"}
              className={appTheme.buttonCreate}
              onClick={onSendRfqClickHandler}
              disabled={isLoading}
              size={"large"}
            >
              {isLoading && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
              {isLoading ? (
                t("common.sending_2")
              ) : (
                <>
                  <img
                    alt={"Send icon"}
                    src={PaperPlane}
                    width={"35px"}
                    style={{ color: "white", paddingRight: "1em" }}
                  />
                  Send multiple RFQ
                </>
              )}
            </Button>
          </Box>
        </section>
      </Container>
    </Page>
  );
};

export default RfqList;
