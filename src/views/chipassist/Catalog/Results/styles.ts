import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    preloader: {
      paddingTop: 80,
    },
    wrapper: {
      padding: "2em",
    },
    resultsWrapper: {
      marginTop: 20,
    },
    upcWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr) )",
      borderLeft: `1px solid ${theme.palette.app.grey400}`,
      borderTop: `1px solid ${theme.palette.app.grey400}`,
    },
    upc: {
      borderBottom: `1px solid ${theme.palette.app.grey400}`,
      borderRight: `1px solid ${theme.palette.app.grey400}`,
      fontStyle: "italic",
      textDecoration: "underline",
      "& > td": {
        border: "none",
        wordBreak: "break-word",
      },
    },
    categoryNotFound: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 250,
    },
    notFound: {
      textAlign: "center",
      padding: 30,
    },
    link: {
      "&:hover": {
        textDecoration: "underline",
      },
    },
    disabledLink: {
      color: theme.palette.app.grey500,
    },
    categoryWrapper: {
      backgroundColor: theme.palette.app.grey100,
      padding: 20,
      marginTop: 15,
      minWidth: 200,
      display: "inline-block",
    },
    categoryTitle: {
      fontWeight: "bold",
      fontSize: 18,
    },
    categoryLink: {
      color: theme.palette.app.grey500,
      "&:hover": {
        textDecoration: "underline",
        color: theme.palette.app.grey500,
      },
    },
    depth2Wrapper: {
      marginLeft: 10,
      marginTop: 5,
      fontSize: 16,
    },
    depth3Wrapper: {
      marginLeft: 10,
      lineHeight: "18px",
      fontSize: 12,
    },
  }),
);

export default "styles";
