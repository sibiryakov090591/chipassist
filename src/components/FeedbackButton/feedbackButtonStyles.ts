import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  feedbackButton: {
    cursor: "pointer",
    position: "fixed",
    bottom: 25,
    right: 90,
    height: 38,
    borderRadius: 5,
    padding: "5px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
    transition: "all 150ms ease-in",
  },
  buttonText: {
    fontSize: 16,
    textTransform: "uppercase",
    marginLeft: 10,
    paddingLeft: 10,
  },
  hideFeedbackButton: {
    opacity: 0,
  },
}));

export default "styles";
