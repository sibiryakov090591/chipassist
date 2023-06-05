import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  wrapper: {
    padding: 20,
  },
  boxMargin: {
    margin: "32px",
    [theme.breakpoints.down("sm")]: {
      margin: "12px",
    },
  },
  table: {
    wordWrap: "break-word",
    border: `1px solid ${theme.palette.app.grey200}`,
    "& > tbody > tr:nth-child(odd)": {
      backgroundColor: "#fafafa",
    },
    "& > tbody > tr > td:first-child": {
      borderRight: `1px solid ${theme.palette.app.grey200}`,
    },
  },
  productTable: {
    borderLeft: `1px solid ${theme.palette.app.grey200}`,
    borderRight: `1px solid ${theme.palette.app.grey200}`,
    borderBottom: `1px solid ${theme.palette.app.grey200}`,
    [theme.breakpoints.down("xs")]: {
      borderTop: `1px solid ${theme.palette.app.grey200}`,
    },
  },
  th: {
    fontWeight: 600,
  },
  taxesWrapper: {
    display: "flex",
    rowGap: "7px",
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: 280,
    color: theme.palette.app.grey500,
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: 36,
    },
  },
  taxesTitle: {
    marginRight: 10,
    fontStyle: "italic",
  },
  taxesValue: {
    fontWeight: 600,
    textDecoration: "underline",
  },
  tableHeader: {
    backgroundColor: theme.palette.app.blue800,
    color: "#ffffff",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  tableAreas: {
    display: "grid",
    gridTemplateColumns: "55px 1fr 1fr 1fr 1fr 1fr",
    gridTemplateAreas: `"number partnumber qty price total approved"`,
    listStyleType: "none",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: `
      "number qty"
      "price total"
      "partnumber approved"
      `,
      padding: "10px",
    },
    "& + &": {
      borderTop: `1px solid ${theme.palette.app.grey200}`,
    },
    "& > li": {
      padding: "16px",
      overflowX: "clip",
      textOverflow: "ellipsis",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        alignItems: "center",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "8px",
      },
      "& > span:first-of-type": {
        display: "none",
        color: theme.palette.app.blue800,
        fontSize: 14,
        fontWeight: 700,
        [theme.breakpoints.down("xs")]: {
          display: "block",
        },
      },
      "&:empty": {
        display: "none",
      },
    },
  },
  columnNumber: {
    gridArea: "number",
  },
  columnPartnumber: {
    gridArea: "partnumber",
  },
  columnManufacturer: {
    gridArea: "manufacturer",
  },
  columnQty: {
    gridArea: "qty",
  },
  columnPrice: {
    gridArea: "price",
  },
  columnTotal: {
    gridArea: "total",
  },
  columnApprove: {
    gridArea: "approved",
  },
  columnTextRight: {
    justifySelf: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifySelf: "initial",
    },
  },
  columnTextCenter: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "start",
    },
  },
  checkbox: {
    [theme.breakpoints.up("sm")]: {
      margin: "-9px 0",
    },
    color: `${theme.palette.app.green800} !important`,
    "&:hover": {
      color: `${theme.palette.app.green800} !important`,
    },
    "&.Mui-checked": {
      color: `${theme.palette.app.green800} !important`,
    },
    "&.Mui-disabled": {
      color: `${theme.palette.app.grey300} !important`,
    },
  },
  tableTitle: {
    color: theme.palette.app.grey400,
    fontSize: "1.1rem",
    marginBottom: 7,
  },
  actionRow: {
    marginTop: 24,
    "& > *": {
      marginLeft: 16,
    },
  },
  button: {
    position: "relative",
    paddingRight: 40,
    "& svg": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: 10,
    },
  },
  totalContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  filtersRow: {
    backgroundColor: "#fbfbfb",
  },
  orderNumber: {
    fontSize: "1.3rem",
    "& > span": {
      fontWeight: "bold",
    },
  },
  orderStatus: {
    marginLeft: 24,
    fontSize: "1.3rem",
    "& > span": {
      fontWeight: "bold",
    },
  },
  acceptedStatus: {
    color: "#1abf29",
  },
  declinedStatus: {
    color: "#f34f4f",
  },
  footerLogo: {
    display: "block",
    margin: "12px 0",
  },
  total: {
    fontSize: 18,
    borderTop: "1px solid #c0c0c0",
    marginTop: 5,
    paddingTop: 8,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerCheckbox: {
    color: `${theme.palette.app.grey100} !important`,
    margin: "-9px 0",
  },
}));

export default "styles";
