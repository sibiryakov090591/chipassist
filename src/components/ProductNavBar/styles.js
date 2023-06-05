import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0px 10px",
    border: "1px solid #e7e8ec",
    marginTop: "12px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    padding: "3px 0",
    width: "100%",
  },
  showBy: {
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
    "& > *:not(:first-child)": {
      marginRight: 10,
    },
  },
  showButton: {
    fontSize: "12px",
    height: 30,
  },
  viewsFIcon: {
    fontSize: "14px",
    color: theme.palette.primary.main,
  },
  position: {
    zIndex: "99",
  },
  counterF: {
    marginRight: "7px",
    borderRight: `1px solid ${theme.palette.primary.main}`,
    paddingRight: "7px",
  },
  counterValue: {
    paddingRight: "7px",
    fontWeight: "700",
  },
}));

export default "styles";
