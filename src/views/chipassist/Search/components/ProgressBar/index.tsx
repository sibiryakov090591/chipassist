import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";
import Progress from "./Progress";

interface Props {
  className?: string;
}

const ExtendedSearchBar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const { t } = useI18n("search");
  const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);

  if (isExtendedSearchStarted) {
    return (
      <div className={`${classes.main} ${className}`}>
        <Progress />
        <div className={classes.span}>{t("extended_search")}</div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className={classes.span}>{t("extended_search_completed")}</div>
    </div>
  );
};

export default ExtendedSearchBar;
