import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    backgroundColor: theme.palette.app.blue900,
    zIndex: 100,
    paddingRight: 12,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
    },
  },
  container: {
    maxWidth: 1300,
    margin: "0 auto",
    padding: 16,
    color: "#ffffff",
  },
  logo: {
    marginTop: 15,
    marginRight: 20,
    marginBottom: 15,
    display: "inline-block",
    "& > img": {
      width: 200,
    },
  },
  title: {
    fontWeight: "normal",
    paddingTop: "1rem",
    fontSize: "2.3rem",
  },
  link: {
    color: "#ffffff",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      color: "#e94160",
      textDecoration: "underline",
    },
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  icons: {
    display: "flex",
  },
  iconLink: {
    textAlign: "center",
    padding: 12,
    color: "#ffffff",
    "& > img": {
      width: 82,
      height: 82,
      border: "3px solid #eeeeee",
      borderRadius: "50%",
      backgroundColor: "#eeeeee",
    },
    "&:hover": {
      color: "#e94160",
    },
  },
}));

export default "styles";
