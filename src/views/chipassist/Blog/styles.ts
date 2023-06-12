import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "32px",
      paddingBottom: "36px",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
      },
    },
    header: {
      marginTop: 24,
      marginBottom: 16,
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
      "& h1": {
        marginBottom: 8,
      },
    },
    article: {
      backgroundColor: "#fff",
      border: "1px solid #fafafa",
      boxShadow: "0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)",
      color: "#4a4a4a",
      fontSize: 16,
      overflow: "hidden",
      borderRadius: "0.8rem",
      transition: "all 250ms ease",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      "& img": {
        width: "100%",
        height: 235,
        background: "#ffffff",
        objectFit: "cover",
      },
      "&:hover": {
        borderColor: "#535353",
      },
    },
    title: {
      color: "#345",
    },
    content: {
      padding: "1.4rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
    },
    searchInput: {
      borderRadius: "50ch",
      "& input::placeholder": {
        color: "#c6c6c6",
      },
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: 8,
      },
      "& svg": {
        cursor: "pointer",
        padding: 4,
        fontSize: 28,
        borderRadius: "50%",
        transition: "all 180ms ease",
        "&:hover": {
          background: "#f3f3f3",
        },
      },
    },
    link: {
      // fontStyle: "italic",
    },
    date: {
      fontStyle: "italic",
      fontSize: 12,
    },
  }),
);

export default "styles";
