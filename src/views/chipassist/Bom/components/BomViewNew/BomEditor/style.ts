import { makeStyles } from "@material-ui/styles";
import { lighten } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(359deg)",
    },
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  headerNameSection: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: { flexWrap: "wrap" },
  },
  headerName: {
    lineHeight: "35px",
    [theme.breakpoints.down("sm")]: { flex: "0 0 100%" },
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-end",
      alignSelf: "flex-end",
    },
  },
  textError: {
    color: red[500],
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 15,
    color: "#969696",
  },
  bomName: {
    maxWidth: 400,
    "& .MuiFormLabel-root:not(.Mui-focused)": {
      color: "#afafaf",
    },
    "& .MuiOutlinedInput-input": {
      height: "35px",
      padding: "0 15px",
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(16px, 11px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  bomSets: {
    width: 100,
    marginLeft: 15,
    "& .MuiFormLabel-root:not(.Mui-focused)": {
      color: "#afafaf",
    },
    "& .MuiOutlinedInput-input": {
      height: "35px",
      padding: "0 15px",
    },
    "& .MuiOutlinedInput-root": {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(16px, 11px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  },
  bomSetsApply: {
    height: 35,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
    minWidth: "fit-content",
  },
  table: {
    wordWrap: "break-word",
    position: "relative",
    marginTop: 8,
    borderLeft: "1px solid rgba(63,63,68, 0.1)",
    borderRight: "1px solid rgba(63,63,68, 0.1)",
    borderBottom: "1px solid rgba(63,63,68, 0.1)",
    borderCollapse: "inherit",
    "& td, & th": {
      position: "relative",
      padding: "10px 6px",
      "&:first-child": {
        paddingLeft: 10,
      },
    },
    "& th": {
      fontSize: 13,
      lineHeight: 1,
    },
    "& .MuiTableCell-root": {
      border: "none",
    },
  },
  tableFluidField: {
    flexGrow: 1,
  },
  tableFieldSearch: {
    padding: 0,
    width: 36,
    height: 36,
    marginLeft: 2,
    border: "none",
    background: "#f1f1f1",
    fontSize: 0,
    cursor: "pointer",
    borderRadius: 4,
    "&:hover": {
      color: "red",
    },
  },
  tableFieldSearchIc: {
    fontSize: 16,
  },
  tableFieldLoadingIc: {
    fontSize: 16,
    color: "#8BC34A",
    animation: `$rotating 0.8s infinite`,
  },
  tableField: {
    "& *::placeholder": {
      color: "#afafaf",
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 !important",
    },
    "& input, & .MuiAutocomplete-inputRoot input, & .MuiOutlinedInput-multiline": {
      padding: "10px !important",
    },
    "& textarea": {
      padding: 0,
    },
  },
  tableAlignVertical: {
    minHeight: 36,
    display: "flex",
    alignItems: "center",
  },
  tableName: {
    minWidth: 100,
  },
  tableExternalId: {
    minWidth: 100,
  },
  tableNumber: {
    width: 50,
  },
  tdGroup: {
    verticalAlign: "bottom",
  },
  tdApproved: {
    paddingLeft: 24,
  },
  checked: {},
  rfqPrice: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: theme.palette.app.blue600,
  },
  tableRemove: {
    width: 45,
  },
  tablePrice: {
    minWidth: 150,
  },
  tableProduct: {
    minWidth: 180,
  },
  tableDescription: {
    minWidth: 200,
  },
  tableAttributes: {
    width: 300,
  },
  tableProductsList: {
    height: 30,
    backgroundColor: "#f1f9ff",
    "& > .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      paddingTop: 0,
      paddingBottom: 0,
      height: 30,
    },
  },
  tablePricesList: {
    height: 36,
    backgroundColor: "#f1f9ff",
    "& > .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      paddingTop: 0,
      paddingBottom: 0,
      height: 36,
    },
  },
  addLine: {
    margin: "0 15px 0 0",
    height: 40,
    background: "#eff6ef",
    "&:hover": {
      background: "#e6f8e7",
    },
  },
  addLineIc: {
    marginRight: 5,
    "&:last-child": {
      marginRight: 0,
    },
  },
  addLineCopy: {
    marginLeft: 5,
    padding: "0 5px",
    minWidth: 0,
    fontSize: 0,
    "&:hover": {
      background: "#e6f8e7",
    },
  },
  createBtn: {
    minWidth: 120,
    marginRight: 10,
  },
  priceInfo: {
    display: "flex",
    alignItems: "center",
    minHeight: 36,
    fontSize: 12,
    lineHeight: 1,
    color: "#969696",
  },
  groupRow: {
    "& td": {
      border: 0,
    },
  },
  evenHeaderRow: {
    background: "#C4D8E8",
    "& .evenSubgroup": {
      background: "#d4ebf6",
    },
    "& .oddSubgroup": {
      background: "#e3f0f6",
    },
  },
  oddHeaderRow: {
    background: "#FFE797",
    "& .evenSubgroup": {
      background: "rgb(255,245,216)",
    },
    "& .oddSubgroup": {
      background: "rgb(253,231,201)",
    },
  },
  bomListRowRed: {
    background: "rgba(255,0,0,0.1)",
    boxShadow: "inset 3px 0 0 0 red",
  },
  total: {
    whiteSpace: "nowrap",
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 15px",
    background: "#ECEFF1",
    borderRadius: 4,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "0px 0px",
    },
  },
  topBtn: {
    whiteSpace: "nowrap",
    marginLeft: 15,
    height: 35,
    fontWeight: "bold",
    fontSize: "13px",
  },
  deleteBomBtn: {
    backgroundColor: "transparent",
    color: theme.palette.app.red400,
  },
  yellowBtn: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.yellow100,
    "&:hover": {
      backgroundColor: lighten(theme.palette.app.yellow100, 0.2),
    },
    "&:active": {
      backgroundColor: lighten(theme.palette.app.yellow100, 0.2),
    },
    "&:focus": {
      backgroundColor: lighten(theme.palette.app.yellow100, 0.2),
    },
  },
  trTh: {
    height: 42,
    "& th": {
      color: theme.palette.white,
      fontWeight: 700,
    },
  },
  headerCheckbox: {
    color: `${theme.palette.app.grey100} !important`,
  },
  quantityTh: {
    textAlign: "center",
    // width: 80,
  },
  priceTh: {
    textAlign: "end",
    whiteSpace: "nowrap",
  },
  statusTh: {
    textAlign: "center",
  },
  numInStockTh: {
    width: "50%",
    textAlign: "center",
  },
  textAlignEnd: {
    textAlign: "end",
  },
  approved: {
    marginRight: 0,
    "& .MuiFormControlLabel-label": {
      fontSize: 12,
    },
  },
  productLink: {
    display: "inline-flex",
    alignItems: "flex-start",
    lineHeight: 1,
    fontSize: 13,
    "&:hover": {
      textDecoration: "underline",
    },
    "& > *:not(:last-child)": {
      marginRight: 5,
    },
    "& span": {
      display: "inline-flex",
      alignItems: "center",
      minHeight: 18,
    },
  },
  totalPrices: {
    whiteSpace: "nowrap",
  },
  stickyContainer: {
    "& > div": {
      backgroundColor: "white",
      zIndex: 100,
      "&.sticky": {
        marginTop: 80,
      },
    },
  },
  actionsContainer: {
    paddingTop: 10,
    marginBottom: 8,
    "@media (max-width:1280px)": {
      padding: 16,
    },
  },
  currencyButton: {
    backgroundColor: "#f4f4f4",
  },
  rightControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    margin: "-3px 0",
    "& > *": {
      padding: "3px 0",
    },
  },
  pageSizeSelect: {
    "& > div": {
      height: 25,
    },
    "& select": {
      padding: "0 15px",
    },
  },
  toggleGroup: {
    width: "100%",
    fontSize: 12,
  },
  groupIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
  },
  productCell: {
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: 10,
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
  productLinks: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 40,
  },
  openProductSelect: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 180,
    padding: "0 5px 0 10px",
    borderRadius: 4,
    background: "#f7f7f7",
    border: "1px solid #e2e2e2",
    cursor: "pointer",
    "& span": {
      display: "inline-flex",
      alignItems: "center",
      minHeight: 35,
      padding: "8px 0",
      textAlign: "left",
      overflow: "hidden",
    },
    "& svg": {
      marginTop: 7,
    },
  },
  openProductError: {
    borderColor: "red",
    background: "#fcebeb",
  },
  openDistributorSelect: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 240,
    padding: "0 5px 0 10px",
    borderRadius: 4,
    background: "#f7f7f7",
    border: "1px solid #e2e2e2",
    cursor: "pointer",
    "& > span": {
      display: "inline-flex",
      alignItems: "center",
      minHeight: 35,
      padding: "8px 0",
      textAlign: "left",
      position: "relative",
    },
    "& svg": {
      // marginTop: 7,
    },
    "& .counter": {
      fontSize: "0.7em",
      position: "absolute",
      right: "-4px",
      top: "5px",
    },
  },
  headerButtonsWrap: {
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
  },
  headerButton: {
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginLeft: 10,
    height: 37,
    transition: "all 0.2s",
    cursor: "pointer",
    borderRadius: 4,
    paddingLeft: 7,
    "& span": {
      height: 14,
    },
    "& svg": {
      fontSize: "2rem",
    },
  },
  deleteBom: {
    color: theme.palette.app.red400,
    "& svg": {
      color: theme.palette.app.red400,
    },
    "&:hover": {
      backgroundColor: theme.palette.app.red100,
    },
  },
  exportBom: {
    color: theme.palette.app.blue800,
    "& svg": {
      color: theme.palette.app.blue800,
      marginRight: 3,
    },
    "&:hover": {
      backgroundColor: theme.palette.app.blue100,
    },
  },
  needUpdateAlert: {
    backgroundColor: theme.palette.app.red200,
    padding: 5,
    textAlign: "center",
    border: `1px solid ${theme.palette.app.blue400}`,
  },
  needUpdateAlertLink: {
    color: "#4183c4",
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    transition: "all 100ms ease",
    "&:hover": {
      textDecorationColor: "#4183c4",
    },
  },
  lineAction: {
    whiteSpace: "nowrap",
    margin: "0px 2px",
  },
  confirmButton: {
    backgroundColor: `${theme.palette.app.red500}`,
    "&:hover": {
      backgroundColor: `${theme.palette.app.red400}`,
    },
  },
  confirmedButton: {
    backgroundColor: `${theme.palette.app.green700}`,
    "&:hover": {
      backgroundColor: `${theme.palette.app.green600}`,
    },
  },
  deleteButton: {
    background: theme.palette.app.red500,
    color: "#fff",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.app.red500,
    },
  },
  totalLabel: {
    display: "inline-block",
    padding: "0 10px",
    fontSize: 12,
    borderRadius: 10,
    background: "rgba(0,0,0,0.05)",
    whiteSpace: "nowrap",
    "& strong": {
      whiteSpace: "nowrap",
    },
  },
  groupHeaderLabel: {
    display: "block",
    alignItems: "flex-start",
    fontSize: 14,
    padding: "0 15px",
  },
  bomActionBtn: {
    height: 35,
    marginLeft: 15,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  selectedForDelete: {
    opacity: 0.5,
    filter: "grayscale(1)",
  },
  chartBtn: {
    marginLeft: 10,
    height: 36,
    width: 36,
    minWidth: 36,
    padding: 0,
  },
  savingLabel: {
    display: "flex",
    alignItems: "center",
    background: "#00bc99",
    color: "#fff",
    height: 26,
    padding: "0 10px",
    marginRight: 13,
    fontSize: 12,
    borderRadius: 17,
    whiteSpace: "nowrap",
  },
  updateCircle: {
    position: "absolute",
    marginLeft: 5,
    fontSize: "1em",
  },
  sticky: {
    zIndex: 5,
    backgroundColor: "#f3f3f3",
    "& > div": { backgroundColor: "#black", marginTop: 10, marginLeft: 15, marginRight: 15 },
    "& > table": { visibility: "visible !important" },
  },
  editItem: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    fontSize: 16,
    borderRadius: "50%",
    color: `${theme.palette.primary.main}`,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: "rgba(14,105,203,0.26)",
      color: "#0e69cb",
      borderColor: "#0e69cb",
    },
  },
  minQtyText: {
    color: red[500],
    fontSize: "calc(14px - 30%)",
    lineHeight: 1.2,
  },
  updatedText: {
    fontSize: "calc(14px - 30%)",
  },
  controlFiltersWrapper: {},
  controlFiltersLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  pagination: {
    padding: 12,
    display: "flex",
    justifyContent: "center",
  },
}));

export default "styles";
