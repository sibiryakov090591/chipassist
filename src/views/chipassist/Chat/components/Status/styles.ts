import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    status: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 17,
      fontSize: 12,
      borderRadius: "50ch",
      padding: "0 6px",
      background: "#FEF3C7",
      color: "#525252",
    },
    requested: {
      background: "#C7D2FE",
      color: "#525252",
    },
    offering: {
      background: "#FEF3C7",
      color: "#525252",
    },
    delivering: {
      background: "#CAEBC9",
      color: "#525252",
    },
    closed: {
      background: "#737373",
      color: "#F5F5F5",
    },
    info: {
      fontSize: 12,
      color: "#737373",
    },
  }),
);

export default "styles";
