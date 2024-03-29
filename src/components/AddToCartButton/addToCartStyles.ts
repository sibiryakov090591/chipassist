import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    paper: {
      padding: 12,
      maxWidth: 155,
    },
    addToCart: {
      whiteSpace: "nowrap",
      width: 80,
      fontSize: 10,
      fontWeight: "bold",
    },
    inCart: {
      color: theme.palette.app.blue800,
      backgroundColor: "#ffffff",
      border: `1px solid ${theme.palette.app.blue800}`,
      "&:hover": {
        backgroundColor: theme.palette.app.blue800,
        color: "#ffffff",
      },
    },
    inCartMobile: {
      backgroundColor: theme.palette.app.blue800,
      color: "#ffffff",
    },
    addButton: {
      marginTop: 12,
      width: "100%",
    },
    qty: {
      "& input": {
        textAlign: "right",
      },
    },
    requestButtonHelpText: {
      maxWidth: 203,
      textAlign: "center",
      paddingTop: 5,
      color: "#456",
      fontSize: "0.95rem",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "none",
      },
    },
  }),
);

export default "styles";
