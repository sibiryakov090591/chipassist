import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    main: {
      height: "100%",
      width: "100%",
      padding: "1.5em 2em",
      backgroundColor: "#fff",
    },
    cartContainer: {
      margin: "0 5em",
    },
    header: {
      fontSize: "24px",
      fontWeight: 400,
      letterSpacing: "1px",
      padding: "2em 0",
    },
    topRow: {
      display: "flex",
      borderBottom: `1px solid ${theme.palette.app.grey200}`,
      paddingBottom: "11px",
      marginBottom: "10px",
      width: "100%",
    },
    imageColumn: {
      paddingTop: "1.5em",
    },
    image: {
      verticalAlign: "middle",
      textAlign: "center",
      marginRight: "10px",
    },
    imageTitle: {
      color: "#232f3e",
      fontSize: "12px",
      marginTop: "12px",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    centralColumn: {
      paddingLeft: "10px",
      width: "670px",
    },
    breadcrumb: {
      color: theme.palette.app.grey500,
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
      fontSize: "14px",
      lineHeight: "1.42857",
    },
    breadcrumbSpan: {
      fontSize: "11px",
      margin: "0 3px",
    },
    model: {
      fontWeight: 500,
      fontSize: "28px",
      marginBottom: "12px",
    },
    manufacturer: {
      fontWeight: 400,
      fontSize: "18px",
      paddingTop: "14px",
      paddingBottom: "3px",
      lineHeight: 1,
      color: "#777",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    description: {
      color: "#777",
      fontWeight: 400,
      fontSize: "12px",
      marginBottom: "12px",
    },
    bottomRow: {
      display: "flex",
    },
    dataSheet: {
      display: "flex",
      fontSize: "14px",
      color: theme.palette.app.grey500,
      backgroundColor: theme.palette.app.grey200,
      borderColor: theme.palette.app.grey200,
      padding: "7px 14px",
      marginRight: "4px",
      "&:hover": {
        cursor: "pointer",
      },
      borderRadius: "3px",
    },
    dataSheetImg: {
      height: "17px",
      marginRight: "7px",
    },
    addToBom: {
      display: "flex",
      fontSize: "14px",
      color: theme.palette.app.grey500,
      backgroundColor: theme.palette.app.grey200,
      borderColor: theme.palette.app.grey200,
      padding: "7px 14px",
      "&:hover": {
        cursor: "pointer",
      },
      borderRadius: "3px",
      marginRight: "4px",
    },
    addToBomIcon: {
      fontSize: "16px",
      color: "black",
    },
    priceBlock: {
      padding: "7px 14px",
      fontSize: "14px",
    },
    price: {
      fontWeight: 700,
    },
    imgSrc: {},

    rightColumn: {},
    logoImg: {
      marginBottom: "7px",
    },
    manufacturerPageLink: {
      display: "flex",
      fontSize: "14px",
      color: `${theme.palette.primary.main}`,
      fontWeight: 400,
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
      padding: "7px 14px",
    },
    reference: {
      display: "flex",
      fontSize: "14px",
      color: `${theme.palette.primary.main}`,
      fontWeight: 400,
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
      padding: "7px 14px",
    },
    cadModels: {
      display: "flex",
      fontSize: "14px",
      color: `${theme.palette.primary.main}`,
      fontWeight: 400,
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
      padding: "7px 14px",
    },
    cadModelsSpan: {
      padding: "2px 0px 0 7px",
    },
    cadModelsIcon: {
      color: "#fc98a6",
      fontSize: "14px",
    },

    priceStockRow: {
      borderBottom: `1px solid ${theme.palette.app.grey200}`,
      paddingBottom: "37px",
      marginBottom: "10px",
      width: "100%",
    },
    priceStock: {
      fontSize: "23px",
      padding: "24px 0 12px 0",
    },
    priceModel: {
      fontSize: "14px",
      marginBottom: "30px",
      color: theme.palette.app.grey500,
    },
    sort: {
      display: "block",
    },
    sortIcon: {
      fontSize: "13px",
      margin: "0 0 -2px 0px",
    },
    tableBlock: {},
    tableTopRow: {
      display: "flex",
      marginTop: "20px",
      marginBottom: "10px",
      justifyContent: "space-between",
    },
    tableDistributors: {
      fontSize: "16px",
      fontWeight: 400,
    },
    allPriceBreaks: {
      color: "#232f3e",
      fontSize: "13px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: 0,
    },
    tr: {
      background: "#E1E1E1",
      border: "1px solid #E1E1E1",
    },
    th: {
      padding: "4px 8px",
      background: "#E1E1E1",
      fontSize: "13px",
    },
    starIcon: {
      color: "#f5a623",
    },
    td: {
      fontSize: "13px",
      display: "table-cell",
    },
    trB: {
      fontSize: "13px",
      whiteSpace: "nowrap",
    },
    trG: {
      backgroundColor: "#f8f8f8",
    },
    underline: {
      textAlign: "left!important" as "left",
      textDecoration: "underline",
      "&:hover": {
        cursor: "pointer",
      },
    },
    blueLink: {
      color: theme.palette.primary.main,
    },
    greenText: { color: "#006400" },
    greyText: { color: "#777777" },
    visitSite: {},
    visitCell: {
      color: theme.palette.white,
      backgroundColor: "#232f3e",
      borderColor: "#212e3a",
      padding: "2px 6px",
      margin: "2px 0",
      fontSize: "12px",
    },
    tableCells: {
      padding: "6px",
      textAlign: "center",
    },
    showAllButton: {
      border: "1px solid #3472BC",
      padding: "15px",
      textAlign: "center",
      color: theme.palette.primary.main,
      fontSize: "14px",
      marginTop: "3px",
    },
    cadModelsRow: {
      borderBottom: `1px solid ${theme.palette.app.grey200}`,
      paddingBottom: "17px",
      marginBottom: "10px",
      width: "100%",
    },
    imgBlock: {
      display: "flex",
    },
    imgColumn: {
      width: "50%",
    },
    imgHeader: {
      fontSize: "18px",
    },
    cadImage: {
      padding: "7px 0 7px 0",
    },
    selectRow: {
      display: "flex",
      fontSize: "14px",
      margin: "12px 0 7px 0",
      alignItems: "baseline",
    },
    selectButton: {
      color: theme.palette.white,
      backgroundColor: "#232f3e",
      borderRadius: "3px",
      border: "0px",
      padding: "7px 8px 8px 8px",
      fontSize: "14px",
      margin: "3px 7px",
    },
    selectIcon: {
      fontSize: "12px",
      margin: "0 3px -2px 0",
    },
    cubIcon: {
      fontSize: "14px!important",
      margin: "0 3px -3px 0!important",
      color: "#fc1f49",
    },
    infoIcon: {
      fontSize: "14px!important",
      margin: "0 3px -3px 7px!important",
    },
    attrValue: {},
    attrName: {},
    attrRow: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 400,
      padding: "7px 0",
      fontSize: "14px",
      borderTop: `1px solid ${theme.palette.app.grey200}`,
      color: "rgb(51, 51, 51)",
    },
    attrCatName: {
      fontSize: "22px",
      fontWeight: 500,
      padding: "8px 0 8px 0",
    },
  }),
);

export default "styles";
