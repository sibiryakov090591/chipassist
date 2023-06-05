import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { lighten, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  tdIndex: {
    width: 40,
  },
  oddRow: {
    background: theme.palette.app.grey100,
  },
  tdCheckButton: {
    width: 150,
    paddingLeft: "50px !important",
    textAlign: "center",
  },
  textAlignEnd: {
    textAlign: "end",
  },
  rowButton: {
    minWidth: 125,
  },
  statusConfirmed: {
    color: theme.palette.app.green700,
  },
  statusRequested: {
    color: theme.palette.app.blue400,
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
  unitsCount: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontSize: "0.8rem",
    color: theme.palette.app.blue600,
    textDecoration: "underline",
    textDecorationColor: "transparent",
    transition: "all 100ms ease",
    "&:hover": {
      textDecorationColor: theme.palette.app.blue600,
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
  refRow: {
    paddingBottom: "0 !important",
  },
  quantityTd: {
    textAlign: "center",
  },
  tableQuantityRef: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  tableQuantity: {
    minWidth: 50,
    width: 80,
    "& input": {
      textAlign: "center",
      padding: "5px",
    },
  },
  partNumberInput: {
    width: 220,
    "& input": {
      textAlign: "center",
      padding: "5px",
    },
  },
  errorWrapper: {
    display: "flex",
    position: "absolute",
    zIndex: 10,
    bottom: "50%",
    transform: "translateY(50%)",
    right: "105%",
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
  notFoundProduct: {
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    textAlign: "center",
    border: `1px solid ${theme.palette.app.blue300}`,
    borderRadius: 4,
    padding: "2px 20px",
    backgroundColor: "#e5f2f6",
    color: "rgb(0 129 167 / 80%)",
    fontWeight: "bold",
  },
  notFoundProductApproved: {
    backgroundColor: "#f6d78b",
  },
  tdGroup: {
    // verticalAlign: "bottom",
  },
  requestLine: {
    textAlign: "center",
    color: "#3f7cac",
    fontWeight: "bold",
  },
  requestedLine: {
    textAlign: "center",
    color: "#ffd275",
    fontWeight: "bold",
  },
  betterPriceHint: {
    padding: "0 !important",
    backgroundColor: "#ffd275",
    textAlign: "center",
    color: "#3f7cac",
    fontWeight: "bold",
  },
  strongSpan: {
    fontWeight: "bold",
    color: theme.palette.app.blue800,
  },
  info: {
    fontSize: "13px",
  },
  statusIcon: {
    cursor: "help",
    display: "inline-block",
    marginTop: 5,
    height: 20,
    width: 20,
    borderRadius: "50%",
    border: "2px solid #d0d0d0",
  },
  available: {
    backgroundColor: theme.palette.app.green800,
  },
  rfq: {
    backgroundColor: theme.palette.app.blue800,
  },
  empty: {
    backgroundColor: theme.palette.app.yellow100,
  },
  checkbox: {
    color: `${theme.palette.app.green800} !important`,
    "&.Mui-disabled": {
      color: `rgba(0, 0, 0, 0.26) !important`,
    },
  },
}));

export default "styles";
