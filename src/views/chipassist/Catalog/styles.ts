import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import constants from "@src/constants/constants";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    preloader: {
      paddingTop: 80,
    },
    titleWrapper: {
      marginTop: 20,
    },
    title: {
      color: constants.id === ID_ICSEARCH ? theme.palette.app.green700 : theme.palette.app.red500,
      fontSize: 30,
      textAlign: "center",
    },
    subTitle: {
      textAlign: "center",
      fontSize: 20,
      marginTop: 0,
    },
    catalogTitle: {
      fontSize: 18,
      marginTop: 40,
      marginBottom: 0,
      textDecoration: "underline",
    },
    categoriesWrapper: {
      columnCount: 5,
      [theme.breakpoints.down("lg")]: {
        columnCount: 4,
      },
      [theme.breakpoints.down("md")]: {
        columnCount: 3,
      },
      [theme.breakpoints.down("sm")]: {
        columnCount: 2,
      },
      [theme.breakpoints.down("xs")]: {
        columnCount: 1,
      },
    },
    categoryWrapper: {
      backgroundColor: theme.palette.app.grey100,
      padding: 20,
      marginTop: 15,
      width: "100%",
      display: "inline-block",
    },
    categoryLink: {
      color: theme.palette.app.grey500,
      "&:hover": {
        textDecoration: "underline",
        color: theme.palette.app.grey500,
      },
    },
    depth1Name: {
      fontWeight: "bold",
      fontSize: 20,
    },
    depth2Name: {
      fontSize: 18,
    },
    depth3Name: {
      fontSize: 16,
    },
    depth4Name: {
      fontSize: 14,
    },
    depth5Name: {
      fontSize: 12,
    },
    depth2Wrapper: {
      margin: "5px 0 0 10px",
      lineHeight: "22px",
    },
    depth3Wrapper: {
      margin: "5px 0 5px 10px",
      lineHeight: "20px",
    },
    depth4Wrapper: {
      margin: "5px 0 5px 20px",
      lineHeight: "18px",
    },
    depth5Wrapper: {
      margin: "5px 0 5px 20px",
      lineHeight: "18px",
    },
    underline: {
      textDecoration: "underline",
    },
  }),
);

export default "styles";
