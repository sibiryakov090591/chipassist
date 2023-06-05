import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    dataTable: {
      wordWrap: "break-word",
    },
    dataHeader: {
      display: "grid",
      fontWeight: "bold",
      backgroundColor: theme.palette.tableHeader,
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    dataBody: {
      display: "contents",
    },
    dataGrid: {
      display: "grid",
      listStyleType: "none",
      "& + &": {
        borderTop: `1px solid ${theme.palette.app.grey200}`,
      },
    },
    dataRow: {
      display: "contents",
      listStyleType: "none",
      borderTop: `1px solid ${theme.palette.app.grey200}`,
      // "&:not(:first-of-type)": {
      //   borderTop: `1px solid ${theme.palette.app.grey200}`,
      // },
      "&:last-of-type": {
        borderBottom: `1px solid ${theme.palette.app.grey200}`,
      },
    },
    dataField: {
      padding: "16px",
      ["overflowX" as any]: "clip",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    dataLabel: {
      display: "none",
      color: theme.palette.app.blue700,
      fontWeight: 700,
      marginBottom: "8px",
      "&:empty": {
        display: "none",
      },
    },
    dataLabelBlock: {
      display: "block",
    },
    dataValue: {
      "&:empty": {
        display: "none",
      },
    },
    // columnNumber: {
    //   gridArea: "number",
    // },
    // columnDate: {
    //   gridArea: "date",
    // },
    // columnTotal: {
    //   gridArea: "total",
    // },
    // columnStatus: {
    //   gridArea: "status",
    // },
    // columnActions: {
    //   gridArea: "actions",
    // },
  }),
);

export default "styles";
