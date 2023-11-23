import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  row: {
    [theme.breakpoints.down("md")]: {
      "& > *": {
        padding: 6,
      },
    },
  },
  odd: {
    "& > *": {
      backgroundColor: "#f5f5f5",
    },
  },
  open: {
    "& > *": {
      background: "#fffbe6",
    },
  },
  pointer: {
    cursor: "pointer",
  },
  firstChild: {
    "& > *": {
      background: "#faf7b6",
    },
  },
  lastChild: {
    borderBottom: "12px solid #eee",
  },
  tdArrow: {
    padding: 0,
  },
  arrow: {
    transition: "all 200ms ease",
    "&.active": {
      transform: "rotate(180deg)",
    },
  },
  repliedData: {
    "& span": {
      fontSize: "0.94rem",
      color: "#345",
    },
  },
  strong: {
    fontWeight: "bold",
  },
  position: {
    // color: "#00c430",
  },
  lowPrice: {
    color: "#00c430",
  },
  biggerPrice: {
    color: "#fa4f4f",
  },
  geoPin: {
    paddingTop: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      fontSize: 12,
    },
    "& *": {
      padding: 1,
      fontSize: 11,
      lineHeight: "11px",
      fontWeight: "normal",
    },
  },
  countryName: {
    marginLeft: 2,
  },
}));

export default "styles";
