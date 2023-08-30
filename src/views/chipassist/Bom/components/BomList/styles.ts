import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  bomListPaper: {
    boxShadow: "none",
    borderBottom: "none",
    transition: "all 0.15s",
    overflowX: "auto",
  },
  bomListLoading: {
    opacity: 0.3,
  },
  hintList: {
    margin: "8px 8px 16px",
  },
  bomName: {
    cursor: "pointer",
    borderRadius: 4,
    padding: "5px 10px",
    margin: "-5px -10px",
    "&:hover": {
      background: theme.palette.secondary.light,
      color: theme.palette.primary.light,
    },
  },
  statusValue: {
    color: theme.palette.app.green600,
  },
  bomListRow: {
    transition: "all 0.2s",
    boxShadow: "inset 0 0 0 0 transparent",
  },
  headerCheckbox: {
    color: `${theme.palette.app.grey100} !important`,
  },
  bomListRowGray: {
    backgroundColor: "rgba(100,100,100,0.1) !important",
    boxShadow: "inset 3px 0 0 0 gray",
    "& > td": {
      borderColor: theme.palette.app.grey200,
    },
  },
  bomListRowRed: {
    background: "rgba(255,0,0,0.1) !important",
    boxShadow: "inset 3px 0 0 0 red",
    "& > td": {
      borderColor: theme.palette.app.grey200,
    },
  },
  name: {
    width: "40%",
  },
  status: {
    width: "15%",
  },
  created: {
    whiteSpace: "nowrap",
    width: "20%",
  },
  cost: {
    whiteSpace: "nowrap",
  },
  copyButton: {
    whiteSpace: "nowrap",
  },
  deleteButton: {
    width: 45,
  },
  // mergeIconWrapper: {
  //   width: 45,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   cursor: "pointer",
  //   transition: "all 0.2s ease",
  //   "&:hover": {
  //     transform: "scale(1.1)",
  //   },
  // },
  // mergeIcon: {
  //   fontSize: 24,
  //   color: theme.palette.app.green700,
  // },
  selectedBom: {
    display: "inline-flex",
    padding: "3px 5px",
    borderRadius: 3,
    background: "rgba(0,0,0,0.1)",
    margin: 2,
    "&:not(:last-child)": {
      marginRight: 3,
    },
  },
  mergeColumn: {
    background: "rgb(232, 241, 250)",
  },
  mergeLoading: {
    display: "inline-flex",
    alignItems: "center",
    "&::before": {
      content: "",
      width: 16,
      height: 16,
      marginRight: 5,
      border: `2px solid ${theme.palette.primary.light}`,
      borderLeftColor: "#efefef",
      borderRadius: "50%",
      animation: "rotating 0.8s infinite linear",
    },
  },
  mergeColumnControls: {
    display: "flex",
    alignItems: "center",
  },
  mergeMultiplierSign: {
    opacity: 0.5,
  },
  mergeMultiplier: {
    marginLeft: 10,
    width: 40,
    height: 20,
    padding: "0 5px",
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.8)",
    "&[disabled]": {
      opacity: 0.5,
    },
  },
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(359deg)",
    },
  },
  table: {
    wordWrap: "break-word",
    "& .col-checkbox": {
      [theme.breakpoints.down("sm")]: { display: "none" },
    },
    "& .col-id": {
      [theme.breakpoints.down("sm")]: { display: "none" },
    },
    "& .col-menu": {
      [theme.breakpoints.down("sm")]: { display: "none" },
    },
  },
  tableSort: {
    whiteSpace: "nowrap",
  },
  tableContentWhiteSpace: {
    position: "relative",
    height: 250,
    "& h2": {
      textAlign: "center",
    },
    "& td": {
      padding: "0 100px",
    },
  },
  createBomLink: {
    cursor: "pointer",
    color: "#0277BD",
    borderBottom: "2px solid #0277BD",
    transition: "all 200ms",
    "&:hover": {
      color: "#61b2f1",
      borderBottom: "2px solid #61b2f1",
    },
  },
  progressCircle: {
    marginRight: 10,
    color: "#3F7CAC",
  },
}));

export default "styles";
