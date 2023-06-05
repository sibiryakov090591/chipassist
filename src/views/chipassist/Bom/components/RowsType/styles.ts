import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  orderBy: {
    display: "flex",
    alignItems: "center",
    "&:not(:first-child)::before": {
      content: `""`,
      height: "19px",
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      paddingLeft: "7px",
    },
  },
  orderButton: {
    fontSize: "12px",
    height: 30,
    whiteSpace: "nowrap",
  },
  viewsFIcon: {
    fontSize: "14px",
    color: theme.palette.primary.main,
  },
  value: {
    transition: "all 0.2s",
  },
  highlight: {
    marginLeft: 5,
    background: "#ffcf33",
    borderRadius: 5,
    padding: "0.2em 0.6em",
  },
}));

export default "styles";
