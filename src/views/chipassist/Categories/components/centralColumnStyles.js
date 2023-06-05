import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    gridArea: "cont",
    width: "100%",
    padding: "2em",
    [theme.breakpoints.down("md")]: { padding: "1em" },
  },
}));

export default "styles";
