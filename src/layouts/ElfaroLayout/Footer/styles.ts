import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { scrollbarWidth } from "@src/config";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  footer: {
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    minHeight: 80,
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    position: "relative",
    maxWidth: 1300,
    margin: "0 auto",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#ffffff",
  },
  logoContainer: {
    minWidth: "160px",
    width: "160px",
  },
  logo: {
    width: "100%",
    display: "block",
  },
  title: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  address: {
    marginRight: 80,
  },
  phone: {
    marginBottom: 5,
  },
  env: {
    color: theme.palette.primary.main,
    cursor: "default",
    position: "absolute",
    top: 0,
    right: 0,
  },
  link: {
    color: "#ffffff",
    fontWeight: "bold",
    "&:hover": {
      color: "#ffffff",
      borderBottom: "1px solid #ffffff",
    },
  },
}));

export default "styles";
