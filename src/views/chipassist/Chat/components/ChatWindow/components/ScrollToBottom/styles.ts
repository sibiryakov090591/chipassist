import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      right: 12,
      top: "-35px",
      fontSize: 36,
      color: "#ffffff",
      background: "#171717",
      borderRadius: "50ch",
      cursor: "pointer",
      transition: "background 150ms ease, top 250ms ease, opacity 250ms ease",
      pointerEvents: "none",
      opacity: 0,
      "&:hover": {
        background: "#323232",
      },
      "&.active": {
        pointerEvents: "auto",
        opacity: 1,
        top: "-46px",
      },
    },
  }),
);

export default "styles";
