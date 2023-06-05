import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    total: {
      whiteSpace: "nowrap",
      minHeight: 35,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "6px 15px",
      background: "#ECEFF1",
      borderRadius: 4,
    },
    checkoutCard: {
      maxWidth: 360,
      margin: "25px 0 10px 0",
      padding: "25px",
      borderRadius: "0px",
      background: "#E3F2FD",
      border: "1px solid #BBDEFB",
      "& .MuiTextField-root": {
        width: "100%",
        background: theme.palette.black,
      },
    },
    checkoutInput: {
      width: "auto",
      minWidth: 0,
      height: 40,
      padding: "0 10px",
      border: "1px solid #B3E5FC",
      borderRadius: 3,
      "&:focus": {
        boxShadow: "0 0 0 2px #81D4FA !important",
      },
    },
    checkoutInputError: {
      border: "1px solid red",
      boxShadow: "0 0 1px 1px red",
      "&:focus": {
        boxShadow: "0 0 1px 1px red !important",
      },
    },
    checkoutInputWide: {
      width: "100%",
      padding: "0 20px",
    },
    checkoutCardRow: {
      display: "flex",
      alignItems: "center",
      margin: "15px 0",
      "& > span": {
        margin: "0 10px",
        fontSize: "20px",
        color: theme.palette.app.grey300,
      },
      "& .MuiInputBase-input": {
        textAlign: "center",
      },
    },
    checkoutCardSmInput: {
      flex: "0 0 60px",
      textAlign: "center",
    },
    checkoutCardCvc: {
      marginLeft: "auto",
      flex: "0 0 100px",
      textAlign: "center",
    },
    checkoutEmail: {
      width: "100%",
      height: "50px",
      padding: "0 20px",
      border: `1px solid ${theme.palette.app.grey300}`,
    },
    checkoutCardForm: {
      // maxWidth: 360,
    },
    error: {
      margin: "5px 0",
      color: "red",
      fontSize: "12px",
    },
    cardError: {
      margin: "-5px 0 20px",
    },
    progressCircle: {
      marginRight: 10,
      color: "white",
    },
    actions: {
      marginTop: 22,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
    backButton: {
      // padding: "14px 36px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    tableAreas: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr 200px 170px 170px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr 2fr 150px 1fr 1fr",
      },
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateAreas: `
          "partnumber partnumber partnumber qty qty"
          "unit_price unit_price unit_price total_price total_price"
        `,
      },
    },
    columnDescription: { [theme.breakpoints.down("sm")]: { display: "none" } },
    columnTextRight: {
      textAlign: "end",
      [theme.breakpoints.down("xs")]: {
        textAlign: "start",
      },
    },
    payMethodButton: {
      padding: "0px 15px",
      lineHeight: "34px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      textTransform: "none",
      "& + &": {
        marginLeft: "10px",
      },
      "&.active": {
        background: "rgba(22, 190, 159,0.6)",
      },
    },
    evenRow: {
      "& > li": {
        background: theme.palette.app.grey100,
      },
    },
    elfaroWrapper: {
      width: "100%",
      marginTop: "2rem",
      paddingTop: "1rem",
      borderTop: `1px solid ${theme.palette.app.blue800}`,
    },
    elfaroTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    elfaroLogo: {
      marginTop: "1rem",
    },
    minCost: {
      color: "#E94160",
      marginTop: 10,
    },
  }),
);

export default "styles";
