import React, { useEffect, useRef, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendMessage, sendFiles, getMessages, setStockError } from "@src/store/chat/chatActions";
import ScrollToBottom from "@src/views/chipassist/Chat/components/ChatWindow/components/ScrollToBottom/ScrollToBottom";
import useAppSelector from "@src/hooks/useAppSelector";
import Box from "@material-ui/core/Box";
import UploadFilesModal from "@src/views/chipassist/Chat/components/ChatWindow/components/UploadFilesModal/UploadFilesModal";
import { useDropzone } from "react-dropzone";
import { v1 } from "uuid";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import Hidden from "@material-ui/core/Hidden";
import { clsx } from "clsx";
import constants from "@src/constants/constants";
import { ID_PCBONLINE, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { getPrice } from "@src/utils/product";
import { StockErrorsFields } from "@src/store/chat/chatTypes";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import SendOrderModal from "@src/views/chipassist/Chat/components/ChatWindow/components/SendOrderModal/SendOrderModal";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ReactDOM from "react-dom";
import SendInvoiceModal from "@src/views/chipassist/Chat/components/ChatWindow/components/SendInvoiceModal/SendInvoiceModal";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./styles";

interface Props {
  chatId: number;
  isSending: boolean;
  setIsSending: any;
  isShowScrollButton: boolean;
  onScrollToBottom: () => void;
  minLoadedPage: number;
  onShowDetails: () => void;
}

const MessageInput: React.FC<Props> = ({
  chatId,
  setIsSending,
  isSending,
  isShowScrollButton,
  onScrollToBottom,
  minLoadedPage,
  onShowDetails,
}) => {
  const { t } = useI18n("chat.message_input");
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const isSupplierResponse = [ID_SUPPLIER_RESPONSE, ID_PCBONLINE].includes(constants.id);

  const textareaRef = useRef(null);
  const inputWrapperRef = useRef(null);

  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const errorMessage = useAppSelector((state) => state.chat.messages.error);
  const { partner, stocks, title, details } = useAppSelector((state) => state.chat.selectedChat);
  const stock = !!stocks?.length && stocks[0];

  const [message, setMessage] = useState("");
  const [error, setError] = useState(errorMessage);
  const [open, setOpen] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open: openDropzone } = useDropzone({
    // accept: "image/*",
    noDrag: true,
    onDrop: (acceptedFiles: any[]) => {
      acceptedFiles.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.id = v1();
        return item;
      });
      setFiles((prevState: any[]) => [...prevState, ...acceptedFiles]);
      setOpen(true);
    },
  });

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const inputWrapper = inputWrapperRef.current;

    // Reset
    textarea.style.height = "32px";
    inputWrapper.style.borderRadius = "50ch";

    if (message) {
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
      textarea.scrollTop = textarea.scrollHeight; // Scroll to the bottom of the textarea

      textarea.style.overflowY = textarea.scrollHeight > (isXsDown ? 130 : 230) ? "auto" : "hidden";
      inputWrapper.style.borderRadius = textarea.scrollHeight > 32 ? `8px` : "50ch";
    }
  }, [message]);

  const onCloseModal = () => {
    setOpen(false);
    setTimeout(() => setFiles([]), 500);
  };

  const onOpenOrderModal = () => {
    setOpenOrderModal(true);
  };

  const onOpenInvoiceModal = () => {
    setOpenInvoiceModal(true);
  };

  const onCloseOrderModal = () => {
    setOpenOrderModal(false);
  };

  const onCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
  };

  const onAddFiles = () => {
    openDropzone();
  };

  const handleDeleteFile = (id: string) => {
    if (files.length > 1) return setFiles(files.filter((i) => i.id !== id));
    setOpen(false);
    return setTimeout(() => setFiles([]), 500);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.persist();
    setMessage(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = async () => {
    textareaRef.current.focus(); // leave focus in the input after submitting
    if (chatId && !isSending) {
      setIsSending(true);

      if (minLoadedPage > 1) {
        // Asynchronous function with an async cycle
        const asyncLoadingPages = async (pages: number[]) => {
          for (const page of pages) {
            // eslint-disable-next-line no-await-in-loop
            await dispatch(getMessages(chatId, { page, rewind: false }, true));
          }
        };

        const startPage = minLoadedPage - 1;
        const pagesNeedToLoad = Array.from({ length: startPage }, (_, index) => startPage - index);
        await asyncLoadingPages(pagesNeedToLoad);
      }

      const promises: any = [];
      const trimMessage = message.trim();
      const maxLength = 1024; // allowed message's length
      for (let i = 0; i < Math.ceil(trimMessage.length / maxLength); i += 1) {
        // split a long message for parts by allowed length
        promises.push(dispatch(sendMessage(chatId, trimMessage.slice(i * maxLength, (i + 1) * maxLength))));
      }
      if (files.length) {
        setOpen(false);
        promises.push(dispatch(sendFiles(chatId, files)));
      }
      Promise.all(promises).finally(() => {
        setMessage("");
        setFiles([]);
        setIsSending(false);
      });
    }
  };

  const onEnterHandler = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const onSetHintMessage = (type: "confirm" | "update_price" | "update_qty" | "later" | "out_stock") => () => {
    const name = `${partner.first_name} ${partner.last_name}`;
    const price = stock && getPrice(stock?.num_in_stock, stock as any);
    const numInStock = Number(stock?.num_in_stock);
    const datecode = stock && stock.partner_sku.split("datecode:")[1];
    const partNumber = title;
    // const leadTime = Number(stock?.lead_period_str);
    const symbol = currencyList.find((curr) => curr.code === stock?.currency)?.symbol;

    let stockErrors: StockErrorsFields = null;
    if (stock && !numInStock) stockErrors = { ...stockErrors, num_in_stock: true };
    if (stock && !price) stockErrors = { ...stockErrors, price: true };
    // if (stock && !leadTime && ["confirm", "update_price"].includes(type)) stockErrors = { ...stockErrors, leadTime: true };

    if (stockErrors && ["confirm", "update_price", "update_qty"].includes(type)) {
      onShowDetails();
      return dispatch(setStockError(stockErrors));
    }

    let value = "";
    if (type === "confirm") {
      // value = `Dear ${name}! We have ${partNumber} available. We can ship up to ${numInStock}pcs at ${price}${symbol} unit price${
      //   datecode ? ` with ${datecode} date code` : ""
      // }. If you are interested, please send us a Purchase Order (PO).`;
      value = t("types.confirm", {
        name: `${name}`,
        partNumber: `${partNumber}`,
        numInStock: `${numInStock}`,
        price: `${price}`,
        symbol: `${symbol}`,
        datacode: `${datecode ? ` with ${datecode} date code` : ""}`,
      });
    }
    if (type === "update_price") {
      // value = `Dear ${name}! Unfortunately, the unit price for ${partNumber} was updated. Now we can ship up to ${numInStock}pcs at ${price}${symbol} unit price${
      //   datecode ? ` with ${datecode} date code` : ""
      // }. If you are interested, please send us a Purchase Order (PO).`;
      value = t("types.update_price", {
        name: `${name}`,
        partNumber: `${partNumber}`,
        numInStock: `${numInStock}`,
        price: `${price}`,
        symbol: `${symbol}`,
        datacode: `${datecode ? ` with ${datecode} date code` : ""}`,
      });
    }
    if (type === "update_qty") {
      // value = `Dear ${name}! Thank you for your request. Currently we have only ${numInStock} units of ${partNumber} in stock. While we don't have the full quantity you requested, we believe this partial availability might still meet your immediate requirements. The unit price for this product is ${price}${symbol}. If you are interested in this stock please send us a Purchase Order (PO).`;
      value = t("types.update_qty", {
        name: `${name}`,
        partNumber: `${partNumber}`,
        numInStock: `${numInStock}`,
      });
    }
    if (type === "out_stock") {
      // value = `Dear ${name}! Thank you for your request. Unfortunately, ${partNumber} is currently out of stock. However, we are actively working to replenish our stock and expect ${partNumber} to be available soon.`;
      value = t("types.out_stock", {
        name: `${name}`,
        partNumber: `${partNumber}`,
      });
    }
    if (type === "later") {
      // value = `Dear ${name}! Thank you for your request. We will provide you the details a bit later. Thank you!`;
      value = t("types.later", {
        name: `${name}`,
      });
    }
    if (error) setError("");
    return setMessage(value);
  };

  const onClearMessage = () => {
    setMessage("");
  };

  const crateOrderButton = () => {
    const isDisabled = !stock?.prices?.length || (isSupplierResponse && !details?.po);
    const buttonElem = (
      <Button
        disabled={isDisabled}
        size="medium"
        variant="contained"
        className={clsx(appTheme.buttonCreate, classes.sendOrderButton)}
        onClick={isSupplierResponse ? onOpenInvoiceModal : onOpenOrderModal}
      >
        {isSupplierResponse ? t("send_inv") : t("send_po")}
      </Button>
    );
    const container = document.getElementById("chat-order-button-container");
    if (!container || (isSupplierResponse && isDisabled)) return null;
    if (isXsDown) return buttonElem;
    return ReactDOM.createPortal(buttonElem, container);
  };

  return (
    <div className={classes.root}>
      <ScrollToBottom onScrollHandler={onScrollToBottom} active={isShowScrollButton} chatId={chatId} />
      <Box m={isXsDown ? "0 12px 8px" : "0"}>{crateOrderButton()}</Box>
      {isSupplierResponse && (
        <div style={{ textAlign: "center", color: "#345", fontWeight: "bold", marginBottom: 4 }}>
          {t("pls_response")}:
        </div>
      )}
      <Box display="flex" flexWrap="wrap" gridGap="6px" m="0 12px 8px">
        {isSupplierResponse && (
          <>
            {!!stock && (
              <>
                <div className={classes.hint} onClick={onSetHintMessage("confirm")}>
                  {t("supplier_response.conf_stock")}
                </div>
                <div className={classes.hint} onClick={onSetHintMessage("update_price")}>
                  {t("supplier_response.upd_price")}
                </div>
                <div className={classes.hint} onClick={onSetHintMessage("update_qty")}>
                  {t("supplier_response.upd_quantity")}
                </div>
              </>
            )}
            <div className={classes.hint} onClick={onSetHintMessage("out_stock")}>
              {t("supplier_response.no_stock")}
            </div>
            <div className={classes.hint} onClick={onSetHintMessage("later")}>
              {t("supplier_response.reply_later")}
            </div>
          </>
        )}
      </Box>

      {!!error && <div className={classes.error}>{error}</div>}
      <Box display="flex" alignItems="center">
        <Hidden mdUp>
          <Box display="flex" {...getRootProps()}>
            <input {...getInputProps()} />
            <AttachFileIcon className={classes.attachIcon} />
          </Box>
        </Hidden>
        <div ref={inputWrapperRef} className={classes.input}>
          <textarea
            className={classes.textarea}
            ref={textareaRef}
            name="message"
            onChange={handleChange}
            onKeyDown={onEnterHandler}
            value={message}
            placeholder={t("placeholder")}
          />
          {!!message && (
            <Box display="flex">
              <CloseIcon className={classes.clearIcon} onClick={onClearMessage} />
            </Box>
          )}
          <Hidden smDown>
            <Box display="flex" {...getRootProps()}>
              <input {...getInputProps()} />
              <AttachFileIcon className={classes.attachIcon} />
            </Box>
          </Hidden>
        </div>
        <ArrowUpwardRoundedIcon
          className={clsx(classes.sendIcon, { disabled: !message.trim() })}
          onClick={handleSubmit}
        />
      </Box>

      <UploadFilesModal
        open={open}
        message={message}
        files={files}
        handleChange={handleChange}
        onClearMessage={onClearMessage}
        onEnterHandler={onEnterHandler}
        handleDeleteFile={handleDeleteFile}
        handleSubmit={handleSubmit}
        onAddFiles={onAddFiles}
        onCloseModal={onCloseModal}
      />
      <SendOrderModal
        open={openOrderModal}
        stock={stock}
        onCloseModal={onCloseOrderModal}
        setIsSending={setIsSending}
      />
      <SendInvoiceModal
        open={openInvoiceModal}
        stock={stock}
        onCloseModal={onCloseInvoiceModal}
        setIsSending={setIsSending}
      />
    </div>
  );
};

export default MessageInput;
