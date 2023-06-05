import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  bomListPopover: {
    background: theme.palette.white,
    overflowY: "auto",
    boxShadow: "0 0 30px 0 rgba(0,0,0,0.2) !important",
    borderRadius: 5,
    width: "280px",
  },
  bomListPopoverHead: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
  bomListPopoverBody: {
    maxHeight: "60vh",
    overflowY: "auto",
  },
  bomListPopoverBtn: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 14px",
    background: "none",
    border: "none",
    textAlign: "left",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.secondary.light,
      color: theme.palette.primary.light,
    },
  },
  bomListPopoverResult: {
    padding: "10px 14px",
  },
  searchBomContainer: {
    borderTop: "1px solid rgba(0,0,0,0.1)",
    padding: "10px 14px",
  },
  searchBomInput: {
    backgroundColor: "hsl(0,0%,100%)",
    borderColor: "hsl(0,0%,80%)",
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: "default",
    width: "100%",
    minHeight: "38px",
    padding: "2px 8px",
  },
  bomFilteredResultEmpty: {
    padding: "10px 14px",
  },
  bomListCreateBomIcon: {
    fontSize: "17px",
    marginRight: "8px",
  },
}));

export default "styles";
