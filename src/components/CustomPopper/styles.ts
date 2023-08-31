import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  wrapper: {
    position: "absolute",
    pointerEvents: "none",
    top: "-75%",
    right: 0,
    width: 300,
    opacity: 0,
    zIndex: 1,
    backgroundColor: `${theme.palette.app.blue800}`,
    padding: "1em",
    borderRadius: "4px",
    color: `white`,
    transition: "all 250ms ease",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      bottom: "-4px",
      right: 16,
      width: 10,
      height: 10,
      transform: "rotate(45deg)",
      backgroundColor: `${theme.palette.app.blue800}`,
    },
  },
  active: {
    top: "-93%",
    opacity: 1,
    pointerEvents: "initial",
    animation: `$product-hint-shake 0.4s linear`,
  },
  closeIcon: {
    fontSize: "1em",
    "&:hover": {
      cursor: "pointer",
    },
  },
  "@keyframes product-hint-shake": {
    "0%": { transform: "rotate(6deg)" },
    "20%": { transform: "rotate(-6deg)" },
    "40%": { transform: "rotate(6deg)" },
    "60%": { transform: "rotate(-6deg)" },
    "80%": { transform: "rotate(6deg)" },
    "100%": { transform: "rotate(0)" },
  },
}));

export default useStyles;
