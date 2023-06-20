import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { scrollbarWidth } from "@src/config";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  banner: {
    marginTop: 85,
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      marginTop: 130,
    },
  },
  container: {
    width: "100vw",
    marginTop: 24,
    paddingRight: `${scrollbarWidth}px`,
    display: "flex",
    flex: "1 1 auto",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
    },
  },
  content: {
    flex: "1 1 auto",
    maxWidth: "100%",
  },
}));

export default "styles";
