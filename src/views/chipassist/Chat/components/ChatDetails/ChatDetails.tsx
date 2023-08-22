import React from "react";
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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

const ChatDetails: React.FC<Props> = ({ onCloseDetails, showDetails }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const chatWindowClasses = useChatWindowStyles();
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  const selectedChat = useAppSelector((state) => state.chat.selectedChat);

  const quantity = selectedChat?.details?.quantity || selectedChat?.rfq?.quantity;
  const price = selectedChat?.details?.price || selectedChat?.rfq?.price;

  const [isShowPrices, setIsShowPrices] = React.useState(false);

  const onCloseHandler = () => {
    const messagesElem = document.getElementById("chat-messages");
    if (messagesElem) messagesElem.style.display = "inherit";
    onCloseDetails();
  };

  const onShowPrices = () => {
    setIsShowPrices((prev) => !prev);
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
        <CloseIcon className={classes.closeIcon} onClick={onCloseDetails} />
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
                <div className={classes.label}>Unit price ($): USD</div>
                <NumberInput name="price" variant="outlined" size="small" decimalScale={4} isAllowedZero={false} />
              </div>
              <div>
                <div className={classes.label}>Date code (DC):</div>
                <TextField name="datecode" variant="outlined" size="small" />
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
                <div>
                  <div className={classes.label}>Quantity break #1:</div>
                  <NumberInput name="amount_1" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
                </div>
                <div>
                  <div className={classes.label}>Unit price ($):</div>
                  <NumberInput name="price_1" variant="outlined" size="small" decimalScale={4} isAllowedZero={false} />
                </div>
                <div>
                  <div className={classes.label}>Quantity break #2:</div>
                  <NumberInput name="amount_2" variant="outlined" size="small" decimalScale={0} isAllowedZero={false} />
                </div>
                <div>
                  <div className={classes.label}>Unit price ($):</div>
                  <NumberInput name="price_2" variant="outlined" size="small" decimalScale={4} isAllowedZero={false} />
                </div>
              </div>
            )}
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
