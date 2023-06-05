import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    wordWrap: "break-word",
    border: `1px solid ${theme.palette.app.grey200}`,
    "& > tbody > tr:nth-child(odd)": {
      backgroundColor: "#fafafa",
    },
    "& > tbody > tr > td:first-child": {
      borderRight: `1px solid ${theme.palette.app.grey200}`,
    },
  },
}));

export default "styles";
