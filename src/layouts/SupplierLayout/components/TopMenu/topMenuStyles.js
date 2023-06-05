import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  topMenu: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
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
    textTransform: "uppercase",
    transition: "all 150ms ease",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    color: theme.palette.white,
    padding: "4px 9px",
    lineHeight: "14px",
    borderRadius: "50ch",
    "&:hover": {
      color: theme.palette.app.blue500,
      backgroundColor: "#eee",
    },
    "&.active": {
      color: theme.palette.app.blue500,
      backgroundColor: "#eee",
    },
  },
  topMenuItemIcon: {
    marginRight: 5,
  },
}));

export default "styles";
