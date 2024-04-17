import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  background: {
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  buttonBack: {
    padding: "17px 33px 17px 33px;",
    borderBottom: "2px solid #002e5c",
    borderRadius: 0,

    "&:hover": {
      backgroundColor: "inherit",
      color: "inherit",
    },

    "& .MuiButton-label": {
      top: 3,
      position: "relative",
    },
  },
  buttonAction: {
    "&:not(last-of-type)": {
      marginRight: 10,
    },
  },
  root: {
    // border: "solid 1px #eee",
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
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formContentItem: {
    width: "fit-content",
    margin: 24,
    [theme.breakpoints.down("xs")]: {
      margin: "24px 0px",
    },
  },
  formContainer: {
    textAlign: "center",
    maxWidth: 460,
    border: "1px solid #dadada",
    padding: "10px 20px",
    borderRadius: 5,
    backgroundColor: "#fafafa",
  },
  formRow: {
    display: "flex",
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
    "& > *": {
      margin: 13,
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
      },
    },
  },
  textField: {
    "& label": {
      fontWeight: "bold",
    },
    "& input::placeholder": {
      color: "#c6c6c6",
    },
  },
  buttons: {
    marginTop: 12,
    display: "flex",
    justifyContent: "center",
    "& > *": {
      minWidth: 400,
      [theme.breakpoints.down(450)]: {
        minWidth: "auto",
        width: "100%",
      },
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
  filesWrapper: {
    padding: "10px 2px",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  formField: {
    height: "100%",
    borderRadius: "5px",
    padding: "0 14px",
    overflowY: "auto",
    position: "relative",
  },
  formFieldBorder: {
    border: "1px solid rgba(0,0,0,0.15)",
    padding: "10.5px 14px",
    overflowY: "inherit",
  },
  formFieldBig: {
    "@media screen and (max-width: 1200px)": {
      "& .formFieldPad": {
        padding: "0 58px",
      },
      "& .MuiTextField-root": {
        margin: 13,
        width: "32ch",
      },
    },
  },
  formLabel: {
    fontWeight: "bold",
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
      backgroundColor: `${theme.palette.white}`,
      zIndex: -1,
    },
  },
  filesItem: {
    display: "flex",
    padding: "5px 3px",
    marginRight: "3px",
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
    textAlign: "center",
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
    color: `${theme.palette.primary.light}`,
    background: "none",
    border: "none",
    borderBottom: `1px solid ${theme.palette.primary.light}`,
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
  detailsInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  details: {
    textAlign: "center",
    margin: "8px 0 12px",
    width: 360,
    lineHeight: "24px",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
  detailsTitle: {
    fontSize: "1.3rem",
    marginBottom: 12,
  },
  detailsBtn: {
    width: 230,
    position: "relative",
    "& svg": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: 10,
    },
  },
  applyButton: {
    zIndex: 10,
    width: "min-content",
    margin: "auto",
    position: "sticky",
    display: "flex",
    justifyContent: "center",
    bottom: 0,
    "& > button": {
      marginLeft: 10,
    },
  },
  registerButtons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: theme.spacing(2),
    },
  },
  detailsImg: {
    width: 140,
    borderRadius: "50%",
    padding: 3,
    margin: "6px 0 10px",
    backgroundColor: "#16be9f",
  },
  savedTime: {
    textAlign: "center",
    marginTop: 10,
    color: "#949494",
  },
  signIn: {
    textAlign: "center",
    marginBottom: 16,
  },
  registerForm: {
    width: 500,
    "& .MuiTextField-root": {
      margin: 13,
      [theme.breakpoints.down(460)]: {
        margin: "8px 0",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
}));

export default "styles";
