import { makeStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

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
  approved: {
    display: "inline-flex",
    alignItems: "center",
    color: green[500],
  },
  price: {
    display: "inline-flex",
    borderRadius: 5,
  },
  goodPrice: {
    padding: "4px 10px",
    color: green[800],
    background: green[100],
  },
  badPrice: {
    padding: "4px 10px",
    color: red[800],
    background: red[100],
  },
}));

export default "styles";
