import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    rightColumn: {
      zIndex: 1,
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
    text: {
      color: "#456",
      fontSize: 14,
    },
    closeIcon: {
      cursor: "pointer",
    },
    details: {
      overflowY: "auto",
      padding: 10,
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
        // marginTop: 16,
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
        gap: "16px",
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      "& > div": {
        padding: 5,
      },
    },
    label: {
      fontWeight: "bold",
      marginBottom: 2,
      color: "#456",
    },
    updateButton: {
      width: "100%",
      textTransform: "none",
      fontSize: "1.1rem",
    },
    priceButton: {
      width: "100%",
      textTransform: "none",
      fontSize: "1.1rem",
      "& .MuiButton-label": {
        justifyContent: "space-between",
      },
    },
    priceArrow: {
      marginLeft: 6,
      "&.active": {
        transform: "rotate(180deg)",
      },
    },
    animation: {
      animation: "glow 1s",
    },
    input: {
      width: "100%",
    },
    fieldHint: {
      "& fieldset": {
        boxShadow: "0px 0px 6px 3px #7bb4c5",
      },
    },
    popper: {
      position: "absolute",
      right: "102%",
      bottom: "50%",
      transform: "translateY(50%)",
      backgroundColor: theme.palette.app.blue700,
      minWidth: 200,
      animation: "fadeIn 1.5s",
      padding: 16,
      color: "#ffffff",
      "&::before": {
        content: '""',
        position: "absolute",
        marginRight: "-0.71em",
        bottom: "50%",
        right: 1,
        width: 10,
        height: 10,
        backgroundColor: theme.palette.app.blue700,
        boxShadow: theme.shadows[1],
        transform: "translate(-50%, 50%) rotate(45deg)",
        clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
      },
    },
  }),
);

export default "styles";
