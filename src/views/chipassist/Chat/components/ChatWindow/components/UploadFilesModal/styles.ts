import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
      padding: "0 12px",
      display: "block",
      minWidth: "450px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "auto",
        width: "90vw",
      },
    },
    formHeader: {
      display: "flex",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      paddingTop: 12,
      background: "#fff",
      zIndex: 1,
    },
    title: {
      fontWeight: "bold",
    },
    iconButton: {
      padding: 7,
      marginLeft: 4,
    },
    addButton: {
      color: "#2bb917",
      fontSize: 32,
      cursor: "pointer",
      padding: 0,
      verticalAlign: "middle",
    },
    thumbsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
    },
    thumb: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #eaeaea",
      width: 150,
      height: 150,
      "&:hover > div:nth-child(2)": {
        opacity: 1,
      },
      [theme.breakpoints.down("sm")]: {
        "& > div:nth-child(2)": {
          opacity: 1,
        },
      },
    },
    thumbInner: {
      display: "flex",
      minWidth: 0,
      overflow: "hidden",
    },
    img: {
      width: "100%",
    },
    deleteImageWrapper: {
      position: "absolute",
      display: "flex",
      bottom: 6,
      right: 6,
      opacity: 0,
      cursor: "pointer",
      background: "rgba(0,0,0,0.25)",
      borderRadius: 7,
      padding: 2,
      transition: "all 150ms",
      "&:hover": {
        background: "rgba(0,0,0,0.4)",
      },
    },
    deleteImageIcon: {
      color: "#fff",
      fontSize: 22,
    },
    fileSize: {
      position: "absolute",
      left: 2,
      bottom: 2,
      padding: "4px 5px",
      fontSize: 10,
      lineHeight: "9px",
      color: theme.palette.white,
      backgroundColor: "rgba(0,0,0,.4)",
      borderRadius: "50ch",
    },
    fileName: {
      fontSize: 10,
      width: 150,
      paddingLeft: 6,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        width: 100,
      },
    },
    inputWrapper: {
      position: "sticky",
      display: "flex",
      alignItems: "center",
      bottom: 0,
      background: "#fff",
      padding: "6px 0",
    },
  }),
);

export default "styles";
