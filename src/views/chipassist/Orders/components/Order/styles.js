import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  deleteBom: {
    marginLeft: 10,
    width: 100,
    transition: "all 0.2s",
    cursor: "pointer",
  },
  trSelected: {
    background: `${theme.palette.secondary.light} !important`,
  },
  odd: {
    "& > *": {
      background: theme.palette.app.grey100,
    },
  },
  actionRow: {
    "& > *": {
      marginRight: 15,
    },
  },
}));

export default "styles";
