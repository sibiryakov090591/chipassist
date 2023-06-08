import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import MessageInput from "@src/views/chipassist/Chat/components/ChatWindow/components/MessageInput/MessageInput";
import { downloadFile, getMessages } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Box from "@material-ui/core/Box";
import InfiniteScroll from "react-infinite-scroller";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { formatMoney } from "@src/utils/formatters";
import { clsx } from "clsx";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { useStyles } from "./styles";
import Preloader from "../../../Skeleton/Preloader";

const Messages: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const messagesWindowRef = useRef(null);
  const pageSize = 15;

  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const messages = useAppSelector((state) => state.chat.messages);

  const [isSending, setIsSending] = useState(false);
  const [isShowScrollButton, setIsShowScrollButton] = useState(false);

  useEffect(() => {
    if (selectedChat?.id) {
      dispatch(getMessages(selectedChat.id, { page: 1, page_size: pageSize })).then(() => {
        messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
  }, [isSending]);

  const onScrollLoading = () => {
    if (!messages.isLoading && selectedChat.id) {
      const prevHeight = messagesWindowRef.current.scrollHeight;
      dispatch(getMessages(selectedChat.id, { start_id: messages.results[0].id, page_size: pageSize }, true)).then(
        () => {
          // stay scroll the right place
          const currentHeight = messagesWindowRef.current.scrollHeight;
          messagesWindowRef.current.scrollTo({ top: currentHeight - prevHeight });
        },
      );
    }
  };

  const onScroll = () => {
    const toShowButton =
      messagesWindowRef.current.scrollHeight >
      messagesWindowRef.current.scrollTop + messagesWindowRef.current.offsetHeight + 100;
    if (toShowButton !== isShowScrollButton) setIsShowScrollButton(toShowButton);
  };

  const onScrollToBottom = React.useCallback(() => {
    messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  const onDownloadFile = (fileId: number, name: string) => () => {
    dispatch(downloadFile(fileId, name)).then((blob: Blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    });
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
        <InfiniteScroll
          className={classes.messages}
          isReverse={true}
          threshold={250}
          loadMore={onScrollLoading}
          initialLoad={false}
          useWindow={false}
          hasMore={messages.total_pages > messages.page}
        >
          {messages.results.map((item, index) => {
            const today = new Date().toLocaleDateString();
            const messageDate = new Date(item.created).toLocaleDateString();
            const time = new Date(item.created).toLocaleTimeString().slice(0, 5);

            const isShowDateLabel =
              index === 0 || new Date(messages.results[index - 1].created).toLocaleDateString() !== messageDate;
            const isFirstMessage = messages.page === messages.total_pages && index === 0;

            return (
              <div key={item.id}>
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
                    {item.message_attachments?.map((file) => {
                      return (
                        <div
                          key={`${file.id}`}
                          className={classes.file}
                          onClick={onDownloadFile(file.id, file.file_name)}
                        >
                          <CloudDownloadIcon />
                          <div>{file.file_name}</div>
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
        </InfiniteScroll>
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
