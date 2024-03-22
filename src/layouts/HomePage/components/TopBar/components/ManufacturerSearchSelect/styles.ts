import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  value: {
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "auto",
    },
  },
  removeButton: {
    cursor: "pointer",
    display: "flex",
    marginLeft: 5,
    "& svg": {
      fontSize: 18,
      transition: "180ms all ease",
      "&:hover": {
        color: "#eee",
      },
    },
  },
}));

export default "styles";
