import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      marginTop: 5,
      marginBottom: 15,
      padding: "16px 21px 21px",
      backgroundColor: theme.palette.app.green800,
      // animation: `$rfq-bar-show-up 1s`,
    },
    // "@keyframes rfq-bar-show-up": {
    //   "0%": {
    //     filter: "drop-shadow(0px 0px -10px #ffed17)",
    //   },
    //   "20%": {
    //     filter: "drop-shadow(0px 0px 0px #ffed17)",
    //   },
    //   "70%": {
    //     filter: "drop-shadow(0px 0px 25px #ffed17)",
    //   },
    //   "100%": {
    //     filter: "drop-shadow(0px 0px 0px #ffed17)",
    //   },
    // },
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
      height: 37,
      whiteSpace: "nowrap",
    },
    input: {
      "& p.Mui-error": {
        color: "#ffffff",
      },
    },
  }),
);

export default "styles";
