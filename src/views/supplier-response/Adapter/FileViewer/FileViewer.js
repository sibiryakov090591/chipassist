import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import XLSX from "xlsx";
import { batch, useDispatch } from "react-redux";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Tabs, Tab } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import CustomSelect from "@src/components/Select/Select";
import Alert from "@material-ui/lab/Alert";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import clsx from "clsx";
import { useStyles } from "./fileViewerStyles";

const csvFormats = ["csv"];
const excelFormats = ["xls", "xlsx"];

const EXCEL_FORMAT = "EXCEL_FORMAT";
const CSV_FORMAT = "CSV_FORMAT";

const FileViewer = ({
  file,
  columns,
  fields,
  // fullexport,
  startingRow,
  selectedSheet,
  setSelectedSheet,
  onColumnChange,
  onInputChange,
  // onFullexportChange,
  onStartingRowChange,
}) => {
  const [data, setData] = useState({ columnsNames: [], rows: [] });
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  // const [isHeader, setIsHeader] = useState(true);
  const [thereIsHeaders, setThereIsHeaders] = useState(false);
  const [timer, setTimer] = useState(null);
  // const partners = useAppSelector((state) => state.profile?.profileInfo?.partners || []);
  const dispatch = useDispatch();
  const classes = useStyles();
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
      const workbook = XLSX.read(data, { type: "array" });
      const newSheetNames = [...workbook.Workbook.Sheets].filter((v) => !v.Hidden).map((v) => v.name);
      const tabName = name || newSheetNames[0] || workbook.SheetNames[0];
      const jsonRows = XLSX.utils.sheet_to_json(workbook.Sheets[tabName], { header: 1 });
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

  const onFieldClear = (field) => () => {
    onInputChange(field, "");
  };

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

  return (
    <div className={classes.fileView}>
      <h2 style={{ fontSize: 20, marginBottom: 25 }}>Choose columns</h2>
      <div>
        <div className={`${classes.selectors} test-file-columns`}>
          {/* <div> */}
          {/*  <CustomSelect */}
          {/*    id="supplier" */}
          {/*    placeholder={t("file.choose_supplier")} */}
          {/*    value={fields.supplier} */}
          {/*    label={ */}
          {/*      <> */}
          {/*        {t("column.supplier")} <span style={{ color: red[500] }}>*</span> */}
          {/*      </> */}
          {/*    } */}
          {/*    options={partners.map((val) => ({ title: val.name, value: val.id }))} */}
          {/*    onChange={onFieldChange("supplier")} */}
          {/*    onClear={onFieldClear("supplier")} */}
          {/*  /> */}
          {/* </div> */}
          {/* <div>
              <Typography variant="caption" display="block" gutterBottom>
                {t("column.partner_name")}
              </Typography>
              <TextField
                label={false}
                name="partner_name"
                className={classes.columnInput}
                onChange={onFieldChange("partner_name")}
                value={fields.partner_name}
                size="small"
                variant="outlined"
              />
            </div> */}
          <div>
            <CustomSelect
              id="currency"
              placeholder={t("file.choose_currency")}
              value={fields.currency}
              label={t("column.currency")}
              options={[
                { title: "EUR", value: "EUR" },
                { title: "USD", value: "USD" },
                { title: "RMB", value: "RMB" },
                // { title: "RUB", value: "RUB" },
              ]}
              onChange={onFieldChange("currency")}
              onClear={onFieldClear("currency")}
            />
          </div>
          {/* <div> */}
          {/*  <Typography variant="caption" display="block" gutterBottom> */}
          {/*    {t("column.separator")} */}
          {/*  </Typography> */}
          {/*  <TextField */}
          {/*    label={false} */}
          {/*    name="separator" */}
          {/*    className={classes.columnInput} */}
          {/*    onChange={onFieldChange("separator")} */}
          {/*    value={fields.separator} */}
          {/*    size="small" */}
          {/*    variant="outlined" */}
          {/*  /> */}
          {/* </div> */}
          {/* <div> */}
          {/*  <Typography variant="caption" display="block" gutterBottom> */}
          {/*    {t("column.encoding")} */}
          {/*  </Typography> */}
          {/*  <CustomSelect */}
          {/*    id="currency" */}
          {/*    placeholder={t("file.choose_encoding")} */}
          {/*    value={fields.encoding} */}
          {/*    options={[ */}
          {/*      { title: "utf8", value: "utf8" }, */}
          {/*      { title: "cp1251", value: "cp1251" }, */}
          {/*    ]} */}
          {/*    onChange={onFieldChange("encoding")} */}
          {/*    onClear={onFieldClear("encoding")} */}
          {/*  /> */}
          {/* </div> */}
        </div>
        <h3 className={classes.title}>General:</h3>
        <div className={`${classes.selectors} test-file-columns`}>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.mpn_col}
              label={
                <>
                  {t("column.mpn_col")} <span style={{ color: red[500] }}>*</span>
                </>
              }
              options={getColumnsSelectOptions("mpn_col")}
              onChange={onColumnSelect("mpn_col")}
              onClear={onColumnSelectClear("mpn_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.sku_col}
              label={t("column.sku_col")}
              options={getColumnsSelectOptions("sku_col")}
              onChange={onColumnSelect("sku_col")}
              onClear={onColumnSelectClear("sku_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.moq_col}
              label={t("column.moq_col")}
              options={getColumnsSelectOptions("moq_col")}
              onChange={onColumnSelect("moq_col")}
              onClear={onColumnSelectClear("moq_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.mpq_col}
              label={t("column.mpq_col")}
              options={getColumnsSelectOptions("mpq_col")}
              onChange={onColumnSelect("mpq_col")}
              onClear={onColumnSelectClear("mpq_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.amount_col}
              label={
                <>
                  {t("column.amount_col")} <span style={{ color: red[500] }}>*</span>
                </>
              }
              options={getColumnsSelectOptions("amount_col")}
              onChange={onColumnSelect("amount_col")}
              onClear={onColumnSelectClear("amount_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.desc_col}
              label={t("column.desc_col")}
              options={getColumnsSelectOptions("desc_col")}
              onChange={onColumnSelect("desc_col")}
              onClear={onColumnSelectClear("desc_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.manufacturer_col}
              label={t("column.manufacturer_col")}
              options={getColumnsSelectOptions("manufacturer_col")}
              onChange={onColumnSelect("manufacturer_col")}
              onClear={onColumnSelectClear("manufacturer_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.datecode_col}
              label={t("column.datecode")}
              options={getColumnsSelectOptions("datecode_col")}
              onChange={onColumnSelect("datecode_col")}
              onClear={onColumnSelectClear("datecode_col")}
            />
          </div>
        </div>
        <h3 className={classes.title}>Price breaks:</h3>
        <div className={`${classes.selectors} test-file-columns`}>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.quantity_col}
              label={t("column.quantity_col")}
              options={getColumnsSelectOptions("quantity_col")}
              onChange={onColumnSelect("quantity_col")}
              onClear={onColumnSelectClear("quantity_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.price_col}
              label={t("column.price_col")}
              options={getColumnsSelectOptions("price_col")}
              onChange={onColumnSelect("price_col")}
              onClear={onColumnSelectClear("price_col")}
            />
          </div>
          <div />
          <div />
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.quantity_2_col}
              label={t("column.quantity_2_col")}
              options={getColumnsSelectOptions("quantity_2_col")}
              onChange={onColumnSelect("quantity_2_col")}
              onClear={onColumnSelectClear("quantity_2_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.price_2_col}
              label={t("column.price_2_col")}
              options={getColumnsSelectOptions("price_2_col")}
              onChange={onColumnSelect("price_2_col")}
              onClear={onColumnSelectClear("price_2_col")}
            />
          </div>
          <div />
          <div />
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.quantity_3_col}
              label={t("column.quantity_3_col")}
              options={getColumnsSelectOptions("quantity_3_col")}
              onChange={onColumnSelect("quantity_3_col")}
              onClear={onColumnSelectClear("quantity_3_col")}
            />
          </div>
          <div>
            <CustomSelect
              placeholder={t("file.choose_column")}
              value={columns.price_3_col}
              label={t("column.price_3_col")}
              options={getColumnsSelectOptions("price_3_col")}
              onChange={onColumnSelect("price_3_col")}
              onClear={onColumnSelectClear("price_3_col")}
            />
          </div>
          <div />
          <div />
        </div>
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
