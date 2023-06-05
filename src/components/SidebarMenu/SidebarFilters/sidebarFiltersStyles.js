import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  sidebarFiltersWrapper: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto 80px",
    gridGap: 10,
    padding: 20,
  },
  filtersIcon: {
    height: 30,
  },
  sidebarFiltersToggle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    // padding: "0 10px 0 20px",
    width: 50,
    border: "1px solid #e3eaf1",
    borderRadius: 3,
    fontSize: 14,
    background: "#f6f9fb",
    color: theme.palette.app.grey500,
    textTransform: "uppercase",
    cursor: "pointer",
  },
  sidebarFiltersIcon: {
    transition: "all 0.2s",
    "&.is-active": {
      transform: "rotate(180deg)",
    },
  },
  sidebarFiltersContent: {
    position: "absolute",
    display: "grid",
    zIndex: 10,
    width: 320,
    height: "75vh",
    overflowY: "scroll",
    left: "100%",
    top: 0,
    padding: 20,
    background: theme.palette.white,
    boxShadow: "0 5px 30px 0 rgba(0,0,0,0.1)",
    visibility: "hidden",
    opacity: 0,
    gridTemplateColumns: "auto 80px",
    gridGap: 10,
    paddingTop: 15,
    transform: "translateX(-20px)",
    transition: "all 200ms",
    "&.right": {
      left: "auto",
      right: "100%",
      transform: "translateX(20px)",
    },
    "&.is-active": {
      visibility: "visible",
      opacity: 1,
      transform: "none",
    },
  },
  sidebarFiltersActions: {
    background: "#f8fcfd",
  },
}));

export default useStyles;
