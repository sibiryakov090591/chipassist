import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import clsx from "clsx";
import { Paper, Hidden, Box, useMediaQuery, useTheme } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { getDynamicMoq, getPrice, isProductAvailable } from "@src/utils/product";
import { rfqModalOpen, setQualityCheckData, setSellerMessageData } from "@src/store/rfq/rfqActions";
import useCurrency from "@src/hooks/useCurrency";
import { splitForHighlighter } from "@src/utils/search";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import moq_icon from "@src/images/search_page/moq.png";
import suppliers_icon from "@src/images/search_page/suppliers.svg";
import time_icon from "@src/images/search_page/time.svg";
import usd_icon from "@src/images/search_page/usd.svg";
import warehouse_icon from "@src/images/search_page/warehouse.svg";
import mainImage from "@src/images/pcb1.png";
import { formatMoney } from "@src/utils/formatters";
// import AddToCartButton from "@src/components/AddToCartButton/AddToCartButton";
import { useInView } from "react-intersection-observer";
import { SetProductIntoViewport } from "@src/store/products/productsActions";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import RequestButton from "@src/components/ProductCard/components/RequestButton/RequestButton";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import DistributorsMobile from "./components/DistributorsMobile/DistributorsMobile";
import DistributorsDesktop from "./components/DistributorsDesktop/DistributorsDesktop";
import { useStyles } from "./productCardStyles";

const ProductCard = (props) => {
  const { t } = useI18n("product");
  const { product, searchQuery, viewType } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { currencyPrice } = useCurrency();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down(565));
  const initialMobileCard = useMediaQuery(theme.breakpoints.down(800));

  const query = useURLSearchParams("query", true, "", false);

  const smart_view = useAppSelector((state) => state.search.smart_view);
  const partners = useAppSelector((state) => state.sellers.items);
  const shouldUpdateCard = useAppSelector((state) => state.common.shouldUpdateCard);
  const currency = useAppSelector((state) => state.currency);
  const { isShow } = useAppSelector((state) => state.products.requestHint);

  const { ref } = useInView({
    threshold: 1,
    skip: isSmDown || isShow || !!localStorage.getItem("product_request_hint_disabled"),
    onChange: (inView) => {
      if (!localStorage.getItem("product_request_hint_disabled") && inView) {
        dispatch(SetProductIntoViewport(product.id));
      }
    },
  });

  const [collapseText, setCollapseText] = useState(true);
  const [sortedStockrecords, setSortedStockrecords] = useState([]);
  const [availableStockrecords, setAvailableStockrecords] = useState([]);
  const [rfqStockrecords] = useState([]);
  // const [showRfqStocks, setShowRfqStocks] = useState(false);
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [rfq, setRfq] = useState(null);
  const [requestedQty, setRequestedQty] = useState(null);

  useEffect(() => {
    if (!rfq && rfqStockrecords.length) {
      const data = {};

      rfqStockrecords.forEach((sr) => {
        // Price
        sr.prices.forEach((price) => {
          if (sr.num_in_stock && (!data.min_price || (data.min_price && data.min_price > price.price))) {
            data.min_price = price.price;
            data.min_price_currency = sr.price_currency;
          }
          if (sr.num_in_stock && (!data.max_price || (data.max_price && data.max_price < price.price))) {
            data.max_price = price.price;
            data.max_price_currency = sr.price_currency;
          }
        });
        // Stock
        if (!data.num_in_stock || (data.num_in_stock && data.num_in_stock < sr.num_in_stock)) {
          data.num_in_stock = sr.num_in_stock;
        }
        // MOQ
        data.min_moq = data.min_moq && sr.moq > data.min_moq ? data.min_moq : sr.moq;
        data.max_moq = data.max_moq && sr.moq < data.max_moq ? data.max_moq : sr.moq;
      });
      // Suppliers
      data.sellers = rfqStockrecords.length;
      setRfq(data);
    }
  }, [rfqStockrecords]);

  useEffect(() => {
    if (searchQuery) {
      setSearchQueryArray([
        ...splitForHighlighter(searchQuery, product.upc),
        ...splitForHighlighter(searchQuery, `${product.manufacturer?.name || ""} ${product.description || ""}`),
      ]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (product.stockrecords && partners) {
      let filteredMultipleStocks = product.stockrecords.filter((sr) => !!sr.id);
      // .reduce((acc, val) => {
      //   return isDuplicateStockrecord(acc, val) ? acc : [...acc, val];
      // }, []);
      if (smart_view) {
        const globalSellersAmount = filteredMultipleStocks.filter((sRecord) => {
          const partner = partners?.find((i) => i.id === sRecord.partner);
          return partner && Object.prototype.hasOwnProperty.call(partner, "link_to_site");
        }).length;
        filteredMultipleStocks =
          globalSellersAmount > 4
            ? filteredMultipleStocks.filter((sRecord) => sRecord.num_in_stock > 0)
            : filteredMultipleStocks;
      }
      const bestDateUpdated = filteredMultipleStocks.reduce((acc, sr) => {
        const updatedTime = new Date(sr.date_updated.replace(/ /g, "T")).getTime();
        return Math.max(acc, updatedTime);
      }, 0);

      setSortedStockrecords(
        filteredMultipleStocks.map((val) => {
          const isElfaroSeller = val.partner_name?.toLowerCase().includes("elfaro");
          const dateUpdated = isElfaroSeller
            ? Date.now() >= bestDateUpdated + 3000
              ? new Date(bestDateUpdated + 3000).toISOString()
              : new Date().toISOString()
            : val.date_updated;
          return {
            ...val,
            date_updated: dateUpdated,
            delivery_sort_value: val.lead_period_str
              ? Number(val.lead_period_str.replace(/\D/gi, ""))
              : val.lead_period
              ? Number(val.lead_period)
              : 0,
            datecode_sort_value:
              (val.partner_sku.includes("datecode:") &&
                val.partner_sku.match(/\d+/) &&
                Number(val.partner_sku.match(/\d+/)[0])) ||
              0,
            price_1: val.price_currency ? currencyPrice(getPrice(1, val, false), val.price_currency) || 0 : 0,
            price_10: val.price_currency ? currencyPrice(getPrice(10, val, false), val.price_currency) || 0 : 0,
            price_100: val.price_currency ? currencyPrice(getPrice(100, val, false), val.price_currency) || 0 : 0,
            price_1000: val.price_currency ? currencyPrice(getPrice(1000, val, false), val.price_currency) || 0 : 0,
            price_10000: val.price_currency ? currencyPrice(getPrice(10000, val, false), val.price_currency) || 0 : 0,
            isOnline: isProductAvailable(val) ? 1 : 0,
            updatedTime: Date.now() - new Date(dateUpdated).getTime(),
            moq: getDynamicMoq(val),
          };
        }),
      );
    }
  }, [product.stockrecords, currency, smart_view, partners]);

  useEffect(() => {
    if (sortedStockrecords) {
      // setAvailableStockrecords(sortedStockrecords.filter((sr) => isProductAvailable(sr, 1, ["No price"])));
      // setRfqStockrecords(sortedStockrecords.filter((sr) => !isProductAvailable(sr, 1, ["No price"])));
      setAvailableStockrecords(sortedStockrecords);
    }
  }, [sortedStockrecords]);

  const sendRfqOpenModal = React.useCallback(
    () => dispatch(rfqModalOpen(product.upc, 1, null, null, null, null, "rfq", product.id)),
    [rfq],
  );
  const sellerMessageOpenModal = React.useCallback(
    (sellerId, sellerName, stockrecordId) => (e) => {
      e.stopPropagation();
      return dispatch(setSellerMessageData(true, product.upc, sellerId, sellerName, stockrecordId));
    },
    [product],
  );
  const qualityCheckOpenModal = React.useCallback(
    (sellerId, sellerName, stockrecordId) => (e) => {
      e.stopPropagation();
      return dispatch(setQualityCheckData(true, product.upc, sellerId, sellerName, stockrecordId));
    },
    [product],
  );

  useEffect(() => {
    const requestedData = localStorage.getItem(product.id) && JSON.parse(localStorage.getItem(product.id));
    if (requestedData) {
      const prevDate = Number(requestedData.date);
      const currentDate = Date.now();
      const msInDay = 1000 * 60 * 60 * 24;

      const diff = Math.floor((currentDate - prevDate) / msInDay);

      if (diff >= 1) {
        localStorage.removeItem(product.id);
        setRequestedQty(null);
      } else {
        setRequestedQty(requestedData.value);
      }
    }
  }, [shouldUpdateCard]);

  // const collapseRfqStocksHandler = () => {
  //   if (rfqStockrecords.length) setShowRfqStocks((prev) => !prev);
  // };

  const toggleCollapseText = () => {
    setCollapseText((prev) => !prev);
  };

  const getDescription = () => {
    const descriptionInAttributes = product.attributes.find((attribute) => attribute.name === "Description");

    return collapseText && isSmDown
      ? descriptionInAttributes?.value?.slice(0, 100) || product.description?.slice(0, 100)
      : descriptionInAttributes?.value || product.description || "";
  };

  return (
    <Paper
      ref={ref}
      elevation={3}
      className={clsx("product-card", classes.productCard, {
        [classes.productCard]: true,
        [classes.productCardElfaro]: viewType === ID_ELFARO,
      })}
    >
      <div className={classes.row}>
        <Box display="flex" justifyContent="space-between">
          <div className={classes.imageColumn}>
            <Link
              to={`/product/${encodeURIComponent(product.upc)}/${
                sortedStockrecords[0]?.id ? sortedStockrecords[0]?.id : `?productId=${product.id}`
              }`}
              // to={
              //   viewType === ID_ELFARO
              //     ? `/product/${encodeURIComponent(product.upc)}/${sortedStockrecords[0]?.id}`
              //     : `/product/${encodeURIComponent(product.upc)}/${product.id}`
              // }
              className={appTheme.hyperlink}
            >
              <img alt="Product image" className={classes.image} src={mainImage} />
            </Link>
          </div>
          <div className={classes.titleColumn}>
            <Link
              to={`/product/${encodeURIComponent(product.upc)}/${
                sortedStockrecords[0]?.id ? sortedStockrecords[0]?.id : `?productId=${product.id}`
              }`}
            >
              <div name="product_name" id="product_name_id" className={classes.title}>
                <Highlighter
                  className={classes.titlePartNumber}
                  searchWords={searchQueryArray}
                  textToHighlight={query || "MAX32"}
                  autoEscape={true}
                />
              </div>
            </Link>
            <div className={`${appTheme.text} ${classes.description}`}>
              <Highlighter
                className={classes.manufacturerName}
                searchWords={searchQueryArray}
                textToHighlight={
                  product.manufacturer
                    ? product.manufacturer.name === "Not Specified"
                      ? t("not_specified")
                      : product.manufacturer.name
                    : t("not_specified") || t("not_specified")
                }
                autoEscape={true}
              />
            </div>
            <div className={`${appTheme.text} ${classes.description}`}>
              <Highlighter
                searchWords={searchQueryArray}
                textToHighlight={
                  // collapseText && isSmDown ? product.description?.slice(0, 100) : product.description || ""
                  getDescription()
                }
                autoEscape={true}
              />
              {isSmDown && product.description?.length > 100 && (
                <>
                  {" "}
                  <span onClick={toggleCollapseText} className={appTheme.hyperlink}>
                    {collapseText ? t("collapse_text.true") : t("collapse_text.false")}
                  </span>
                </>
              )}
            </div>
          </div>
        </Box>
        <Hidden xsDown>
          <Box display="flex">
            {/* <div>{addToBomButton}</div> */}
            <div className={classes.actionRow}>
              <RequestButton product={product} classes={classes} requestedQty={requestedQty} />
              {/* <AddToCartButton inCart={inCart} inCartCount={inCartCount} product={product} isSmDown={isSmDown} /> */}
            </div>
          </Box>
        </Hidden>
      </div>
      {!!availableStockrecords.length && (
        <div style={{ position: "relative" }}>
          {!initialMobileCard && (
            <DistributorsDesktop
              product={product}
              sortedStockrecords={availableStockrecords}
              rfqOpenModal={sendRfqOpenModal}
              sellerMessageOpenModal={sellerMessageOpenModal}
              qualityCheckOpenModal={qualityCheckOpenModal}
            />
          )}
          {initialMobileCard && (
            <DistributorsMobile
              product={product}
              sortedStockrecords={availableStockrecords}
              sellerMessageOpenModal={sellerMessageOpenModal}
            />
          )}
        </div>
      )}

      <Hidden smUp>
        <div className={classes.mobileActions}>
          <RequestButton product={product} classes={classes} requestedQty={requestedQty} />
          {/* <AddToCartButton */}
          {/*  inCart={inCart} */}
          {/*  inCartCount={inCartCount} */}
          {/*  product={product} */}
          {/*  isSmDown={isSmDown} */}
          {/*  requestedQty={requestedQty} */}
          {/* /> */}
        </div>
      </Hidden>

      {!availableStockrecords.length && (
        <>
          <div className={classes.availableItemsHint}>{t("available_on_offline")}:</div>
          <div className={rfq?.min_moq ? classes.iconsContainer : classes.iconsNoMoqContainer}>
            <Box display="flex" alignItems="center" className={classes.iconWrapper}>
              <div className="product-card-icon-wrapper">
                <img src={usd_icon} alt="usd" />
              </div>
              <div className={classes.iconValueWrapper}>
                <div className={classes.iconValue}>
                  {rfq?.min_price && rfq?.num_in_stock
                    ? `${formatMoney(currencyPrice((rfq.min_price + rfq.max_price) / 2, rfq.min_price_currency))} ${
                        currency.selected.symbol
                      }`
                    : t("by_req")}
                </div>
                {!initialMobileCard && <div>{t("avg_price")}</div>}
              </div>
            </Box>
            <Box display="flex" alignItems="center" className={classes.iconWrapper}>
              <div className="product-card-icon-wrapper">
                <img src={warehouse_icon} alt="stock" />
              </div>
              <div className={classes.iconValueWrapper}>
                <div className={classes.iconValue}>
                  {rfq?.num_in_stock ? formatMoney(rfq.num_in_stock, 0) : t("by_req")}
                </div>
                {!initialMobileCard && <div>{t("in_stock")}</div>}
              </div>
            </Box>
            {!isXsDown && (
              <Box display="flex" alignItems="center" className={classes.iconWrapper}>
                <div className="product-card-icon-wrapper">
                  <img src={suppliers_icon} alt="suppliers" />
                </div>
                <div className={classes.iconValueWrapper}>
                  <div className={classes.iconValue}>{rfq?.sellers ? `${rfq.sellers}+` : "1+"}</div>
                  {!initialMobileCard && <div>{t("suppliers")}</div>}
                </div>
              </Box>
            )}
            <Box
              display="flex"
              alignItems="center"
              className={rfq?.min_moq ? classes.iconWrapper : classes.iconNoMoqWrapper}
            >
              <div className="product-card-icon-wrapper">
                <img src={time_icon} alt="delivery" />
              </div>
              <div className={classes.iconValueWrapper}>
                <div className={classes.iconValue}>2-4 {t("weeks")}</div>
                {!initialMobileCard && <div>{t("del_time")}</div>}
              </div>
            </Box>
            {!isXsDown && rfq?.min && (
              <Box display="flex" alignItems="center" className={classes.iconWrapper}>
                <div className="product-card-icon-wrapper">
                  <img src={moq_icon} alt="moq" />
                </div>
                <div className={classes.iconValueWrapper}>
                  <div className={classes.iconValue}>
                    {rfq?.min_moq ? formatMoney((rfq.min_moq + rfq.max_moq) / 2, 0) : "1"}
                  </div>
                  {!initialMobileCard && <div>{t("avg_qty")}</div>}
                </div>
              </Box>
            )}
          </div>
          {/* <Collapse in={showRfqStocks}> */}
          {/*  <div style={{ position: "relative" }}> */}
          {/*    <Hidden smDown> */}
          {/*      <DistributorsDesktop */}
          {/*        product={product} */}
          {/*        sortedStockrecords={rfqStockrecords} */}
          {/*        rfqOpenModal={sendRfqOpenModal} */}
          {/*        sellerMessageOpenModal={sellerMessageOpenModal} */}
          {/*      /> */}
          {/*    </Hidden> */}
          {/*    <Hidden mdUp> */}
          {/*      <DistributorsMobile */}
          {/*        sortedStockrecords={rfqStockrecords} */}
          {/*        sellerMessageOpenModal={sellerMessageOpenModal} */}
          {/*      /> */}
          {/*    </Hidden> */}
          {/*  </div> */}
          {/* </Collapse> */}
        </>
      )}
      {!availableStockrecords.length && <div className={classes.rfqHint}>{t("prod_on_offline")}</div>}
    </Paper>
  );
};

export default React.memo(ProductCard);
