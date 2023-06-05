import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  resolveMergeModal: {
    width: "600px",
    padding: "20px 30px 30px 30px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  table: {
    fontSize: 12,
    "& th": {
      whiteSpace: "nowrap",
    },
    "& th, & td": {
      fontSize: "inherit",
      lineHeight: 1.2,
    },
  },
  btns: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: 10,
    },
  },
  skipBtn: {
    background: "#CFD8DC",
  },
  replaceBtn: {
    background: "#FFECB3",
    "&:hover": {
      background: "#FFE082",
    },
  },
  group: {
    padding: "20px",
    background: "#f2f4f5",
    borderRadius: 5,
  },
}));

export default "styles";
