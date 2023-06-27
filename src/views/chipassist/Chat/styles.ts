import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    section: {
      padding: "2em 0",
      height: "100%",
    },
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      alignItems: "flex-start",
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
      },
    },
    wrapper: {
      display: "flex",
      flexGrow: 1,
      minHeight: 500,
      maxHeight: "85vh",
      border: "1px solid #D4D4D4",
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
      marginTop: 8,
    },
  }),
);

export default "styles";
