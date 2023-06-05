import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  baseFiltersItems: {
    "& > *:not(:last-child)": {
      marginBottom: 15,
    },
  },
  lastItem: {
    marginBottom: 15,
  },
}));

export default "styles";
