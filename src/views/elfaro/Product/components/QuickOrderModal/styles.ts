import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiButton-root + div": {
      width: "100%",
      minWidth: "100%",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "auto",
    maxHeight: "100%",
  },
  header: {
    textAlign: "center",
    paddingTop: 15,
  },
  form: {
    maxWidth: 500,
    margin: "25px auto 0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      margin: "8px 0 8px 16px",
    },
  },
  total: {
    textAlign: "right",
  },
}));

export default "styles";
