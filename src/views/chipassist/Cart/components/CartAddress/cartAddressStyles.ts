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
    display: "grid",
    gridGap: 20,
    gridTemplateColumns: "66% 1fr",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  flexItem: {
    // width: "66%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
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
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
}));

export default "styles";
