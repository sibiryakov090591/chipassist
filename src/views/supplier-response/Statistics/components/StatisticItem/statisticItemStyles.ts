import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  row: {
    [theme.breakpoints.down("md")]: {
      "& > *": {
        padding: 6,
      },
    },
  },
  odd: {
    "& > *": {
      backgroundColor: "#f5f5f5",
    },
  },
  repliedData: {
    "& span": {
      fontSize: "0.94rem",
      color: "#345",
    },
  },
  strong: {
    fontWeight: "bold",
  },
  position: {
    // color: "#00c430",
  },
  lowPrice: {
    color: "#00c430",
  },
  biggerPrice: {
    color: "#fa4f4f",
  },
}));

export default "styles";