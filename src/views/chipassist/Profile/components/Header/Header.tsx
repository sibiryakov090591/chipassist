import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useI18n("profile");

  return (
    <div className={clsx(classes.root)}>
      <Typography component="h2" gutterBottom variant="overline">
        {t("settings")}
      </Typography>
      <Typography component="h1" variant="h3">
        {t("change_info")}
      </Typography>
    </div>
  );
};

export default Header;
