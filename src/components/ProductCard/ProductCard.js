import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link, useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import clsx from "clsx";
import { Paper, Hidden, Button } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { addCartItem } from "@src/store/cart/cartActions";
import { isCartEnabled } from "@src/constants/common";
import useAppTheme from "@src/theme/useAppTheme";
import {
  getDefaultQty,
  getDynamicMoq,
  getImage,
  getPrice,
  isDuplicateStockrecord,
  isProductAvailable,
  validateQuantity,
} from "@src/utils/product";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import _ from "lodash";
import { formatMoney } from "@src/utils/formatters";
import useCurrency from "@src/hooks/useCurrency";
import { splitForHighlighter } from "@src/utils/search";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import placeholderImg from "@src/images/cpu.png";
// import QuickOrderModal from "@src/views/elfaro/Product/components/QuickOrderModal/QuickOrderModal";
import AddToBomButton from "../AddToBomButton/AddToBomButton";
import { useStyles } from "./productCardStyles";
import DistributorsDesktop from "./components/DistributorsDesktop/DistributorsDesktop";
import DistributorsMobile from "./components/DistributorsMobile/DistributorsMobile";
import { NumberInput } from "../Inputs";
import { useStyles as useDistributorsStyles } from "./components/DistributorsDesktop/distributorsDesktopStyles";

const ProductCard = (props) => {
  const { product, searchQuery, viewType } = props;
  const [sortedStockrecords, setSortedStockrecords] = useState([]);
  const [activeSearchTables, setActiveSearchTable] = useState({});
  const [selectedStockrecords, setSelectedStockrecords] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [inCart, setInCart] = useState(false);
  const [cost, setCost] = useState(0);
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [elfaroQtyError, setElfaroQtyError] = useState(null);
  const [mainImage, setMainImg] = useState(null);
  // const [openQuickOrderModal, setOpenQuickOrderModal] = useState(false);

  const classes = useStyles();
  const distributorsClasses = useDistributorsStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const cartItems = useAppSelector((state) => state.cart.items);
  // const [isValidSelectedStockrecord, setIsValidSelectedStockrecord] = useState(true);
  const { t } = useI18n("product");
  const { currency, currencyPrice } = useCurrency();
  const navigate = useNavigate();
  const currencyList = useAppSelector((state) => state.currency.currencyList);
  const prevEmail = useAppSelector((state) => state.profile.prevEmail);

  // const isAvailable = React.useMemo(() => {
  //   if (sortedStockrecords[0]) return isProductAvailable(sortedStockrecords[0]);
  //   return false;
  // }, [sortedStockrecords]);

  useEffect(() => {
    if (product) {
      setMainImg(getImage(product));
    }
  }, [product]);

  useEffect(() => {
    if (searchQuery) {
      setSearchQueryArray(
        splitForHighlighter(
          searchQuery,
          `${product.upc} ${product.manufacturer ? product.manufacturer.name : "" || ""} ${product.description}`,
        ),
      );
    }
  }, [searchQuery]);

  useEffect(() => {
    if (sortedStockrecords.length) {
      setSelectedStockrecords([sortedStockrecords[0]]);
      const { num_in_stock } = sortedStockrecords[0];
      const isAvaible = isProductAvailable(sortedStockrecords[0]);
      const dynamicMoq = getDynamicMoq(sortedStockrecords[0]);
      const defaultQty = isAvaible ? getDefaultQty(dynamicMoq, num_in_stock) : dynamicMoq;
      setQuantityMap((prevState) => ({ ...prevState, [sortedStockrecords[0].id]: defaultQty }));
    }
  }, [sortedStockrecords]);

  useEffect(() => {
    if (cartItems && cartItems.length) {
      // const cartStockrecords = cartItems.filter((v) => selectedStockrecords.some((sv) => sv.id === v.stockrecord?.id));
      const allInCart =
        !!selectedStockrecords.length &&
        selectedStockrecords.every((v) => cartItems.some((sv) => v.id === sv.stockrecord?.id));
      setInCart(allInCart);
    }
  }, [selectedStockrecords, cartItems]);

  useEffect(() => {
    const noDuplicatedStockrecords = product.stockrecords
      .filter((sr) => !!sr.id)
      .reduce((acc, val) => {
        return isDuplicateStockrecord(acc, val) ? acc : [...acc, val];
      }, []);

    setSortedStockrecords(
      _.orderBy(
        noDuplicatedStockrecords.map((val) => ({
          ...val,
          price1: getPrice(1, val),
          isOnline: isProductAvailable(val) ? 1 : 0,
        })),
        ["isOnline", "price1"],
        ["desc", "asc"],
      ),
    );
  }, [product.stockrecords]);

  useEffect(() => {
    const res = selectedStockrecords.reduce((acc, sr) => {
      const qty = quantityMap[sr.id];
      return acc + Number(currencyPrice(getPrice(qty, sr), sr.price_currency)) * qty;
    }, 0);

    setCost(res);
  }, [selectedStockrecords, quantityMap, currency, currencyList]);

  useEffect(() => {
    if (viewType === ID_ELFARO) {
      const sr = sortedStockrecords[0];
      if (!sr) return;

      const qtyError = validateQuantity(quantityMap[sr.id], sr);
      if (qtyError && !elfaroQtyError) setElfaroQtyError(qtyError);
      if (!qtyError && elfaroQtyError) setElfaroQtyError(null);
    }
  }, [quantityMap]);

  // const outOfStock =
  //   !sortedStockrecords.length ||
  //   !sortedStockrecords.filter((val) => {
  //     return val.num_in_stock > 0 && !!val.prices.length && isUpdatedLessOneDay(val.date_updated);
  //   }).length;

  const isActiveTable = () =>
    // productId
    {
      return true;
      // return !!activeSearchTables[productId];
    };

  const setActiveTable = (productId) => {
    const newActiveSearchTable = { ...activeSearchTables };
    newActiveSearchTable[productId] = true;
    setActiveSearchTable(newActiveSearchTable);
  };

  const removeActiveTable = (productId) => {
    const newActiveSearchTable = { ...activeSearchTables };
    delete newActiveSearchTable[productId];
    setActiveSearchTable(newActiveSearchTable);
  };

  const countRowsInTable = 4;

  const showAllOnclick = (productId) => {
    setActiveTable(productId);
  };

  const hideAllOnclick = (productId) => {
    removeActiveTable(productId);
  };

  const setSelectedStockrecordsHandler = (stockrecord) => {
    setSelectedStockrecords((prevState) => {
      if (prevState.some((v) => v.id === stockrecord.id)) return [...prevState.filter((v) => v.id !== stockrecord.id)];
      return [...prevState, stockrecord];
    });
    const isAvaible = isProductAvailable(stockrecord);
    const dynamicMoq = getDynamicMoq(stockrecord);
    const { num_in_stock } = stockrecord;
    const defaultQty = isAvaible ? getDefaultQty(dynamicMoq, num_in_stock) : dynamicMoq;

    setQuantityMap((prevState) => {
      const srQty = Object.keys(quantityMap).some((item) => +item === stockrecord.id);
      if (srQty) {
        const newState = prevState;
        delete newState[stockrecord.id];
        return newState;
      }
      return { ...prevState, [stockrecord.id]: defaultQty };
    });
  };

  const handleAddToCart = () => {
    if (inCart) {
      return navigate("/cart");
    }

    if (selectedStockrecords.length) {
      selectedStockrecords.forEach((stockrecord) => {
        if (cartItems.some((item) => stockrecord?.id === item.stockrecord?.id)) {
          return;
        }
        dispatch(addCartItem(product, stockrecord, quantityMap[stockrecord.id]));
      });
      // setSelectedStockrecords([]);
    } else {
      dispatch(addCartItem(product, sortedStockrecords[0], quantityMap[sortedStockrecords[0].id]));
    }
    return false;
  };

  const handleAddToBomComplete = () => {
    setSelectedStockrecords([]);
    setQuantityMap({});
  };

  const handleOpenBomList = () => {
    if (!isAuthenticated) {
      navigate(prevEmail ? "/auth/login" : "/auth/registration");
      return;
    }
    if (!selectedStockrecords.length && sortedStockrecords.length) {
      const stockrecord = sortedStockrecords.find((val) => {
        return val.num_in_stock > 0 && isUpdatedLessOneDay(val.date_updated) && !!val.prices?.length;
      });
      if (stockrecord) setSelectedStockrecordsHandler(stockrecord);
    }
  };

  function isUpdatedLessOneDay(updatedDate) {
    const msInDay = 24 * 60 * 60 * 1000;
    return new Date().getTime() - Date.parse(updatedDate) < msInDay;
  }

  const handleSelectStockrecord = (stockrecord) => () => {
    if (constants.id === ID_ELFARO) return; // First stockrecord will be always select
    setSelectedStockrecordsHandler(stockrecord);
  };

  const handleChangeQty = (stockrecord) => (e) => {
    let qty = parseInt(e.target.value);
    if (isProductAvailable(stockrecord)) {
      if (qty > stockrecord.num_in_stock) qty = stockrecord.num_in_stock;
    }
    const isSelected = selectedStockrecords.some((v) => v.id === stockrecord?.id);
    if (!isSelected) setSelectedStockrecordsHandler(stockrecord);
    setQuantityMap((prevState) => ({ ...prevState, [stockrecord.id]: qty }));
  };

  const sendQuickOrderOpenModal = () => {
    const qty = quantityMap[sortedStockrecords[0]?.id];
    return dispatch(rfqModalOpen(product.upc, qty, sortedStockrecords[0]));
  };

  const sendRfqOpenModal = () => {
    const qty = Object.values(quantityMap).reduce((acc, item) => (acc > item ? acc : item), null);
    dispatch(rfqModalOpen(product.upc, qty));
  };

  const addToBomButton = (
    <AddToBomButton
      onOpen={handleOpenBomList}
      product={product}
      stockrecords={selectedStockrecords}
      quantityMap={quantityMap}
      completeHandler={handleAddToBomComplete}
      renderButton={(prps) => (
        <Button
          variant="contained"
          className={`${clsx(appTheme.buttonAddToBom, classes.addButton)} add-to-bom-button`}
          disabled={!selectedStockrecords.length}
          {...prps}
          style={{ height: 38 }}
        >
          <div>{t("bom.add_bom")}</div>
        </Button>
      )}
    />
  );

  const quickOrderButton = (
    <Button
      variant="contained"
      className={clsx(appTheme.buttonCreate)}
      disabled={!selectedStockrecords.length}
      onClick={sendQuickOrderOpenModal}
      style={{ height: 38 }}
    >
      {isAuthenticated ? "Send request" : "Quick request"}
    </Button>
  );

  const addToCartButton = (styles) => (
    <Button
      variant="contained"
      onClick={handleAddToCart}
      className={clsx(classes.addToCart, appTheme.buttonCreate, "add-to-cart-button", {
        [classes.addToCartElfaro]: viewType === ID_ELFARO,
        [classes.addedToCart]: inCart,
      })}
      disabled={!selectedStockrecords.length}
      style={{ height: 38, ...styles }}
    >
      {inCart ? t("cart.in_cart") : t("cart.add_cart")}
    </Button>
  );

  return (
    <Paper
      elevation={3}
      className={clsx({
        "product-card": true,
        [classes.productCard]: true,
        [classes.productCardElfaro]: viewType === ID_ELFARO,
      })}
    >
      <div className={classes.row} style={{ paddingTop: 21 }}>
        <div className={classes.imageColumn}>
          <Link
            to={
              viewType === ID_ELFARO
                ? `/product/${encodeURIComponent(product.upc)}/${sortedStockrecords[0]?.id}`
                : `/product/${encodeURIComponent(product.upc)}/${product.id}`
            }
            className={appTheme.hyperlink}
          >
            <img className={classes.image} src={mainImage} onError={() => setMainImg(placeholderImg)} />
          </Link>
        </div>
        <div className={classes.titleColumn}>
          <div name="product_name" id="product_name_id" className={classes.title}>
            <Link
              to={
                viewType === ID_ELFARO
                  ? `/product/${encodeURIComponent(product.upc)}/${sortedStockrecords[0]?.id}`
                  : `/product/${encodeURIComponent(product.upc)}/${product.id}`
              }
              className={appTheme.hyperlink}
            >
              <Highlighter
                className={classes.titlePartNumber}
                searchWords={searchQueryArray}
                textToHighlight={`${product.upc} `}
                autoEscape={true}
              />
              <Highlighter
                searchWords={searchQueryArray}
                textToHighlight={product.manufacturer ? product.manufacturer.name : "" || ""}
                autoEscape={true}
              />
            </Link>
          </div>
          <div className={`${appTheme.text} ${classes.description}`}>
            <Highlighter searchWords={searchQueryArray} textToHighlight={product.description} autoEscape={true} />
          </div>
          {/* {viewType === ID_ELFARO && ( */}
          {/*  <div className={classes.textStock}> */}
          {/*    Stock: <span>{sortedStockrecords[0]?.partner_name}</span> */}
          {/*  </div> */}
          {/* )} */}
        </div>
        <Hidden smDown>
          {viewType !== ID_ELFARO && (
            <div>
              <div className={classes.actionRow}>
                {addToBomButton}
                {isCartEnabled && addToCartButton()}
              </div>
              {!!sortedStockrecords.length && (
                <div className={`${classes.total} total-cost`}>
                  {t("cost")}:
                  <strong style={{ marginLeft: 5 }}>
                    {formatMoney(cost) || "0.00"} {currency?.symbol}
                  </strong>
                </div>
              )}
            </div>
          )}
          {viewType === ID_ELFARO && (
            <div className={classes.elfaroActions}>
              <div className={classes.quickOrderButton}>{quickOrderButton}</div>
              <div>
                <div style={{ position: "relative" }}>
                  {!!elfaroQtyError && (
                    <div className={distributorsClasses.errorWrapper}>
                      <ErrorOutlineIcon className={distributorsClasses.errorIcon} />
                      <div className={distributorsClasses.errorText}>{`${t(elfaroQtyError.i18message)} ${
                        elfaroQtyError.amount
                      }`}</div>
                    </div>
                  )}
                  <NumberInput
                    className={`${classes.qty}`}
                    style={{ width: 120, visibility: inCart ? "hidden" : "initial" }}
                    // label={t("qty_default")}
                    variant="outlined"
                    size="small"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={quantityMap[sortedStockrecords[0]?.id]}
                    defaultValue={
                      isProductAvailable(sortedStockrecords[0])
                        ? getDefaultQty(getDynamicMoq(sortedStockrecords[0]), sortedStockrecords[0]?.num_in_stock)
                        : getDynamicMoq(sortedStockrecords[0])
                    }
                    onChange={handleChangeQty(sortedStockrecords[0])}
                    onFocus={(e) => e.target.select()}
                    decimalScale={0}
                    isAllowedZero={false}
                  />
                </div>
                {isCartEnabled && addToCartButton({ marginTop: 5, marginLeft: 0, width: "100%" })}
              </div>
            </div>
          )}
        </Hidden>
      </div>
      <div style={{ position: "relative" }}>
        <Hidden smDown>
          <DistributorsDesktop
            product={product}
            sortedStockrecords={sortedStockrecords}
            cartItems={cartItems}
            searchQuery={searchQuery}
            handleSelectStockrecord={handleSelectStockrecord}
            selectedStockrecords={selectedStockrecords}
            countRowsInTable={countRowsInTable}
            isActiveTable={isActiveTable}
            quantityMap={quantityMap}
            handleChangeQty={handleChangeQty}
          />
        </Hidden>
        <Hidden mdUp>
          <DistributorsMobile
            product={product}
            sortedStockrecords={sortedStockrecords}
            cartItems={cartItems}
            searchQuery={searchQuery}
            handleSelectStockrecord={handleSelectStockrecord}
            countRowsInTable={countRowsInTable}
            isActiveTable={isActiveTable}
            addToBomButton={addToBomButton}
            addToCartButton={addToCartButton()}
            isAuthenticated={isAuthenticated}
            isCartEnabled={isCartEnabled}
            quantityMap={quantityMap}
            handleChangeQty={handleChangeQty}
          />
        </Hidden>
        <div className={classes.bottomRow}>
          {sortedStockrecords.length > countRowsInTable &&
            (!isActiveTable(product.id) ? (
              <div className={clsx(classes.link, appTheme.hyperlink)} onClick={showAllOnclick.bind(this, product.id)}>
                {t("distributor.show_all")}
              </div>
            ) : (
              <div className={clsx(classes.link, appTheme.hyperlink)} onClick={hideAllOnclick.bind(this, product.id)}>
                {/* t("distributor.show_fewer") */}
              </div>
            ))}

          {viewType !== ID_ELFARO && (
            <Hidden smDown>
              <div
                className={clsx(classes.link, appTheme.hyperlink)}
                onClick={sendRfqOpenModal}
                style={{ paddingBottom: 16 }}
              >
                {t("product.send_rfq")}
              </div>
            </Hidden>
          )}
        </div>
      </div>

      {/* {openQuickOrderModal && ( */}
      {/*  <QuickOrderModal */}
      {/*    product={product} */}
      {/*    stockrecord={sortedStockrecords[0]} */}
      {/*    qty={quantityMap[sortedStockrecords[0]?.id]} */}
      {/*    handleClose={() => setOpenQuickOrderModal(false)} */}
      {/*  /> */}
      {/* )} */}
    </Paper>
  );
};

export default React.memo(ProductCard);
