import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  tableSort: {
    "&.MuiTableSortLabel-active": {
      color: `${theme.palette.app.grey300} !important`,
    },
    "& svg": {
      width: "0.7em",
      height: "0.7em",
      color: `${theme.palette.app.grey200} !important`,
      marginRight: 0,
    },
    "&:hover": {
      color: `${theme.palette.app.grey200} !important`,
    },
  },
  thCurrency: {
    whiteSpace: "nowrap",
  },
}));

export default "styles";
