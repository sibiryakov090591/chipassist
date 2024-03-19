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
    loadingTextAnimation: {
      display: "inline-block",
      fontSize: "30px",
      clipPath: "inset(0 1ch 0 0)",
      animation: `$l 1s steps(4) infinite`,
    },
    "@keyframes l": {
      to: {
        clipPath: "inset(0 -1ch 0 0)",
      },
    },
  }),
);

export default "styles";
