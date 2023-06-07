import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "24px",
      paddingBottom: "36px",
      [theme.breakpoints.down("sm")]: {
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
      borderRadius: "0.25rem",
      boxShadow: "0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)",
      color: "#4a4a4a",
      fontSize: 16,
      padding: "1.5rem",
      "& img": {
        width: 180,
        height: "max-content",
        float: "left",
        marginRight: 8,
        borderRadius: 12,
        background: "#ffffff",
        objectFit: "cover",
        [theme.breakpoints.down(420)]: {
          float: "none",
          marginRight: 0,
          marginBottom: 12,
        },
      },
    },
    content: {
      [theme.breakpoints.down(420)]: {
        display: "flex",
        flexDirection: "column",
      },
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
