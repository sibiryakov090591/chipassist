import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  title: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.8rem",
    textAlign: "center",
    marginTop: 0,
  },
  subTitle: {
    textAlign: "center",
    fontSize: "1.1rem",
  },
  text: {
    textAlign: "center",
  },
  itemsContainer: {
    marginTop: 40,
    marginBottom: 40,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "4rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  item: {
    textAlign: "center",
  },
  iconWrapper: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 14,
    maxWidth: 400,
    padding: 20,
    margin: "0 auto 2rem",
  },
  icon: {
    filter: "invert(100%)",
    maxWidth: 200,
  },
  itemTitle: {
    color: "#444444",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
}));

export default "styles";
