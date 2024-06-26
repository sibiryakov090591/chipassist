import { makeStyles } from "@material-ui/core/styles";
import { scrollbarWidth } from "@src/config";
import constants from "@src/constants/constants";
import { ID_PCBONLINE } from "@src/constants/server_constants";

const isPCBOnline = constants.id === ID_PCBONLINE;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  footer: {
    padding: "26px 0",
    paddingRight: `${scrollbarWidth}px`,
    backgroundColor: theme.palette.primary.main,
  },
  supplierFooter: {
    padding: "26px 0",
    paddingRight: `${scrollbarWidth}px`,
    backgroundColor: "#123",
  },
  footerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: isPCBOnline ? "row" : "column-reverse",
    },
  },
  topCont: {
    width: "100%",
    backgroundColor: "#37475A",
  },
  top: {
    textAlign: "center",
    margin: "0 auto",
    color: theme.palette.white,
    padding: "17px 0",
    fontSize: "13px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    paddingTop: "0px",
  },
  icsearchContainer: {
    position: "relative",
  },
  wrapper: {
    color: "#ffffff",
    "& a": {
      color: "#ffffff",
      "&:hover": {
        color: "#ffffff",
        borderBottom: "1px solid #ffffff",
      },
    },
  },
  header: {
    fontWeight: "700",
    color: theme.palette.white,
    fontSize: "16px",
    margin: "6px 0 14px 0",
    whiteSpace: "nowrap",
  },
  ul: {},
  li: {
    listStyleType: "none",
    marginBottom: "10px",
  },
  link: {
    color: "#DDD",
    fontSize: "13px",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  bottom: {
    width: "100%",
    borderTop: "1px solid #3a4553",
  },
  bottomCont: {
    position: "relative",
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      textAlign: "center",
      marginTop: isPCBOnline ? 0 : 26,
    },
  },
  logoImg: {
    height: "36px",
  },
  nav: {
    width: "60%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      width: "100%",
    },
    [theme.breakpoints.down(420)]: {
      flexDirection: "column",
      "& > div": {
        flexDirection: "column",
      },
    },
  },
  navGroup: {
    display: "grid",
    gridColumnGap: 24,
    // gridTemplateColumns: "repeat(3, auto)",
    gridTemplateAreas: `
          "home rfq terms"
          "products pcb privacy"
          "bom brands report"
        `,
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      // gridTemplateAreas: `
      //     "home brands"
      //     "products terms"
      //     "rfq privacy"
      //     "pcb report"
      //   `,
      gridTemplateAreas: `
          "home rfq terms"
          "products pcb privacy"
          "brands report ."
        `,
    },
    [theme.breakpoints.down(780)]: {
      gridTemplateAreas: `
          "home pcb"
          "products terms"
          "brands privacy"
          "rfq report"
        `,
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateAreas: `
          "home pcb"
          "products terms"
          "brands privacy"
          "rfq report"
        `,
    },
  },
  navLink: {
    display: "block",
    fontSize: 13,
    color: "#d8d5df",
    fontWeight: "bold",
    marginBottom: 3,
    whiteSpace: "nowrap",
    "&:hover": {
      textDecoration: "underline",
      color: "#d8d5df",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
  },
  navLinkICS: {
    display: "block",
    fontSize: 14,
    color: "#fafafa",
    fontWeight: "bold",
    marginBottom: 3,
    whiteSpace: "nowrap",
    "&:hover": {
      textDecoration: "underline",
      color: "#fafafa",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
  },
  copy: {
    color: "#d8d5df",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.6,
    marginTop: 3,
    marginLeft: 5,
  },
  commit: {
    color: "transparent",
    position: "absolute",
    bottom: "-24px",
    left: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  addressWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  contactsWrapper: {
    display: "flex",
    height: "100%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      paddingTop: 23,
    },
  },
  contactsInner: {
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  address: {
    margin: "10px 0",
  },
  name: {
    fontWeight: "bold",
  },
  mail: {
    margin: "10px 0",
  },
  socialIcon: {
    color: theme.palette.white,
    fontSize: 30,
    "&:hover": {
      color: theme.palette.app.grey400,
    },
  },
  containerForFunctions: {
    display: "flex",
    flexDirection: "initial",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  contactInfoBox: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.1rem",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      marginLeft: 0,
    },
  },
  titleClass: {
    fontSize: 13,
    color: "#d8d5df",
    fontWeight: "bold",
  },
  contactClass: {
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

export default "styles";
