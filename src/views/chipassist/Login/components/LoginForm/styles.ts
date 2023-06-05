import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    fields: {
      margin: theme.spacing(-1),
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        flexGrow: 1,
        margin: theme.spacing(1),
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
  }),
);

export default "styles";
