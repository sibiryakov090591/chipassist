import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    messagesWrapper: {
      overflowY: "auto",
      height: 1,
      display: "grid",
      flexGrow: 1,
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&.hidden": {
        overflowY: "hidden",
      },
    },
    messages: {
      position: "relative",
      maxWidth: 800,
      width: "100%",
      margin: "0 auto",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    dateLabel: {
      textAlign: "center",
      color: "#737373",
      fontSize: 12,
      fontWeight: "bold",
      margin: "12px 0",
    },
    requestItem: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      background: "#F5F5F5",
      color: "#737373",
      padding: 10,
      marginBottom: 12,
      borderRadius: 8,
      fontSize: 12,
    },
    requestItemIcon: {
      color: "#818CF8",
      marginRight: 6,
    },
    messageItem: {
      color: "#262626",
      padding: "8px 10px",
      marginBottom: 16,
    },
    messageInfo: {
      marginBottom: 4,
    },
    messageFrom: {
      fontWeight: "bold",
      fontSize: 14,
    },
    messageDate: {
      marginLeft: 8,
      fontSize: 12,
      color: "#737373",
    },
    message: {
      fontSize: 14,
      wordBreak: "break-word",
    },
    file: {
      cursor: "pointer",
      background: "#eee",
      borderRadius: 12,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 12px",
      color: "#345",
      "& svg": {
        color: "#878787",
        marginRight: 8,
      },
    },
  }),
);

export default "styles";
