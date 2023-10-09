import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    table: {
      borderBottom: "0.5px solid #c6c6c6",
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13,
      tableLayout: "fixed",
      wordWrap: "break-word",
    },
    divider: {
      color: theme.palette.app.blue200,
      margin: "0 4px 0 2px",
    },
    trTh: {
      fontWeight: 700,
      borderBottom: "1px solid #c6c6c6",
      backgroundColor: theme.palette.app.blue800,
      color: theme.palette.white,
      "& > th": {
        backgroundColor: theme.palette.app.blue800,
      },
    },
    tr: {
      fontWeight: 300,
      "&:nth-child(even)": {
        backgroundColor: theme.palette.app.grey100,
      },
    },
    thRate: {
      width: 32,
      paddingLeft: 5,
      paddingRight: 0,
      [theme.breakpoints.down("md")]: {
        width: 35,
      },
    },
    thDistributor: {
      width: "11%",
      textAlign: "left",
      padding: "7px 7px 7px 20px",
    },
    thSku: {
      width: "15%",
      textAlign: "left",
      padding: "7px",
    },
    thQty: {
      width: 70,
      textAlign: "center",
      padding: "7px",
    },
    thStock: {
      width: 60,
      textAlign: "right",
      padding: "7px",
    },
    thIcon: {
      width: 15,
    },
    thLeadPeriod: {
      textAlign: "right",
      padding: "7px",
      width: 65,
    },
    thMoq: {
      width: 50,
      textAlign: "right",
      padding: "7px",
    },
    thMpq: {
      width: 50,
      textAlign: "right",
      padding: "7px",
    },
    thPkg: {
      width: 50,
      textAlign: "right",
      padding: "7px",
    },
    thCurrency: {
      width: 30,
      textAlign: "center",
      padding: "7px",
    },
    thPricesHint: {
      width: 22,
      textAlign: "center",
      padding: "7px",
    },
    th1: {
      width: 55,
      textAlign: "right",
      padding: "7px",
    },
    th10: {
      width: 55,
      textAlign: "right",
      padding: "7px",
    },
    th100: {
      width: 60,
      textAlign: "right",
      padding: "7px",
    },
    th1000: {
      width: 65,
      textAlign: "right",
      padding: "7px",
    },
    th10000: {
      width: 70,
      textAlign: "right",
      padding: "7px",
      paddingRight: 10,
    },
    thActions: {
      width: 90,
    },
    starIcon: {
      color: "#f5a623",
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
    trRate: {
      paddingLeft: 14,
      textAlign: "center",
    },
    trRateInner: {
      display: "flex",
      height: "100%",
      alignItems: "center",
    },
    trDistributor: {
      padding: "7px 7px 7px 20px",
    },
    trDistributorICsearch: {
      textAlign: "center",
      "@media screen and (max-width: 1200px)": {
        display: "none",
      },
    },
    active: {
      background: "linear-gradient(180deg, #fffbe6 98%, #eeeeee 100%)",
    },
    trSku: {
      whiteSpace: "nowrap",
      overflow: "clip",
      textOverflow: "ellipsis",
      padding: "7px",
    },
    trQty: {
      "& .MuiInputBase-root": {
        height: 27,
        "& input": {
          textAlign: "right",
        },
      },
    },
    trStock: {
      fontWeight: "bold",
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    trLeadTime: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    trMoq: {
      textAlign: "right",
      minWidth: "70px",
      padding: "7px",
      paddingRight: "14px",
    },
    trMpq: {
      textAlign: "right",
      minWidth: "70px",
      paddingRight: "7px",
      padding: "7px",
    },
    trPkgWithoutBorder: {
      textAlign: "right",
      minWidth: "70px",
      paddingRight: "7px",
      padding: "7px",
    },
    trPkg: {
      textAlign: "right",
      minWidth: "70px",
      borderRight: `0.5px solid ${theme.palette.app.grey300}`,
      padding: "7px",
      paddingRight: "14px",
    },
    trCurrency: {
      textAlign: "center",
      paddingLeft: "7px",
      padding: "7px",
      whiteSpace: "nowrap",
    },
    trPricesHint: {
      textAlign: "center",
      padding: "7px",
    },
    trPrice: {
      whiteSpace: "nowrap",
    },
    tr1: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    tr10: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    tr100: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    tr1000: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "14px",
    },
    tr10000: {
      textAlign: "right",
      padding: "7px",
      paddingRight: "17px",
    },
    trOrder: {
      textAlign: "end",
      padding: "7px 14px",
    },
    trDynamicPriceBasedOnNumInStock: {
      width: 70,
      textAlign: "right",
      padding: "7px",
      backgroundColor: "#e6e6e6",
    },
    trDynamicPriceBasedOnNumInStockError: {
      width: 70,
      textAlign: "right",
      padding: "7px",
      color: "red",
      backgroundColor: "#e6e6e6",
    },
    cartIcon: {
      color: theme.palette.app.green600,
      marginLeft: 5,
      display: "flex !important",
    },
    elfaroCartIcon: {
      color: theme.palette.app.green600,
      marginLeft: 10,
      display: "flex !important",
    },
    cartLink: {
      display: "flex",
      alignItems: "center",
    },
    errorWrapper: {
      display: "flex",
      zIndex: 10,
      alignItems: "center",
      position: "absolute",
      bottom: "50%",
      transform: "translateY(50%)",
      right: "102%",
      cursor: "help",
      "&:hover": {
        "& div": {
          display: "block",
        },
      },
    },
    errorIcon: {
      color: red[500],
      fontSize: "1.2rem",
    },
    errorText: {
      position: "absolute",
      bottom: "120%",
      left: "-2px",
      display: "none",
      whiteSpace: "nowrap",
      color: "white",
      backgroundColor: red[500],
      borderRadius: 4,
      padding: "0 6px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      "&:before": {
        content: "''",
        display: "block",
        zIndex: "-1",
        position: "absolute",
        left: 5,
        bottom: "-1px",
        width: 10,
        height: 10,
        transform: "rotate(45deg)",
        backgroundColor: red[500],
      },
    },
    priceTooltipTable: {
      "& th": { fontSize: "0.9em", textAlign: "right", padding: "2px 5px" },
      "& td": { fontSize: "0.9em", textAlign: "right", padding: "2px 5px" },
    },
    priceTooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "inherit",
      border: "1px solid #dadde9",
      maxWidth: "none",
    },
    priceIcon: {
      color: "#1b93c2",
    },
    exclusiveStatus: {
      display: "flex",
      justifyContent: "center",
      cursor: "help",
      borderRadius: 3,
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: "#ffd275",
      color: "#16697a",
    },
    partnerName: {
      fontWeight: "bold",
      color: "#16697a !important",
    },
    dateUpdated: {
      fontSize: 11,
      lineHeight: "7px",
      marginTop: 3,
      fontStyle: "italic",
    },
    statIcon: {
      width: "9px",
      height: "9px",
      marginRight: "1px",
      marginTop: "1px",
    },
    country: {
      display: "flex",
      alignItems: "center",
      marginLeft: "-3px",
    },
    orderButton: {
      fontWeight: "bold",
      fontSize: 12,
      minWidth: 100,
    },
    paddingRight: {
      paddingRight: 20,
    },
    showMore: {
      whiteSpace: "nowrap",
      fontWeight: "normal",
      cursor: "pointer",
      fontSize: 10,
      textDecoration: "underline",
      textUnderlineOffset: "2px",
    },
    showMoreIcon: {
      backgroundColor: "#567",
      borderRadius: "50%",
      width: 14,
      height: 14,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "& > svg": {
        color: "#ffffff",
        fontSize: 14,
        transition: "all 150ms ease",
      },
    },
    showMoreActive: {
      transform: "rotate(180deg)",
    },
    tooltip: {
      backgroundColor: "#ffffff",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "inherit",
      border: "1px solid #cccccc",
      borderRadius: 2,
      maxWidth: "300px",
      padding: "12px",
      boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    },
    tooltipPopper: {
      zIndex: 1200,
    },
    tooltipTitle: {
      margin: "0 0 3px",
      fontSize: 20,
      fontWeight: "bold",
    },
    strong: {
      fontWeight: "bold",
      color: theme.palette.app.green800,
    },
    tdActions: {
      position: "relative",
      textAlign: "center",
      padding: 7,
    },
    contactSellerButton: {
      textTransform: "none",
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
    partnerLink: {
      color: "#16697a !important",
      textDecoration: "underline",
    },
    bestOffer: {
      border: "1px solid #16BEA3",
      borderRadius: "2px",
    },
    bestOfferLabel: {
      position: "absolute",
      top: "-8px",
      right: 10,
      fontSize: "0.75rem",
      background: "#16BEA3",
      color: "#fff",
      padding: "0 7px",
      borderRadius: "50ch",
      fontWeight: 600,
      lineHeight: "1.1rem",
    },
  }),
);

export default "styles";
