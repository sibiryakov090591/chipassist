import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    page: {
      position: "absolute",
      paddingTop: 80,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    chipassistPage: {
      paddingTop: 135,
    },
    section: {
      padding: "2em 0",
      height: "100%",
      [theme.breakpoints.down("xs")]: {
        padding: "2em 0 0 0",
      },
    },
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    header: {
      alignItems: "flex-start",
      [theme.breakpoints.down("xs")]: {
        margin: "0 12px",
      },
    },
    wrapper: {
      display: "flex",
      flexGrow: 1,
      height: "100%",
      minHeight: 350,
      maxHeight: "85vh",
      border: "1px solid #D4D4D4",
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
      marginTop: 8,
      background: "#ffffff",
      [theme.breakpoints.down("xs")]: {
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderRadius: 0,
      },
    },
    emptyMessage: {
      borderRadius: "50ch",
      background: "rgba(64,56,84,0.3)",
      color: "#ffffff",
      padding: "3px 16px 2px",
    },
  }),
);

export default "styles";
