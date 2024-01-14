import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cookie: {
      position: "fixed",
      height: 65,
      bottom: "-70px",
      left: 0,
      right: 0,
      backgroundColor: "#ffffff",
      boxShadow: "1px 1px 8px 0 #d2d2d2",
      padding: 12,
      display: "flex",
      alignItems: "center",
      transition: "all 1250ms ease",
      zIndex: 1000,
      [theme.breakpoints.down("sm")]: {
        height: "initial",
        bottom: "-280px",
      },
    },
    open: {
      bottom: 0,
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttons: {
      display: "flex",
      "& > *": {
        marginLeft: 12,
        whiteSpace: "nowrap",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignSelf: "flex-end",
        "& > *": {
          margin: 3,
        },
      },
    },
  }),
);

export default "styles";
