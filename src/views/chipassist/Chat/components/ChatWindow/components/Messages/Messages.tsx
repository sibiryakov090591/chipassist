import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import MessageInput from "@src/views/chipassist/Chat/components/ChatWindow/components/MessageInput/MessageInput";
import { deductReadMessages, getMessages, readMessage } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Box from "@material-ui/core/Box";
import InfiniteScroll from "react-infinite-scroller";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import { formatMoney } from "@src/utils/formatters";
import { useStyles } from "./styles";
import Preloader from "../../../Skeleton/Preloader";

const Messages: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const messagesWindowRef = useRef(null);
  const pageSize = 10;

  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const messages = useAppSelector((state) => state.chat.messages);

  const [isSending, setIsSending] = useState(false);
  const [isShowScrollButton, setIsShowScrollButton] = useState(false);

  useEffect(() => {
    if (selectedChat?.id) {
      dispatch(getMessages(selectedChat.id, false, 1, pageSize)).then(() => {
        messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    // read messages
    if (messages.page) {
      const promises: any = [];
      messages.results.slice(pageSize * (messages.page - 1)).forEach((message) => {
        if (!message.read) {
          promises.push(dispatch(readMessage(selectedChat.id, message.id)));
        }
      });
      if (promises.length) {
        Promise.all(promises).then(() => dispatch(deductReadMessages(selectedChat.id, promises.length)));
      }
    }
  }, [messages]);

  useEffect(() => {
    messagesWindowRef.current.scrollTo({ top: messagesWindowRef.current.scrollHeight });
  }, [isSending]);

  const onScrollLoading = () => {
    if (!messages.isLoading) {
      const prevHeight = messagesWindowRef.current.scrollHeight;
      dispatch(getMessages(selectedChat.id, true, messages.page + 1, pageSize)).then(() => {
        const currentHeight = messagesWindowRef.current.scrollHeight;
        messagesWindowRef.current.scrollTo({ top: currentHeight - prevHeight });
      });
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

  return (
    <div className={classes.container}>
      {!messages.results.length && messages.isLoading && !messages.loaded && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Preloader size={12} />
        </Box>
      )}
      <div ref={messagesWindowRef} onScroll={onScroll} className={classes.messagesWrapper}>
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
                {isFirstMessage && item.sender === "You" && selectedChat?.rfq && (
                  <div className={classes.requestItem}>
                    <ScheduleRoundedIcon className={classes.requestItemIcon} />
                    <div>
                      <strong>{`You sent a new request for ${selectedChat.rfq.upc}.`}</strong>{" "}
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
                      {item.sender === "You" ? "You" : selectedChat?.partner?.name}
                    </span>
                    <span className={classes.messageDate}>{time}</span>
                  </div>
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
