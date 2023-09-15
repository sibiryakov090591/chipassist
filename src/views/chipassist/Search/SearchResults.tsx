import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useMediaQuery, useTheme, Container, Dialog, Button } from "@material-ui/core";
import constants from "@src/constants/constants";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { setUrlWithFilters } from "@src/utils/setUrl";
import { toggleReloadSearchFlag, changeQueryAction, getRfqsHintCount } from "@src/store/search/searchActions";
import { ProductCard, Page, ProductCardNew } from "@src/components";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import Paginate from "@src/components/Paginate";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import FiltersContainer, {
  FilterPageSizeChoiceBar,
  FilterResultsBar,
  FilterStockBar,
  // FilterOrderByBar,
} from "@src/components/FiltersBar";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getAuthToken } from "@src/utils/auth";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { setRFQQueryUpc, rfqModalOpen, setSellerMessageData } from "@src/store/rfq/rfqActions";
import Sticky from "react-sticky-el";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useNavigate } from "react-router-dom";
import { fixedStickyContainerHeight } from "@src/utils/search";
import Progress from "@src/views/chipassist/Search/components/ProgressBar/Progress";
import Tour, { ReactourStep } from "reactour";
import img from "@src/images/Screenshot_1.png";
import { ID_MASTER } from "@src/constants/server_constants";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import BeforeUnloadModal from "@src/components/Alerts/BeforeUnloadModal";
import { ShowProductRequestHint } from "@src/store/products/productsActions";
import Filters from "./components/Filters/Filters";
import Skeletons from "./components/Skeleton/Skeleton";
import { useStyles } from "./searchResultsStyles";
import { ProductsSegment } from "../Categories/components/Products/Products";
import ExtendedSearchBar from "./components/ProgressBar";
import useSearchLoadResults from "./hooks/useSearchLoadResults";

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
  // const _query = useAppSelector((state) => state.search.query);
  // eslint-disable-next-line no-underscore-dangle
  // const _page = useAppSelector((state) => state.search.page);
  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);

  const query = useURLSearchParams("query", true, "", false);
  // const page = useURLSearchParams("page", false, _page, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || _pageSize, false);
  const orderBy = useURLSearchParams(
    "order_by",
    false,
    localStorage.getItem("mainOrderBy") || orderByValues[0].value,
    false,
  );
  let filtersValues = useURLSearchParams("filters_values", true, {}, true);
  filtersValues.base_num_in_stock = constants.isNewSearchPage
    ? 0
    : localStorage.getItem("productStock") === "false"
    ? ""
    : 1;
  let baseFilters = useURLSearchParams("base_filters", true, {}, true);
  baseFilters.base_in_stock = localStorage.getItem("productStock") === "true";
  if (constants.isNewSearchPage) {
    filtersValues = null;
    baseFilters = null;
  }
  const isSearchPage = window.location.pathname === "/search";

  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);
  const products = useAppSelector((state) => state.products.products);
  const rfqData = useAppSelector((state) => state.products.rfqData);
  const count = useAppSelector((state) => state.search.count);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const rfqItem = useAppSelector((state) => state.rfq.rfqItem);
  const isNeedRfqModalOpenAgain = useAppSelector((state) => state.rfq.isNeedRfqModalOpenAgain);
  const { isNeedModalOpenAgain, sellerId, sellerName, partNumber, stockrecordId } = useAppSelector(
    (state) => state.rfq.sellerMessageModal,
  );
  // const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const [hideSideBar, setHideSideBar] = useState(false);
  const [isRightSidebar, setIsRightSidebar] = useState(false);
  const [rfqsHintCount, setRfqsHintCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpenTour, setIsOpenTour] = useState(false);
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
    if (
      constants.id === ID_MASTER &&
      !localStorage.getItem("tutorialCompleted") &&
      !isLoadingSearchResultsInProgress &&
      products?.length
    ) {
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
    const menuPosition = localStorage.getItem("sidebarMenuRightPosition") === "true";
    setIsRightSidebar(menuPosition);

    const hideMenu = localStorage.getItem("sidebarMenuHide") === "true";
    setHideSideBar(hideMenu);

    return () => {
      dispatch(changeQueryAction(""));
      console.log(`SEARCH. Unmount search component. Query cleared. Token: ${getAuthToken()}`);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!sessionStorage.getItem("product_request_hint_disabled")) {
        dispatch(ShowProductRequestHint());
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (query && baseFilters?.base_in_stock) {
      dispatch(getRfqsHintCount(query, 1)).then((res: any) => {
        setRfqsHintCount(res?.count);
        console.log("RFQs_COUNT_RESPONSE: ", res?.count);
      });
    }
  }, [query, baseFilters?.base_in_stock]);

  useEffect(() => {
    dispatch(setRFQQueryUpc(query));
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
    setUrlWithFilters(window.location.pathname, navigate, query, 1, value, orderBy, filtersValues, baseFilters);
  };

  const onPageChangeHandle = (data: any) => {
    setUrlWithFilters("/search", navigate, query, data.selected + 1, pageSize, orderBy, filtersValues, baseFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const onOrderChange = (value: string) => {
  //   localStorage.setItem("mainOrderBy", value);
  //   setUrlWithFilters(window.location.pathname, navigate, query, page, pageSize, value, filtersValues, baseFilters);
  // };

  // const openRfqModal = () => {
  //   if (isAuthenticated) {
  //     dispatch(rfqModalOpen(_query));
  //   } else {
  //     navigate("/auth/login");
  //   }
  // };

  const onHideMenuHandle = () => {
    localStorage.setItem("sidebarMenuHide", `${!hideSideBar}`);
    setHideSideBar(!hideSideBar);
  };

  const onChangeInStock = () => {
    setUrlWithFilters(window.location.pathname, navigate, isSearchPage ? query : "", 1, pageSize, orderBy, null, {
      ...baseFilters,
      base_in_stock: false,
      base_num_in_stock: "",
    });
    dispatch(toggleReloadSearchFlag());
    localStorage.setItem("productStock", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        {/* Step-by-step tutorial */}
        <Dialog className={classes.tourDialog} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle>
            <h2>First time on ChipAssist?</h2>
            <p>Check out our quick interactive guide</p>
          </DialogTitle>
          <DialogActions>
            <Button className={appTheme.buttonCreate} onClick={onStartTour} variant="contained">
              Yes, please
            </Button>
            <Button className={classes.skipTourButton} onClick={onCloseTour} variant="outlined">
              Skip
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
          <div
            className={clsx(classes.searchPageLayout, {
              [classes.rightPosition]: isRightSidebar,
              right: isRightSidebar,
              hideFilters: hideSideBar || !constants.SHOW_FILTERS,
              removeFilters: !constants.SHOW_FILTERS,
            })}
          >
            <div
              className={clsx(classes.searchPageSidebar, {
                [classes.rightPosition]: isRightSidebar,
                right: isRightSidebar,
                hideFilters: hideSideBar || !constants.SHOW_FILTERS,
                removeFilters: !constants.SHOW_FILTERS,
              })}
            >
              {constants.SHOW_FILTERS && (
                <Filters
                  isRightSidebar={isRightSidebar}
                  togglePosition={() => setIsRightSidebar(!isRightSidebar)}
                  onHideToggle={onHideMenuHandle}
                  isHideFilters={hideSideBar}
                />
              )}
            </div>
            <div className={classes.searchPageResults}>
              {count !== 0 && (
                <div id="filters_sticky_container" style={{ padding: "12px 0 8px" }}>
                  <Sticky
                    className={clsx(classes.stickyContainer, {
                      [classes.stickyContainerMarginDesktop]: !isSmDown,
                      [classes.stickyContainerMarginMobile]: isSmDown,
                    })}
                    topOffset={0}
                    onFixedToggle={fixedStickyContainerHeight}
                  >
                    <div className={commonClasses.filtersRow}>
                      <FiltersContainer>
                        {!isSmDown && !isLoadingSearchResultsInProgress && <ExtendedSearchBar />}
                        <FilterResultsBar count={constants.isNewSearchPage ? count || rfqData.count : count} />
                        {!constants.isNewSearchPage && (
                          <FilterStockBar disable={isLoadingSearchResultsInProgress || isExtendedSearchStarted} />
                        )}
                        <FilterCurrency />
                        {!isSmDown && (
                          <FilterPageSizeChoiceBar
                            storageKey={`searchShowBy`}
                            action={onChangePageSize}
                            disable={isLoadingSearchResultsInProgress}
                          />
                        )}
                        {/* <FilterOrderByBar */}
                        {/*  value={orderBy} */}
                        {/*  onChange={onOrderChange} */}
                        {/*  disable={isLoadingSearchResultsInProgress} */}
                        {/* /> */}
                      </FiltersContainer>
                    </div>
                  </Sticky>
                </div>
              )}
              {count !== 0 && isSmDown && !isLoadingSearchResultsInProgress && (
                <div style={{ padding: "0 0 4px" }}>
                  <FiltersContainer>{!isLoadingSearchResultsInProgress && <ExtendedSearchBar />}</FiltersContainer>
                </div>
              )}

              {isLoadingSearchResultsInProgress ? (
                <Skeletons />
              ) : (
                <div id={"productList"}>
                  <ProductsSegment>
                    {products?.map((product, key) => {
                      const rfq = rfqData.results.find((item) => item.id === product.id);
                      return constants.isNewSearchPage ? (
                        <ProductCardNew
                          key={product.id}
                          product={product}
                          rfqData={rfq}
                          searchQuery={query}
                          id={`product-item-${key}`}
                        />
                      ) : (
                        <ProductCard key={product.id} product={product} searchQuery={query} />
                      );
                    })}
                  </ProductsSegment>
                  {!constants.isNewSearchPage &&
                    (baseFilters?.base_in_stock || filtersValues?.base_num_in_stock) &&
                    count > 0 &&
                    !!rfqsHintCount && (
                      <div style={{ marginTop: 30, textAlign: "center" }}>
                        <div className={classes.hintText_1}>{t("in_stock_hint_5")}</div>
                        <div className={classes.hintText_2}>
                          {t("in_stock_hint_2")}
                          <span className={clsx(appTheme.hyperlink, classes.link)} onClick={onChangeInStock}>
                            {t("in_stock_hint_3")}
                          </span>
                          {t("in_stock_hint_4")}
                        </div>
                      </div>
                    )}
                </div>
              )}
              {isExtendedSearchStarted && count === 0 && (constants.isNewSearchPage ? rfqData.count === 0 : true) && (
                <div className={classes.searchResultEmpty}>
                  <h2>{t("extended_progress")}</h2>
                  <div style={{ maxWidth: "320px", margin: "auto" }}>
                    <Progress />
                  </div>
                </div>
              )}
              {!constants.isNewSearchPage &&
                !isLoadingSearchResultsInProgress &&
                !isExtendedSearchStarted &&
                count === 0 && (
                  <div className={classes.searchResultEmpty}>
                    <h2 style={{ marginBottom: 20 }}>{t("not_found")}</h2>

                    {baseFilters?.base_in_stock || (filtersValues.base_num_in_stock && !!rfqsHintCount) ? (
                      <div style={{ marginBottom: 20 }}>
                        <div className={classes.hintText_1}>{t("in_stock_hint_1")}</div>
                        <div className={classes.hintText_2}>
                          {t("in_stock_hint_2")}
                          <span className={clsx(appTheme.hyperlink, classes.link)} onClick={onChangeInStock}>
                            {t("in_stock_hint_3")}
                          </span>
                          {t("in_stock_hint_4")}
                        </div>
                        <div style={{ fontSize: "1.2rem" }} className={classes.hintText_1}>
                          {t("in_stock_hint_6")}
                        </div>
                      </div>
                    ) : (
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
                    )}
                    <div style={{ maxWidth: 500, margin: "0 auto" }}>
                      <RFQForm />
                    </div>
                  </div>
                )}

              {constants.isNewSearchPage &&
                !isLoadingSearchResultsInProgress &&
                !isExtendedSearchStarted &&
                count === 0 && (
                  <div className={classes.searchResultEmpty}>
                    <h2 style={{ marginBottom: 20 }}>{t("not_found")}</h2>
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
                    <p
                      className={classes.rfqText}
                      dangerouslySetInnerHTML={{
                        __html: t("rfq.modal_text", {
                          interpolation: { escapeValue: false },
                          partNumber: rfqItem.partNumber,
                        }),
                      }}
                    />
                    <div style={{ maxWidth: 500, margin: "0 auto" }}>
                      <RFQForm />
                    </div>
                  </div>
                )}

              <div className={classes.paginationBlock}>
                {!isLoadingSearchResultsInProgress && count > 0 && totalPages > 1 && (
                  <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChangeHandle} />
                )}
                {/* {constants.isNewSearchPage && */}
                {/*  !isLoadingSearchResultsInProgress && */}
                {/*  count === 0 && */}
                {/*  rfqData.count > 0 && */}
                {/*  rfqData.total_pages > 1 && ( */}
                {/*    <Paginate */}
                {/*      pageCount={rfqData.total_pages} */}
                {/*      activePage={rfqData.page} */}
                {/*      onPageChange={onPageChangeHandle} */}
                {/*    /> */}
                {/*  )} */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {!sessionStorage.getItem("before_unload_alert_disabled") && <BeforeUnloadModal />}
    </Page>
  );
};

export default SearchResults;
