import React, { useEffect } from "react";
import { Backdrop, Box, Button, Grid, MenuItem, TextField } from "@material-ui/core";
import { clsx } from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumberInput } from "@src/components/Inputs";
import { defaultCountry } from "@src/constants/countries";
import useAppSelector from "@src/hooks/useAppSelector";
import Modal from "@material-ui/core/Modal";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Fade from "@material-ui/core/Fade";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import useAppTheme from "@src/theme/useAppTheme";
import { getPrice } from "@src/utils/product";
import { formatMoney } from "@src/utils/formatters";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onCloseModal: () => void;
}

type FormValues = {
  company_name: string;
  country: string;
  website: string;
  city: string;
  company_email: string;
  zip_code: string;
  first_name: string;
  last_name: string;
  work_email: string;
  work_phone: string;
  requested_qty: string;
  notes: string;
};

const SendOrderModal: React.FC<Props> = ({ open, onCloseModal }) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const stock = !!selectedChat?.stocks &&
    !!selectedChat?.stocks[0] && {
      ...selectedChat?.stocks[0],
      prices: selectedChat?.stocks[0].prices.map((i) => ({ ...i, price: i.original })),
    };
  const symbol = currencyList.find((curr) => curr.code === stock?.currency)?.symbol;
  const quantity = watch("requested_qty");
  const price = !!stock && !!quantity && getPrice(+quantity, stock as any);
  const totalPrice = !!stock && !!quantity && !!price && quantity * price;

  useEffect(() => {
    if (open) {
      setValue(
        "country",
        checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url || defaultCountry.url,
      );
    } else {
      reset();
    }
  }, [open]);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    if (!isValid) return false;
    return false;
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      className={commonClasses.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <form onSubmit={handleSubmit(onSubmit)} className={clsx(commonClasses.paper, "fullScreen", classes.form)}>
          <h3>Company</h3>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Controller
                name="company_name"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Company name:"
                    error={!!errors.company_name}
                    helperText={errors.company_name?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="country"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="country"
                    label="Country:"
                    fullWidth
                    size="small"
                    select
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    {checkout.countries.map((item: Record<string, any>) => (
                      <MenuItem key={item.url} value={item.url}>
                        {item.printable_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="website"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Website:"
                    error={!!errors.website}
                    helperText={errors.website?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="city"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="City:"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="company_email"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Company email:"
                    error={!!errors.company_email}
                    helperText={errors.company_email?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="zip_code"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Postal code:"
                    error={!!errors.zip_code}
                    helperText={errors.zip_code?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <h3>Contact person</h3>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Controller
                name="first_name"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="First name:"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="last"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Last name:"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="work_email"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Work email:"
                    error={!!errors.work_email}
                    helperText={errors.work_email?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="work_phone"
                control={control}
                // rules={{
                //   min: {
                //     value: 1,
                //     message: "At least 1",
                //   },
                // }}
                render={({ field }) => <PhoneInputWrapper {...field} label="Work phone:" small={true} />}
              />
            </Grid>
          </Grid>

          <h3>Product</h3>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className={classes.label}>MPN:</div>
              <div className={classes.value}>{stock?.upc || "-"}</div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.label}>Unit price:</div>
              <div className={classes.value}>{(price && `${formatMoney(price)}${symbol}`) || "-"}</div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.label}>Date code (DC):</div>
              <div className={classes.value}>
                {(stock?.partner_sku?.includes("datecode:") && stock.partner_sku.split(":")[1]) || "-"}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.label}>Packaging:</div>
              <div className={classes.value}>{stock?.packaging || "-"}</div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="requested_qty"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: "At least 1",
                  },
                }}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Requested quantity:"
                    error={!!errors.requested_qty}
                    helperText={errors.requested_qty?.message}
                    variant="outlined"
                    size="small"
                    decimalScale={0}
                    isAllowedZero={false}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.label}>Expected total:</div>
              <div className={classes.value}>{(totalPrice && `${formatMoney(totalPrice)}${symbol}`) || "-"}</div>
            </Grid>
          </Grid>

          <h3>Additional notes:</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: "At least 1",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                    label="Delivery terms etc."
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={2} className={commonClasses.actionsRow}>
            <Button variant="contained" className={appTheme.buttonPrimary} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" className={appTheme.buttonCreate}>
              Send
            </Button>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
};

export default SendOrderModal;
