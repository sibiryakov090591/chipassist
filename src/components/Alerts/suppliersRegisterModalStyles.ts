import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4),
      textAlign: "center",
      color: "rgba(0,0,0,0.7)",
      maxWidth: "92vw",
      overflowY: "auto",
      maxHeight: "92vh",
    },
    title: {
      margin: "0 0 8px",
      color: "#2a82a7",
      "& > a": {
        borderBottom: "1px solid",
        color: "#0081a7",
      },
    },
    description: {
      fontSize: 18,
      "& > a": {
        borderBottom: "1px solid",
        color: "#0081a7",
      },
    },
  }),
);

export default "styles";
