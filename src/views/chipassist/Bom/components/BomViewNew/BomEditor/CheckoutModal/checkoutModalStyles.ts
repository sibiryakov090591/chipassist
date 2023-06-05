import { createStyles, makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    description: {
      fontSize: "1.1rem",
    },
    list: {
      color: "#444",
      fontSize: "0.9rem",
      paddingLeft: "3rem",
    },
    hint: {
      paddingTop: "1rem",
    },
  }),
);

export default "styles";
