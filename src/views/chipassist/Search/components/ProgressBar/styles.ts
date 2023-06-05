import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    progress: {
      marginRight: "7px",
    },
    main: {
      width: "320px",
      display: "flex",
      alignItems: "center",
    },
    span: {
      fontSize: "12px",
      whiteSpace: "nowrap",
      color: theme.palette.grey[700],
    },
  }),
);

export default "styles";
