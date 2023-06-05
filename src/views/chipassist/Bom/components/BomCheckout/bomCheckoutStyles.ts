import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  main: {
    height: "100%",
    width: "100%",
    padding: "2em 0",
  },
  progressCircle: {
    marginRight: 10,
    color: "white",
  },
  total: {
    whiteSpace: "nowrap",
    minHeight: 35,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "6px 15px",
    background: "#ECEFF1",
    borderRadius: 4,
  },
}));

export default "styles";
