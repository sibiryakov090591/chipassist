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
  },
}));

export const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({
    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
    color: "black",
  }),
};
