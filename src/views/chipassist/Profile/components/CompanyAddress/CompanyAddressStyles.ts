import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  table: {
    wordWrap: "break-word",
    position: "relative",
    "&.is-loading": {
      // opacity: 0.3,
    },
    "& td:first-child, & th:first-child": {
      paddingLeft: 24,
    },
    "& #simple-popover": {
      transform: "translate3d(0, 28px, 0px) !important",
      left: "unset !important",
      right: "0 !important",
    },
  },
  gridContainer: {
    width: "66%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  gridItem: {
    "&:not(:last-child)": {
      paddingBottom: 12,
    },
  },
  gridItemRightColumn: {
    paddingLeft: 24,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  tableSort: {
    "& svg": {
      width: "0.7em",
      height: "0.7em",
      color: `${theme.palette.primary.light} !important`,
      opacity: 0.3,
    },
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
  addressTitle: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
    },
  },
  tableContentWhiteSpace: {
    position: "relative",
    height: 250,
    "& h2": {
      textAlign: "center",
    },
    "& td": {
      padding: "0 100px",
    },
  },
  buttonAction: {
    marginLeft: 10,
  },
  selectCountryInput: {
    "& .MuiInputBase-root": {
      lineHeight: "inherit",
    },
  },
}));

export default "styled";
