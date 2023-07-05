import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  section: {
    marginTop: "5rem",
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
  },
  listBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  rfqsBox: {
    display: "flex",
    marginBottom: "2rem",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  rfqInput: {
    marginRight: "2rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
    },
  },

  addButton: {
    marginTop: "2rem",
  },

  submitButtonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
