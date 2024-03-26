import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    cartBlock: {
      display: "flex",
      padding: "0px 0 0px 30px",
      color: `${theme.palette.white} !important`,
      "&:hover": {
        cursor: "pointer",
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "16px",
      },
    },
    cartImageCont: {
      display: "flex",
      position: "relative",
    },
    listIcon: {
      width: 38,
      height: 38,
      filter: "invert(0.95)",
    },
    cartCount: {
      position: "absolute",
      fontWeight: "bold",
      top: "-2px",
      right: "-8px",
      borderRadius: "2px",
      backgroundColor: "#E94160",
      color: "white",
      fontSize: "0.9em",
      height: 17,
      lineHeight: "8px",
      padding: "4px 6px 2px 6px",
      display: "flex",
      justifyContent: "center",
    },
    collapse: {
      position: "absolute",
      right: 0,
      top: "115%",
      zIndex: 100,
      "&:before": {
        content: "''",
        display: "block",
        width: 0,
        borderRight: "15px solid transparent",
        borderLeft: "15px solid transparent",
        borderBottom: "11px solid #ffffff",
        position: "absolute",
        top: "-5px",
        right: 11,
        transition: "all 600ms ease",
      },
    },
    paper: {
      padding: 12,
      width: "max-content",
      maxWidth: 600,
      minWidth: 420,
      border: `1px solid #eee`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
    },
    imageColumn: {
      marginRight: "12px",
      height: 75,
      [theme.breakpoints.down("xs")]: {
        marginBottom: "12px",
      },
    },
    image: {
      height: "100%",
      border: "1px solid #e8e8e8",
      borderRadius: 5,
      overflow: "hidden",
      padding: 6,
    },
    titleColumn: {
      width: "100%",
      wordBreak: "break-word",
    },
    title: {
      color: "#263238",
      fontWeight: "bold",
      fontSize: "1.3rem",
      padding: "0 0 4px",
    },
    manufacturer: {
      fontSize: "0.9rem",
      fontStyle: "italic",
    },
    description: {
      fontSize: "0.9rem",
    },
    pcs: {
      whiteSpace: "nowrap",
      margin: "0 20px",
    },
  }),
);

export default "styles";
