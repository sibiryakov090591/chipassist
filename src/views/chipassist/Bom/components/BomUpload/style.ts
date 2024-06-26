import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(359deg)",
    },
  },
  sectionTitle: {
    margin: "8px 8px 16px",
  },
  contentWrapper: {
    padding: "1rem 2rem 0 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2rem 0",
      textAlign: "center",
    },
  },
  title: {
    color: "#16697a",
  },
  text: {
    fontSize: "1.2rem",
  },
  list: {
    paddingLeft: 50,
  },
  selectButton: {
    minWidth: 240,
    marginTop: 10,
  },
  uploadFrame: {
    textAlign: "center",
    position: "relative",
    border: "1px solid #dbebf5",
    background: "#fafdff",
    borderRadius: 5,
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.15s",
    overflow: "hidden",
    "&:hover": {
      borderColor: "#b0d6ef",
    },
    "&.has-focus": {
      background: "#f6fff4",
      borderColor: "#ace89c",
      boxShadow: "0 5px 50px 0 rgba(0,0,0,0.1) !important",
    },
  },
  uploadDefaultState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: 350,
    transition: "all 0.15s",
    "&.has-focus": {
      transform: "scale(0.8)",
      opacity: 0,
      visibility: "hidden",
    },
  },
  uploadFocusState: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#f6fff4",
    borderRadius: 10,
    transition: "all 0.15s",
    transform: "scale(1.2)",
    opacity: 0,
    visibility: "hidden",
    "&.has-focus": {
      transform: "none",
      opacity: 1,
      visibility: "visible",
    },
  },
  uploadIcon: {
    width: 100,
  },
  uploadFocusIcon: {
    color: "#ace89c",
    fontSize: 140,
  },
  uploadFrameText: {
    margin: 10,
    fontSize: 16,
    textAlign: "center",
    color: theme.palette.app.grey400,
  },
  uploadBrowse: {
    padding: 0,
    color: "#0277BD",
    background: "none",
    border: "none",
    borderBottom: "1px solid #0277BD",
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  file: {
    display: "flex",
    alignItems: "center",
    padding: "10px 10px 10px 20px",
  },
  fileUploaded: {
    background: "#f4fbf4",
    borderColor: "#f4fbf4",
    boxShadow: "none",
  },
  fileIc: {
    marginRight: 5,
    fontSize: 18,
    color: "#0277BD",
  },
  fileName: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  },
  fileUploadError: {
    marginRight: 5,
    fontSize: 14,
  },
  fileUploadingWindow: {
    position: "fixed",
    flexDirection: "column",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "500px",
    zIndex: 1000,
    bottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 20px",
    background: "#fff",
    border: "1px solid #e8e8e8",
    fontSize: 16,
    fontWeight: 800,
    borderRadius: 4,
    boxShadow: "0 0 50px 1px rgba(0,0,0,0.25)",
  },
  fileUploadingWindowHeader: {
    display: "flex",
    alignItems: "center",
  },
  fileUploadingWindowDesc: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 15,
  },
  fileUploading: {
    display: "inline-block",
    marginRight: 10,
    fontSize: 30,
    color: "#8BC34A",
    animation: `$rotating 0.8s infinite`,
  },
  fileUpload2: {
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    height: 38,
    marginLeft: 8,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1,
    borderRadius: 4,
    border: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    "&[disabled]": {
      background: "#e7e7e7",
      color: "#999999",
      cursor: "default",
    },
  },
  fileUpload: {
    display: "flex",
    alignItems: "center",
    height: 28,
    padding: "0 15px",
    marginLeft: 8,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1,
    background: "#039BE5",
    color: "#fff",
    borderRadius: 14,
    border: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: "#03A9F4",
    },
    "&[disabled]": {
      background: "#e7e7e7",
      color: "#999999",
      cursor: "default",
    },
  },
  fileUploadIc: {
    marginRight: 5,
    fontSize: 16,
  },
  fileOpen: {
    display: "flex",
    alignItems: "center",
    height: 28,
    padding: "0 15px",
    marginLeft: 8,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1,
    background: "#43A047",
    color: theme.palette.white,
    borderRadius: 14,
    border: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: "#388E3C",
    },
  },
  fileOpenIc: {
    marginRight: 5,
    fontSize: 16,
  },
  fileClose: {
    display: "flex",
    alignItems: "center",
    height: 28,
    padding: "0 15px",
    marginLeft: 8,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1,
    background: theme.palette.app.red500,
    color: "#fff",
    borderRadius: 14,
    border: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.app.red500,
    },
  },
  fileCloseIc: {
    marginRight: 5,
    fontSize: 16,
  },
  fileRemove: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    marginLeft: 5,
    fontSize: 16,
    borderRadius: "50%",
    color: theme.palette.app.red500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      background: theme.palette.app.red200,
    },
  },
  fileSuccess: {
    color: "#8BC34A",
  },
}));

export default "styles";
