import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    padding: "3rem 0",
  },
  paragraph: {
    fontSize: "1.2rem",
  },
  title: {
    fontSize: "2.4rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
    textAlign: "center",
    alignItems: "center",
  },
  footerTitle: {
    fontSize: "2.0rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
  },
  redColor: {
    color: "#e94160",
  },
  toolGrid: {
    marginTop: "2.5rem",
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: "2.0rem",
    fontWeight: "bold",
    marginBottom: 3,
    whiteSpace: "nowrap",
    "&:hover": {
      textDecoration: "underline",
      color: "#e94160",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
  },
}));

export default useStyles;
