import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  selectWrap: {
    display: "flex",
    alignItems: "center",
    width: 185,
    maxWidth: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& > div": {
      width: "100%",
    },
  },
  select: {
    height: "40px",
    borderRadius: 4,
    fontSize: 14,
  },
  selected: {
    borderRadius: "4px 0 0 4px",
  },
  selectGrayColor: {
    color: "#9c9c9c",
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    marginLeft: -1,
    borderRadius: "0 4px 4px 0",
    border: "1px solid rgba(0,0,0,0.15)",
    color: "#414141",
    background: "#f4f4f4",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      zIndex: 2,
      borderColor: theme.palette.app.red500,
      color: theme.palette.app.red500,
      background: "rgba(240,17,0,0.12)",
    },
  },
  clearBtnIc: {
    fontSize: 14,
    color: "inherit",
  },
}));

export default "styles";
