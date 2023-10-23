import { makeStyles } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: AppTheme & Theme) => ({
  title: {
    width: "100%",
    fontSize: "3em",
    fontWeight: 600,
    display: "flex",
    justifyContent: "flex-start",
  },
  gridItem: {
    padding: "40px",
  },
  loginForm: {
    marginTop: theme.spacing(3),
  },
  legendText: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: "1.3em",
  },
}));

export default useStyles;
