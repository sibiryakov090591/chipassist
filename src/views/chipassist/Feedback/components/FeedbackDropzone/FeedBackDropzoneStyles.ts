import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  uploadFrame: {
    marginTop: 16,
    marginBottom: 10,
    paddingBottom: 10,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid #dbebf5",
    background: "#fafdff",
    borderRadius: 5,
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.15s",
    overflow: "hidden",
    "&:hover": {
      borderColor: "#b0d6ef",
    },
    "&.has-focus": {
      background: "#f6fff4",
      borderColor: "#ace89c",
      boxShadow: "0 5px 50px 0 rgba(0,0,0,0.1) !important",
    },
  },
  disabledFrame: {
    background: theme.palette.app.grey200,
    border: "none",
    cursor: "default",
    "& > svg": {
      color: theme.palette.white,
    },
  },
  uploadIcon: {
    color: "#e9f1f7",
    fontSize: 60,
    "&.has-focus": {
      display: "none",
    },
  },
  uploadFrameText: {
    margin: 10,
    fontSize: 16,
    color: theme.palette.app.grey400,
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  thumb: {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    "&:hover > div:nth-child(2)": {
      opacity: 1,
    },
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
  deleteImageWrapper: {
    position: "absolute",
    top: 5,
    right: 5,
    opacity: 0,
    backgroundColor: theme.palette.app.red500,
    width: 27,
    height: 27,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 200ms",
    "&:hover": {
      backgroundColor: theme.palette.app.red400,
    },
  },
  deleteImageIcon: {
    color: theme.palette.white,
    fontSize: 18,
  },
  fileSize: {
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: "0 5px",
    fontSize: 12,
    color: theme.palette.white,
    backgroundColor: "rgba(0,0,0,.6)",
    borderRadius: "2em",
  },
}));

export default "styled";
