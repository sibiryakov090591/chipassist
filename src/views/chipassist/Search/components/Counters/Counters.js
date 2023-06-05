import React from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { setUrlWithFilters } from "@src/utils/setUrl";
import OrderBy from "@src/components/FiltersBar/FilterOrderByBar";
import StockBarFilter from "@src/components/FiltersBar/FilterStockBar";
import useAppSelector from "@src/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../searchResultsStyles";
import PageSizeChoice from "./PageSizeChoice";
import ExtendedSearchBar from "../ProgressBar";

const Counters = (props) => {
  const classes = useStyles();
  const { onOrderChange, orderBy } = props;
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const query = useAppSelector((state) => state.search.query);
  const pageSize = useAppSelector((state) => state.search.pageSize);
  const filtersValues = useAppSelector((state) => state.search.filtersValues);
  const baseFilters = useAppSelector((state) => state.search.baseFilters);
  const navigate = useNavigate();
  const { t } = useI18n("search");

  const onPageBackHandle = () => {
    if (currentPage > 1) {
      setUrlWithFilters("/search", navigate, query, currentPage - 1, pageSize, orderBy, filtersValues, baseFilters);
    }
  };

  const onPageNextHandle = () => {
    if (currentPage + 1 <= totalPages) {
      setUrlWithFilters("/search", navigate, query, currentPage + 1, pageSize, orderBy, filtersValues, baseFilters);
    }
  };

  return (
    <div>
      <div className={classes.counters}>
        <ExtendedSearchBar />
        <div className={classes.counterF} style={{ border: "none", marginRight: 0 }}>
          <StockBarFilter />
        </div>
        <div className={classes.counterF} style={{ height: 19, paddingRight: 0 }} />
        <PageSizeChoice />
        <div className={classes.orderBy}>
          <OrderBy value={orderBy} onChange={onOrderChange} />
        </div>

        {totalPages > 1 ? (
          <div className={classes.pagination}>
            <Tooltip disabled={!(currentPage > 1)} onClick={onPageBackHandle} title={t("common.previous_page")}>
              <span>
                <IconButton size="small">
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Typography className={classes.paginationDetails} variant="body2">
              {t("common.page")} {currentPage} {t("common.of")} {totalPages}
            </Typography>
            <Tooltip
              disabled={!(currentPage + 1 <= totalPages)}
              onClick={onPageNextHandle}
              title={t("common.next_page")}
            >
              <span>
                <IconButton size="small">
                  <KeyboardArrowRightIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Counters;
