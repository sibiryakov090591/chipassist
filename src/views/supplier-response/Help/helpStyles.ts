import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  main: {
    // padding: "2rem 0",
    // backgroundImage: `url(${background});`,
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
    fontSize: 45,
    color: theme.palette.app.red500,
    marginBottom: "1rem",
    // mixBlendMode: "difference",
  },
  pageDescription: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    mixBlendMode: "difference",
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
    maxWidth: "100%",
  },
  letterImg: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 365,
      width: "100%",
    },
  },
  priceImg: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 500,
    },
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
  firstWay: {
    backgroundColor: "#123",
    width: "100vw",
    color: "white",
  },
  howToGetStarted: {
    backgroundColor: theme.palette.app.grey100,
  },
}));

export default "styles";
