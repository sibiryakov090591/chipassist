import React, { useEffect, useState } from "react";
import _ from "lodash";
import constants from "@src/constants/constants";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import useSearchLoadResults from "@src/views/chipassist/Search/hooks/useSearchLoadResults";
import { ProductsSegment } from "@src/views/chipassist/Categories/components/Products/Products";
import { Page, Paginate, ProductCard } from "@src/components";
import { getPrice, isDuplicateStockrecord, isProductAvailable } from "@src/utils/product";
import { Product } from "@src/store/products/productTypes";
import Skeletons from "@src/views/chipassist/Search/components/Skeleton/Skeleton";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles as useSearchStyles } from "@src/views/chipassist/Search/searchResultsStyles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Container } from "@material-ui/core";
import FiltersContainer, {
  FilterPageSizeChoiceBar,
  FilterResultsBar,
  FilterStockBar,
} from "@src/components/FiltersBar";
// import ExtendedSearchBar from "@src/views/chipassist/Search/components/ProgressBar";
import { setUrlWithFilters } from "@src/utils/setUrl";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import useAppDispatch from "@src/hooks/useAppDispatch";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { getRfqsHintCount, toggleReloadSearchFlag } from "@src/store/search/searchActions";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { setRFQQueryUpc } from "@src/store/rfq/rfqActions";
import Sticky from "react-sticky-el";
import { useNavigate } from "react-router-dom";
import { fixedStickyContainerHeight } from "@src/utils/search";
import { useStyles } from "./styles";

const Search: React.FC = () => {
  const commonClasses = useCommonStyles();
  const searchClasses = useSearchStyles();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("search");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let query = useAppSelector((state) => state.search.query);
  query = useURLSearchParams("query", true, query, false);
  const products = useAppSelector((state) => state.products.products);
  const count = useAppSelector((state) => state.search.count);
  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  // let page = useAppSelector((state) => state.search.page);
  // page = useURLSearchParams("page", false, page, false);
  let pageSize = useAppSelector((state) => state.search.pageSize);
  const rfqItem = useAppSelector((state) => state.rfq.rfqItem);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);
  const orderBy = useURLSearchParams(
    "order_by",
    false,
    localStorage.getItem("mainOrderBy") || orderByValues[0].value,
    false,
  );
  const filtersValues = useURLSearchParams("filters_values", true, {}, true);
  const baseFilters = useURLSearchParams("base_filters", true, {}, true);
  baseFilters.base_in_stock = localStorage.getItem("productStock") === "true";

  const [result, setResult] = useState<Product[]>([]);
  const [rfqsHintCount, setRfqsHintCount] = useState(null);

  useSearchLoadResults();

  useEffect(() => {
    dispatch(setRFQQueryUpc(query));
  }, [query]);

  useEffect(() => {
    if (query && baseFilters.base_in_stock) {
      dispatch(getRfqsHintCount(query, 1)).then((res: any) => {
        setRfqsHintCount(res?.stockrecords_count);
        console.log("RFQs_COUNT_RESPONSE: ", res?.stockrecords_count);
      });
    }
  }, [query, baseFilters.base_in_stock]);

  useEffect(() => {
    const res: Product[] = [];
    if (!products) return;

    products.forEach((product) => {
      let stockrecords = product.stockrecords
        .filter((sr) => !!sr.id)
        .reduce((acc, val) => {
          return isDuplicateStockrecord(acc, val) ? acc : [...acc, val];
        }, []);

      stockrecords = _.orderBy(
        stockrecords.map((val) => ({
          ...val,
          price1: getPrice(1, val),
          isOnline: isProductAvailable(val) ? 1 : 0,
        })),
        ["isOnline", "price1"],
        ["desc", "asc"],
      );

      stockrecords.forEach((stockrecord) => {
        res.push({ ...product, stockrecords: [stockrecord] });
      });
    });

    setResult(res);
  }, [products]);

  const onChangePageSize = (value: string) => {
    setUrlWithFilters(window.location.pathname, navigate, query, 1, value, orderBy, filtersValues, baseFilters);
  };

  const onPageChangeHandle = (data: any) => {
    setUrlWithFilters("/search", navigate, query, data.selected + 1, pageSize, orderBy, filtersValues, baseFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const onOrderChange = (value: string) => {
  //   localStorage.setItem("mainOrderBy", value);
  //   setUrlWithFilters(history.location.pathname, history, query, page, pageSize, value, filtersValues, baseFilters);
  // };

  const onChangeInStock = () => {
    setUrlWithFilters(window.location.pathname, navigate, query || "", 1, pageSize, orderBy, null, {
      ...baseFilters,
      base_in_stock: false,
      base_num_in_stock: "",
    });
    dispatch(toggleReloadSearchFlag());
    localStorage.setItem("productStock", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Page
      title="ChipOnline - search and order electronic components"
      description="ChipOnline - search and order electronic components"
    >
      <Container maxWidth="xl">
        <div>
          <div id="filters_sticky_container" style={{ padding: "12px 0 8px" }}>
            <Sticky
              className={clsx(searchClasses.stickyContainer, classes.stickyContainer)}
              topOffset={0}
              onFixedToggle={fixedStickyContainerHeight}
            >
              <div className={commonClasses.filtersRow}>
                <FiltersContainer>
                  {/* {!isSmDown && !isLoadingSearchResultsInProgress && <ExtendedSearchBar />} */}
                  <FilterResultsBar count={count} />
                  {/* <FilterStockBar disable={isLoadingSearchResultsInProgress || isExtendedSearchStarted} /> */}
                  <FilterCurrency />
                  <FilterPageSizeChoiceBar
                    storageKey={`searchShowBy`}
                    action={onChangePageSize}
                    disable={isLoadingSearchResultsInProgress}
                  />
                  {/* <FilterOrderByBar value={orderBy} onChange={onOrderChange} disable={isLoadingSearchResultsInProgress} /> */}
                </FiltersContainer>
              </div>
            </Sticky>
          </div>
          {/* {isSmDown && !isLoadingSearchResultsInProgress && ( */}
          {/*  <div className={searchClasses.tableFiltersRow}> */}
          {/*    <FiltersContainer>{!isLoadingSearchResultsInProgress && <ExtendedSearchBar />}</FiltersContainer> */}
          {/*  </div> */}
          {/* )} */}
          {isLoadingSearchResultsInProgress ? (
            <Skeletons />
          ) : (
            <ProductsSegment>
              {result.map((product) => (
                <ProductCard
                  key={product.stockrecords[0]?.id}
                  product={product}
                  searchQuery={query}
                  viewType={constants.id}
                />
              ))}
            </ProductsSegment>
          )}
          {(baseFilters?.base_in_stock || filtersValues?.base_num_in_stock) && count > 0 && !!rfqsHintCount && (
            <div style={{ marginTop: 30, textAlign: "center" }}>
              <div className={searchClasses.hintText_1}>{t("in_stock_hint_5")}</div>
              <div className={searchClasses.hintText_2}>
                {t("in_stock_hint_2")}
                <span className={clsx(appTheme.hyperlink, searchClasses.link)} onClick={onChangeInStock}>
                  {t("in_stock_hint_3")}
                </span>
                {t("in_stock_hint_4")}
              </div>
            </div>
          )}
          {isExtendedSearchStarted && count === 0 && (
            <div className={searchClasses.searchResultEmpty}>
              <h2>{t("extended_progress")}</h2>
            </div>
          )}
          {!isLoadingSearchResultsInProgress && !isExtendedSearchStarted && !result.length && (
            <div className={searchClasses.searchResultEmpty}>
              <h2 style={{ marginBottom: 20 }}>{t("not_found")}</h2>

              {(baseFilters?.base_in_stock || filtersValues.base_num_in_stock) && !!rfqsHintCount ? (
                <div style={{ marginBottom: 20 }}>
                  <div className={searchClasses.hintText_1}>{t("in_stock_hint_1")}</div>
                  <div className={searchClasses.hintText_2}>
                    {t("in_stock_hint_2")}
                    <span className={clsx(appTheme.hyperlink, searchClasses.link)} onClick={onChangeInStock}>
                      {t("in_stock_hint_3")}
                    </span>
                    {t("in_stock_hint_4")}
                  </div>
                  <div style={{ fontSize: "1.2rem" }} className={searchClasses.hintText_1}>
                    {t("in_stock_hint_6")}
                  </div>
                </div>
              ) : (
                <h3
                  className={searchClasses.rfqHeader}
                  dangerouslySetInnerHTML={{
                    __html: t("rfq.modal_header", {
                      interpolation: { escapeValue: false },
                      partNumber: rfqItem.partNumber,
                      title: t("rfq.request"),
                    }),
                  }}
                  style={{ marginBottom: 20 }}
                />
              )}
              <div style={{ maxWidth: 500, margin: "0 auto" }}>
                {/* <Button variant="contained" color="primary" onClick={openRfqModal}> */}
                {/*  {t("product.send_rfq")} */}
                {/* </Button> */}
                <RFQForm />
              </div>
            </div>
          )}
          <div className={searchClasses.paginationBlock}>
            {!isLoadingSearchResultsInProgress && count > 0 && totalPages > 1 && (
              <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChangeHandle} />
            )}
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default Search;
