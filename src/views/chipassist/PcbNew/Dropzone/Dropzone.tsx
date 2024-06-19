/* eslint no-param-reassign: "error" */
import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useDropzone } from "react-dropzone";
import { v1 } from "uuid";
import { useStyles } from "./styles";

interface Props {
  files: any[];
  setFiles: (images: any) => void;
  onDeleteFile: (id: string) => void;
  maxSizeError: boolean;
  formState: any;
}

const Dropzone: React.FC<Props> = ({ files, setFiles, onDeleteFile, maxSizeError }) => {
  const { t } = useI18n("feedback");
  const classes = useStyles();

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    disabled: maxSizeError,
    onDrop: (acceptedFiles: any[]) => {
      acceptedFiles.map((item) => {
        item.id = v1();
        return item;
      });
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const createThumbs = (filesArray: any[]) => {
    return filesArray.map((file) => {
      return (
        <div className={classes.thumbWrapper} key={file.id}>
          <div className={classes.thumbName}>
            <AttachmentIcon className={classes.thumbNameIcon} />
            {file.path.length > 40 ? `${file.path.slice(0, 40)}...` : file.path}{" "}
            <span className={classes.thumbSize}>{(file.size / 1024 / 1024).toFixed(2)}mb</span>
          </div>
          <div className={classes.deleteImageWrapper} onClick={() => onDeleteFile(file.id)}>
            <DeleteForeverIcon className={classes.deleteImageIcon} />
          </div>
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

  const notAuthHandler = () => {
    // if (isAuthenticated) return false;
    // const data = Object.keys(formState).reduce((acc, curr) => {
    //   if (formState[curr] !== "null") return { ...acc, [curr]: formState[curr] };
    //   return acc;
    // }, {});
    //
    // localStorage.setItem("pcb_calculator_data", JSON.stringify(data));
    // return navigate(prevEmail ? "/auth/login" : "/auth/registration", {
    //   state: { background: location.state?.background || location },
    // });
  };

  return (
    <div onClick={notAuthHandler}>
      <div {...getRootProps()} className={uploadFrameClassName}>
        <input {...getInputProps()} />
        <CloudUploadIcon className={classes.uploadIcon} />
        <span className={classes.uploadFrameText}>{t("form.dropzone_pcb")}</span>
        <div>{t("pcb.file.max_size", { size: 50 })}</div>
      </div>
      <div>
        <aside className={classes.thumbsContainer}>{createThumbs(files)}</aside>
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

export default Dropzone;
