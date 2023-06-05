import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  fileView: {
    padding: 20,
    marginTop: 15,
    border: "1px solid #efefef",
    boxShadow: "0 0 30px 0 rgba(0,0,0,0.03)",
    borderRadius: 5,
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 20,
    maxWidth: 800,
    margin: "10px 0 15px",
  },
  startingRowInfo: {
    display: "flex",
    alignItems: "flex-start",
    margin: "15px 0 20px",
    fontSize: 13,
    "& i": {
      display: "inline-flex",
      justifyContent: "center",
      height: 20,
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
    color: "initial",
    letterSpacing: "unset",
    lineHeight: 1.4,
    fontSize: "0.6em",
    textTransform: "lowercase",
  },
}));

export default "styles";
