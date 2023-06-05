import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "inherit",
    position: "relative",
    wordWrap: "break-word",
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
  tableAreas: {
    display: "grid",
    gridTemplateColumns: "75px 1fr 0.75fr 1fr 1fr 0.75fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "75px 1fr 0.75fr 1fr 1fr 0.75fr",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: `
      "id qty"
      "partnumber status"
      "comment created"
      `,
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
  btnCreateRfq: {
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
  rfqListRowRed: {
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
  accordion: {
    "&:not(:first-child)": {
      borderTop: "1px solid #dddddd",
      "&.MuiAccordion-root.Mui-expanded": {
        marginTop: 0,
      },
    },
    "&:before": {
      display: "none",
    },
  },
  accordionInfo: {
    display: "flex",
    "& span": {
      textDecoration: "underline",
    },
    "& > div": {
      marginRight: 20,
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  accordionSum: {
    backgroundColor: theme.palette.app.grey100,
    "&.Mui-expanded": {
      borderBottom: `1px solid ${theme.palette.app.grey200}`,
    },
  },
  accordionTyp: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  accordionDetails: {
    padding: 0,
    flexDirection: "column",
  },
  showMoreWrapper: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 200ms ease",
    backgroundColor: theme.palette.app.blue100,
    "&:hover": {
      backgroundColor: theme.palette.app.blue200,
    },
  },
  showMoreButtonWrapper: {
    display: "flex",
    alignItems: "center",
    width: 135,
  },
  showMoreArrow: {
    transition: "all 250ms ease",
  },
  showMoreArrowActive: {
    transform: "rotate(-180deg)",
  },
}));

export default "styles";
