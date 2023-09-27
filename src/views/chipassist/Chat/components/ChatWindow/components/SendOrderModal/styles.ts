import { createStyles, makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      maxWidth: 600,
      textAlign: "start",
    },
    label: {
      fontSize: 11,
    },
    value: {
      fontWeight: "bold",
      fontSize: 15,
    },
    qtyInput: {
      maxWidth: 100,
      "& input": {
        fontWeight: "bold",
        fontSize: 15,
      },
    },
    productCard: {
      border: "1px solid #eee",
      borderRadius: 4,
      background: "#f5f5f5",
    },
  }),
);

export default "styles";
