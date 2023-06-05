import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  search: {
    position: "relative",
    borderRadius: 3,
    // overflow: "hidden",
    height: 41,
    padding: "0",
    display: "flex",
    alignItems: "center",
    width: "100%",
    // marginTop: '5px'
    zIndex: 200,
    "& .suggestion_search": {
      backgroundColor: "transparent",
    },
  },
}));

export default "styles";
