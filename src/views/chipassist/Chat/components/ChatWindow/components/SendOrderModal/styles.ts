import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      maxWidth: 500,
      minHeight: 440, // 423
      height: "100%",
      textAlign: "start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    label: {
      fontSize: 11,
    },
    value: {
      fontWeight: "bold",
      fontSize: 15,
    },
    qtyInput: {
      maxWidth: 106,
      "& input": {
        fontWeight: "bold",
        fontSize: 15,
      },
    },
    productCard: {
      margin: 0,
      width: "100%",
      border: "1px solid #eee",
      borderRadius: 4,
      background: "#f5f5f5",
    },
  }),
);

export default "styles";
