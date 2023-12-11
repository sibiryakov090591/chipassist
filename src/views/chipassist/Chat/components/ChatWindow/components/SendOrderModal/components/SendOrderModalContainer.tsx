import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Box, Button, Grid, MenuItem, TextField } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import { formatMoney } from "@src/utils/formatters";
import { NumberInput } from "@src/components/Inputs";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "@src/views/chipassist/Chat/components/ChatWindow/components/SendOrderModal/styles";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { getPrice, getStockDataCode } from "@src/utils/product";
import { defaultCountry } from "@src/constants/countries";
import { Address } from "@src/store/profile/profileTypes";
import { loadProfileInfoThunk, updateCompanyAddress } from "@src/store/profile/profileActions";
import { previewOrderPdf, sendMessage } from "@src/store/chat/chatActions";
import { ChatListStock } from "@src/store/chat/chatTypes";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import useCurrency from "@src/hooks/useCurrency";

type FormValues = {
  company_name: string;
  first_name: string;
  last_name: string;
  country: string;
  line1: string; // address
  line4: string; // city
  postcode: string;
  phone_number_str: string;
  quantity: string;
  additional_notes: string;
};

export const SendOrderModalContainer: React.FC<{
  open: boolean;
  stock: ChatListStock;
  onCloseModal: () => void;
  setIsSending: any;
  isExample?: boolean;
  pageNum?: any;
}> = ({ open, stock, onCloseModal, setIsSending, isExample, pageNum }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const { currency, currencyPrice } = useCurrency();

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const rfq = useAppSelector((state) => state.chat.selectedChat?.rfq);
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const billingAddress = profileInfo?.defaultBillingAddress;

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      country:
        (billingAddress?.country &&
          checkout?.countries?.find((c) => c.url.includes(billingAddress.country.split("/api/")[1]))?.url) ||
        (geolocation?.country_code_iso3 &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
        defaultCountry.url,
    },
  });

  // const symbol = currencyList.find((curr) => curr.code === stock?.currency)?.symbol;
  const quantity = watch("quantity");
  const price = !!stock && !!quantity && currencyPrice(getPrice(+quantity, stock as any), stock?.currency);
  const totalPrice = !!stock && !!quantity && !!price && quantity * price;

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (open) {
      reset();
      setStep(1);

      setValue("company_name", billingAddress?.company_name || "");
      setValue("first_name", billingAddress?.first_name || "");
      setValue("last_name", billingAddress?.last_name || "");
      setValue("phone_number_str", billingAddress?.phone_number_str || "");
      setValue("line4", billingAddress?.line4 || "");
      setValue("postcode", billingAddress?.postcode || "");
      setValue("line1", billingAddress?.line1 || "");
      setValue("quantity", rfq?.quantity || "");
    }
  }, [open, billingAddress]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (!isValid || isExample) return false;

    setIsSending(true);
    onCloseModal();
    if (billingAddress) {
      const companyData = Object.fromEntries(
        Object.entries(data).filter(([key]) => Object.prototype.hasOwnProperty.call(billingAddress, key)),
      );
      let companyDataWasChanged = false;
      Object.entries(companyData).forEach(([key, val]) => {
        if (!companyDataWasChanged && val !== billingAddress[key as keyof Address]) {
          companyDataWasChanged = true;
        }
      });
      if (companyDataWasChanged) {
        await dispatch(updateCompanyAddress(billingAddress.id, companyData)).then(() =>
          dispatch(loadProfileInfoThunk()),
        );
      }
    }
    const orderData = {
      ...data,
      price,
      totalPrice,
      stockrecord: stock,
      mpn: rfq?.upc || stock?.upc,
      datecode: getStockDataCode(stock),
      ...(!!currency?.code && { currency: currency.code }),
    };
    return dispatch(sendMessage(selectedChat.id, "''", orderData)).finally(() => setIsSending(false));
  };

  const goToStep = (direction: "next" | "prev") => async () => {
    if (direction === "next" && !(await trigger())) return false;
    return setStep(direction === "next" ? 2 : 1);
  };

  const onOpenPreviewPdf = () => {
    if (!selectedChat?.id) return null;
    const data = {
      po: {
        mpn: selectedChat?.title,
        line1: getValues("line1"),
        line4: getValues("line4"),
        price,
        country: getValues("country"),
        datecode: getStockDataCode(stock),
        postcode: getValues("postcode"),
        last_name: getValues("last_name"),
        first_name: getValues("first_name"),
        totalPrice,
        // stockrecord: stock,
        company_name: getValues("company_name"),
        quantity,
        additional_notes: getValues("additional_notes"),
        phone_number_str: getValues("phone_number_str") && `+${getValues("phone_number_str").replace(/[+]/g, "")}`,
        ...(!!currency?.code && { currency: currency.code }),
      },
    };
    return dispatch(previewOrderPdf(selectedChat.id, data));
  };

  const onSubmitHandler = () => handleSubmit(onSubmit)();

  return (
    <div className={isExample ? clsx(commonClasses.paper, "fullScreen") : commonClasses.displayContents}>
      <form className={classes.form}>
        <div>
          {(isExample ? pageNum : step) === 1 && (
            <>
              <h3 style={{ marginBottom: 20 }}>Company</h3>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Controller
                    name="company_name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Company name is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Company name *"
                        error={!!errors.company_name}
                        helperText={errors.company_name?.message}
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
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: "Work phone is required",
                    //   },
                    // }}
                    render={({ field }) => (
                      <PhoneInputWrapper
                        {...field}
                        label="Work phone"
                        small={true}
                        style={{ height: "37.63px", margin: 0 }}
                        // error={!!errors.phone_number_str}
                        // helperText={errors.phone_number_str?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="First name *"
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
                    rules={{
                      required: {
                        value: true,
                        message: "Last name is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Last name *"
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
                    name="country"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Country is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={getValues("country")}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="country"
                        label="Country *"
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
                    rules={{
                      required: {
                        value: true,
                        message: "City is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="City *"
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
                    rules={{
                      required: {
                        value: true,
                        message: "Postal code is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Postal code *"
                        error={!!errors.postcode}
                        helperText={errors.postcode?.message}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Controller
                    name="line1"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Address *"
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
            </>
          )}

          {(isExample ? pageNum : step) === 2 && (
            <>
              <h3>Product</h3>
              <Grid container spacing={2} className={classes.productCard}>
                <Grid item xs={6}>
                  <div className={classes.label}>MPN:</div>
                  <div className={classes.value}>{stock?.upc || "-"}</div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>Unit price:</div>
                  <div className={classes.value}>{(price && `${currency?.symbol}${formatMoney(price)}`) || "-"}</div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>Date code (DC):</div>
                  <div className={classes.value}>{getStockDataCode(stock) || "-"}</div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>Packaging:</div>
                  <div className={classes.value}>{stock?.packaging || "-"}</div>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <div className={classes.label}>Requested qty *</div>
                    <Controller
                      name="quantity"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Qty is required",
                        },
                        min: {
                          value: stock?.moq || 1,
                          message: stock?.moq ? `MOQ is ${stock.moq}` : "At least 1",
                        },
                        ...(!!stock?.num_in_stock && {
                          max: {
                            value: stock.num_in_stock,
                            message: `In stock ${stock.num_in_stock} pcs.`,
                          },
                        }),
                      }}
                      render={({ field }) => (
                        <NumberInput
                          {...field}
                          // InputLabelProps={{
                          //   shrink: true,
                          // }}
                          // label="Requested qty:"
                          className={classes.qtyInput}
                          error={!!errors.quantity}
                          helperText={errors.quantity?.message}
                          variant="outlined"
                          size="small"
                          decimalScale={0}
                          isAllowedZero={false}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>Expected total:</div>
                  <div className={classes.value}>
                    {(totalPrice && `${currency?.symbol}${formatMoney(totalPrice)}`) || "-"}
                  </div>
                </Grid>
              </Grid>

              <h3>Additional notes:</h3>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="additional_notes"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        label="Delivery terms etc."
                        variant="outlined"
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="space-between" alignItems="center" mt="16px">
                <Box display="flex" alignItems="center">
                  <h3 style={{ margin: "0 12px 0 0" }}>Order currency:</h3>
                  <FilterCurrency className={classes.currencyButton} />
                </Box>
                <span onClick={onOpenPreviewPdf} className={appTheme.hyperlink}>
                  Preview PDF
                </span>
              </Box>
            </>
          )}
        </div>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>{step} / 2</Box>
          <Box mt={2} minWidth="70%" className={commonClasses.actionsRow}>
            <Button
              variant="contained"
              className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
              onClick={step <= 1 ? onCloseModal : goToStep("prev")}
            >
              {step <= 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={step >= 2 ? onSubmitHandler : goToStep("next")}
              variant="contained"
              className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
            >
              {step >= 2 ? "Send" : "Next"}
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default SendOrderModalContainer;
