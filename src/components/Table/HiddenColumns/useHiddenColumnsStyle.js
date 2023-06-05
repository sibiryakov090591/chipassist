import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  hiddenColumnsList: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: 13,
    paddingLeft: 10,
    "& > *": {
      marginBottom: 5,
      marginTop: 5,
    },
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
  showColumn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 5,
    border: "none",
    background: "#F5F5F5",
    cursor: "pointer",
    transition: "all 0.2s",
    "& span": {
      marginLeft: 5,
      color: "#CFD8DC",
      fontSize: 0,
      transition: "all 0.2s",
    },
    "&:hover": {
      background: "#eff6ef",
      color: "#4CAF50",
      "& span": {
        color: "#4CAF50",
      },
    },
  },
  hideColumnWrap: {
    display: "inline-flex",
    // position: "relative",
    paddingRight: 10,
    cursor: "pointer",
    width: "100%",
    height: "100%",
    position: "relative",
    "&:hover $hideColumn": {
      visibility: "visible",
      opacity: 1,
      transform: "none",
    },
  },
  hideColumn: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 18,
    height: 18,
    border: "none",
    background: "#e23a20",
    borderRadius: "50%",
    fontSize: 0,
    cursor: "pointer",
    transition: "all 0.2s",
    visibility: "hidden",
    transform: "scale(0)",
    opacity: 0,
    zIndex: 2,
    "&:hover": {
      background: "#ff5640",
    },
    "&::before": {
      content: "''",
      display: "inline-block",
      width: 10,
      height: 1,
      background: "#fff",
    },
  },
}));

export default "styles";
