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
    display: "flex",
    flexDirection: "row",
  },
  pageTitle: {
    fontSize: "46px",
    textAlign: "left",
    marginBottom: "26px",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
    // mixBlendMode: "difference",
  },
  pageDescription: {
    fontSize: "26px",
    textAlign: "left",
    marginBottom: "8px",
    color: "#eee",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    // mixBlendMode: "difference",
  },
  pageTitleImage: {
    marginTop: "5rem",
    marginBottom: "6rem",
    boxShadow: "0px 0px 24px #bbb",
  },
  pageDescrSubDiv: {
    color: "#ddd",
    fontSize: "20px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  title: {
    color: "#345",
    marginBottom: "3rem",
    fontSize: "1.8rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
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
    width: "100vw",
    color: "white",
    background: `linear-gradient(270deg, rgba(2,0,36,1) 6%, rgba(17,34,51,1) 57%, rgba(40,79,119,1) 100%)`,
    transition: "background 200 easy-out",
    [theme.breakpoints.down("xs")]: {
      background: `linear-gradient(180deg, rgba(2,0,36,1) 6%, rgba(17,34,51,1) 57%, rgba(40,79,119,1) 100%)`,
      transition: "background 200 easy-out",
    },
  },
  howToGetStarted: {
    backgroundColor: theme.palette.app.grey100,
  },
}));

export default "styles";
