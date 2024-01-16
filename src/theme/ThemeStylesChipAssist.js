import { makeStyles } from "@material-ui/styles";

const themeStylesChipAssist = makeStyles((theme) => ({
  header: {
    color: theme.palette.app.blue500,
  },
  toolbar: {
    background: "radial-gradient(circle at top left, #372859 35%, #1d1530 65%)",
    [theme.breakpoints.down("sm")]: {
      background: "radial-gradient(circle at top left, #372859 50%, #271849 100%)",
    },
  },
  topBarProfileButton: {
    color: "#CCCCCC",
    "&:hover": {
      backgroundColor: "#1B3857",
    },
    "&:active": {
      backgroundColor: "#1B3857",
    },
  },
  topBarSearchButton: {
    backgroundColor: theme.palette.app.red500,
    "&:hover": {
      backgroundColor: theme.palette.app.red400,
    },
    "&:active": {
      backgroundColor: theme.palette.app.red400,
    },
  },
  topBarCartCount: {
    color: "#FE4A49",
  },
  feedbackButton: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    "& > span": {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
    "&:hover": {
      color: theme.palette.white,
    },
  },
  section: {
    backgroundColor: theme.palette.white,
  },
  sectionDark: {
    backgroundColor: theme.palette.app.blue500,
  },
  text: {
    color: theme.palette.black,
  },
  textDark: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.blue500,
  },
  hyperlink: {
    cursor: "pointer",
    color: `${theme.palette.app.blue300} !important`,
    "&:hover": {
      color: `${theme.palette.app.blue300} !important`,
      textDecoration: "underline",
    },
    "&:active": {
      color: `${theme.palette.app.blue300} !important`,
      textDecoration: "underline",
    },
    "&:focus": {
      color: `${theme.palette.app.blue300} !important`,
      textDecoration: "underline",
    },
  },
  dropdownMenu: {
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    border: `1px solid ${theme.palette.app.grey300}`,
    "&.Mui-disabled": {
      color: theme.palette.app.grey200,
      borderColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: theme.palette.app.blue300,
      borderColor: theme.palette.app.blue300,
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue300,
      borderColor: theme.palette.app.blue300,
    },
    "&:focus": {
      borderColor: theme.palette.app.blue300,
    },
  },
  selectMenuItem: {
    "&:hover": {
      backgroundColor: "#deebff",
    },
    "&:focus": {
      backgroundColor: "#deebff",
      "&:hover": {
        backgroundColor: "#deebff",
      },
    },
    "&.Mui-selected": {
      backgroundColor: "#deebff",
      "&:hover": {
        backgroundColor: "#deebff",
      },
    },
  },

  selectedMenuItemLang: {
    backgroundColor: "#deebff",
    "&:hover": {
      backgroundColor: "#deebff",
    },
    "&:focus": {
      backgroundColor: "#deebff",
      "&:hover": {
        backgroundColor: "#deebff",
      },
    },
  },
  buttonMinWidth: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 165,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      minWidth: "auto",
    },
  },
  buttonCancel: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.red500,
    transition: "all 0.2s ease",
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgb(234,82,112)", // red500
    },
    "&:active": {
      backgroundColor: theme.palette.app.red500,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.red500,
    },
  },
  buttonPrimary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.blue700,
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgb(49 152 184)", // blue700
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue700,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue700,
    },
  },
  buttonCreate: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.green800,
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgb(67,198,169)", // green800
    },
    "&:active": {
      backgroundColor: theme.palette.app.green800,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.green800,
    },
  },
  buttonAddToBom: {
    color: theme.palette.app.blue500,
    backgroundColor: theme.palette.white,
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: theme.palette.app.blue200,
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue200,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue200,
    },
  },
  buttonControls: {
    height: 35,
    color: theme.palette.white,
    backgroundColor: theme.palette.app.blue300,
    "&:hover": {
      backgroundColor: theme.palette.app.blue500,
    },
    "&.active": {
      backgroundColor: theme.palette.app.green600,
      "&:hover": {
        backgroundColor: theme.palette.app.green700,
      },
    },
  },
  border: {
    borderColor: theme.palette.app.blue500,
  },
  checkbox: {
    color: `${theme.palette.app.blue500} !important`,
    padding: 7,
    "&:hover": {
      color: `${theme.palette.app.blue500} !important`,
    },
    "&.Mui-checked": {
      color: `${theme.palette.app.blue500} !important`,
    },
  },
  radio: {
    color: theme.palette.app.grey300,
    "&:hover": {
      color: theme.palette.app.blue200,
    },
    "&.Mui-checked": {
      color: theme.palette.app.blue200,
    },
  },
  inputField: {
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.app.grey300,
    "&.Mui-disabled": {
      color: theme.palette.app.grey200,
      borderColor: theme.palette.app.grey200,
      backgroundColor: theme.palette.white,
    },
    "&:hover": {
      borderColor: theme.palette.app.blue300,
      backgroundColor: theme.palette.white,
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue300,
      borderColor: theme.palette.app.blue300,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue300,
      borderColor: theme.palette.app.blue300,
    },
  },
  trTh: {
    backgroundColor: theme.palette.app.blue800,
    "& > th": {
      padding: "6px 16px",
    },
  },
  table: {
    borderLeft: "1px solid rgba(63,63,68, 0.1)",
    borderRight: "1px solid rgba(63,63,68, 0.1)",
    borderBottom: "1px solid rgba(63,63,68, 0.1)",
  },
  tableHeader: {
    backgroundColor: theme.palette.tableHeader,
    "& > th": {
      backgroundColor: theme.palette.tableHeader,
      color: "white",
      fontWeight: "bold",
      "& .MuiTableSortLabel-root": {
        "& svg": {
          width: "0.7em",
          height: "0.7em",
          color: `${theme.palette.app.blue200} !important`,
          opacity: 0.5,
          margin: "0 0 0 2px",
        },
        "&:hover": {
          color: `${theme.palette.app.blue200} !important`,
        },
      },
      "& .MuiTableSortLabel-active": {
        color: `${theme.palette.app.blue200} !important`,
        "& svg": {
          color: `${theme.palette.app.blue200} !important`,
        },
      },
    },
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.app.grey100,
    },
  },
}));

export default themeStylesChipAssist;
