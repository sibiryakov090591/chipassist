import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  modalContent: {
    padding: "20px 30px 30px 30px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  fields: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: 10,
  },
  controls: {
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
  error: {
    color: "red",
  },
}));

export default "styles";
