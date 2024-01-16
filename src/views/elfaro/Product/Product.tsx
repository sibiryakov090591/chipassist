import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { loadProductById, loadStockrecordById } from "@src/store/products/productsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { Stockrecord } from "@src/store/products/productTypes";
import {
  getAttributes,
  getDynamicMoq,
  getImage,
  getPrice,
  getValidQuantityPriceStatus,
  isProductAvailable,
} from "@src/utils/product";
import { formatMoney } from "@src/utils/formatters";
import useCurrency from "@src/hooks/useCurrency";
import { useStyles as useProductStyles } from "@src/views/chipassist/Product/productStyles";
import { Button, Table, TableBody, TableCell, TableRow, Box, Container } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { addCartItem } from "@src/store/cart/cartActions";
import clsx from "clsx";
import Preloader from "@src/components/Preloader/Preloader";
import Error404 from "@src/views/chipassist/Error404";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import useAppTheme from "@src/theme/useAppTheme";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import { Page } from "@src/components";
import placeholderImg from "@src/images/cpu.png";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { useStyles } from "./productStyles";

const Product = () => {
  const [stockrecord, setStockrecord] = useState<Stockrecord>();
  const [orderQty, setOrderQty] = useState(1);
  const [MOQ, setMOQ] = useState(null);
  // const [prices, setPrices] = useState([1, 10, 100, 1000, 10000]);
  const [prices, setPrices] = useState([]);
  const [mainImage, setMainImg] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEqualPartnumber, setIsEqualPartnumber] = useState(null);
  // const [openQuickOrderModal, setOpenQuickOrderModal] = useState(false);

  const classes = useStyles();
  const appTheme = useAppTheme();
  const productClasses = useProductStyles();
  const { partnumber, stockrecordId } = useParams<{ partnumber: string; stockrecordId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currency, currencyPrice } = useCurrency();
  const productData = useAppSelector((state) => state.products.productViewData);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isNeedRfqModalOpenAgain = useAppSelector((state) => state.rfq.isNeedRfqModalOpenAgain);
  const isShowQuickButton = useAppSelector((state) => state.common.isShowQuickButton);
  const utm = useAppSelector((state) => state.common.utm);

  const datacodeAttribute = productData?.attributes?.find((v) => v.code === "datecode" || v.name === "Date Code");

  const qtyRef = React.useRef(null);
  // const isAvailable = React.useMemo(() => {
  //   if (stockrecord) return isProductAvailable(stockrecord);
  //   return false;
  // }, [stockrecord]);

  useEffect(() => {
    if (isAuthenticated && isNeedRfqModalOpenAgain) {
      sendRfqOpenModal();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (productData && productData.upc === decodeURIComponent(partnumber)) {
      setIsEqualPartnumber(true);
    } else {
      setIsEqualPartnumber(false);
    }
  }, [productData]);

  useEffect(() => {
    if (productData) {
      setMainImg(getImage(productData));
    }
  }, [productData]);

  useEffect(() => {
    if (cartItems && stockrecord) setAddedToCart(cartItems.some((item) => stockrecord?.id === item?.stockrecord?.id));
  }, [cartItems, stockrecord]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(loadStockrecordById(stockrecordId, { ...utm }))
      .then((sr: Stockrecord) => {
        setStockrecord(sr);
        dispatch(loadProductById(sr.product, { ...utm })).finally(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const { referrer } = document;
    const { origin, search, href } = window.location;
    const wasSent = sessionStorage.getItem("visit");
    if (!wasSent && referrer && !referrer.includes(origin) && search.includes("utm_")) {
      dispatch(
        sendFeedbackMessageThunk("visit", {
          href,
          referrer,
        }),
      ).then(() => {
        sessionStorage.setItem("visit", "true");
      });
    }
  }, []);

  useEffect(() => {
    if (qtyRef.current) {
      qtyRef.current.focus();
    }
  }, [qtyRef.current]);

  useEffect(() => {
    if (stockrecord) {
      const moq = getDynamicMoq(stockrecord);
      setOrderQty(moq || 1);
      setMOQ(moq || 1);
    }
  }, [stockrecord]);

  useEffect(() => {
    if (stockrecordId && stockrecord?.prices && MOQ) {
      setPrices(
        stockrecord.prices
          .filter((pr) => pr.amount >= MOQ)
          .map((pr) => pr.amount)
          .sort((a, b) => a - b),
      );
    }
  }, [stockrecord, productData, MOQ]);

  const changeQtyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D|^0/gi, "");
    setOrderQty(+value);
  };

  const addToCartHandler = () => {
    if (addedToCart) {
      navigate({ pathname: "/cart" });
    } else {
      const { quantity: validQuantity } = getValidQuantityPriceStatus(orderQty, stockrecord);
      dispatch(addCartItem(productData, stockrecord, validQuantity, null, false, true));

      if (isProductAvailable(stockrecord) && orderQty > stockrecord.num_in_stock) {
        const restQty = getValidQuantityPriceStatus(orderQty - validQuantity, stockrecord, 1).quantity;
        dispatch(addCartItem(productData, stockrecord, restQty, `${productData.id}`, false, false, 1));
      }
    }
  };

  const sendRfqOpenModal = () => dispatch(rfqModalOpen(productData.upc, orderQty, stockrecord));

  return (
    <Page
      title={`ChipOnline - ${productData?.upc || "search and order electronic components"}`}
      description={`ChipOnline - ${productData?.upc || "search and order electronic components"}`}
    >
      <Container maxWidth="xl">
        {loading && (
          <div style={{ padding: "120px 0" }}>
            <Preloader title="Page loading..." />
          </div>
        )}
        {!loading && isEqualPartnumber === false && <Error404 />}
        {productData && !loading && isEqualPartnumber && (
          <section id="product" className={classes.productContainer}>
            <Box className={classes.productHeader} display="flex" justifyContent="space-between" alignItems="flex-end">
              <h1>{productData.upc}</h1>
              <FilterCurrency className={classes.currency} />
            </Box>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className={classes.productColumn} style={{ textAlign: "center", flexGrow: 1, minWidth: "250px" }}>
                <img
                  style={{ width: 180, marginTop: 40 }}
                  src={mainImage}
                  alt={"main image"}
                  onError={() => setMainImg(placeholderImg)}
                />
              </div>
              <div className={classes.productColumn} style={{ display: "flex", flexWrap: "wrap" }}>
                <div className={classes.productColumn}>
                  {/* {productData.exclusive && ( */}
                  {/*  <div */}
                  {/*    style={{ */}
                  {/*      border: "1px solid #287c9f", */}
                  {/*      padding: "10px 8px", */}
                  {/*      borderRadius: "4px", */}
                  {/*      backgroundColor: "#f6f5ae", */}
                  {/*      color: "#345", */}
                  {/*    }} */}
                  {/*  > */}
                  {/*    <img src="https://res.cloudinary.com/chipassist/image/upload/v1665675440/elfaro/Icons/attention_myfnso.svg" /> */}
                  {/*    The stock at this price seems to be already booked. <br /> */}
                  {/*    Click <strong>&quot;QUICK REQUEST&quot;</strong> at the right and we will try to locate this */}
                  {/*    product on other stocks. */}
                  {/*  </div> */}
                  {/* )} */}
                  <div className={classes.productColumnHeader}>Part Number:</div>
                  <div className={classes.productColumnValue}>{productData.upc}</div>
                  <div className={classes.productColumnHeader}>Manufacturer:</div>
                  <div className={classes.productColumnValue}>{productData.manufacturer?.name}</div>
                  <div className={classes.productColumnHeader}>Date Code:</div>
                  <div className={classes.productColumnValue}>{datacodeAttribute?.value || "-"}</div>
                  <div className={classes.productColumnHeader}>Lead Time:</div>
                  <div className={classes.productColumnValue}>{stockrecord?.lead_period_str || "-"}</div>
                  <div className={classes.productColumnHeader}>Description:</div>
                  <div>{productData.description || "-"}</div>
                </div>
                <div className={classes.productColumn}>
                  <Box className={classes.inStock} display="flex" justifyContent="space-between" alignItems="center">
                    <div>In Stock:</div>
                    <div style={{ fontSize: "1.6rem" }}>{stockrecord?.num_in_stock} pcs</div>
                  </Box>
                  {/* {!!stockrecord.low_stock_threshold && ( */}
                  {/*  <div className={classes.exclusive}> */}
                  {/*    This product is in high demand. Please request this product and we`ll clarify the price for you. */}
                  {/*    <div>Minimum order quantity (MOQ) is {MOQ}</div> */}
                  {/*  </div> */}
                  {/* )} */}
                  {/* {!stockrecord.low_stock_threshold && ( */}
                  <div className={classes.productTable}>
                    <div className={classes.productTableHeader}>
                      <div>Qty:</div>
                      <div>Unit Price:</div>
                      <div>Ext. Price:</div>
                    </div>
                    <div className={classes.productTableBody}>
                      {!prices.length && (
                        <div>
                          <div>1</div>
                          <div>-</div>
                          <div>-</div>
                        </div>
                      )}
                      {prices.map((amount) => {
                        return (
                          <div key={amount}>
                            <div>{formatMoney(amount, 0, ".", "`")}</div>
                            <div>
                              {getPrice(amount, stockrecord, false)
                                ? `${currency.symbol}${formatMoney(
                                    currencyPrice(getPrice(amount, stockrecord, false), stockrecord?.price_currency),
                                  )}`
                                : "-"}
                            </div>
                            <div>
                              {getPrice(amount, stockrecord, false)
                                ? `${currency.symbol}${formatMoney(
                                    amount *
                                      currencyPrice(getPrice(amount, stockrecord, false), stockrecord?.price_currency),
                                  )}`
                                : "-"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* )} */}
                  {addedToCart ? (
                    <div className={classes.productColumnHeader}>
                      <div className={classes.inCartMessage}>
                        <div>
                          <span>{orderQty}</span> x <span>{productData.upc}</span> in the cart
                        </div>
                      </div>
                      <Box display="flex">
                        <Button
                          disabled={!orderQty || !stockrecord}
                          className={clsx(appTheme.buttonCreate, classes.goToCardButton)}
                          onClick={addToCartHandler}
                        >
                          Go to cart
                        </Button>
                      </Box>
                    </div>
                  ) : (
                    <div className={classes.productColumnHeader}>
                      {MOQ > 1 && `Minimum order: ${MOQ} pcs`}
                      <Box display="flex">
                        <input
                          ref={qtyRef}
                          size={30}
                          value={orderQty}
                          onChange={changeQtyHandler}
                          className={clsx({
                            [classes.productBuyInput]: true,
                            [classes.disabledInput]: addedToCart,
                          })}
                          disabled={addedToCart}
                        />
                        <Button
                          disabled={!orderQty || !stockrecord}
                          className={classes.productBuyButton}
                          onClick={addToCartHandler}
                        >
                          {/* {stockrecord.low_stock_threshold ? "Add to request" : "Add to cart"} */}
                          Add to cart
                        </Button>
                      </Box>
                    </div>
                  )}
                  {isShowQuickButton && (
                    <>
                      <Box className={classes.or} display="flex" justifyContent="center">
                        - OR -
                      </Box>
                      <div>
                        <Button className={clsx(appTheme.buttonCreate, classes.rfqButton)} onClick={sendRfqOpenModal}>
                          {isAuthenticated ? "Send request" : "Quick request"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                {!!Object.keys(getAttributes(productData)).length && (
                  <Table key={uuidv4()} className={productClasses.attributeTable}>
                    <TableBody>
                      <TableRow className={productClasses.attributeTableRow} key={uuidv4()}>
                        <TableCell className={productClasses.attributeTableHeader}>Manufacturer</TableCell>
                        <TableCell>{productData.manufacturer?.name}</TableCell>
                      </TableRow>
                      {Object.keys(getAttributes(productData)).map((group_name) => {
                        return getAttributes(productData)[group_name].map((val) => {
                          return (
                            <TableRow className={productClasses.attributeTableRow} key={uuidv4()}>
                              <TableCell className={productClasses.attributeTableHeader}>{val.name}</TableCell>
                              <TableCell>{val.value}</TableCell>
                            </TableRow>
                          );
                        });
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </section>
        )}
      </Container>
    </Page>
  );
};

export default Product;
