import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  selectWrap: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  selectContainer: {
    flexGrow: 1,
    position: "relative",
    height: 38,
    background: "#fff",
    borderRadius: 4,
    border: "1px solid rgba(0,0,0,0.15)",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:not(:last-child)": {
      borderRadius: "4px 0 0 4px",
    },
    "&.small": {
      height: 30,
    },
    "&:before": {
      content: "",
      position: "absolute",
      right: 15,
      top: "50%",
      marginTop: -2,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "5px 4px 0 4px",
      borderColor: "rgba(0,0,0,0.2) transparent transparent transparent",
      transition: "all 0.2s",
    },
    "&:hover": {
      borderColor: theme.palette.primary.light,
      "&:before": {
        borderColor: "#263238 transparent transparent transparent",
      },
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
    },
  },
  select: {
    display: "block",
    width: "100%",
    height: "100%",
    padding: "0 25px 0 15px",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
    "-moz-appearance": "none",
    "-webkit-appearance": "none",
  },
  selectGrayColor: {
    color: "#9c9c9c",
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    marginLeft: -1,
    borderRadius: "0 4px 4px 0",
    border: "1px solid rgba(0,0,0,0.15)",
    color: "#414141",
    background: "#f4f4f4",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      zIndex: 2,
      borderColor: theme.palette.app.red500,
      color: theme.palette.app.red500,
      background: "rgba(240,17,0,0.12)",
    },
  },
  clearBtnIc: {
    fontSize: 14,
    color: "inherit",
  },
}));

export default "styles";
