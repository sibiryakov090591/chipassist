import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { format } from "date-fns";
import { useMediaQuery, useTheme, Container, Dialog, Button } from "@material-ui/core";
import constants from "@src/constants/constants";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { setUrlWithFilters } from "@src/utils/setUrl";
import { changeManufacturer, changeQueryAction, toggleReloadSearchFlag } from "@src/store/search/searchActions";
import { ProductCard, Page } from "@src/components";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import Paginate from "@src/components/Paginate";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import FiltersContainer, {
  FilterPageSizeChoiceBar,
  FilterResultsBar,
  // FilterStockBar,
  // FilterOrderByBar,
} from "@src/components/FiltersBar";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getAuthToken } from "@src/utils/auth";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { setRFQQueryUpc, rfqModalOpen, setSellerMessageData } from "@src/store/rfq/rfqActions";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { NavLink, useNavigate } from "react-router-dom";
import Progress from "@src/views/chipassist/Search/components/ProgressBar/Progress";
import Tour, { ReactourStep } from "reactour";
import img from "@src/images/Screenshot_1.png";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// import BeforeUnloadModal from "@src/components/Alerts/BeforeUnloadModal";
import { ShowProductRequestHint } from "@src/store/products/productsActions";
import FilterSmartView from "@src/components/FiltersBar/FilterSmartView";
import RfqBar from "@src/views/chipassist/Search/components/RfqBar/RfqBar";
import { europeCountries } from "@src/constants/countries";
import { ru } from "date-fns/locale";
import { getSuggestionsFromCyrillic, splitCyrillicLetters } from "@src/utils/search";
import Highlighter from "react-highlight-words";
import Skeletons from "./components/Skeleton/Skeleton";
import { useStyles } from "./searchResultsStyles";
import ExtendedSearchBar from "./components/ProgressBar";
import useSearchLoadResults from "./hooks/useSearchLoadResults";

const allowedCountries = [
  ...europeCountries,
  "USA", // the United States
  "CAN", // Canada
  "AUS", // Australia
];

const isICSearch = constants.id === ID_ICSEARCH;

const SearchResults = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useI18n("search");
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);

  const query = useURLSearchParams("query", true, "", false);

  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || _pageSize, false);
  const orderBy = useURLSearchParams(
    "order_by",
    false,
    localStorage.getItem("mainOrderBy") || orderByValues[0].value,
    false,
  );
  let smart_view = useAppSelector((state) => state.search.smart_view);
  smart_view = useURLSearchParams("smart_view", false, smart_view, false) === "true";
  const manufacturer = useAppSelector((state) => state.search.manufacturer);
  const manufacturersLoaded = useAppSelector((state) => state.manufacturers.loaded);
  const manufacturerId = parseInt(useURLSearchParams("m_id", false, null, false));
  let filtersValues = useURLSearchParams("filters_values", true, {}, true);
  filtersValues.base_num_in_stock = 1;
  if (!isICSearch) {
    filtersValues = null;
  }
  // const isSearchPage = window.location.pathname === "/search";
  const disabledRFQForm = !!query?.startsWith("SELLER:") || !!query?.startsWith("MANUFACTURER:") || !query;

  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);
  const products = useAppSelector((state) => state.products.products);
  const rfqData = useAppSelector((state) => state.products.rfqData);
  const count = useAppSelector((state) => state.search.count);
  const currentPage = useURLSearchParams("page", false, 1, false);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const isDifferentNewSearchResult = useAppSelector(
    (state) => state.search.searchResultsToComparePrevAndNextData.isDifferent,
  );
  const rfqItem = useAppSelector((state) => state.rfq.rfqItem);
  const isNeedRfqModalOpenAgain = useAppSelector((state) => state.rfq.isNeedRfqModalOpenAgain);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const { isNeedModalOpenAgain, sellerId, sellerName, partNumber, stockrecordId } = useAppSelector(
    (state) => state.rfq.sellerMessageModal,
  );
  const shouldUpdateCard = useAppSelector((state) => state.common.shouldUpdateCard);
  // const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const [requestedRFQ, setRequestedRFQ] = useState<any>(null);
  const [suggestionsFromCyrillic, setSuggestionsFromCyrillic] = useState<string[]>(null);
  const [showRfqBar, setShowRfqBar] = useState(false);
  // const [rfqsHintCount, setRfqsHintCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpenTour, setIsOpenTour] = useState(false);
  const [isFixedFiltersBar, setIsFixedFiltersBar] = useState(false);
  const [steps] = useState<ReactourStep[]>([
    // {
    //   selector: "",
    //   content: () => <div className={classes.tourContent}>Here you can find and request product what you want.</div>,
    // },
    {
      selector: ".tutorial-search",
      content: () => (
        <div className={classes.tourContent}>
          Put a part number in this search bar and you will find a list of results.
        </div>
      ),
      // action: () => {
      //    const inputElement = node.children[0].children[0];
      //    if (inputElement) {
      //      inputElement.focus();
      //    }
      // },
    },
    {
      selector: ".tutorial-create-rfq",
      position: "left",
      content: ({ inDOM }) => (
        <div className={classes.tourContent}>
          You can send us a request for this product or contact the seller directly.
          {inDOM && <img className={classes.tourImg} src={img} alt={"test"} />}
        </div>
      ),
    },
  ]);

  useEffect(() => {
    let fixed = false;
    const listener = () => {
      if (window.pageYOffset > 60) {
        if (!fixed) {
          fixed = true;
          setIsFixedFiltersBar(true);
        }
      } else if (fixed) {
        fixed = false;
        setIsFixedFiltersBar(false);
      }
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  useEffect(() => {
    if (geolocation) setShowRfqBar(allowedCountries.includes(geolocation.country_code_iso3));
  }, [geolocation]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [isLoadingSearchResultsInProgress]);

  useEffect(() => {
    const requestedData = localStorage.getItem(rfqItem?.partNumber);
    setRequestedRFQ(requestedData ? JSON.parse(requestedData) : null);
  }, [shouldUpdateCard, rfqItem]);

  useEffect(() => {
    if (!localStorage.getItem("tutorialCompleted") && !isLoadingSearchResultsInProgress && products?.length) {
      setOpen(true);
    }
  }, [isLoadingSearchResultsInProgress, products]);

  useSearchLoadResults();

  useEffect(() => {
    if (isNeedRfqModalOpenAgain) {
      dispatch(rfqModalOpen(rfqItem.prevPartNumber));
    }
  }, [isNeedRfqModalOpenAgain]);

  useEffect(() => {
    if (isNeedModalOpenAgain) {
      dispatch(setSellerMessageData(true, partNumber, sellerId, sellerName, stockrecordId));
    }
  }, [isNeedModalOpenAgain]);

  useEffect(() => {
    return () => {
      dispatch(changeQueryAction(""));
      console.log(`SEARCH. Unmount search component. Query cleared. Token: ${getAuthToken()}`);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem("product_request_hint_disabled")) {
        dispatch(ShowProductRequestHint());
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (manufacturerId && !manufacturer && manufacturersLoaded) {
      dispatch(changeManufacturer(manufacturerId));
    }
  }, [manufacturerId, manufacturersLoaded]);

  useEffect(() => {
    dispatch(setRFQQueryUpc(query));

    const containsCyrillic = /[А-ЯЁ]/.test(query);
    const searchSuggestions: string[] = containsCyrillic ? getSuggestionsFromCyrillic(query) : null;
    setSuggestionsFromCyrillic(searchSuggestions);
  }, [query]);

  const onStartTour = () => {
    disableBody();
    setOpen(false);
    setTimeout(() => setIsOpenTour(true), 400);
  };

  const onCloseTour = () => {
    setIsOpenTour(false);
    setOpen(false);
    localStorage.setItem("tutorialCompleted", "true");
  };

  const enableBody = () => {
    const html = document.querySelector("html");
    html.style.overflow = "inherit"; // Enable scrolling after tutorial;
  };

  const disableBody = () => {
    const html = document.querySelector("html");
    html.style.overflow = "hidden"; // Disable scrolling during tutorial
  };

  const onChangePageSize = (value: string) => {
    setUrlWithFilters(window.location.pathname, navigate, query, 1, value, orderBy, filtersValues, null, {
      smart_view,
      ...(!!manufacturerId && { m_id: manufacturerId }),
    });
  };

  const onRemoveManufacturerFilter = () => {
    dispatch(changeManufacturer(null));
    setUrlWithFilters(window.location.pathname, navigate, query, 1, pageSize, orderBy, filtersValues, null, {
      smart_view,
    });
  };

  const onPageChangeHandle = (data: any) => {
    setUrlWithFilters("/search", navigate, query, data.selected + 1, pageSize, orderBy, filtersValues, null, {
      smart_view,
      ...(!!manufacturerId && { m_id: manufacturerId }),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const onChangeInStock = () => {
  //   setUrlWithFilters(
  //     window.location.pathname,
  //     navigate,
  //     isSearchPage ? query : "",
  //     1,
  //     pageSize,
  //     orderBy,
  //     null,
  //     {
  //       ...baseFilters,
  //       base_in_stock: false,
  //       base_num_in_stock: "",
  //     },
  //     { smart_view, ...(!!manufacturerId && { m_id: manufacturerId }) },
  //   );
  //   dispatch(toggleReloadSearchFlag());
  //   localStorage.setItem("productStock", "false");
  // };

  const createFiltersBar = () => {
    const filtersBar = (
      <div
        className={clsx(classes.stickyContainer, {
          sticky: isFixedFiltersBar,
        })}
      >
        <div className={commonClasses.filtersRow}>
          <FiltersContainer filtersCountToCollapse={4}>
            {!isSmDown && !isLoadingSearchResultsInProgress && <ExtendedSearchBar />}
            <FilterResultsBar count={count} />
            {/* <FilterStockBar disable={isLoadingSearchResultsInProgress || isExtendedSearchStarted} /> */}
            {!isSmDown && <FilterSmartView disable={isLoadingSearchResultsInProgress || isExtendedSearchStarted} />}
            <FilterCurrency />
            {!isSmDown && (
              <FilterPageSizeChoiceBar
                storageKey={`searchShowBy`}
                action={onChangePageSize}
                disable={isLoadingSearchResultsInProgress}
              />
            )}
          </FiltersContainer>
        </div>
      </div>
    );
    const container = document.getElementById("search-filters-bar-portal");
    if (isFixedFiltersBar && container) return ReactDOM.createPortal(filtersBar, container);
    return filtersBar;
  };

  const reloadPage = () => dispatch(toggleReloadSearchFlag());

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        {/* Step-by-step tutorial */}
        <Dialog className={classes.tourDialog} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle>
            <h2>{t("tutorial.dialog.greetings.h")}</h2>
            <p>{t("tutorial.dialog.greetings.p")}</p>
          </DialogTitle>
          <DialogActions>
            <Button className={appTheme.buttonCreate} onClick={onStartTour} variant="contained">
              {t("tutorial.dialog.yes")}
            </Button>
            <Button className={classes.skipTourButton} onClick={onCloseTour} variant="outlined">
              {t("tutorial.dialog.skip")}
            </Button>
          </DialogActions>
        </Dialog>
        <Tour
          steps={steps}
          isOpen={isOpenTour}
          onRequestClose={onCloseTour}
          closeWithMask={false}
          disableInteraction={false}
          rounded={8}
          badgeContent={(curr, tot) => `${curr} of ${tot}`}
          className={classes.tour}
          onBeforeClose={enableBody}
          // disableFocusLock={true}
        />
        {/* Step-by-step tutorial */}

        <div className={classes.main}>
          <div className={classes.searchPageResults}>
            {!!suggestionsFromCyrillic?.length && (
              <div className={classes.cyrillicHint}>
                {t("сyrillic_hint.text_1")}:{" "}
                <strong>
                  <Highlighter
                    highlightClassName={classes.cyrillicHintHighlight}
                    searchWords={splitCyrillicLetters(query)}
                    textToHighlight={query}
                    autoEscape={true}
                  />
                </strong>
                {". "}
                {t("сyrillic_hint.text_2")}
                <br />
                {t("сyrillic_hint.text_3")}
                <br />
                {t("сyrillic_hint.text_4")}
                {suggestionsFromCyrillic.map((suggestion, index) => {
                  return (
                    <span key={suggestion}>
                      {index > 0 && <span>{t("сyrillic_hint.or")}</span>}
                      <NavLink
                        className={classes.cyrillicHintHighlightLink}
                        to={`/search?query=${encodeURIComponent(suggestion)}`}
                      >
                        {suggestion}
                      </NavLink>
                    </span>
                  );
                })}
              </div>
            )}
            {isDifferentNewSearchResult && !isLoadingSearchResultsInProgress && !isExtendedSearchStarted && (
              <div className={classes.cyrillicHint}>
                По вашему запросу появились новые результаты.{" "}
                <span onClick={reloadPage} className={appTheme.hyperlink}>
                  Обновить результаты
                </span>
                .
              </div>
            )}
            {(count !== 0 || !!products?.length) && (
              <div id="filters_sticky_container" style={{ padding: "12px 0 8px", minHeight: 57 }}>
                {createFiltersBar()}
              </div>
            )}
            {(count !== 0 || !!products?.length) && isSmDown && !isLoadingSearchResultsInProgress && (
              <div style={{ padding: "0 0 4px" }}>
                <FiltersContainer>{!isLoadingSearchResultsInProgress && <ExtendedSearchBar />}</FiltersContainer>
              </div>
            )}

            {isLoadingSearchResultsInProgress ? (
              <div>
                <h2 style={{ padding: "0", margin: "10px 3px 3px" }}>{t("search", { query })}</h2>
                <Skeletons />
              </div>
            ) : (
              <div id={"productList"}>
                {!isSmDown && showRfqBar && count > 0 && <RfqBar />}
                <div>
                  {products?.map((product, key) => {
                    const rfq = rfqData.results.find((item) => item.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        rfqData={rfq}
                        searchQuery={query}
                        id={`product-item-${key}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {isExtendedSearchStarted && count === 0 && rfqData.count === 0 && (
              <div
                className={classes.searchResultEmpty}
                style={{ marginTop: "max(calc(50vh - 127px - (295px)/2), 5%)" }}
              >
                <h1 style={{ marginBottom: "25px" }}>{t("extended_progress")}</h1>
                <div style={{ maxWidth: "320px", margin: "auto" }}>
                  <Progress isExtendSearchPage={true} />
                </div>
              </div>
            )}
            {!isLoadingSearchResultsInProgress && !isExtendedSearchStarted && count === 0 && !products?.length && (
              <div className={classes.searchResultEmpty}>
                {requestedRFQ && (
                  <div className={classes.requestedBlock}>
                    {constants.id === ID_ICSEARCH
                      ? `${t("request_block")} ${format(new Date(requestedRFQ.date), "HH:mm:ss, d MMMM yyyy", {
                          locale: ru,
                        })}`
                      : `${t("request_block")} ${format(new Date(requestedRFQ.date), "HH:mm:ss, d MMMM yyyy")}`}
                  </div>
                )}
                <h2 style={{ marginBottom: 20 }}>{t("not_found")}</h2>
                {!!manufacturerId && manufacturer && (
                  <p className={classes.manufacturerHint}>
                    Вы искали продукты от производителя <strong>{manufacturer.name}</strong>. Чтобы увидеть больше
                    результатов - попробуйте{" "}
                    <strong className={appTheme.hyperlink} onClick={onRemoveManufacturerFilter}>
                      Отключить
                    </strong>{" "}
                    данный фильтр.
                  </p>
                )}

                {disabledRFQForm && <h3 className={classes.rfqHeader}>{t("rfq_header")}</h3>}
                {!disabledRFQForm && (
                  <>
                    <h3
                      className={classes.rfqHeader}
                      dangerouslySetInnerHTML={{
                        __html: t("rfq.modal_header", {
                          interpolation: { escapeValue: false },
                          partNumber: rfqItem.partNumber,
                          title: t("rfq.request"),
                        }),
                      }}
                      style={{ marginBottom: 20 }}
                    />
                    <p className={classes.rfqText}>
                      {t("rfq.modal_text_1")}
                      <strong>
                        <Highlighter
                          highlightClassName={classes.cyrillicHintHighlight}
                          searchWords={splitCyrillicLetters(rfqItem.partNumber)}
                          textToHighlight={query}
                          autoEscape={true}
                        />
                      </strong>
                      {t("rfq.modal_text_2")}
                    </p>
                    <div style={{ maxWidth: 500, margin: "0 auto" }}>
                      <RFQForm />
                    </div>
                  </>
                )}
              </div>
            )}

            <div className={classes.paginationBlock}>
              {!isLoadingSearchResultsInProgress && count > 0 && totalPages > 1 && (
                <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChangeHandle} />
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* {!localStorage.getItem("before_unload_alert_disabled") && <BeforeUnloadModal />} */}
    </Page>
  );
};

export default SearchResults;
