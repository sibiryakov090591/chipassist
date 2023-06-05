import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "37px",
    width: "100%",
    color: theme.palette.black,
    borderRadius: "3px",
    paddingRight: "13px",
    paddingLeft: "13px",
    lineHeight: "normal",
    textTransform: "none",
    fontWeight: 400,
    "&+ div": {
      width: "125%",
      minWidth: "280px",
      "@media screen and (min-width: 1700px)": {
        width: "100%",
      },
    },
  },
  buttonPromt: {
    color: "rgba(0, 0, 0, 0.38)",
    fontWeight: 500,
  },
  buttonText: {
    textAlign: "left",
  },
  buttonArrow: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "6px 4px 0 4px",
    borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
  },
  selectedCategory: {
    fontSize: 12,
    marginTop: 5,
  },
}));

export default "styles";
