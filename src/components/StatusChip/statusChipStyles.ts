import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    chip: {
      width: "fit-content",
      whiteSpace: "nowrap",
      padding: "0px 8px",
      borderRadius: "50ch",
      fontSize: "0.8rem",
      fontWeight: "bold",
      background: theme.palette.app.green800,
      color: "#fff",
      "&.online": {
        background: theme.palette.app.green800,
      },
      "&.rfq": {
        background: "#2292a4",
      },
    },
  }),
);

export default "styles";
