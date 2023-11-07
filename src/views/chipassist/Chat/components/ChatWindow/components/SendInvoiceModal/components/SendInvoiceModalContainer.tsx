import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Box, Button, Divider, Grid, MenuItem, TextField } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import AddressData from "@src/views/chipassist/Chat/components/ChatWindow/components/SendInvoiceModal/components/AddressData/AddressData";
import { getPrice, getStockDataCode } from "@src/utils/product";
import { formatMoney } from "@src/utils/formatters";
import { NumberInput } from "@src/components/Inputs";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "@src/views/chipassist/Chat/components/ChatWindow/components/SendOrderModal/styles";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import useAppTheme from "@src/theme/useAppTheme";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { defaultCountry } from "@src/constants/countries";
import { SellerProfileInfo } from "@src/store/sellerProfile/sellerProfileTypes";
import {
  getPartnerInfo,
  loadProfileInfoThunk,
  saveNewPartnerInfo,
  updateProfileInfoThunk,
} from "@src/store/profile/profileActions";
import { previewOrderPdf, sendMessage } from "@src/store/chat/chatActions";

type FormValues = {
  company_name: string;
  first_name: string;
  last_name: string;
  country: string;
  address: string; // address
  city: string; // city
  postcode: string;
  phone: string;
  additional_notes: string;
  shipping_notes: string;
  shipping_fee: string;
};

export const SendInvoiceModalContainer: React.FC<{
  isExample?: boolean;
  open: boolean;
  stock: any;
  onCloseModal: any;
  setIsSending: any;
  pageNum?: number;
}> = ({ open, stock, onCloseModal, setIsSending, isExample, pageNum }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const previewDisabled = constants.apiHost !== "api.camaster.site";

  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const rfq = useAppSelector((state) => state.chat.selectedChat?.rfq);

  const { profileInfo, partnerProfile, selectedPartner } = useAppSelector((state) => state.profile);
  const billingAddress = partnerProfile;
  const purchaseOrder: any = isExample
    ? null
    : selectedChat?.details?.po && Object.values(selectedChat?.details?.po)[0];

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
  });

  const shippingFee = watch("shipping_fee");
  const currency = currencyList.find((curr) => curr.code === stock?.currency)?.code;
  const quantity = purchaseOrder?.quantity || purchaseOrder?.requested_qty || rfq?.quantity || 0;
  const unitPrice = !!stock && !!quantity && getPrice(+quantity, stock as any);
  const outPrice = !!unitPrice && quantity * unitPrice;
  const totalPrice = !!outPrice && outPrice + Number(shippingFee || 0);

  const shippingTypes = [
    "EXW - Ex-Works",
    "FCA - Free to Carrier",
    "FAS - Free Alongside Ship",
    "FOB - Free On Board",
    "CFR - Cost and Freight",
    "CIF - Cost, Insurance and Freight",
    "CPT - Carriage Paid To",
    "CIP - Carriage And Insurance Paid To",
    "DAP - Delivered At Place",
    "DPU - Delivered At Place Unloaded",
    "DDP - Delivered Duty Paid",
  ];

  const [step, setStep] = useState(pageNum || 1);

  useEffect(() => {
    if (open) {
      reset();
      if (!isExample) {
        setStep(1);
      }

      setValue("company_name", billingAddress?.company_name || "");
      setValue("first_name", profileInfo?.firstName || "");
      setValue("last_name", profileInfo?.lastName || "");
      setValue("phone", billingAddress?.phone || "");
      setValue(
        "country",
        (billingAddress?.country &&
          checkout?.countries?.find((c) => c.iso_3166_1_a3 === billingAddress?.country)?.url) ||
          (geolocation?.country_code_iso3 &&
            checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation.country_code_iso3)?.url) ||
          defaultCountry.url,
      );
      setValue("city", billingAddress?.city || "");
      setValue("postcode", billingAddress?.postcode || "");
      setValue("address", billingAddress?.address || "");
      setValue("shipping_fee", 0);
      setValue("shipping_notes", shippingTypes[0]);
    }
  }, [open, billingAddress]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (!isValid || !selectedPartner) return false;

    if (!isExample) {
      setIsSending(true);
      onCloseModal();
      if (billingAddress) {
        const companyData = Object.fromEntries(
          Object.entries(data).filter(([key]) => Object.prototype.hasOwnProperty.call(billingAddress, key)),
        );
        let companyDataWasChanged = false;
        Object.entries(companyData).forEach(([key, val]) => {
          if (!companyDataWasChanged && val !== billingAddress[key as keyof SellerProfileInfo]) {
            companyDataWasChanged = true;
          }
        });
        if (companyDataWasChanged) {
          await dispatch(saveNewPartnerInfo(selectedPartner.id, companyData)).then(() => {
            dispatch(getPartnerInfo(selectedPartner.id));
          });
          await dispatch(updateProfileInfoThunk({ first_name: data.first_name, last_name: data.last_name })).then(
            () => {
              dispatch(loadProfileInfoThunk());
            },
          );
        }
      }
      const orderData = {
        company_name: data.company_name,
        first_name: data.first_name,
        last_name: data.last_name,
        postcode: data.postcode,
        phone_number_str: data.phone && `+${data.phone.replace(/[+]/g, "")}`,
        quantity,
        additional_notes: data.additional_notes,
        shipping_notes: data.shipping_notes,
        shipping_fee: data.shipping_fee,
        line1: data.address,
        line4: data.city,
        country: checkout?.countries?.find((c) => c.url === data.country)?.url || "",
        price: unitPrice,
        totalPrice: outPrice,
        stockrecord: stock,
        mpn: rfq?.upc || stock?.upc,
        datecode: getStockDataCode(stock),
        purchase_order: purchaseOrder,
      };
      return dispatch(sendMessage(selectedChat.id, "''", orderData, "invoice")).finally(() => setIsSending(false));
    }
    return false;
  };

  const goToStep = (direction: "next" | "prev") => async () => {
    if (direction === "next" && !(await trigger())) return false;
    return setStep((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const onOpenPreviewPdf = () => {
    if (!selectedChat?.id) return null;
    const data = {
      invoice: {
        mpn: selectedChat?.title,
        line1: getValues("address"),
        line4: getValues("city"),
        price: unitPrice,
        country: getValues("country"),
        datecode: getStockDataCode(stock),
        postcode: getValues("postcode"),
        last_name: getValues("last_name"),
        first_name: getValues("first_name"),
        totalPrice: outPrice,
        stockrecord: stock,
        company_name: getValues("company_name"),
        quantity: purchaseOrder?.quantity,
        additional_notes: getValues("additional_notes"),
        phone_number_str: getValues("phone") && `+${getValues("phone").replace(/[+]/g, "")}`,
        shipping_notes: getValues("shipping_notes"),
        shipping_fee: getValues("shipping_fee"),
      },
    };
    return dispatch(previewOrderPdf(selectedChat.id, data));
  };

  const onSubmitHandler = () => handleSubmit(onSubmit)();

  return (
    <div className={clsx(commonClasses.paper, "fullScreen")}>
      <form style={{ minHeight: 600 }} className={classes.form}>
        <div>
          {step === 1 && (
            <>
              <h3 style={{ marginBottom: 20 }}>Company</h3>
              <Grid container spacing={2}>
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
                    name="phone"
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
                        // error={!!errors.phone}
                        // helperText={errors.phone?.message}
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
                    name="city"
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
                        error={!!errors.city}
                        helperText={errors.city?.message}
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
                    name="address"
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
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <h3>Buyer details</h3>
              <AddressData item={purchaseOrder} />
            </>
          )}

          {step === 2 && (
            <>
              <h3>Product</h3>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div className={classes.label}>MPN:</div>
                  <div className={classes.value}>{stock?.upc || "-"}</div>
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
                    <div className={classes.label}>Quantity:</div>
                    <div className={classes.value}>{quantity || "-"}</div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>{`Unit price (${currency}):`}</div>
                  <div className={classes.value}>{(unitPrice && formatMoney(unitPrice)) || "-"}</div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.label}>{`Out price (${currency}):`}</div>
                  <div className={classes.value}>{(outPrice && formatMoney(outPrice)) || "-"}</div>
                </Grid>
              </Grid>

              <Divider className={classes.divider} />

              <h3>Shipping:</h3>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box>
                    <div className={classes.label}>Shipping type: *</div>
                    <Controller
                      name="shipping_notes"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} className={classes.invoiceInput} variant="outlined" size="small" select>
                          {shippingTypes.map((type) => {
                            return (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <div className={classes.label}>{`Shipping cost (${currency}): *`}</div>
                    <Controller
                      name="shipping_fee"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Shipping cost is required",
                        },
                      }}
                      render={({ field }) => (
                        <NumberInput
                          {...field}
                          error={!!errors.shipping_fee}
                          helperText={errors.shipping_fee?.message}
                          variant="outlined"
                          size="small"
                          decimalScale={4}
                          isAllowedZero={true}
                        />
                      )}
                    />
                  </Box>
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

              <Divider className={classes.divider} />

              <h3>
                <Box display="flex" justifyContent="space-between">
                  <span>{`Total Amount Payable (${currency}):`}</span>
                  <span>{totalPrice ? formatMoney(totalPrice) : "-"}</span>
                </Box>
              </h3>

              {!previewDisabled && (
                <Box display="flex" justifyContent="flex-end">
                  <span onClick={onOpenPreviewPdf} className={appTheme.hyperlink}>
                    Preview PDF
                  </span>
                </Box>
              )}
            </>
          )}
        </div>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>{step} / 2</Box>
          <Box mt={2} minWidth="70%" className={commonClasses.actionsRow}>
            <Button
              variant="contained"
              className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
              onClick={isExample ? null : step <= 1 ? onCloseModal : goToStep("prev")}
            >
              {step <= 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={isExample ? onSubmitHandler : step >= 2 ? onSubmitHandler : goToStep("next")}
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

export default SendInvoiceModalContainer;
