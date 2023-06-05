import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    menuButton: {
      padding: "5px",
      width: "38px",
      height: "38px",
      fontSize: "25px",
      color: theme.palette.white,
      borderColor: theme.palette.white,
      borderRadius: "3px",
      border: "1px solid #666",
      float: "left",
      marginTop: "3px",
    },
    drawerPapper: {
      minWidth: 140,
      backgroundColor: theme.palette.primary.main,
    },
    logo: {
      width: 200,
      marginTop: 10,
      [theme.breakpoints.down("sm")]: {
        width: 110,
        marginTop: 10,
      },
    },
    menuItem: {
      cursor: "pointer",
      fontSize: "16px",
      textTransform: "uppercase",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "15px 12px",
      "&:hover": {
        color: "#fff",
        backgroundColor: "#5998b2",
      },
    },
    link: {
      padding: 5,
      "& > a": {
        color: "#ffffff",
        fontWeight: "bold",
        "&:hover": {
          color: "#ffffff",
          borderBottom: "1px solid #ffffff",
        },
      },
    },
  }),
);

export default "styles";
