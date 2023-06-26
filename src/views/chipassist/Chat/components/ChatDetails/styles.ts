import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    rightColumn: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      transform: "translateX(100%)",
      transition: "transform 550ms cubic-bezier(0.25, 1, 0.5, 1)",
      borderLeft: "1px solid #D4D4D4",
      width: "25vw",
      background: "#ffffff",
      pointerEvents: "none",
      "&.active": {
        transform: "translateX(0)",
        pointerEvents: "auto",
      },
      [theme.breakpoints.down("md")]: {
        width: "35vw",
      },
      [theme.breakpoints.down(800)]: {
        width: "100%",
        borderLeft: "none",
      },
    },
    header: {
      minHeight: 80,
      padding: "12px 20px",
      borderBottom: "1px solid #D4D4D4",
      "& > h2": {
        fontSize: 22,
        color: "#345",
        marginBottom: 4,
      },
    },
    closeIcon: {
      cursor: "pointer",
    },
    details: {
      overflowY: "auto",
      padding: 20,
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#ffffff",
      },
    },
    requestCard: {
      color: "#A3A3A3",
      background: "#F5F5F5",
      borderRadius: 8,
      padding: 12,
      "& h5": {
        marginTop: 16,
        marginBottom: 4,
      },
    },
    requestTitle: {
      margin: 0,
      color: "#525252",
      fontSize: 18,
    },
    requestData: {
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  }),
);

export default "styles";
