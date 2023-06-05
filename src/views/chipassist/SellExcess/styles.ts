import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";
import background from "@src/images/Homepage/background.png";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    padding: "3rem 0",
  },
  paragraph: {
    fontSize: "1.2rem",
  },
  top: {
    padding: "6rem 0",
    backgroundImage: `url(${background});`,
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  },
  topTitle: {
    fontSize: "2.4rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
  },
  topImg: {
    maxWidth: 320,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 180,
    },
  },
  sell: {
    backgroundColor: theme.palette.app.red500,
  },
  sellTitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "2.6rem",
    fontWeight: 400,
    marginBottom: "2rem",
  },
  sellCard: {
    padding: "1.5rem",
    height: "100%",
  },
  sellCardTitle: {
    color: "#363636",
    fontSize: "2rem",
  },
  sellCardText: {
    color: "#4a4a4a",
    fontSize: "1.25rem",
  },
  work: {
    backgroundColor: "#fcf0f2",
  },
  workTextWrapper: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  workTitle: {
    color: theme.palette.primary.main,
    fontSize: "2.6rem",
    marginBottom: "2rem",
  },
  ul: {
    paddingLeft: 20,
  },
  li: {
    fontSize: "1.1rem",
    color: "#4a4a4a",
    lineHeight: 1.5,
  },
  textField: {
    marginBottom: 12,
  },
  formTitleWrapper: {
    padding: "1.5rem",
    borderBottom: "1px solid #ededed",
  },
  formTitle: {
    fontSize: "1.8rem",
  },
  formWrapper: {
    padding: "20px 40px 40px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
    },
  },
  button: {
    width: "100%",
  },
  progressCircle: {
    marginRight: 10,
    color: "white",
  },
  redColor: {
    color: "#e94160",
  },
}));

export default useStyles;
