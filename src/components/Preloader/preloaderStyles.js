import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  preloader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  preloaderCircle: {
    content: '""',
    width: 50,
    height: 50,
    marginBottom: 10,
    border: `2px solid ${theme.palette.primary.light}`,
    borderLeftColor: "#efefef",
    borderRadius: "50%",
    animation: `$rotating 0.8s infinite linear`,
  },
  preloaderTitle: {
    fontWeight: 500,
  },
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(359deg)",
    },
  },
}));

export default "styles";
