import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
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
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    "& .MuiTextField-root": {
      margin: 13,
      width: "25ch",
    },
  },
  header: {
    textAlign: "center",
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
  },
  error: {
    color: "red",
    fontSize: "12px",
    textTransform: "lowercase",
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
}));

export default "styles";
