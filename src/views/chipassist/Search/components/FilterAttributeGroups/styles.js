import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    minHeight: "37px",
    width: "100%",
    color: theme.palette.primary.main,
    borderRadius: "3px",
    paddingRight: "13px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    paddingLeft: "13px",
    lineHeight: "normal",
    "&:hover": {
      color: "#0e69cb",
      background: "#f9f9f9",
    },
    "&+ div": {
      width: "100%",
    },
  },
  selectedCategory: {
    fontSize: 12,
    marginTop: 5,
  },
}));

export default "styles";
