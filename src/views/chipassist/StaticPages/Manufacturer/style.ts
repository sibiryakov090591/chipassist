import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: "3em",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  name: {
    fontSize: "3rem",
    paddingTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  imgContainer: {
    width: "250px",
    height: "250px",
    // border: "1px solid #015ED0",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: "4px",
    justifyContent: "center",
    marginLeft: "12.5%",
  },
  description: {
    width: "40%",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  infoContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  descrContainer: {
    display: "flex",
    width: "100%",
    alignItems: "start",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
}));

export default useStyles;
