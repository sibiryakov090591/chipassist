import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import gradients from "../../utils/gradients";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: "absolute",
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32,
  },
  feedbackForm: {
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
  formContainer: {
    padding: "40px",
    display: "block",
  },
  formHeader: {
    margin: "7px 0 17px 0",
  },
  closeButton: {
    position: "absolute",
    top: 9,
    right: 9,
    padding: 7,
  },
}));

export default "styled";
