import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  section: {
    marginTop: "5rem",
    width: "100%",
  },
  titleH1: {
    fontSize: "2.2rem",
    fontWeight: 700,
    color: "#456",
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
    marginTop: "2rem",
    backgroundColor: "#0c7489",
    color: "white",
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
    [theme.breakpoints.down(460)]: {
      margin: "8px 0",
    },
  },
  regSectionColor: {
    backgroundColor: theme.palette.app.grey100,
  },
  regContainerStyle: {
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  regBoxContainer: {
    margin: "0 auto",
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
  pageContainer: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "2rem",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    // border: `${theme.palette.app.grey200} 1px solid`,
    // borderRadius: "4px",
  },
}));

export default useStyles;