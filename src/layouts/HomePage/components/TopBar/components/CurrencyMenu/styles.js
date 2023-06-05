import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  menuList: {
    "& a": {
      color: "inherit",
    },
  },
  menuItemExchange: {
    textTransform: "lowercase",
    fontSize: "0.75em",
  },
  langIcon: {
    width: "17px",
    height: "17px",
    color: "#f0f0f0",
    marginTop: "2px",
  },
  error: {
    backgroundColor: `${theme.palette.app.red300} !important`,
  },
}));

export default "styles";
