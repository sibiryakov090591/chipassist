import { createStyles, makeStyles } from "@material-ui/styles";
import { scrollbarWidth } from "@src/config";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    page: {
      width: "100vw",
      height: "100%",
      bottom: 0,
      zIndex: 1,
      [theme.breakpoints.up("md")]: {
        paddingRight: `${scrollbarWidth}px`,
      },
    },
    section: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      display: "flex",
      flexGrow: 1,
      height: "100%",
      maxHeight: "90vh",
      overflow: "hidden",
      position: "relative",
      background: "#ffffff",
      borderTop: "1px solid #D4D4D4",
      borderBottom: "1px solid #D4D4D4",
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
