export const IS_PROD = process.env.AWS_BRANCH !== "master";
export const IS_BUILD = !process.env.DEV_SERVER;

export const INIT_SENTRY = false; // IS_PROD - for activate
export const INIT_ALERTS = !IS_PROD;

// momentjs FORMAT https://momentjs.com/docs/#/displaying/
export const DATE_FORMAT = "DD/MM/YYYY";
export const FILE_SIZE = "50";

export const scrollbarWidth =
  document.getElementById("scrollbar-measure")?.offsetWidth -
  document.getElementById("scrollbar-measure-content")?.offsetWidth;

export default "config";
