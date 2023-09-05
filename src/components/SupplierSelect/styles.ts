import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  supplier: {
    margin: "12px 0",
    fontWeight: 400,
    color: "#434343",
    "&.flexible": {
      display: "flex",
      alignItems: "center",
    },
  },
  partnerSelect: {
    margin: "0 6px",
    "& .MuiSelect-select": {
      fontWeight: "bold",
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      "& > div": { margin: 0 },
    },
  },
}));

export default "styles";
