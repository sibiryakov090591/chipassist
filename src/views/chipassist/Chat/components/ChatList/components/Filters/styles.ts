import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
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
        marginRight: 2,
        fontSize: 20,
      },
    },
    button: {
      minWidth: 38,
      paddingLeft: 11,
      border: "1px solid #A3A3A3",
      borderRadius: 8,
      color: "#A3A3A3",
    },
    clearBtn: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 35,
      cursor: "pointer",
      borderRadius: "0 8px 8px 0",
      "&:hover": {
        background: "rgba(0,0,0,0.04)",
      },
    },
  }),
);

export default "styles";
