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
  }),
);

export default "styles";
