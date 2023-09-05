import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  form: {
    margin: "30px auto 0 auto",
    maxWidth: 450,
    width: "100%",
  },
  fields: {
    "& > *": {
      display: "block",
      marginTop: 15,
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  phone: {
    margin: 13,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down(460)]: {
      height: "37.63px",
      margin: "8px 0",
    },
  },
}));

export default "styled";
