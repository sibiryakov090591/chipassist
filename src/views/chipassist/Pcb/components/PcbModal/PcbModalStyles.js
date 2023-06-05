import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiButton-root + div": {
      width: "100%",
      minWidth: "100%",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "auto",
    maxHeight: "100%",
  },
  root: {
    border: `solid 1px ${theme.palette.app.grey200}`,
    borderRadius: "5px",
    "& .MuiTextField-root": {
      margin: 13,
      width: "25ch",
    },
  },
  header: {
    textAlign: "center",
  },
  formContent: {
    display: "grid",
    margin: "10px 0",
  },
  formContentItem: {
    gridArea: "1 / 1 / 2 / 2",
    visibility: "hidden",
  },
  formContentItemVisible: {
    visibility: "visible",
  },
  formRow: {
    display: "flex",
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  dropdown: {
    position: "relative",
    margin: 13,
    width: "25ch",
    display: "inline-flex",
    "& > div": {
      width: "100%",
    },
  },
  hiddenInput: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0",
    pointerEvents: "none",
  },
  filesContainer: {
    width: "25ch",
    height: "292px",
    margin: "13px",
    position: "relative",
  },
  formField: {
    // border: "1px solid rgba(0,0,0,0.15)",
    height: "100%",
    borderRadius: "5px",
    // padding: "10.5px 14px",
    padding: "0 14px",
    overflowY: "auto",
  },
  formFieldBorder: {
    border: "1px solid rgba(0,0,0,0.15)",
    padding: "10.5px 14px",

    "&:hover,&:focus,&:active": {
      borderColor: "rgba(0,0,0,1)",
    },
  },
  formSection: {
    position: "relative",
    overflowY: "inherit",
    // margin: "20px 25px",
    margin: "0 25px",
  },
  formRowFlex: {
    display: "flex",
    justifyContent: "space-between",
    // paddingLeft: 49,
    // paddingRight: 49,
  },
  formFieldBig: {
    width: "32ch !important",
  },
  formLabel: {
    position: "absolute",
    fontSize: "0.75em",
    zIndex: 1,
    top: -10,
    "&::before": {
      top: 5,
      left: -5,
      right: -5,
      height: 10,
      content: "' '",
      position: "absolute",
      backgroundColor: "white",
      zIndex: -1,
    },
  },
  filesItem: {
    display: "flex",
    padding: "5px 0",
    marginLeft: "-10px",
    cursor: "pointer",
    overflowX: "hidden",
    whiteSpace: "nowrap",

    "&:hover": {
      background: "rgba(233,233,233,0.1)",
      borderRadius: "5px",
    },

    "& > span": {
      marginLeft: 3,
    },
  },
  filesItemActive: {
    background: "rgba(233,233,233,1)",
    borderRadius: "5px",
    "&:hover": {
      background: "rgba(233,233,233,1)",
      borderRadius: "5px",
    },
  },
  filesButtonContainer: {
    margin: "0 13px",
    width: "25ch",
  },
  filesButton: {
    padding: 3,
    width: "100%",
    fontSize: "11px",
  },

  pcbDatePicker: {
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -5.5px) scale(0.75)",
    },
    "& .MuiInputBase-root": {
      marginTop: 0,
      borderRadius: "4px",
      border: "1px solid rgba(0,0,0,0.15)",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      width: "100%",
      "&::before": {
        content: "none",
      },
      "&::after": {
        content: "none",
      },
    },
    "& .MuiFormLabel-root": {
      paddingLeft: "19px",
      zIndex: 1,
      "&::before": {
        left: 11,
        top: 5,
        right: -4,
        height: 10,
        content: "' '",
        position: "absolute",
        backgroundColor: "white",
        zIndex: -1,
      },
    },
    "& .MuiInputBase-input": {
      paddingTop: "9.5px",
      paddingBottom: "9.5px",
      paddingLeft: "14px",
    },
  },
  tabs: {
    borderBottom: `solid 1px ${theme.palette.app.grey200}`,
  },
  uploadFrame: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    width: "53.2ch",
    margin: "13px",
    height: "25ch",
    border: "1px solid #dbebf5",
    background: "#fafdff",
    borderRadius: 5,
    cursor: "pointer",
    userSelect: "none",
    transition: "border .24s ease-in-out",
    overflow: "hidden",
    "&:hover": {
      borderColor: "#b0d6ef",
    },
    "&.has-focus": {
      background: "#f6fff4",
      borderColor: "#ace89c",
      boxShadow: "0 5px 50px 0 rgba(0,0,0,0.1) !important",
    },
  },
  uploadDefaultState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "&.has-focus": {
      transform: "scale(0.8)",
      opacity: 0,
      visibility: "hidden",
    },
  },
  uploadFocusState: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#f6fff4",
    borderRadius: 10,
    transform: "scale(1.2)",
    opacity: 0,
    visibility: "hidden",
    "&.has-focus": {
      transform: "none",
      opacity: 1,
      visibility: "visible",
    },
  },
  uploadIcon: {
    color: "#e9f1f7",
    fontSize: 50,
    "&.has-focus": {
      display: "none",
    },
  },
  uploadFocusIcon: {
    color: "#ace89c",
    fontSize: 140,
  },
  uploadFrameText: {
    margin: 10,
    fontSize: 14,
    textAlign: "center",
    color: theme.palette.app.grey400,
  },
  uploadBrowse: {
    padding: 0,
    color: "#0277BD",
    background: "none",
    border: "none",
    borderBottom: "1px solid #0277BD",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  selectWithUnit: {
    "& .MuiInputAdornment-root": {
      position: "relative",
      left: -18,
    },
  },
  selectDisabled: {
    "& .MuiSelect-root": {
      color: "rgba(0, 0, 0, 0.38)",
    },
  },
  selectOptionDisabled: {
    pointerEvents: "none",
    touchAction: "none",
    color: "rgba(0, 0, 0, 0.38)",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
}));

export default "styles";
