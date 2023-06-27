import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    padding: "2em 0",
    backgroundColor: theme.palette.white,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  sendButtonContainer: {
    display: "inline-block",
    alignSelf: "center",
    position: "sticky",
    bottom: 40,
    zIndex: 10,
    borderRadius: 4,
    backgroundColor: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      bottom: 20,
    },
  },
  sendButton: {
    minWidth: 185,
  },
  title: {
    textAlign: "center",
    color: "#345",
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
      fontSize: 24,
    },
  },
  progressCircle: {
    marginRight: 10,
    color: "white",
  },
  empty: {
    textAlign: "center",
    margin: 50,
    fontSize: 20,
  },
  emptyList: {
    textAlign: "center",
    padding: "16px 0",
    color: "#a5a5a5",
  },
  regLink: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "#4183c4",
    "&:hover": {
      textDecoration: "underline",
      color: "#4183c4",
    },
  },
  signIn: {
    fontWeight: "bold",
    fontSize: 13,
    minWidth: 125,
    [theme.breakpoints.down("xs")]: {
      marginTop: "12px",
    },
  },
  alert: {
    margin: "12px 0 0 0",
    "& svg": {
      alignSelf: "center",
    },
    "& .MuiAlert-message": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    [theme.breakpoints.down("sm")]: {
      margin: "12px 0",
    },
  },
  alertTitle: {
    paddingTop: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  partnerSelect: {
    margin: "0 6px",
    "& .MuiSelect-select": {
      fontWeight: "bold",
    },
    [theme.breakpoints.down(420)]: {
      margin: "6px",
    },
  },
  manufacturerSelect: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 250ms ease",
    "& > svg": {
      fontSize: 20,
      padding: 0,
    },
    [theme.breakpoints.up("md")]: {
      "&:hover": {
        backgroundColor: "#f6f6f6",
      },
    },
  },
  arrow: {
    transition: "all 250ms ease",
  },
  activeArrow: {
    transform: "rotate(180deg)",
  },
  arrowButton: {
    cursor: "pointer",
    transition: "all 200ms ease",
    color: "#8a8a8a !important",
    marginLeft: 12,
    "&:hover": {
      color: "#5b5b5b !important",
    },
  },
  disabledArrow: {
    pointerEvents: "none",
    color: "#eee !important",
  },
  manufacturerName: {
    width: "100%",
  },
  otherManufacturerInput: {
    margin: "8px 8px 0 8px",
  },
  supplier: {
    fontWeight: 400,
    color: "#434343",
    marginBottom: 12,
    "&.flexible": {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down(420)]: {
        flexDirection: "column",
      },
    },
  },
  dateFilter: {
    "& .MuiTabs-root": {
      minHeight: "auto",
    },
    "& button": {
      backgroundColor: "#e3f3ff",
      textTransform: "inherit",
      minHeight: 40,
      minWidth: "auto",
    },
  },
  filtersRow: {
    padding: "0 10px 0 0",
  },
  created: {
    display: "flex",
    justifyContent: "flex-end",
    "& > span": {
      background: theme.palette.app.green800,
      padding: "7px 13px",
      borderRadius: "50ch",
      color: "#ffffff",
      fontWeight: "bold",
      marginBottom: 4,
      lineHeight: "11px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
      },
    },
  },
  group: {
    marginBottom: 24,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    "& *": {
      textAlign: "center",
      padding: "3px 5px",
    },
    "& td": {
      border: "1px solid #ddd",
    },
    "& th": {
      border: "1px solid #ddd",
    },
  },
  thIndex: {
    width: 36,
  },
  thPartNumber: {
    width: 200,
  },
  thQty: {
    width: 80,
  },
  thYourMpn: {
    width: "18%",
  },
  thManufacturer: {
    width: "15%",
  },
  fileActions: {
    display: "flex",
    "& > *": {
      marginLeft: 7,
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      padding: "10px",
    },
  },
  errorAlert: {
    "& .MuiAlert-message": {
      width: "100%",
    },
  },
  fileButton: {
    textTransform: "none",
    fontWeight: "bold",
    minWidth: 105,
    height: "100%",
    minHeight: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #a4bdd0",
    color: "#3f7cac",
    "& img": {
      height: 45,
      margin: 10,
    },
    "& > *": {
      flexDirection: "column",
    },
    "&.Mui-disabled": {
      "& img": {
        filter: "grayscale(1) opacity(0.5)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      border: "none",
      color: "white",
      fontSize: 13,
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      width: "100%",
      margin: 0,
      "&:first-child": {
        margin: "0 0 12px 0",
      },
    },
  },
  notValidMessage: {
    position: "absolute",
    bottom: "-21px",
    left: 0,
    right: 0,
    textAlign: "center",
    backgroundColor: "transparent",
    color: red[300],
    fontSize: 11,
  },
  tooltip: {
    fontSize: "13px",
  },
  helpIcon: {
    marginLeft: 6,
    marginBottom: "-1px",
    fontSize: 14,
    padding: 0,
    cursor: "help",
  },
  mobileImportButton: {
    border: "1px dashed #e1e1e1",
    width: 45,
    minWidth: "auto",
    color: "#345",
  },
  errorModalItem: {
    marginBottom: 2,
    "& span": {
      fontWeight: "bold",
      color: theme.palette.app.red400,
    },
  },
}));

export default "styles";
