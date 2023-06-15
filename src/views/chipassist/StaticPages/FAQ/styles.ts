import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    padding: "3rem 0",
  },
  summaryRoot: {
    "& .Mui-expanded": {
      transform: "none",
    },
  },
  tools: {
    backgroundColor: "#fcf0f2",
  },
  answer: {
    fontSize: "1.2rem",
  },
  question: {
    fontSize: "1.4rem",
    fontWeight: 400,
  },
  title: {
    fontSize: "2.4rem",
    color: theme.palette.primary.main,
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  subTitle: {
    fontSize: "1.9rem",
    marginBottom: "2.5rem",
    marginTop: "2.5rem",
    fontWeight: 600,
  },
  accordionDescr: {
    backgroundColor: "#f2f2f2",
    color: theme.palette.primary.main,
  },
  redColor: {
    color: theme.palette.app.red500,
  },
}));

export default useStyles;
