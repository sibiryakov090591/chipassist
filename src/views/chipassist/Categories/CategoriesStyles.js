import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    padding: "2em",
    [theme.breakpoints.down("md")]: { padding: "1em" },
  },
  styledContainer: {
    display: "grid",
    gridGap: 20,
    gridTemplateColumns: "320px 1fr 320px",
    gridTemplateAreas: "'fil cont cont'",
    [theme.breakpoints.down("md")]: {
      gridTemplateAreas: "'cont cont cont'",
      paddingLeft: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    position: "relative",
    "&.hideFilters": {
      paddingLeft: "2em",
      gridTemplateAreas: "'cont cont cont'",
    },
    "&.right.hideFilters": {
      paddingLeft: 0,
      paddingRight: "2em",
    },
    "&.removeFilters": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  rightPosition: {
    gridTemplateAreas: "'cont cont fil'",
  },
  hideFilters: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
  },
}));

export default useStyles;
