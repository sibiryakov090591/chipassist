import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
  },
  mobile: {
    flexDirection: "column",
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  link: {
    cursor: "pointer",
    fontSize: "16px",
    textTransform: "uppercase",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid transparent",
    borderBottom: "1px solid transparent",
    [theme.breakpoints.up("md")]: {
      "&:hover": {
        color: "#fff",
        borderBottom: "1px solid #ffffff",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  verticalLine: {
    padding: "0 5px",
    color: "#fff",
  },
}));

export default "styles";
