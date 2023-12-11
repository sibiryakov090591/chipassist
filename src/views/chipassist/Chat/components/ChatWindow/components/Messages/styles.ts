import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // [theme.breakpoints.down("xs")]: {
      //   display: "none",
      // },
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
      padding: "20px 20px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      [theme.breakpoints.down("xs")]: {
        padding: "8px 8px 0",
      },
    },
    group: {
      marginTop: 6,
    },
    unreadLabel: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 3,
      fontWeight: "bold",
      color: "#ffffff",
      fontSize: 11,
      lineHeight: "15px",
      borderRadius: 4,
      background: "rgba(64,56,84,0.3)",
    },
    dateLabel: {
      position: "sticky",
      top: 50,
      borderRadius: "50ch",
      background: "rgba(64,56,84,0.3)",
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: "12px",
      padding: "3px 8px 4px",
      margin: "0 auto",
      width: "fit-content",
    },
    requestItem: {
      zIndex: 1,
      position: "sticky",
      top: 6,
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
        fontSize: 50,
      },
      "& img": {
        height: 50,
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
    chatImage: {
      maxWidth: "90px",
    },
    emptyText: {
      marginTop: 12,
      fontWeight: 400,
      maxWidth: 365,
      textAlign: "center",
    },
    orderItem: {
      overflow: "hidden",
    },
    orderTitle: {
      backgroundColor: theme.palette.app.green800,
      color: "#ffffff",
      fontWeight: "bold",
      padding: "12px",
    },
    invoiceTitle: {
      backgroundColor: theme.palette.app.blue800,
    },
    orderAddressTitle: {
      textDecoration: "underline",
      marginBottom: 5,
    },
    orderAddress: {
      padding: "12px",
    },
    orderTableWrapper: {
      padding: "12px",
      [theme.breakpoints.down("xs")]: {
        padding: "0",
      },
    },
    orderTable: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #345",
      [theme.breakpoints.down("xs")]: {
        border: "none",
      },
      "& th": {
        backgroundColor: "#345",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        padding: 5,
        textAlign: "start",
      },
      "& td": {
        padding: 5,
        fontSize: 11,
        border: "1px solid #345",
        [theme.breakpoints.down("xs")]: {
          border: "none",
        },
      },
    },
    orderTableHeader: {
      backgroundColor: "#345",
    },
    nowrap: {
      whiteSpace: "nowrap",
    },
    orderPdfLink: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: 12,
      [theme.breakpoints.down("xs")]: {
        padding: 12,
      },
      "& img": {
        height: 20,
        marginRight: 4,
      },
      "& a": {
        textDecoration: "underline",
      },
    },
    notes: {
      fontStyle: "italic",
      paddingTop: 10,
      [theme.breakpoints.down("xs")]: {
        padding: 12,
      },
    },
  }),
);

export default "styles";
