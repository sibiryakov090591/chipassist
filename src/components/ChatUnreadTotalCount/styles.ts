import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    unreadCount: {
      padding: "0 5px",
      fontSize: 11,
      lineHeight: "8px",
      height: 16,
      borderRadius: "50ch",
      color: "#F5F5F5",
      background: "#E94160",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);

export default "styles";
