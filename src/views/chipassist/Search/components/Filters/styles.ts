import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import palette from "@src/themes/palette";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    wrapper: {
      width: "350px",
      position: "sticky",
      top: 0,
      order: -1,
      transition: "all 0.2s ease",
      margin: 0,
      gridArea: "fil",
      "&.hideFilters": {
        position: "absolute",
        top: 0,
        left: "calc(-350px - 2em)",
        bottom: 0,
        width: "350px",
      },
      "&.right": {
        order: 2,
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
    inner: {
      position: "sticky",
      height: "100vh",
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: "0 5px 30px 0 rgba(0,0,0,0.1)",
      background: theme.palette.white,
      transition: "all 0.2s ease",
    },
    menuHeader: {
      borderBottom: "1px solid rgba(34, 36, 38, 0.15)",
      height: 65,
      display: "flex",
      alignItems: "center",
      backgroundColor: theme.palette.white,
      justifyContent: "center",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      textAlign: "center",
      padding: "20px",
      fontSize: "20px",
      borderRadius: "3px 3px 0 0",
    },
    togglePositionButton: {
      position: "relative",
      marginLeft: "auto",
      width: "24px",
      height: "18px",
      border: "1px solid #000",
      background: "none",
      borderRadius: "2px",
      cursor: "pointer",
      opacity: 0.3,
      "&:hover": {
        opacity: 1,
      },
      "&:before": {
        content: "",
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "8px",
        background: "#000",
      },
      "&.right:before": {
        right: "auto",
        left: 0,
      },
    },
    hideFiltersButton: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: "2em",
      border: "none",
      cursor: "pointer",
      backgroundColor: palette.filtersButton.background,
      color: "#fff",
      transform: "translateX(-2em)",
      opacity: 0.8,
      transition: "opacity 200ms",
      "&:hover": {
        opacity: 1,
      },
      "& > svg": {
        transition: "transform 300ms",
        transform: "rotate(180deg)",
      },
      "&.hideFilters": {
        transform: "translateX(350px)",
        "& > svg": {
          transition: "transform 300ms",
          transform: "rotate(0deg)",
        },
      },
      "&.right": {
        direction: "rtl",
        transform: "translateX(2em)",
        left: "auto",
        right: 0,
        "& > svg": {
          transform: "rotate(0deg)",
        },
        "&.hideFilters": {
          transform: "translateX(-350px)",
          "& > svg": {
            transform: "rotate(180deg)",
          },
        },
      },
    },
    filtersWrapper: {
      position: "absolute",
      top: 65,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: "scroll",
    },
    filtersInner: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "auto 80px",
      gridGap: 10,
      padding: 20,
    },
    filterContainerMain: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    filtersRow: {
      marginTop: "15px",
      alignItems: "center",
    },
    filtersActions: {
      flex: "0 0 70px",
      background: "#f8fcfd",
    },
    icon: {
      fontSize: "16px",
      margin: "0 1px 0 8px",
      "&:hover": {
        background: "#f9f9f9",
        color: "#0e69cb",
        borderColor: "#0e69cb",
      },
      padding: "0px 3px 3px 3px;",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "12px",
      color: theme.palette.primary.main,
    },
    default: {
      backgroundColor: palette.colors.orange[400],
    },
    primary: {
      backgroundColor: "#0e69cb",
    },
    secondary: {
      marginLeft: "17px",
      backgroundColor: palette.colors.red[400],
    },
    baseFilters: {
      marginBottom: 20,
      borderRadius: 4,
      background: "#f9f9f9",
    },
    baseFiltersItems: {
      backgroundColor: theme.palette.white,
      "& > *:not(:last-child)": {
        marginBottom: 15,
      },
    },
  }),
);

export default "styles";
