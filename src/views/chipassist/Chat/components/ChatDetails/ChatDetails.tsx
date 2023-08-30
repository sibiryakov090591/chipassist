import React from "react";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
// import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { formatMoney } from "@src/utils/formatters";
import useAppSelector from "@src/hooks/useAppSelector";
import SwipeWrapper from "@src/components/SwipeWrapper/SwipeWrapper";
// import constants from "@src/constants/constants";
// import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { useStyles as useChatWindowStyles } from "@src/views/chipassist/Chat/components/ChatWindow/styles";
import { NumberInput } from "@src/components/Inputs";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import { Currency } from "@src/store/currency/currencyTypes";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { updateStockrecord } from "@src/store/chat/chatActions";
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

type FormValues = {
  stock: number;
  lead_time: number;
  packaging: string;
  moq: number;
  mpq: number;
  [key: string]: any;
};

const ChatDetails: React.FC<Props> = ({ onCloseDetails, showDetails }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const chatWindowClasses = useChatWindowStyles();
  const dispatch = useAppDispatch();
  const isSupplierResponse = true; // constants.id === ID_SUPPLIER_RESPONSE;

  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const quantity = selectedChat?.details?.quantity || selectedChat?.rfq?.quantity;
  const price = selectedChat?.details?.price || selectedChat?.rfq?.price;

  const [isShowPrices, setIsShowPrices] = React.useState(false);
  const [currency, setCurrency] = React.useState<Currency>({
    symbol: "$",
    code: "USD",
  });
  const [priceBreaks, setPriceBreaks] = React.useState<{ qty: number; price: number }[]>([
    { qty: 1, price: null },
    { qty: 1, price: null },
  ]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    // setError,
  } = useForm<FormValues>();

  const onCloseHandler = () => {
    const messagesElem = document.getElementById("chat-messages");
    if (messagesElem) messagesElem.style.display = "inherit";
    onCloseDetails();
  };

  const onShowPrices = () => {
    setIsShowPrices((prev) => !prev);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(currencyList.find((curr) => curr.code === event.target.value));
  };

  const createPriceBreak = () => {
    setPriceBreaks((prev) => [...prev, { qty: 1, price: null }]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const part_number = selectedChat?.rfq?.upc;
    if (!isValid || !part_number) return false;

    const result: any = { currency: currency.code, price: data.price_1 };
    const prices: any = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key.includes("amount_") || key.includes("price_")) {
        prices[key] = value;
      } else {
        result[key] = value;
      }
    });

    dispatch(updateStockrecord({ [part_number]: { ...result, prices } }));

    // prevent reset form
    await handleSubmit(
      () => false,
      () => false,
    )();
    return false;
  };

  return (
    <SwipeWrapper rightSwipeAction={onCloseHandler} className={clsx(classes.rightColumn, { active: showDetails })}>
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
        {isSupplierResponse ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.grid}>
              <div>
                <div className={classes.label}>In stock (Qty):</div>
                <Controller
                  name="stock"
                  control={control}
                  defaultValue={""}
                  rules={{
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
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
                  name="amount_1"
                  control={control}
                  defaultValue={""}
                  rules={{
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      error={errors.amount_1}
                      helperText={errors.amount_1?.message}
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
                  name="price_1"
                  control={control}
                  defaultValue={""}
                  rules={{
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      error={errors.price_1}
                      helperText={errors.price_1?.message}
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
            {isShowPrices && priceBreaks.length > 1 && (
              <div className={classes.grid}>
                {priceBreaks.map((item, index) => {
                  if (index === 0) return null;
                  return (
                    <React.Fragment key={index}>
                      <div>
                        <div className={classes.label}>Quantity break #{index + 1}:</div>
                        <Controller
                          name={`amount_${index + 1}`}
                          control={control}
                          defaultValue={""}
                          rules={{
                            min: {
                              value: 1,
                              message: "At least 1",
                            },
                          }}
                          render={({ field }) => (
                            <NumberInput
                              {...field}
                              error={errors[`amount_${index + 1}`]}
                              helperText={errors[`amount_${index + 1}`]?.message}
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
                          name={`price_${index + 1}`}
                          control={control}
                          defaultValue={""}
                          rules={{
                            min: {
                              value: 1,
                              message: "At least 1",
                            },
                          }}
                          render={({ field }) => (
                            <NumberInput
                              {...field}
                              error={errors[`price_${index + 1}`]}
                              helperText={errors[`price_${index + 1}`]?.message}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
                  rules={{
                    min: {
                      value: 1,
                      message: "At least 1",
                    },
                  }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
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
              <Button type="submit" className={clsx(appTheme.buttonCreate, classes.updateButton)} variant="contained">
                Update
              </Button>
            </Box>
            {!!selectedChat?.rfq?.upc && (
              <Box textAlign="center" mt="3px">
                <a
                  className={appTheme.hyperlink}
                  href={`https://chipassist.com/search=${encodeURIComponent(selectedChat.rfq.upc)}`}
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
