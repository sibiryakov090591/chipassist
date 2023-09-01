import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  Theme,
  MenuItem,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import {
  hideUpdateSuccess,
  loadProfileInfoThunk,
  showUpdateSuccess as showUpdateSuccessAction,
  updateCompanyAddress,
  updateProfileInfoThunk,
} from "@src/store/profile/profileActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import validate from "validate.js";
import formSchema from "@src/utils/formSchema";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import SuccessSnackbar from "../SuccessSnackbar";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  cardHeader: {
    backgroundColor: theme.palette.app.blue800,
    "& .MuiCardHeader-title": {
      color: "white",
    },
  },
  innHelperWrapper: {
    position: "absolute",
    zIndex: 10,
    [theme.breakpoints.down("xs")]: {
      position: "initial",
    },
  },
  innHelperLink: {
    textDecoration: "underline",
  },
  phone: {
    margin: 13,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down(460)]: {
      height: "37.63px",
      margin: "8px 0",
    },
  },
}));

const GeneralSettings = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("profile");
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const profile = useAppSelector((state) => state.profile);
  const checkout = useAppSelector((state) => state.checkout);
  const { profileInfo, showUpdateSuccess } = profile;
  const billingAddress = [...profileInfo?.addresses].sort((a, b) => a.id - b.id)[0];

  const [phoneValue, setPhoneValue] = useState("");
  const [addressData, setAddressData] = useState(null);
  const [errors, setErrors] = useState<any>({});
  const [validateErrors, setValidateErrors] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const schema = React.useMemo(() => {
    return {
      email: formSchema.email,
      company_name: {
        presence: { allowEmpty: false, message: `^${t("form_labels.company_name")} ${t("errors.required")}` },
        ...formSchema.companyName,
      },
      postcode: formSchema.postcode,
      line1: formSchema.address,
    };
  }, []);

  useEffect(() => {
    if (profileInfo?.addresses && billingAddress) {
      setAddressData(billingAddress);
      setPhoneValue(billingAddress.phone_number_str);
    }
  }, [profileInfo?.addresses]);

  useEffect(() => {
    if (profileInfo?.addressErrors && Object.keys(profileInfo.addressErrors).length) {
      const data: any = {};
      Object.entries(profileInfo.addressErrors).forEach(([i, v]) => {
        data[i] = { type: "backend", message: v[0] };
      });
      setErrors(data);
    }
  }, [profileInfo?.addressErrors]);

  useEffect(() => {
    dispatch(loadProfileInfoThunk());
    return () => {
      dispatch(hideUpdateSuccess());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let validValue = value;

    if (name === "inn") {
      if (value.length > 12) validValue = value.slice(0, 12);
    }

    if (errors[name]) {
      setErrors((prev: any) => {
        const newState: any = {};
        Object.keys(prev).forEach((key) => {
          if (key !== name) newState[name] = prev[name];
        });
        return newState;
      });
    }
    if (validateErrors[name]) {
      setValidateErrors((prev: any) => {
        const newState: any = {};
        Object.keys(prev).forEach((key) => {
          if (key !== name) newState[key] = prev[key];
        });
        return newState;
      });
    }

    setAddressData((prev: any) => ({
      ...prev,
      [name]: validValue,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promises = [];
    const data = { ...addressData };
    if (phoneValue) data.phone_number_str = `+${phoneValue.replace(/\+/g, "")}`; // replace for fix double plus

    const validErrors = validate(data, schema);
    if (validErrors) {
      return setValidateErrors(validErrors);
    }

    setIsSaving(true);
    promises.push(dispatch(updateCompanyAddress(addressData.id, data)));
    // update profile name and stop preloader
    return Promise.all(promises)
      .then(() => dispatch(updateProfileInfoThunk()))
      .then(() => dispatch(loadProfileInfoThunk()))
      .then(() => dispatch(showUpdateSuccessAction()))
      .finally(() => setIsSaving(false));
  };

  const handleSnackbarClose = () => {
    dispatch(hideUpdateSuccess());
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader className={classes.cardHeader} title={"Company details"} />
        <CardContent>
          <Grid container spacing={isXsDown ? 2 : 4}>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Email *"}
                name="email"
                variant="outlined"
                size={isXsDown ? "small" : "medium"}
                error={!!validateErrors?.email}
                helperText={!!validateErrors?.email && validateErrors.email[0]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Logo (url)"}
                name="logo"
                variant="outlined"
                size={isXsDown ? "small" : "medium"}
                error={!!validateErrors?.logo}
                helperText={!!validateErrors?.logo && validateErrors.logo[0]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={`${t("form_labels.company_name")} *`}
                name="company_name"
                variant="outlined"
                onChange={handleChange}
                value={addressData?.company_name || ""}
                error={!!errors.company_name || !!validateErrors?.company_name}
                helperText={
                  (errors.company_name && errors.company_name.message) ||
                  (!!validateErrors?.company_name && validateErrors.company_name[0])
                }
                size={isXsDown ? "small" : "medium"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={t("form_labels.website")}
                name="line2"
                onChange={handleChange}
                value={addressData?.line2 || ""}
                variant="outlined"
                error={!!errors.line2}
                helperText={errors.line2 && errors.line2.message}
                size={isXsDown ? "small" : "medium"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <PhoneInputWrapper
                value={phoneValue}
                onChange={onChangePhoneHandler}
                small={isXsDown}
                style={isSmDown && !isXsDown ? { height: "53.63px" } : null}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="country"
                label={t("form_labels.country")}
                fullWidth
                select
                onChange={handleChange}
                value={addressData?.country || ""}
                size={isXsDown ? "small" : "medium"}
              >
                {checkout?.countries?.map((item: Record<string, any>) => (
                  <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                    {item.printable_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={`${t("form_labels.postcode")} *`}
                name="postcode"
                onChange={handleChange}
                value={addressData?.postcode || ""}
                variant="outlined"
                error={!!errors.postcode || !!validateErrors?.postcode}
                helperText={
                  (errors.postcode && errors.postcode.message) ||
                  (!!validateErrors?.postcode && validateErrors.postcode[0])
                }
                size={isXsDown ? "small" : "medium"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={`${t("form_labels.address")} *`}
                name="line1"
                onChange={handleChange}
                value={addressData?.line1 || ""}
                variant="outlined"
                error={!!errors.line1 || !!validateErrors?.line1}
                helperText={
                  (errors.line1 && errors.line1.message) || (!!validateErrors?.line1 && validateErrors.line1[0])
                }
                size={isXsDown ? "small" : "medium"}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Other details"}
                name="details"
                variant="outlined"
                error={!!errors.details || !!validateErrors?.details}
                helperText={
                  (errors.details && errors.details.message) || (!!validateErrors?.details && validateErrors.details[0])
                }
                size={isXsDown ? "small" : "medium"}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button className={appTheme.buttonCreate} type="submit" variant="contained" disabled={isSaving}>
            {isSaving && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
            {isSaving ? t("saving") : t("save_changes")}
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar onClose={handleSnackbarClose} open={showUpdateSuccess} />
    </Card>
  );
};

export default GeneralSettings;
