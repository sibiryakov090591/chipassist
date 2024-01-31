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
  pcb: {
    backgroundColor: "#21C483",
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
}));

export default useStyles;
