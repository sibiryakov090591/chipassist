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
    viewsFIcon: {
      fontSize: "14px",
      color: theme.palette.primary.main,
      paddingBottom: 1,
    },
    currency: {
      fontSize: 14,
      fontWeight: 600,
      color: "#555555",
      paddingTop: "3px",
      paddingBottom: "1px",
      paddingRight: "2px",
    },
  }),
);

export default "styles";
