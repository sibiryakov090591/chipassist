import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  mainContainer: {
    height: "100%",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  section: {
    marginTop: "3rem",
    width: "100%",
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: "1.5rem",
    [theme.breakpoints.down(460)]: {
      fontSize: "1.3rem",
    },
  },
  titleH1: {
    fontSize: "2.2rem",
    fontWeight: 700,
    [theme.breakpoints.down(460)]: {
      fontSize: "1.8rem",
    },
  },
  titleH2: {
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "#456",
  },
  titleH3: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#456",
  },
  listBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  rfqsBox: {
    display: "flex",
    marginBottom: "2rem",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginBottom: "0",
    },
  },

  rfqInput: {
    marginRight: "2rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: `${theme.palette.app.grey100}!important`,
    },
  },

  addButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.blue700,
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgba(0, 129, 167, 0.8)", // blue700
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue700,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue700,
    },
  },

  submitButtonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    margin: 13,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down(460)]: {
      height: "37.63px",
      margin: "8px 0",
    },
  },
  regContainerStyle: {
    padding: "1em",
    backgroundColor: theme.palette.app.grey100,
    border: "1px solid #F0F0F7",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      borderRadius: 0,
      border: "none",
    },
  },
  regBoxContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    "& .MuiTextField-root": {
      margin: 13,
      width: "25ch",
    },
  },
  regColumn: {
    display: "flex",
    height: "17em",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  formRow: {
    display: "flex",
    [theme.breakpoints.down(460)]: {
      flexDirection: "column",
      "& .MuiTextField-root": {
        display: "block",
        margin: "8px 0",
        "& .MuiOutlinedInput-root": {
          width: "100%",
        },
      },
    },
  },
  langBlock: {
    fontSize: "12px",
    width: "10%",
    margin: "0px 0 0 7px",
    padding: "0 0 0 18px",
    lineHeight: "18px",
    textTransform: "uppercase",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 0",
    },
  },

  quantityTextField: {
    width: "50%",
    [theme.breakpoints.up("lg")]: {
      width: "25em",
    },
  },

  priceTextField: {
    marginRight: 0,
    width: "50%",
    [theme.breakpoints.up("lg")]: {
      width: "25em",
      marginRight: 0,
    },
  },
  autoSuggestField: {
    position: "relative",
    width: "25em",
    marginRight: "2em",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginRight: 0,
    },
    "& .list": {
      position: "absolute",
      zIndex: 10,
      left: 0,
      top: "100%",
      marginTop: 2,
      minWidth: "100%",
      background: "#0c3a65",
      color: "#fff",
      overflow: "hidden",
      borderRadius: 4,
      boxShadow: "0 0 50px 0 rgba(0,0,0,0.1)",
    },
    "& .list-item": {
      padding: "5px 10px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    "& .list-item-highlight": {
      background: "#1D90FF",
    },
  },
  regContainer: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: 0,
    },
  },
  hrStyle: {
    marginBottom: "1rem",
    backgroundColor: `#C6C6C6`,
    border: "none",
    height: "1px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  mobileSendButton: {
    [theme.breakpoints.down("md")]: {
      backgroundColor: "#F7F7F7",
      marginTop: 0,
      paddingTop: "3rem",
      height: "100%",
      paddingBottom: "2rem",
    },
  },
}));

export default useStyles;
