import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
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
}));

export default "styles";
