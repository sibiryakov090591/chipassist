import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import background from "@src/images/Homepage/background.png";
import excess from "@src/images/Homepage/sell_excess.svg";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  main: {
    height: "100%",
    color: "#f2f1f4",
  },
  header: {
    background: theme.palette.primary.main,
    color: "#526a9d",
    padding: "16px 0",
  },
  headerContainer: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
  },
  headerButtonLink: {
    display: "inline-block",
    backgroundColor: "#3a2a5e",
    color: "#d8d5df",
    fontWeight: "bold",
    fontSize: 13,
    borderRadius: "50ch",
    outline: "none",
    border: "none",
    padding: "5px 18px",
    transition: "150ms all ease",
    "&:hover": {
      color: "#d8d5df",
      backgroundColor: "#41306d",
    },
  },
  headerLink: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
      color: "#fff",
    },
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, #372859 14%, #e55972 5%)",
    padding: "20px 0 40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 80px)",
      background: "#e55972",
    },
  },
  today: {
    background: "radial-gradient(circle at top left, #372859 20%, #1d1530 50%)",
    padding: "3rem 0 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  },
  heroMenuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  heroMenu: {
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroMenuLink: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 28,
    position: "relative",
    "&:hover": {
      textDecoration: "underline",
      color: "#fff",
    },
    [theme.breakpoints.down(1000)]: {
      marginRight: 20,
    },
  },
  heroButtonLink: {
    backgroundColor: "#2c1f46",
    color: "#d8d5df",
    "&:hover": {
      color: "#d8d5df",
      backgroundColor: "#362558",
    },
  },
  chatUnreadCount: {
    position: "absolute",
    top: "-7px",
    left: "85%",
    background: `${theme.palette.app.green800} !important`,
    color: `#ffffff !important`,
  },
  cartBlock: {
    display: "flex",
    marginLeft: 18,
    color: `#d8d5df !important`,
    cursor: "pointer",
  },
  cartCount: {
    position: "absolute",
    fontWeight: "bold",
    top: "-8px",
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
    alignItems: "center",
    position: "relative",
  },
  listIcon: {
    width: 23,
    height: 23,
    filter: "invert(0.95)",
    [theme.breakpoints.down("sm")]: {
      width: 38,
      height: 38,
    },
  },
  logoCont: {
    marginRight: "60px",
    width: "150px",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  logoImg: {
    width: "100%",
  },
  heroMain: {
    maxWidth: 800,
    marginTop: 65,
    [theme.breakpoints.down("sm")]: {
      marginTop: 12,
      maxWidth: "none",
    },
  },
  heroTitle: {
    color: "#f2f1f4",
    fontSize: "3.5rem",
    lineHeight: "4rem",
    marginBottom: "3rem",
    "& span": {
      color: "#234",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.8rem",
      lineHeight: "3.3rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.3rem",
      textAlign: "center",
    },
  },
  heroItems: {
    marginTop: "4rem",
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  heroItem: {
    padding: "12px 0",
    color: "#f2f1f4",
    maxWidth: 370,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      maxWidth: "none",
    },
  },
  heroItemTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#f2f1f4",
  },
  heroItemText: {
    fontSize: "1.1rem",
    color: "#f2f1f4",
  },
  searchInput: {
    border: "none",
    width: "100%",
    padding: "0 100px 0 17px",
    borderRadius: "50ch",
    backgroundColor: "#ffffff",
    "&::placeholder": {
      color: "#b8b8b8",
    },
  },
  searchIconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #ffffff",
    height: "41px",
    borderRadius: "50ch",
    width: 60,
    transition: "all 150ms ease",
    cursor: "pointer",
    position: "absolute",
    right: 0,
  },
  searchButtonColor: {
    backgroundColor: theme.palette.app.green800,
    "&:hover": {
      opacity: 0.8,
    },
    "&:active": {
      opacity: 0.8,
    },
  },
  searchIcon: {
    fontSize: "26px",
    color: "#ffffff",
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
  tryP: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 5,
    marginLeft: 16,
  },
  trySpan: {
    color: "#234",
    borderBottom: "1px solid #234",
    marginLeft: "7px",
    cursor: "pointer",
  },
  title: {
    fontSize: "2.2rem",
    marginBottom: 26,
    lineHeight: "3.3rem",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  titleDark: {
    color: "#35323e",
  },
  button: {
    width: "max-content",
    minWidth: "170px",
    padding: "10px 20px",
    marginTop: 10,
  },
  countsTitle: {
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 26,
    },
  },
  countsItems: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.down(768)]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "center",
    },
    [theme.breakpoints.down(500)]: {
      gridTemplateColumns: "1fr",
    },
  },
  countsItem: {
    padding: "36px 0",
    [theme.breakpoints.down(768)]: {
      padding: "20px 0",
      marginBottom: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },
  count: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    marginBottom: 20,
  },
  countLabel: {
    color: "#afa7d3",
    opacity: 0.6,
    fontWeight: "bold",
    fontSize: 14,
    [theme.breakpoints.down(768)]: {
      fontSize: 17,
    },
  },
  services: {
    padding: "4rem 0",
    color: "#35323e",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  },
  redColor: {
    color: "#e94160",
  },
  subTitle: {
    maxWidth: 1000,
    margin: "0 auto",
    lineHeight: "1.25",
    color: "#fafafa",
    fontSize: "1.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
      lineHeight: "1.4",
    },
  },
  advanced: {
    backgroundImage: `url(${background});`,
    padding: "6rem 3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 3rem 6rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2rem 1.5rem 3rem",
    },
  },
  advancedTitle: {
    marginBottom: "1.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    color: theme.palette.app.red500,
    fontWeight: 600,
    lineHeight: 1.125,
  },
  bomTitle: {
    textAlign: "start",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  bomText: {
    textAlign: "start",
    color: "#666666",
    fontSize: "1.2rem",
  },
  bomItemWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      margin: "2rem auto 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "1rem 0 1rem",
    },
  },
  advancedText: {
    color: theme.palette.app.blue500,
    fontSize: "1.2rem",
  },
  advancedImgWrapper: {
    boxShadow: "0px 0px 16px 0px rgb(34 60 80 / 20%)",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      margin: "2rem auto 0",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "2rem auto 0",
    },
  },
  img: {
    display: "block",
    width: "100%",
    borderRadius: 20,
  },
  workplace: {
    padding: "3rem 0",
    background: "#e55972",
  },
  imgWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "auto",
    },
  },
  workplaceTitle: {
    paddingBottom: "2rem",
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      paddingTop: "1rem",
    },
  },
  workplaceText: {
    textAlign: "center",
    fontSize: "19px",
    color: "#251c3d",
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "35px 0",
    },
  },
  workplaceListWrapper: {
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  actionWrapper: {
    textAlign: "start",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  workplaceListTitle: {
    marginBottom: "1em",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "start",
  },
  workplaceList: {
    color: "#fff",
    marginLeft: "2em",
    textAlign: "start",
  },
  workplaceListItem: {
    marginBottom: 5,
    fontSize: 16,
  },
  connect: {
    background: "radial-gradient(circle at top left, #372859 20%, #1d1530 50%)",
    padding: "6rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  },
  connectItem: {
    position: "relative",
    margin: 16,
    [theme.breakpoints.down("xs")]: {
      margin: 26,
    },
  },
  connectItemIndex: {
    position: "absolute",
    top: "40%",
    left: "-17px",
    transform: "translateY(-50%)",
    color: "#B3A8D9",
    fontSize: "130px",
    fontWeight: 900,
    fontFamily: "Roboto, Arial, sans-serif",
    opacity: 0.2,
  },
  connectItemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  connectItemText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  connectSubTitle: {
    marginBottom: 28,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  pcb: {
    background: "radial-gradient(circle at top left, #372859 20%, #1d1530 50%)",
    padding: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 0",
    },
  },
  pcbText: {
    fontSize: 18,
    color: "#B3A8D9",
    fontWeight: 700,
  },
  pcbList: {
    marginLeft: 32,
    "& > li": {
      marginBottom: 6,
    },
  },
  bom: {
    padding: "3rem 0",
    backgroundColor: "#fcf0f2",
  },
  partners: {
    padding: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 0",
    },
  },
  partnersText: {
    textAlign: "center",
    color: "#666666",
    fontSize: "1.2rem",
    maxWidth: "70%",
    margin: "0 auto 3rem",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none",
    },
  },
  partnersItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3rem",
    position: "relative",
  },
  partnerLogo: {
    transition: "all 320ms ease",
    width: 200,
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 120,
    },
  },
  partnerLink: {
    display: "flex",
    position: "relative",
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      "&:hover": {
        "& img": {
          filter: "grayscale(1) opacity(0.35)",
        },
        "& span": {
          opacity: 1,
        },
      },
    },
  },
  partnerArrow: {
    opacity: 0,
    position: "absolute",
    display: "flex",
    top: "50%",
    left: "-18px",
    transform: "translateY(-50%)",
    transition: "all 320ms ease",
    pointerEvents: "none",
    "& > svg": {
      fontSize: 16,
      color: "#c5c5c5",
      margin: 0,
      padding: 0,
      transform: "matrix(-1.00,0.00,0.00,1.00,0,0)",
    },
  },
  questComp: {
    width: 132,
    [theme.breakpoints.down("sm")]: {
      width: 110,
    },
  },
  rsOnline: {
    width: 120,
    [theme.breakpoints.down("sm")]: {
      width: 65,
    },
  },
  excess: {
    padding: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 0",
    },
  },
  excessTitle: {
    textAlign: "start",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  excessImgWrapper: {
    width: 235,
    height: 235,
    margin: "auto",
    backgroundImage: `url(${excess})`,
    backgroundSize: "110%",
    [theme.breakpoints.down("sm")]: {
      width: 150,
      height: 150,
      marginBottom: 15,
    },
  },
  excessTextWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      margin: "auto",
    },
  },
  registerButton: {
    marginTop: 25,
    marginLeft: 40,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  servicesTitle: {
    fontWeight: 400,
    color: theme.palette.app.red500,
    textAlign: "center",
    marginBottom: 25,
  },
  servicesItem: {
    padding: 22,
    color: "#5a546b",
    backgroundColor: "#f7f6f8",
    borderRadius: 20,
    textAlign: "center",
    height: "100%",
    "& > p": {
      textAlign: "start",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "12px 0",
    },
  },
  servicesIcon: {
    maxHeight: 75,
  },
  servicesItemTitle: {
    fontSize: "1.5rem",
  },
  contacts: {
    padding: "2rem 0",
    color: "#35323e",
  },
  contactsItemWrapper: {
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  contactsName: {
    fontWeight: 600,
    fontSize: "1.2rem",
    paddingBottom: "0.5rem",
  },
  contactsAddress: {
    paddingBottom: "0.5rem",
  },
  contactsLink: {
    color: theme.palette.app.red500,
    fontWeight: 600,
    marginBottom: 5,
    "&:hover": {
      color: theme.palette.app.red500,
      textDecoration: "underline",
    },
  },
  mapWrapper: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  mobileTopBar: {
    height: "auto",
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.primary.main,
    zIndex: 1000,
  },
}));

export default "styles";
