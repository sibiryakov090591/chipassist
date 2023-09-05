import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    middleColumn: {
      transition: "all 550ms cubic-bezier(0.25, 1, 0.5, 1)",
      position: "relative",
      display: "flex",
      flexGrow: 1,
      "& > div:first-child": {
        flexGrow: 1,
      },
      [theme.breakpoints.up("lg")]: {
        "&.chatListActive": {
          paddingLeft: "25vw",
        },
        "&.detailsActive": {
          paddingRight: "25vw",
        },
      },
      [theme.breakpoints.between("sm", "md")]: {
        "&.chatListActive": {
          paddingLeft: "35vw",
        },
        "&.detailsActive": {
          paddingRight: "35vw",
        },
      },
      [theme.breakpoints.between(800, "sm")]: {
        "&.chatListActive": {
          paddingLeft: "335px",
        },
      },
      [theme.breakpoints.down(800)]: {
        "&.detailsActive": {
          transform: "translateX(-48vw)",
        },
        "&.chatListActive": {
          transform: "translateX(48vw)",
        },
      },
    },
    header: {
      minHeight: 80,
      padding: "12px 20px",
      borderBottom: "1px solid #D4D4D4",
    },
    headerInfo: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
      },
    },
    title: {
      fontSize: 22,
      color: "#345",
      marginBottom: 4,
    },
    seller: {
      color: "#737373",
      fontSize: 12,
    },
    customer: {
      fontSize: 14,
      color: "#456",
      "& span": {
        fontWeight: "bold",
        textDecoration: "underline",
      },
    },
    showDetailsIcon: {
      cursor: "pointer",
      fontSize: 30,
    },
  }),
);

export default "styles";
