import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    row: {
      display: "flex",
      padding: "7px",
      borderBottom: `1px solid ${theme.palette.app.grey300}`,
      borderTop: `2px solid ${theme.palette.primary.main}`,
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
    },
    rightColumn: {
      display: "flex",
    },
    leftColumn: {},
    table: {
      width: "100%",
      display: "flex",
    },
    image: {
      margin: "5px 22px 16px 3px",
      borderRadius: 5,
    },
    titleBlock: {
      width: "90%",
    },
    title: {
      // marginLeft: "27px",
    },
    tableBody: {
      paddingBottom: "32px",
    },
    tableBodyS: {},
    description: {
      marginTop: "10px",
      marginLeft: "27px",
    },
  }),
);

export default "styles";
