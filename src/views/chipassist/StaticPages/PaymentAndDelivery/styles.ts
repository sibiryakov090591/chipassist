import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    padding: "3rem 0",
  },
  imgWrapper: {
    height: "100%",
  },
  map: {
    maxWidth: 650,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
}));

export default useStyles;
