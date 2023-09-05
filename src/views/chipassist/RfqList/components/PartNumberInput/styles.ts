import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  rfqInput: {
    marginRight: "2rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: `${theme.palette.app.grey100}!important`,
    },
  },
  autoSuggestField: {
    position: "relative",
    width: "25em",
    marginRight: "2em",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginRight: 0,
    },
    "& .list": {
      position: "absolute",
      zIndex: 10,
      left: 0,
      top: "100%",
      marginTop: 2,
      minWidth: "100%",
      background: "#0c3a65",
      color: "#fff",
      overflow: "hidden",
      borderRadius: 4,
      boxShadow: "0 0 50px 0 rgba(0,0,0,0.1)",
    },
    "& .list-item": {
      padding: "5px 10px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    "& .list-item-highlight": {
      background: "#1D90FF",
    },
  },
  helpIcon: {
    marginLeft: "5px",
    fontSize: 14,
  },
  error: {
    color: theme.palette.app.red500,
  },
}));

export default useStyles;
