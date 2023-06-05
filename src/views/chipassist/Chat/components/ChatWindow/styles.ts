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
        "&.detailsActive": {
          paddingRight: "25vw",
        },
      },
      [theme.breakpoints.down("md")]: {
        "&.chatListActive": {
          transform: "translateX(35vw)",
        },
      },
      [theme.breakpoints.down("sm")]: {
        "&.chatListActive": {
          transform: "translateX(48vw)",
        },
      },
      [theme.breakpoints.down("xs")]: {
        "&.detailsActive": {
          transform: "translateX(-48vw)",
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
    upc: {
      fontSize: 22,
      color: "#262626",
      marginBottom: 4,
    },
    seller: {
      color: "#737373",
      fontSize: 12,
    },
    showDetailsIcon: {
      cursor: "pointer",
      fontSize: 30,
    },
  }),
);

export default "styles";
