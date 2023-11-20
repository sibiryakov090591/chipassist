import { makeStyles } from "@material-ui/styles";
import { colors } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  searchContainer: {
    margin: "20px 40px 10px",
    [theme.breakpoints.down("sm")]: {
      margin: "20px 0px 10px",
    },
  },
  searchIconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
    height: "41px",
    borderRadius: "0 3px 3px 0",
    width: 60,
    transition: "background-color 250ms",
    "&:hover": {
      cursor: "pointer",
    },
  },
  clearSearchIcon: {
    position: "absolute",
    right: 70,
    color: theme.palette.app.grey400,
    cursor: "pointer",
    transition: "all 300ms ease",
    "&:hover": {
      color: theme.palette.app.grey500,
    },
  },
  searchIcon: {
    fontSize: "33px",
  },
  searchInput: {
    border: "none",
    width: "100%",
    padding: "0 50px 0 17px",
    borderRadius: "3px 0 0 3px",
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100,
  },
  searchPopperContent: {
    marginTop: theme.spacing(1),
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
  trialIcon: {
    marginRight: theme.spacing(1),
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600],
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
  leftMain: {
    alignSelf: "start",
    transition: "all 250ms ease",
    "&.collapse": {
      marginTop: 6,
    },
  },
  leftCenter: {
    marginLeft: 45,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      marginLeft: 18,
    },
  },
  toolbar: {
    minHeight: 80,
    alignItems: "center",
    paddingBottom: 0,
    paddingLeft: 10,
    paddingTop: 8,
    transition: "all 250ms ease",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
      paddingTop: "1em",
    },
    "&.collapse": {
      minHeight: 80,
      paddingTop: 0,
    },
  },
  logoCont: {
    paddingLeft: "15px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
  logoImg: {
    margin: "12px 6px 0px 0",
    width: 180,
    [theme.breakpoints.down("sm")]: {
      margin: "4px 0px 0px 0px",
    },
  },
  logoMobileImg: {
    margin: "7px 0 0px 3px",
    height: "31px",
  },
  position: {
    width: "209px",
    float: "left",
    padding: "6px 0 0 10px",
    marginTop: "2px",
    overflow: "hidden",
    display: "flex",
  },
  positionText: {},
  pLine1: {
    fontSize: "12px",
    lineHeight: "14px",
    height: "14px",
    fontWeight: "400",
    marginTop: "9px",
  },
  pLine2: {
    fontSize: "14px",
    lineHeight: "15px",
    fontWeight: "700",
    paddingBottom: "5px",
  },
  pIcon: {
    marginTop: "7px",
    marginRight: "5px",
  },
  tryP: {
    color: "#acd4f0",
    fontSize: "14px",
    paddingTop: "5px",
    marginLeft: 16,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  trySpan: {
    color: theme.palette.white,
    fontWeight: 700,
    paddingLeft: "7px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  hiddenEl: {
    width: "84%",
  },
  searchRow: {
    display: "flex",
  },
  cartBlock: {
    display: "flex",
    padding: "3px 0 3px 12px",
    color: `${theme.palette.white} !important`,
    "&:hover": {
      cursor: "pointer",
    },
  },
  cartCount: {
    position: "absolute",
    fontWeight: "bold",
    top: "-2px",
    right: "-8px",
    borderRadius: "2px",
    backgroundColor: "#E94160",
    color: "white",
    fontSize: "0.9em",
    height: 17,
    lineHeight: "8px",
    padding: "4px 6px 2px 6px",
    display: "flex",
    justifyContent: "center",
  },
  cartImageCont: {
    display: "flex",
    position: "relative",
  },
  listIcon: {
    width: 35,
    height: 35,
    filter: "invert(0.95)",
  },
  cartSpan: {
    fontSize: "14px",
    fontWeight: "bold",
    paddingTop: "17px",
  },
  cartMobileSpan: {
    fontSize: "14px",
    fontWeight: "bold",
    paddingTop: "12px",
  },
  bottomRowRight: {
    display: "flex",
    alignItems: "center",
  },
  bottomRowLeft: {},
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "3px",
    alignItems: "baseline",
  },
  cartMobileImage: {
    height: "30px",
    width: "33px",
  },
  langBlock: {
    fontSize: "10px",
    margin: "0px 0 0 7px",
    padding: "0 0 0 18px",
    color: "#ccc",
    lineHeight: "18px",
    textTransform: "uppercase",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 0",
    },
  },
  cartMobileCount: {
    position: "absolute",
    color: "#FE4A49",
    fontWeight: "bold",
    top: "0",
    right: "38px",
  },
  cartMobileBlock: {
    padding: "0 7px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  firstMobileRow: {
    display: "flex",
    margin: "5px 0 2px 0",
  },
  secondMobileRow: {},
  rootRow: {
    display: "block",
  },
  logoMobileCont: {
    display: "flex",
  },
  maintenance: {
    padding: "1em 4em",
    textAlign: "center",
    background: theme.palette.app.red400,
    color: theme.palette.white,
  },
  maintenanceTitle: {
    display: "inline-flex",
    alignItems: "center",
    margin: 0,
  },
  maintenanceIcon: {
    marginRight: "10px",
  },
  mobileTopBar: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10px",
    [theme.breakpoints.down("sm")]: { margin: "0 0" },
  },
  mobileTopBarItem: {
    width: 150,
    [theme.breakpoints.down(545)]: {
      width: "initial",
    },
  },
  collapseWrapper: {
    height: "80px !important",
  },
  collapseInner: {
    minHeight: "80px !important",
  },
  icSearchLink: {
    fontSize: 13,
    color: "#e8e8e8",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
      color: "#ffffff",
    },
  },
  homePageTopBar: {
    transform: "translateY(-101%)",
    transition: "all 250ms ease",
    "&.collapse": {
      transform: "translateY(0)",
    },
  },
}));

export default "styles";
