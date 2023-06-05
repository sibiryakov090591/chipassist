import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import background from "@src/images/Homepage/background.png";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  main: {
    padding: "2rem 0",
    backgroundImage: `url(${background});`,
  },
  section: {
    padding: "2rem 0",
  },
  pageTitleContainer: {
    margin: "0 auto",
    paddingBottom: "2rem",
    textAlign: "center",
  },
  pageTitle: {
    color: theme.palette.app.red500,
    marginBottom: "1rem",
  },
  pageDescription: {
    fontSize: 18,
  },
  title: {
    color: "#345",
    marginBottom: "3rem",
    fontSize: "1.8rem",
    textAlign: "center",
  },
  italic: {
    fontStyle: "italic",
    marginBottom: 12,
    marginTop: 26,
    fontSize: 16,
    color: "#929292",
  },
  gridItem: {
    alignSelf: "center",
    marginBottom: 65,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 18,
    },
  },
  rightColumn: {
    textAlign: "end",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      margin: "0 auto",
    },
  },
  img: {
    boxShadow: "0px 0px 16px 0px rgb(34 60 80 / 20%)",
    borderRadius: 5,
  },
  letterImg: {
    maxWidth: 365,
    width: "100%",
  },
  icon: {
    marginBottom: 18,
    textAlign: "center",
    "& svg": {
      color: "#bfbfbf",
      fontSize: 55,
      padding: 0,
    },
  },
  p: {
    fontSize: 16,
  },
  gridContainer: {
    "& p": {
      fontSize: 16,
    },
  },
}));

export default "styles";
