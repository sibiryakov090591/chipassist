import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
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
import { changeCurrency } from "@src/store/currency/currencyActions";
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
  const { profileInfo, selectedPartner } = useAppSelector((state) => state.profile);
  const { selected } = useAppSelector((state) => state.currency);

  useEffect(() => {
    if (!selectedChat && profileInfo) {
      const lastChatItem =
        localStorage.getItem("last_selected_chat") && JSON.parse(localStorage.getItem("last_selected_chat"));
      if (
        lastChatItem?.user === profileInfo.id &&
        (isSupplierResponse ? selectedPartner && lastChatItem?.seller === selectedPartner.id : true)
      ) {
        dispatch(getChat(lastChatItem.chat));
      }
    }
  }, [profileInfo, selectedPartner]);

  useEffect(() => {
    if (selectedChat?.rfq?.currency && selectedChat.rfq.currency !== selected.code) {
      dispatch(changeCurrency(selectedChat.rfq.currency));
    }
  }, [selectedChat]);

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
              <h2 className={classes.title}>
                {selectedChat?.title || selectedChat?.rfq?.upc}
                {`${selectedChat?.rfq?.quantity ? `, ${selectedChat?.rfq?.quantity}pcs` : ""}`}
              </h2>
              {isSupplierResponse && selectedChat ? (
                <div className={classes.customer}>
                  Customer: <span>{selectedChat.partner_name}</span>
                </div>
              ) : (
                <div className={classes.seller}>{selectedChat?.partner_name}</div>
              )}
            </div>
          </div>
          <Box display="flex" alignItems="center">
            <div id="chat-order-button-container" />
            <MenuIcon
              className={clsx(classes.showDetailsIcon, { active: showDetails })}
              onClick={onShowDetailsHandler()}
            />
          </Box>
        </Box>

        <Messages onShowDetails={onShowDetailsHandler(false, true)} />
      </Box>
    </SwipeWrapper>
  );
};

export default ChatWindow;
