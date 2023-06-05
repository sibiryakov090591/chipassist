import useAppDispatch from "@src/hooks/useAppDispatch";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { gotoStep, saveBillingAddress } from "@src/store/checkout/checkoutActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";

import { CheckoutAddress, CheckoutAddressErrors } from "@src/store/checkout/checkoutTypes";
import { address as initAddress, addressErrors } from "@src/store/checkout/checkoutReducer";
import { isEmpty } from "@src/utils/validation";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import { loadProfileInfoThunk, updateCompanyAddress } from "@src/store/profile/profileActions";
import { defaultCountry } from "@src/constants/countries";
import { useStyles } from "./styles";

const CartBillingAddress = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("cart");

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);

  const [wasErrors, setWasErrors] = useState(false);
  const [data, setData] = useState<CheckoutAddress>(initAddress);
  const [errors, setStateErrors] = useState<CheckoutAddressErrors>(addressErrors);
  const [title, setTitle] = useState("");

  useEffect(() => {
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

  const onContinueClick = () => {
    if (validate()) {
      dispatch(saveBillingAddress(data));
      dispatch(updateCompanyAddress(checkout.billingAddress?.id, data)).then(() => dispatch(loadProfileInfoThunk()));
      dispatch(gotoStep(3));
    }
    return true;
  };

  const onPrevStepClick = () => {
    // dispatch(saveBillingAddress(data));
    dispatch(gotoStep(1));
  };

  const getFieldError = (field: string, value: string) => {
    let error = "";

    switch (field) {
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
        if (isEmpty(value)) {
          error = t("address.postcode_error");
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validate = () => {
    let isValid = true;
    const updatedErrors = {
      ...errors,
      line1: getFieldError("line1", data.line1),
      line2: getFieldError("line2", data.line2),
      line4: getFieldError("line4", data.line4),
      country: getFieldError("country", data.country),
      postcode: getFieldError("postcode", data.postcode),
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

  return (
    <div>
      <Box mb={2}>
        <Typography variant="h5">
          <strong>{title}</strong>
        </Typography>
      </Box>
      <Grid container className={classes.gridContainer}>
        <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
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
        <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}></Grid>

        <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
          <TextField
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
        <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}></Grid>

        <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
          <TextField
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
        <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}></Grid>

        <Grid className={classes.gridItem} item xs={12} sm={6} md={6}>
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
        <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item xs={12} sm={6} md={6}></Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2} className={classes.buttons}>
            <Grid item>
              <Button variant={"contained"} className={appTheme.buttonPrimary} size={"large"} onClick={onPrevStepClick}>
                {t("address.back")}
              </Button>
            </Grid>
            <Grid item>
              <Button variant={"contained"} className={appTheme.buttonCreate} size={"large"} onClick={onContinueClick}>
                {t("address.continue")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartBillingAddress;
