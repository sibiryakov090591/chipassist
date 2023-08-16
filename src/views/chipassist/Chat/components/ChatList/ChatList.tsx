import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
// import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { getChatList, selectChat, updateChatList } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Filters from "@src/views/chipassist/Chat/components/ChatList/components/Filters/Filters";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles as useChatStyles } from "@src/views/chipassist/Chat/styles";
import SwipeWrapper from "@src/components/SwipeWrapper/SwipeWrapper";
import { useStyles } from "./styles";
import Preloader from "../Skeleton/Preloader";

interface Props {
  showList: boolean;
  onShowList: (open: boolean) => void;
}

const ChatList: React.FC<Props> = ({ showList, onShowList }) => {
  const classes = useStyles();
  const chatClasses = useChatStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down(800));

  const chatListRef = React.useRef(null);

  const { chatList, selectedChat, filters } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (chatListRef.current) chatListRef.current.scrollTo({ top: 0 });
  }, [filters.values]);

  useEffect(() => {
    if (chatList.loadedPages.length) {
      const loadedPages = [...new Set(chatList.loadedPages)];
      loadedPages.forEach((page) => dispatch(updateChatList(page)));
    }
  }, []);

  const selectItemHandler = (item: any) => () => {
    if (item.id !== selectedChat?.id) dispatch(selectChat(item));
    if (isXsDown) onShowList(false);
  };

  const onScrollLoading = () => {
    if (!chatList.isLoading) {
      dispatch(getChatList(chatList.page + 1, filters.values, true));
    }
  };

  const leftSwipeAction = () => {
    if (selectedChat?.id) {
      if (isXsDown) {
        const messagesElem = document.getElementById("chat-messages");
        if (messagesElem) messagesElem.style.display = "inherit";
      }
      onShowList(false);
    }
  };

  return (
    <SwipeWrapper leftSwipeAction={leftSwipeAction} className={clsx(classes.leftColumn, { active: showList })}>
      <div className={classes.header}>
        <Filters />
      </div>

      <div ref={chatListRef} className={classes.list}>
        {!chatList.results.length && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            {chatList.isLoading ? <Preloader /> : <h5 className={chatClasses.emptyMessage}>You have no chats</h5>}
          </Box>
        )}
        <InfiniteScroll
          threshold={250}
          loadMore={onScrollLoading}
          useWindow={false}
          initialLoad={false}
          hasMore={chatList.total_pages > chatList.page}
          loader={
            <Box display="flex" justifyContent={"center"}>
              <Preloader />
            </Box>
          }
        >
          {chatList.results.map((item, index) => {
            const lastMessage = item.messages[0];
            if (!lastMessage) return null;

            const lastMessageDate =
              Date.now() - new Date(lastMessage.created).getTime() > 86400000
                ? new Date(lastMessage.created).toLocaleDateString()
                : new Date(lastMessage.created).toLocaleTimeString().slice(0, 5);
            const unreadMessages = Number(item.unread_messages);
            const quantity = item.details?.quantity || item.rfq?.quantity;
            const price = item.details?.price || item.rfq?.price;
            const partNumber = item.title || item.rfq?.upc;

            const name =
              constants.id === ID_SUPPLIER_RESPONSE
                ? item.partner &&
                  Object.entries(item.partner).reduce((acc, i) => {
                    const [key, value] = i;
                    if (value) return acc ? `${acc} ${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
                    return acc;
                  }, "")
                : item.partner.first_name;

            return (
              <div
                key={`${item.id}_${index}`}
                className={clsx(classes.item, {
                  [classes.itemActive]: selectedChat?.id === item.id,
                })}
                onClick={selectItemHandler(item)}
              >
                <div className={classes.itemInner}>
                  <Box display="flex" justifyContent="space-between">
                    <div className={classes.title}>
                      <div className={classes.sellerName}>{partNumber}</div>
                      {!!unreadMessages && (
                        <div className={classes.unreadCount}>{unreadMessages > 99 ? "99+" : unreadMessages}</div>
                      )}
                    </div>
                    <Box display="flex" alignItems="center">
                      <div className={classes.messageDate}>{lastMessageDate}</div>
                      {/* <Status status="Requested" /> */}
                    </Box>
                  </Box>
                  <div className={classes.message}>
                    {lastMessage?.text ||
                      (lastMessage.message_attachments[0] && lastMessage.message_attachments[0].file_name)}
                  </div>
                  <Box display="flex" justifyContent="space-between" flexWrap="wrap" className={classes.info}>
                    <div>{name}</div>
                    {!!quantity && !!price && (
                      <div>{`${quantity} x ${formatMoney(price)} € = ${formatMoney(quantity * price)} €`}</div>
                    )}
                  </Box>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </SwipeWrapper>
  );
};

export default ChatList;
