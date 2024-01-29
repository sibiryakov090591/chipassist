import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  table: {
    border: `1px solid ${theme.palette.app.grey200}`,
    "& > tbody > tr:nth-child(odd)": {
      backgroundColor: "#fafafa",
    },
    "& > tbody > tr > td:first-child": {
      borderRight: `1px solid ${theme.palette.app.grey200}`,
    },
    wordWrap: "break-word",
    overflowWrap: "anywhere",
  },
  tableHeader: {
    width: "20%",
    fontWeight: 600,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      width: "53%",
      whiteSpace: "normal",
    },
  },
  selected: {
    fontWeight: 600,
    color: theme.palette.app.green800,
  },
}));

export default "styles";
