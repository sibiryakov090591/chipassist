import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  stickyContainer: {
    "& > div": {
      "&.sticky": {
        marginTop: 85,
        [theme.breakpoints.down("sm")]: {
          marginTop: 130,
        },
      },
    },
  },
}));

export default "styles";
