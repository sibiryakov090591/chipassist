import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core/styles";
import { scrollbarWidth } from "@src/config";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "1px solid transparent",
    height: "85px",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    top: 0,
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      height: 130,
      paddingRight: 0,
    },
  },
  logoContainer: {
    minWidth: "220px",
    width: "220px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "160px",
      width: "160px",
    },
  },
  logo: {
    marginTop: 3,
    width: "100%",
    display: "block",
  },
  mobileTopBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchSuggestionContainer: {
    position: "relative",
    width: "100%",
    paddingLeft: 12,
    paddingRight: 24,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 12,
      paddingTop: 12,
    },
  },
  trySearchPn: {
    position: "absolute",
    bottom: "-18px",
    left: 12,
  },
  searchInput: {
    width: "100%",
    border: "none",
    padding: "6px 43px 6px 9px",
    height: "41px",
    borderRadius: "5px 0 0 5px",
    outline: "none",
    color: "#555555",
    fontSize: "1rem",
  },
  searchIconButton: {
    height: "41px",
    background: theme.palette.app.green800,
    border: `1px solid ${theme.palette.app.green800}`,
  },
}));

export default "styles";
