import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
// import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { getChatList, selectChat } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Filters from "@src/views/chipassist/Chat/components/ChatList/components/Filters/Filters";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
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

  useEffect(() => {
    if (selectedChat) {
      const chatListElem = document.querySelectorAll(".chat-list-item");
      if (chatListElem.length) {
        chatListElem.forEach((node) => {
          node.classList.remove("active");
          const prevElem = node.previousElementSibling;
          if (prevElem) prevElem.classList.remove("prevActive");
        });
      }

      const elem = document.getElementById(`chat-item-${selectedChat.id}`);
      const prevElem = elem && elem.previousElementSibling;
      if (elem) elem.classList.add("active");
      if (prevElem) prevElem.classList.add("prevActive");
    }
  }, [selectedChat]);

  const selectItemHandler = (item: any) => () => {
    if (item.id !== selectedChat?.id) dispatch(selectChat(item));
    if (isXsDown) onShowList(false);
  };

  const onScrollLoading = () => {
    if (!chatList.isLoading) {
      dispatch(getChatList(chatList.page + 1, filters.values, true));
    }
  };

  const onMouseEnterHandler = (id: number) => () => {
    const elem = document.getElementById(`chat-item-${id}`);
    const prevElem = elem.previousElementSibling;

    if (elem) elem.classList.add("borderTransparent");
    if (prevElem) prevElem.classList.add("borderTransparent");
    return true;
  };

  const onMouseLeaveHandler = (id: number) => () => {
    const elem = document.getElementById(`chat-item-${id}`);
    const prevElem = elem.previousElementSibling;

    if (elem) elem.classList.remove("borderTransparent");
    if (prevElem) prevElem.classList.remove("borderTransparent");
    return true;
  };

  return (
    <div className={clsx(classes.leftColumn, { active: showList })}>
      <div className={classes.header}>
        <Filters />
      </div>

      <div ref={chatListRef} className={classes.list}>
        {!chatList.results.length && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            {!chatList.isLoading && chatList.loaded ? <h5>You have no chats</h5> : <Preloader />}
          </Box>
        )}
        <InfiniteScroll
          id="chat-list-inner"
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
                ? selectedChat?.partner &&
                  Object.entries(selectedChat.partner).reduce((acc, i) => {
                    const [key, value] = i;
                    if (value) return acc ? `${acc} ${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
                    return acc;
                  }, "")
                : selectedChat?.partner.first_name;

            return (
              <div
                key={`${item.id}_${index}`}
                id={`chat-item-${item.id}`}
                className={clsx("chat-list-item", classes.item)}
                onMouseEnter={onMouseEnterHandler(item.id)}
                onMouseLeave={onMouseLeaveHandler(item.id)}
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
    </div>
  );
};

export default ChatList;
