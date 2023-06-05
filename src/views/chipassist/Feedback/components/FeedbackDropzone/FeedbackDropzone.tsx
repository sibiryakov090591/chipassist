/* eslint no-param-reassign: "error" */
import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useDropzone } from "react-dropzone";
import { v1 } from "uuid";
import { useStyles } from "./FeedBackDropzoneStyles";

interface FeedbackDropzoneProps {
  images: any[];
  screenshots: any[];
  setImages: (images: any) => void;
  deleteScreenshot: (id: string) => void;
  maxSizeError: boolean;
}

const FeedbackDropzone: React.FC<FeedbackDropzoneProps> = ({
  images,
  setImages,
  screenshots,
  deleteScreenshot,
  maxSizeError,
}) => {
  const { t } = useI18n("feedback");
  const classes = useStyles();
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    disabled: maxSizeError,
    accept: "image/*",
    onDrop: (acceptedFiles: any[]) => {
      acceptedFiles.map((item) => {
        item.id = v1();
        return item;
      });
      setImages((prevState: any[]) => [...prevState, ...acceptedFiles]);
    },
  });

  const createThumbs = (files: any[]) => {
    return files.map((file) => {
      const url = URL.createObjectURL(file);
      return (
        <div className={classes.thumb} key={file.id}>
          <div className={classes.thumbInner}>
            <img alt="file" src={url} className={classes.img} />
          </div>
          <div className={classes.deleteImageWrapper} onClick={() => deleteScreenshot(file.id)}>
            <DeleteForeverIcon className={classes.deleteImageIcon} />
          </div>
          <span className={classes.fileSize}>{(file.size / 1024 / 1024).toFixed(2)}mb</span>
        </div>
      );
    });
  };

  const fileRejectionItems = fileRejections.map((response: any) => (
    <li key={response.file.path}>
      {response.file.path} - {(response.file.size / 1024 / 1024).toFixed(2)} Mb
      <ul>
        {response.errors.map((e: any) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const uploadFrameClassName = `${classes.uploadFrame} ${maxSizeError && classes.disabledFrame}`;

  return (
    <div>
      <div {...getRootProps()} className={uploadFrameClassName}>
        <input {...getInputProps()} />
        <CloudUploadIcon className={classes.uploadIcon} />
        <span className={classes.uploadFrameText}>{t("form.dropzone")}</span>
      </div>
      <div>
        <aside className={classes.thumbsContainer}>
          {createThumbs(images)}
          {createThumbs(screenshots)}
        </aside>
        {fileRejectionItems && fileRejectionItems.length > 0 && (
          <>
            <h4>{t("form.rejected_files")}</h4>
            <div>{fileRejectionItems}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackDropzone;
