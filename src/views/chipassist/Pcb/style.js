import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    wordWrap: "break-word",
    position: "relative",
    "&.is-loading": {
      // opacity: 0.3,
    },
    "& td:first-child, & th:first-child": {
      paddingLeft: 24,
    },
    "& #simple-popover": {
      transform: "translate3d(0, 28px, 0px) !important",
      left: "unset !important",
      right: "0 !important",
    },
  },
  tableContentWhiteSpace: {
    position: "relative",
    height: 250,
    "& h2": {
      textAlign: "center",
    },
  },
  tableContentTdSkeleton: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  partnerName: {
    padding: "10px 20px",
    borderRadius: 5,
    background: "#f8f8f8",
    fontSize: 16,
    fontWeight: 600,
  },
  showAll: {
    marginLeft: 10,
  },
  btnCreatePcb: {
    marginLeft: 10,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  pcbListRowRed: {
    background: "rgba(255,0,0,0.1)",
    boxShadow: "inset 3px 0 0 0 red",
  },
  removeItem: {
    marginLeft: 10,
  },
  tableSort: {
    "& svg": {
      width: "0.7em",
      height: "0.7em",
      color: `${theme.palette.primary.light} !important`,
      opacity: 0.3,
    },
  },
  units: {
    fontSize: "85%",
    marginLeft: "3px",
  },
}));

export default "styles";
