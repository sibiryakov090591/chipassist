import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  productContainer: {},
  productHeader: {
    fontWeight: 600,
    color: "#287c9f",
    fontSize: "2rem",
    borderBottom: "2px solid",
    width: "100%",
    paddingRight: 22,
    "& > h1": {
      margin: "0 12px 0 0",
      wordBreak: "break-all",
    },
  },
  productColumn: {
    flexBasis: 0,
    flexGrow: 2,
    flexShrink: 1,
    padding: "0.75rem",
    minWidth: "300px",
  },
  productColumnHeader: {
    fontWeight: "bold",
    paddingTop: "1rem",
  },
  productColumnValue: {
    color: "#287c9f",
    fontWeight: "bold",
  },
  inStock: {
    backgroundColor: "#287c9f",
    borderRadius: 4,
    marginBottom: 6,
    padding: "2px 10px",
    color: "#ffffff",
    fontWeight: "bold",
    height: 44,
  },
  productTable: {
    width: "100%",
    display: "table",
    borderRadius: 5,
    border: "1px solid #287c9f",
    backgroundColor: "#287c9f",
    overflow: "hidden",
    "& *": {
      textAlign: "center",
    },
  },
  productTableHeader: {
    display: "table-row",
    color: "#fff",
    "& > div": {
      padding: "5px 10px",
      display: "table-cell",
    },
  },
  productTableBody: {
    display: "table-row-group",
    backgroundColor: "#ffffff",
    color: "#287c9f",
    "& > div": {
      display: "table-row",
      "& > div": {
        padding: "5px 10px",
        display: "table-cell",
      },
    },
  },
  productBuyInput: {
    border: "1px solid #1c81a8",
    borderRadius: "5px 0 0 5px",
    verticalAlign: "middle",
    textAlign: "right",
    paddingRight: "1rem",
    width: "45%",
    minWidth: "100px",
    background: "#fff",
    height: "44px",
  },
  disabledInput: {
    backgroundColor: theme.palette.app.grey200,
  },
  productBuyButton: {
    color: "#ffffff",
    backgroundColor: "#1c8cbe",
    borderRadius: "0 5px 5px 0",
    fontFamily: "Roboto, Arial, sans-serif",
    verticalAlign: "middle",
    height: "44px",
    border: "1px solid #1c81a8",
    padding: "0 1rem",
    width: "55%",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#3a98cf",
    },
  },
  goToCardButton: {
    width: "100%",
    height: 44,
    fontWeight: "bold",
  },
  productBrandDescription: {
    fontSize: "0.8rem",
    color: "#777",
    textAlign: "center",
    width: "80%",
    margin: "0 auto",
    marginTop: "1.5rem",
  },
  currency: {
    color: "#287c9f",
    fontWeight: "bold",
    fontSize: 21,
  },
  or: {
    padding: "3px 0",
  },
  rfqButton: {
    width: "100%",
    height: "44px",
  },
  inCartMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#16697a",
    fontWeight: "normal",
    backgroundColor: "#f2d492",
    borderRadius: 2,
    fontSize: 15,
    height: 30,
    marginBottom: 5,
    "& > div > span": {
      fontWeight: "bold",
    },
  },
  exclusive: {
    background: "#ffd275",
    border: "none",
    padding: 10,
    textAlign: "center",
    color: "#16697a",
    borderRadius: 5,
    "& > div": {
      paddingTop: 5,
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
  },
}));

export default "styles";
