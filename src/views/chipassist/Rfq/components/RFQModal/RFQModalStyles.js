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
    maxWidth: "92vw",
    overflowY: "auto",
    maxHeight: "92vh",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 3),
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: 13,
      width: "25ch",
    },
  },
  header: {
    textAlign: "center",
    paddingTop: 15,
    marginBottom: 10,
    "& > span": {
      color: "#0081a7",
      wordBreak: "break-all",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      marginBottom: 15,
    },
  },
  formRow: {
    display: "flex",
  },
  fieldsVerticalContainer: {
    display: "flex",
    "& .MuiTextField-root": {
      display: "block",
      margin: 13,
      width: "25ch",
      "& .MuiOutlinedInput-root": {
        width: "100%",
      },
    },
  },
  fieldsVertical: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  dropdown: {
    position: "relative",
    margin: 13,
    width: "100%",
    // width: "25ch",
    // "& > div": {
    //   width: "25ch",
    // },
  },
  hiddenInput: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0",
    pointerEvents: "none",
  },
  rfqDatePicker: {
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
  error: {
    color: "red",
    fontSize: "12px",
    textTransform: "lowercase",
  },
  signIn: {
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
    maxWidth: 430,
    margin: "0 auto",
    marginBottom: 12,
    "& > strong": {
      color: "#345",
    },
  },
}));

export default "styles";
