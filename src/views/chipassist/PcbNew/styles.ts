import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  text: {
    maxWidth: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
  },
  titleIC: {
    fontSize: "1.8rem",
    color: theme.palette.primary.main,
    padding: "1rem 0",
    textAlign: "center",
  },
  titleCA: {
    fontSize: "2.4rem",
    color: "#3f7cac",
    padding: "1rem 0",
    textAlign: "center",
    marginBottom: 28,
  },
  paragraphIC: {
    fontSize: "1.1rem",
    marginBottom: "1em",
    lineHeight: "1.4285em",
    textAlign: "center",
  },
  paragraphCA: {
    fontSize: "1.3rem",
    marginBottom: "1em",
    lineHeight: "1.4285em",
    textAlign: "center",
  },
}));

export default "styles";
