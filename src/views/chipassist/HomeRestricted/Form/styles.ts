import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
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
  progressCircle: {
    marginRight: 10,
    color: "white",
  },
  checkbox: {
    textAlign: "start",
    "@media screen and (max-width: 650px)": {
      marginBottom: 10,
    },
  },
  gridItem: {
    "&:not(:last-child)": {
      paddingBottom: 12,
    },
  },
  gridItemRightColumn: {
    paddingLeft: 24,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
}));

export default "styled";
