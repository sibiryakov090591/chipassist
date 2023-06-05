import { makeStyles } from "@material-ui/styles";

const themeStylesICsearch = makeStyles((theme) => ({
  header: {
    color: theme.palette.app.blue500,
  },
  headerDark: {
    color: theme.palette.white,
  },
  toolbar: {
    background: "radial-gradient(circle at top left, #0069eb 35%, #0054ba 65%)",
  },
  topBarProfileButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.transparent,
    "&:hover": {
      backgroundColor: theme.palette.white,
      color: theme.palette.app.blue500,
    },
    "&:active": {
      backgroundColor: theme.palette.white,
    },
  },
  topBarSearchButton: {
    backgroundColor: theme.palette.app.green700,
    "&:hover": {
      backgroundColor: theme.palette.app.green600,
    },
    "&:active": {
      backgroundColor: theme.palette.app.green600,
    },
  },
  topBarCartCount: {
    color: theme.palette.app.green500,
  },
  feedbackButton: {
    backgroundColor: theme.palette.app.green700,
    color: theme.palette.white,
    "& > span": {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
    "&:hover": {
      color: theme.palette.white,
      backgroundColor: theme.palette.app.green600,
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
    color: `${theme.palette.app.blue400} !important`,
    "&:hover": {
      color: `${theme.palette.app.blue400} !important`,
      textDecoration: "underline",
    },
    "&:active": {
      color: `${theme.palette.app.blue100} !important`,
      textDecoration: "underline",
    },
    "&:focus": {
      color: `${theme.palette.app.blue400} !important`,
      textDecoration: "underline",
    },
  },
  hyperlinkDark: {
    cursor: "pointer",
    color: theme.palette.app.blue300,
    "&:hover": {
      color: theme.palette.app.blue300,
      textDecoration: "underline",
    },
    "&:active": {
      color: theme.palette.app.blue100,
      textDecoration: "underline",
    },
    "&:focus": {
      color: theme.palette.app.blue300,
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
      backgroundColor: theme.palette.white,
    },
    "&:hover": {
      color: theme.palette.white,
      backgroundColor: theme.palette.app.blue200,
      borderColor: theme.palette.app.blue300,
    },
    "&:active": {
      color: theme.palette.black,
      borderColor: theme.palette.app.blue200,
      backgroundColor: theme.palette.app.blue200,
    },
    "&:focus": {
      color: theme.palette.white,
      backgroundColor: theme.palette.app.blue200,
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
      backgroundColor: "#b2d4ff",
      "&:hover": {
        backgroundColor: "#deebff",
      },
    },
  },
  buttonCancel: {
    backgroundColor: theme.palette.app.red500,
    color: theme.palette.white,
    transition: "all 0.2s ease",
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgba(254, 64, 80, 0.8)", // red500
    },
    "&:active": {
      backgroundColor: theme.palette.app.red500,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.red500,
    },
  },
  buttonPrimary: {
    backgroundColor: theme.palette.app.blue500,
    color: theme.palette.white,
    transition: "all 0.2s ease",
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgba(1, 94, 208, 0.8)", // blue500
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue500,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue500,
    },
  },
  buttonCreate: {
    color: theme.palette.white,
    backgroundColor: theme.palette.app.green700,
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      color: `${theme.palette.white} !important`,
      backgroundColor: theme.palette.app.green600,
    },
    "&:active": {
      color: theme.palette.white,
      backgroundColor: theme.palette.app.green700,
    },
    "&:focus": {
      color: `${theme.palette.white} !important`,
      backgroundColor: theme.palette.app.green700,
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
    backgroundColor: theme.palette.app.blue400,
    "&:hover": {
      backgroundColor: theme.palette.app.blue300,
      color: theme.palette.app.blue100,
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
    color: `${theme.palette.app.green700} !important`,
    "&:hover": {
      color: `${theme.palette.app.green700} !important`,
    },
    "&.Mui-checked": {
      color: `${theme.palette.app.green700} !important`,
    },
  },
  radio: {
    color: theme.palette.app.grey300,
    "&:hover": {
      color: theme.palette.app.blue300,
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
    backgroundColor: theme.palette.app.blue600,
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
    },
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.app.grey100,
    },
  },
}));

export default themeStylesICsearch;
