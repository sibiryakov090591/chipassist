import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    productSelectModalContainer: {
      "& .MuiDialog-paperWidthLg": { maxWidth: "100%" },
      "& .MuiDialog-paperFullWidth": { width: "min-content" },
    },
    productSelectModal: {
      padding: "20px 30px 30px 30px",
      display: "flex",
      flexDirection: "column",
      minHeight: "320px",
    },
    title: {
      marginRight: 10,
      fontSize: "1.3em",
    },
    titlePartNumber: {
      fontSize: "1.3em",
      fontWeight: "bold",
      textDecoration: "underline",
    },
    buttonsContainer: {
      flexWrap: "wrap",
      rowGap: "15px",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    tableContentWhiteSpace: {
      position: "relative",
      height: 100,
      "& h1": {
        textAlign: "center",
      },
    },
    tableSort: {
      "&:hover": {
        color: `${theme.palette.app.grey300} !important`,
      },
      "&.MuiTableSortLabel-active": {
        color: `${theme.palette.app.grey300} !important`,
      },
      "& svg": {
        width: "1em",
        height: "1em",
        color: `${theme.palette.app.blue300} !important`,
        opacity: 0.5,
      },
    },
    trTitle: {
      minWidth: 200,
    },
    trDisabled: {
      backgroundColor: `${theme.palette.app.grey300}`,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(2),
      // top: theme.spacing(1),
      color: "#ffffff",
      padding: 7,
    },
    actionPn: { marginRight: 55 },
    actionQty: { marginRight: 55 },
    actionButtons: {
      marginLeft: "auto",
      [theme.breakpoints.down("md")]: {
        marginLeft: "inherit",
      },
    },
    actionButton: {
      marginLeft: 15,
    },
    productLine: {
      padding: "8px 15px",
      background: "#efefef",
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": {
        background: "rgba(29,144,255,0.2)",
      },
      "&:not(:first-child)": {
        marginTop: 5,
      },
    },
    selectedProductLine: {
      background: "rgba(29,144,255,0.1)",
      boxShadow: "0 0 0 2px rgb(29,144,255)",
    },
    productsTable: {
      wordWrap: "break-word",
      "& *": {
        fontSize: 12,
        // lineHeight: 1.2,
      },
    },
    productsTableHeaderNames: {
      position: "sticky",
      zIndex: 2,
      top: 0,
      boxShadow: "0 1px 0 0 #e2e3e3",
      backgroundColor: theme.palette.app.blue600,
      height: 55,
      "& > *": {
        backgroundColor: theme.palette.app.blue600,
        color: theme.palette.white,
        fontWeight: 700,
      },
    },
    productsTableHeaderFilters: {
      position: "sticky",
      zIndex: 2,
      top: 55,
      boxShadow: "0 1px 0 0 #e2e3e3",
    },
    thFilters: {
      backgroundColor: "#fafafa",
    },
    controlFiltersLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    tableScroll: {
      display: "flex",
      minHeight: 200,
      maxHeight: 450,
      borderLeft: "1px solid #e2e3e3",
      borderRight: "1px solid #e2e3e3",
      borderBottom: "1px solid #e2e3e3",
      overflow: "auto",
    },
    noWrap: {
      whiteSpace: "nowrap",
    },
    textAlignEnd: {
      textAlign: "end",
    },
    searchBtn: {
      marginLeft: 10,
      padding: "7px 10px",
      fontSize: 12,
      textTransform: "none",
    },
    bomListRowGray: {
      background: "rgba(100,100,100,0.1)",
      boxShadow: "inset 3px 0 0 0 gray",
    },
    extendedSearchBar: {
      display: "flex",
      "& > div": {
        margin: "0",
        padding: 0,
        border: "none",
      },
      "& .MuiLinearProgress-root": {
        margin: "0",
      },
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 35,
    },
    sortSelect: {
      "& .MuiSelect-iconOutlined": {
        top: "inherit",
      },
    },
    errorText: {
      minWidth: 60,
      color: red[500],
      fontSize: "calc(12px - 30%)",
      lineHeight: 1.2,
    },
    chipStock: {
      backgroundColor: theme.palette.app.green700,
      textTransform: "uppercase",
      color: "#ffffff",
    },
    chipRequest: {
      backgroundColor: "#FFCC01",
      textTransform: "uppercase",
      color: "#ffffff",
    },
    statusText: {
      whiteSpace: "nowrap",
      color: "#00C9A4",
      fontWeight: "bold",
    },
    restQtyHint: {
      padding: "0 !important",
      backgroundColor: "#ffd275",
      textAlign: "center",
      color: "#3f7cac",
      fontWeight: "bold",
    },
  }),
);

export default "styles";
