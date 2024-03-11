import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    boxShadow:
      "0px 2px 4px -1px rgba(70, 70, 80, 0.2), 0px 4px 5px 0px rgba(70, 70, 80, 0.14), 0px 1px 6px 0px rgba(70, 70, 80, 0.12)",
  },
  toolbar: {
    justifyContent: "space-between",
    padding: 0,
  },
  langBlock: {
    fontSize: "10px",
    margin: "0px 0 0 7px",
    padding: "0 0 0 18px",
    color: "#ccc",
    lineHeight: "18px",
    textTransform: "uppercase",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 0",
    },
  },
  logoImg: {
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
  },
  logoMobileImg: {
    height: "30px",
  },
  mobileTopBar: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10px",
    [theme.breakpoints.down("sm")]: { margin: "0 0" },
  },
}));

export default "styles";
