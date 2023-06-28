import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { useStyles as useChatListStyles } from "@src/views/chipassist/Chat/components/ChatList/styles";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

interface Props {
  onScrollHandler: () => void;
  active: boolean;
  chatId: number;
}

const ScrollToBottom: React.FC<Props> = ({ onScrollHandler, active, chatId }) => {
  const classes = useStyles();
  const chatListClasses = useChatListStyles();

  const chatItem = useAppSelector((state) => state.chat.chatList.results.find((chat) => chat.id === chatId));

  return (
    <span className={clsx(classes.root, { active })} onClick={onScrollHandler}>
      {chatItem && Number(chatItem.unread_messages) > 0 && (
        <div className={clsx(chatListClasses.unreadCount, classes.count)}>
          {Number(chatItem.unread_messages) > 99 ? "99+" : Number(chatItem.unread_messages)}
        </div>
      )}
      <ExpandMoreIcon className={classes.icon} />
    </span>
  );
};

export default ScrollToBottom;
