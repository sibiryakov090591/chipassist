import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  menuList: {
    "& a": {
      color: "inherit",
    },
  },
  langBlock: {
    height: 40,
    fontSize: "10px",
    margin: "0px 0 0 7px",
    padding: "0 0 0 18px",
    color: "#ccc",
    textTransform: "uppercase",
  },
  langIcon: {
    width: "17px",
    height: "17px",
    color: "#f0f0f0",
    marginTop: "2px",
  },
  langFlag: {
    width: 25,
  },
}));

export default "styles";
