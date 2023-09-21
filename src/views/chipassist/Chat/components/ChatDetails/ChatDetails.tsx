import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
// import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { formatMoney } from "@src/utils/formatters";
import useAppSelector from "@src/hooks/useAppSelector";
import SwipeWrapper from "@src/components/SwipeWrapper/SwipeWrapper";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { useStyles as useChatWindowStyles } from "@src/views/chipassist/Chat/components/ChatWindow/styles";
import { NumberInput } from "@src/components/Inputs";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { MenuItem, Select, FormControl, CircularProgress, useTheme, useMediaQuery, Paper } from "@material-ui/core";
import { Currency } from "@src/store/currency/currencyTypes";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { clearStockErrors, updateStockrecord } from "@src/store/chat/chatActions";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

type FormValues = {
  stock: string;
  lead_time: string;
  packaging: string;
  moq: string;
  mpq: string;
  [key: string]: any;
};

const ChatDetails: React.FC<Props> = ({ onCloseDetails, showDetails }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const chatWindowClasses = useChatWindowStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  const { selectedChat, stockrecordErrors, stockrecordUpdating: isUpdating } = useAppSelector((state) => state.chat);
  const stock = !!selectedChat?.stocks && selectedChat?.stocks[0];
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const quantity = selectedChat?.details?.quantity || selectedChat?.rfq?.quantity;
  const price = selectedChat?.details?.price || selectedChat?.rfq?.price;

  const [isShowPrices, setIsShowPrices] = useState(false);
  const [, setForceRender] = useState(false);
  const [currency, setCurrency] = useState<Currency>({
    symbol: "$",
    code: "USD",
  });

  const [startAnimation, setStartAnimation] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    // setError,
    setValue,
    getValues,
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      stock: "",
      lead_time: "",
      moq: "",
      mpq: "",
      packaging: "",
      prices: { id: { amount: "", price: "" } },
    },
  });

  useEffect(() => {
    dispatch(clearStockErrors());
    setIsShowPrices(false);

    if (stock) {
      setCurrency(currencyList.find((c) => c.code === stock.currency));

      // update overall data
      setValue("stock", stock.num_in_stock);
      setValue("packaging", stock.packaging);
      setValue("moq", stock.moq);
      setValue("mpq", stock.mpq);
      setValue("lead_time", stock.lead_period_str);

      // update prices
      setValue("prices", {}); // reset
      if (stock.prices.length) {
        stock.prices.forEach((i) => {
          setValue(`prices.${i.id}`, { id: i.id, amount: i.amount, price: i.original });
        });
      }
    } else {
      reset();
    }

    setForceRender((prev) => !prev);
  }, [selectedChat]);

  useEffect(() => {
    if (!isXsDown && stockrecordErrors && !startAnimation) {
      setStartAnimation(true);
      setTimeout(() => {
        setStartAnimation(false);
      }, 1500);
    }
  }, [stockrecordErrors]);

  const onCloseHandler = () => {
    const messagesElem = document.getElementById("chat-messages");
    if (messagesElem) messagesElem.style.display = "flex";
    onCloseDetails();
  };

  const onShowPrices = () => {
    setIsShowPrices((prev) => !prev);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(currencyList.find((curr) => curr.code === event.target.value));
  };

  const createPriceBreak = () => {
    // setPriceBreaks((prev) => [...prev, { qty: 1, price: null }]);
    const id = uuidv4();
    setValue("prices", { ...getValues("prices"), [id]: { id, amount: "", price: "" } });
    setForceRender((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const part_number = selectedChat?.title || selectedChat?.rfq?.upc;
    if (!isValid || !part_number) return false;

    const overallData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.includes("prices") && !key.includes("price_")),
    );
    const prices: any = [];
    Object.values(data.prices).forEach((value: any) => {
      if (value.amount && value.price) {
        prices.push({
          amount: value.amount,
          price: value.price,
          ...(typeof value.id === "number" && { id: value.id }), // the price will be updated if id exists, will create a new one if not
        });
      }
    });

    dispatch(
      updateStockrecord(
        {
          [part_number]: {
            ...overallData,
            price: "",
            currency: currency.code,
            prices,
            ...(!!stock && { stock_id: stock?.id }),
          }, // price field is required for the request
        },
        selectedChat?.id,
      ),
    ).then(() => {
      dispatch(
        showBottomLeftMessageAlertAction({
          text: "Your stock has updated successfully!",
          severity: "success",
        }),
      );
    });

    if (stockrecordErrors) dispatch(clearStockErrors());

    // prevent reset form
    await handleSubmit(
      () => false,
      () => false,
    )();
    return false;
  };

  return (
    <SwipeWrapper
      rightSwipeAction={onCloseHandler}
      className={clsx(classes.rightColumn, {
        active: showDetails,
        [classes.animation]: startAnimation,
      })}
    >
      {!isXsDown && !!stockrecordErrors && <Paper className={classes.popper}>Fill out stock data please!</Paper>}
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
        {isSupplierResponse && selectedChat ? (
          <div>
            <h2 className={chatWindowClasses.title}>Your stock on ChipAssist</h2>
            <div className={classes.text}>{selectedChat?.title || selectedChat?.rfq?.upc}</div>
          </div>
        ) : (
          <h2>Details</h2>
        )}
        <CloseIcon className={classes.closeIcon} onClick={onCloseHandler} />
      </Box>

      <div className={classes.details}>
        {isSupplierResponse && selectedChat ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.grid}>
              <div>
                <div className={classes.label}>In stock (Qty):</div>
                <Controller
                  name="stock"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Required",
                    },
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      className={clsx({ [classes.fieldHint]: !!stockrecordErrors?.num_in_stock })}
                      error={errors.stock}
                      helperText={errors.stock?.message}
                      variant="outlined"
                      size="small"
                      decimalScale={0}
                      isAllowedZero={false}
                    />
                  )}
                />
              </div>
              <div>
                <div className={classes.label}>Currency:</div>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select value={currency.code} onChange={handleCurrencyChange}>
                    {currencyList.map((val) => {
                      return (
                        <MenuItem className={appTheme.selectMenuItem} key={val.code} value={val.code}>
                          <div>
                            {val.symbol} {val.code}
                          </div>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              {!!getValues("prices") &&
                Object.keys(getValues("prices"))
                  .slice(0, 1)
                  .map((key, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <div className={classes.label}>Quantity break #{index + 1}:</div>
                          <Controller
                            name={`prices.${key}.amount`}
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Required",
                              },
                              min: {
                                value: 1,
                                message: "At least 1",
                              },
                            }}
                            render={({ field }) => (
                              <NumberInput
                                {...field}
                                value={getValues(`prices.${key}.amount`)}
                                error={errors?.prices && errors.prices[`${key}`]?.amount}
                                helperText={errors?.prices && errors.prices[`${key}`]?.amount?.message}
                                variant="outlined"
                                size="small"
                                decimalScale={0}
                                isAllowedZero={false}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <div className={classes.label}>Unit price ({currency.symbol}):</div>
                          <Controller
                            name={`prices.${key}.price`}
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Required",
                              },
                              min: {
                                value: 0.0001,
                                message: "More than 0",
                              },
                            }}
                            render={({ field }) => (
                              <NumberInput
                                {...field}
                                className={clsx({ [classes.fieldHint]: !!stockrecordErrors?.price })}
                                value={getValues(`prices.${key}.price`)}
                                error={errors?.prices && errors.prices[`${key}`]?.price}
                                helperText={errors?.prices && errors.prices[`${key}`]?.price?.message}
                                variant="outlined"
                                size="small"
                                decimalScale={4}
                                isAllowedZero={false}
                              />
                            )}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
            </div>
            <Box p="5px">
              <Button
                className={clsx(appTheme.buttonPrimary, classes.priceButton)}
                variant="contained"
                onClick={onShowPrices}
              >
                {isShowPrices ? "Hide price breaks" : "Show price breaks"}
                <KeyboardArrowDownIcon className={clsx(classes.priceArrow, { active: isShowPrices })} />
              </Button>
            </Box>
            {isShowPrices && (
              <div className={classes.grid}>
                {!!getValues("prices") &&
                  Object.keys(getValues("prices")).map((key, index) => {
                    if (index === 0) return null;
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <div className={classes.label}>Quantity break #{index + 1}:</div>
                          <Controller
                            name={`prices.${key}.amount`}
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
                                value={getValues(`prices.${key}.amount`)}
                                error={errors?.prices && errors.prices[`${key}`]?.amount}
                                helperText={errors?.prices && errors.prices[`${key}`]?.amount?.message}
                                variant="outlined"
                                size="small"
                                decimalScale={0}
                                isAllowedZero={false}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <div className={classes.label}>Unit price ({currency.symbol}):</div>
                          <Controller
                            name={`prices.${key}.price`}
                            control={control}
                            rules={{
                              min: {
                                value: 0.0001,
                                message: "More than 0",
                              },
                            }}
                            render={({ field }) => (
                              <NumberInput
                                {...field}
                                value={getValues(`prices.${key}.price`)}
                                error={errors?.prices && errors.prices[`${key}`]?.price}
                                helperText={errors?.prices && errors.prices[`${key}`]?.price?.message}
                                variant="outlined"
                                size="small"
                                decimalScale={4}
                                isAllowedZero={false}
                              />
                            )}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                <span
                  style={{ padding: "2px 5px", width: "max-content" }}
                  className={appTheme.hyperlink}
                  onClick={createPriceBreak}
                >
                  Add more
                </span>
              </div>
            )}
            <div className={classes.grid}>
              <div>
                <div className={classes.label}>Packaging:</div>
                <TextField {...register("packaging")} variant="outlined" size="small" />
              </div>
              <div>
                <div className={classes.label}>MOQ:</div>
                <Controller
                  name="moq"
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
                      error={errors.moq}
                      helperText={errors.moq?.message}
                      variant="outlined"
                      size="small"
                      decimalScale={0}
                      isAllowedZero={false}
                    />
                  )}
                />
              </div>
              <div>
                <div className={classes.label}>MPQ:</div>
                <Controller
                  name="mpq"
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
                      error={errors.mpq}
                      helperText={errors.mpq?.message}
                      variant="outlined"
                      size="small"
                      decimalScale={0}
                      isAllowedZero={false}
                    />
                  )}
                />
              </div>
              <div>
                <div className={classes.label}>Shipping time (days):</div>
                <Controller
                  name="lead_time"
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
                      className={clsx({ [classes.fieldHint]: !!stockrecordErrors?.leadTime })}
                      error={errors.lead_time}
                      helperText={errors.lead_time?.message}
                      variant="outlined"
                      size="small"
                      decimalScale={0}
                      isAllowedZero={false}
                    />
                  )}
                />
              </div>
            </div>
            <Box p="5px" mt="3px">
              <Button
                disabled={!isValid || isUpdating}
                type="submit"
                className={clsx(appTheme.buttonCreate, classes.updateButton)}
                variant="contained"
              >
                {isUpdating && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
                Update
              </Button>
            </Box>
            {!!selectedChat?.rfq?.upc && (
              <Box textAlign="center" mt="3px">
                <a
                  className={appTheme.hyperlink}
                  href={`https://chipassist.com/search?query=${encodeURIComponent(selectedChat.rfq.upc)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on ChipAssist
                </a>
              </Box>
            )}
          </form>
        ) : (
          <div className={classes.requestCard}>
            {/* <Box display="flex" alignItems="center" justifyContent="space-between"> */}
            {/*  <h3 className={classes.requestTitle}>Status</h3> */}
            {/*  <Status status={selectedChat ? "Requested" : "Closed"} /> */}
            {/* </Box> */}
            <Box display="flex" justifyContent="space-between" className={classes.requestData}>
              <div>
                <h5>Quantity</h5>
                <div>{quantity ? formatMoney(quantity, 0) : "-"}</div>
              </div>
              <div>
                <h5>Target price</h5>
                <div>{price ? `${formatMoney(price)} €` : "-"}</div>
              </div>
              <div>
                <h5>Total</h5>
                <div>{price ? `${formatMoney(quantity * price)} €` : "-"}</div>
              </div>
            </Box>
          </div>
        )}
      </div>
    </SwipeWrapper>
  );
};

export default ChatDetails;
