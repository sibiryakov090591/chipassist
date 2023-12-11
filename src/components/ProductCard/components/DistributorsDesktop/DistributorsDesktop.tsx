import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { Icon } from "react-icons-kit";
import { shopping_cart_ok } from "react-icons-kit/ikons/shopping_cart_ok";
import constants from "@src/constants/constants";
// import { getDateLag } from "@src/utils/date";
import { formatMoney } from "@src/utils/formatters";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import {
  getCostAndQuantity,
  getPrice,
  isProductAvailable,
  getDynamicMoq,
  validateQuantity,
  getDefaultQty,
} from "@src/utils/product";
import clsx from "clsx";
// import Highlighter from "react-highlight-words";
import { BackendCartItem } from "@src/store/cart/cartTypes";
import Price from "@src/components/Price/Price";
import { NumberInput } from "@src/components/Inputs";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Hidden, Tooltip } from "@material-ui/core";
import InfoIcon from "@src/components/Icons/InfoIcon";
import { Link } from "react-router-dom";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO, ID_ICSEARCH } from "@src/constants/server_constants";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./distributorsDesktopStyles";

interface Props {
  product: Product;
  sortedStockrecords: Stockrecord[];
  cartItems: BackendCartItem[];
  searchQuery: string;
  selectedStockrecords: Stockrecord[];
  countRowsInTable: number;
  handleSelectStockrecord: (stockrecord: Stockrecord) => () => void;
  isActiveTable: (productId: number) => boolean;
  quantityMap: { [key: number]: number };
  handleChangeQty: (stockrecord: Stockrecord) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DistributorsDesktop: React.FC<Props> = ({
  product,
  sortedStockrecords,
  cartItems,
  // searchQuery,
  selectedStockrecords,
  countRowsInTable,
  handleSelectStockrecord,
  isActiveTable,
  quantityMap,
  handleChangeQty,
}) => {
  const { t } = useI18n("product");
  const { currency, currencyPrice } = useCurrency();
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const baseFilters = useAppSelector((state) => state.search.baseFilters);
  const packageAttribute = product.attributes.find(
    (v) => (v.name === "Case/Package" && !!v.value) || v.name === "Packaging",
  );
  const datacodeAttribute = product.attributes.find((v) => v.code === "datecode" || v.name === "Date Code");

  function getBasedOnNumInStockPriceData(targetProduct: Product, stockrecord: Stockrecord) {
    let price = null;
    let className = classes.trDynamicPriceBasedOnNumInStock;
    if (targetProduct.stockrecords && baseFilters && !!baseFilters.base_num_in_stock && !!baseFilters.base_in_stock) {
      const { price: dPrice, moq: dMoq } = getCostAndQuantity(baseFilters.base_num_in_stock, stockrecord);
      price = dPrice.price;
      if (dMoq > baseFilters.base_num_in_stock) {
        className = classes.trDynamicPriceBasedOnNumInStockError;
      }
    }

    return { price, className };
  }

  const handleClickQty = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedStockrecords.some((v) => v.id === id)) e.stopPropagation();
  };

  const showDistributor = constants.id !== ID_ICSEARCH && constants.id !== ID_ELFARO;
  const showQuantity = constants.id !== ID_ELFARO;
  const showDC = constants.id === ID_ELFARO;
  const showRate = constants.id !== ID_ELFARO;

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.trTh}>
          {showRate && <th className={classes.thRate}></th>}
          {showDistributor && <th className={classes.thDistributor}>{t("distributor.distributor")}</th>}
          {showQuantity && <th className={classes.thQty}>{t("qty")}</th>}
          <th className={classes.thStock}>{t("distributor.in_stock")}</th>
          <th className={classes.thLeadPeriod}>{t("distributor.lead_period")}</th>
          <th className={classes.thMoq}>{t("distributor.moq")}</th>
          <th className={classes.thMpq}>{t("distributor.mpq")}</th>
          <th className={classes.thPkg}>{t("distributor.pkg")}</th>
          {showDC && <th className={classes.thPkg}>DC</th>}
          <th className={classes.thCurrency}></th>
          <th className={classes.thPricesHint}></th>
          {!!baseFilters?.base_num_in_stock &&
            !!baseFilters?.base_in_stock &&
            ![1, 10, 100, 1000, 10000].includes(baseFilters.base_num_in_stock) && (
              <th className={classes.trDynamicPriceBasedOnNumInStock}>{baseFilters.base_num_in_stock}</th>
            )}
          <th className={classes.th1}>{formatMoney(1, 0, ".", "`")}</th>
          <th className={classes.th10}>{formatMoney(10, 0, ".", "`")}</th>
          <th className={classes.th100}>{formatMoney(100, 0, ".", "`")}</th>
          <Hidden mdDown>
            <th className={classes.th1000}>{formatMoney(1000, 0, ".", "`")}</th>
            <th className={classes.th10000}>{formatMoney(10000, 0, ".", "`")}</th>
          </Hidden>
          {constants.id === ID_ICSEARCH && (
            <th className={classes.thDistributorICsearch}>{t("distributor.distributor")}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedStockrecords &&
          sortedStockrecords.map((val, index) => {
            // const date1 = new Date();
            // const date2 = new Date(val.date_updated);
            // const dateLag = getDateLag(date1, date2);
            const countShowedRows = isActiveTable(product.id) ? sortedStockrecords.length : countRowsInTable;
            const isSelected = selectedStockrecords.some((v) => v.id === val.id);
            const inCart = cartItems.some((v) => v.stockrecord?.id === val.id);
            const { num_in_stock } = val;
            const isAvaible = isProductAvailable(val);
            const dynamicMoq = getDynamicMoq(val);
            const defaultQty = isAvaible ? getDefaultQty(dynamicMoq, num_in_stock) : dynamicMoq;
            const sortedPrices = [...val?.prices].sort((a, b) => a.amount - b.amount).filter((v) => v.price);

            let isShowPricesHint = false;
            sortedPrices.forEach((price) => {
              if (isShowPricesHint) return;
              if (price.price === 0) return;

              if ([1, 10, 100, 1000, 10000].every((i) => i !== price.amount)) {
                isShowPricesHint = true;
              }
            });

            const {
              price: dynamicPriceBasedOnNumInStock,
              className: dynamicPriceClass,
            } = getBasedOnNumInStockPriceData(product, val);

            // const { price: dPrice, moq: dMoq } = getCostAndQuantity(
            //   baseFilters.base_num_in_stock,
            //   { items: targetProduct.stockrecords },
            //   stockRecordId,
            // );
            const qtyError = validateQuantity(quantityMap[val.id], val);

            if (index < countShowedRows) {
              return (
                <tr
                  key={val.id}
                  className={clsx({
                    [classes.trIcSearch]: constants.id !== ID_ELFARO,
                    [classes.trElfaro]: constants.id === ID_ELFARO,
                    [classes.trSelected]: isSelected,
                  })}
                  onClick={handleSelectStockrecord(val)}
                >
                  {showRate && (
                    <td className={classes.trRate}>
                      <div className={classes.trRateInner}>
                        {constants.id === ID_ELFARO ? (
                          <>
                            <div className={classes.checkIconWrapper}>
                              <div className={`${classes.checkIcon} ${isSelected ? "checked" : ""}`}>
                                <CheckIcon />
                              </div>
                            </div>

                            {inCart && (
                              <Link className={classes.cartLink} to={`/cart`} title={t("cart.in_cart")}>
                                <Icon icon={shopping_cart_ok} className={classes.elfaroCartIcon} />
                              </Link>
                            )}
                          </>
                        ) : (
                          <>
                            <div className={classes.checkIconWrapper}>
                              <div className={`${classes.checkIcon} ${isSelected ? "checked" : ""}`}>
                                <CheckIcon />
                              </div>
                            </div>

                            {/* {inCart && ( */}
                            {/*  <Link to={`/cart`} title={t("cart.in_cart")}> */}
                            {/*    <Icon icon={shopping_cart_ok} className={classes.cartIcon} /> */}
                            {/*  </Link> */}
                            {/* )} */}
                          </>
                        )}
                      </div>
                    </td>
                  )}

                  {showDistributor && <td className={`${classes.trDistributor} product-seller`}>{val.partner_name}</td>}
                  {showQuantity && (
                    <td style={{ position: "relative" }}>
                      {!!qtyError && (
                        <div className={classes.errorWrapper}>
                          <ErrorOutlineIcon className={classes.errorIcon} />
                          <div className={classes.errorText}>{`${t(qtyError.i18message)} ${qtyError.amount}`}</div>
                        </div>
                      )}
                      <NumberInput
                        className={`${classes.trQty} product-card-qty`}
                        // style={{ width: 120 }}
                        // label={t("qty_default")}
                        variant="outlined"
                        size="small"
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={quantityMap[val.id]}
                        defaultValue={defaultQty}
                        onChange={handleChangeQty(val)}
                        decimalScale={0}
                        isAllowedZero={false}
                        onClick={handleClickQty(val.id)}
                      />
                    </td>
                  )}
                  <td className={`${classes.trStock} product-stock`}>{formatMoney(val.num_in_stock, 0, ".", "`")}</td>
                  <td className={classes.trStock}>
                    {val.lead_period_str
                      ? val.lead_period_str
                      : val.lead_period
                      ? `${val.lead_period}${t("common.d")}`
                      : "-"}
                  </td>
                  <td className={classes.trMoq}>
                    <span>{formatMoney(dynamicMoq, 0, ".", "`")}</span>
                  </td>
                  <td className={`${classes.trMpq} product-card-mpq`}>{val.mpq}</td>
                  <td className={`${!showDC ? classes.trPkg : classes.trPkgWithoutBorder}`}>
                    {packageAttribute?.value || "-"}
                  </td>
                  {showDC && (
                    <td className={`${classes.trPkg}`}>
                      {datacodeAttribute?.value && typeof datacodeAttribute.value === "string" ? (
                        datacodeAttribute.value.length > 10 ? (
                          <Tooltip
                            enterTouchDelay={1}
                            classes={{ tooltip: commonClasses.tooltip }}
                            title={<div>{datacodeAttribute.value}</div>}
                          >
                            <span>{`${datacodeAttribute.value.slice(0, 10)}...`}</span>
                          </Tooltip>
                        ) : (
                          datacodeAttribute.value
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                  )}
                  <td className={classes.trCurrency}>{currency?.code}</td>
                  <td className={classes.trPricesHint}>
                    {isShowPricesHint && (
                      <Tooltip
                        enterTouchDelay={1}
                        classes={{ tooltip: commonClasses.tooltip }}
                        title={
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <table className={classes.priceTooltipTable}>
                              <tbody>
                                <tr>
                                  <td style={{ fontWeight: 600 }}>{t("product.qty")}:</td>
                                  {sortedPrices.map((v) => (
                                    <td key={v.id}>{formatMoney(v.amount, 0, ".", "`")}</td>
                                  ))}
                                </tr>
                                <tr>
                                  <td style={{ fontWeight: 600 }}>
                                    {t("product.price")} {currency?.symbol}:
                                  </td>
                                  {sortedPrices.map((v) => (
                                    <td key={`price_${v.id}`}>
                                      {formatMoney(currencyPrice(v.price, val.price_currency))}
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        }
                      >
                        <div style={{ display: "flex", justifyContent: "center", cursor: "help" }}>
                          <InfoIcon />
                        </div>
                      </Tooltip>
                    )}
                  </td>
                  {!!baseFilters?.base_num_in_stock &&
                    !!baseFilters?.base_in_stock &&
                    ![1, 10, 100, 1000, 10000].includes(baseFilters.base_num_in_stock) && (
                      <td
                        className={clsx({
                          [dynamicPriceClass]: true,
                          [classes.trDynamicPriceIsSelected]: isSelected,
                        })}
                      >
                        {formatMoney(currencyPrice(dynamicPriceBasedOnNumInStock, val.price_currency))}
                      </td>
                    )}
                  {/* {!!val.low_stock_threshold && ( */}
                  {/*  <td colSpan={5} style={{ textAlign: "center" }}> */}
                  {/*    <Tooltip */}
                  {/*      classes={{ tooltip: classes.priceTooltip }} */}
                  {/*      title={ */}
                  {/*        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> */}
                  {/*          {t("exclusive_tooltip")} */}
                  {/*        </div> */}
                  {/*      } */}
                  {/*    > */}
                  {/*      <div className={classes.exclusiveStatus}>{t("exclusive_status")}</div> */}
                  {/*    </Tooltip> */}
                  {/*  </td> */}
                  {/* )} */}
                  {/* {dynamicMoq > 10000 && !val.low_stock_threshold && ( */}
                  {dynamicMoq > 10000 && (
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {`${t("distributor.moq_big")} `}
                      {formatMoney(currencyPrice(getPrice(dynamicMoq, val), val.price_currency))}
                      {` ${t("distributor.for_moq")} ${dynamicMoq}`}
                    </td>
                  )}
                  {/* {dynamicMoq <= 10000 && !val.low_stock_threshold && ( */}
                  {dynamicMoq <= 10000 && (
                    <React.Fragment>
                      <td className={`${classes.trPrice} ${classes.tr1}`}>
                        <Price>
                          {dynamicMoq <= 1
                            ? getPrice(1, val, false) &&
                              formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency))
                            : "-"}
                        </Price>
                      </td>
                      <td className={`${classes.trPrice} ${classes.tr10}`}>
                        <Price>
                          {dynamicMoq <= 10
                            ? getPrice(10, val, false) &&
                              formatMoney(currencyPrice(getPrice(10, val, false), val.price_currency))
                            : "-"}
                        </Price>
                      </td>
                      <td className={`${classes.trPrice} ${classes.tr100}`}>
                        <Price>
                          {dynamicMoq <= 100
                            ? getPrice(100, val, false) &&
                              formatMoney(currencyPrice(getPrice(100, val, false), val.price_currency))
                            : "-"}
                        </Price>
                      </td>
                      <Hidden mdDown>
                        <td className={`${classes.trPrice} ${classes.tr1000}`}>
                          <Price>
                            {dynamicMoq <= 1000
                              ? getPrice(1000, val, false) &&
                                formatMoney(currencyPrice(getPrice(1000, val, false), val.price_currency))
                              : "-"}
                          </Price>
                        </td>
                        <td className={`${classes.trPrice} ${classes.tr10000}`}>
                          <Price>
                            {dynamicMoq <= 10000
                              ? getPrice(10000, val, false) &&
                                formatMoney(currencyPrice(getPrice(10000, val, false), val.price_currency))
                              : "-"}
                          </Price>
                        </td>
                      </Hidden>
                    </React.Fragment>
                  )}
                  {constants.id === ID_ICSEARCH && (
                    <td className={`${classes.trDistributorICsearch} product-seller`}>{val.partner_name}</td>
                  )}
                </tr>
              );
            }
            return true;
          })}
      </tbody>
    </table>
  );
};

export default DistributorsDesktop;
