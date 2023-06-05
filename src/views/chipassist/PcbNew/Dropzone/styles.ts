import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  uploadFrame: {
    marginTop: 16,
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid #dbebf5",
    background: "rgb(252 227 145 / 50%)",
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
    color: theme.palette.app.green800,
    fontSize: 60,
    "&.has-focus": {
      display: "none",
    },
  },
  uploadFrameText: {
    margin: 10,
    fontSize: 16,
    // color: theme.palette.app.grey400,
  },
  thumbWrapper: {
    display: "flex",
  },
  thumbName: {
    display: "flex",
    alignItems: "center",
  },
  thumbNameIcon: {
    color: "#6e6e6e",
    marginRight: 5,
  },
  thumbSize: {
    marginLeft: 7,
    textDecoration: "underline",
  },
  thumbsContainer: {
    marginTop: 16,
  },
  deleteImageWrapper: {
    width: 27,
    height: 27,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 200ms",
    color: theme.palette.app.grey400,
    "&:hover": {
      color: theme.palette.app.red500,
    },
  },
  deleteImageIcon: {
    fontSize: 24,
    marginLeft: 15,
  },
}));

export default "styled";
