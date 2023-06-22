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
      position: "relative",
    },
    drawerPapper: {
      minWidth: 140,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: `${theme.palette.primary.main}`,
    },
    contactLink: {
      display: "block",
      textAlign: "center",
      color: "#e8e8e8",
      fontWeight: "bold",
      marginBottom: 12,
    },
    chatUnreadCount: {
      position: "absolute",
      top: "-7px",
      left: "85%",
    },
  }),
);

export default "styles";
