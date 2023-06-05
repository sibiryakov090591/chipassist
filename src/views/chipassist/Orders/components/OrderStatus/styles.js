import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "37px",
    width: "100%",
    borderRadius: "3px",
    paddingRight: "13px",
    paddingLeft: "13px",
    lineHeight: "normal",
    textTransform: "none",
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
    marginLeft: "13px",
  },
  selectedCategory: {
    fontSize: 12,
    marginTop: 5,
  },
}));

export const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({
    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
    color: "black",
  }),
};
