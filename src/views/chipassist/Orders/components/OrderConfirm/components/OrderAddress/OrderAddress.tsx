import useAppDispatch from "@src/hooks/useAppDispatch";
import React, { useState, useEffect, useMemo } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import {
  fillAndSaveAddress,
  saveShippingAddress,
  saveBillingAddress,
  switchShippingDuplicate,
} from "@src/store/checkout/checkoutActions";
import { CheckoutAddress, CheckoutAddressErrors } from "@src/store/checkout/checkoutTypes";
import { address as initAddress, addressErrors } from "@src/store/checkout/checkoutReducer";
import useAppTheme from "@src/theme/useAppTheme";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { Hidden } from "@material-ui/core";
import clsx from "clsx";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import formSchema from "@src/utils/formSchema";
import validate from "validate.js";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import { useStyles } from "./orderAddressStyles";

interface Props {
  type: "shipping" | "billing" | "company";
  setStepHandler: (step: number) => void;
  openModal: () => void;
}

const OrderAddress: React.FC<Props> = ({ type, setStepHandler, openModal }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const [data, setData] = useState<CheckoutAddress>(initAddress);
  const [errors, setStateErrors] = useState<any>(addressErrors);
  const [title, setTitle] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [isCompanyFromEU, setIsCompanyFromEU] = useState(false);
  const [isPrivatePerson, setIsPrivatePerson] = useState(false);

  const schema = useMemo(() => {
    return {
      first_name: formSchema.firstName,
      last_name: formSchema.lastName,
      company_name: {
        ...formSchema.companyName,
        presence: { allowEmpty: false, message: `^${t("form_labels.company_name")} ${t("errors.required")}` },
      },
      line4: formSchema.city,
      postcode: formSchema.postcode,
      line1: formSchema.address,
    };
  }, []);

  useEffect(() => {
    if (type !== "shipping") {
      const address: { [key: string]: any } = checkout.billingAddress;
      const err = checkout.billingAddressErrors;
      const ttl = t("address.billing_title");

      const country =
        address.country ||
        (constants?.id !== ID_ICSEARCH &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
        defaultCountry.url;

      setPhoneValue(address.phone_number_str);
      setData((prevState) => ({ ...prevState, ...address, country }));
      setStateErrors(err);
      setTitle(ttl);
    }
  }, [checkout.billingAddress]);

  useEffect(() => {
    if (type === "shipping") {
      const { address }: { [key: string]: any } = checkout;
      const { billingAddress }: { [key: string]: any } = checkout;
      const err = checkout.addressErrors;
      const ttl = t("address.shipping_title");

      const country =
        address.country ||
        billingAddress.country ||
        (constants?.id !== ID_ICSEARCH &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
        defaultCountry.url;

      const newData: any = {};
      Object.keys(address).forEach((key) => {
        newData[key] =
          typeof address[key] !== "boolean" && key !== "notes"
            ? address[key] || billingAddress[key] || ""
            : address[key];
      });
      newData.country = country;

      setData((prevState) => ({ ...prevState, ...newData }));
      setStateErrors(err);
      setTitle(ttl);
    }
  }, [checkout.address, shouldUpdateBackend]);

  useEffect(() => {
    if (type === "company") {
      const { billingAddress } = checkout;
      const EUList = [
        "AUT",
        "BEL",
        "CZE",
        "DNK",
        "EST",
        "FIN",
        "FRA",
        "DEU",
        "GRC",
        "HUN",
        "ISL",
        "ITA",
        "LVA",
        "LIE",
        "LTU",
        "LUX",
        "MLT",
        "NLD",
        "NOR",
        "POL",
        "PRT",
        "SVK",
        "SVN",
        "ESP",
        "SWE",
        "CHE",
      ];
      const country = checkout?.countries?.find((c) => c.url === billingAddress.country);
      if (country && EUList.some((code) => code === country.iso_3166_1_a3)) setIsCompanyFromEU(true);
    }
  }, [type]);

  const onChangeInput = (field: keyof CheckoutAddressErrors) => (e: Record<string, any>) => {
    const { value } = e.target;

    const err = { ...errors };
    if (err[field]) delete err[field];
    setStateErrors(err);

    setData({
      ...data,
      [field]: value,
    });
  };

  const onChangePrivatePerson = () => {
    const { billingAddress } = checkout;

    const err = { ...errors };
    if (err.company_name) delete err.company_name;
    setStateErrors(err);

    setData((prev) => ({
      ...prev,
      company_name: !isPrivatePerson ? `${prev.first_name} ${prev.last_name}` : billingAddress.company_name,
    }));
    setIsPrivatePerson((prev) => !prev);
  };

  const onFillShippingAddress = (val: React.ChangeEvent<HTMLInputElement>) => {
    const item = checkout.addressList.find((adr: any) => adr.id === val.target.value);
    if (item) dispatch(fillAndSaveAddress(item, type === "billing"));
  };

  const onContinueClick = () => {
    const validErrors = validate(data, schema);
    if (validErrors) {
      return setStateErrors(
        Object.entries(validErrors).reduce((acc, [key, v]: any) => {
          return { ...acc, [key]: v[0] };
        }, {}),
      );
    }

    switch (type) {
      case "billing":
        dispatch(saveBillingAddress(data));
        if (checkout.shippingDuplicate) {
          setStepHandler(4);
        } else {
          setStepHandler(3);
        }
        break;
      case "shipping":
        dispatch(saveShippingAddress(data));
        setStepHandler(4);
        break;
      case "company":
        if (!isPrivatePerson) dispatch(saveBillingAddress(data));
        openModal();
        break;
      default:
        return true;
    }
    return true;
  };

  const onPrevStepClick = () =>
    setStepHandler(type === "company" ? (!checkout.shippingDuplicate ? 3 : 2) : type === "shipping" ? 2 : 1);

  const onChangeShippingDuplicate = () => {
    dispatch(switchShippingDuplicate());
  };

  const onChangePhoneHandler = (val: string) => {
    setData({
      ...data,
      phone_number_str: val ? `+${val}` : "",
    });
    return setPhoneValue(val);
  };

  const onChangeDefault = () => {
    setData({
      ...data,
      [type === "shipping" ? "is_default_for_shipping" : "is_default_for_billing"]:
        type === "shipping" ? !data.is_default_for_shipping : !data.is_default_for_billing,
    });
  };

  return (
    <Box className={classes.wrapper}>
      <div className={classes.flexItem}>
        {type !== "company" && (
          <Box mb={2}>
            <Typography variant="h5">
              <strong>{title}</strong>
            </Typography>
          </Box>
        )}
        <Grid container>
          {type === "shipping" && checkout?.addressList?.length > 1 && (
            <>
              <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
                <TextField
                  type="text"
                  name="title"
                  label={t("address.fill")}
                  variant="outlined"
                  size="small"
                  defaultValue=""
                  onChange={onFillShippingAddress}
                  fullWidth
                  select
                  disabled={!checkout.addressList.length}
                >
                  {checkout.addressList.map((val: any) => (
                    <MenuItem className={appTheme.selectMenuItem} key={val.id} value={val.id}>
                      {val.search_text}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Hidden xsDown>
                <Grid className={classes.gridItem} item md={6} sm={6} xs={12}></Grid>
              </Hidden>
            </>
          )}

          {type !== "company" && (
            <>
              <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${t("address.first_name")} *`}
                  value={data.first_name}
                  onChange={onChangeInput("first_name")}
                  error={!!errors.first_name}
                  helperText={!!errors.first_name && errors.first_name}
                  fullWidth
                />
              </Grid>
              <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${t("address.last_name")} *`}
                  value={data.last_name}
                  onChange={onChangeInput("last_name")}
                  error={!!errors.last_name}
                  helperText={!!errors.last_name && errors.last_name}
                  fullWidth
                />
              </Grid>

              <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
                {/* <div className={classes.phone}> */}
                {/*  <InputPhone value={phoneValue} onChange={onChangePhoneHandler} /> */}
                {/* </div> */}
                <PhoneInputWrapper
                  value={phoneValue}
                  onChange={onChangePhoneHandler}
                  style={{ margin: 0, height: "100%" }}
                />
              </Grid>
              <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.selectCountryInput}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t("address.country")}
                  value={data.country}
                  onChange={onChangeInput("country")}
                  fullWidth
                  error={!!errors.country}
                  helperText={!!errors.country && errors.country}
                  select
                >
                  {checkout.countries.map((item: Record<string, any>) => (
                    <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                      {item.printable_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
                <TextField
                  className={`address-city`}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${t("address.line4")} *`}
                  value={data.line4}
                  onChange={onChangeInput("line4")}
                  fullWidth
                  error={!!errors.line4}
                  helperText={!!errors.line4 && errors.line4}
                />
              </Grid>
              <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}>
                <TextField
                  className={`address-postcode`}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${t("address.postcode")} *`}
                  value={data.postcode}
                  onChange={onChangeInput("postcode")}
                  fullWidth
                  error={!!errors.postcode}
                  helperText={!!errors.postcode && errors.postcode}
                />
              </Grid>
              <Grid className={classes.gridItem} item xs={12} sm={12} md={12}>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${t("address.line1")} *`}
                  value={data.line1}
                  onChange={onChangeInput("line1")}
                  fullWidth
                  error={!!errors.line1}
                  helperText={!!errors.line1 && errors.line1}
                />
              </Grid>
              <Grid className={classes.gridItem} item xs={12} sm={12} md={12}>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t("address.notes")}
                  value={data.notes}
                  onChange={onChangeInput("notes")}
                  fullWidth
                  aria-describedby="f1-notes"
                />
                <FormHelperText id="f1-notes">{t("address.notes_help")}</FormHelperText>
              </Grid>
            </>
          )}
          {type === "company" && (
            <>
              <Grid className={classes.gridItem} item xs={12}>
                <TextField
                  type="text"
                  name="company_name"
                  label={`${t("address.company_name")} *`}
                  variant="outlined"
                  value={data.company_name}
                  onChange={onChangeInput("company_name")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.company_name}
                  helperText={!!errors.company_name && errors.company_name}
                  disabled={isPrivatePerson}
                />
              </Grid>
              {isCompanyFromEU && !isPrivatePerson && (
                <Grid className={classes.gridItem} item xs={12}>
                  <TextField
                    type="text"
                    name="inn"
                    label={t("address.inn")}
                    variant="outlined"
                    value={data.inn}
                    onChange={onChangeInput("inn")}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.inn}
                    helperText={
                      (!!errors.inn && errors.inn) || "For EU companies without VAT ID 20% tax might be applied"
                    }
                  />
                </Grid>
              )}
              <Grid className={classes.gridItem} item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={appTheme.checkbox}
                      checked={isPrivatePerson}
                      onChange={onChangePrivatePerson}
                    />
                  }
                  label={t("address.private_person")}
                />
              </Grid>
            </>
          )}
        </Grid>
        {type === "billing" && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={appTheme.checkbox}
                    checked={checkout.shippingDuplicate}
                    onChange={onChangeShippingDuplicate}
                  />
                }
                label={t("address.shipping_dup")}
              />
            </Grid>
          </Grid>
        )}
        {type === "shipping" && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={appTheme.checkbox}
                    checked={type === "shipping" ? data.is_default_for_shipping : data.is_default_for_billing}
                    onChange={onChangeDefault}
                    name="checkedA"
                  />
                }
                label={t("address.default_use")}
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.buttons}>
              <Grid item>
                <Button
                  variant={"contained"}
                  className={appTheme.buttonPrimary}
                  size={"large"}
                  onClick={onPrevStepClick}
                >
                  {t("address.back")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={"contained"}
                  className={clsx(appTheme.buttonCreate, classes.continueButton)}
                  size={"large"}
                  onClick={onContinueClick}
                >
                  {type === "company" ? t("order.order") : t("address.continue")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default OrderAddress;
