import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    main: {
      height: "100%",
      background: "white",
    },
    categoryRow: {},
    categoryCont: {},
    searchPageLayout: {
      display: "grid",
      gridGap: 20,
      gridTemplateColumns: "350px 1fr 350px",
      gridTemplateAreas: "'fil cont cont'",
      [theme.breakpoints.down("md")]: {
        gridTemplateAreas: "'cont cont cont'",
        gridTemplateColumns: "1fr 1fr 1fr",
        paddingLeft: "2em",
        flexDirection: "initial",
      },
      position: "relative",
      "&.hideFilters": {
        paddingLeft: "2em",
        gridTemplateAreas: "'cont cont cont'",
      },
      "&.right.hideFilters": {
        paddingLeft: 0,
        paddingRight: "2em",
      },
      "&.removeFilters": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    searchPageSidebar: {
      transition: "all 200ms ease",
      transform: "translateX(2em)",
      paddingRight: 20,
      gridArea: "fil",
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        zIndex: 2,
        padding: 0,
      },
      "&.hideFilters": {
        position: "absolute",
        top: 0,
        left: "calc(-350px - 2em)",
        bottom: 0,
        width: "350px",
      },
      "&.right": {
        transform: "translateX(-2em)",
        "&.hideFilters": {
          position: "absolute",
          top: 0,
          left: "auto",
          right: "calc(-350px - 2em)",
          bottom: 0,
          width: "350px",
        },
      },
    },
    rightPosition: {
      gridTemplateAreas: "'cont cont fil'",
    },
    searchPageResults: {
      width: "100%",
      gridArea: "cont",
    },
    stickyContainer: {
      minHeight: "auto !important",
      "& > div": {
        zIndex: 100,
        "&.sticky": {
          left: 0,
          right: 0,
          width: "100% !important",
          "& > div": {
            backgroundColor: "#f8f8f8",
            boxShadow: "0px 1px 0px #f0f0f0",
            width: "100vw",
            paddingRight: 16,
          },
        },
      },
    },
    stickyContainerMarginDesktop: {
      "& > div": {
        "&.sticky": {
          marginTop: 80,
        },
      },
    },
    stickyContainerMarginMobile: {
      "& > div": {
        "&.sticky": {
          marginTop: 133,
        },
      },
    },
    searchResultEmpty: {
      marginTop: 50,
      textAlign: "center",
    },
    hintText_1: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.palette.primary.main,
    },
    hintText_2: {
      fontSize: "1.2rem",
      marginBottom: 20,
      fontWeight: "bold",
      color: theme.palette.app.red500,
    },
    link: {
      textDecoration: "underline",
    },
    rfqHeader: {
      "& > span": {
        color: "#0081a7",
      },
    },
    rfqText: {
      textAlign: "center",
      maxWidth: 430,
      margin: "0 auto",
      marginBottom: 12,
    },
    allHeaderCont: {
      display: "flex",
    },
    allHeader: {
      fontWeight: 700,
      fontSize: "14px",
      textDecoration: "underline",
      padding: "0 5px 0 0",
      marginBottom: "7px",
    },
    allHeaderIcon: {
      fontWeight: 400,
      fontSize: "14px",
      marginTop: "1px",
    },
    categoriesUl: {},
    categoriesRow: {
      listStyleType: "none",
      marginBottom: "3px",
    },
    categoriesSpan: {
      fontWeight: 400,
      fontSize: "14px",
      margin: "0 0 0 7px",
      textDecoration: "dotted",
      borderBottom: "1px dotted #666666",
    },
    categoriesCount: {
      marginLeft: "3px",
      fontWeight: 400,
      fontSize: "12px",
    },
    filtersRow: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "15px",
    },
    attributeButton: {
      padding: "3px 5px",
      color: theme.palette.app.grey500,
      background: theme.palette.white,
      textDecoration: "none",
      fontSize: "14px",
      margin: "0 15px 9px 0",
      borderBottom: "2px solid #3472bc",
      borderRadius: "3px 3px 0 0",
      "&:hover": {
        cursor: "pointer",
        background: "#f2f2f2",
      },
    },
    counterValue: {
      paddingRight: "7px",
      fontWeight: 700,
    },
    counters: {
      display: "flex",
      alignItems: "center",
    },
    viewsChoice: {
      display: "flex",
      marginTop: "1 0px",
    },
    viewsPrices: {
      padding: "5px 13px 7px 7px",
      background: theme.palette.white,
      color: theme.palette.app.grey500,
      border: `1px solid ${theme.palette.app.grey300}`,
      fontSize: "15px",
    },
    viewsSpecs: {
      padding: "5px 13px 7px 7px",
      fontSize: "15px",
      color: theme.palette.app.grey500,
      border: `1px solid ${theme.palette.app.grey300}`,
    },
    viewsPricesIcon: {
      fontSize: "16px",
      margin: "0 0 -3px 0",
    },
    viewsCurrency: {
      display: "flex",
      fontSize: "14px",
      lineHeight: "20px",
      padding: "0 14px 0 14px",
      alignItems: "center",
    },
    viewsCText: {
      color: "#a4a4a4",
      marginRight: "4px",
    },
    viewsCVal: {
      color: theme.palette.primary.main,
    },
    viewsCIcon: {
      fontSize: "16px",
      margin: "2px 0 0px 0",
      color: theme.palette.primary.main,
    },
    active: {
      borderColor: theme.palette.black,
    },
    pointer: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    paginationBlock: {
      margin: "3em 0",
      display: "flex",
      justifyContent: "center",
    },
    counterF: {
      marginTop: "12px",
      marginRight: "7px",
      borderRight: `1px solid ${theme.palette.primary.main}`,
      paddingRight: "7px",
    },
    showBy: {
      marginTop: "10px",
    },
    showButton: {
      fontSize: "12px",
      paddingBottom: "4px",
      paddingTop: "4px",
    },
    viewsFIcon: {
      fontSize: "14px",
      color: theme.palette.primary.main,
    },
    progressBlock: {
      width: "370px",
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      marginTop: "10px",
    },
    paginationDetails: {
      whiteSpace: "nowrap",
    },
    orderBy: {
      marginTop: 10,
      marginLeft: 7,
      display: "flex",
      alignItems: "center",
      "&:not(:first-child)::before": {
        content: `""`,
        height: "19px",
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        paddingLeft: "7px",
      },
    },
    tourContent: {
      paddingRight: 16,
    },
    tourImg: {
      maxWidth: "100%",
    },
  }),
);

export default "styles";
