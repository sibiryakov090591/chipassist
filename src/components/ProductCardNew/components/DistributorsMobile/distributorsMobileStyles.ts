import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    stockrecord: {
      padding: "0 15px",
      "&+&": {
        // borderTop: "1px solid #e7e8ec",
        paddingTop: "10px",
      },
      [theme.breakpoints.down("sm")]: {
        "&:nth-child(even)": {
          backgroundColor: "#f8f8f8",
        },
      },
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
    accordionStocks: {
      backgroundColor: "#e6f4ff",
      borderTop: "1px solid #ebebeb",
      borderBottom: "1px solid #ebebeb",
      marginBottom: 8,
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
    table: {
      borderTop: "0.5px solid #c6c6c6",
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13,
      "& tr:not(last)": {
        borderBottom: "0.5px solid #c6c6c6",
      },
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
    contactSellerButton: {
      minWidth: 230,
      textTransform: "none",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  }),
);

export default "styles";
