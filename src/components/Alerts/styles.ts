import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiSnackbar-root": {
        zIndex: 99999999999,
      },
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    main: {},
  }),
);

export default "styles";
