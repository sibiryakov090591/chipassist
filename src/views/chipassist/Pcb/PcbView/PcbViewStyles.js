import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  background: {
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  sectionTitle: {
    marginBottom: 20,
  },
  buttonBack: {
    padding: "17px 33px 17px 33px;",
    borderBottom: "2px solid #002e5c",
    borderRadius: 0,

    "&:hover": {
      backgroundColor: "inherit",
      color: "inherit",
    },

    "& .MuiButton-label": {
      top: 3,
      position: "relative",
    },
  },
  buttonAction: {
    "&:not(last-of-type)": {
      marginRight: 10,
    },
  },
});

export default "styles";
