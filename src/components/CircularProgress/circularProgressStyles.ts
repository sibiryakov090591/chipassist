import { makeStyles, createStyles } from "@material-ui/core/styles";
// import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles(() =>
  createStyles({
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
    label: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 12,
    },
    tooltip: {
      fontSize: "13px",
    },
    cursor: {
      cursor: "help",
    },
  }),
);

export default "styles";
