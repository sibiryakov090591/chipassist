import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  phoneSelectMenu: {
    textAlign: "left",
    bottom: "-45px",
    left: "0px",
    boxShadow: "1px 2px 18px rgb(0 0 0 / 25%) !important",
    "& .highlight": {
      backgroundColor: "#b2d4ff !important",
      "&:hover": {
        backgroundColor: "#deebff !important",
      },
    },
    "& .country": {
      "&:hover": {
        backgroundColor: "#deebff !important",
      },
      "&:focus": {
        backgroundColor: "#deebff !important",
      },
    },
  },
  phoneInput: {
    width: "100% !important",
    height: "100% !important",
    fontSize: "14px !important",
    borderRadius: "4px !important",
    outline: `${theme.palette.secondary.dark} !important`,
    border: `1px solid ${theme.palette.app.grey200} !important`,
    "&:hover": {
      borderColor: `${theme.palette.secondary.dark} !important`,
      transition: `border-color 250ms ease !important`,
    },
    "&:focus": {
      boxShadow: `0 0 0 1px ${theme.palette.secondary.dark} !important`,
    },
  },
  small: {
    padding: "9.5px 14px 9.5px 58px !important",
  },
  phoneContainer: {
    "&:focus": {
      "& .special-label": {
        color: theme.palette.primary.main,
        transition: `color 250ms ease !important`,
      },
    },
    "& .special-label": {
      fontSize: "10px !important",
      fontWeight: 400,
      top: "-10px",
      left: "10px",
    },
  },
  greenLabel: {
    "& .special-label": {
      color: "#b4b4b4",
    },
  },
}));

export default "styled";
