import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: "3rem 0",
  },
  work: {
    backgroundColor: "#fafafa",
  },
  title: {
    padding: "2rem 0",
    margin: 0,
    color: "#446",
    fontSize: "2.3rem",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.1rem",
      padding: "1rem 0",
    },
  },
  paragraph: {
    color: "#444",
    fontSize: "1.4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  subText: {
    color: "#566",
    fontSize: "1rem",
  },
  workTitle: {
    textAlign: "center",
    paddingBottom: "1rem",
    margin: 0,
  },
  workText: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  imgWrapper: {
    height: "100%",
  },
  mapImg: {
    maxWidth: 650,
    width: "100%",
    padding: "0 3rem",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  heroCardsWrapper: {
    marginTop: "2rem",
  },
  heroCard: {
    padding: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 450,
      margin: "0 auto",
    },
  },
  heroCardTitle: {
    color: "#21C483",
    fontSize: "3rem",
    fontWeight: "bold",
    padding: "30px 0 25px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.7rem",
    },
  },
  heroCardText: {
    fontSize: 14,
  },
  workCard: {
    overflow: "hidden",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      maxWidth: 700,
      margin: "0 auto",
    },
  },
  workCardTitle: {
    backgroundColor: "#21C483",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "0.75rem 1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  workCardText: {
    padding: "1.5rem",
    fontSize: 16,
  },
  devicesImg: {
    maxWidth: 650,
    width: "100%",
    display: "block",
    margin: "0 auto",
  },
  manufacturers: {
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  manufacturersWrapper: {
    maxWidth: 600,
    margin: " 24px auto",
  },
  manufacturerName: {
    padding: "8px 16px",
    display: "inline-block",
    fontWeight: 600,
    fontSize: 20,
    whiteSpace: "nowrap",
    cursor: "pointer",
    color: "#818a93",
    transition: "all 0.2s",
    "&:hover": {
      color: "#456",
    },
  },
  partNumbers: {
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  partNumbersTitle: {
    "&:after": {
      content: "''",
      display: "block",
      margin: "16px auto 0",
      width: "140px",
      height: "3px",
      backgroundColor: theme.palette.app.green700,
    },
  },
  partNumbersWrapper: {
    maxWidth: 1000,
    textAlign: "start",
    columnCount: 4,
    margin: "24px auto",
    [theme.breakpoints.down("sm")]: {
      columnCount: 3,
    },
    [theme.breakpoints.down("xs")]: {
      columnCount: 2,
    },
  },
  partNumberName: {
    padding: "3px 12px 3px 40px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 12,
    },
    "& > a": {
      fontWeight: 600,
      fontSize: 16,
      whiteSpace: "nowrap",
      cursor: "pointer",
      color: "#456",
      borderBottom: "2px solid transparent",
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "#456",
      },
    },
  },
  pcb: {
    backgroundColor: theme.palette.app.green700,
  },
  pcbTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  pcbText: {
    color: "#ffffff",
  },
  boardImg: {
    maxWidth: 200,
    filter: "invert(100%)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 120,
    },
  },
  hero: {
    background: "linear-gradient(119.4deg, #015ed0ff 0%, #01D073 155%)",
    padding: "20px 0 40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 80px)",
      paddingTop: 0,
    },
  },
  heroMenu: {
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroMenuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  logoCont: {
    // marginRight: "60px",
    width: "190px",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  heroMenuLink: {
    fontSize: 16,
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
  headerLink: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
      color: "#fff",
    },
  },
  logoImg: {
    width: "100%",
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
    height: "45px",
    borderRadius: "50ch",
    width: 68,
    transition: "all 150ms ease",
    cursor: "pointer",
    position: "absolute",
    right: 0,

    [theme.breakpoints.down(1700)]: {
      height: 45,
      width: 68,
    },
    [theme.breakpoints.down("sm")]: {
      width: 60,
      height: "41px",
    },
  },
  searchButtonColor: {
    backgroundColor: "#16be9f",
    "&:hover": {
      opacity: 0.8,
    },
    "&:active": {
      opacity: 0.8,
    },
  },
  searchIcon: {
    fontSize: "32px",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
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
  tryP: {
    color: "rgba(255,255,255,0.66)",
    fontWeight: "normal",
    fontSize: 14,
    paddingTop: 10,
    marginLeft: 16,
  },
  trySpan: {
    color: "#fff",
    borderBottom: "1px solid #fff",
    marginLeft: "7px",
    cursor: "pointer",
  },
  heroSubTitle: {
    color: "#f2f1f4",
    fontSize: "1.7rem",
    lineHeight: "3.5rem",
    marginBottom: "1.6rem",
    display: "flex",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "1.5rem",
      textAlign: "center",
      justifyContent: "center",
      lineHeight: "normal",
      marginBottom: "3rem",
    },
  },
  heroTitle: {
    // color: "#f2f1f4",
    fontWeight: 600,
    fontSize: "3rem",
    paddingTop: "4.5rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: "2.3rem",
      lineHeight: "3rem",
      marginBottom: "2rem",
      paddingTop: 0,
    },
    [theme.breakpoints.up("sm")]: {
      fontFamily: "Montserrat",
    },
  },
  heroMainContentContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  heroItems: {
    marginTop: "3rem",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    maxWidth: 900,
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  heroItem: {
    padding: "12px 0",
    color: "#f2f1f4",
    maxWidth: 370,
    minWidth: 235,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      maxWidth: "none",
    },
  },
  heroItemTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#f2f1f4",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  heroItemText: {
    fontSize: "1.2rem",
    color: "#f2f1f4",
  },
  pcb_link: {
    color: "white",
    textDecoration: "underline",
    "&:hover": {
      color: "#ecebee",
      textDecoration: "underline",
    },
  },
  profileOptions: {
    border: "1px solid #fafafa",
    borderRadius: "34px",
    background: "#01cec0ff",
    padding: "5px 15px 6px",
  },
  underSearchText: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#f2f1f4",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
      fontWeight: 400,
      paddingTop: "10px",
    },
  },
}));

export default useStyles;
