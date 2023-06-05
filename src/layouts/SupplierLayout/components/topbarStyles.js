import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: "radial-gradient(circle at top left, #372859 35%, #1d1530 65%)",
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
  maintenance: {
    padding: "1em 4em",
    textAlign: "center",
    background: theme.palette.app.red400,
    color: theme.palette.white,
  },
  maintenanceTitle: {
    display: "inline-flex",
    alignItems: "center",
    margin: 0,
  },
  maintenanceIcon: {
    marginRight: "10px",
  },
  mobileTopBar: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10px",
    [theme.breakpoints.down("sm")]: { margin: "0 0" },
  },
}));

export default "styles";
