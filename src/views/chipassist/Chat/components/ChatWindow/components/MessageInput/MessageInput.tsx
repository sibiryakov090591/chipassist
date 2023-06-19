import React, { useEffect, useRef, useState } from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendMessage, sendFiles } from "@src/store/chat/chatActions";
import ScrollToBottom from "@src/views/chipassist/Chat/components/ChatWindow/components/ScrollToBottom/ScrollToBottom";
import useAppSelector from "@src/hooks/useAppSelector";
import Box from "@material-ui/core/Box";
import UploadFilesModal from "@src/views/chipassist/Chat/components/ChatWindow/components/UploadFilesModal/UploadFilesModal";
import { useDropzone } from "react-dropzone";
import { v1 } from "uuid";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useStyles } from "./styles";

interface Props {
  chatId: number;
  isSending: boolean;
  setIsSending: any;
  isShowScrollButton: boolean;
  onScrollToBottom: () => void;
  minLoadedPage: number;
}

const MessageInput: React.FC<Props> = ({
  chatId,
  setIsSending,
  isSending,
  isShowScrollButton,
  onScrollToBottom,
  minLoadedPage,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const textareaRef = useRef(null);
  const inputWrapperRef = useRef(null);

  const errorMessage = useAppSelector((state) => state.chat.messages.error);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(errorMessage);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open: openDropzone } = useDropzone({
    // accept: "image/*",
    noDrag: true,
    onDrop: (acceptedFiles: any[]) => {
      acceptedFiles.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.id = v1();
        return item;
      });
      setFiles((prevState: any[]) => [...prevState, ...acceptedFiles]);
      setOpen(true);
    },
  });

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

  const onCloseModal = () => {
    setOpen(false);
    setTimeout(() => setFiles([]), 500);
  };

  const onAddFiles = () => {
    openDropzone();
  };

  const handleDeleteFile = (id: string) => {
    if (files.length > 1) return setFiles(files.filter((i) => i.id !== id));
    setOpen(false);
    return setTimeout(() => setFiles([]), 500);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.persist();
    setMessage(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (chatId && !isSending) {
      setIsSending(true);

      if (minLoadedPage > 1) {
        console.log(minLoadedPage);
      }

      const promises: any = [];
      if (message.trim()) {
        promises.push(dispatch(sendMessage(chatId, message.trim())).then(() => setMessage("")));
      }
      if (files.length) {
        setOpen(false);
        promises.push(dispatch(sendFiles(chatId, files)).finally(() => setFiles([])));
      }

      Promise.all(promises).finally(() => setIsSending(false));
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
        <Box display="flex" {...getRootProps()}>
          <input {...getInputProps()} />
          <AttachFileIcon className={classes.attachIcon} />
        </Box>
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

      <UploadFilesModal
        open={open}
        message={message}
        files={files}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onEnterHandler={onEnterHandler}
        handleDeleteFile={handleDeleteFile}
        onAddFiles={onAddFiles}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default MessageInput;
