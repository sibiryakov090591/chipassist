import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    textAlign: "center",
  },
  popper: {
    zIndex: 1000,
  },
  popover: {
    zIndex: 2,
    padding: 10,
    border: `1px solid ${theme.palette.app.grey200}`,
    borderRadius: 4,
    background: "white",
  },
  removeItem: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    fontSize: 16,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  removeIcon: {
    fontSize: 30,
    color: "white",
    transition: "all 0.2s ease",
    "&:hover": {
      color: theme.palette.app.red200,
    },
  },
  menuBtn: {
    minWidth: 120,
    margin: 0,
    color: "#fff",
    background: theme.palette.darkblue,
    "&:hover": {
      background: "#0e69cb",
      borderColor: "#0e69cb",
    },
    marginTop: 10,
    "&:not(:first-child)": {
      marginTop: 10,
    },
  },
  btn: {
    "&:not(:first-child)": {
      marginLeft: 5,
    },
  },
}));

export default "styles";
