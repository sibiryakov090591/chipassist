import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  checkoutFormLabel: {
    minHeight: 53,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
    "& sup": {
      color: "red",
      fontSize: "1.3em",
      marginTop: 12,
    },
  },
  selectCountryInput: {
    "& .MuiInputBase-root": {
      lineHeight: "inherit",
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  flexItem: {
    width: 650,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  gridItem: {
    paddingBottom: 12,
  },
  gridItemRightColumn: {
    paddingLeft: 24,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  buttons: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  continueButton: {
    minWidth: 115,
  },
}));

export default "styles";
