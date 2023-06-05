import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
    minWidth: 120,
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
    marginLeft: 5,
    width: 28,
    height: 28,
    fontSize: 16,
    borderRadius: "50%",
    color: theme.palette.primary.main,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: "rgba(14,105,203,0.26)",
      color: "#0e69cb",
      borderColor: "#0e69cb",
    },
  },
}));

export default "styles";
