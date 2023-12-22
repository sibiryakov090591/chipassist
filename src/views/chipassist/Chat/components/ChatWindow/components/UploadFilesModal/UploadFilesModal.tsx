import React, { useEffect, useRef } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Box, Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import placeholderImg from "@src/images/file.png";
import FallbackImage from "@src/components/FallbackImage/FallbackImage";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles as useMessageInputStyles } from "../MessageInput/styles";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  message: string;
  files: File[];
  handleSubmit: any;
  handleChange: any;
  onEnterHandler: any;
  onCloseModal: any;
  onAddFiles: any;
  handleDeleteFile: any;
  onClearMessage: any;
}

const UploadFilesModal: React.FC<Props> = ({
  open,
  onCloseModal,
  onAddFiles,
  handleDeleteFile,
  files,
  message,
  handleSubmit,
  handleChange,
  onEnterHandler,
  onClearMessage,
}) => {
  const classes = useStyles();
  const messageInputClasses = useMessageInputStyles();
  const textareaRef = useRef(null);
  const textareaWrapperRef = useRef(null);
  const { t } = useI18n("chat");
  const [val, setVal] = React.useState(message);

  React.useEffect(() => {
    if (open) {
      setVal(message);
    }
  }, [message, open]);

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
  }, [val]);

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
            {t("upload_file.send")}
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
              value={val}
              placeholder={t("upload_file.type")}
            />
            {!!message && (
              <Box display="flex">
                <CloseIcon className={messageInputClasses.clearIcon} onClick={onClearMessage} />
              </Box>
            )}
          </div>
          <ArrowUpwardRoundedIcon className={messageInputClasses.sendIcon} onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
};

export default UploadFilesModal;
