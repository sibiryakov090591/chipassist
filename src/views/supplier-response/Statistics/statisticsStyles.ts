import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    padding: "2em 0",
    backgroundColor: theme.palette.white,
  },
  empty: {
    textAlign: "center",
    margin: 50,
    fontSize: 20,
  },
  th: {
    width: "16%",
  },
  thQty: {
    width: "8%",
  },
  thDate: {
    width: "20%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: `1px solid ${theme.palette.app.grey200}`,
    "& li": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 6,
      minHeight: 50,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "start",
        padding: "16px",
        "& > div:first-child": {
          marginBottom: 4,
          color: "#319cbc",
        },
        "& > div:nth-child(2)": {
          fontSize: 22,
        },
      },
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 5,
      borderTop: "none",
      borderBottom: "none",
    },
  },
  gridClass: {
    display: "grid !important",
    gridTemplateColumns: "1fr 0.75fr 0.75fr 1fr 1fr 0.75fr 0.75fr 1fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: `
      "mpn manufacturer"
      "yourQty qty"
      "yourPrice competitivePrice"
      "position date"
      `,
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateAreas: `
      "mpn"
      "date"
      "qty"
      "manufacturer"
      "yourPrice"
      "competitivePrice"
      "position"
      `,
    },
  },
}));

export default "styles";
