import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    padding: "2em 0",
    backgroundColor: theme.palette.white,
  },
  empty: {
    textAlign: "center",
    margin: 50,
    fontSize: 20,
  },
  th: {
    width: "16%",
  },
  thDate: {
    width: "20%",
  },
  table: {
    tableLayout: "fixed",
    width: "100%",
    border: `1px solid ${theme.palette.app.grey200}`,
    "& td, th": {
      textAlign: "center",
    },
  },
  thText: { width: "14%" },
  thQty: { width: "12%" },
  thArrow: { width: "40px", padding: 0 },
  noWrap: {
    whiteSpace: "nowrap",
  },
}));

export default "styles";
