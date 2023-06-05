import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    tableContentWhiteSpace: {
      position: "relative",
      height: 100,
      "& h1": {
        textAlign: "center",
      },
    },
    header: {
      fontSize: "24px",
      fontWeight: 400,
      letterSpacing: "1px",
      // padding: "2em 0",
    },
    estRow: {
      marginTop: 17,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: { flexDirection: "column", gap: "20px", textAlign: "right", marginTop: 0 },
    },
    // est: {
    //   background: '#8d949d',
    //   color: '#fff',
    //   padding: '14px 54px',
    //   border: '1px solid #f1f1f1',
    // },
    empty: {
      marginTop: 10,
      padding: "15px 20px",
      background: "rgba(0,0,0,0.05)",
      border: "1px solid rgba(0,0,0,0.1)",
      "& a": {
        textDecoration: "underline",
        color: "#2cade0",
      },
    },
    estC: {
      padding: "14px 34px",
      border: "1px solid #f1f1f1",
      backgroundColor: "#fefefe",
      [theme.breakpoints.down("sm")]: { width: "100%", padding: "14px 10px" },
    },
    checkoutRow: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
      margin: "17px 0 34px 0",
    },
    checkout: {
      padding: "14px 34px",
      fontWeight: 700,
      fontSize: "14px",
      textTransform: "none",
    },
    checkoutIcon: {
      color: theme.palette.white,
    },
    checkoutContainer: {
      // padding: "30px",
      // border: "2px solid #ececec",
      // [theme.breakpoints.down("sm")]: {
      //   padding: "20px",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   padding: "10px",
      // },
    },
    checkoutBack: {
      marginBottom: 20,
      paddingLeft: 0,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(2),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    checkoutModal: {
      padding: "20px 30px 30px 30px",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      background: "#ececec",
      padding: "10px 11px",
      width: "100%",
      justifyContent: "space-between",
    },
    updateAlert: {
      marginBottom: 15,
    },
    alertMessage: {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      [theme.breakpoints.down("sm")]: { flexDirection: "column" },
    },
    updateAlertBtn: {
      width: "fit-content",
      marginLeft: 15,
      [theme.breakpoints.down("sm")]: { marginLeft: 0, marginTop: "5px" },
    },

    itemsContainer: {},
    itemsGrid: {
      display: "grid",
      gridTemplateColumns: "4fr 2fr 1fr 1fr 1fr 1fr 1fr 50px",
      gridTemplateAreas: `"product distributor moq stock price  qty total actions"`,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(5, 1fr) max-content",
        gridTemplateAreas: `
          "product product product product product product"
          "distributor moq stock price qty total"
          "product-errors product-errors product-errors product-errors product-errors product-errors"
          "actions actions actions actions actions actions "
        `,
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr) max-content",
        gridTemplateAreas: `
          "product product product "
          "distributor stock price"
          "moq qty total"
          "product-errors product-errors product-errors"
          "actions actions actions"
        `,
      },
    },
    headerProduct: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
  }),
);

export default "styles";
