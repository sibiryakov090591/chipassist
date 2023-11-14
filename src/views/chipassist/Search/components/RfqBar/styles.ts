import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      marginTop: 15,
      marginBottom: 15,
      padding: "16px 21px 21px",
      backgroundColor: theme.palette.app.green800,
    },
    title: {
      color: "#ffffff",
      fontWeight: "bold",
      marginBottom: 2,
    },
    form: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 200px",
      gridGap: "12px",
    },
    button: {
      width: "100%",
      whiteSpace: "nowrap",
    },
  }),
);

export default "styles";
