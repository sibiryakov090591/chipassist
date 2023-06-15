import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import MessageInput from "@src/views/chipassist/Chat/components/ChatWindow/components/MessageInput/MessageInput";
import { downloadFile, getMessages } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Box from "@material-ui/core/Box";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { formatMoney } from "@src/utils/formatters";
import { clsx } from "clsx";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import pdf_icon from "@src/images/files_icons/PDF_file_icon.png";
import doc_icon from "@src/images/files_icons/docx_icon.png";
import xls_icon from "@src/images/files_icons/xls_icon.png";
import { ChatListMessage } from "@src/store/chat/chatTypes";
import { useStyles } from "./styles";
import Preloader from "../../../Skeleton/Preloader";

const FileDownload = require("js-file-download");

const Messages: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const messagesWindowRef = useRef(null);
  const unreadMessagesRef = useRef(null);
  const pageSize = 15;

  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const messages = useAppSelector((state) => state.chat.messages);
  const files = useAppSelector((state) => state.chat.files);

  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<number>(null);
  const [isSending, setIsSending] = useState(false);
  const [isShowScrollButton, setIsShowScrollButton] = useState(false);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  useEffect(() => {
    if (selectedChat?.id) {
      setFirstUnreadMessageId(null);
      dispatch(getMessages(selectedChat.id, { page_size: pageSize })).then((res: any) => {
        const firstUnreadMessage = res.results.find((i: ChatListMessage) => i.read === false);
        if (firstUnreadMessage) {
          setFirstUnreadMessageId(firstUnreadMessage.id);
        } else {
          messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
        }
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    if (unreadMessagesRef.current) {
      unreadMessagesRef.current.scrollIntoView({ block: "center" });
    }
  }, [unreadMessagesRef, firstUnreadMessageId]);

  useEffect(() => {
    if (messages.page && !loadedPages.includes(messages.page)) setLoadedPages([...loadedPages, messages.page]);
  }, [messages.page]);

  useEffect(() => {
    messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
  }, [isSending]);

  const loadOnTheTopSide = () => {
    if (!messages.isLoading && selectedChat.id && messages.total_pages > Math.max(...loadedPages)) {
      const prevHeight = messagesWindowRef.current.scrollHeight;
      dispatch(
        getMessages(selectedChat.id, { start_id: messages.results[0].id, rewind: true, page_size: pageSize }, true),
      ).then(() => {
        // stay scroll in the right place
        const currentHeight = messagesWindowRef.current.scrollHeight;
        messagesWindowRef.current.scrollTo({ top: currentHeight - prevHeight });
      });
    }
  };

  const loadOnTheBottomSide = () => {
    if (!messages.isLoading && selectedChat.id && Math.min(...loadedPages) > 1) {
      dispatch(
        getMessages(
          selectedChat.id,
          { start_id: messages.results[messages.results.length - 1].id, rewind: false, page_size: pageSize },
          true,
        ),
      );
    }
  };

  const onScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = messagesWindowRef.current;
    const loadingYOffset = 150;
    const toShowButtonYOffset = 100;

    const toShowButton = scrollHeight > scrollTop + clientHeight + toShowButtonYOffset;
    if (toShowButton !== isShowScrollButton) setIsShowScrollButton(toShowButton);

    const isAtBottom = scrollTop + clientHeight > scrollHeight - loadingYOffset;
    if (isAtBottom) loadOnTheBottomSide();

    const isAtTop = scrollTop < loadingYOffset;
    if (isAtTop) loadOnTheTopSide();
  };

  const onScrollToBottom = React.useCallback(() => {
    messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight, behavior: "smooth" });
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

  return (
    <div className={classes.container}>
      {!messages.results.length && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          {!messages.isLoading && messages.loaded && <h5>You have no messages</h5>}
          {messages.isLoading && !messages.loaded && <Preloader size={12} />}
        </Box>
      )}
      <div
        ref={messagesWindowRef}
        onScroll={onScroll}
        className={clsx(classes.messagesWrapper, { hidden: !messages.results.length })}
      >
        <div className={classes.messages}>
          {messages.results.map((item, index) => {
            const today = new Date().toLocaleDateString();
            const messageDate = new Date(item.created).toLocaleDateString();
            const time = new Date(item.created).toLocaleTimeString().slice(0, 5);

            const isShowDateLabel =
              index === 0 || new Date(messages.results[index - 1].created).toLocaleDateString() !== messageDate;
            const isFirstMessage = messages.page === messages.total_pages && index === 0;

            return (
              <div key={item.id}>
                {item.id === firstUnreadMessageId && (
                  <div ref={unreadMessagesRef} className={classes.unreadLabel}>
                    <span>Unread Messages</span>
                  </div>
                )}
                {isShowDateLabel && (
                  <div className={classes.dateLabel}>{today === messageDate ? "Today" : messageDate}</div>
                )}
                {isFirstMessage && selectedChat?.rfq && (
                  <div className={classes.requestItem}>
                    <ScheduleRoundedIcon className={classes.requestItemIcon} />
                    <div>
                      <strong>{`${item.sender} sent a new request for ${selectedChat.rfq.upc}.`}</strong>{" "}
                      {!!selectedChat.rfq.quantity && !!selectedChat.rfq.price && (
                        <span>{`${selectedChat.rfq.quantity} x ${formatMoney(selectedChat.rfq.price)} € = ${formatMoney(
                          selectedChat.rfq.quantity * selectedChat.rfq.price,
                        )} €`}</span>
                      )}
                    </div>
                  </div>
                )}
                <div className={classes.messageItem}>
                  <div className={classes.messageInfo}>
                    <span className={classes.messageFrom}>
                      {item.sender === "You"
                        ? "You"
                        : constants.id !== ID_SUPPLIER_RESPONSE
                        ? selectedChat?.partner?.name
                        : item.sender}
                    </span>
                    <span className={classes.messageDate}>{time}</span>
                  </div>
                  <Box display="flex" flexWrap="wrap" gridGap="6px">
                    {item.message_attachments?.map((attachment) => {
                      const file = files[attachment.id];
                      if (!file || attachment.file_name.match(/\.pdf$/i)) return null;

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
                  <Box display="flex" flexWrap="wrap" gridGap="6px" mt="12px">
                    {item.message_attachments?.map((attachment) => {
                      const file = files[attachment.id];
                      if (file && !attachment.file_name.match(/\.pdf$/i)) return null;

                      const imgUrl =
                        (attachment.file_name.match(/\.pdf$/i) && pdf_icon) ||
                        (attachment.file_name.match(/\.(doc|docx|dot|dotx|docm)$/i) && doc_icon) ||
                        (attachment.file_name.match(/\.(xls|xlsx|xlsm|xlsb|xltx|csv)$/i) && xls_icon);

                      return (
                        <div
                          key={attachment.id}
                          className={classes.file}
                          onClick={onDownloadFile(attachment.id, attachment.file_name)}
                        >
                          {imgUrl ? <img src={imgUrl} alt="file icon" /> : <CloudDownloadIcon />}
                          <div className={classes.fileName}>{attachment.file_name}</div>
                        </div>
                      );
                    })}
                  </Box>
                  <div className={classes.message}>{item.text}</div>
                </div>
              </div>
            );
          })}
          {isSending && (
            <div className={classes.messageItem}>
              <Preloader />
            </div>
          )}
        </div>
      </div>
      <MessageInput
        chatId={selectedChat?.id}
        isSending={isSending}
        setIsSending={setIsSending}
        isShowScrollButton={isShowScrollButton}
        onScrollToBottom={onScrollToBottom}
      />
    </div>
  );
};

export default Messages;
