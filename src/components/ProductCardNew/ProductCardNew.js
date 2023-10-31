import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import clsx from "clsx";
import { Paper, Hidden, Box, useMediaQuery, useTheme } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { getDynamicMoq, getImage, getPrice, isProductAvailable } from "@src/utils/product";
import { rfqModalOpen, setQualityCheckData, setSellerMessageData } from "@src/store/rfq/rfqActions";
import useCurrency from "@src/hooks/useCurrency";
import { splitForHighlighter } from "@src/utils/search";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import placeholderImg from "@src/images/cpu.png";
import moq_icon from "@src/images/search_page/moq.png";
import suppliers_icon from "@src/images/search_page/suppliers.svg";
import time_icon from "@src/images/search_page/time.svg";
import usd_icon from "@src/images/search_page/usd.svg";
import warehouse_icon from "@src/images/search_page/warehouse.svg";
import { formatMoney } from "@src/utils/formatters";
// import AddToCartButton from "@src/components/AddToCartButton/AddToCartButton";
import RequestButton from "@src/components/ProductCardNew/components/RequestButton/RequestButton";
import { useInView } from "react-intersection-observer";
import { SetProductIntoViewport } from "@src/store/products/productsActions";
import DistributorsMobile from "./components/DistributorsMobile/DistributorsMobile";
import DistributorsDesktop from "./components/DistributorsDesktop/DistributorsDesktop";
import { useStyles } from "./productCardStyles";

const ProductCardNew = (props) => {
  const { product, searchQuery, viewType } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { currencyPrice } = useCurrency();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down(565));
  const initialMobileCard = useMediaQuery(theme.breakpoints.down(800));

  const smart_view = useAppSelector((state) => state.search.smart_view);
  const partners = useAppSelector((state) => state.sellers.items);
  // const cartItems = useAppSelector((state) => state.cart.items);
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

  const [sortedStockrecords, setSortedStockrecords] = useState([]);
  const [availableStockrecords, setAvailableStockrecords] = useState([]);
  const [rfqStockrecords] = useState([]);
  // const [showRfqStocks, setShowRfqStocks] = useState(false);
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [mainImage, setMainImg] = useState(null);
  const [rfq, setRfq] = useState(null);
  // const [inCart, setInCart] = useState(false);
  // const [inCartCount, setInCartCount] = useState(false);
  const [requestedQty, setRequestedQty] = useState(null);

  // useEffect(() => {
  //   const cartItem = cartItems?.find((item) => item.product.id === product.id);
  //   setInCart(!!cartItem);
  //   setInCartCount(cartItem?.quantity || 0);
  // }, [cartItems]);

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
    if (product) {
      setMainImg(getImage(product));
    }
  }, [product]);

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
            price_1: currencyPrice(getPrice(1, val, false), val.price_currency) || 0,
            price_10: currencyPrice(getPrice(10, val, false), val.price_currency) || 0,
            price_100: currencyPrice(getPrice(100, val, false), val.price_currency) || 0,
            price_1000: currencyPrice(getPrice(1000, val, false), val.price_currency) || 0,
            price_10000: currencyPrice(getPrice(10000, val, false), val.price_currency) || 0,
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

  // const handleAddToCart = () => {
  //   if (inCart) {
  //     return navigate("/cart");
  //   }
  //
  //   return false;
  //   // return dispatch(showAddToListModalAction(product));
  // };

  // const addToCartButton = (
  //   <Button
  //     variant="contained"
  //     onClick={handleAddToCart}
  //     onMouseOver={() => setHoverAddToList(true)}
  //     onMouseOut={() => setHoverAddToList(false)}
  //     className={clsx(classes.addToCart, "add-to-cart-button", {
  //       [classes.inCart]: inCart,
  //       [classes.inCartMobile]: inCart && isSmDown,
  //     })}
  //   >
  //     {inCart ? (
  //       hoverAddToList || isSmDown ? (
  //         t("cart.in_list")
  //       ) : (
  //         <div className={classes.listIconWrapper}>
  //           <img className={classes.listIcon} src={list_icon} alt="list icon" />
  //           <span className={classes.listIconCount}>{inCartCount || 0}</span>
  //           <span className={classes.listIconPcs}> pcs</span>
  //         </div>
  //       )
  //     ) : (
  //       t("cart.add_list")
  //     )}
  //   </Button>
  // );

  // const collapseRfqStocksHandler = () => {
  //   if (rfqStockrecords.length) setShowRfqStocks((prev) => !prev);
  // };

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
              to={
                viewType === ID_ELFARO
                  ? `/product/${encodeURIComponent(product.upc)}/${sortedStockrecords[0]?.id}`
                  : `/product/${encodeURIComponent(product.upc)}/${product.id}`
              }
              className={appTheme.hyperlink}
            >
              <img
                alt="Product image"
                className={classes.image}
                src={mainImage}
                onError={() => setMainImg(placeholderImg)}
              />
            </Link>
          </div>
          <div className={classes.titleColumn}>
            <Link
              to={
                viewType === ID_ELFARO
                  ? `/product/${encodeURIComponent(product.upc)}/${sortedStockrecords[0]?.id}`
                  : `/product/${encodeURIComponent(product.upc)}/${product.id}`
              }
            >
              <div name="product_name" id="product_name_id" className={classes.title}>
                <Highlighter
                  className={classes.titlePartNumber}
                  searchWords={searchQueryArray}
                  textToHighlight={`${product.upc}`}
                  autoEscape={true}
                />
              </div>
            </Link>
            <div className={`${appTheme.text} ${classes.description}`}>
              <Highlighter
                className={classes.manufacturerName}
                searchWords={searchQueryArray}
                textToHighlight={product.manufacturer ? product.manufacturer.name : "" || ""}
                autoEscape={true}
              />
            </div>
            <div className={`${appTheme.text} ${classes.description}`}>
              <Highlighter
                searchWords={searchQueryArray}
                textToHighlight={product.description || ""}
                autoEscape={true}
              />
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
          {/* <AddToCartButton inCart={inCart} inCartCount={inCartCount} product={product} isSmDown={isSmDown} /> */}
        </div>
      </Hidden>

      {!availableStockrecords.length && (
        <>
          <div className={classes.availableItemsHint}>AVAILABLE ON OFFLINE STOCKS:</div>
          <div className={classes.iconsContainer}>
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
                    : "By request"}
                </div>
                {!initialMobileCard && <div>Average price</div>}
              </div>
            </Box>
            <Box display="flex" alignItems="center" className={classes.iconWrapper}>
              <div className="product-card-icon-wrapper">
                <img src={warehouse_icon} alt="stock" />
              </div>
              <div className={classes.iconValueWrapper}>
                <div className={classes.iconValue}>
                  {rfq?.num_in_stock ? formatMoney(rfq.num_in_stock, 0) : "By request"}
                </div>
                {!initialMobileCard && <div>In stock</div>}
              </div>
            </Box>
            {!isXsDown && (
              <Box display="flex" alignItems="center" className={classes.iconWrapper}>
                <div className="product-card-icon-wrapper">
                  <img src={suppliers_icon} alt="suppliers" />
                </div>
                <div className={classes.iconValueWrapper}>
                  <div className={classes.iconValue}>{rfq?.sellers ? `${rfq.sellers}+` : "1+"}</div>
                  {!initialMobileCard && <div>Suppliers</div>}
                </div>
              </Box>
            )}
            <Box display="flex" alignItems="center" className={classes.iconWrapper}>
              <div className="product-card-icon-wrapper">
                <img src={time_icon} alt="delivery" />
              </div>
              <div className={classes.iconValueWrapper}>
                <div className={classes.iconValue}>2-4 weeks</div>
                {!initialMobileCard && <div>Delivery time</div>}
              </div>
            </Box>
            {!isXsDown && (
              <Box display="flex" alignItems="center" className={classes.iconWrapper}>
                <div className="product-card-icon-wrapper">
                  <img src={moq_icon} alt="moq" />
                </div>
                <div className={classes.iconValueWrapper}>
                  <div className={classes.iconValue}>
                    {rfq?.min_moq ? formatMoney((rfq.min_moq + rfq.max_moq) / 2, 0) : "1"}
                  </div>
                  {!initialMobileCard && <div>Average quantity</div>}
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
      {!availableStockrecords.length && (
        <div className={classes.rfqHint}>Products on offline stocks are available by request</div>
      )}
    </Paper>
  );
};

export default React.memo(ProductCardNew);
