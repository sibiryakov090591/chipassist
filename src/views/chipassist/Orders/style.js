import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 20,
  },
  filters: {
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
    },
  },
  ordersTable: {
    wordWrap: "break-word",
    position: "relative",
    "&.is-loading": {
      // opacity: 0.3,
    },
    "& td:first-child, & th:first-child": {
      paddingLeft: 24,
    },
  },
  ordersTableContentTdSkeleton: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  ordersTableContentSkeleton: {
    margin: "0 10px",
  },
  statusSelect: {
    marginLeft: 10,
    width: 250,
    display: "flex",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: { marginLeft: 0, marginBottom: "10px" },
  },
  deleteBom: {
    marginLeft: 10,
    width: 100,
    transition: "all 0.2s",
    cursor: "pointer",
  },
  trSelected: {
    background: `${theme.palette.secondary.light} !important`,
  },
  ordersGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 200px",
    borderBottom: "1px solid rgba(63,63,68, 0.1)",
    [theme.breakpoints.down("xs")]: {
      display: "grid !important",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: `
        "number status"
        "date total"
        "actions actions"
      `,
    },
  },
}));

export default "styles";
