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
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

const ChatDetails: React.FC<Props> = ({ onCloseDetails, showDetails }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const chatWindowClasses = useChatWindowStyles();
  const isSupplierResponse = false; // constants.id === ID_SUPPLIER_RESPONSE;

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
          <>
            <div className={classes.grid}>
              <div>
                <div className={classes.label}>In stock (Qty):</div>
                <NumberInput name="quantity" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
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
                <NumberInput name="amount_1" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
              </div>
              <div>
                <div className={classes.label}>Unit price ({currency.symbol}):</div>
                <NumberInput name="price_1" variant="outlined" size="small" decimalScale={4} isAllowedZero={false} />
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
                        <NumberInput
                          name={`amount_${index + 1}`}
                          variant="outlined"
                          size="small"
                          decimalScale={0}
                          isAllowedZero={false}
                        />
                      </div>
                      <div>
                        <div className={classes.label}>Unit price ({currency.symbol}):</div>
                        <NumberInput
                          name={`price_${index + 1}`}
                          variant="outlined"
                          size="small"
                          decimalScale={4}
                          isAllowedZero={false}
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
                <TextField name="packaging" variant="outlined" size="small" />
              </div>
              <div>
                <div className={classes.label}>MOQ:</div>
                <NumberInput name="moq" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
              </div>
              <div>
                <div className={classes.label}>MPQ:</div>
                <NumberInput name="mpq" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
              </div>
              <div>
                <div className={classes.label}>Shipping time (days):</div>
                <NumberInput name="leadtime" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
              </div>
            </div>
            <Box p="5px" mt="3px">
              <Button className={clsx(appTheme.buttonCreate, classes.updateButton)} variant="contained">
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
          </>
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
