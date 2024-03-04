import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    table: {
      tableLayout: "fixed",
      width: "100%",
      borderCollapse: "collapse",
      [theme.breakpoints.down(500)]: {
        tableLayout: "auto",
      },
    },
    headers: {
      // backgroundColor: "#f5f6f7",
      backgroundColor: theme.palette.app.blue800,
      "& th": {
        fontSize: "0.9rem",
        fontWeight: "bold",
        padding: "2px 10px",
        backgroundColor: theme.palette.app.blue800,
        color: "#ffffff",
        [theme.breakpoints.down(500)]: {
          padding: "2px 0 2px 10px",
        },
      },
    },
    tableRow: {
      height: "38px",
      "& td": {
        padding: "2px 10px",
        [theme.breakpoints.down(500)]: {
          padding: "2px 0 2px 10px",
        },
      },
      "&.odd": {
        backgroundColor: "#fafafa",
      },
      "&.expanded": {
        borderTop: "1px solid #ddd",
        borderBottom: "1px solid #e8e8e8",
        fontWeight: "bold",
        backgroundColor: "#f2d492",
        "& td": {
          backgroundColor: "#f2d492",
          fontWeight: "bold",
        },
      },
    },
    tdSeller: {
      wordBreak: "normal",
      textAlign: "start",
    },
    tdPrice: {
      width: "18%",
      whiteSpace: "nowrap",
      textAlign: "end",
    },
    tdStock: {
      width: "15%",
      textAlign: "end",
      [theme.breakpoints.down(500)]: {
        width: "18%",
      },
    },
    tdActions: {
      width: 130,
      textAlign: "center",
      paddingLeft: "40px !important",
      paddingRight: "0 !important",
      [theme.breakpoints.down(500)]: {
        width: "auto",
        paddingLeft: "12px !important",
      },
    },
    tdIcon: {
      width: 43,
      textAlign: "end",
      [theme.breakpoints.down(500)]: {
        padding: "2px 10px !important",
      },
    },
    icon: {
      transition: "all 180ms ease",
      "&.expanded": {
        transform: "rotate(180deg)",
      },
    },
    details: {
      backgroundColor: "#f8f4e3",
      width: "100%",
      borderBottom: "1px solid #ddd",
    },
    detailsLabel: {
      marginBottom: 2,
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    buttonColumn: {
      display: "flex",
      alignItems: "center",
      paddingRight: 10,
    },
    contactSellerButton: {
      textTransform: "none",
      fontWeight: "bold",
    },
    partnerLink: {
      color: "#16697a !important",
      textDecoration: "underline",
    },
    detailsPriceRow: {
      borderTop: "1px solid #ddd",
      "& > td": {
        padding: "3px 0",
      },
    },
    detailsAmount: {
      width: "40%",
    },
    detailsCurrency: {
      width: "50px",
    },
    detailsPrice: {
      width: "45%",
    },

    checkIconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkIcon: {
      width: 10,
      height: 10,
      borderRadius: 3,
      border: `1px solid ${theme.palette.app.grey300}`,
      backgroundColor: theme.palette.white,
      "& > svg": {
        transform: "translate(-2px, -6px)",
        fontSize: 0,
      },
      "&.checked": {
        backgroundColor: theme.palette.app.grey100,
        "& > svg": {
          fontSize: 16,
        },
      },
    },
    accordionRoot: {
      textAlign: "center",
      background: "initial",
      "&:before": { display: "none" },
    },
    accordionExpanded: {
      margin: "auto !important",
    },

    AccordionSummaryContent: { flexGrow: 0 },
    accordionStocksTitle: {
      color: "#3f7cac",
      fontSize: 16,
    },
    accordionStocksDetails: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },
    accordionTitle: {
      textDecoration: "underline",
      textAlign: "end",
      minWidth: 80,
      display: "grid",
      width: "100%",
    },
    accordionDetails: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },
    dataColumns: {
      display: "grid",
      gridTemplateColumns: "45% 55%",
      alignItems: "center",
      "& span": {
        display: "inline-block",
        "&:first-of-type": {
          fontWeight: 700,
        },
      },
      marginBottom: "5px",
      padding: "0 16px",
      textAlign: "left",
    },
    tableAreas: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      marginBottom: "5px",
      listStyleType: "none",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr 1fr",
      },
      "& > li": {
        padding: "16px",
        overflowX: "clip",
        textOverflow: "ellipsis",
        "& > span:first-of-type": {
          display: "block",
          color: theme.palette.app.blue800,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 3,
        },
        "& > span:last-of-type": {
          fontSize: 20,
          fontWeight: "bold",
        },
        "&:empty": {
          display: "none",
        },
      },
    },
    stockIcon: {
      width: 33,
      marginLeft: "-10px",
      position: "absolute",
      left: 0,
      top: "-14px",
    },
    cartIcon: {
      color: theme.palette.app.green600,
      marginRight: 5,
    },
    statusText: {
      color: "#00C9A4",
      fontWeight: "bold",
    },
    trQty: {
      "& .MuiInputBase-root": {
        height: 27,
        "& input": {
          textAlign: "right",
        },
      },
    },
    buttons: {
      "& button": {
        width: "100%",
        margin: "10px 0 0 0",
      },
    },
    addToBomIcon: {
      fontSize: "16px",
      marginRight: "3px",
    },
  }),
);

export default "styles";
