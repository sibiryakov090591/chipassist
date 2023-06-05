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
      fontSize: 12,
      fontWeight: "bold",
      marginTop: 8,
      whiteSpace: "nowrap",
      height: 38,
      width: "100%",
      color: "#1b93c2",
      backgroundColor: "#ffffff",
      border: "1px solid #1b93c2",
      "&:hover": {
        backgroundColor: "#ACD4EF",
      },
    },
    inCart: {
      color: "#1b93c2",
      backgroundColor: "#ffffff",
      border: "1px solid #1b93c2",
      "&:hover": {
        backgroundColor: "#1b93c2",
        color: "#ffffff",
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      },
    },
    inCartMobile: {
      backgroundColor: "#1b93c2",
      color: "#ffffff",
    },
    listIconWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    listIcon: {
      height: 26,
      filter: "invert(42%) sepia(96%) saturate(453%) hue-rotate(151deg) brightness(96%) contrast(86%)",
    },
    listIconCount: {
      fontSize: 16,
    },
    listIconPcs: {
      paddingTop: 4,
      paddingLeft: 3,
      fontSize: 11,
    },
    addedToCart: {
      backgroundColor: theme.palette.app.blue800,
      color: "#ffffff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "rgba(22, 190, 159, 0.2)",
      },
      "&:active": {
        backgroundColor: "rgba(22, 190, 159, 0.2)",
      },
      "&:focus": {
        backgroundColor: "rgba(22, 190, 159, 0.2)",
      },
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
  }),
);

export default "styles";
