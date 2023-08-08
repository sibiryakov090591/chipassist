import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
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
