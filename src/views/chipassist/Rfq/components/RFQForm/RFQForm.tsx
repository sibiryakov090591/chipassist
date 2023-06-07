import React, { useState, useEffect, useMemo } from "react";
import { batch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { DatePicker } from "@material-ui/pickers";
import {
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  Link,
  FormControlLabel,
  FormHelperText,
  Box,
  InputAdornment,
} from "@material-ui/core";
// import moment from "moment";
// import { orderBy } from "lodash";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import { DATE_FORMAT } from "@src/config";
import { clearRfqItem, rfqModalClose, saveRfqItem } from "@src/store/rfq/rfqActions";
// import { getAllSellers } from "@src/store/sellers/sellersActions";
// import { searchAcReturn } from "@src/store/search/searchActions";
// import { getCurrentDate } from "@src/store/rfq/rfqReducer";
// import BaseFilterDropdown from "@src/views/chipassist/Search/components/BaseFilterDropdown/BaseFilterDropdown";
// import { AutocompleteDropdown } from "@src/components";
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

import { getPrice, isProductAvailable } from "@src/utils/product";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import InputPhone from "@src/components/InputPhone/InputPhone";
import { NumberInput } from "@src/components/Inputs";
import { useStyles } from "./styles";

// interface Distributor {
//   id: number;
//   code: string;
//   name: string;
// }

// function createSelectOptions(items: Array<Distributor>) {
//   if (!items) return [];
//   return items.reduce((res, item) => {
//     res.push({ value: item.id, label: item.name });
//     return res;
//   }, []);
// }

// function returnSelectedItems(items: Distributor[], ids: number[]) {
//   if (!ids) return [];
//   return items.reduce((res, val) => {
//     if (ids.includes(val.id)) res.push(val);
//     return res;
//   }, []);
// }

interface Props {
  onCloseModalHandler?: () => void;
}

interface RfqItemInterface {
  partNumber: string;
  prevPartNumber: string;
  country: string;
  quantity: string;
  price: string;
  // deliveryDate: string;
  // validateDate: string;
  // seller: Array<any>;
  // address: string;
  comment: string;
  email: string;
  firstName: string;
  lastName: string;
  company_type: string;
  company_other_type: string;
  policy_confirm: boolean;
  receive_updates_confirm: boolean;
}

interface RfqItemTouched {
  partNumber?: boolean;
  prevPartNumber?: boolean;
  country?: boolean;
  quantity?: boolean;
  price?: boolean;
  comment?: boolean;
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  company_type?: boolean;
  company_other_type?: boolean;
  policy_confirm?: boolean;
  receive_updates_confirm?: boolean;
}

interface RfqItemErrors {
  partNumber?: string[];
  prevPartNumber?: string[];
  country?: string[];
  quantity?: string[];
  price?: string[];
  comment?: string[];
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  company_type?: string[];
  company_other_type?: string[];
  policy_confirm?: string[];
  receive_updates_confirm?: string[];
  [key: string]: string[];
}

export interface RfqLocalStorageItem {
  part_number: string;
  quantity: string;
  price: string;
  comment: string;
}

interface FormState {
  isValid: boolean;
  values: RfqItemInterface;
  touched: RfqItemTouched;
  errors: RfqItemErrors;
}

const defaultState = (): FormState => ({
  isValid: false,
  values: {
    partNumber: "",
    prevPartNumber: "",
    country: "",
    quantity: "",
    price: "",
    // deliveryDate: getCurrentDate(),
    // validateDate: getCurrentDate(),
    // seller: [],
    // address: "",
    comment: "",
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

const RFQForm: React.FC<Props> = ({ onCloseModalHandler }) => {
  // const history = useHistory();
  // const location = useLocation();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const [phoneValue, setPhoneValue] = useState("");
  const [formState, setFormState] = useState<FormState>(defaultState());
  const debouncedState = useDebounce(formState, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);

  const currency = useAppSelector((state) => state.currency.selected);
  const rfqItem = useAppSelector((state) => state.rfq.rfqItem);
  const rfqModalOpen = useAppSelector((state) => state.rfq.rfqModalOpen);
  const rfqSaving = useAppSelector((state) => state.rfq.rfqSaving);
  // const rfqErrors = useAppSelector((state) => state.rfq.rfqErrors);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  // const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const countries = useAppSelector((state) => state.checkout.countries);
  const utm = useAppSelector((state) => state.common.utm);

  // const all_sellers = [
  //   { id: "All", name: "All" },
  //   ...orderBy(
  //     useAppSelector((state) => state.sellers.items || []),
  //     ["name"],
  //   ),
  // ];

  // const selectedSellers = returnSelectedItems(all_sellers, item.seller);
  const { t } = useI18n("rfq");

  useEffect(() => {
    if (profileInfo) {
      setBillingAddress(profileInfo.addresses?.sort((a, b) => a.id - b.id)[0] || null);
    }
  }, [profileInfo]);

  useEffect(() => {
    const formErrors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch(getAllSellers());
  //   }
  // }, [dispatch]);

  const schema = useMemo(() => {
    let sch: any = {
      partNumber: {
        presence: { allowEmpty: false, message: `^${t("column.part_number")} ${t("column.required")}` },
      },
      quantity: {
        presence: { allowEmpty: false, message: `^${t("column.qty")} ${t("column.required")}` },
      },
      country: {
        presence: { allowEmpty: false, message: `^${t("form_labels.country")} ${t("column.required")}` },
      },
      price: {
        // presence: { allowEmpty: false, message: `^${t("column.price")} ${t("column.required")}` },
        // numericality: {
        //   greaterThan: 0,
        //   notGreaterThan: `^${t("column.price")} ${t("errors.not_greater_than", { count: 0 })}`,
        // },
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
    if (rfqModalOpen) {
      setFormState(defaultState());
    } else if (!isAuthenticated) {
      localStorage.setItem(
        "rfq_form_register_data",
        JSON.stringify({
          firstName: formState.values.firstName,
          lastName: formState.values.lastName,
          email: formState.values.email,
          company_type: formState.values.company_type,
          company_other_type: formState.values.company_other_type,
          phoneValue,
        }),
      );
    }
  }, [rfqModalOpen]);

  useEffect(() => {
    if (rfqItem) {
      const registerData =
        localStorage.getItem("rfq_form_register_data") && JSON.parse(localStorage.getItem("rfq_form_register_data"));
      if (!isAuthenticated && registerData) setPhoneValue(registerData.phoneValue);
      setFormState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          ...rfqItem,
          ...(!isAuthenticated && registerData && { firstName: registerData.firstName }),
          ...(!isAuthenticated && registerData && { lastName: registerData.lastName }),
          ...(!isAuthenticated && registerData && { email: registerData.email }),
          ...(!isAuthenticated && registerData && { company_type: registerData.company_type }),
          ...(!isAuthenticated && registerData && { company_other_type: registerData.company_other_type }),
        },
        touched: {
          ...prevState.touched,
          ...(!isAuthenticated && registerData?.firstName && { firstName: true }),
          ...(!isAuthenticated && registerData?.lastName && { lastName: true }),
          ...(!isAuthenticated && registerData?.email && { email: true }),
        },
      }));
    }
  }, [rfqItem]);

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

  // const errorProps = (name: string): any => {
  //   if (rfqErrors[name] && !!rfqErrors[name].length) {
  //     return { error: true, helperText: rfqErrors[name][0] };
  //   }
  //   return false;
  // };
  //
  // const handleHiddenInputChange = () => {
  //   return true;
  // };

  // const handleDatePickerChange = (name: string, date: moment.Moment) => {
  //   setItem((prevState) => ({
  //     ...prevState,
  //     [name]: date ? date.format("YYYY-MM-DD") : null,
  //   }));
  // };

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

  // const handlePartNumberChange = (val: { label: string; value: string }) => {
  //   if (val) {
  //     if (errors.partNumber) {
  //       const newState = { ...errors };
  //       delete newState.partNumber;
  //       setErrors(newState);
  //     }
  //     setItem((prevState) => ({ ...prevState, partNumber: val.value }));
  //   }
  // };

  // const handleSelectChange = (values: Array<{ label: string; value: number | string }>) => {
  //   let sellers: Array<string | number> = [];
  //   if (values && !!values.length) {
  //     values.forEach((val) => {
  //       sellers.push(val.value);
  //     });
  //   }
  //   if (values?.some((v) => v.value === "All")) {
  //     sellers = [];
  //     const allValue = values.filter((i) => i.value === "All");
  //     allValue.forEach((val) => {
  //       sellers.push(val.value);
  //     });
  //   }
  //   setItem((prevState) => ({ ...prevState, seller: sellers }));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    // const sellers = item.seller.includes("All")
    //   ? all_sellers.map((seller: any) => seller.id).filter((seller: any) => seller !== "All")
    //   : item.seller;

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

    const sr = rfqItem?.stockrecord;
    const srPrice = sr && getPrice(+formState.values.quantity, sr);

    let availableMinPriceCurrency: CurrenciesAllowed = null;
    const availableMinPrice = rfqItem?.product
      ? rfqItem.product.stockrecords &&
        rfqItem.product.stockrecords
          .filter((i) => isProductAvailable(i))
          .reduce((acc, i) => {
            const price = getPrice(+formState.values.quantity, i, false);
            if (!price) return acc;
            if (!acc || +price < acc) {
              availableMinPriceCurrency = i.price_currency;
              return +price;
            }
            return acc;
          }, 0)
      : null;

    const data = {
      part_number: formState.values.prevPartNumber || formState.values.partNumber,
      quantity: formState.values.quantity,
      price:
        formState.values.price ||
        (availableMinPrice ? `${availableMinPrice.toFixed(2)}` : srPrice ? `${srPrice}` : rfqItem?.price || null),
      currency:
        (formState.values.price && currency.code) ||
        (availableMinPrice ? availableMinPriceCurrency : srPrice ? sr.price_currency : rfqItem?.currency || null),
      // delivery_date: moment.utc(item.deliveryDate).format().slice(0, 19),
      // valid_date: moment.utc(item.validateDate).format().slice(0, 19),
      seller: sr ? [{ id: sr.partner, name: sr.partner_name }] : null,
      // address: "address",
      comment,
      query: `origin=${window.location.origin + window.location.pathname}${
        utm
          ? Object.entries(utm).reduce((acc, ent) => {
              return ent[1] ? `${acc}${acc ? "&" : "?"}${ent[0]}=${ent[1]}` : acc;
            }, "")
          : ""
      }`,
    };

    dispatch(progressModalSetPartNumber(formState.values.partNumber, "rfq"));

    console.log("MISC_SAVE:", formState.values);
    dispatch(changeMisc("rfq", formState.values, formState.values.email));

    if (isAuthenticated) {
      dispatch(saveRfqItem(data)).then(() => {
        batch(() => {
          dispatch(clearRfqItem());
          if (onCloseModalHandler) dispatch(rfqModalClose());
          setFormState((prevState) => ({
            ...defaultState(),
            values: {
              ...defaultState().values,
              partNumber: prevState.values.partNumber,
              country: prevState.values.country,
            },
          }));
        });
      });
    } else {
      saveRequestToLocalStorage(data, data.part_number, "rfq");
      dispatch(changeMisc("not_activated_request", { ...data, requestType: "rfq" }, formState.values.email));

      setIsLoading(true);
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

      dispatch(authSignup(registerData, { subj: "rfq" }))
        .then(() => {
          batch(() => {
            localStorage.removeItem("rfq_form_register_data");
            localStorage.setItem("registered_email", formState.values.email);
            dispatch(clearRfqItem());
            if (onCloseModalHandler) dispatch(rfqModalClose());
            setFormState((prevState) => ({
              ...defaultState(),
              values: {
                ...defaultState().values,
                partNumber: prevState.values.partNumber,
                country: prevState.values.country,
              },
            }));
            dispatch(progressModalOpen());
          });
        })
        .finally(() => setIsLoading(false));
    }
    return false;
  };

  const errorProps = (name: keyof RfqItemInterface) => {
    if (formState.touched[name] && formState.errors[name]) {
      return { error: true, helperText: formState.errors[name][0] };
    }
    return false;
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  return (
    <form className={`${classes.root} rfq-modal-form`} autoComplete="on" onSubmit={handleSubmit}>
      <div className={classes.formRow}>
        <NumberInput
          style={{ width: "100%" }}
          name="quantity"
          label={`${t("column.qty")} *`}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={formState.values.quantity}
          onBlur={onBlurHandler("quantity")}
          onChange={handleChange}
          onFocus={(e: any) => e.target.select()}
          decimalScale={0}
          isAllowedZero={false}
          {...errorProps("quantity")}
        />
        <NumberInput
          style={{ width: "100%" }}
          name="price"
          label={t("column.target_price")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{currency?.symbol || <span>&#8364;</span>}</InputAdornment>,
          }}
          value={formState.values.price}
          onChange={handleChange}
          {...errorProps("price")}
          decimalScale={4}
          isAllowedZero={true}
        />
      </div>
      {!isAuthenticated && (
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
            <div className={classes.phone}>
              <InputPhone label={t("column.phone")} value={phoneValue} onChange={onChangePhoneHandler} small />
            </div>
          </div>
        </>
      )}
      {/* <div className={classes.formRow}> */}
      {/* <div className={`${classes.dropdown} rfq-modal-partnumber`}> */}
      {/*  <input */}
      {/*    required */}
      {/*    className={classes.hiddenInput} */}
      {/*    value={item.partNumber || ""} */}
      {/*    onChange={handleHiddenInputChange} */}
      {/*  /> */}
      {/*  <AutocompleteDropdown */}
      {/*    defaultLabel={t("column.part_number")} */}
      {/*    placeholder={item.partNumber || t("common.start_typing")} */}
      {/*    variant="outlined" */}
      {/*    size="large" */}
      {/*    required */}
      {/*    InputLabelProps={{ */}
      {/*      shrink: true, */}
      {/*    }} */}
      {/*    value={item.partNumber || ""} */}
      {/*    loadOptionsAction={searchAcReturn} */}
      {/*    changeHandler={handlePartNumberChange} */}
      {/*  /> */}
      {/*  {errorProps("part_number") && <div className={classes.error}>{errorProps("part_number").helperText}</div>} */}
      {/* </div> */}
      {/* <div className={`${classes.dropdown} rfq-modal-seller`}> */}
      {/*  <input */}
      {/*    className={classes.hiddenInput} */}
      {/*    value={selectedSellers.length ? "yes" : ""} */}
      {/*    onChange={handleHiddenInputChange} */}
      {/*  /> */}
      {/*  <BaseFilterDropdown */}
      {/*    defaultLabel={t("distributor.distributors")} */}
      {/*    selectedItems={createSelectOptions(selectedSellers)} */}
      {/*    options={createSelectOptions(all_sellers)} */}
      {/*    changeHandler={handleSelectChange} */}
      {/*  /> */}
      {/*  {errorProps("seller") && <div className={classes.error}>{errorProps("seller").helperText}</div>} */}
      {/* </div> */}
      {/* </div> */}
      <div className={classes.formRow}>
        {!isAuthenticated && (
          <TextField
            style={{ textAlign: "start", width: "100%" }}
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
        )}
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
      </div>
      {!isAuthenticated && formState.values.company_type === "Other" && (
        <div className={classes.formRow}>
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
        </div>
      )}
      <div className={classes.formRow}>
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
      </div>
      {!isAuthenticated && constants.id !== ID_ICSEARCH && (
        <Box display="flex" flexDirection="column" ml={2}>
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
      )}
      {/* <div className={classes.fieldsVerticalContainer}> */}
      {/*  <div className={classes.fieldsVertical}> */}
      {/*    <DatePicker */}
      {/*      className={classes.rfqDatePicker} */}
      {/*      name="deliveryDate" */}
      {/*      required */}
      {/*      disableToolbar */}
      {/*      autoOk={true} */}
      {/*      format={DATE_FORMAT} */}
      {/*      margin="normal" */}
      {/*      label={t("column.target_delivery_date")} */}
      {/*      value={item.deliveryDate} */}
      {/*      disablePast={true} */}
      {/*      onChange={(moment_date) => handleDatePickerChange("deliveryDate", moment_date)} */}
      {/*      {...errorProps("deliveryDate")} */}
      {/*    /> */}
      {/*    {errorProps("delivery_date") && ( */}
      {/*      <div className={classes.error}>{errorProps("delivery_date").helperText}</div> */}
      {/*    )} */}
      {/*    <div> */}
      {/*      <TextField */}
      {/*        name="address" */}
      {/*        label={t("column.delivery_address")} */}
      {/*        multiline */}
      {/*        rows={4} */}
      {/*        variant="outlined" */}
      {/*        required */}
      {/*        InputLabelProps={{ */}
      {/*          shrink: true, */}
      {/*        }} */}
      {/*        value={item.address || ""} */}
      {/*        onChange={handleChange} */}
      {/*        {...errorProps("address")} */}
      {/*      /> */}
      {/*    </div> */}
      {/*  </div> */}
      {/*  <div className={classes.fieldsVertical}> */}
      {/*    <DatePicker */}
      {/*      className={classes.rfqDatePicker} */}
      {/*      name="validateDate" */}
      {/*      required */}
      {/*      disableToolbar */}
      {/*      autoOk={true} */}
      {/*      format={DATE_FORMAT} */}
      {/*      margin="normal" */}
      {/*      label={t("column.valid")} */}
      {/*      value={item.validateDate} */}
      {/*      disablePast={true} */}
      {/*      onChange={(moment_date) => handleDatePickerChange("validateDate", moment_date)} */}
      {/*      {...errorProps("validateDate")} */}
      {/*    /> */}
      {/*    {errorProps("valid_date") && <div className={classes.error}>{errorProps("valid_date").helperText}</div>} */}
      {/*    <div> */}
      {/*      <TextField */}
      {/*        name="comment" */}
      {/*        label={t("column.comment")} */}
      {/*        multiline */}
      {/*        rows={4} */}
      {/*        variant="outlined" */}
      {/*        InputLabelProps={{ */}
      {/*          shrink: true, */}
      {/*        }} */}
      {/*        value={item.comment || ""} */}
      {/*        onChange={handleChange} */}
      {/*        {...errorProps("comment")} */}
      {/*      /> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
      <div className={classes.buttons}>
        {onCloseModalHandler && (
          <Button
            variant="contained"
            type="reset"
            className={`${appTheme.buttonPrimary} test-rfq-modal-cancel`}
            onClick={onCloseModalHandler}
          >
            {t("common.close")}
          </Button>
        )}

        <Button
          variant="contained"
          className={appTheme.buttonCreate}
          type="submit"
          disabled={rfqSaving || isLoading || !formState.isValid}
        >
          {(rfqSaving || isLoading) && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
          {rfqSaving || isLoading ? t("common.sending_2") : t("common.rfq_submit")}
        </Button>
      </div>
    </form>
  );
};

export default RFQForm;