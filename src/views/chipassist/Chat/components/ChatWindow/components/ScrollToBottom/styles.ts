import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      right: 12,
      top: "-35px",
      pointerEvents: "none",
      opacity: 0,
      transition: "top 250ms ease, opacity 250ms ease",
      "&.active": {
        pointerEvents: "auto",
        opacity: 1,
        top: "-46px",
      },
    },
    icon: {
      fontSize: 36,
      color: "#ffffff",
      background: "#171717",
      borderRadius: "50ch",
      cursor: "pointer",
      transition: "background 150ms ease",
      padding: 4,
      "&:hover": {
        background: "#323232",
      },
    },
    count: {
      position: "absolute",
      top: "-4px",
      right: "-5px",
    },
  }),
);

export default "styles";
