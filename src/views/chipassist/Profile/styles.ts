import { makeStyles } from "@material-ui/styles";
import { colors, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "2em",
    [theme.breakpoints.down("md")]: { padding: "1em" },
    [theme.breakpoints.down("sm")]: { padding: "1em 0" },
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
  uploadButton: {
    minWidth: 250,
    position: "relative",
    "& svg": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: 14,
    },
  },
}));

export default "styles";
