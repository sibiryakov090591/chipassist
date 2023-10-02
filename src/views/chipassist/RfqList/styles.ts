import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  container: {
    marginBottom: "2rem",
    padding: "2rem",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    overflowX: "hidden",
    maxWidth: "1220px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
      marginBottom: 0,
      width: "100%",
    },
  },
}));

export default "styles";
