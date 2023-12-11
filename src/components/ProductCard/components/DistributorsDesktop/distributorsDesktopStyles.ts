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
    trTh: {
      fontWeight: 700,
      borderBottom: "0.5px solid #c6c6c6",
      background: theme.palette.primary.main,
      color: theme.palette.white,
      "& th": {
        background: theme.palette.primary.main,
      },
    },
    trElfaro: {
      fontWeight: 300,
      "&:nth-child(even)": {
        backgroundColor: theme.palette.app.grey100,
      },
    },
    trIcSearch: {
      fontWeight: 300,
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": {
        background: theme.palette.secondary.light,
        "& $trDynamicPriceBasedOnNumInStock": {
          backgroundColor: "transparent",
        },
        "& $trDynamicPriceBasedOnNumInStockError": {
          backgroundColor: "transparent",
        },
      },
      "&:nth-child(even)": {
        backgroundColor: theme.palette.app.grey100,
        "&:hover": {
          background: theme.palette.secondary.light,
        },
      },
    },
    trSelected: {
      zIndex: 2,
      background: `${theme.palette.secondary.light} !important`,
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
      width: "10%",
      textAlign: "left",
      padding: "7px",
      "@media screen and (max-width: 1200px)": {
        // display: "none",
      },
    },
    thDistributorICsearch: {
      textAlign: "center",
      width: "7%",
      padding: "7px",
      "@media screen and (max-width: 1200px)": {
        display: "none",
      },
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
    thLeadPeriod: {
      textAlign: "right",
      padding: "7px",
      width: 65,
    },
    thMoq: {
      width: 60,
      textAlign: "right",
      padding: "7px",
    },
    thMpq: {
      width: 60,
      textAlign: "right",
      padding: "7px",
    },
    thPkg: {
      width: 60,
      textAlign: "right",
      padding: "7px",
    },
    thCurrency: {
      width: 45,
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
      [theme.breakpoints.down("md")]: {
        paddingRight: 24,
      },
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
      paddingRight: 24,
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
      padding: "7px",
      "@media screen and (max-width: 1200px)": {
        // display: "none",
      },
    },
    trDistributorICsearch: {
      textAlign: "center",
      "@media screen and (max-width: 1200px)": {
        display: "none",
      },
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
      textAlign: "right",
      padding: "7px",
    },
    trMoq: {
      textAlign: "right",
      minWidth: "70px",
      padding: "7px",
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
      paddingRight: "7px",
      borderRight: `0.5px solid ${theme.palette.app.grey300}`,
      padding: "7px",
    },
    trCurrency: {
      textAlign: "center",
      paddingLeft: "7px",
      padding: "7px",
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
    },
    tr10: {
      textAlign: "right",
      padding: "7px",
    },
    tr100: {
      textAlign: "right",
      padding: "7px",
      [theme.breakpoints.down("md")]: {
        paddingRight: 24,
      },
    },
    tr1000: {
      textAlign: "right",
      padding: "7px",
    },
    tr10000: {
      textAlign: "right",
      padding: "7px",
      paddingRight: 24,
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
    trDynamicPriceIsSelected: {
      backgroundColor: "transparent",
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
    dateUpdated: {
      fontSize: 11,
      lineHeight: "7px",
      marginTop: 3,
    },
  }),
);

export default "styles";
