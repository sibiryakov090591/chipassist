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
  title: {
    fontSize: "20px",
    fontWeight: 500,
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
    alignItems: "center",
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
  },

  addButton: {
    marginTop: "2rem",
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
    width: 500,
    margin: "0 auto",
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
}));

export default useStyles;
