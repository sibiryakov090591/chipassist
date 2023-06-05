import { createStyles, makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    description: {
      fontSize: "1.1rem",
    },
    progressCircle: {
      marginRight: 10,
      color: "white",
    },
  }),
);

export default "styles";
