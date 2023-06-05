import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  wrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    padding: "48px 32px 0",
    backgroundColor: "#fff",
    borderRadius: 4,
    [theme.breakpoints.down("xs")]: {
      padding: "48px 16px 0",
    },
  },
  elfaroContainer: {
    margin: "48px 16px",
  },
  img: {
    width: 200,
  },
  title: {
    color: "#334455",
    marginTop: 0,
    marginBottom: 14,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  formTitle: {
    textAlign: "center",
    padding: "14px 0",
    color: theme.palette.app.green700,
  },
  formWrapper: {
    margin: "30px auto 70px",
  },
  contentWrapper: {
    fontSize: "1.3rem",
    maxWidth: 700,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  link: {
    color: "#0081a7 !important",
    fontWeight: "bold",
    textDecoration: "underline",
    paddingLeft: 2,
    fontSize: 15,
    "&:hover": {
      color: "#16d9a5",
      textDecoration: "underline",
    },
    "&:active": {
      color: "#16d9a5",
      textDecoration: "underline",
    },
    "&:focus": {
      color: "#16d9a5",
      textDecoration: "underline",
    },
  },
}));

export default "styles";
