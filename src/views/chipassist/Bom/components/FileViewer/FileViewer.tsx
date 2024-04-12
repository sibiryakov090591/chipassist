import React, { useState, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";
import { read, utils } from "xlsx";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Typography } from "@material-ui/core";
import { CustomSelect } from "@src/components/index";
import Alert from "@material-ui/lab/Alert";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import clsx from "clsx";
import { useStyles } from "./style";

const csvFormats = ["csv"];
const excelFormats = ["xls", "xlsx"];

const EXCEL_FORMAT = "EXCEL_FORMAT";
const CSV_FORMAT = "CSV_FORMAT";

interface Props {
  file: File;
  columns: { [key: string]: string | number };
  startingRow: number;
  onColumnChange: (column: string, columnIndex: number, value: string) => void;
  onStartingRowChange: (row: number) => void;
  selectErrors: { [key: string]: boolean };
  scrollToFileViewer: () => void;
  setIsFileParsing: React.Dispatch<React.SetStateAction<boolean>>;
  delimiterRef: any;
  isFileParsing: boolean;
}

type ParseData = Array<string | number | null>;

interface Data {
  columnsNames: string[];
  rows: ParseData[];
}

const FileViewer: React.FC<Props> = ({
  file,
  columns,
  startingRow,
  onColumnChange,
  onStartingRowChange,
  selectErrors,
  scrollToFileViewer,
  setIsFileParsing,
  isFileParsing,
  delimiterRef,
}) => {
  const [data, setData] = useState<Data>({ columnsNames: [], rows: [] });
  const [selectedColumn, setSelectedColumn] = useState(null);
  // const [isHeader, setIsHeader] = useState(true);
  const [timer, setTimer] = useState(null);
  const [thereIsHeaders, setThereIsHeaders] = useState(false);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { t } = useI18n("bom");

  const getFileFormat = (fileName: string) => {
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

  const getColumnsNames = (rows: ParseData[]) => {
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
      complete(results: ParseResult<ParseData>) {
        const filteredRows = results.data?.filter((elem) => elem.length !== 0);
        setData({
          columnsNames: getColumnsNames(results.data),
          rows: filteredRows,
        });
        // eslint-disable-next-line no-param-reassign
        delimiterRef.current = results.meta.delimiter; // set a delimiter for request
        if (!filteredRows || !filteredRows?.length || !filteredRows[0]?.length || filteredRows[0]?.length < 2) {
          console.log("Check CSV file delimeter, ';' required", filteredRows[0]?.length);
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

  const saveExcelFormatData = () => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<any>) => {
      // eslint-disable-next-line no-shadow
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const rows = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
      const json: ParseData[] = JSON.parse(JSON.stringify(rows, [2], 2));
      setData({
        columnsNames: getColumnsNames(json),
        rows: json?.filter((elem) => elem.length !== 0),
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const onColumnSelect = (field: string) => (value: string) => {
    const index = data.columnsNames.indexOf(value);
    onColumnChange(field, index, value);
    setSelectedColumn(data.columnsNames.indexOf(value));
    clearTimeout(timer);
    setTimer(setTimeout(() => setSelectedColumn(null), 2000));
  };

  const onColumnSelectClear = (field: string) => () => {
    onColumnChange(field, null, null);
  };

  const onRowClick = (index: number) => () => {
    onStartingRowChange(index);
  };

  const getColumnsSelectOptions = (field: string) => {
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
        saveExcelFormatData();
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    if (!!data.columnsNames.length || !!data.rows.length) {
      scrollToFileViewer();
      setIsFileParsing(false);
      // dispatch(markBomAsInvalid(data.rows.length > 100));
    }
  }, [data]);

  if (isFileParsing) return null;
  return (
    <div className={classes.fileView}>
      {!!data.columnsNames.length && (
        <div>
          <Typography className={classes.title}>{t("file.choose_columns")}</Typography>
          <div className={`${classes.selectors} bom-upload-file-columns`}>
            <div>
              <Typography variant="caption" display="block" gutterBottom>
                {t("column.part_number")}
                <span>*</span>
              </Typography>
              <CustomSelect
                error={selectErrors.part_number && classes.selectError}
                id="partnumber_select"
                placeholder={t("file.choose_column")}
                value={columns.part_number}
                options={getColumnsSelectOptions("part_number")}
                onChange={onColumnSelect("part_number")}
                onClear={onColumnSelectClear("part_number")}
              />
              {selectErrors.part_number && (
                <div className={classes.helperText}>{`${t("column.part_number")} ${t("feedback.form.required")}`}</div>
              )}
            </div>
            <div>
              <Typography variant="caption" display="block" gutterBottom>
                {t("column.qty")}
                <span>*</span>
              </Typography>
              <CustomSelect
                error={selectErrors.quantity && classes.selectError}
                id="quantity_select"
                placeholder={t("file.choose_column")}
                value={columns.quantity}
                options={getColumnsSelectOptions("quantity")}
                onChange={onColumnSelect("quantity")}
                onClear={onColumnSelectClear("quantity")}
              />
              {selectErrors.quantity && (
                <div className={classes.helperText}>{`${t("column.qty")} ${t("feedback.form.required")}`}</div>
              )}
            </div>
            <div>
              {/* <Typography variant="caption" display="block" gutterBottom> */}
              {/*  {t("column.description")} */}
              {/* </Typography> */}
              {/* <CustomSelect */}
              {/*  id="description_select" */}
              {/*  placeholder={t("file.choose_column")} */}
              {/*  value={columns.description} */}
              {/*  options={getColumnsSelectOptions("description")} */}
              {/*  onChange={onColumnSelect("description")} */}
              {/*  onClear={onColumnSelectClear("description")} */}
              {/* /> */}
            </div>
            <div>
              {/* <Typography variant="caption" display="block" gutterBottom> */}
              {/*  {t("column.attributes")} */}
              {/* </Typography> */}
              {/* <CustomSelect */}
              {/*  id="attributes_select" */}
              {/*  placeholder={t("file.choose_column")} */}
              {/*  value={columns.attributes} */}
              {/*  options={getColumnsSelectOptions("attributes")} */}
              {/*  onChange={onColumnSelect("attributes")} */}
              {/*  onClear={onColumnSelectClear("attributes")} */}
              {/* /> */}
            </div>
            <div>
              {/* <Typography variant="caption" display="block" gutterBottom> */}
              {/*  {t("column.external_id")} */}
              {/* </Typography> */}
              {/* <CustomSelect */}
              {/*  id="external_id" */}
              {/*  placeholder={t("file.choose_column")} */}
              {/*  value={columns.external_id} */}
              {/*  options={getColumnsSelectOptions("external_id")} */}
              {/*  onChange={onColumnSelect("external_id")} */}
              {/*  onClear={onColumnSelectClear("external_id")} */}
              {/* /> */}
            </div>
          </div>
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
          {/* {!isHeader && ( */}
          {/*  <div className={classes.startingRowInfo}> */}
          {/*    <Alert severity="warning">{t("file.hint_start_row")}</Alert> */}
          {/*  </div> */}
          {/* )} */}
        </div>
      )}
      {(!!data.columnsNames.length || !!data.rows.length) && (
        <div className={classes.tableScroll}>
          <table className={classes.table}>
            <tbody>
              {!!data.columnsNames.length && (
                <tr>
                  <td className={clsx([classes.tableSystemCell, classes.tableHeadCell])}></td>
                  {data.columnsNames.map((item, index) => (
                    <td
                      className={clsx({
                        [classes.tableSystemCell]: true,
                        [classes.tableHeadCell]: true,
                        [classes.highlight]: index === selectedColumn,
                      })}
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
                  <td
                    className={clsx({
                      [classes.tableSystemCell]: true,
                      [classes.header]: index + 1 < startingRow,
                    })}
                  >
                    {index + 1}
                  </td>
                  {row.map((item, i) => (
                    <td key={i} className={`${i === selectedColumn && classes.highlight}`}>
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
              {/* {data.rows.length > 100 && ( */}
              {/*  <tr> */}
              {/*    <td style={{ pointerEvents: "none" }} colSpan={data.columnsNames.length + 1}> */}
              {/*      100 of <strong>{data.rows.length}</strong> rows... */}
              {/*    </td> */}
              {/*  </tr> */}
              {/* )} */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
