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
    display: "block",
    fontSize: 24,
    cursor: "pointer",
    transition: "all 0.2s",
    margin: "auto",
    color: theme.palette.app.red400,
    "&:hover": {
      color: theme.palette.app.red500,
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
