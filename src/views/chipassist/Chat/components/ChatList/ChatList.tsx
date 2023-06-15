import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { getChatList, selectChat } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Filters from "@src/views/chipassist/Chat/components/ChatList/components/Filters/Filters";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import constants from "@src/constants/constants";
import { useStyles } from "./styles";
import Preloader from "../Skeleton/Preloader";

interface Props {
  showList: boolean;
  onShowList: (open: boolean) => void;
}

const ChatList: React.FC<Props> = ({ showList, onShowList }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down(800));

  const chatListRef = React.useRef(null);

  const { chatList, selectedChat, filters } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (chatListRef.current) chatListRef.current.scrollTo({ top: 0 });
  }, [filters.values]);

  const selectItemHandler = (item: any) => () => {
    if (item.id !== selectedChat?.id) dispatch(selectChat(item));
    if (isXsDown) onShowList(false);
  };

  const onScrollLoading = () => {
    if (!chatList.isLoading) {
      dispatch(getChatList(chatList.page + 1, filters.values, true));
    }
  };

  return (
    <div className={clsx(classes.leftColumn, { active: showList })}>
      <div className={classes.header}>
        <h1 className={classes.headerTitle}>All requests</h1>
        <Filters />
      </div>

      <div ref={chatListRef} className={classes.list}>
        {!chatList.results.length && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            {!chatList.isLoading && chatList.loaded ? <h5>You have no chats</h5> : <Preloader />}
          </Box>
        )}
        <InfiniteScroll
          threshold={250}
          loadMore={onScrollLoading}
          useWindow={false}
          initialLoad={false}
          hasMore={chatList.total_pages > chatList.page}
        >
          {chatList.results.map((item, index) => {
            const lastMessage = item.messages[0];
            const lastMessageDate =
              Date.now() - new Date(lastMessage.created).getTime() > 86400000
                ? new Date(lastMessage.created).toLocaleDateString()
                : new Date(lastMessage.created).toLocaleTimeString().slice(0, 5);
            const unreadMessages = Number(item.unread_messages);

            return (
              <div
                key={`${item.id}_${index}`}
                className={clsx(classes.item, {
                  [classes.itemActive]: selectedChat?.id === item.id,
                })}
                onClick={selectItemHandler(item)}
              >
                <Box display="flex" justifyContent="space-between">
                  <div className={classes.title}>
                    <div className={classes.sellerName}>{item.partner.name}</div>
                    {!!unreadMessages && (
                      <div className={classes.unreadCount}>{unreadMessages > 99 ? "99+" : unreadMessages}</div>
                    )}
                  </div>
                  <Box display="flex" alignItems="center">
                    <div className={classes.messageDate}>{lastMessageDate}</div>
                    <Status status="Requested" />
                  </Box>
                </Box>
                <div className={classes.message}>
                  {lastMessage?.text ||
                    (lastMessage.message_attachments[0] && lastMessage.message_attachments[0].file_name)}
                </div>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" className={classes.info}>
                  <div>{item.rfq.upc}</div>
                  {!!item.rfq.quantity && !!item.rfq.price && (
                    <div>{`${item.rfq.quantity} x ${formatMoney(item.rfq.price)} € = ${formatMoney(
                      item.rfq.quantity * item.rfq.price,
                    )} €`}</div>
                  )}
                </Box>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatList;
