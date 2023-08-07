import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  main: {
    height: "100%",
    width: "100%",
    padding: "2em 0",
    backgroundColor: theme.palette.white,
    [theme.breakpoints.down("sm")]: { padding: "1em" },
    [theme.breakpoints.down("xs")]: { padding: "0" },
  },
  cartContainer: {
    paddingBottom: 30,
  },
  dataContainer: {
    display: "flex",
    gap: "30px",
    [theme.breakpoints.down("sm")]: {
      gap: 0,
      flexDirection: "column",
    },
  },
  title: {
    fontWeight: 600,
    fontSize: "23px",
    padding: "12px 0",
  },
  header: {
    fontSize: "24px",
    fontWeight: 400,
    letterSpacing: "1px",
    padding: "2em 0",
  },
  topRow: {
    display: "flex",
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
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
    maxHeight: "75px",
    width: "auto",
    objectFit: "cover",
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
    display: "flex",
  },
  priceCurrency: {
    marginRight: "12px",
  },
  price: {
    fontWeight: 700,
  },
  imgSrc: {},

  rightColumn: {
    marginLeft: "auto",
  },
  logoImg: {
    marginBottom: "7px",
    maxWidth: "10em",
  },
  manufacturerPageLink: {
    display: "flex",
    fontSize: "14px",
    color: theme.palette.primary.main,
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
    color: theme.palette.primary.main,
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
    color: theme.palette.primary.main,
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
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
    paddingBottom: "37px",
    marginBottom: "10px",
    width: "100%",
  },
  blockTitle: {
    fontSize: "21px",
    fontWeight: 600,
    padding: "12px 0 12px 0",
  },
  priceModel: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#287c9f",
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
    wordWrap: "break-word",
  },
  tr: {
    background: "#E1E1E1",
    border: "1px solid #E1E1E1",
  },
  th: {
    padding: "4px 8px",
    background: "#E1E1E1",
    fontSize: "13px",
    whiteSpace: "nowrap",
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
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: theme.palette.secondary.light,
    },
  },
  trG: {
    backgroundColor: "#f8f8f8",
  },
  trSelected: {
    zIndex: 2,
    background: theme.palette.secondary.light,
    boxShadow: "inset 0 0 0 2px #2196f394",
  },
  underline: {
    textAlign: "left !important" as "left",
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
    "&:hover": {
      cursor: "pointer",
    },
  },
  cadModelsRow: {
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
    "&:hover": {
      background: "#E1F5FE50",
    },
  },
  attrCatName: {
    fontSize: "22px",
    fontWeight: 500,
    padding: "8px 0 8px 0",
  },
  documentsBlock: {
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
    padding: "0 0 10px 0",
  },
  descriptionBlock: {
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
    padding: "17px 0 57px 0",
  },
  referenceBlock: {
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
    padding: "17px 0 57px 0",
  },
  referenceUl: {
    marginLeft: "17px",
  },
  referenceLi: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  documentsDescription: {
    padding: "0 0 0 0",
  },
  documentsRow: {
    padding: "3px 0 3px 0",
    display: "flex",
    "&:hover": {
      backgroundColor: "#fdffdf",
      cursor: "pointer",
    },
  },
  documentsDistributor: {
    padding: "17px 0 7px 0",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  documentsColumn1: {
    width: "50%",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  documentsColumn2: {
    width: "50%",
    display: "flex",
  },
  documentsElement: {
    width: "50%",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  imagesRow: {
    display: "flex",
    // borderBottom: `1px solid ${theme.palette.app.grey200}`,
    padding: "17px 0 57px 0",
  },
  imagesHeader: {
    fontSize: "23px",
    padding: "24px 0 17px 0",
  },
  imagesColumn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },
  imagesItem: {
    width: 75,
  },
  imagesLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stockForm: {
    padding: "3px",
  },
  tableCellsFirst: {
    minWidth: "57px",
    textAlign: "right",
  },
  currencyTd: {
    minWidth: "57px",
    textAlign: "center",
  },
  attributeTable: {
    border: `1px solid ${theme.palette.app.grey200}`,
    "margin-bottom": 25,
    wordWrap: "break-word",
    "& .MuiTableCell-root": {
      border: "none",
      "&:last-child": {
        textAlign: "right",
      },
    },
  },
  attributeTableRow: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.app.grey100,
    },
  },
  attributeTableHeader: {
    fontWeight: 600,
  },
  imagesContainer: {
    width: 270,
    [theme.breakpoints.down("sm")]: {
      width: 190,
    },
  },
  contentContainer: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  imagesWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: 15,
    marginBottom: 15,
  },
  mainImg: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mainImgItem: {
    width: "100%",
    padding: 60,
    [theme.breakpoints.down("sm")]: {
      padding: 16,
    },
  },
}));

export default "styles";
