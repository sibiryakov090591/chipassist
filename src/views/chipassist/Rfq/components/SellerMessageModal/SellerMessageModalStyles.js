import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: 13,
      width: "25ch",
    },
  },
  header: {
    textAlign: "center",
    paddingTop: 15,
    marginBottom: 10,
    color: "#345",
    "& > span": {
      color: "#0081a7",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      marginBottom: 15,
    },
  },
  text: {
    textAlign: "center",
    maxWidth: 400,
    margin: "0 auto",
    marginBottom: 12,
    color: "#345",
  },
  signIn: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
}));

export default "styles";
