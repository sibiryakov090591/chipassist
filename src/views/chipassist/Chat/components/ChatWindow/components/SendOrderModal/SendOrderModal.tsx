import React, { useEffect } from "react";
import { Backdrop, Box, Button, Grid, Hidden, MenuItem, TextField } from "@material-ui/core";
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
import { loadProfileInfoThunk, updateCompanyAddress } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendMessage } from "@src/store/chat/chatActions";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onCloseModal: () => void;
  setIsSending: any;
}

type FormValues = {
  company_name: string;
  first_name: string;
  last_name: string;
  country: string;
  line1: string; // address
  line4: string; // city
  postcode: string;
  phone_number_str: string;
  requested_qty: string;
  additional_notes: string;
};

const SendOrderModal: React.FC<Props> = ({ open, onCloseModal, setIsSending }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const rfq = useAppSelector((state) => state.chat.selectedChat?.rfq);

  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const billingAddress = React.useMemo(() => [...profileInfo?.addresses].sort((a, b) => a.id - b.id)[0], [profileInfo]);

  const {
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
      setValue("company_name", billingAddress?.company_name || "");
      setValue("first_name", billingAddress?.first_name || "");
      setValue("last_name", billingAddress?.last_name || "");
      setValue("phone_number_str", billingAddress?.phone_number_str || "");
      setValue(
        "country",
        (billingAddress?.country &&
          checkout?.countries?.find((c) => c.url.includes(billingAddress.country.split("/api/")[1]))?.url) ||
          (geolocation?.country_code_iso3 &&
            checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
          defaultCountry.url,
      );
      setValue("line4", billingAddress?.line4 || "");
      setValue("postcode", billingAddress?.postcode || "");
      setValue("line1", billingAddress?.line1 || "");
      setValue("requested_qty", rfq?.quantity || "");
    }
  }, [open, billingAddress]);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (!isValid) return false;

    setIsSending(true);
    if (billingAddress) {
      const companyData = Object.fromEntries(
        Object.entries(data).filter(([key]) => Object.prototype.hasOwnProperty.call(billingAddress, key)),
      );
      let companyDataWasChanged = false;
      Object.entries(companyData).forEach(([key, val]) => {
        if (!companyDataWasChanged && val !== billingAddress[key]) {
          companyDataWasChanged = true;
        }
      });
      if (companyDataWasChanged) {
        dispatch(updateCompanyAddress(billingAddress.id, companyData)).then(() => dispatch(loadProfileInfoThunk()));
      }
    }
    const orderData = {
      ...data,
      price,
      totalPrice,
      stockrecord: stock,
      mpn: rfq?.upc || stock?.upc,
      datecode: (stock?.partner_sku?.includes("datecode:") && stock.partner_sku.split(":")[1]) || null,
    };
    dispatch(sendMessage(selectedChat.id, "''", orderData)).finally(() => setIsSending(false));
    onCloseModal();

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
            <Grid item sm={6} xs={12}>
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
            <Hidden xsDown>
              <Grid item sm={6} xs={12}></Grid>
            </Hidden>
            <Grid item sm={6} xs={12}>
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
            <Grid item sm={6} xs={12}>
              <Controller
                name="last_name"
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
            <Grid item sm={6} xs={12}>
              <Controller
                name="phone_number_str"
                control={control}
                render={({ field }) => (
                  <PhoneInputWrapper
                    {...field}
                    label="Work phone:"
                    small={true}
                    style={{ height: "37.63px", margin: 0 }}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
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
            <Grid item sm={6} xs={12}>
              <Controller
                name="line4"
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
                    error={!!errors.line4}
                    helperText={errors.line4?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Controller
                name="postcode"
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
                    error={!!errors.postcode}
                    helperText={errors.postcode?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="line1"
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
                    label="Address:"
                    error={!!errors.line1}
                    helperText={errors.line1?.message}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <h3>Product</h3>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className={classes.label}>MPN:</div>
              <div className={classes.value}>{stock?.upc || "-"}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.label}>Unit price:</div>
              <div className={classes.value}>{(price && `${formatMoney(price)}${symbol}`) || "-"}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.label}>Date code (DC):</div>
              <div className={classes.value}>
                {(stock?.partner_sku?.includes("datecode:") && stock.partner_sku.split(":")[1]) || "-"}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.label}>Packaging:</div>
              <div className={classes.value}>{stock?.packaging || "-"}</div>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <div className={classes.label}>Expected total:</div>
              <div className={classes.value}>{(totalPrice && `${formatMoney(totalPrice)}${symbol}`) || "-"}</div>
            </Grid>
          </Grid>

          <h3>Additional notes:</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="additional_notes"
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
                    error={!!errors.additional_notes}
                    helperText={errors.additional_notes?.message}
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
