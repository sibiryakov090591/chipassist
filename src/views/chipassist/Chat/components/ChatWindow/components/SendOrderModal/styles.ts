import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      maxWidth: 800,
      textAlign: "start",
    },
    label: {
      fontSize: 11,
    },
    value: {
      fontWeight: "bold",
    },
  }),
);

export default "styles";
