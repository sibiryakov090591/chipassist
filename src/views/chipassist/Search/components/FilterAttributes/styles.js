import { makeStyles } from "@material-ui/styles";
import sliderPriceStyles from "@src/components/Filters/SliderPrice/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    height: "37px",
    color: theme.palette.primary.main,
    borderRadius: "3px",
    paddingRight: "13px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    paddingLeft: "13px",
    marginBottom: "7px",
    "&:hover": {
      color: "#0e69cb",
      background: "#f9f9f9",
    },
  },
  attributeButton: {
    padding: "6px 5px 6px 10px",
    color: theme.palette.app.grey500,
    background: "#f9f9f9",
    textDecoration: "none",
    fontSize: "14px",
    margin: "0 0   9px 0",
    borderRadius: "3px",
    "&:hover": {
      cursor: "pointer",
      background: "#f2f2f2",
    },
    "&+ div": {
      width: "100%",
    },
  },
  attributeButtonFlexContainer: {
    display: "flex",
    alignItems: "center",
  },
  isDisabled: {
    opacity: "0.5",
    filter: "grayscale(1)",
    "&:hover": {
      cursor: "default",
      background: "#f9f9f9",
    },
  },
  icon: {
    fontSize: "16px",
    margin: "0 5px 0 0",
    alignSelf: "flex-start",
    padding: "1px 3px 2px 0;",
    borderRadius: "12px",
    color: theme.palette.primary.main,
    height: "24px",
    transition: "color 200ms ease",
    "&:hover": {
      color: "#FE4A49",
    },
  },
  iconRemove: {
    display: "inline-flex !important",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    fontSize: "12px",
    margin: "2px 0 0 5px",
    "&:hover": {
      background: "rgba(255,97,95,0.25)",
      color: "#ff615f",
      borderColor: "#ff615f",
    },
    borderRadius: "5px",
    color: "#FE4A49",
    height: "18px",
    width: "18px",
  },
  attributeContainer: {
    display: "block",
  },
  attributeName: {},
  attributeValue: {
    display: "inline-flex",
    alignItems: "center",
    padding: "1px 5px 1px 8px",
    border: "2px solid #FE4A49",
    borderRadius: "7px",
    fontSize: 12,
  },
  attributeValueDiv: {
    marginTop: 3,
    fontSize: 11,
    marginLeft: 4,
  },
  baseFiltersItems: {
    "& > *:not(:last-child)": {
      marginBottom: 15,
    },
  },
  ...sliderPriceStyles,
}));

export default "styles";
