import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    paddingBottom: 0,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
  },
  avatar: {
    cursor: "pointer",
    height: 112,
    width: 112,
    [theme.breakpoints.down("xs")]: {
      height: 55,
      width: 55,
    },
  },
  name: {
    fontSize: "2.0em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
  editButton: {
    width: "127px",
    fontSize: "1em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "1.5em",
    marginTop: "1em",
    fontWeight: 600,
  },
  info: {
    paddingLeft: "1em",
    fontSize: "1em",
  },
  actions: {
    justifyContent: "center",
  },
  cardHeader: {
    backgroundColor: theme.palette.app.blue800,
    "& .MuiCardHeader-title": {
      color: "white",
      fontWeight: "bold",
    },
  },
  divideLine: {
    marginTop: "1.3em",
    borderTop: `1px solid ${theme.palette.app.grey200}`,
  },
}));

export default useStyles;
