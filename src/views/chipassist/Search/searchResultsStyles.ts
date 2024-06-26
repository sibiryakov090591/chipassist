import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { scrollbarWidth } from "@src/config";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    main: {
      height: "100%",
      background: "white",
    },
    categoryRow: {},
    categoryCont: {},
    searchPageResults: {
      width: "100%",
    },
    stickyContainer: {
      minHeight: "auto !important",
      zIndex: 10,
      "&.sticky": {
        boxShadow: "0px 1px 0px #f0f0f0",
        width: "100vw",
        paddingRight: `${scrollbarWidth}px`,
        "& > div": {
          backgroundColor: "#f8f8f8",
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
      paddingRight: 26,
      paddingTop: 8,
    },
    tourImg: {
      maxWidth: "100%",
    },
    tour: {
      "& .reactour__close": {
        width: 12,
      },
    },
    tourDialog: {
      "& .MuiDialog-paper": {
        boxShadow: "none",
        backgroundColor: "transparent",
      },
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(15, 1, 33, 0.8)",
      },
      "& .MuiDialogActions-root": {
        justifyContent: "center",
        marginTop: 12,
      },
      "& h2,p": {
        color: "#fff",
        fontWeight: 400,
        textAlign: "center",
      },
      "& h2": {
        fontSize: 34,
      },
      "& p": {
        fontSize: 20,
      },
      "& button": {
        fontWeight: "bold",
        fontSize: 16,
      },
    },
    skipTourButton: {
      color: "#fff",
      border: "none",
    },
    requestedBlock: {
      border: "1px solid #234",
      maxWidth: 800,
      margin: "0 auto",
      padding: "1rem",
      backgroundColor: "#f9f9f9",
      color: "#123",
      borderRadius: 4,
    },
    cyrillicHint: {
      border: "1px solid #345",
      borderRadius: 3,
      background: "#fafafa",
      textAlign: "center",
      padding: 15,
      marginTop: 15,
      lineHeight: "1.6rem",
      fontSize: "1.2rem",
    },
    cyrillicHintHighlight: {
      backgroundColor: "rgba(229, 89, 114, 0.8)",
    },
    cyrillicHintHighlightLink: {
      cursor: "pointer",
      fontWeight: "bold",
      color: `#4183c4 !important`,
      textDecoration: "underline",
      "&:hover": {
        color: `#4183c4 !important`,
        textDecoration: "none",
      },
      "&:active": {
        color: `#4183c4 !important`,
        textDecoration: "none",
      },
      "&:focus": {
        color: `#4183c4 !important`,
        textDecoration: "none",
      },
    },
    manufacturerHint: {
      background: "#f8f8f8",
      width: "fit-content",
      margin: "0 auto 20px",
      padding: "8px 49px",
      border: "1px solid #e5e5e5",
      borderRadius: 10,
    },
  }),
);

export default "styles";
