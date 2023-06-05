import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    hintIcon: {
      color: theme.palette.app.green800,
    },
  }),
);

export default "styles";
