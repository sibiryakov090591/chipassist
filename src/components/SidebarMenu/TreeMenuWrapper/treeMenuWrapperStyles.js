import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  toggleTreeMenu: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    padding: "0 10px 0 20px",
    width: "100%",
    border: "1px solid #e3eaf1",
    borderRadius: 3,
    fontSize: 14,
    background: "#f6f9fb",
    color: theme.palette.app.grey500,
    textTransform: "uppercase",
    cursor: "pointer",
  },
  treeMenuMobile: {
    margin: "0 -20px",
  },
  treeMenuDesktop: {
    position: "absolute",
    zIndex: 2,
    width: 320,
    left: "100%",
    top: 0,
    padding: "30px 0 20px 20px",
    background: theme.palette.white,
    boxShadow: "0 5px 30px 0 rgba(0,0,0,0.1)",
    visibility: "hidden",
    transform: "translateX(-20px)",
    opacity: 0,
    transition: "all 0.2s",
    "&.right": {
      left: "auto",
      right: "100%",
      transform: "translateX(20px)",
      padding: "30px 20px 20px 0",
    },
    "&.is-active": {
      visibility: "visible",
      opacity: 1,
      transform: "none",
    },
  },
  closeBtn: {
    position: "sticky",
    zIndex: 2,
    left: 0,
    top: 30,
    marginLeft: -20,
    padding: 0,
    width: 20,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#d8d3d3",
    color: theme.palette.white,
    border: "none",
    cursor: "pointer",
    "&.right": {
      left: "auto",
      right: 0,
      marginLeft: "100%",
      "& > *": {
        transform: "rotate(180deg)",
      },
    },
    "& + *": {
      marginTop: -80,
    },
  },
}));

export default "styles";
