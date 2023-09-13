import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      position: "relative",
      maxWidth: 800,
      width: "100%",
      margin: "0 auto",
      padding: 12,
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        padding: 8,
      },
    },
    input: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      width: "100%",
      border: "1px solid #737373",
      background: "#ffffff",
      borderRadius: "50ch",
      padding: 6,
      margin: "0 auto",
      overflow: "hidden",
    },
    textarea: {
      width: "100%",
      resize: "none",
      border: "none",
      padding: 8,
      height: 32,
      overflow: "hidden",
      maxHeight: 230,
      [theme.breakpoints.down("xs")]: {
        maxHeight: 130,
      },
    },
    error: {
      color: "red",
    },
    sendIcon: {
      color: "#ffffff",
      cursor: "pointer",
      borderRadius: "50ch",
      padding: "8px",
      width: 43,
      height: 43,
      marginLeft: 5,
      transition: "all 150ms ease",
      backgroundColor: theme.palette.app.red500,
      "&:hover": {
        backgroundColor: theme.palette.app.red400,
      },
      "&.disabled": {
        backgroundColor: "#cdcbcb",
        pointerEvents: "none",
        "&:hover": {
          backgroundColor: "#cdcbcb",
        },
      },
    },
    attachIcon: {
      color: "#505050",
      cursor: "pointer",
      transform: "rotate(-135deg)",
      fontSize: 32,
      marginRight: 8,
      padding: 3,
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#eee",
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 3,
      },
    },
    clearIcon: {
      color: "#505050",
      cursor: "pointer",
      fontSize: 32,
      marginRight: 5,
      padding: 7,
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#eee",
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 3,
      },
    },
    hint: {
      backgroundColor: theme.palette.app.blue700,
      color: "#ffffff",
      borderRadius: "50ch",
      padding: "0 8px",
      fontSize: "0.9rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }),
);

export default "styles";
