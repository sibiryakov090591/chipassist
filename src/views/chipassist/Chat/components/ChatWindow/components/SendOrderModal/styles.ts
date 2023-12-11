import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    form: {
      width: 500,
      minHeight: 440,
      height: "100%",
      textAlign: "start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        height: "auto",
        minHeight: "auto !important",
        flexGrow: 1,
      },
      "& h3:not(:first-child)": {
        marginTop: 16,
      },
    },
    label: {
      fontSize: 11,
    },
    value: {
      fontWeight: "bold",
      fontSize: 15,
    },
    qtyInput: {
      maxWidth: 106,
      "& input": {
        fontWeight: "bold",
        fontSize: 15,
      },
    },
    productCard: {
      margin: 0,
      width: "100%",
      border: "1px solid #eee",
      borderRadius: 4,
      background: "#f5f5f5",
    },
    divider: {
      marginTop: 16,
    },
    invoiceInput: {
      width: "80%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    currencyButton: {
      color: "#456",
      fontSize: 14,
      border: "1px solid #d4d4d4",
    },
  }),
);

export default "styles";
