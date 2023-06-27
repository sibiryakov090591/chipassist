import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    root: {
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #484850",
        borderRadius: "8px",
      },
    },
    select: {
      position: "relative",
      width: "100%",
      "& label": {
        color: "#A3A3A3",
      },
      "& .MuiSelect-select": {
        borderRadius: 8,
      },
      "& fieldset": {
        borderRadius: 8,
        border: "1px solid #A3A3A3",
      },
      "& .MuiSvgIcon-root": {
        color: "#a3a3a3",
        marginTop: 2,
        fontSize: 20,
      },
    },
    button: {
      minWidth: 38,
      paddingLeft: 11,
      border: "none",
      borderRadius: 8,
      color: "#ffffff",
      backgroundColor: theme.palette.app.red500,
      "&:hover": {
        backgroundColor: theme.palette.app.red400,
      },
      "&:active": {
        backgroundColor: theme.palette.app.red400,
      },
    },
    clearBtn: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 180ms ease",
      top: 0,
      bottom: 0,
      right: "-1px",
      width: 30,
      cursor: "pointer",
      borderRadius: "0 8px 8px 0",
      border: "1px solid #A3A3A3",
      background: "#f5f5f5",
      "&:hover": {
        background: "#ffd3d3",
      },
      "& svg": {
        color: `#8b8b8b !important`,
        fontSize: `16px !important`,
        marginTop: `0 !important`,
      },
    },
  }),
);

export default "styles";
