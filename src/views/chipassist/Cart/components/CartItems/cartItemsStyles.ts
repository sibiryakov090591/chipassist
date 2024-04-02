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
    main: {
      height: "100%",
      width: "100%",
      [theme.breakpoints.down("sm")]: { padding: "1em" },
    },
    descStatus: {
      display: "flex",
      alignItems: "center",
      "& > *:first-child": {
        margin: "7px",
      },
    },
    stickyTotal: {
      height: "fit-content",
      minHeight: "inherit !important",
      visibility: "visible",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 2.4rem",
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      marginTop: 80,
      width: "100% !important",
      position: "fixed",
      backgroundColor: "white",
      boxShadow: "0 -3em 3em rgb(0 0 0 / 10%), 0 0 0 2px rgb(255 255 255), 0.3em 0.3em 1em rgb(0 0 0 / 30%)",
    },
    stickyTotalElfaro: {
      marginTop: 70,
    },
    stickyTotalHide: {
      height: 1,
      minHeight: "1px !important",
      visibility: "hidden",
    },
    stickyTotalCost: {
      marginBottom: 5,
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "#271C3F",
    },
    stickyTotalRight: {
      textAlign: "right",
      "& > *": {
        marginBottom: 5,
      },
    },
    stickyTotalTax: {
      fontSize: "1.1rem",
    },
    estRow: {
      marginTop: 17,
      display: "flex",
      flex: "1 0 auto",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: { flexDirection: "column", gap: "20px", textAlign: "left", marginTop: 0 },
    },
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
      padding: "14px 0",
      backgroundColor: "#fefefe",
      textAlign: "right",
      [theme.breakpoints.down("sm")]: { width: "100%", padding: "14px 10px" },
      [theme.breakpoints.down("xs")]: { textAlign: "left", padding: "14px 0" },
    },
    estTax: {
      fontSize: "1.1rem",
      marginBottom: 10,
    },
    estTotal: {
      fontSize: "1.2rem",
    },
    estTotalHint: {
      fontSize: "16px",
      paddingTop: "1rem",
      marginLeft: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    checkoutRow: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
      margin: "17px 0 34px 0",
    },
    checkout: {
      padding: "10px 28px",
      fontWeight: 700,
      fontSize: "14px",
    },
    checkoutIcon: {
      color: theme.palette.white,
    },
    checkoutContainer: {
      padding: "30px",
      border: "2px solid #ececec",
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
      marginTop: "1rem",
      marginBottom: 15,
      fontSize: "inherit",
      fontWeight: 600,
      borderRadius: 0,
      backgroundColor: "#FFD275",
      color: "#16697A",
    },
    alertMessage: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 0,
      [theme.breakpoints.down("sm")]: { flexDirection: "column" },
    },
    updateAlertBtn: {
      width: "fit-content",
      marginLeft: 15,
      padding: "8px",
      fontSize: "0.8rem",
      fontWeight: 600,
      backgroundColor: "#2292a4",
      color: "#DCEDFF",
      [theme.breakpoints.down("sm")]: { marginLeft: 0, marginTop: "5px" },
    },
    itemsContainer: {
      marginTop: 10,
      "& li": {
        [theme.breakpoints.up("md")]: {
          display: "flex",
          alignItems: "center",
        },
      },
    },
    itemsGrid: {
      display: "grid !important",
      gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr 1fr 50px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(5, 1fr) max-content",
        gridTemplateAreas: `
          "product product product product product"
          "manufacturer sellers stock price qty"
          "actions actions actions actions actions "
        `,
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr) max-content",
        gridTemplateAreas: `
          "product product product "
          "manufacturer sellers stock"
          "price . qty"
          "actions actions actions"
        `,
      },
    },
    itemsGridVer2: {
      display: "grid !important",
      gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr 50px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(5, 1fr) max-content",
        gridTemplateAreas: `
          "product product product product product"
          "manufacturer stock sellers price qty"
          "actions actions actions actions actions "
        `,
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr) max-content",
        gridTemplateAreas: `
          "product product product "
          "manufacturer stock sellers"
          "price . qty"
          "actions actions actions"
        `,
      },
    },
    headerProduct: {
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    alignCenter: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    stockIcon: {
      width: 25,
      marginLeft: "-10px",
      filter: "invert(1)",
      position: "absolute",
      left: 0,
      top: "-5px",
    },
    justifyContentStart: {
      justifyContent: "flex-start",
    },
    deliveryHintWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
    deliveryHint: {
      borderRadius: 3,
      padding: "5px 15px",
      textAlign: "center",
      backgroundColor: "#ffd275",
      color: "#000",
    },
    listIcon: {
      height: 60,
      marginRight: 10,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
  }),
);

export default "styles";
