import React, { useState, useEffect } from "react";
import { Box, Button, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PublishIcon from "@material-ui/icons/Publish";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DoneIcon from "@material-ui/icons/Done";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { FILE_SIZE } from "@src/config";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { slugify } from "@src/utils/utility";
import useAppSelector from "@src/hooks/useAppSelector";
import {
  loadFileSettings,
  loadMisc,
  saveMisc,
  setUploadState,
  updateMisc,
  uploadFileThunk,
} from "@src/store/adapter/adapterActions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useAppTheme from "@src/theme/useAppTheme";
import Preloader from "@src/components/Preloader/Preloader";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import SupplierSelect from "@src/views/supplier-response/Requests/SupplierSelect/SupplierSelect";
import { onChangePartner } from "@src/store/profile/profileActions";
import FileViewer from "./FileViewer/FileViewer";
import { useStyles } from "./adapterUploadStyles";
import Page from "../../../components/Page";

const fieldsInitialState = {
  noheader_row: "",
  supplier: "",
  currency: "",
  // separator: "",
  // encoding: "",
};

const columnsInitialState = {
  mpn_col: "",
  sku_col: "",
  moq_col: "",
  mpq_col: "",
  amount_col: "",
  quantity_col: "",
  quantity_2_col: "",
  quantity_3_col: "",
  desc_col: "",
  price_col: "",
  price_2_col: "",
  price_3_col: "",
  manufacturer_col: "",
  datecode_col: "",
};
const columnIndexes = {
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

const AdapterUpload = () => {
  const classes = useStyles();
  const requestsClasses = useRequestsStyles();
  const appTheme = useAppTheme();
  const dispatch = useDispatch();
  const { t } = useI18n("adapter");

  const upload = useAppSelector((state) => state.adapter.upload);
  const settings = useAppSelector((state) => state.adapter.settings);
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);

  const [miscCreated, setMiscCreated] = useState(false);
  const [misc, setMisc] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fullexport, setFullexport] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [fields, setFields] = useState({ ...fieldsInitialState });
  const [columns, setColumns] = useState({ ...columnsInitialState });
  const [columnsIndexes, setColumnsIndexes] = useState({
    ...columnsInitialState,
  });
  const [startingRow, setStartingRow] = useState(1);
  const [storageFileName, setStorageFileName] = useState(null);

  useEffect(() => {
    dispatch(loadFileSettings());
  }, []);

  useEffect(() => {
    if (storageFileName) {
      setMiscCreated(false);
      loadMisc(storageFileName).then((res) => {
        setMisc(res);

        if (res?.data) {
          const cols = res.data;
          console.log("storageColumns: ", cols);
          if (cols && cols.fields) setFields(cols.fields);
          if (cols && cols.columnsIndexes) {
            const resColumns = { ...columns };
            let resColumnsIndexes = { ...columnsIndexes };
            Object.keys(columnsInitialState).forEach((column) => {
              const columnIndex = cols.columnsIndexes[column];
              const value = columnIndexes[cols.columnsIndexes[column] - 1];
              Object.keys(resColumns).forEach((key) => {
                if (key !== resColumns && resColumns[key] === value) {
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
  }, [storageFileName]);

  useEffect(() => {
    if (!upload.uploading && !upload.error && !upload.fileErrors && file) {
      setUploadedFiles([...uploadedFiles, file.name]);
      setFile(null);
      setColumns({ ...columnsInitialState });
      setStartingRow(1);
      setStorageFileName(null);
    }
  }, [upload]);

  const onFileAccept = (acceptedFiles) => {
    if (!acceptedFiles.length) {
      setHasFocus(false);
      return false;
    }
    if (file !== null) {
      console.log("EXISTS:", file.name);
      setFile(null);
    }
    dispatch(setUploadState({ uploading: false, error: "", fileErrors: null, selected: true }));
    setFileError(null);
    setSelectedSheet(null);
    setFile(acceptedFiles[0]);
    setHasFocus(false);
    setColumns({ ...columnsInitialState });
    setStartingRow(1);

    const fileName = `${slugify(acceptedFiles[0].name)}`;
    console.log("storageFileName: ", fileName);
    setStorageFileName(fileName);
    return true;
  };

  const onFileRemove = () => {
    setFile(null);
    dispatch(setUploadState({ uploading: false, error: "", fileErrors: null, selected: false }));
  };

  const onFocus = () => {
    setHasFocus(true);
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  const onUpload = () => {
    dispatch(
      uploadFileThunk(
        file,
        selectedSheet,
        { ...fields, ...columnsIndexes, supplier: `${selectedPartner.id}` },
        startingRow - 1,
        false,
        fullexport,
      ),
    );
  };

  const onColumnChange = (column, columnIndex, value) => {
    setColumns((prevState) => {
      const cols = { ...prevState };
      Object.keys(cols).map((key) => {
        if (key !== cols && cols[key] === value) {
          cols[key] = "";
        }
        return true;
      });
      cols[column] = value;
      return cols;
    });
    setColumnsIndexes((prevState) => {
      changeMisc({ columnsIndexes: { ...prevState, [column]: columnIndex } });
      return { ...prevState, [column]: columnIndex };
    });
  };

  const onInputChange = (name, value) => {
    setFields((prevState) => {
      changeMisc({ fields: { ...prevState, [name]: value } });
      return { ...prevState, [name]: value };
    });
  };

  const changeMisc = (data) => {
    if (miscCreated || (misc && misc.id)) {
      const miscData = misc ? misc.data : {};
      updateMisc(storageFileName, { ...miscData, ...data });
    } else {
      saveMisc(storageFileName, { ...data }).then((res) => {
        setMiscCreated(true);
        if (res && res.id) setMisc(res);
      });
    }
  };

  const onStartingRowChange = (row) => {
    setStartingRow(row);
  };

  const onChangePartnerHandler = (id) => {
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      dispatch(onChangePartner(partner));
    }
  };

  return (
    <Page style={{ padding: "2em 0" }} title={"File upload"} description={"Uploading suppliers file"}>
      <Container maxWidth={"xl"}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <h1 style={{ marginBottom: 12 }} className={requestsClasses.title}>
            Data file upload
          </h1>
          {selectedPartner && (
            <SupplierSelect
              selectedPartner={selectedPartner}
              partners={partners}
              onChangePartner={onChangePartnerHandler}
            />
          )}
        </Box>
        {!settings && <Preloader title={""} />}
        {settings && (
          <>
            {uploadedFiles.map((item, index) => (
              <Box key={index}>
                <div className={`${classes.file} ${classes.fileUploaded}`}>
                  <div className={classes.fileName}>
                    <AttachFileIcon className={classes.fileIc} />
                    {`File "${item}" uploaded successfully.`}
                  </div>
                  <DoneIcon className={classes.fileSuccess} />
                </div>
              </Box>
            ))}
            {file !== null && (
              <Box>
                <div className={classes.file}>
                  <div className={classes.fileName}>
                    <AttachFileIcon className={classes.fileIc} />
                    {file.name}
                  </div>
                  {upload.uploading && (
                    <div className={classes.fileUploadingWindow}>
                      <div className={classes.fileUploadingWindowHeader}>
                        <DataUsageIcon className={classes.fileUploading} />
                        <span>{t("upload.uploading")}</span>
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
                    <Button
                      style={{ marginLeft: 12, minWidth: 100 }}
                      variant="contained"
                      className={appTheme.buttonCreate}
                      onClick={onUpload}
                    >
                      <PublishIcon className={classes.fileUploadIc} /> {t("upload.upload")}
                    </Button>
                  }
                  <HighlightOffIcon className={classes.fileRemove} onClick={onFileRemove} />
                </div>
              </Box>
            )}
            {file !== null && (
              <>
                {!!upload.fileErrors?.length && (
                  <Alert severity="error" style={{ marginTop: 15 }}>
                    <ul className={classes.fileErrorsList}>
                      {upload.fileErrors.map((err, i) => {
                        return (
                          <li key={i}>
                            <Box display="flex" gridGap="12px">
                              <div>
                                <span>Column:</span> {err.col};
                              </div>
                              <div>
                                <span>Rows:</span> {err.rows};
                              </div>
                              <div>
                                <span>Error:</span> {err.rule};
                              </div>
                            </Box>
                          </li>
                        );
                      })}
                    </ul>
                  </Alert>
                )}
                <FileViewer
                  file={file}
                  columns={columns}
                  fields={fields}
                  fullexport={fullexport}
                  startingRow={startingRow}
                  selectedSheet={selectedSheet}
                  setSelectedSheet={setSelectedSheet}
                  onColumnChange={onColumnChange}
                  onInputChange={onInputChange}
                  onFullexportChange={() => setFullexport((prevState) => !prevState)}
                  onStartingRowChange={onStartingRowChange}
                />
              </>
            )}
            {!file && selectedPartner && (
              <Box>
                <Dropzone
                  accept=".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onDrop={onFileAccept}
                  onDragEnter={onFocus}
                  onDragLeave={onBlur}
                  onDropRejected={(filesRejected) => {
                    if (filesRejected && filesRejected[0] && filesRejected[0].errors[0]) {
                      setFileError(filesRejected[0].errors[0]);
                    }
                  }}
                  maxSize={FILE_SIZE * 1000 * 1000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={`${classes.uploadFrame} ${hasFocus && "has-focus"}`}>
                      <input {...getInputProps()} name="file" />
                      <div className={`${classes.uploadDefaultState} ${hasFocus && "has-focus"}`}>
                        <CloudUploadIcon className={classes.uploadIcon} />
                        <div className={classes.uploadFrameText}>
                          <span dangerouslySetInnerHTML={{ __html: t("upload.drag") }}></span>
                          <button className={classes.uploadBrowse}>{t("upload.click_select")}</button>
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
              </Box>
            )}
          </>
        )}
      </Container>
    </Page>
  );
};

export default AdapterUpload;
