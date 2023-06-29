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
    group: {
      marginTop: 6,
    },
    unreadLabel: {
      textAlign: "center",
      "& span": {
        fontWeight: "bold",
        padding: "2px 8px 4px 8px",
        color: "#ffffff",
        fontSize: 12,
        borderRadius: "50ch",
        background: "rgba(64,56,84,0.3)",
      },
    },
    dateLabel: {
      position: "sticky",
      top: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50ch",
      background: "rgba(0,0,0,0.04)",
      color: "#a1a1a2",
      fontSize: 12,
      fontWeight: "bold",
      padding: "3px 16px 2px",
      margin: "0 auto",
      width: "fit-content",
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
      position: "relative",
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
      maxWidth: 200,
      "&:hover": {
        background: "#dedede",
      },
      "& svg": {
        color: "#878787",
        marginRight: 6,
        fontSize: 18,
      },
      "& img": {
        height: 16,
        marginRight: 4,
      },
    },
    fileName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    image: {
      height: 200,
      minHeight: 200,
      maxWidth: "100%",
      objectFit: "cover",
      borderRadius: 12,
      cursor: "pointer",
    },
    topPreloader: {
      position: "absolute",
      top: 5,
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottomPreloader: {
      position: "absolute",
      bottom: 5,
      left: "50%",
      transform: "translateX(-50%)",
    },
    wasReadIcon: {
      position: "absolute",
      bottom: 0,
      left: "107%",
      fontSize: 14,
      color: "#384054",
    },
  }),
);

export default "styles";
