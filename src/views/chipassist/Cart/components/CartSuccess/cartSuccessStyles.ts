import { createStyles, makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    checkoutSuccess: {
      display: "flex",
      alignItems: "center",
      padding: "10px 10px 10px 20px",
      border: "1px solid rgba(76, 175, 80, 0.5)",
      background: "rgba(76, 175, 80, 0.2)",
      fontSize: 15,
      color: "#388E3C",
      marginBottom: 20,
    },
    checkoutLink: {
      display: "inline-block",
      cursor: "pointer",
      padding: 0,
      color: "#388E3C",
      fontWeight: "bold",
      textDecoration: "underline",
      background: "none",
      border: "none",
    },
    checkoutSuccessClose: {
      marginLeft: "auto",
      padding: "5px",
      background: "none",
      border: "none",
      borderRadius: 3,
      fontSize: 0,
      cursor: "pointer",
      color: "#388E3C",
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
  }),
);

export default "styles";
