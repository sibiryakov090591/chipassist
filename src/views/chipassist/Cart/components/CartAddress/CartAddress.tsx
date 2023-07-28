import useAppDispatch from "@src/hooks/useAppDispatch";
import React, { useState, useEffect } from "react";
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
import { isInvalidNumber, isEmpty } from "@src/utils/validation";
import {
  fillAndSaveAddress,
  saveShippingAddress,
  saveBillingAddress,
  switchBillingDuplicate,
  closeCheckout,
  gotoStep,
} from "@src/store/checkout/checkoutActions";
import { CheckoutAddress, CheckoutAddressErrors } from "@src/store/checkout/checkoutTypes";
import { address as initAddress, addressErrors } from "@src/store/checkout/checkoutReducer";
import useAppTheme from "@src/theme/useAppTheme";
import InputPhone from "@src/components/InputPhone/InputPhone";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { Hidden, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import clsx from "clsx";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { useStyles as useProfileStyles } from "@src/views/chipassist/Profile/components/CompanyAddress/components/AddressData/AddressDataStyles";
import { defaultCountry } from "@src/constants/countries";
import { useStyles } from "./cartAddressStyles";

interface Props {
  type: "shipping" | "billing";
  backHandler?: () => void;
  isValidBillingAddress?: boolean;
}

const CartAddress: React.FC<Props> = ({ type, backHandler, isValidBillingAddress }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const profileClasses = useProfileStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const [wasErrors, setWasErrors] = useState(false);
  const [data, setData] = useState<CheckoutAddress>(initAddress);
  const [errors, setStateErrors] = useState<CheckoutAddressErrors>(addressErrors);
  const [title, setTitle] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  useEffect(() => {
    if (type === "shipping") {
      const { address } = checkout;
      const err = checkout.addressErrors;
      const ttl = t("address.shipping_title");

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
  }, [checkout.address, shouldUpdateBackend]);

  useEffect(() => {
    if (type === "billing") {
      const address = checkout.billingAddress;
      const err = checkout.billingAddressErrors;
      const ttl = t("address.billing_title");

      const country =
        address.country ||
        (constants?.id !== ID_ICSEARCH &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
        defaultCountry.url;

      setData((prevState) => ({ ...prevState, ...address, country }));
      setStateErrors(err);
      setTitle(ttl);
    }
  }, [checkout.billingAddress]);

  const onChangeInput = (field: keyof CheckoutAddressErrors) => (e: Record<string, any>) => {
    const { value } = e.target;

    if (wasErrors) {
      const updatedErrors = { ...errors };
      updatedErrors[field] = getFieldError(field, value);
      setStateErrors(updatedErrors);
    }

    setData({
      ...data,
      [field]: value,
    });
  };

  const onFillShippingAddress = (val: React.ChangeEvent<HTMLInputElement>) => {
    const item = checkout.addressList.find((adr: any) => adr.id === val.target.value);
    if (item) dispatch(fillAndSaveAddress(item, type === "billing"));
  };

  const onContinueClick = () => {
    if (validate()) {
      switch (type) {
        case "shipping":
          dispatch(saveShippingAddress(data));
          dispatch(
            gotoStep((constants.showNewBillingAddress || checkout.billingDuplicate) && isValidBillingAddress ? 3 : 2),
          );
          break;
        case "billing":
          dispatch(saveBillingAddress(data));
          dispatch(gotoStep(3));
          break;
        default:
          return true;
      }
    }
    return true;
  };

  const onPrevStepClick = () => {
    if (type === "shipping") {
      if (backHandler) {
        backHandler();
      } else {
        dispatch(closeCheckout());
      }
      return;
    }
    if (type === "billing") {
      dispatch(saveBillingAddress(data));
    }

    dispatch(gotoStep(1));
  };

  const onChangeDefault = () => {
    setData({
      ...data,
      [type === "shipping" ? "is_default_for_shipping" : "is_default_for_billing"]:
        type === "shipping" ? !data.is_default_for_shipping : !data.is_default_for_billing,
    });
  };

  const onChangeBillingDuplicate = () => {
    dispatch(switchBillingDuplicate());
  };

  const getFieldError = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "first_name":
        if (isEmpty(value)) {
          error = t("address.first_name_error");
        }
        break;
      case "last_name":
        if (isEmpty(value)) {
          error = t("address.last_name_error");
        }
        break;
      case "line1":
        if (isEmpty(value)) {
          error = t("address.line1_error");
        }
        break;
      case "line4":
        if (isEmpty(value)) {
          error = t("address.line4_error");
        }
        break;
      case "country":
        if (isEmpty(value)) {
          error = t("address.country_error");
        }
        break;
      case "postcode":
        // if (!isEmpty(data.country)) {
        //   const urlParts = data.country.split("/");
        //   const locale = urlParts[urlParts.length - 2];

        //   if (isInvalidPostCode(value, locale)) {
        //     error = t("address.postcode_error");
        //   }
        // }
        if (isEmpty(value)) {
          error = t("address.postcode_error");
        }
        break;
      case "phone_number":
        // eslint-disable-next-line no-case-declarations
        const phoneNumber = value.replace(/\D/g, "");
        if (!isEmpty(value) && isInvalidNumber(phoneNumber)) {
          error = t("address.phone_number_error");
        }
        break;
      default:
        break;
    }

    return error;
  };

  // eslint-disable-next-line no-shadow
  // const setErrors = (errors: CheckoutAddressErrors) => {
  //   switch (type) {
  //     case "shipping":
  //       dispatch(updateAddressErrors(errors));
  //       break;
  //     case "billing":
  //       dispatch(updateBillAddressErrors(errors));
  //       break;
  //     default:
  //       return true;
  //   }

  //   return true;
  // };

  const validate = () => {
    let isValid = true;
    const updatedErrors = {
      ...errors,
      first_name: getFieldError("first_name", data.first_name),
      last_name: getFieldError("last_name", data.last_name),
      line1: getFieldError("line1", data.line1),
      line2: getFieldError("line2", data.line2),
      line4: getFieldError("line4", data.line4),
      country: getFieldError("country", data.country),
      postcode: getFieldError("postcode", data.postcode),
      // phone_number: getFieldError("phone_number", data.phone_number),
    };

    for (const val of Object.values(updatedErrors)) {
      if (val) {
        isValid = false;
      }
    }

    if (!isValid) {
      setWasErrors(true);
    }

    setStateErrors(updatedErrors);

    return isValid;
  };

  const onChangePhoneHandler = (val: string) => {
    setData({
      ...data,
      phone_number_str: val ? `+${val}` : "",
    });
    return setPhoneValue(val);
  };

  return (
    <Box className={classes.wrapper}>
      <div className={classes.flexItem}>
        <Box mb={2}>
          <Typography variant="h5">
            <strong>{title}</strong>
          </Typography>
        </Box>
        <Grid container>
          {checkout?.addressList?.length > 1 && (
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

          <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label={t("address.first_name")}
              value={data.first_name}
              onChange={onChangeInput("first_name")}
              error={!!errors.first_name}
              helperText={!!errors.first_name && errors.first_name}
              required
              fullWidth
            />
          </Grid>
          <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label={t("address.last_name")}
              value={data.last_name}
              onChange={onChangeInput("last_name")}
              error={!!errors.last_name}
              helperText={!!errors.last_name && errors.last_name}
              required
              fullWidth
            />
          </Grid>

          <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
            <div className={classes.phone}>
              <InputPhone value={phoneValue} onChange={onChangePhoneHandler} />
            </div>
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
              required
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
              label={t("address.line4")}
              value={data.line4}
              onChange={onChangeInput("line4")}
              fullWidth
              error={!!errors.line4}
              helperText={!!errors.line4 && errors.line4}
              required
            />
          </Grid>
          <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}>
            <TextField
              className={`address-postcode`}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label={t("address.postcode")}
              value={data.postcode}
              onChange={onChangeInput("postcode")}
              fullWidth
              error={!!errors.postcode}
              helperText={!!errors.postcode && errors.postcode}
              required
            />
          </Grid>

          <Grid className={classes.gridItem} item xs={12} sm={12} md={12}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label={t("address.line1")}
              value={data.line1}
              onChange={onChangeInput("line1")}
              fullWidth
              error={!!errors.line1}
              helperText={!!errors.line1 && errors.line1}
              required
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
        </Grid>
        {type === "shipping" && (
          <React.Fragment>
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
            {!constants.showNewBillingAddress && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={appTheme.checkbox}
                        checked={checkout.billingDuplicate}
                        onChange={onChangeBillingDuplicate}
                        name="checkedA"
                      />
                    }
                    label={t("address.billing_dup")}
                  />
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
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
                  className={appTheme.buttonCreate}
                  size={"large"}
                  onClick={onContinueClick}
                >
                  {t("address.continue")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        {type === "shipping" && checkout.billingAddress && (
          <>
            <Box mb={2}>
              <Typography variant="h5">
                <strong>{t("address.billing_title")}</strong>
              </Typography>
            </Box>
            <Table className={profileClasses.table} size="small">
              <TableBody>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.company_name")}</TableCell>
                  <TableCell>{checkout.billingAddress.company_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.inn")}</TableCell>
                  <TableCell>{checkout.billingAddress.inn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.country")}</TableCell>
                  <TableCell>
                    {checkout.countries &&
                      checkout.countries.find((i) => i.url === checkout.billingAddress.country)?.printable_name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.line4")}</TableCell>
                  <TableCell>{checkout.billingAddress.line4}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.postcode")}</TableCell>
                  <TableCell>{checkout.billingAddress.postcode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={profileClasses.tableHeader}>{t("cart.address.line1")}</TableCell>
                  <TableCell>{checkout.billingAddress.line1}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </Box>
  );
};

export default CartAddress;
