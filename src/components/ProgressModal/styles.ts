import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4),
    overflowY: "auto",
    maxHeight: "92vh",
    maxWidth: "92vw",
    minWidth: 320,
  },
  header: {
    textAlign: "center",
    margin: "0 0 8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      textAlign: "center",
    },
  },
  error: {
    fontSize: 22,
    color: red[400],
  },
  errorMessage: {
    fontSize: 15,
  },
  title: {
    color: "#2a82a7",
    fontSize: "1.8rem",
    "& > span": {
      color: "#16be9f",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  subTitle: {
    color: "#444",
    fontSize: "1.3rem",
    marginBottom: 20,
    marginTop: 0,
    "& > span": {
      color: "#16be9f",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  p: {
    fontSize: "1.1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  email: {
    color: theme.palette.app.blue800,
    fontWeight: "bold",
  },
  codeError: {
    color: "#ff3b3b",
    fontSize: 11,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  code: {
    textAlign: "center",
    width: "100% !important",
    "& input": {
      padding: "8px",
      margin: "8px",
      border: "1px solid #DCD9D8 !important",
      borderRadius: "4px !important",
      backgroundColor: "#FAF8F7",
      fontSize: "48px",
      fontWeight: 500,
      color: "#292524",
      [theme.breakpoints.down("xs")]: {
        fontSize: 38,
      },
    },
    "& input:focus": {
      border: "2px solid #777777 !important",
      caretColor: "#292524",
    },
    "& p": {
      color: "#292524",
    },
  },
}));

export default "styles";
