import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  delete: {
    marginLeft: 10,
    height: 28,
    width: 100,
    background: theme.palette.app.red500,
    color: theme.palette.white,
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.app.red500,
    },
  },
  view: {
    marginLeft: 10,
    height: 28,
    width: 100,
    background: "#0e69cb",
    color: "#fff",
    borderColor: "#0e69cb",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: "#0b54a2",
      color: "#fff",
    },
  },
  counter: {
    width: 20,
    height: 20,
    marginLeft: 10,
    color: "#28a4e0",
    backgroundColor: theme.palette.white,
    borderRadius: "50%",
    fontWeight: "normal",
  },
  disabledRow: {
    "& td:not(:last-child) .text": {
      textDecoration: "line-through",
      opacity: 0.3,
    },
  },
  seller: {
    maxWidth: 170,
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "0 10px",
    borderRadius: 4,
    background: "rgba(0,0,0,0.05)",
    whiteSpace: "nowrap",
    fontSize: 12,
    "& + &": {
      marginTop: 5,
    },
  },
  sellersDisplayBtn: {
    marginTop: 5,
    padding: "0 5px 0 8px",
    fontSize: 11,
    textTransform: "none",
  },
  responseBtn: {
    width: "100%",
  },
  tdCommentText: {
    fontSize: "11px",
    lineHeight: "normal",
    display: "inline-block",
  },
  removeHidden: {
    visibility: "hidden",
  },
  pcbActionButton: {
    margin: "0 2.5px",
  },
  statusCreated: {
    background: "#f3f3f3",
  },
  statusDone: {
    background: "rgba(180, 171, 156, 0.7)",
  },
  removeLine: {
    background: "rgba(255,0,0,0.1)",
    boxShadow: "inset 3px 0 0 0 red",
  },
}));

export default "styles";
