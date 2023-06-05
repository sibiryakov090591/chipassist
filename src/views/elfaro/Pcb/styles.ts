import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: "1.8rem",
    textAlign: "center",
    margin: "0 0 1rem 0",
  },
  subTitle: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: "normal",
    marginBottom: 40,
  },
  list: {
    listStyleType: "none",
  },
  listItem: {
    fontSize: 17,
    color: "#666666",
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },
  listIcon: {
    marginRight: 10,
    color: "#144261",
  },
  name: {
    color: "#144261",
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "center",
    padding: "1rem 0",
  },
  button: {
    color: "#144261",
    fontWeight: "bold",
    paddingLeft: 40,
    paddingRight: 40,
  },
  image: {
    width: "100%",
    maxWidth: 300,
    margin: "2rem 0 3rem 0",
    filter: "invert(39%) sepia(62%) saturate(552%) hue-rotate(152deg) brightness(99%) contrast(85%)",
  },
}));

export default "styles";
