import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Hidden,
  Link,
  TextField,
} from "@material-ui/core";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import useAppTheme from "@src/theme/useAppTheme";
import { sendRequestThunk } from "@src/store/checkout/checkoutActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import {
  changeMisc,
  progressModalOpen,
  progressModalSetPartNumber,
  saveRequestToLocalStorage,
} from "@src/store/progressModal/progressModalActions";
import validate from "validate.js";
import { authSignup, defaultRegisterData } from "@src/store/authentication/authActions";
// import { clearCartItems } from "@src/store/cart/cartActions";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import clsx from "clsx";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useStyles as useRfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { useStyles as useRfqFormStyles } from "@src/views/chipassist/Rfq/components/RFQForm/styles";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface FormStateValues {
  email?: string;
  first_name?: string;
  last_name?: string;
  inn?: string;
  policy_confirm?: boolean;
  company_name?: string;
  receive_updates_confirm?: boolean;
}

interface FormStateErrors {
  email?: string[];
  first_name?: string[];
  last_name?: string[];
  inn?: string[];
  policy_confirm?: string[];
  company_name?: string[];
  [key: string]: string[];
  receive_updates_confirm?: string[];
}

interface FormStateTouched {
  email?: boolean;
  first_name?: boolean;
  last_name?: boolean;
  inn?: boolean;
  policy_confirm?: boolean;
  company_name?: boolean;
  receive_updates_confirm?: boolean;
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
}

interface Props {
  onClose: () => void;
}

const logo = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const ConfirmRequestModal: React.FC<Props> = ({ onClose }) => {
  const commonClasses = useCommonStyles();
  const rfqModalClasses = useRfqModalStyles();
  const rfqFormClasses = useRfqFormStyles();
  const registerClasses = useRegisterStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");
  const theme = useTheme();
  const isDownKey = useMediaQuery(theme.breakpoints.down(460));

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const countries = useAppSelector((state) => state.checkout.countries);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const cartItems = useAppSelector((state) => state.cart.items);
  const utm = useAppSelector((state) => state.common.utm);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);

  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const [phoneValue, setPhoneValue] = useState("");
  const [item, setItem] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const debouncedState = useDebounce(item, 300);

  const schema = useMemo(() => {
    if (isAuthenticated) return {};
    return {
      email: formSchema.email,
      first_name: formSchema.firstName,
      last_name: formSchema.lastName,
      policy_confirm: formSchema.policyConfirm,
      company_name: formSchema.companyName,
      inn: formSchema.inn,
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (profileInfo) {
      setBillingAddress(profileInfo.defaultBillingAddress || null);
    }
  }, [profileInfo]);

  useEffect(() => {
    const formErrors = validate(item.values, schema);
    setItem((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  useEffect(() => {
    const country =
      (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
      defaultCountry;
    if (country) {
      setItem((prevState) => {
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

  const onBlurHandler = (name: string) => () => {
    return setItem((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { name, value } = event.target;

    const errors = { ...item.errors };
    if (errors[name]) delete errors[name];

    setItem((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : name === "email"
              ? value?.replace(/ /g, "")
              : value,
        },
        touched: {
          ...prevState.touched,
          [event.target.name]: event.target.type === "checkbox",
        },
        errors,
      };
    });
  };

  const onSubmit = async () => {
    if (!isAuthenticated) {
      const errors = validate(item.values, schema);
      if (errors) {
        return setItem((prevState) => ({
          ...prevState,
          isValid: !errors,
          touched: Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
          errors: errors || {},
        }));
      }
    }

    const phone = !isAuthenticated && phoneValue ? `+${phoneValue}` : billingAddress?.phone_number_str;
    // const company_name = !isAuthenticated
    //   ? item.values.email.match(/@(.*)\./g) && item.values.email.match(/@(.*)\./g)[0].replace(/[@.]/g, "")
    //   : billingAddress?.company_name;
    const company_name = isAuthenticated ? billingAddress?.company_name : item.values.company_name;
    let comment = "";
    if (company_name) comment += `Company name: ${company_name};`;
    if (phone) comment += ` Phone: ${phone};`;

    const rfqList = cartItems.map((i) => {
      return {
        part_number: i.product.upc,
        quantity: i.quantity,
        comment,
        query: `origin=${window.location.origin + window.location.pathname}${
          utm
            ? Object.entries(utm).reduce((acc, ent) => {
                return ent[1] ? `${acc}${acc ? "&" : "?"}${ent[0]}=${ent[1]}` : acc;
              }, "")
            : ""
        }`,
      };
    });

    if (isAuthenticated) {
      onClose();
      dispatch(sendRequestThunk(rfqList));
    } else {
      saveRequestToLocalStorage(rfqList, "order", "order");
      dispatch(
        changeMisc("not_activated_request", { rfqList, partNumber: "order", requestType: "order" }, item.values.email),
      );

      const registerData = {
        ...defaultRegisterData,
        ...item.values,
        ...(phoneValue && { phone_number_str: `+${phoneValue}` }),
      };
      setIsLoading(true);
      dispatch(authSignup(registerData, { subj: "order" }))
        .then(() => {
          localStorage.setItem("registered_email", item.values.email);
          localStorage.removeItem("unauth_cart");
          // dispatch(clearCartItems());
          dispatch(progressModalSetPartNumber("order", "order"));
          dispatch(progressModalOpen());
          onClose();
        })
        .finally(() => setIsLoading(false));
    }
    return false;
  };

  const errorProps = (name: keyof FormStateValues) => {
    if (item.touched[name] && item.errors[name]) {
      return { error: true, helperText: item.errors[name][0] };
    }
    return false;
  };

  const showSignIn = (show: boolean) => () => {
    setShowLoginForm(show);
  };

  const afterLoginCallback = () => {
    onClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={clsx(commonClasses.modal, !isAuthenticated ? "fullScreen" : "")}
      open={true}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={clsx(commonClasses.paper, rfqModalClasses.container, !isAuthenticated ? "fullScreen" : "")}>
          {!isAuthenticated && (
            <Hidden smDown>
              <div className={rfqModalClasses.logoContainer}>
                <div className={rfqModalClasses.signIn}>
                  {!isAuthenticated && !showLoginForm && (
                    <>
                      {t("restricted.description_1")}
                      <div onClick={showSignIn(true)} className={rfqModalClasses.link}>
                        {t("restricted.sign_in")}
                      </div>
                    </>
                  )}
                  {!isAuthenticated && showLoginForm && (
                    <div onClick={showSignIn(false)} className={rfqModalClasses.link}>
                      <DoubleArrowIcon /> {t("back")}
                    </div>
                  )}
                </div>
                <img className={rfqModalClasses.logo} src={logo} alt="icsearch logo" />
              </div>
            </Hidden>
          )}
          <div className={rfqModalClasses.content}>
            {!showLoginForm ? (
              <>
                <h2 className={rfqModalClasses.header}>{t("confirm_modal.title")}</h2>
                <p className={rfqModalClasses.text}>{t("confirm_modal.sub_title")}</p>
              </>
            ) : (
              <Hidden smDown>
                <h2 className={clsx(rfqModalClasses.header, { mobile: true })}>{t("login.sign_in")}</h2>
              </Hidden>
            )}
            {!isAuthenticated && (
              <Hidden mdUp>
                <div className={clsx(rfqModalClasses.signInMobile, { loginActive: showLoginForm })}>
                  {!showLoginForm && t("restricted.description_1")}
                  <span
                    onClick={showSignIn(!showLoginForm)}
                    className={`${appTheme.hyperlink} ${registerClasses.link}`}
                  >
                    {showLoginForm ? (
                      <span className={rfqModalClasses.backToRfq}>
                        <DoubleArrowIcon /> {t("back")}
                      </span>
                    ) : (
                      t("restricted.sign_in")
                    )}
                  </span>
                </div>
              </Hidden>
            )}

            {showLoginForm ? (
              <Box m="13px">
                <LoginForm className={null} callback={afterLoginCallback} />
              </Box>
            ) : (
              <>
                {!isAuthenticated && (
                  <form className={rfqFormClasses.root} autoComplete="on" onSubmit={onSubmit}>
                    <div className={rfqFormClasses.formRow}>
                      <TextField
                        fullWidth
                        name="first_name"
                        label={`${t("form_labels.first_name")} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.values.first_name || ""}
                        onChange={handleChange}
                        onBlur={onBlurHandler("first_name")}
                        {...errorProps("first_name")}
                      />
                      <TextField
                        fullWidth
                        name="last_name"
                        label={`${t("form_labels.last_name")} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.values.last_name || ""}
                        onChange={handleChange}
                        onBlur={onBlurHandler("last_name")}
                        {...errorProps("last_name")}
                      />
                    </div>
                    <div className={rfqFormClasses.formRow}>
                      <TextField
                        fullWidth
                        name="email"
                        label={`${t(
                          constants.activateCorporateEmailValidation ? "form_labels.corp_email" : "form_labels.email",
                        )} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.values.email || ""}
                        onChange={handleChange}
                        onBlur={onBlurHandler("email")}
                        {...errorProps("email")}
                      />
                      <PhoneInputWrapper
                        value={phoneValue}
                        onChange={onChangePhoneHandler}
                        small
                        style={{ height: "37.63px", margin: !isDownKey && "13px" }}
                      />
                    </div>
                    <div className={rfqFormClasses.formRow}>
                      <TextField
                        fullWidth
                        name="company_name"
                        label={`${t("form_labels.company_name")} *`}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.values.company_name}
                        onBlur={onBlurHandler("company_name")}
                        onChange={handleChange}
                        {...errorProps("company_name")}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="inn"
                        size="small"
                        label={`ИНН компании *`}
                        value={item.values.inn}
                        onBlur={onBlurHandler("inn")}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...errorProps("inn")}
                      ></TextField>
                    </div>
                    <Box display="flex" flexDirection="column" ml={2} mb={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="receive_updates_confirm"
                            className={appTheme.checkbox}
                            checked={item.values.receive_updates_confirm || false}
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
                            checked={item.values.policy_confirm || false}
                            onChange={handleChange}
                          />
                        }
                        label={
                          <>
                            {t("feedback.form.policy_agree")}
                            {/* <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank"> */}
                            {/*  {t("feedback.form.terms_of_services")} */}
                            {/* </Link> */}
                            {/* {t("feedback.form.and")} */}
                            <Link className={appTheme.hyperlink} href={"/privacy_policy"} target="_blank">
                              {t("feedback.form.privacy_policy")}
                            </Link>
                            <span>&nbsp;*</span>
                          </>
                        }
                      />
                      {item.touched.policy_confirm && !!item.errors.policy_confirm && item.errors.policy_confirm[0] && (
                        <FormHelperText error>{item.errors.policy_confirm[0]}</FormHelperText>
                      )}
                    </Box>
                  </form>
                )}
                <br />
                <Box className={clsx(commonClasses.actionsRow, rfqFormClasses.buttons)}>
                  <Button className={appTheme.buttonPrimary} color="primary" variant="contained" onClick={onClose}>
                    {t("confirm_modal.cancel")}
                  </Button>
                  <Button
                    className={appTheme.buttonCreate}
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={isLoading || !item.isValid}
                  >
                    {isLoading && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
                    {t("confirm_modal.submit")}
                  </Button>
                </Box>
              </>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmRequestModal;
