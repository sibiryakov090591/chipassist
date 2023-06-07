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
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: `${theme.palette.primary.main}`,
    },
  }),
);

export default "styles";