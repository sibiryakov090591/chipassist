import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  dropIcon: {
    // width: "17px",
    // height: "17px",
    // color: "#f0f0f0",
  },
  accountSpan2: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: "15px",
    fontWeight: "700",
    color: "#fff",
    whiteSpace: "nowrap",
  },
  accountSpan1: {
    fontSize: "12px",
    lineHeight: "13px",
    height: "14px",
    fontWeight: "400",
    marginTop: "9px",
    color: "#ccc",
  },
  supplierAccSpan1: {
    fontSize: "12px",
    lineHeight: "13px",
    height: "14px",
    fontWeight: "400",
    marginTop: "9px",
    color: "rgb(51, 68, 85)",
  },
  supplierAccSpan2: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: "15px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    color: "rgb(51, 68, 85)",
  },
  accountButton: {
    marginLeft: "7px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  authButton: {
    marginLeft: "45px",
    padding: "0 12px",
    minHeight: 36,
    textTransform: "inherit",
    whiteSpace: "nowrap",
    border: "1px solid",
    transition: "all 250ms ease",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "7px",
    },
  },
  supplierAuthButton: {
    color: "#345",
    borderColor: "#345",
    marginLeft: "45px",
    padding: "0 12px",
    minHeight: 36,
    textTransform: "inherit",
    whiteSpace: "nowrap",
    border: "1px solid",
    transition: "all 250ms ease",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "7px",
    },
    "&:hover": {
      backgroundColor: "#e3e3e3",
    },
  },
  notAuthButton: {
    color: "#ccc",
    marginLeft: "45px",
    textTransform: "inherit",
    lineHeight: "18px",
    padding: "0 0 0 0",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  accountIcon: {
    marginLeft: "7px",
  },
  menuList: {
    "& a": {
      color: "inherit",
    },
  },
  avatarWrapper: {
    width: "21px",
    height: "21px",
    borderRadius: "50%",
    overflow: "hidden",
    marginLeft: "7px",
  },
  avatarImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
}));

export default "styles";
