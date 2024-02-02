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
  InputAdornment,
} from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { clearRfqItem, rfqModalClose, saveRfqItem, sendSellerMessage } from "@src/store/rfq/rfqActions";
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
  saveTemporaryRfq,
} from "@src/store/progressModal/progressModalActions";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import { NumberInput } from "@src/components/Inputs";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { clsx } from "clsx";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import {
  newCompanyAddress,
  saveProfileInfo,
  updateCompanyAddress,
  updateProfileInfoThunk,
} from "@src/store/profile/profileActions";
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
  isExample?: boolean;
  isAuth?: boolean;
  className?: string;
}

interface RfqItemInterface {
  country: string;
  inn: string;
  quantity: string;
  price: string;
  // deliveryDate: string;
  // validateDate: string;
  // seller: Array<any>;
  comment: string;
  email: string;
  firstName: string;
  lastName: string;
  company_name: string;
  // company_type: string;
  // company_other_type: string;
  policy_confirm: boolean;
  receive_updates_confirm: boolean;
}

interface RfqItemTouched {
  country?: boolean;
  inn?: boolean;
  quantity?: boolean;
  price?: boolean;
  comment?: boolean;
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  company_name?: boolean;
  company_type?: boolean;
  company_other_type?: boolean;
  policy_confirm?: boolean;
  receive_updates_confirm?: boolean;
}

interface RfqItemErrors {
  country?: string[];
  inn?: string[];
  quantity?: string[];
  price?: string[];
  comment?: string[];
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  company_name?: string[];
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

const RFQForm: React.FC<Props> = ({ onCloseModalHandler, isExample, isAuth, className }) => {
  // const history = useHistory();
  // const location = useLocation();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [phoneValue, setPhoneValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const isDownKey = useMediaQuery(theme.breakpoints.down(460));
  const currency = useAppSelector((state) => state.currency.selected);
  const rfqItem = useAppSelector((state) => state.rfq.rfqItem);
  const rfqModalOpen = useAppSelector((state) => state.rfq.rfqModalOpen);
  const rfqSaving = useAppSelector((state) => state.rfq.rfqSaving);
  // const rfqErrors = useAppSelector((state) => state.rfq.rfqErrors);
  let isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  isAuthenticated = isExample ? isAuth : isAuthenticated;
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  // const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const countries = useAppSelector((state) => state.checkout.countries);
  const utm = useAppSelector((state) => state.common.utm);
  const sellersWithProductLink = useAppSelector((state) =>
    state.sellers.items.filter((i) => Object.prototype.hasOwnProperty.call(i, "link_to_site")),
  );
  const isICSearch = constants.id === ID_ICSEARCH;

  const defaultState = (profile?: any): FormState => ({
    isValid: false,
    values: {
      country: !isICSearch
        ? (profile?.defaultBillingAddress?.country &&
            countries?.find((c) => c.url.includes(profile?.defaultBillingAddress?.country?.split("/api/")[1]))?.url) ||
          (geolocation?.country_code_iso3 &&
            countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
          defaultCountry.url
        : defaultCountry.url,
      inn: "",
      quantity: profile?.quantity || "",
      price: profile?.price || "",
      // deliveryDate: getCurrentDate(),
      // validateDate: getCurrentDate(),
      // seller: [],
      // address: "",
      comment: profile?.comment || "",
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      // company_type: "Distributor",
      // company_other_type: "",
      company_name: profile?.defaultBillingAddress?.company_name || "",
      policy_confirm: false,
      receive_updates_confirm: false,
    },
    touched: {},
    errors: {},
  });
  const [formState, setFormState] = useState<FormState>(defaultState(profileInfo));
  const debouncedState = useDebounce(formState, 300);

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
      setFormState((prevState) => {
        return defaultState({ ...prevState.values, ...profileInfo });
      });

      setBillingAddress(profileInfo.defaultBillingAddress);
      setPhoneValue(profileInfo.defaultBillingAddress.phone_number_str);
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
      firstName: formSchema.firstName,
      lastName: formSchema.lastName,
      company_name: formSchema.companyName,
      quantity: {
        presence: { allowEmpty: false, message: `^${t("column.qty")} ${t("column.required")}` },
      },
      country: {
        presence: { allowEmpty: false, message: `^${t("form_labels.country")} ${t("column.required")}` },
      },
      inn: formSchema.inn,
      // price: {
      // presence: { allowEmpty: false, message: `^${t("column.price")} ${t("column.required")}` },
      // numericality: {
      //   greaterThan: 0,
      //   notGreaterThan: `^${t("column.price")} ${t("errors.not_greater_than", { count: 0 })}`,
      // },
      // },
    };
    if (!isAuthenticated) {
      sch = {
        ...sch,
        email: formSchema.email,
        policy_confirm: formSchema.policyConfirm,
        // ...(formState.values.company_type === "Other" && {
        //   company_other_type: {
        //     presence: { allowEmpty: false, message: `^${t("column.company_other_type")} ${t("column.required")}` },
        //   },
        // }),
      };
    }
    return sch;
  }, [isAuthenticated]);

  useEffect(() => {
    if (rfqModalOpen) {
      setFormState((prevState) => defaultState({ ...prevState.values, ...profileInfo }));
    } else if (!isAuthenticated) {
      localStorage.setItem(
        "rfq_form_register_data",
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
          ...{
            ...rfqItem,
            quantity: prevState.values.quantity || rfqItem.quantity,
            comment: prevState.values.comment || rfqItem.comment,
          },
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
  }, [rfqItem]);

  useEffect(() => {
    setFormState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          country: !isICSearch
            ? (billingAddress?.country &&
                countries?.find((c) => c.url.includes(billingAddress?.country?.split("/api/")[1]))?.url) ||
              (geolocation?.country_code_iso3 &&
                countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
              defaultCountry.url
            : defaultCountry.url,
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

    if (isAuthenticated && !isExample && Object.keys(profileInfo).includes(name)) {
      const updatedProfileInfo = { ...profileInfo, [name]: value };
      dispatch(saveProfileInfo(updatedProfileInfo));
    }

    return setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: name === "email" ? value?.replace(/ /g, "") : name === "inn" ? value?.replace(/\D/g, "") : value,
      },
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

    // const sellers = item.seller.includes("All")
    //   ? all_sellers.map((seller: any) => seller.id).filter((seller: any) => seller !== "All")
    //   : item.seller;
    if (!isExample) {
      const country =
        countries?.find((c) => c.url === formState.values.country) ||
        (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
        defaultCountry;
      const phone = phoneValue ? `+${phoneValue.replace(/\+/g, "")}` : billingAddress?.phone_number_str;
      // let company_type: string;
      // try {
      //   company_type = !isAuthenticated
      //     ? formState.values.company_type === "Other"
      //       ? formState.values.company_other_type
      //       : formState.values.company_type
      //     : billingAddress?.notes.match(/company_variant: (.+)/) &&
      //       billingAddress.notes.match(/company_variant: (.+)/)[0].split("company_variant: ")[1];
      // } catch {
      //   company_type = null;
      // }
      // const company_name = !isAuthenticated
      //   ? formState.values.email.match(/@(.*)\./g) && formState.values.email.match(/@(.*)\./g)[0].replace(/[@.]/g, "")
      //   : billingAddress?.company_name;
      const company_name = billingAddress?.company_name;
      let comment = isICSearch ? "" : `${t("column.country")}: ${country?.printable_name}; `;
      if (phone) comment += `${t("column.phone_comment")}: ${phone}; `;
      if (company_name)
        comment += `${t("column.company_name")}: ${company_name[0].toUpperCase()}${company_name.slice(1)}; `;
      // if (company_type) comment += `Company type: ${company_type}; `;
      if (formState.values.comment) comment += `${t("column.additional")}: ${formState.values.comment};`;

      const sr = rfqItem?.stockrecord;
      // const srPrice = sr && getPrice(+formState.values.quantity, sr);
      //
      // let availableMinPriceCurrency: CurrenciesAllowed = null;
      // const availableMinPrice = rfqItem?.product
      //   ? rfqItem.product.stockrecords &&
      //     rfqItem.product.stockrecords
      //       .filter((i) => isProductAvailable(i))
      //       .reduce((acc, i) => {
      //         const price = getPrice(+formState.values.quantity, i, false);
      //         if (!price) return acc;
      //         if (!acc || +price < acc) {
      //           availableMinPriceCurrency = i.price_currency;
      //           return +price;
      //         }
      //         return acc;
      //       }, 0)
      //   : null;

      const data = {
        part_number: rfqItem.partNumber,
        quantity: formState.values.quantity,
        price: formState.values.price || null,
        currency: (formState.values.price && currency.code) || null,
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
        productId: rfqItem.productId,
        ...(!rfqItem.productId && {
          user: isAuthenticated ? profileInfo?.email : formState.values.email,
          wasAuthenticated: isAuthenticated,
        }),
      };
      // sending a chat message to all sellers without product url
      const sellersMessages =
        profileInfo &&
        !profileInfo.isTestAccount &&
        rfqItem?.product?.stockrecords?.reduce((acc, stock) => {
          if (acc.find((i) => i.seller[0].id === stock.partner)) return acc; // filtered duplicate sellers
          const seller = sellersWithProductLink?.find((i) => i.id === stock.partner);
          const isNeedSendMessage = !stock.product_url && !seller?.url;
          if (!isNeedSendMessage) return acc;
          const sellerData = {
            part_number: rfqItem.product.upc,
            stockrecord: stock.id,
            quantity: formState.values.quantity,
            price: formState.values.price,
            currency: currency.code,
            seller: [{ id: stock.partner, name: stock.partner_name }],
            comment: `${t("seller_message.message_placeholder", {
              seller: stock.partner_name,
              mpn: rfqItem.product.upc,
              constantsTitle: constants.title,
            })}`,
          };
          return [...acc, sellerData];
        }, []);

      dispatch(progressModalSetPartNumber(rfqItem.partNumber, "rfq"));

      console.log("MISC_SAVE:", formState.values);
      dispatch(changeMisc("rfq", formState.values, formState.values.email));

      localStorage.setItem("before_unload_alert_disabled", "true");
      localStorage.setItem("product_request_hint_disabled", "true");
      dispatch(saveTemporaryRfq({ rfq: data, formState: formState.values }));

      if (isAuthenticated) {
        // if (phoneValue) data.phone_number_str = `+${phoneValue.replace(/\+/g, "")}`; // replace for fix double plus
        setIsLoading(true);
        let newAddressData: any = {
          first_name: formState.values.firstName,
          last_name: formState.values.lastName,
          company_name: formState.values.company_name,
          phone_number_str: phoneValue ? `+${phoneValue.replace(/\+/g, "")}` : null,
          country: formState.values.country || null,
          line1: profileInfo?.defaultBillingAddress?.line1 || "-",
        };

        if (isICSearch) {
          newAddressData = {
            ...newAddressData,
            inn: formState.values.inn,
          };
        }

        if (billingAddress?.id) {
          await dispatch(
            updateCompanyAddress(billingAddress.id, {
              ...billingAddress,
              ...newAddressData,
            }),
          );
        } else {
          await dispatch(
            newCompanyAddress({
              ...newAddressData,
            }),
          );
        }
        await dispatch(updateProfileInfoThunk());
        dispatch(saveRfqItem(data))
          .then(() => {
            batch(() => {
              dispatch(clearRfqItem());
              if (onCloseModalHandler) dispatch(rfqModalClose());
              setFormState((prevState) => ({
                ...defaultState(),
                values: {
                  ...defaultState({ ...prevState.values, ...profileInfo }).values,
                  country: prevState.values.country,
                },
              }));
            });
          })
          .finally(() => setIsLoading(false));
        if (sellersMessages?.length) {
          sellersMessages.forEach((messageData) => dispatch(sendSellerMessage(messageData)));
        }
      } else {
        saveRequestToLocalStorage({ ...data, sellersMessages }, data.part_number, "rfq");
        dispatch(
          changeMisc("not_activated_request", { ...data, sellersMessages, requestType: "rfq" }, formState.values.email),
        );

        setIsLoading(true);
        let registerData = { ...defaultRegisterData };
        registerData.email = formState.values.email;
        registerData.first_name = formState.values.firstName;
        registerData.last_name = formState.values.lastName;
        registerData.phone_number_str = phoneValue ? `+${phoneValue}` : null;
        registerData.company_name = formState.values.company_name;
        // registerData.company_variant =
        //   formState.values.company_type === "Other" ? formState.values.company_other_type : formState.values.company_type;
        registerData.policy_confirm = formState.values.policy_confirm;
        registerData.receive_updates_confirm = formState.values.receive_updates_confirm;
        registerData.country = country?.iso_3166_1_a3;
        if (isICSearch) {
          registerData.inn = formState.values.inn;
        }
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
                  ...defaultState({ ...prevState?.values, ...profileInfo }).values,
                  country: prevState.values.country,
                },
              }));
              dispatch(progressModalOpen());
            });
          })
          .finally(() => setIsLoading(false));
      }
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
    <form
      className={clsx(classes.root, "rfq-modal-form", { [className]: !!className })}
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <div>
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
                // disabled={isAuthenticated}
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
                // disabled={isAuthenticated}
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
              {!isICSearch ? (
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
                  // disabled={isAuthenticated}
                  {...errorProps("company_name")}
                />
              ) : (
                <PhoneInputWrapper
                  label={t("column.phone")}
                  value={phoneValue}
                  onChange={onChangePhoneHandler}
                  small
                  style={{ height: "37.63px", margin: !isDownKey && "13px" }}
                />
              )}
            </div>
          </>
        }
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
          {/* {!isAuthenticated && ( */}
          {/*  <TextField */}
          {/*    style={{ textAlign: "start", width: "100%" }} */}
          {/*    name="company_type" */}
          {/*    label={`${t("column.company_type")} *`} */}
          {/*    variant="outlined" */}
          {/*    size="small" */}
          {/*    InputLabelProps={{ */}
          {/*      shrink: true, */}
          {/*    }} */}
          {/*    value={formState.values.company_type} */}
          {/*    select */}
          {/*    onChange={handleChange} */}
          {/*  > */}
          {/*    <MenuItem value="Distributor">{t("column.distributor")}</MenuItem> */}
          {/*    <MenuItem value="Industrial manufacturer">{t("column.manufacturer")}</MenuItem> */}
          {/*    <MenuItem value="Design organization">{t("column.design")}</MenuItem> */}
          {/*    <MenuItem value="Supply chain services provider">{t("column.provider")}</MenuItem> */}
          {/*    <MenuItem value="Other">{t("column.other")}</MenuItem> */}
          {/*  </TextField> */}
          {/* )} */}
          {
            <>
              {isICSearch ? (
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
                  // disabled={isAuthenticated}
                  {...errorProps("company_name")}
                />
              ) : (
                <PhoneInputWrapper
                  label={t("column.phone")}
                  value={phoneValue}
                  onChange={onChangePhoneHandler}
                  small
                  style={{ height: "37.63px", margin: !isDownKey && "13px" }}
                />
              )}
              {isICSearch ? (
                <TextField
                  variant="outlined"
                  name="inn"
                  size="small"
                  label={`ИНН компании*`}
                  value={formState.values.inn}
                  onBlur={onBlurHandler("inn")}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            </>
          }
        </div>
        <div className={classes.formRow}>
          <TextField
            style={{ width: "100%" }}
            name="comment"
            label={t("column.form_comment")}
            multiline
            rows={isAuthenticated ? 4 : 2}
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
        {/* {!isAuthenticated && formState.values.company_type === "Other" && ( */}
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
          <Box display="flex" flexDirection="column" ml={2} mb={1}>
            {!isICSearch && (
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
            )}

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
                  {!isICSearch && (
                    <>
                      <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank">
                        {t("feedback.form.terms_of_services")}
                      </Link>
                      {t("feedback.form.and")}
                    </>
                  )}
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
      </div>
      <Box className={clsx(commonClasses.actionsRow, classes.buttons)}>
        {onCloseModalHandler && (
          <Button
            variant="contained"
            type="reset"
            className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth, "test-rfq-modal-cancel")}
            onClick={onCloseModalHandler}
          >
            {t("common.close")}
          </Button>
        )}

        <Button
          variant="contained"
          className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
          type="submit"
          disabled={rfqSaving || isLoading}
        >
          {(rfqSaving || isLoading) && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
          {rfqSaving || isLoading ? t("common.sending_2") : t("common.rfq_submit")}
        </Button>
      </Box>
    </form>
  );
};

export default RFQForm;
