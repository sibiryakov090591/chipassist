import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  productSelectModal: {
    width: "400px",
    padding: "20px 30px 30px 30px",
  },
  trTitle: {
    minWidth: 200,
  },
  name: {
    width: "100%",
  },
  mainAction: {
    marginLeft: 10,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  mainHidden: {
    opacity: 0,
    visibility: "hidden",
  },
  copying: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '""',
      width: 40,
      height: 40,
      marginBottom: 10,
      border: `2px solid ${theme.palette.primary.light}`,
      borderLeftColor: "#efefef",
      borderRadius: "50%",
      animation: `$rotating 0.8s infinite linear`,
    },
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
