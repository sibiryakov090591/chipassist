import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import MessageInput from "@src/views/chipassist/Chat/components/ChatWindow/components/MessageInput/MessageInput";
import {
  deductReadMessages,
  downloadFile,
  getMessages,
  readMessage,
  updateMessages,
} from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Box from "@material-ui/core/Box";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { formatMoney } from "@src/utils/formatters";
import { clsx } from "clsx";
import pdf_icon from "@src/images/files_icons/PDF_file_icon.png";
import doc_icon from "@src/images/files_icons/docx_icon.png";
import xls_icon from "@src/images/files_icons/xls_icon.png";
import { ChatListMessage } from "@src/store/chat/chatTypes";
import chatIcon from "@src/images/Icons/chat-icon.png";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { Paper, Grid, useTheme, useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import { useStyles } from "./styles";
import Preloader from "../../../Skeleton/Preloader";
import UnreadMessagesLabel from "./UnreadMessagesLabel";

const FileDownload = require("js-file-download");

interface Props {
  onShowDetails: () => void;
}

const Messages: React.FC<Props> = ({ onShowDetails }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  const messagesWindowRef = useRef(null);
  const unreadLabelRef = useRef(null);

  const checkout = useAppSelector((state) => state.checkout);
  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const chatList = useAppSelector((state) => state.chat.chatList);
  const messages = useAppSelector((state) => state.chat.messages);
  const files = useAppSelector((state) => state.chat.files);

  const [messagesIdsWasRead, setMessagesIdsWasRead] = useState<number[]>([]);
  const [unreadMessagesRefs, setUnreadMessagesRefs] = useState<{ [key: number]: any }>({});
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<number>(null);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState<"top" | "bottom">(null);
  const [isShowScrollButton, setIsShowScrollButton] = useState(false);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  const minLoadedPage = React.useMemo(() => !!loadedPages.length && Math.min(...loadedPages), [loadedPages]);

  useEffect(() => {
    if (selectedChat?.id) {
      // clear state
      setMessagesIdsWasRead([]);
      setUnreadMessagesRefs({});
      setFirstUnreadMessageId(null);
      setLoadedPages([]);

      dispatch(getMessages(selectedChat.id)).then((res: any) => {
        const firstUnreadMessage = res.results.find((i: ChatListMessage) => i.read === false);
        if (firstUnreadMessage) {
          setFirstUnreadMessageId((prev) => prev || firstUnreadMessage.id);
        } else {
          // Bug: When we have images we're moving to last message before setting images up into the DOM so scrollHeight calc not correct
          // The first scrolling is moving us to last message
          if (messagesWindowRef.current)
            messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
          // The second scrolling is moving us to bottom after setting images up in DOM
          setTimeout(() => {
            if (messagesWindowRef.current)
              messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
          }, 10);
        }
      });
    }
  }, [selectedChat?.id]);

  useEffect(() => {
    if (selectedChat?.id && messages.forceUpdate && !messages.isLoading && messagesWindowRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = messagesWindowRef.current;
      const isNeedToScroll = scrollTop + clientHeight > scrollHeight - 50;
      dispatch(updateMessages(selectedChat.id)).then(() => {
        if (isNeedToScroll) messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
      });
    }
  }, [messages.forceUpdate]);

  useEffect(() => {
    if (Object.keys(messages.results).length) {
      const result: any = {};
      Object.values(messages.results).forEach((list) => {
        list.forEach((message) => {
          if (!message.read && !unreadMessagesRefs[message.id]) {
            const elem = document.getElementById(`chat-message-${message.id}`);
            if (elem) result[message.id] = elem;
          }
        });
      });
      setUnreadMessagesRefs((prev) => ({ ...prev, ...result }));
    }
  }, [messages.results]);

  useEffect(() => {
    const options = {
      threshold: 0.5, // Customize the visibility threshold as needed
    };

    const handleIntersection: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          const messageId = parseInt(entry.target.getAttribute("data-id"));
          markAsRead(messageId).then(() => observer.unobserve(entry.target));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    Object.entries(unreadMessagesRefs).forEach(([id, ref]) => {
      if (!messagesIdsWasRead.includes(Number(id))) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [unreadMessagesRefs, messagesIdsWasRead]);

  useEffect(() => {
    if (unreadLabelRef.current && messagesWindowRef.current) {
      // unreadLabelRef.current.scrollIntoView({ block: "center" });
      messagesWindowRef.current.scrollTo({ top: unreadLabelRef.current.offsetTop - 50 });
    }
  }, [unreadLabelRef.current, firstUnreadMessageId]);

  useEffect(() => {
    if (messages.page && !loadedPages.includes(messages.page)) setLoadedPages([...loadedPages, messages.page]);
  }, [messages]);

  useEffect(() => {
    if (messagesWindowRef.current) {
      messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
    }
  }, [isSending]);

  const markAsRead = (messageId: number) => {
    // if (messagesIdsWasRead.includes(messageId)) return Promise.reject();

    setMessagesIdsWasRead((prev) => [...prev, messageId]);
    return dispatch(readMessage(messageId)).then(() => {
      dispatch(deductReadMessages(selectedChat.id, 1));
    });
  };

  const loadOnTheTopSide = async () => {
    if (
      !messages.isLoading &&
      Object.keys(messages.results).length &&
      loadedPages.length &&
      messages.total_pages > Math.max(...loadedPages) &&
      messagesWindowRef.current
    ) {
      setIsLoadingMore("top");

      const { scrollHeight, scrollTop, clientHeight } = messagesWindowRef.current;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;

      await dispatch(
        getMessages(selectedChat.id, { start_id: Object.values(messages.results)[0][0].id, rewind: true }, true),
      ).finally(() => setIsLoadingMore(null));

      // stay scroll in the right place
      const currentHeight = messagesWindowRef.current.scrollHeight;
      messagesWindowRef.current.scrollTo({ top: currentHeight - clientHeight - scrollBottom });
    }
  };

  const loadOnTheBottomSide = () => {
    if (
      !messages.isLoading &&
      Object.keys(messages.results).length &&
      loadedPages.length &&
      Math.min(...loadedPages) > 1
    ) {
      setIsLoadingMore("bottom");
      const group = Object.values(messages.results)[Object.values(messages.results).length - 1];
      dispatch(
        getMessages(selectedChat.id, { start_id: group[group.length - 1].id, rewind: false }, true),
      ).finally(() => setIsLoadingMore(null));
    }
  };

  const onScroll = () => {
    if (messagesWindowRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = messagesWindowRef.current;
      const loadingYOffset = 250;
      const toShowButtonYOffset = 200;

      const toShowButton = scrollHeight > scrollTop + clientHeight + toShowButtonYOffset;
      if (toShowButton !== isShowScrollButton) setIsShowScrollButton(toShowButton);

      const isAtBottom = scrollTop + clientHeight > scrollHeight - loadingYOffset;
      if (isAtBottom) loadOnTheBottomSide();

      const isAtTop = scrollTop < loadingYOffset;
      if (isAtTop) loadOnTheTopSide();
    }
  };

  const onScrollToBottom = React.useCallback(() => {
    if (messagesWindowRef.current) {
      messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  const onDownloadFile = (fileId: number, name: string) => () => {
    if (files[fileId]) {
      return onOpenPreview(files[fileId].url)();
    }
    return dispatch(downloadFile(fileId)).then((blob: Blob) => {
      if (blob) FileDownload(blob, name);
    });
  };

  const onOpenPreview = (url: any) => () => {
    if (url) window.open(url, "_blank");
  };

  const requestBlock = () => {
    if (!selectedChat?.rfq?.quantity || !messages?.results) return null;
    const message = !!Object.values(messages.results).length && Object.values(messages.results)[0][0];
    if (!message) return null;
    const date = new Date(message.created).toLocaleDateString();
    return (
      <div className={classes.requestItem}>
        <ScheduleRoundedIcon className={classes.requestItemIcon} />
        <div>
          <strong>{`Request for ${selectedChat.rfq.quantity}pcs ${selectedChat.rfq.upc}${
            selectedChat.rfq.price ? ` at ${formatMoney(selectedChat.rfq.price)} €` : ""
          }.`}</strong>{" "}
          {date}
        </div>
      </div>
    );
  };

  return (
    <div id="chat-messages" className={classes.container}>
      {!Object.keys(messages.results).length && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          {messages.isLoading ? (
            <Preloader size={12} />
          ) : selectedChat ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <img className={classes.chatImage} src={chatIcon} alt="Chat icon" />
              <h5>You have no messages</h5>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <img className={classes.chatImage} src={chatIcon} alt="Chat icon" />
              {!chatList.results.length ? (
                <h5 className={classes.emptyText}>
                  {isSupplierResponse ? (
                    <>
                      You have no chats yet. You&apos;ll see new messages here when customers click{" "}
                      <strong>&quot;Contact seller&quot;</strong> button on ChipAssist.
                    </>
                  ) : (
                    <>
                      To start a chat about any product use <strong>&quot;Contact seller&quot;</strong> button on the
                      search page
                      <br />
                      <br />
                      Go to search page{" "}
                      <a href="https://chipassist.com/search" target={"_blank"} rel={"noreferrer"}>
                        https://chipassist.com/search
                      </a>
                    </>
                  )}
                </h5>
              ) : (
                <h5 className={classes.emptyText}>
                  To start communication select a chat with the {isSupplierResponse ? "buyer" : "seller"}
                </h5>
              )}
            </Box>
          )}
        </Box>
      )}
      <div
        ref={messagesWindowRef}
        onScroll={onScroll}
        className={clsx(classes.messagesWrapper, { hidden: !Object.keys(messages.results).length })}
      >
        <div className={classes.messages}>
          {isLoadingMore === "top" && (
            <Box className={classes.topPreloader} display="flex" justifyContent={"center"}>
              <Preloader />
            </Box>
          )}
          {requestBlock()}
          {Object.values(messages.results).map((list, i) => {
            if (!list?.length) return null;
            const todayDate = new Date().toLocaleDateString();
            const groupDate = list[0]?.created && new Date(list[0].created).toLocaleDateString();
            const dateLabel = todayDate === groupDate ? "Today" : groupDate;

            return (
              <div key={i} className={classes.group}>
                <div className={classes.dateLabel}>{dateLabel}</div>
                {list.map((item) => {
                  if (!item) return null;
                  const time = format(new Date(item.created), "HH:mm");
                  const orderData = item.po;
                  const invoiceData = item.invoice;
                  const purchaseOrder = item.invoice?.purchase_order;
                  const orderAttachment =
                    (orderData || invoiceData) && item.message_files?.find((attach) => !!attach.file.match(/\.pdf$/i));
                  const orderPdf = orderAttachment && files[orderAttachment.id];
                  const symbol =
                    (orderData || invoiceData) &&
                    currencyList.find(
                      (curr) => curr.code === (orderData?.stockrecord?.currency || invoiceData?.stockrecord?.currency),
                    )?.symbol;

                  return (
                    <div key={item.id}>
                      {item.id === firstUnreadMessageId && (
                        <div ref={unreadLabelRef}>
                          <UnreadMessagesLabel chatId={selectedChat?.id} />
                        </div>
                      )}
                      <div
                        id={`chat-message-${item.id}`}
                        data-id={item.id}
                        className={clsx(classes.messageItem, "chat-message-item")}
                      >
                        <div className={classes.messageInfo}>
                          <span className={classes.messageFrom}>
                            {item.sender === "You" ? "You" : selectedChat?.partner_name}
                          </span>
                          <span className={classes.messageDate}>
                            {time}
                            {item.sender === "You" && item.read_by_partner && (
                              <DoneAllIcon className={classes.wasReadIcon} />
                            )}
                          </span>
                        </div>
                        {orderData || invoiceData ? (
                          <>
                            {orderData ? (
                              <Paper className={classes.orderItem} elevation={1}>
                                <div className={classes.orderTitle}>Purchase Order (PO)</div>
                                <div className={classes.orderAddress}>
                                  <Grid container>
                                    <Grid item sm={6} xs={12}>
                                      <div>
                                        {orderData?.company_name ? <strong>{orderData.company_name}</strong> : "-"}
                                      </div>
                                      <div>
                                        {orderData?.first_name || "-"} {orderData.last_name}
                                      </div>
                                      <div>
                                        {orderData?.phone_number_str
                                          ? `+${orderData.phone_number_str.replace(/[+]/g, "")}`
                                          : "-"}
                                      </div>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                      <div>{`${orderData?.line1 || "-"}`}</div>
                                      <div>{`${orderData?.line4 ? `${orderData.line4},` : ""} ${
                                        checkout?.countries?.find((c) => c.url === orderData?.country)?.printable_name
                                      }`}</div>
                                      <div>{orderData?.postcode}</div>
                                    </Grid>
                                    {orderData?.additional_notes && (
                                      <Grid xs={12}>
                                        <div>{orderData.additional_notes}</div>
                                      </Grid>
                                    )}
                                  </Grid>
                                </div>
                                <div className={classes.orderTableWrapper}>
                                  <table className={classes.orderTable}>
                                    <thead>
                                      <tr style={{ backgroundColor: "#345" }}>
                                        <th>MPN</th>
                                        <th>DC</th>
                                        <th>{isXsDown ? "Qty" : "Quantity"}</th>
                                        <th className={classes.nowrap}>
                                          {isXsDown ? `Price, ${symbol}` : `Unit Price, ${symbol}`}
                                        </th>
                                        <th className={classes.nowrap}>
                                          {isXsDown ? `Total, ${symbol}` : `Total Price, ${symbol}`}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{orderData?.mpn}</td>
                                        <td>{orderData?.datecode || "-"}</td>
                                        <td>{orderData?.quantity}</td>
                                        <td>{formatMoney(orderData?.price)}</td>
                                        <td>{formatMoney(orderData?.totalPrice)}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {!!orderPdf && (
                                    <div className={classes.orderPdfLink}>
                                      <img src={pdf_icon} alt="file icon" />
                                      <a href={orderPdf.url} target="_blank" rel="noreferrer">
                                        View PO in PDF
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </Paper>
                            ) : (
                              <Paper className={classes.orderItem} elevation={1}>
                                <div className={clsx(classes.orderTitle, classes.invoiceTitle)}>Payment Invoice</div>
                                <div className={classes.orderAddress}>
                                  <Grid container>
                                    <Grid item sm={6} xs={12}>
                                      <div className={classes.orderAddressTitle}>
                                        <strong>Customer:</strong>
                                      </div>
                                      {purchaseOrder?.company_name && (
                                        <div>
                                          <strong>{purchaseOrder.company_name}</strong>
                                        </div>
                                      )}
                                      {(purchaseOrder?.first_name || purchaseOrder?.last_name) && (
                                        <div>
                                          {purchaseOrder?.first_name} {purchaseOrder?.last_name}
                                        </div>
                                      )}
                                      {purchaseOrder?.line1 && <div>{purchaseOrder.line1}</div>}
                                      <div>
                                        {`${purchaseOrder?.line4 ? `${purchaseOrder.line4},` : ""}`}{" "}
                                        {
                                          checkout?.countries?.find((c) => c.url === purchaseOrder?.country)
                                            ?.printable_name
                                        }{" "}
                                        {`${purchaseOrder?.postcode ? `, ${purchaseOrder.postcode}` : ""}`}
                                      </div>
                                      {purchaseOrder?.phone_number_str && (
                                        <div>{`+${purchaseOrder.phone_number_str.replace(/[+]/g, "")}`}</div>
                                      )}
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                      <div className={classes.orderAddressTitle}>
                                        <strong>Seller:</strong>
                                      </div>
                                      {invoiceData?.company_name && (
                                        <div>
                                          <strong>{invoiceData.company_name}</strong>
                                        </div>
                                      )}
                                      {(invoiceData?.first_name || invoiceData?.last_name) && (
                                        <div>
                                          {invoiceData?.first_name} {invoiceData?.last_name}
                                        </div>
                                      )}
                                      {invoiceData?.line1 && <div>{invoiceData.line1}</div>}
                                      <div>
                                        {`${invoiceData?.line4 ? `${invoiceData.line4},` : ""}`}{" "}
                                        {
                                          checkout?.countries?.find((c) => c.url === invoiceData?.country)
                                            ?.printable_name
                                        }{" "}
                                        {`${invoiceData?.postcode ? `, ${invoiceData.postcode}` : ""}`}
                                      </div>
                                      {invoiceData?.phone_number_str && (
                                        <div>{`+${invoiceData.phone_number_str.replace(/[+]/g, "")}`}</div>
                                      )}
                                    </Grid>
                                  </Grid>
                                </div>
                                <div className={classes.orderTableWrapper}>
                                  <table className={classes.orderTable}>
                                    <thead>
                                      <tr className={classes.orderTableHeader}>
                                        <th>MPN</th>
                                        <th>DC</th>
                                        <th>{isXsDown ? "Qty" : "Quantity"}</th>
                                        <th className={classes.nowrap}>
                                          {isXsDown ? `Price, ${symbol}` : `Unit Price, ${symbol}`}
                                        </th>
                                        <th>
                                          Out <span className={classes.nowrap}>Price, {symbol}</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{invoiceData?.mpn}</td>
                                        <td>{invoiceData?.datecode || "-"}</td>
                                        <td>{invoiceData?.quantity}</td>
                                        <td>{formatMoney(invoiceData?.price)}</td>
                                        <td>{formatMoney(invoiceData?.totalPrice)}</td>
                                      </tr>
                                      <tr>
                                        <td colSpan={5}>
                                          <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <div>Shipping: {invoiceData?.shipping_notes}</div>
                                            <div>
                                              {invoiceData?.shipping_fee ? formatMoney(invoiceData.shipping_fee) : "-"}
                                            </div>
                                          </Box>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={5}>
                                          <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <div>
                                              <strong>Total:</strong>
                                            </div>
                                            <div>
                                              <strong>
                                                {formatMoney(
                                                  Number(invoiceData?.totalPrice || 0) +
                                                    Number(invoiceData?.shipping_fee || 0),
                                                )}
                                              </strong>
                                            </div>
                                          </Box>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {invoiceData?.additional_notes && (
                                    <div className={classes.notes}>
                                      <div>
                                        <strong>Notes:</strong>
                                      </div>
                                      <div>{invoiceData.additional_notes}</div>
                                    </div>
                                  )}
                                  {!!orderPdf && (
                                    <div className={classes.orderPdfLink}>
                                      <img src={pdf_icon} alt="file icon" />
                                      <a href={orderPdf.url} target="_blank" rel="noreferrer">
                                        View Invoice in PDF
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </Paper>
                            )}
                          </>
                        ) : (
                          <>
                            {!!item.message_files?.length && (
                              <Box display="flex" flexWrap="wrap" gridGap="6px">
                                {item.message_files.map((attachment) => {
                                  const file = files[attachment.id];
                                  if (!file || attachment.file.match(/\.pdf$/i)) return null;

                                  // render photos
                                  return (
                                    <img
                                      key={attachment.id}
                                      className={classes.image}
                                      src={file.url}
                                      alt="file"
                                      onClick={onOpenPreview(file.url)}
                                    />
                                  );
                                })}
                              </Box>
                            )}
                            {!!item.message_files?.length && (
                              <Box display="flex" flexWrap="wrap" gridGap="6px" mt="12px">
                                {item.message_files.map((attachment) => {
                                  const file = files[attachment.id];
                                  if (file && !attachment.file.match(/\.pdf$/i)) return null;

                                  const imgUrl =
                                    (attachment.file.match(/\.pdf$/i) && pdf_icon) ||
                                    (attachment.file.match(/\.(doc|docx|dot|dotx|docm)$/i) && doc_icon) ||
                                    (attachment.file.match(/\.(xls|xlsx|xlsm|xlsb|xltx|csv)$/i) && xls_icon);

                                  // render files
                                  return (
                                    <div
                                      key={attachment.id}
                                      className={classes.file}
                                      onClick={onDownloadFile(attachment.id, attachment.file)}
                                    >
                                      {imgUrl ? <img src={imgUrl} alt="file icon" /> : <CloudDownloadIcon />}
                                      <div className={classes.fileName}>{attachment.file}</div>
                                    </div>
                                  );
                                })}
                              </Box>
                            )}
                            <div className={classes.message}>{item.text}</div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {isSending && (
            <div className={classes.messageItem}>
              <div className={classes.messageInfo}>
                <span className={classes.messageFrom}>You</span>
                <span className={classes.messageDate}>{new Date().toLocaleTimeString().slice(0, 5)}</span>
              </div>
              <Preloader />
            </div>
          )}
          {isLoadingMore === "bottom" && (
            <Box className={classes.bottomPreloader} display="flex" justifyContent={"center"}>
              <Preloader />
            </Box>
          )}
        </div>
      </div>
      {!!Object.keys(messages.results).length && (
        <MessageInput
          chatId={selectedChat?.id}
          isSending={isSending}
          setIsSending={setIsSending}
          isShowScrollButton={isShowScrollButton}
          onScrollToBottom={onScrollToBottom}
          minLoadedPage={minLoadedPage}
          onShowDetails={onShowDetails}
        />
      )}
    </div>
  );
};

export default Messages;
