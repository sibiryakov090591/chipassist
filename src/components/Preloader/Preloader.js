import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { useStyles } from "./preloaderStyles";

function Preloader({ title }) {
  const classes = useStyles();
  const { t } = useI18n("common");

  return (
    <div className={classes.preloader}>
      <i className={classes.preloaderCircle} />
      <div className={classes.preloaderTitle}>{title || t("loading")}</div>
    </div>
  );
}

export default Preloader;
