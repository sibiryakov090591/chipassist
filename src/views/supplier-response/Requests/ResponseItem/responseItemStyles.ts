import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  paper: {
    width: "100%",
    maxWidth: "600px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 2),
    textAlign: "center",
    color: "rgba(0,0,0,0.7)",
  },
  willBeResponded: {
    backgroundColor: "#f1fff9",
    "& input": {
      backgroundColor: "#f1fff9",
    },
  },
  rowDisabled: {
    opacity: "0.75",
    color: "#717171",
    backgroundColor: "#efefef",
    "& input": {
      backgroundColor: "#efefef !important",
      "&::placeholder": {
        color: "#717171",
      },
    },
    "& td": {
      backgroundColor: "#efefef",
    },
    "& .MuiInputBase-root": {
      backgroundColor: "#efefef !important",
    },
  },
  willBeRespondedPaper: {
    border: "2px solid #bbe9c6 !important",
    backgroundColor: "#f5fff7",
  },
  infoColumn: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  partNumber: {
    position: "relative",
    wordBreak: "break-word",
  },
  leadingOffer: {
    height: 25,
    fontWeight: "bold",
    padding: 0,
    backgroundColor: "#f5f5f5",
  },
  leadingOfferPrice: {
    padding: "4px 0 2px 0",
    backgroundColor: "#ffda90",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  leadingOfferCount: {
    backgroundColor: "#3f7cac",
    color: "#ffffff",
    fontSize: 10,
    lineHeight: "14px",
    padding: 1,
    minHeight: 16,
  },
  error: {
    backgroundColor: "#ffcace",
  },
  errorToolTip: {
    display: "flex",
    justifyContent: "center",
    cursor: "help",
    position: "absolute",
    left: "-30px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  input: {
    "& > div": {
      position: "relative",
    },
    "& input": {
      border: "none",
      width: "100%",
      height: "100%",
      "&::placeholder": {
        color: "#ddd",
      },
    },
  },
  alterUps: {
    "&.active": {
      padding: "0 26px",
    },
  },
  tdManufacturer: {
    height: 25,
    padding: 0,
  },
  disabledSelect: {
    pointerEvents: "none",
  },
  inputError: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.app.red100,
      "& input": {
        backgroundColor: theme.palette.app.red100,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& input": {
        zIndex: 10,
      },
      "& fieldset": {
        backgroundColor: theme.palette.app.red100,
      },
    },
  },
  bestPriseError: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "#fff6a9",
      "& input": {
        backgroundColor: "#fff6a9",
        padding: "0 26px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& input": {
        zIndex: 10,
      },
      "& fieldset": {
        backgroundColor: "#fff6a9",
      },
    },
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  paperMobile: {
    border: "2px solid transparent",
    padding: 12,
    margin: "10px 0 30px",
  },
  comment: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  offPointer: {
    cursor: "default",
  },
  commentIcon: {
    fontSize: 17,
    padding: 0,
  },
  emptyComment: {
    color: theme.palette.app.green800,
  },
  buttonContainer: {
    marginTop: 5,
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      margin: "8px 0 8px 16px",
    },
  },
  info: {
    marginBottom: 3,
    "& span": {
      color: "#599acb",
      fontWeight: "bold",
    },
  },
  leadingOfferContainer: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  leadingOfferContainerMobile: {
    marginLeft: 12,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  leadingOfferMobile: {
    backgroundColor: "#ffda90",
    borderRadius: "50ch",
    padding: "6px 12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  leadingOfferCountMobile: {
    backgroundColor: "#3f7cac",
    color: "#ffffff",
    fontSize: 10,
    lineHeight: "14px",
    padding: "4px 12px",
    borderRadius: "50ch",
    marginTop: 12,
  },
  leadingOfferHint: {
    fontSize: 11,
    lineHeight: "16px",
    color: "#9a9a9a",
    marginTop: "4px",
  },
  geoPin: {
    paddingTop: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      fontSize: 12,
    },
    "& *": {
      padding: 1,
      fontSize: 11,
      lineHeight: "11px",
      fontWeight: "normal",
    },
  },
  countryName: {
    marginLeft: 2,
  },
  replied: {
    display: "inline-block",
    color: "#ffffff",
    padding: "4px 10px",
    background: "#16be9f",
    fontWeight: "bold",
    fontSize: 11,
    lineHeight: "11px",
    borderRadius: "50ch",
    marginBottom: "2px",
  },
  repliedMobile: {
    fontSize: 13,
    lineHeight: "13px",
    fontWeight: "bold",
    color: "#1e2c3a",
    padding: "4px 0",
    marginBottom: 12,
  },
  helpIcon: {
    color: theme.palette.app.blue800,
    fontSize: 22,
    padding: 0,
    cursor: "help",
  },
  helpPriceIcon: {
    position: "absolute",
    right: 9,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 18,
  },
  svgContainer: {
    position: "relative",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    padding: 0,
    width: "40px",
    height: "40px",
    transform: "rotate(-90deg)",
    "& .bg": {
      fill: "none",
      strokeWidth: "4px",
      stroke: "#dedede",
    },
    "& .meter": {
      fill: "none",
      strokeWidth: "4px",
      strokeLinecap: "square",
      transformOrigin: "50% 50%",
      strokeDasharray: 360,
    },
  },
  validTime: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 12,
  },
}));

export default "styles";
