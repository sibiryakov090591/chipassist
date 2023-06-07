import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      maxWidth: 800,
      width: "100%",
      margin: "0 auto",
      padding: 12,
      display: "flex",
      flexDirection: "column",
      borderTop: "1px solid rgba(255, 255, 255, 0.3)",
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
    },
    sendIcon: {
      color: "#ffffff",
      background: "#171717",
      cursor: "pointer",
      borderRadius: "50ch",
      padding: "8px",
      width: 35,
      height: 35,
      transition: "all 150ms ease",
      "&:hover": {
        background: "#323232",
      },
    },
    error: {
      color: "red",
    },
  }),
);

export default "styles";