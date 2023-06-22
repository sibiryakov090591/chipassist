import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {},
    visibilityIcon: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: 8,
      cursor: "pointer",
    },
    input: {
      "& input": {
        paddingRight: 40,
      },
    },
    fields: {
      margin: theme.spacing(-1),
      "& > *": {
        flexGrow: 1,
        margin: theme.spacing(1),
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    submitButton: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    progressCircle: {
      marginRight: 10,
      color: "white",
    },
    textField: {
      position: "relative",
    },
    helper: {
      whiteSpace: "nowrap",
      backgroundColor: theme.palette.error.light,
      padding: "7px 10px",
      borderRadius: 4,
      height: 36,
      minWidth: 80,
      color: theme.palette.app.grey100,
      position: "absolute",
      left: "102%",
      bottom: "50%",
      transform: "translateY(35%)",
      opacity: 0,
      pointerEvents: "none",
      transition: "all 300ms ease",
      "&:before": {
        content: "''",
        display: "block",
        position: "absolute",
        bottom: "50%",
        left: 0,
        width: 10,
        height: 10,
        backgroundColor: theme.palette.error.light,
        transform: "rotate(45deg) translateY(50%)",
      },
      [theme.breakpoints.down("md")]: {
        left: -7,
        top: "80%",
        "&:before": {
          top: -7,
          left: 25,
        },
      },
    },
    helperActive: {
      opacity: 1,
      transform: "translateY(50%)",
      zIndex: 100,
    },
    complexity: {
      height: 2,
      flexGrow: 1,
      backgroundColor: "#eee",
    },
    bad: {
      backgroundColor: "#ff4100",
    },
    fair: {
      backgroundColor: "#ffcc1e",
    },
    good: {
      backgroundColor: "#43b820",
    },
  }),
);

export default "styles";
