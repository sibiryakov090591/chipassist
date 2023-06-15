import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    padding: "3rem 0",
  },
  tools: {
    backgroundColor: "#fcf0f2",
  },
  paragraph: {
    fontSize: "1.2rem",
  },
  title: {
    fontSize: "2.4rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  subTitle: {
    fontWeight: 400,
  },
  footerTitle: {
    fontSize: "1.8rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  redColor: {
    color: "#e94160",
  },
  toolGrid: {
    marginTop: "2.5rem",
    "& p": {
      color: "#666666",
    },
    "& h3": {
      fontSize: 20,
    },
  },
  link: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: 3,
    whiteSpace: "nowrap",
    textDecoration: "underline",
    color: "#e94160",
    "&:hover": {
      color: theme.palette.app.blue300,
      textDecoration: "underline",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
  },
}));

export default useStyles;
