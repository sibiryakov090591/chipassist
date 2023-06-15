import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

const UnreadMessagesLabel: React.FC<{ chatId: number; ref: any }> = ({ chatId, ref }) => {
  const classes = useStyles();

  const chatItem = useAppSelector((state) => state.chat.chatList.results.find((chat) => chat.id === chatId));

  if (!chatItem?.unread_messages) return null;
  return (
    <div ref={ref} className={classes.unreadLabel}>
      <span>Unread Messages</span>
    </div>
  );
};

export default UnreadMessagesLabel;
