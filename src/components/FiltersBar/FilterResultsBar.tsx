import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { formatNumber } from "@src/utils/formatters";
// import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";
import { FiltersContext } from "./FiltersContainer";

const ResultsBar: React.FC<{ count: number; showMoreFilters?: boolean }> = ({ count }) => {
  const classes = useStyles();
  // const appTheme = useAppTheme();
  const { t } = useI18n("common");

  return (
    <FiltersContext.Consumer>
      {() => (
        <div>
          <span className={`${classes.counterValue} results-count`}>{formatNumber(count, 0, " ", " ")}</span>
          {t("results", { count: count || 0 })}
        </div>
      )}
    </FiltersContext.Consumer>
  );
};

export default ResultsBar;
