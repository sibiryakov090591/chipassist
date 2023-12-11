import { AppTheme } from "@src/themes/AppTheme";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  contentBar: {
    display: "grid",
    gridTemplateColumns: "20fr 60fr 20fr",
    paddingBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "10fr 80fr 10fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "0fr 100fr 0fr",
    },
  },
  contentBarLeft: {
    justifySelf: "left",
  },
  contentBarCenter: {
    marginTop: "3rem",
    justifySelf: "center",
    width: "100%",
  },
  contentBarRight: {
    justifySelf: "right",
  },
  searchContainer: {
    display: "flex",
  },
  searchIconButton: {
    width: "40px",
    border: "1px solid #287c9f",
    background: "#287c9f",
    textAlign: "center",
    color: "#fff",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
    paddingTop: "7px",
  },
  searchIcon: {
    fontSize: "26px",
    fillter: "#fff",
  },
  searchInput: {
    width: "100%",
    border: "2px solid #287c9f",
    borderRight: "none",
    padding: "6px 43px 6px 9px",
    height: "41px",
    borderRadius: "5px 0 0 5px",
    outline: "none",
    color: "#555555",
    fontSize: "1rem",
  },
  tryText: {
    color: "#ffffff",
    fontSize: "13px",
    paddingTop: 3,
    paddingLeft: 5,
  },
  tryPn: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    paddingLeft: "7px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  clearSearchIcon: {
    position: "absolute",
    right: 50,
    color: theme.palette.app.grey400,
    cursor: "pointer",
    transition: "color 300ms ease",
    "&:hover": {
      color: theme.palette.app.grey500,
    },
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#287c9f",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    textAlign: "center",
    marginRight: "2rem",
    marginTop: "-10px",
  },
  cartIcon: {
    fontSize: "24px",
    filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(7deg) brightness(112%) contrast(101%)",
  },
}));

export default "styles";
