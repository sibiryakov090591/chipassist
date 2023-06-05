import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {
    position: "relative",
  },
  popper: {
    zIndex: 1000,
  },
  title: {
    fontWeight: 600,
    textAlign: "center",
  },
  popover: {
    padding: 10,
    border: "1px solid #E0E0E0",
    borderRadius: 4,
    background: "white",
  },
  btn: {
    width: 120,
    marginTop: 10,
    "&:not(:first-child)": {
      marginTop: 10,
    },
  },
  menuItem: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    width: 28,
    height: 28,
    fontSize: 16,
    borderRadius: "50%",
    color: theme.palette.primary.main,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: "rgba(14,105,203,0.26)",
    },
  },
}));

export default "styles";
