import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  closeIcon: {
    color: "#2d2d2d",
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 10,
    fontSize: 27,
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "initial",
    },
  },
}));

export default "styles";
