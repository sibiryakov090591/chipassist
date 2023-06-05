import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    color: theme.palette.app.grey500,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
    fontSize: "14px",
    lineHeight: "1.42857",
  },
  breadcrumbSpan: {
    fontSize: "11px",
    margin: "0 3px",
  },
}));

export default "styles";
