import React, { useEffect, useRef, useState } from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendMessage } from "@src/store/chat/chatActions";
import ScrollToBottom from "@src/views/chipassist/Chat/components/ChatWindow/components/ScrollToBottom/ScrollToBottom";
import useAppSelector from "@src/hooks/useAppSelector";
import Box from "@material-ui/core/Box";
import UploadFilesButton from "@src/views/chipassist/Chat/components/ChatWindow/components/UploadFilesButton/UploadFilesButton";
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
  const inputWrapperRef = useRef(null);

  const errorMessage = useAppSelector((state) => state.chat.messages.error);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const inputWrapper = inputWrapperRef.current;
    textarea.style.height = "32px"; // Reset the height before calculating the new height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
    textarea.scrollTop = textarea.scrollHeight; // Scroll to the bottom of the textarea

    textarea.style.overflowY = textarea.scrollHeight > 230 ? "auto" : "hidden";
    inputWrapper.style.borderRadius = textarea.scrollHeight > 32 ? `8px` : "50ch";
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
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={classes.root}>
      <ScrollToBottom onScrollHandler={onScrollToBottom} active={isShowScrollButton} />
      {!!error && <div className={classes.error}>{error}</div>}
      <Box display="flex" alignItems="center">
        <UploadFilesButton handleSubmit={handleSubmit} handleChange={handleChange} message={message} />
        <div ref={inputWrapperRef} className={classes.input}>
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
      </Box>
    </div>
  );
};

export default MessageInput;
