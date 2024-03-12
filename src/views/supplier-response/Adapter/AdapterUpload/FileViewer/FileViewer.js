import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { read, utils } from "xlsx";
import { batch, useDispatch } from "react-redux";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Tabs, Tab, Box, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import CustomSelect from "@src/components/Select/Select";
import Alert from "@material-ui/lab/Alert";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import clsx from "clsx";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PublishIcon from "@material-ui/icons/Publish";
import useAppTheme from "@src/theme/useAppTheme";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CurrencyMenu from "@src/components/CurrencyMenu/CurrencyMenu";
import SelectButton from "@src/components/SelectButton/SelectButton";
import { useStyles } from "./fileViewerStyles";

const csvFormats = ["csv"];
const excelFormats = ["xls", "xlsx"];

const EXCEL_FORMAT = "EXCEL_FORMAT";
const CSV_FORMAT = "CSV_FORMAT";

const requestModeOptions = [
  { label: "Default", value: "default" },
  { label: "Database", value: "database" },
  { label: "API Octopart", value: "api_octopart" },
];

const FileViewer = ({
  file,
  columns,
  columnNames,
  fields,
  // fullexport,
  startingRow,
  selectedSheet,
  setSelectedSheet,
  onColumnChange,
  onInputChange,
  // onFullexportChange,
  onStartingRowChange,
  onUpload,
  onFileRemove,
}) => {
  const [data, setData] = useState({ columnsNames: [], rows: [] });
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  // const [isHeader, setIsHeader] = useState(true);
  const [thereIsHeaders, setThereIsHeaders] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isShowPriceBreaks, setIsShowPriceBreaks] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("adapter");
  const rowsCount = 100;

  const getFileFormat = (fileName) => {
    let fileFormat = "";
    const fileNameParts = fileName.split(".");
    const fileFormatString = fileNameParts[fileNameParts.length - 1].toLowerCase();

    if (csvFormats.includes(fileFormatString)) {
      fileFormat = CSV_FORMAT;
    }

    if (excelFormats.includes(fileFormatString)) {
      fileFormat = EXCEL_FORMAT;
    }

    return fileFormat;
  };

  const getColumnsNames = (rows) => {
    const letters = [..."abcdefghijklmnopqrstuvwxyz"];
    const names = [];
    let count = 0;
    let i = 0;
    let j = 0;
    let firstPart = "";
    let partIndex = 0;
    let partRepeat = 1;

    // eslint-disable-next-line no-shadow
    for (let i = 0; i < rows.length; i += 1) {
      if (count < rows[i].length) {
        count = rows[i].length;
      }
    }

    while (i < count) {
      if (j === letters.length) {
        j = 0;
        if (partIndex === letters.length) {
          partIndex = 0;
          partRepeat += 1;
        }
        firstPart = letters[partIndex].repeat(partRepeat);
        partIndex += 1;
      }
      names.push((firstPart + letters[j]).toUpperCase());
      j += 1;
      i += 1;
    }

    return names;
  };

  const saveCsvFormatData = () => {
    Papa.parse(file, {
      // delimiter: ";",
      complete(results) {
        setData({
          columnsNames: getColumnsNames(results.data),
          rows: (results.data && results.data.length && results.data.slice(0, rowsCount)) || [],
          rowsTotalCount: (results.data && results.data.length) || 0,
        });
        if (!results.data || !results.data.length || !results.data[0].length || results.data[0].length < 2) {
          dispatch(
            showBottomLeftMessageAlertAction({
              text: `${t("file.check")}`,
              severity: "warning",
            }),
          );
        }
      },
    });
  };

  const saveExcelFormatData = (name) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // eslint-disable-next-line no-shadow
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const newSheetNames = [...workbook.Workbook.Sheets].filter((v) => !v.Hidden).map((v) => v.name);
      const tabName = name || newSheetNames[0] || workbook.SheetNames[0];
      const jsonRows = utils.sheet_to_json(workbook.Sheets[tabName], { header: 1 });
      const rows = JSON.parse(JSON.stringify(jsonRows, 2, 2));
      batch(() => {
        setSelectedSheet(tabName);
        setSheetNames(newSheetNames);
        setData({
          columnsNames: getColumnsNames(rows),
          rows: (rows && rows.length && rows.slice(0, rowsCount)) || [],
          rowsTotalCount: (rows && rows.length) || 0,
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const onColumnSelect = (field) => (value) => {
    const index = data.columnsNames.indexOf(value) + 1;
    onColumnChange(field, index, value);
    setSelectedColumn(data.columnsNames.indexOf(value));
    clearTimeout(timer);
    setTimer(setTimeout(() => setSelectedColumn(null), 2000));
  };

  const onColumnSelectClear = (field) => () => {
    onColumnChange(field, "");
  };

  const onFieldChange = (field) => (value) => {
    onInputChange(field, typeof value === "object" ? value.currentTarget.value : value);
  };

  // const onFieldClear = (field) => () => {
  //   onInputChange(field, "");
  // };

  const onRowClick = (index) => () => {
    onStartingRowChange(index);
  };

  const getColumnsSelectOptions = (field) => {
    const startingRowColumn = startingRow === 1 ? startingRow - 1 : thereIsHeaders ? 0 : startingRow - 2;
    const selectedIndexes = data.columnsNames.reduce((acc, item, index) => {
      const selectedIndex = Object.keys(columns).filter((key) => {
        if (key !== field && columns[key] === item) {
          return true;
        }
        return false;
      });
      return !selectedIndex.length ? acc : [...acc, index];
    }, []);

    const filterRows = data.rows.map((val) => {
      return val.filter((item, i) => {
        return !selectedIndexes.includes(i);
      });
    });
    return data.columnsNames
      .filter((item, i) => {
        return !selectedIndexes.includes(i);
      })
      .map((item, index) => {
        return {
          value: item,
          title: `${item} ${
            filterRows[startingRowColumn] && filterRows[startingRowColumn][index]
              ? `- ${filterRows[startingRowColumn][index]}`
              : ""
          }`,
        };
      });
  };

  useEffect(() => {
    const fileFormat = getFileFormat(file.name);

    switch (fileFormat) {
      case CSV_FORMAT:
        saveCsvFormatData();
        break;
      case EXCEL_FORMAT:
        saveExcelFormatData(selectedSheet);
        break;
      default:
        break;
    }
  }, [file, selectedSheet]);

  useEffect(() => {
    // Check valid starting row
    if (data.rows.length) {
      const regExp = /part|number|quantity|qty|парт|номер|кол-во|количество/i;
      data.rows[0].forEach((item) => {
        if (typeof item === "string" && item?.match(regExp)) {
          onStartingRowChange(2);
          setThereIsHeaders(true);
        }
      });
    }
  }, [data.rows]);

  // useEffect(() => {
  //   const qtyIndex = data.columnsNames && data.columnsNames.indexOf(columns.quantity);
  //   if (qtyIndex >= 0) {
  //     setIsHeader(Number.isNaN((+data.rows[0][qtyIndex]).toString().replaceAll(",", "").replaceAll(" ", "")));
  //   }
  // }, [data, columns]);

  const onShowPriceBreaks = () => setIsShowPriceBreaks((prev) => !prev);

  return (
    <div className={classes.fileView}>
      <Box display="flex" justifyContent="space-between">
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 25 }}>Choose columns</h2>
          <div className={`${classes.selectors} test-file-columns`}>
            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.mpn}
                label={
                  <>
                    {columnNames.mpn} <span style={{ color: red[500] }}>*</span>
                  </>
                }
                options={getColumnsSelectOptions("mpn")}
                onChange={onColumnSelect("mpn")}
                onClear={onColumnSelectClear("mpn")}
              />
            </div>
            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.num_in_stock}
                label={
                  <>
                    {columnNames.num_in_stock} <span style={{ color: red[500] }}>*</span>
                  </>
                }
                options={getColumnsSelectOptions("num_in_stock")}
                onChange={onColumnSelect("num_in_stock")}
                onClear={onColumnSelectClear("num_in_stock")}
              />
            </div>
            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.datecode}
                label={columnNames.datecode}
                options={getColumnsSelectOptions("datecode")}
                onChange={onColumnSelect("datecode")}
                onClear={onColumnSelectClear("datecode")}
              />
            </div>
            <div>
              <Box className={classes.priceField} display="flex" alignItems="center" gridGap="12px">
                <CustomSelect
                  disabled={isShowPriceBreaks}
                  style={{ backgroundColor: "#f4f6f8" }}
                  placeholder={t("file.choose_column")}
                  value={columns.price}
                  label={columnNames.price}
                  options={getColumnsSelectOptions("price")}
                  onChange={onColumnSelect("price")}
                  onClear={onColumnSelectClear("price")}
                />
                <Box display="flex" justifyContent="center" style={{ flexGrow: 1 }}>
                  <CurrencyMenu setCurrencyHandler={onFieldChange("currency")} selected={fields.currency} />
                </Box>
              </Box>
            </div>

            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.moq}
                label={columnNames.moq}
                options={getColumnsSelectOptions("moq")}
                onChange={onColumnSelect("moq")}
                onClear={onColumnSelectClear("moq")}
              />
            </div>
            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.mpq}
                label={columnNames.mpq}
                options={getColumnsSelectOptions("mpq")}
                onChange={onColumnSelect("mpq")}
                onClear={onColumnSelectClear("mpq")}
              />
            </div>
            <div className={classes.field}>
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.manufacturer}
                label={columnNames.manufacturer}
                options={getColumnsSelectOptions("manufacturer")}
                onChange={onColumnSelect("manufacturer")}
                onClear={onColumnSelectClear("manufacturer")}
              />
            </div>
            <Box className={classes.field} display="flex" alignItems="center" gridGap="12px">
              <CustomSelect
                placeholder={t("file.choose_column")}
                value={columns.desc}
                label={columnNames.desc}
                options={getColumnsSelectOptions("desc")}
                onChange={onColumnSelect("desc")}
                onClear={onColumnSelectClear("desc")}
              />
              <Box display="flex" justifyContent="center" style={{ flexGrow: 1 }}>
                <Button
                  variant="contained"
                  className={clsx(appTheme.buttonCreate, classes.priceButton)}
                  onClick={onShowPriceBreaks}
                >
                  Price breaks
                  <KeyboardArrowDownIcon className={clsx(classes.priceArrow, { active: isShowPriceBreaks })} />
                </Button>
              </Box>
            </Box>
            <div />
            {/* <div> */}
            {/*  <CustomSelect */}
            {/*    placeholder={t("file.choose_column")} */}
            {/*    value={columns.sku} */}
            {/*    label={columnNames.sku} */}
            {/*    options={getColumnsSelectOptions("sku")} */}
            {/*    onChange={onColumnSelect("sku")} */}
            {/*    onClear={onColumnSelectClear("sku")} */}
            {/*  /> */}
            {/* </div> */}
          </div>
          {isShowPriceBreaks && (
            <>
              <h3 className={classes.title}>Price breaks:</h3>
              <div className={`${classes.selectors} test-file-columns`}>
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.quantity}
                    label={columnNames.quantity}
                    options={getColumnsSelectOptions("quantity")}
                    onChange={onColumnSelect("quantity")}
                    onClear={onColumnSelectClear("quantity")}
                  />
                </div>
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.price}
                    label={`${columnNames.price} 1`}
                    options={getColumnsSelectOptions("price")}
                    onChange={onColumnSelect("price")}
                    onClear={onColumnSelectClear("price")}
                  />
                </div>
                <div />
                <div />
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.quantity_2}
                    label={columnNames.quantity_2}
                    options={getColumnsSelectOptions("quantity_2")}
                    onChange={onColumnSelect("quantity_2")}
                    onClear={onColumnSelectClear("quantity_2")}
                  />
                </div>
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.price_2}
                    label={columnNames.price_2}
                    options={getColumnsSelectOptions("price_2")}
                    onChange={onColumnSelect("price_2")}
                    onClear={onColumnSelectClear("price_2")}
                  />
                </div>
                <div />
                <div />
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.quantity_3}
                    label={columnNames.quantity_3}
                    options={getColumnsSelectOptions("quantity_3")}
                    onChange={onColumnSelect("quantity_3")}
                    onClear={onColumnSelectClear("quantity_3")}
                  />
                </div>
                <div className={classes.field}>
                  <CustomSelect
                    placeholder={t("file.choose_column")}
                    value={columns.price_3}
                    label={columnNames.price_3}
                    options={getColumnsSelectOptions("price_3")}
                    onChange={onColumnSelect("price_3")}
                    onClear={onColumnSelectClear("price_3")}
                  />
                </div>
                <div />
                <div />
              </div>
            </>
          )}
          <Box display="flex" alignItems="center" gap="16px">
            <h3 style={{ margin: "0 16px 0 0" }} className={classes.title}>
              Request mode:
            </h3>
            <SelectButton
              selected={fields.request_mode}
              options={requestModeOptions}
              onChange={onFieldChange("request_mode")}
            />
          </Box>
          {/* <div className={classes.startingRowInfo}> */}
          {/*  <FormControlLabel */}
          {/*    control={<Checkbox name="noheader_row" onChange={onFullexportChange} checked={fullexport} />} */}
          {/*    label={t("column.noheader_row")} */}
          {/*  /> */}
          {/* </div> */}
          <div className={classes.startingRowInfo}>
            <Alert icon={<ErrorOutlineIcon />} severity="success">
              <div>
                <span>
                  <i>{startingRow}</i> —{" "}
                </span>
                <span style={{ fontWeight: 600 }}>{t("file.hint")}</span>
              </div>
            </Alert>
          </div>
        </div>

        <div>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Button
              style={{ marginLeft: 12, minWidth: 150, textTransform: "uppercase" }}
              variant="contained"
              className={appTheme.buttonCreate}
              onClick={onUpload}
            >
              <PublishIcon className={classes.fileUploadIc} /> {t("upload.upload")}
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end" mt="8px" ml="8px">
            <span style={{ wordBreak: "break-word" }}>{file.name}</span>
            <HighlightOffIcon className={classes.fileRemove} onClick={onFileRemove} />
          </Box>
        </div>
      </Box>
      {/* Using tabs is temporary hidden, a first tab is selected automatically */}
      {false && !!sheetNames.length && (
        <Tabs
          value={selectedSheet}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, val) => {
            saveExcelFormatData(val);
          }}
          aria-label="disabled tabs example"
        >
          {sheetNames.map((v) => (
            <Tab
              className={classes.tab}
              key={v}
              label={
                <React.Fragment>
                  {v}
                  {v === selectedSheet && <span className={classes.tabSelectedHint}>Selected for upload</span>}
                </React.Fragment>
              }
              value={v}
            />
          ))}
        </Tabs>
      )}
      <div className={classes.tableScroll}>
        <table className={classes.table}>
          <tbody>
            {(!data.columnsNames.length || !data.rows.length) && (
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}
                >
                  No data. Please, select another tab or fill out the file
                </td>
              </tr>
            )}
            {!!data.columnsNames.length && (
              <tr>
                <td className={`${classes.tableSystemCell} ${classes.tableHeadCell}`}></td>
                {data.columnsNames.map((item, index) => (
                  <td
                    className={`${classes.tableSystemCell} ${index === selectedColumn && classes.highlight} ${
                      classes.tableHeadCell
                    }`}
                    key={index}
                  >
                    {item}
                  </td>
                ))}
              </tr>
            )}
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className={clsx({
                  [classes.header]: index + 1 < startingRow,
                  [classes.startingRow]: index + 1 === startingRow,
                })}
                onClick={onRowClick(index + 1)}
              >
                <td className={classes.tableSystemCell}>{index + 1}</td>
                {row.map((item, i) => (
                  <td key={i} className={`${i === selectedColumn && classes.highlight}`}>
                    {item}
                  </td>
                ))}
              </tr>
            ))}
            {data.rows.length === rowsCount && (
              <tr>
                <td colSpan="999">
                  <b>
                    Displayed only {rowsCount} of {data.rowsTotalCount} rows
                  </b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileViewer;
