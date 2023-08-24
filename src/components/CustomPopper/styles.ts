import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1,
    backgroundColor: `${theme.palette.app.blue800}`,
    padding: "1em",
    borderRadius: "3px",
    color: `white`,
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.app.blue800} transparent transparent transparent`,
      },
    },
  },

  popperWrapper: {
    zIndex: 1,
    borderRadius: "3px",
    color: `white`,
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.app.blue800} transparent transparent transparent`,
      },
    },
  },

  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },

  closeIcon: {
    fontSize: "1em",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
