import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#0D52A1",
    main: "#271C3F",
    light: "#0074BC",
  },
  secondary: {
    contrastText: white,
    dark: "#7CAEDE",
    main: "#ACD4EF",
    light: "#F1F8FF",
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: "#f4f6f8",
    paper: white,
  },
  filtersButton: {
    background: "rgb(0, 59, 93)",
  },
  tableHeader: "#3F7CAC",
  tableEvenRow: "#f7f7f7",
  divider: colors.grey[200],
  colors,
  blue: "#00598c",
  red: colors.red[500],
  yellow: colors.yellow[300],
  darkBlue: "#002759",

  success: {
    main: colors.green[500],
  },
  warning: {
    main: colors.orange[700],
  },
  info: {
    main: colors.blue[700],
  },

  app: {
    green800: "#16be9f",
    green700: "#21c483",
    green600: "#25DE94",
    green500: "#29F6A4",
    green400: "#93F9CE",
    green300: "#C4FCE4",
    green200: "#DEFEF0",
    green100: "#EBFFF6",

    blue800: "#3f7cac",
    blue700: "#0081a7",
    blue600: "#514864",
    blue500: "#271C3F",
    blue400: "#556EA3",
    blue300: "#7CAEDE",
    blue200: "#ACD4EF",
    blue100: "#D2E9F7",

    red500: "#E94160",
    red400: "#E55972",
    red300: "#F797AB",
    red200: "#FFC4C9",
    red100: "#FAEEEF",

    grey500: "#333333",
    grey400: "#A6A6A6",
    grey300: "#C6C6C6",
    grey200: "#E0E0E0",
    grey100: "#F7F7F7",

    yellow100: "#F5C242",
  },
};
