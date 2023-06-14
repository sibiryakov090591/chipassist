import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    container: {
      paddingTop: "2rem",
      paddingBottom: "2rem",
      display: "flex",
    },
    content: {
      flexGrow: 1,
    },
    wrapper: {
      "& img": {
        objectFit: "cover",
      },
    },
    title: {
      fontSize: "2.6rem",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-around",
      padding: "42px 0 24px 0",
      gap: "16px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    paginationLink: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 235,
      color: theme.palette.app.blue300,
      textDecoration: "underline",
      "&:hover": {
        color: theme.palette.app.blue300,
        textDecoration: "underline",
      },
      "&:active": {
        color: theme.palette.app.blue300,
        textDecoration: "underline",
      },
      "&:focus": {
        color: theme.palette.app.blue300,
        textDecoration: "underline",
      },
      "&.disabled": {
        color: "#8a8a8a",
        cursor: "no-drop",
        "&:hover": {
          color: "#8a8a8a",
          textDecoration: "underline",
        },
      },
    },
    list: {
      maxWidth: 250,
      minWidth: 200,
      marginLeft: 24,
      position: "sticky",
      top: 95,
      height: "100%",
    },
    listItem: {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: "8px 12px",
      cursor: "pointer",
      borderTop: "1px solid #eee",
      transition: "all 180ms ease",
      "&:last-child": {
        borderBottom: "1px solid #eee",
      },
      "&:hover": {
        background: "#f8f8f8",
      },
      "&.active": {
        background: "#eee",
      },
    },
  }),
);

export default "styles";
