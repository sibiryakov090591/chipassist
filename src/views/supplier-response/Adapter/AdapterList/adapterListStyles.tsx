import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  tableHeaders: {
    "& > *": {
      fontWeight: "bold",
    },
  },
}));

export default "styles";
