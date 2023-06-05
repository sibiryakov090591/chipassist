import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    description: {
      fontSize: "1.3rem",
    },
    progressCircle: {
      marginRight: 10,
      color: "white",
    },
    button: {
      minWidth: 120,
    },
    text: {
      marginTop: 8,
      marginBottom: 3,
      fontSize: 16,
    },
    signUpAgainText: {
      fontSize: 16,
      "& > span": {
        fontWeight: "bold",
        color: "#2fa600",
      },
    },
    signUpAgainLink: {
      fontSize: 16,
    },
    email: {
      color: theme.palette.app.blue800,
      fontWeight: "bold",
    },
    dialog: {
      [theme.breakpoints.down("xs")]: {
        padding: "8px 2px",
      },
    },
  }),
);

export default "styles";
