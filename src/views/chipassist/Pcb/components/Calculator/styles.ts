import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  paper: {
    overflow: "auto",
    margin: "2rem",
    maxWidth: 860,
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 2rem 0",
    },
  },
  container: {
    "& > *": {
      padding: "1rem 2rem",
    },
  },
  title: {
    backgroundColor: "",
    margin: 0,
  },
  mainRow: {
    backgroundColor: "#f5f7fa",
  },
  row: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  input: {
    border: "2px solid #dfe6f0",
    margin: "4px 0 4px 4px",
    borderRadius: 4,
    width: 60,
    height: 35,
    padding: "0 5px",
  },
  disabledInput: {
    filter: "opacity(0.5)",
    background: "#ededed",
    border: "2px dashed #cacaca",
    cursor: "no-drop",
  },
  customInput: {
    marginRight: 10,
    width: 140,
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
  },
  requiredField: {
    "& > div": {
      backgroundColor: "#fcf8e3",
    },
  },
  rowTitle: {
    height: "fit-content",
    width: "20%",
    paddingRight: 10,
    color: "#777",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "red",
      marginLeft: 3,
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      paddingBottom: 3,
    },
  },
  soldermaskTitle: {
    display: "flex",
    alignItems: "center",
    margin: "0 4px 0 65px",
    "& > svg": {
      marginTop: "-1px",
      alignSelf: "center",
    },
  },
  rowContent: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  select: {
    minWidth: 130,
  },
  helpIcon: {
    color: theme.palette.app.green800,
    marginRight: 5,
    marginTop: 3,
    alignSelf: "flex-start",
    fontSize: 14,
    cursor: "help",
  },
  tooltip: {
    fontSize: 11,
  },
  customTooltip: {
    backgroundColor: "#fff",
    padding: 10,
    border: "1px solid #eee",
    maxWidth: "none",
  },
  radioGroup: {
    "& > label": {
      marginLeft: 0,
      marginRight: 3,
    },
    "& > img": {
      height: "100%",
      alignSelf: "center",
      marginRight: 2,
    },
  },
  eg: {
    alignSelf: "center",
    borderBottom: "1px dashed",
    color: "#2f88f1",
    cursor: "help",
    marginLeft: 5,
  },
  checkButton: {
    position: "relative",
    minWidth: 35,
    minHeight: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #dfe6f0",
    borderRadius: 4,
    color: "#697c90",
    background: "#fff",
    margin: "4px 2px",
    padding: "7px 8px",
    lineHeight: "14px",
    cursor: "pointer",
    "&:hover": {
      background: "#f8f8f8",
    },
    "&:active": {
      background: "#ececec",
    },
    "& > img": {
      height: 16,
      marginRight: 5,
    },
  },
  checked: {
    border: "2px solid #bfddff",
    background: "#d9f5ff",
    "&:hover": {
      background: "#d9f5ff",
    },
  },
  errorInput: {
    border: "1px solid #e53935",
  },
  errorMessage: {
    fontSize: 11,
    color: "#e53935",
  },
  formControlLabel: {
    "&.Mui-disabled": {
      "& .pcb_button": {
        filter: "opacity(0.5)",
        background: "#ededed",
        border: "2px dashed #cacaca",
        cursor: "no-drop",
      },
    },
  },
  colorIcon: {
    width: 13,
    height: 13,
    borderRadius: 1,
    marginRight: 4,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  sizePanel: {
    marginLeft: 15,
    height: 40,
    zIndex: 10,
    "& > img": {
      marginLeft: 15,
      height: 85,
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      marginBottom: 16,
      marginLeft: 0,
      alignSelf: "center",
    },
  },
  helperText: {
    position: "absolute",
    fontSize: 10,
    color: "#B59F38",
    bottom: "-50%",
    left: 0,
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      position: "initial",
    },
  },
  helperSection: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    color: "#B59F38",
    "& > img": {
      height: 25,
      marginLeft: 7,
      [theme.breakpoints.down("sm")]: {
        marginTop: 2,
      },
    },
  },
  checkboxLabel: {
    color: "#697c90",
    fontSize: 13,
  },
  dropzone: {
    width: "100%",
    "& > div": {
      width: "100%",
    },
  },
  flexStart: {
    alignSelf: "start",
    marginTop: 16,
  },
}));

export default "styled";
