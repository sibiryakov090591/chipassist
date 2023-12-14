import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import gradients from "../../../utils/gradients";

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
        [theme.breakpoints.up("lg")]: {
          flexGrow: 1,
          flexBasis: "50%",
          width: "50%",
        },
      },
      [theme.breakpoints.down("md")]: {
        display: "block",
        width: "90vw",
        maxWidth: 440,
      },
    },
    content: {
      padding: theme.spacing(8, 4, 3, 4),
    },
    requestContent: {
      padding: theme.spacing(8, 4, 3, 4),
      backgroundColor: "#fafafa",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      [theme.breakpoints.down("md")]: {
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 4,
      },
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "#fff",
        paddingTop: 0,
      },
    },
    media: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      padding: theme.spacing(3),
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    requestMedia: {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      padding: theme.spacing(8, 4, 3, 4),
      color: "#345",
      backgroundColor: "#fff",
      [theme.breakpoints.down("md")]: {
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 0,
      },
      [theme.breakpoints.down("xs")]: {
        paddingBottom: 0,
        "& h1": {
          fontSize: 24,
        },
      },
    },
    list: {
      listStyleType: "circle",
      marginLeft: 24,
      "& > li": {
        marginBottom: 3,
        fontSize: 15,
      },
    },
    icon: {
      backgroundImage: gradients.blue,
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
    resetForm: {
      marginTop: 12,
    },
    person: {
      marginTop: theme.spacing(2),
      display: "flex",
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default "styles";
