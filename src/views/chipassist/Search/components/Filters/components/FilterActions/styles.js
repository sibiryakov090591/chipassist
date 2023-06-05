import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => {
  // eslint-disable-next-line no-lone-blocks
  {
    return {
      menu: {
        position: "sticky",
        top: 0,
        display: "block",
        height: "initial",
        padding: "10px 0",
        background: "none",
      },
      deleteFilters: {
        color: theme.palette.red,
      },
      loadFilters: {
        color: theme.palette.colors.cyan[800],
      },
      saveFilters: {
        color: theme.palette.black,
      },
      applyFilters: {
        color: theme.palette.blue,
      },
      restoreFilters: {
        color: theme.palette.colors.orange[700],
      },
    };
  }
});

export default "styles";
