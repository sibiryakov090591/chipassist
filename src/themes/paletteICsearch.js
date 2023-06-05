import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#0D52A1",
    main: "#015ED0",
    light: "#7BA9E4",
  },
  secondary: {
    contrastText: white,
    dark: "#B7CFF0",
    main: "#DBE7F8",
    light: "#EEF4FC",
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
    default: "#F4F6F8",
    paper: white,
  },
  filtersButton: {
    background: "rgb(102 159 229)",
  },
  tableHeader: "#337dd8",
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
    green700: "#21C483",
    green600: "#25DE94",
    green500: "#29F6A4",
    green400: "#93F9CE",
    green300: "#C4FCE4",
    green200: "#DEFEF0",
    green100: "#EBFFF6",

    blue800: "#156bd4",
    blue600: "#337dd8",
    blue500: "#015ED0",
    blue400: "#7BA9E4",
    blue300: "#B7CFF0",
    blue200: "#DBE7F8",
    blue100: "#EEF4FC",

    red500: "#FE4050",
    red400: "#FD98A1",
    red300: "#FEC7CB",
    red200: "#FFE3E6",
    red100: "#FFF5F6",

    grey500: "#333333",
    grey400: "#A6A6A6",
    grey300: "#C6C6C6",
    grey200: "#E0E0E0",
    grey100: "#F7F7F7",

    yellow100: "#F5C242",
  },
};
