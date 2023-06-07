import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  footer: {
    padding: "26px 0",
    backgroundColor: theme.palette.primary.main,
  },
  footerWrapper: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  topCont: {
    width: "100%",
    backgroundColor: "#37475A",
  },
  top: {
    textAlign: "center",
    margin: "0 auto",
    color: theme.palette.white,
    padding: "17px 0",
    fontSize: "13px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    paddingTop: "0px",
  },
  icsearchContainer: {
    position: "relative",
  },
  wrapper: {
    color: "#ffffff",
    "& a": {
      color: "#ffffff",
      "&:hover": {
        color: "#ffffff",
        borderBottom: "1px solid #ffffff",
      },
    },
  },
  header: {
    fontWeight: "700",
    color: theme.palette.white,
    fontSize: "16px",
    margin: "6px 0 14px 0",
    whiteSpace: "nowrap",
  },
  ul: {},
  li: {
    listStyleType: "none",
    marginBottom: "10px",
  },
  link: {
    color: "#DDD",
    fontSize: "13px",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  bottom: {
    width: "100%",
    borderTop: "1px solid #3a4553",
  },
  bottomCont: {
    position: "relative",
  },
  logo: {
    width: "40%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      textAlign: "center",
      marginTop: 26,
    },
  },
  logoImg: {
    height: "36px",
  },
  nav: {
    width: "60%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  navGroup: {
    marginRight: 50,
  },
  navLink: {
    display: "block",
    fontSize: 13,
    color: "#d8d5df",
    fontWeight: "bold",
    marginBottom: 3,
    whiteSpace: "nowrap",
    "&:hover": {
      textDecoration: "underline",
      color: "#d8d5df",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
  },
  copy: {
    color: "#d8d5df",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.6,
    marginTop: 3,
    marginLeft: 5,
  },
  commit: {
    color: "transparent",
    position: "absolute",
    bottom: "-24px",
    left: 0,
  },
  addressWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  contactsWrapper: {
    display: "flex",
    height: "100%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      paddingTop: 23,
    },
  },
  contactsInner: {
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  address: {
    margin: "10px 0",
  },
  name: {
    fontWeight: "bold",
  },
  mail: {
    margin: "10px 0",
  },
}));

export default "styles";