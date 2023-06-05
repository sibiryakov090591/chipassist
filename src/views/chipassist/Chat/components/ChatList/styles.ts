import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    leftColumn: {
      width: "25vw",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #D4D4D4",
      zIndex: 1,
      background: "#ffffff",
      [theme.breakpoints.down("md")]: {
        width: "35vw",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        pointerEvents: "none",
        transform: "translateX(-100%)",
        transition: "transform 550ms cubic-bezier(0.25, 1, 0.5, 1)",
        [theme.breakpoints.down("sm")]: {
          width: "48vw",
        },
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          borderRight: "none",
        },
      },
      "&.active": {
        transform: "translateX(0)",
        pointerEvents: "auto",
      },
    },
    header: {
      padding: "12px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 22,
      color: "#262626",
    },
    list: {
      padding: 8,
      overflow: "auto",
      height: "100%",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#ffffff",
      },
    },
    item: {
      padding: 12,
      borderRadius: 5,
      cursor: "pointer",
      "&:hover": {
        background: "#F5F5F5",
      },
    },
    itemActive: {
      background: "#dadbe3",
      "&:hover": {
        background: "#dadbe3",
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: 14,
      overflow: "hidden",
    },
    sellerName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    unreadCount: {
      marginLeft: 4,
      padding: "0 5px",
      fontSize: 11,
      lineHeight: "8px",
      height: 16,
      borderRadius: "50ch",
      color: "#F5F5F5",
      background: "#E94160",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messageDate: {
      color: "#737373",
      margin: "0 5px",
      lineHeight: "12px",
      fontSize: 12,
    },
    message: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    info: {
      fontSize: 12,
      color: "#737373",
    },
  }),
);

export default "styles";
