import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  imgContainer: {
    margin: "20px 20px 0 20px",
  },
  img: {
    width: "100%",
    borderRadius: 4,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  screenshotButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 40,
  },
  button: {
    minWidth: 120,
    margin: "0 20px",
  },
}));

export default "styled";
