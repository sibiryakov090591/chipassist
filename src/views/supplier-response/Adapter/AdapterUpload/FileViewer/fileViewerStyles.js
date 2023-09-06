import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  fileView: {
    padding: 20,
    marginTop: 15,
    border: "1px solid #efefef",
    boxShadow: "0 0 30px 0 rgba(0,0,0,0.03)",
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      border: "none",
      padding: 0,
    },
  },
  title: {
    fontSize: 16,
    marginBottom: 18,
  },
  tableScroll: {
    maxHeight: 400,
    border: "1px solid #e2e3e3",
    overflow: "auto",
  },
  table: {
    position: "relative",
    borderCollapse: "collapse",
    fontSize: 12,
    whiteSpace: "nowrap",
    minWidth: "100%",
    tableLayout: "fixed",
    "& td": {
      maxWidth: "300px",
      padding: "2px 6px",
      border: "1px solid #e2e3e3",
      transition: "all 0.2s",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& td:first-child": {
      borderLeft: "none",
    },
    "& td:last-child": {
      borderRight: "none",
    },
    "& tr:first-child td": {
      borderTop: "none",
    },
    "& tr:last-child td": {
      borderBottom: "none",
    },
    "& tr:not(:first-child):hover td": {
      background: "#0277bd29",
      cursor: "pointer",
    },
  },
  header: {
    background: "#e6e6e6",
    color: "#bfbfbf",
  },
  startingRow: {
    "& td": {
      background: "#0277bd29",
    },
    "& td:first-child": {
      background: "#0277BD !important",
      color: "#fff",
    },
  },
  tableHeadCell: {
    position: "sticky",
    top: 0,
    boxShadow: "0 1px 0 0 #e2e3e3",
  },
  tableSystemCell: {
    background: "#f8f9fa",
    borderColor: "#c0c0c0",
    fontSize: 10,
    fontWeight: 800,
    textAlign: "center",
    "&:first-child": {
      padding: "2px 8px",
    },
  },
  highlight: {
    background: "#E1F5FE",
  },
  selectors: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1.7fr",
    gridGap: 8,
    maxWidth: 1000,
    margin: "10px 0 15px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  field: {
    padding: 10,
  },
  priceField: {
    backgroundColor: "#f4f5f7",
    borderRadius: 6,
    padding: 10,
    // width: "max-content",
  },
  priceButton: {
    whiteSpace: "nowrap",
    paddingRight: "8px !important",
    textTransform: "none",
  },
  priceArrow: {
    marginLeft: 6,
    "&.active": {
      transform: "rotate(180deg)",
    },
  },
  fileUploadIc: {
    marginRight: 5,
    fontSize: 16,
  },
  fileUploadError: {
    marginRight: 5,
    fontSize: 14,
  },
  fileRemove: {
    marginLeft: 12,
    fontSize: 26,
    color: theme.palette.app.red400,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      color: theme.palette.app.red500,
    },
  },
  startingRowInfo: {
    display: "flex",
    alignItems: "flex-start",
    margin: "15px 0 20px",
    fontSize: 13,
    "& i": {
      display: "inline-flex",
      justifyContent: "center",
      minWidth: 20,
      padding: "0 5px",
      background: "#0277BD",
      textAlign: "center",
      color: "#fff",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: 600,
      borderRadius: 3,
    },
  },
  columnInput: {
    backgroundColor: "white",
  },
  tab: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e2e3e3",
    borderBottom: "none",
    borderLeft: "none",
    "&.Mui-selected": {
      backgroundColor: "white",
    },
    "&:first-of-type": {
      borderLeft: "1px solid #e2e3e3",
    },
  },
  tabSelectedHint: {
    color: "#0dbb31",
    letterSpacing: "unset",
    lineHeight: 1.4,
    fontSize: "0.6em",
    fontWeight: "bold",
    textTransform: "lowercase",
  },
}));

export default "styles";
