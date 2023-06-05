import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    overflowX: "auto",
  },
  tab: {
    minHeight: 60,
    "& .MuiTab-wrapper": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      fontSize: 14,
    },
    "& svg": {
      margin: "0 5px 0 0 !important",
    },
  },
  bomContainer: {
    padding: "20px 32px 32px",
    [theme.breakpoints.down("sm")]: {
      padding: 15,
    },
  },
}));

export default "styles";
