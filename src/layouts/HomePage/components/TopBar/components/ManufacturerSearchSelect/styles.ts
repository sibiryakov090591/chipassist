import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  value: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  removeButton: {
    cursor: "pointer",
    display: "flex",
    marginLeft: 3,
    "& svg": {
      fontSize: 16,
    },
  },
}));

export default "styles";
