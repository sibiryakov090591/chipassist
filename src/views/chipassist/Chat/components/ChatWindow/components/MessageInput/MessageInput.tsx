import React, { useEffect, useRef, useState } from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendMessage } from "@src/store/chat/chatActions";
import ScrollToBottom from "@src/views/chipassist/Chat/components/ChatWindow/components/ScrollToBottom/ScrollToBottom";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

interface Props {
  chatId: number;
  isSending: boolean;
  setIsSending: any;
  isShowScrollButton: boolean;
  onScrollToBottom: () => void;
}

const MessageInput: React.FC<Props> = ({ chatId, setIsSending, isSending, isShowScrollButton, onScrollToBottom }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const textareaRef = useRef(null);

  const errorMessage = useAppSelector((state) => state.chat.messages.error);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "18px"; // Reset the height before calculating the new height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content

    // Scroll to the bottom of the textarea
    textarea.scrollTop = textarea.scrollHeight;
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.persist();
    setMessage(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (chatId && message.trim() && !isSending) {
      setIsSending(true);
      dispatch(sendMessage(chatId, message.trim()))
        .then(() => {
          setMessage("");
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  const onEnterHandler = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className={classes.root}>
      <ScrollToBottom onScrollHandler={onScrollToBottom} active={isShowScrollButton} />
      {!!error && <div className={classes.error}>{error}</div>}
      <div className={classes.inputWrapper}>
        <textarea
          className={classes.textarea}
          ref={textareaRef}
          name="message"
          onChange={handleChange}
          onKeyDown={onEnterHandler}
          value={message}
          placeholder="Type a message"
        />
        <ArrowUpwardRoundedIcon className={classes.sendIcon} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default MessageInput;
