import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { clsx } from "clsx";
import { useStyles } from "./styles";

const ChatUnreadTotalCount: React.FC<{ className?: string }> = ({ className }) => {
  const classes = useStyles();

  const chatUnreadCount = useAppSelector((state) => state.chat.chatList.unread_total);

  if (!chatUnreadCount) return null;
  return <div className={clsx(classes.unreadCount, className)}>{chatUnreadCount > 99 ? "99+" : chatUnreadCount}</div>;
};

export default ChatUnreadTotalCount;
