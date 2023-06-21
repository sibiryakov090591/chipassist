import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  topMenu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
    },
  },
  topMenuMobile: {
    flexDirection: "column",
    marginTop: "10px",
  },
  topMenuItem: {
    margin: "0 10px 0 10px",
    cursor: "pointer",
    "@media screen and (min-width: 2000px)": {
      margin: "0 30px 0 30px",
    },
  },
  topMenuItemMobile: {
    margin: "10px 10px 10px 5px",
  },
  topMenuItemLink: {
    transition: "all 150ms ease",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    color: theme.palette.white,
    padding: "3px 9px",
    borderRadius: "50ch",
    lineHeight: "14px",
    position: "relative",
    "&:hover": {
      color: theme.palette.app.blue500,
      backgroundColor: "#e8e8e8",
    },
  },
  active: {
    color: theme.palette.app.blue500,
    backgroundColor: "#e8e8e8",
  },
  topMenuItemIcon: {
    marginRight: 5,
  },
  chatUnreadCount: {
    position: "absolute",
    top: "-7px",
    left: "85%",
  },
}));

export default "styles";
