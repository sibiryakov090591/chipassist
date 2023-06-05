import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Snackbar, SnackbarContent, colors, Theme } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutlined";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

interface Props {
  onClose: () => void;
  open: boolean;
}

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: colors.green[600],
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const SuccessSnackbar: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();
  const { t } = useI18n("profile");

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={classes.content}
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            {t("general.success")}
          </span>
        }
      />
    </Snackbar>
  );
};

SuccessSnackbar.defaultProps = {
  open: true,
  onClose: () => {
    return true;
  },
};

export default SuccessSnackbar;
