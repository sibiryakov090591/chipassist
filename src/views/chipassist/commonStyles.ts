import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  pageTitle: {
    fontSize: "24px",
    fontWeight: 400,
    letterSpacing: "1px",
  },
  filtersRow: {
    backgroundColor: "white",
    zIndex: 10,
    display: "flex",
    padding: "3px 10px",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e7e8ec",
  },
  filtersRowMargin: {
    margin: "12px 0 8px",
  },
  emptyContentMessage: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 8px",
    "& > h5": {
      marginTop: 0,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&.fullScreen .MuiBackdrop-root": {
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "transparent",
      },
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 2),
    textAlign: "center",
    color: "rgba(0,0,0,0.7)",
    maxHeight: "90vh",
    maxWidth: "95vw",
    overflow: "auto",
    position: "relative",
    "&.fullScreen": {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        borderRadius: 0,
        height: "100%",
        width: "100%",
        maxHeight: "100vh",
        maxWidth: "100vw",
      },
    },
  },
  tooltip: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "inherit",
    border: "1px solid #eee",
    maxWidth: "none",
    padding: "6px 10px",
    boxShadow: theme.shadows[6],
  },
  errorIcon: {
    color: red[500],
    fontSize: "1.2rem",
  },
  progressCircle: {
    marginRight: 10,
    color: theme.palette.white,
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-end",
    gridGap: 16,
  },
  closeButton: {
    position: "absolute",
    right: 27,
    top: 19,
    borderRadius: "50ch",
    fontWeight: "bold",
    padding: "0 5px 0 10px",
    textTransform: "initial",
  },
  displayContents: {
    display: "contents",
  },
}));

export default "styles";
