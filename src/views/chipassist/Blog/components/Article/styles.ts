import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    wrapper: {
      "& img": {
        objectFit: "cover",
      },
    },
    intro: {
      borderBottom: "1px solid #d4d4d4",
      padding: "8px 0 16px 0",
      marginBottom: 16,
    },
    paginationLink: {
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
  }),
);

export default "styles";
