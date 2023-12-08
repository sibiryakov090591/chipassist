import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import gradients from "@src/utils/gradients";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(6, 2),
    },
    card: {
      width: theme.breakpoints.values.md,
      maxWidth: "100%",
      overflow: "unset",
      display: "flex",
      position: "relative",
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
        width: "50%",
      },
      [theme.breakpoints.down("md")]: {
        width: "auto",
        maxWidth: "420px",
      },
    },
    content: {
      padding: theme.spacing(8, 4, 3, 4),
    },
    media: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      padding: theme.spacing(3),
      color: theme.palette.white,
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    icon: {
      backgroundImage: gradients.green,
      color: "#fff",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      position: "absolute",
      top: -32,
      left: theme.spacing(3),
      height: 64,
      width: 64,
      fontSize: 32,
    },
    loginForm: {
      marginTop: theme.spacing(3),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    person: {
      marginTop: theme.spacing(2),
      display: "flex",
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    link: {
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        color: "white",
        textDecoration: "underline",
      },
      "&:active": {
        color: "white",
        textDecoration: "underline",
      },
      "&:focus": {
        color: "white",
        textDecoration: "underline",
      },
    },
    logo: {
      height: 42,
    },
  }),
);

export default "styles";
