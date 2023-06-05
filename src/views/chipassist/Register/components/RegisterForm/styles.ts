import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: AppTheme & Theme) =>
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
    policy: {
      display: "flex",
      alignItems: "center",
    },
    policyCheckbox: {
      marginLeft: "-14px",
    },
    submitButton: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
    progressCircle: {
      marginRight: 10,
      color: theme.palette.white,
    },
  }),
);

export default "styles";
