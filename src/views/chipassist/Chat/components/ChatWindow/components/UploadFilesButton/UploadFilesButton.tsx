import React, { useEffect, useRef, useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useDropzone } from "react-dropzone";
import { v1 } from "uuid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Box, Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddBoxIcon from "@material-ui/icons/AddBox";
import placeholderImg from "@src/images/file.png";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import { useStyles as useMessageInputStyles } from "../MessageInput/styles";
import { useStyles } from "./styles";

interface Props {
  handleSubmit: any;
  handleChange: any;
  message: string;
}

const FallbackImage: React.FC<any> = ({ src, fallbackSrc, ...rest }) => {
  const [imageSource, setImageSource] = useState(src);

  const handleImageError = () => {
    setImageSource(fallbackSrc);
  };

  return <img src={imageSource} onError={handleImageError} {...rest} />;
};

const UploadFilesButton: React.FC<Props> = ({ message, handleSubmit, handleChange }) => {
  const classes = useStyles();
  const messageInputClasses = useMessageInputStyles();
  const textareaRef = useRef(null);
  const textareaWrapperRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

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

  const onEnterHandler = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <Box display="flex">
      <Box display="flex" {...getRootProps()}>
        <input {...getInputProps()} />
        <AttachFileIcon className={classes.attachIcon} />
      </Box>

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
              <ArrowUpwardRoundedIcon className={messageInputClasses.sendIcon} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default UploadFilesButton;
