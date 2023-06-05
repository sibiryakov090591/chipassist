import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  row: {
    [theme.breakpoints.down("xs")]: {
      padding: 6,
    },
  },
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
    backgroundColor: "#fff",
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
    backgroundColor: "#ffffff",
    color: theme.palette.app.blue300,
    "&:hover": {
      backgroundColor: theme.palette.app.blue100,
    },
  },
  responseBtn: {
    width: "100%",
  },
  commentBtn: {
    textTransform: "none",
    padding: "0 10px",
    margin: 0,
    backgroundColor: "#ffffff",
    color: theme.palette.app.blue300,
    "&:hover": {
      backgroundColor: theme.palette.app.blue100,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
      padding: "2px 24px",
    },
  },
  tdPartNumber: {
    wordBreak: "break-all",
  },
  tdCommentText: {
    fontSize: "12px",
    lineHeight: "normal",
    display: "block",
    marginBottom: 4,
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom: 7,
    },
  },
  rfqListRowRed: {
    backgroundColor: "#ffeeee",
  },
  fillRow: {
    background: theme.palette.app.grey100,
    "& > *": {
      background: theme.palette.app.grey100,
    },
  },
}));

export default "styles";
