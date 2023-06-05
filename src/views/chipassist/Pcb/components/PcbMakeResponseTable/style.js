import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  borders: {
    border: `1px solid ${theme.palette.app.grey200}`,
  },
}));

export default "styles";
