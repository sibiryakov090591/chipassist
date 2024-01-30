import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    preloader: {
      padding: "60px 0",
    },
    emptyMessage: {
      textAlign: "center",
      padding: "60px 0",
    },
    title: {
      paddingTop: "20px",
      marginBottom: 40,
      fontSize: 30,
      textAlign: "center",
    },
    groupWrapper: {
      marginBottom: 40,
    },
    groupLabel: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#456",
      marginBottom: 8,
      "& > span": {
        fontSize: 14,
        color: "#a1b0c1",
        marginLeft: 4,
      },
    },
    itemsWrapper: {
      columnCount: 5,
      [theme.breakpoints.down("lg")]: {
        columnCount: 4,
      },
      [theme.breakpoints.down("md")]: {
        columnCount: 3,
      },
      [theme.breakpoints.down("sm")]: {
        columnCount: 2,
      },
      [theme.breakpoints.down("xs")]: {
        columnCount: 1,
      },
    },
    link: {
      display: "block",
      textTransform: "capitalize",
      fontSize: 15,
      color: theme.palette.app.grey500,
      marginBottom: 5,
      "&:hover": {
        textDecoration: "underline",
        color: theme.palette.app.grey500,
      },
    },
  }),
);

export default "styles";
