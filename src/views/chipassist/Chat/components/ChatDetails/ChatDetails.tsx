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
import { getStockDataCode } from "@src/utils/product";
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

type FormValues = {
  stock: string;
  datecode: string;
  packaging: string;
  moq: string;
  mpq: string;
  prices: { id: any; price: string; amount: string }[];
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

  const [prevChatId, setPrevChatId] = useState<number>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isShowPrices, setIsShowPrices] = useState(false);
  const [, setForceRender] = useState(false);
  const [currency, setCurrency] = useState<Currency>({
    symbol: "$",
    code: "USD",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // setError,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      stock: "",
      datecode: "",
      moq: "",
      mpq: "",
      packaging: "",
      prices: [{ id: "", amount: "", price: "" }],
    },
  });

  const priceBreaks = watch("prices");
  const stockUpdatingMode = isSupplierResponse && !!selectedChat && !!stock;

  useEffect(() => {
    if (selectedChat && selectedChat.id !== prevChatId) {
      reset();

      if (stock) {
        // update prices
        if (stock.prices?.length && stock.prices.some((i) => !!i.original && !!i.amount)) {
          setValue(
            "prices",
            [...stock.prices]
              .sort((a, b) => a.amount - b.amount)
              .map((i) => ({ id: i.id, amount: i.amount, price: i.original })),
          );
        }

        // update overall data
        if (Number(stock.num_in_stock)) setValue("stock", stock.num_in_stock);
        if (stock.packaging) setValue("packaging", stock.packaging);
        if (Number(stock.moq)) setValue("moq", stock.moq);
        if (Number(stock.mpq)) setValue("mpq", stock.mpq);
        if (stock.partner_sku.includes("datecode:")) {
          setValue("datecode", getStockDataCode(stock) || "");
        }

        setCurrency((prev) => currencyList.find((c) => c.code === stock.currency) || prev);
      }
      dispatch(clearStockErrors());
      setIsShowPrices(false);
      setPrevChatId(selectedChat.id);
    }
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
    setValue("prices", [...getValues("prices").sort((a: any, b: any) => (a.amount ? a.amount - b.amount : 1))]);
    setIsShowPrices((prev) => !prev);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(currencyList.find((curr) => curr.code === event.target.value));
  };

  const createPriceBreak = () => {
    const id = uuidv4();
    setValue("prices", [...getValues("prices"), { id, amount: "", price: "" }]);
    setForceRender((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const part_number = selectedChat?.title || selectedChat?.rfq?.upc;
    const overallData = Object.fromEntries(Object.entries(data).filter(([key]) => key !== "prices"));
    const prices: any = [];
    data.prices.forEach((value) => {
      if (value.amount && value.price) {
        prices.push({
          amount: value.amount,
          price: value.price,
          ...(typeof value.id === "number" && { id: value.id }), // the price will be updated if id exists, will create a new one if not
        });
      }
    });

    const result = {
      ...overallData,
      price: "", // price field is required for the request
      currency: currency.code,
      prices,
      ...(!!stock && { stock_id: stock?.id }),
    };

    dispatch(
      updateStockrecord(
        {
          [part_number]: result,
        },
        selectedChat?.id,
      ),
    ).then(() => {
      dispatch(
        showBottomLeftMessageAlertAction({
          text: "Your stock was updated successfully!",
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
      {!isXsDown && !!stockrecordErrors && <Paper className={classes.popper}>Update stock data please!</Paper>}
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
        {stockUpdatingMode ? (
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
        {stockUpdatingMode ? (
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
                      className={clsx(classes.input, { [classes.fieldHint]: !!stockrecordErrors?.num_in_stock })}
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
              <div>
                <div className={classes.label}>Quantity break #1:</div>
                <Controller
                  name={`prices[0].amount`}
                  control={control}
                  rules={{
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                    required: {
                      value: !!priceBreaks[0].price,
                      message: "Required",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      className={clsx(classes.input, { [classes.fieldHint]: !!stockrecordErrors?.price })}
                      value={getValues("prices")[0].amount}
                      error={errors?.prices && errors.prices[0]?.amount}
                      helperText={errors?.prices && errors.prices[0]?.amount?.message}
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
                  name={`prices[0].price`}
                  control={control}
                  rules={{
                    min: {
                      value: 0.0001,
                      message: "More than 0",
                    },
                    required: {
                      value: !!priceBreaks[0].amount,
                      message: "Required",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      className={clsx(classes.input, { [classes.fieldHint]: !!stockrecordErrors?.price })}
                      value={getValues("prices")[0].price}
                      error={errors?.prices && errors.prices[0]?.price}
                      helperText={errors?.prices && errors.prices[0]?.price?.message}
                      variant="outlined"
                      size="small"
                      decimalScale={4}
                      isAllowedZero={false}
                    />
                  )}
                />
              </div>
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
                  getValues("prices").map((item: any, index: number) => {
                    if (index === 0) return null;
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <div className={classes.label}>Quantity break #{index + 1}:</div>
                          <Controller
                            name={`prices[${index}].amount`}
                            control={control}
                            rules={{
                              min: {
                                value: 1,
                                message: "At least 1",
                              },
                              required: {
                                value: !!priceBreaks[index].price,
                                message: "Required",
                              },
                            }}
                            render={({ field }) => (
                              <NumberInput
                                {...field}
                                className={classes.input}
                                value={item.amount}
                                error={errors?.prices && errors.prices[index]?.amount}
                                helperText={errors?.prices && errors.prices[index]?.amount?.message}
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
                            name={`prices[${index}].price`}
                            control={control}
                            rules={{
                              min: {
                                value: 0.0001,
                                message: "More than 0",
                              },
                              required: {
                                value: !!priceBreaks[index].amount,
                                message: "Required",
                              },
                            }}
                            render={({ field }) => (
                              <NumberInput
                                {...field}
                                className={classes.input}
                                value={item.price}
                                error={errors?.prices && errors.prices[index]?.price}
                                helperText={errors?.prices && errors.prices[index]?.price?.message}
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
                <div className={classes.label}>Date Code (DC):</div>
                <TextField {...register("datecode")} variant="outlined" size="small" fullWidth />
              </div>
              <div>
                <div className={classes.label}>Packaging:</div>
                <TextField {...register("packaging")} variant="outlined" size="small" fullWidth />
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
                      className={classes.input}
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
                      className={classes.input}
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
            </div>
            <Box p="5px" mt="3px">
              <Button
                disabled={isUpdating || !stock}
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
