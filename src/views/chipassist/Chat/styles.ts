import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    section: {
      padding: "2em 0",
    },
    container: {
      display: "flex",
      maxHeight: "80vh",
      minHeight: 500,
      border: "1px solid #D4D4D4",
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
    },
  }),
);

export default "styles";
