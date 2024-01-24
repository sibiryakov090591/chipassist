import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Hidden } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import xls_icon from "@src/images/xls_icon.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PublishIcon from "@material-ui/icons/Publish";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DoneIcon from "@material-ui/icons/Done";
import Dropzone from "react-dropzone";
import { Icon } from "react-icons-kit";
import { timesOutline } from "react-icons-kit/typicons/timesOutline";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { FILE_SIZE } from "@src/config";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useSocketClient } from "@src/services/SocketClient";
import { uploadFileThunk, setUploadState, saveSocketUploadFile } from "@src/store/bom/bomActions";
import { loadMiscAction, updateMiscAction, saveMiscAction } from "@src/store/misc/miscActions";
import { slugify, delay } from "@src/utils/utility";
import { invokeRestTransport, invokeWebsocketTransport } from "@src/services/useTransport";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import clsx from "clsx";

import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "@src/components/Preloader/Preloader";
import FileViewer from "../FileViewer/FileViewer";
import { useStyles } from "./style";

interface ColumnsState {
  [key: string]: string | number;
}
interface ColumnIndexesState {
  [key: number]: string;
}

const columnsInitialState: ColumnsState = {
  quantity: "",
  part_number: "",
  description: "",
  attributes: "",
  external_id: "",
};
const columnIndexes: ColumnIndexesState = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
};

const BomUpload: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const socketClient = useSocketClient("bom");
  const { t } = useI18n("bom");
  const navigate = useNavigate();
  const location = useLocation();
  const dropzoneRef = React.useRef(null);
  const fileViewerRef = React.useRef(null);

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const upload = useAppSelector((state) => state.bom.upload);
  const valid: boolean = useAppSelector((state) => state.bom.bomItem.valid);

  const [miscCreated, setMiscCreated] = useState(false);
  const [misc, setMisc] = useState<any>(null);
  const [file, setFile] = useState<File>(null);
  const [isFileParsing, setIsFileParsing] = useState(false);
  const [fileError, setFileError] = useState<any>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnsState>({ ...columnsInitialState });
  const [columnsIndexes, setColumnsIndexes] = useState<ColumnsState>({
    ...columnsInitialState,
  });
  const [startingRow, setStartingRow] = useState(1);
  const [storageFile, setStorageFile] = useState<{ name: string }>(null);
  const [selectErrors, setSelectErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (storageFile) {
      setMiscCreated(false);
      setMisc(null);
      dispatch(loadMiscAction(storageFile.name)).then((res: any) => {
        setMisc(res);

        if (res?.data) {
          const cols = res.data;
          console.log("storageColumns: ", cols);
          if (cols !== null) {
            const resColumns = { ...columns };
            let resColumnsIndexes = { ...columnsIndexes };
            Object.keys(columnsInitialState).forEach((column) => {
              const columnIndex = cols[column];
              const value = columnIndexes[cols[column]];
              Object.keys(resColumns).forEach((key) => {
                if (resColumns[key] === value) {
                  resColumns[key] = "";
                }
                return true;
              });
              resColumns[column] = value;
              resColumnsIndexes = { ...resColumnsIndexes, [column]: columnIndex };
            });
            setColumns(resColumns);
            setColumnsIndexes(resColumnsIndexes);
          }
        }
      });
    }
  }, [storageFile]);

  useEffect(() => {
    if (!upload.uploading && !upload.error && file) {
      setUploadedFiles([...uploadedFiles, file.name]);
      setFile(null);
      setColumns({ ...columnsInitialState });
      setStartingRow(1);
      setStorageFile(null);
    }
  }, [upload]);

  const onFileAccept = (acceptedFiles: File[]) => {
    if (!isAuthenticated) {
      return navigate(prevEmail ? "/auth/login" : "/auth/registration", {
        state: { background: location.state?.background || location },
      });
    }

    if (!acceptedFiles.length) {
      setHasFocus(false);
      return false;
    }
    if (file !== null) {
      console.log("EXISTS:", file.name);
      setFile(null);
    }
    dispatch(setUploadState({ uploading: false, error: "", selected: true }));
    setIsFileParsing(true);
    setFileError(null);
    setFile(acceptedFiles[0]);
    setHasFocus(false);
    setColumns({ ...columnsInitialState });
    setStartingRow(1);
    const fileName = `${slugify(acceptedFiles[0].name)}`;
    console.log("123storageFileName: ", fileName);
    setStorageFile({ name: `${fileName}` });
    return true;
  };

  const onFileRemove = () => {
    setFile(null);
    dispatch(setUploadState({ uploading: false, error: "", selected: false }));
  };

  const onFocus = () => {
    setHasFocus(true);
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  const onUpload = () => {
    console.log("***onUpload***");
    // validating
    let isColumnsSelected = true;
    Object.keys(columns).forEach((key) => {
      if (!columns[key] && (key === "quantity" || key === "part_number")) {
        isColumnsSelected = false;
        setSelectErrors((prevState) => ({ ...prevState, [key]: true }));
      }
    });
    if (!isColumnsSelected) return;

    invokeRestTransport(() => {
      dispatch(uploadFileThunk(file, columnsIndexes, startingRow - 1, false));
    });

    invokeWebsocketTransport(() => {
      dispatch(uploadFileThunk(file, columnsIndexes, startingRow - 1, true)).then((res: any) => {
        if (res.search_id) {
          socketClient.onMessage((data: any) => {
            dispatch(saveSocketUploadFile(data, res.id));
          });
          socketClient.send({ search_id: res.search_id, id: res.id });
        }
      });
    });

    updateMiscAction(slugify(file.name), columnsIndexes);
  };

  const onColumnChange = (column: string, columnIndex: number, value: string) => {
    setSelectErrors((prevState) => {
      const newData = { ...prevState };
      delete newData[column];
      return newData;
    });
    setColumns((prevState) => {
      const cols = { ...prevState };
      Object.keys(cols).map((key) => {
        if (cols[key] === value) {
          cols[key] = "";
        }
        return true;
      });
      cols[column] = value;
      return cols;
    });
    setColumnsIndexes((prevState) => {
      changeMisc({ ...prevState, [column]: columnIndex });
      return { ...prevState, [column]: columnIndex };
    });
  };

  const changeMisc = (data: ColumnsState) => {
    if (miscCreated || misc?.id) {
      const miscData = misc?.data || {};
      dispatch(updateMiscAction(storageFile?.name, { ...miscData, ...data }));
    } else {
      dispatch(saveMiscAction(storageFile?.name, { ...data })).then((res: any) => {
        setMiscCreated(true);
        if (res?.id) setMisc(res);
      });
    }
  };

  const onStartingRowChange = (row: number) => {
    setStartingRow(row);
  };

  const onCheckIsAuthenticated = () => {
    if (!isAuthenticated) {
      navigate(prevEmail ? "/auth/login" : "/auth/registration", {
        state: { background: location.state?.background || location },
      });
    }
  };

  const scrollToFileViewer = async () => {
    await delay(1);
    if (fileViewerRef.current) {
      window.scrollTo({ top: fileViewerRef.current.offsetTop + 30, behavior: "smooth" });
    }
  };

  return (
    <Box>
      <Box>
        <Grid container>
          <Grid item md={6} xs={12}>
            {constants.id === ID_ICSEARCH ? (
              <>
                <Box className={classes.sectionTitle}>
                  <Typography variant="h4" component="h4">
                    {file === null ? t("upload.title") : t("file.title")}
                  </Typography>
                </Box>
                {file === null ? (
                  <Box className={classes.sectionTitle}>
                    <p>- {t("upload.hint_1")}</p>
                  </Box>
                ) : (
                  <Box className={classes.sectionTitle}>
                    <p>- {t("file.hint_1")}</p>
                    <p>- {t("file.hint_2")}</p>
                  </Box>
                )}
              </>
            ) : (
              <div className={classes.contentWrapper}>
                <h2 className={classes.title}>{t("upload.if_not_IC.title")}</h2>
                <p className={classes.text}>{t("upload.if_not_IC.subtitle")}</p>
                <Hidden smDown>
                  <p className={classes.text}>{t("upload.if_not_IC.list_title")}</p>
                  <ul className={classes.list}>
                    <li>{t("upload.if_not_IC.list.li1")}</li>
                    <li>{t("upload.if_not_IC.list.li2")}</li>
                    <li>{t("upload.if_not_IC.list.li3")}</li>
                    <li>{t("upload.if_not_IC.list.li4")}</li>
                  </ul>
                </Hidden>
              </div>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <div onClick={onCheckIsAuthenticated}>
              <Dropzone
                ref={dropzoneRef}
                accept=".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onDrop={onFileAccept}
                onDragEnter={onFocus}
                onDragLeave={onBlur}
                onDropRejected={(filesRejected) => {
                  if (filesRejected && filesRejected[0] && filesRejected[0].errors[0]) {
                    setFileError(filesRejected[0].errors[0]);
                  }
                }}
                maxSize={+FILE_SIZE * 1000 * 1000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={`${classes.uploadFrame} ${hasFocus && "has-focus"}`}>
                    {isAuthenticated && <input {...getInputProps()} name="file" />}
                    <div className={`${classes.uploadDefaultState} ${hasFocus && "has-focus"}`}>
                      <img src={xls_icon} alt="xls_icon" className={classes.uploadIcon} />
                      <div className={classes.uploadFrameText}>
                        <span dangerouslySetInnerHTML={{ __html: t("upload.drag") }}></span>
                        {/* <button className={classes.uploadBrowse}>{t("upload.click_select")}</button> */}
                        <br />
                        <Button
                          variant="contained"
                          className={clsx(appTheme.buttonCreate, classes.selectButton)}
                          // onClick={openDialog}
                        >
                          {t("upload.select_button")}
                        </Button>
                      </div>
                      {fileError && (
                        <div style={{ color: "red", fontWeight: "bold" }}>
                          {t(`upload.errors.${fileError.code}`, { size: FILE_SIZE })}
                        </div>
                      )}
                    </div>
                    <div className={`${classes.uploadFocusState} ${hasFocus && "has-focus"}`}>
                      <AddCircleIcon className={`${classes.uploadFocusIcon} ${hasFocus && "has-focus"}`} />
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box mt={6}>
        {uploadedFiles.map((item, index) => (
          <Box mt={1} key={index}>
            <div className={`${classes.file} ${classes.fileUploaded}`}>
              <div className={classes.fileName}>
                <AttachFileIcon className={classes.fileIc} />
                {item}
              </div>
              <DoneIcon className={classes.fileSuccess} />
            </div>
          </Box>
        ))}
        {file !== null && !isFileParsing && (
          <Box mt={2}>
            <div className={classes.file}>
              <div ref={fileViewerRef} className={classes.fileName}>
                <AttachFileIcon className={classes.fileIc} />
                {file.name}
              </div>
              {upload.uploading && (
                <div className={classes.fileUploadingWindow}>
                  <div className={classes.fileUploadingWindowHeader}>
                    <DataUsageIcon className={classes.fileUploading} />
                    <span className="uploading-bom-file-message">{t("upload.uploading")}</span>
                  </div>
                  <div className={classes.fileUploadingWindowDesc}>
                    <span>{t("upload.uploading_description")}</span>
                  </div>
                </div>
              )}
              {!!upload.error && (
                <Alert severity="error">
                  <span className={classes.fileUploadError}>{upload.error}</span>
                </Alert>
              )}
              {
                <button
                  className={`${appTheme.buttonCreate} ${classes.fileUpload2} bom-upload-file-button`}
                  onClick={onUpload}
                  disabled={!valid || upload.uploading}
                >
                  {constants.id !== ID_ICSEARCH && (
                    <>
                      <PublishIcon className={classes.fileUploadIc} />{" "}
                    </>
                  )}
                  {t("upload.process")}
                </button>
              }
              <Icon className={classes.fileRemove} onClick={onFileRemove} icon={timesOutline} />
            </div>
            {!valid && (
              <Alert severity="warning" style={{ marginTop: "15px" }}>
                <span className={classes.fileUploadError}>{t("upload.errors.file-too-much-rows-1")}</span>
                <br />
                <span className={classes.fileUploadError}>
                  {t("upload.errors.file-too-much-rows-2", {
                    email: constants.id === ID_ICSEARCH ? "info@icsearch.ru" : "info@chipassist.com",
                  })}
                </span>
              </Alert>
            )}
          </Box>
        )}
        {isFileParsing && <Preloader title="File is parsing..." />}
        {file !== null && (
          <FileViewer
            file={file}
            columns={columns}
            startingRow={startingRow}
            selectErrors={selectErrors}
            onColumnChange={onColumnChange}
            onStartingRowChange={onStartingRowChange}
            scrollToFileViewer={scrollToFileViewer}
            isFileParsing={isFileParsing}
            setIsFileParsing={setIsFileParsing}
          />
        )}
      </Box>
    </Box>
  );
};

export default BomUpload;
