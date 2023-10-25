import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Messages from "@src/views/chipassist/Chat/components/ChatWindow/components/Messages/Messages";
import clsx from "clsx";
import useAppSelector from "@src/hooks/useAppSelector";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import SwipeWrapper from "@src/components/SwipeWrapper/SwipeWrapper";
import { getChat } from "@src/store/chat/chatActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

interface Props {
  showList: boolean;
  showDetails: boolean;
  onShowList: (open: boolean) => void;
  onShowDetails: (toggle: boolean, open?: boolean) => void;
}

const ChatWindow: React.FC<Props> = ({ showList, showDetails, onShowList, onShowDetails }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isXsDown = useMediaQuery(theme.breakpoints.down(880));
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  const { selectedChat } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (!selectedChat) {
      const chatId = localStorage.getItem("last_selected_chat");
      if (Number(chatId)) dispatch(getChat(chatId));
    }
  }, []);

  const onShowChatListHandler = () => {
    if (isMdDown && !isXsDown) onShowDetails(false, false);
    onShowList(true);
    if (isXsDown) {
      setTimeout(() => {
        const messagesElem = document.getElementById("chat-messages");
        if (messagesElem) messagesElem.style.display = "none";
      }, 350);
    }
  };

  const onShowDetailsHandler = (toggle = true, open = false) => () => {
    onShowDetails(toggle, open);
    if (isMdDown && !isXsDown) onShowList(false);
    if (isXsDown) {
      setTimeout(() => {
        const messagesElem = document.getElementById("chat-messages");
        if (messagesElem) messagesElem.style.display = "none";
      }, 350);
    }
  };

  const name = React.useMemo(() => {
    return isSupplierResponse
      ? selectedChat?.partner &&
          Object.entries(selectedChat.partner).reduce((acc, item) => {
            const [key, value] = item;
            if (value) return acc ? `${acc} ${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
            return acc;
          }, "")
      : selectedChat?.partner.first_name;
  }, [selectedChat]);

  return (
    <SwipeWrapper
      className={clsx(classes.middleColumn, {
        detailsActive: showDetails,
        chatListActive: showList,
      })}
      leftSwipeAction={onShowDetailsHandler()}
      rightSwipeAction={onShowChatListHandler}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
          <div className={classes.headerInfo}>
            {isMdDown && !showList && (
              <Box display="flex" alignItems="center" pr="16px" onClick={onShowChatListHandler}>
                <ArrowBackIosRoundedIcon />
              </Box>
            )}
            <div>
              <h2 className={classes.title}>{selectedChat?.title || selectedChat?.rfq?.upc}</h2>
              {isSupplierResponse && selectedChat ? (
                <div className={classes.customer}>
                  Customer: <span>{name}</span>
                </div>
              ) : (
                <div className={classes.seller}>{name}</div>
              )}
            </div>
          </div>
          <MoreVertIcon
            className={clsx(classes.showDetailsIcon, { active: showDetails })}
            onClick={onShowDetailsHandler()}
          />
        </Box>

        <Messages onShowDetails={onShowDetailsHandler(false, true)} />
      </Box>
    </SwipeWrapper>
  );
};

export default ChatWindow;
