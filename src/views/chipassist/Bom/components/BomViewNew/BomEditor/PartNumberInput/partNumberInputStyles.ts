import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  autosuggest: {
    position: "relative",
    width: 170,
    "& .list": {
      position: "absolute",
      zIndex: 10,
      left: 0,
      top: "100%",
      marginTop: 2,
      minWidth: "100%",
      background: "#0c3a65",
      color: "#fff",
      overflow: "hidden",
      borderRadius: 4,
      boxShadow: "0 0 50px 0 rgba(0,0,0,0.1)",
    },
    "& .list-item": {
      padding: "5px 10px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    "& .list-item-highlight": {
      background: "#1D90FF",
    },
  },
  field: {
    "& > label": {
      whiteSpace: "nowrap",
    },
    "& .MuiInputBase-input": {
      padding: "10px 15px",
    },
  },
});

export default "styles";
