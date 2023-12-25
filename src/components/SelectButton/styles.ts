import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    menuList: {
      "& a": {
        color: "inherit",
      },
    },
    arrow: {
      fontSize: "14px",
      color: theme.palette.primary.main,
      paddingBottom: 1,
      marginLeft: 6,
    },
    button: {
      textTransform: "initial",
      fontSize: 14,
      color: "#555555",
      border: "1px solid rgba(0,0,0,0.15)",
      paddingTop: "3px",
      paddingBottom: "1px",
      paddingRight: "2px",
    },
  }),
);

export default "styles";
