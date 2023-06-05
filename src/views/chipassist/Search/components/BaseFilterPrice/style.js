import { makeStyles } from "@material-ui/styles";
import sliderPriceStyles from "@src/components/Filters/SliderPrice/styles";

export const useStyles = makeStyles(() => ({
  baseFiltersItems: {
    "& > *:not(:last-child)": {
      marginBottom: 15,
    },
  },
  ...sliderPriceStyles,
}));

export default "styles";
