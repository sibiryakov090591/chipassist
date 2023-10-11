import React, { useEffect, useMemo, useState } from "react";
import {
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  MenuItem,
  Box,
  Hidden,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
// import ReactInputMask from "react-input-mask";
import { SubmitHandler, useForm } from "react-hook-form";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import useAppDispatch from "@src/hooks/useAppDispatch";
import {
  loadProfileInfoThunk,
  newCompanyAddress,
  showUpdateSuccess,
  updateCompanyAddress,
} from "@src/store/profile/profileActions";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import validate from "validate.js";
import { defaultCountry } from "@src/constants/countries";
import formSchema from "@src/utils/formSchema";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import theme from "@src/themes";
import { useStyles } from "../../CompanyAddressStyles";

interface AddressFormProps {
  onClose: () => void;
  changeCurrentPage?: (page: number) => void;
  updateData?: any;
}

type FormValues = {
  name: string;
  first_name: string;
  last_name: string;
  line1: string; // address
  line4: string; // city
  postcode: number;
  country: string;
  phone_number_str: string;
  company_name: string;
};

const AddressForm: React.FC<AddressFormProps> = ({ onClose, changeCurrentPage, updateData }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("profile");

  const isDownKey = useMediaQuery(theme.breakpoints.down("md"));

  const checkout = useAppSelector((state) => state.checkout);
  const addressErrors = useAppSelector((state) => state.profile.profileInfo?.addressErrors);
  const geolocation = useAppSelector((state) => state.profile.geolocation);

  const [pendingMode, setPendingMode] = useState(false);
  const [phoneValue, setPhoneValue] = useState(updateData?.phone_number || updateData?.phone_number_str || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  useEffect(() => {
    if (addressErrors && Object.keys(addressErrors).length) {
      Object.entries(addressErrors).forEach(([i, v]) => {
        setError(i as keyof FormValues, { type: "backend", message: v[0] });
      });
    }
  }, [addressErrors]);

  const schema = useMemo(() => {
    return {
      first_name: formSchema.firstName,
      last_name: formSchema.lastName,
      company_name: formSchema.companyName,
      line4: formSchema.city,
      postcode: formSchema.postcode,
      line1: formSchema.address,
    };
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    // .replace for fixing double plus bug
    // eslint-disable-next-line no-param-reassign
    if (phoneValue) data.phone_number_str = `+${phoneValue.replace(/\+/g, "")}`;
    if (!data.country) {
      // eslint-disable-next-line no-param-reassign
      data.country =
        updateData?.country ||
        (constants?.id !== ID_ICSEARCH &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
        defaultCountry.url;
    }

    const validErrors = validate(data, schema);
    if (validErrors) {
      return Object.entries(validErrors).forEach(([i, v]: any) => {
        setError(i as keyof FormValues, { type: "frontend", message: v[0] });
      });
    }

    setPendingMode(true);
    if (updateData) {
      return dispatch(updateCompanyAddress(updateData.id, data))
        .then((res: any) => {
          setPendingMode(false);
          dispatch(showUpdateSuccess());
          if (res.status < 300) {
            onClose();
            dispatch(loadProfileInfoThunk());
          }
        })
        .catch(() => {
          setPendingMode(false);
        });
    }
    return dispatch(newCompanyAddress(data))
      .then((res: any) => {
        setPendingMode(false);
        dispatch(showUpdateSuccess());
        if (res.status < 300) {
          if (changeCurrentPage) changeCurrentPage(1);
          onClose();
          dispatch(loadProfileInfoThunk());
        }
      })
      .catch(() => {
        setPendingMode(false);
      });
  };

  const onCloseHandler = () => {
    dispatch(loadProfileInfoThunk());
    onClose();
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title={t("company.title")} />
        <Divider />
        <CardContent>
          <Grid container className={classes.gridContainer}>
            <Grid className={classes.gridItem} item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="company_name"
                label={`${t("form_labels.company_name")} *`}
                defaultValue={(updateData && updateData.company_name) || ""}
                fullWidth
                {...register("company_name")}
                error={!!errors.company_name}
                helperText={errors.company_name?.message}
              />
            </Grid>
            <Hidden xsDown>
              <Grid className={classes.gridItem} item md={6} sm={6} xs={12}></Grid>
            </Hidden>
            <Grid className={classes.gridItem} item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="first_name"
                label={`${t("form_labels.first_name")} *`}
                defaultValue={(updateData && updateData.first_name) || ""}
                fullWidth
                {...register("first_name")}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="last_name"
                label={`${t("form_labels.last_name")} *`}
                defaultValue={(updateData && updateData.last_name) || ""}
                fullWidth
                {...register("last_name")}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid className={classes.gridItem} item md={6} sm={6} xs={12}>
              <PhoneInputWrapper
                value={phoneValue}
                onChange={onChangePhoneHandler}
                style={{ margin: 0, height: "53.63px" }}
                small={isDownKey}
              />
            </Grid>
            <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item md={6} sm={6} xs={12}>
              <TextField
                className={classes.selectCountryInput}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="country"
                label={t("form_labels.country")}
                defaultValue={
                  updateData?.country ||
                  (constants?.id !== ID_ICSEARCH &&
                    checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
                  defaultCountry.url
                }
                fullWidth
                select
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {checkout.countries.map((item: Record<string, any>) => (
                  <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                    {item.printable_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className={classes.gridItem} item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="line4"
                label={`${t("form_labels.city")} *`}
                defaultValue={(updateData && updateData.line4) || ""}
                fullWidth
                {...register("line4")}
                error={!!errors.line4}
                helperText={errors.line4?.message}
              />
            </Grid>
            <Grid className={clsx(classes.gridItem, classes.gridItemRightColumn)} item md={6} sm={6} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="postcode"
                label={`${t("form_labels.postcode")} *`}
                defaultValue={(updateData && updateData.postcode) || ""}
                fullWidth
                {...register("postcode")}
                error={!!errors.postcode}
                helperText={errors.postcode?.message}
              />
            </Grid>
            <Grid className={classes.gridItem} item md={12} sm={12} xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="line1"
                label={`${t("form_labels.address")} *`}
                defaultValue={(updateData && updateData.line1) || ""}
                fullWidth
                {...register("line1")}
                error={!!errors.line1}
                helperText={errors.line1?.message}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            disabled={pendingMode}
            onClick={onCloseHandler}
            className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
          >
            {t("company.back")}
          </Button>
          <Button
            disabled={pendingMode}
            className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
            variant="contained"
            type="submit"
          >
            {pendingMode && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
            {pendingMode ? t("company.saving") : t("company.save")}
          </Button>
        </CardActions>
      </form>
    </Box>
  );
};

export default AddressForm;
