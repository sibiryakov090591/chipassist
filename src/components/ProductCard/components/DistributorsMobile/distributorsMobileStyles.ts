import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    stockrecord: {
      margin: "0 15px",
      "&+&": {
        borderTop: "1px solid #e7e8ec",
        paddingTop: "10px",
      },
    },
    checkIconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkIcon: {
      width: 10,
      height: 10,
      borderRadius: 3,
      border: `1px solid ${theme.palette.app.grey300}`,
      backgroundColor: theme.palette.white,
      "& > svg": {
        transform: "translate(-2px, -6px)",
        fontSize: 0,
      },
      "&.checked": {
        backgroundColor: theme.palette.app.grey100,
        "& > svg": {
          fontSize: 16,
        },
      },
    },
    accordionRoot: {
      textAlign: "center",
      "&:before": { display: "none" },
    },
    accordionExpanded: {
      margin: "auto !important",
    },
    AccordionSummaryContent: { flexGrow: 0 },
    accordionTitle: {
      marginLeft: 10,
      display: "grid",
      width: "100%",
    },
    accordionDetails: {
      display: "flex",
      flexDirection: "column",
    },
    dataColumns: {
      display: "grid",
      gridTemplateColumns: "45% 55%",
      alignItems: "center",
      "& span": {
        display: "inline-block",
        "&:first-of-type": {
          fontWeight: 700,
        },
      },
      marginBottom: "5px",
      padding: "0 16px",
      textAlign: "left",
    },
    tableAreas: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      marginBottom: "5px",
      listStyleType: "none",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr 1fr",
      },
      "& > li": {
        padding: "16px",
        overflowX: "clip",
        textOverflow: "ellipsis",
        "& > span:first-of-type": {
          display: "block",
          color: theme.palette.app.blue500,
          fontSize: "0.9em",
          fontWeight: 700,
        },
        "&:empty": {
          display: "none",
        },
      },
    },
    table: {
      borderTop: "0.5px solid #c6c6c6",
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13,
      "& tr:not(last)": {
        borderBottom: "0.5px solid #c6c6c6",
      },
    },
    cartIcon: {
      color: theme.palette.app.green600,
      marginRight: 5,
    },
    statusText: {
      color: "#00C9A4",
      fontWeight: "bold",
    },
    trQty: {
      "& .MuiInputBase-root": {
        height: 27,
        "& input": {
          textAlign: "right",
        },
      },
    },
    buttons: {
      "& button": {
        width: "100%",
        margin: "10px 0 0 0",
      },
    },
    addToBomIcon: {
      fontSize: "16px",
      marginRight: "3px",
    },
  }),
);

export default "styles";
