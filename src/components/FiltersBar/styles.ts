import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    counterValue: {
      paddingRight: "7px",
      fontWeight: 700,
      fontSize: "1.1em",
    },
    rightControls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flex: "1 0 auto",
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: { flexDirection: "column", flex: "1 1 auto" },
      "& > *": {
        whiteSpace: "nowrap",
      },
      fontSize: "12px",
      textTransform: "uppercase",
      maxHeight: "30px",
      // width: "100%",
      transition: "max-height 0.3s ease-out",
      overflow: "hidden",
    },
    rightControlsTwoItems: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rightControlsOpened: {
      maxHeight: "500px",
      transition: "max-height 0.3s ease-in",
    },
    counterF: {
      height: 19,
      marginRight: "10px",
      borderRight: `1px solid ${theme.palette.primary.main}`,
      paddingRight: "10px",
    },
    firstChild: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: { width: "100%", padding: "5px 0" },
    },
    child: {
      marginTop: 15,
      alignSelf: "flex-end",
    },
    withBorder: {
      "& button": {
        border: "1px solid #e1e1e1",
      },
    },
    marginBottomLastChild: {
      "&:last-child": {
        marginBottom: 12,
      },
    },
    showButton: {
      fontSize: "12px",
      paddingBottom: "4px",
      paddingTop: "4px",
    },
    viewsFIcon: {
      fontSize: "14px",
      color: theme.palette.primary.main,
      paddingBottom: 1,
    },
    orderBy: {
      display: "flex",
      alignItems: "center",
    },
    orderButton: {
      fontSize: "12px",
      height: 30,
      whiteSpace: "nowrap",
    },
    filterStockBar: {
      margin: "0 0 0 0 !important",
      "& .MuiCheckbox-root": { padding: "0px 4px 1px 0px !important", top: "0 !important" },
      "& .MuiFormControlLabel-label": { fontSize: 12, marginTop: "0 !important" },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "-2px",
        padding: "4px 8px",
      },
    },
    checkbox: {
      color: `${theme.palette.app.green800} !important`,
      "&:hover": {
        color: `${theme.palette.app.green800} !important`,
      },
      "&.Mui-checked": {
        color: `${theme.palette.app.green800} !important`,
      },
    },
    currency: {
      fontSize: 14,
      fontWeight: 600,
      color: "#555555",
      paddingTop: "3px",
      paddingBottom: "1px",
      paddingRight: "2px",
    },
    filtersIcon: {
      position: "absolute",
      right: "-10px",
      top: "50%",
      transform: "translateY(-50%)",
      "& img": {
        width: 42,
      },
    },
    restFiltersContainer: {
      alignSelf: "flex-end",
      flexDirection: "column",
    },
    countriesBlock: {
      padding: "2px 2px 2px 16px",
      maxHeight: "50vh",
      overflow: "auto",
      width: 250,
    },
    countriesWrapper: {
      paddingLeft: 16,
      display: "none",
      "&.show": {
        display: "block",
      },
    },
    regionRow: {
      display: "flex",
      alignItems: "center",
      "& > label": {
        marginRight: 8,
      },
    },
    extendedIcon: {
      cursor: "pointer",
      display: "flex",
    },
  }),
);

export default "styles";
