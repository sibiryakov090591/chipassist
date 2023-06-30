import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

const UnreadMessagesLabel: React.FC<{ chatId: number }> = ({ chatId }) => {
  const classes = useStyles();

  const chatItem = useAppSelector((state) => state.chat.chatList.results.find((chat) => chat.id === chatId));

  if (!chatItem || !Number(chatItem.unread_messages)) return null;
  return <div className={classes.unreadLabel}>Unread Messages</div>;
};

export default UnreadMessagesLabel;
