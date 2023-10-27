import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, MenuItem, Paper, TextField } from "@material-ui/core";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { defaultCountry } from "@src/constants/countries";
import clsx from "clsx";
import useStyles from "@src/views/chipassist/SellExcess/styles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { SubmitHandler, useForm } from "react-hook-form";
import validate from "validate.js";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  stock: string;
};

export const SellExcessForm: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("sell_excess");
  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);

  const [phoneValue, setPhoneValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = useMemo(
    () => ({
      email: {
        presence: { allowEmpty: false, message: `^${t("how_works.email")} ${t("errors.required")}` },
        email: {
          message: `^${t("errors.email")}`,
        },
      },
      stock: {
        presence: { allowEmpty: false, message: `^${t("how_works.stock")} ${t("errors.required")}` },
      },
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!getValues().country) {
      setValue(
        "country",
        (constants?.id !== ID_ICSEARCH &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
          defaultCountry.url,
      );
    }
  }, [checkout, geolocation]);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    const validErrors = validate(data, schema);
    if (validErrors) {
      return Object.entries(validErrors).forEach(([i, v]: any) => {
        setError(i as keyof FormValues, { type: "frontend", message: v[0] });
      });
    }
    if (!isExample) {
      setIsLoading(true);
      let normalizeData = { ...data };
      if (phoneValue) normalizeData = { ...normalizeData, phone: `+${phoneValue}` };
      if (data.country)
        normalizeData = {
          ...normalizeData,
          country: checkout?.countries?.find((c) => c.url === data.country)?.printable_name,
        };
      return dispatch(sendFeedbackMessageThunk("Sell_excess_stock_request", normalizeData))
        .then(() => {
          setPhoneValue("");
          reset();
          dispatch(showBottomLeftMessageAlertAction({ text: t("alertMessage"), severity: "success" }));
        })
        .finally(() => setIsLoading(false));
    }

    return false;
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "stock") {
      e.target.value = e.target.value.replace(/\D/gi, "");
      if (Number(e.target.value) < 1) e.target.value = "";
    }
    if (name === "email") {
      e.target.value = e.target.value.replace(/\s/gi, "");
    }
    setValue(name, e.target.value);
  };
  return (
    <Paper elevation={3}>
      <Box className={classes.formTitleWrapper}>
        <h3 className={classes.formTitle}>{t("how_works.form_title")}</h3>
      </Box>
      <Box className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("name")}
            label={t("how_works.name")}
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={getValues().name || ""}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
          <TextField
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("email")}
            label={`${t("how_works.email")} *`}
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={getValues().email || ""}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            onChange={onChange}
          />
          <PhoneInputWrapper
            value={phoneValue}
            onChange={onChangePhoneHandler}
            small
            classes={classes.textField}
            style={{ height: "37.63px", margin: 0, marginBottom: "12px" }}
          />
          <TextField
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("country")}
            label={t("how_works.country")}
            variant="outlined"
            fullWidth
            size="small"
            select
            defaultValue={
              (constants?.id !== ID_ICSEARCH &&
                checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url) ||
              defaultCountry.url
            }
          >
            {checkout?.countries?.map((item: Record<string, any>) => (
              <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.url}>
                {item.printable_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("stock")}
            label={`${t("how_works.stock")} *`}
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={getValues().stock || ""}
            error={!!errors.stock?.message}
            helperText={errors.stock?.message}
            onChange={onChange}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={clsx(appTheme.buttonCreate, classes.button)}
            disabled={isLoading}
          >
            {isLoading && <CircularProgress className={classes.progressCircle} size="1.5em" />}
            {t("how_works.button")}
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default SellExcessForm;
