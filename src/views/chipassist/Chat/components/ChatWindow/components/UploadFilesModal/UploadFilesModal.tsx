import React, { useEffect, useRef } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Box, Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddBoxIcon from "@material-ui/icons/AddBox";
import placeholderImg from "@src/images/file.png";
import FallbackImage from "@src/components/FallbackImage/FallbackImage";
import { useStyles as useMessageInputStyles } from "../MessageInput/styles";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  message: string;
  files: File[];
  handleChange: any;
  onEnterHandler: any;
  onCloseModal: any;
  onAddFiles: any;
  handleDeleteFile: any;
}

const UploadFilesModal: React.FC<Props> = ({
  open,
  onCloseModal,
  onAddFiles,
  handleDeleteFile,
  files,
  message,
  handleChange,
  onEnterHandler,
}) => {
  const classes = useStyles();
  const messageInputClasses = useMessageInputStyles();
  const textareaRef = useRef(null);
  const textareaWrapperRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const textareaWrapper = textareaWrapperRef.current;
    if (textarea && textareaWrapper) {
      textarea.style.height = "32px"; // Reset the height before calculating the new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
      textarea.scrollTop = textarea.scrollHeight; // Scroll to the bottom of the textarea

      textarea.style.overflowY = textarea.scrollHeight > 130 ? "auto" : "hidden";
      textareaWrapper.style.borderRadius = textarea.scrollHeight > 32 ? `8px` : "50ch";
    }
  }, [message]);

  const createThumbs = (items: any[]) => {
    return items.map((item) => {
      const url = URL.createObjectURL(item);
      return (
        <Box key={item.id} display="flex" flexDirection="column">
          <span className={classes.fileName}>{item.path}</span>
          <div className={classes.thumb}>
            <FallbackImage className={classes.img} src={url} fallbackSrc={placeholderImg} alt={`file_${item.id}`} />
            <div className={classes.deleteImageWrapper} onClick={() => handleDeleteFile(item.id)}>
              <DeleteForeverIcon className={classes.deleteImageIcon} />
            </div>
            <span className={classes.fileSize}>{(item.size / 1024 / 1024).toFixed(2)}mb</span>
          </div>
        </Box>
      );
    });
  };

  return (
    <Dialog id="chat-upload-files-modal" className={classes.modal} open={open} onClose={onCloseModal}>
      <div className={classes.formContainer}>
        <div className={classes.formHeader}>
          <Typography className={classes.title} variant="h4" component="h4" gutterBottom>
            Send files
          </Typography>
          <div>
            <AddBoxIcon onClick={onAddFiles} className={classes.addButton} />
            <IconButton aria-label="close" onClick={onCloseModal} className={classes.iconButton}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <Box display="flex" flexWrap="wrap" gridGap="6px" m="12px 0">
          {createThumbs(files)}
        </Box>

        <div className={classes.inputWrapper}>
          <div ref={textareaWrapperRef} className={messageInputClasses.input}>
            <textarea
              className={messageInputClasses.textarea}
              ref={textareaRef}
              name="message"
              onChange={handleChange}
              onKeyDown={onEnterHandler}
              value={message}
              placeholder="Type a message"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadFilesModal;
