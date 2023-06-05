import React, { useEffect, useState } from "react";
import { formatMoney } from "@src/utils/formatters";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import { getCostAndQuantity, getPrice } from "@src/utils/product";
import clsx from "clsx";
import Price from "@src/components/Price/Price";
import { Button, Hidden, TableSortLabel, Tooltip, Box } from "@material-ui/core";
import InfoIcon from "@src/components/Icons/InfoIcon";
import useAppSelector from "@src/hooks/useAppSelector";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import useAppTheme from "@src/theme/useAppTheme";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import { Rating } from "@material-ui/lab";
import { Seller } from "@src/store/sellers/sellersTypes";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { useStyles } from "./distributorsDesktopStyles";

interface Props {
  product: Product;
  sortedStockrecords: SortedStockrecord[];
  rfqOpenModal: () => void;
  sellerMessageOpenModal: (sellerId: number, sellerName: string) => () => void;
}

interface SortedStockrecord extends Stockrecord {
  delivery_sort_value: number;
  datecode_sort_value: number;
  price_1: number;
  price_10: number;
  price_100: number;
  price_1000: number;
  price_10000: number;
  isOnline: boolean;
  updatedTime: number;
}

const sortFn = (stocks: any[][], name: string, direction: "desc" | "asc") => {
  return stocks.sort((a, b) => {
    let valueA = a[0][name];
    let valueB = b[0][name];

    if (name === "partner_name") {
      valueA = valueA?.toLowerCase();
      valueB = valueB?.toLowerCase();
      return valueA < valueB ? (direction === "asc" ? -1 : 1) : direction === "asc" ? 1 : -1;
    }

    return direction === "asc" ? valueA - valueB : valueB - valueA;
  });
};

const DistributorsDesktop: React.FC<Props> = ({
  product,
  sortedStockrecords,
  rfqOpenModal,
  sellerMessageOpenModal,
}) => {
  const { t } = useI18n("product");
  const { currency, currencyPrice } = useCurrency();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const showSellerTooltip = false;

  const baseFilters = useAppSelector((state) => state.search.baseFilters);
  const { sellersWithProductLink } = useAppSelector((state) => state.products);
  const packageAttribute = product.attributes?.find(
    (v) => (v.name === "Case/Package" && !!v.value) || v.name === "Packaging",
  );
  // const productDateCode = product.attributes?.find((v) => v.code === "datecode" || v.name === "Date Code");

  const [stockrecords, setStockrecords] = useState<SortedStockrecord[][]>(null);
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});
  const [sortBy, setSortBy] = useState<{ name: string; direction: "desc" | "asc" }>({
    name: "updatedTime",
    direction: "asc",
  });

  useEffect(() => {
    if (sortedStockrecords) {
      const res = sortedStockrecords
        .reduce((acc: SortedStockrecord[][], sr) => {
          const group = acc.find((i) => i[0].partner === sr.partner);
          if (group) {
            group.push(sr);
            return acc;
          }
          return [...acc, [sr]];
        }, [])
        .map((group) => {
          if (group.length === 1) return group;
          /**
           *  Create combinedDataItem for show in collapsed group condition
           *  Contains: min prices, min MOQ
           */
          const combinedDataItem = group.reduce(
            (acc, sr) => {
              return {
                ...acc,
                num_in_stock: Math.max(acc.num_in_stock, sr.num_in_stock),
                moq: Math.min(acc.moq, sr.moq),
                price_1: acc.price_1 ? (sr.price_1 ? Math.min(acc.price_1, sr.price_1) : acc.price_1) : sr.price_1,
                price_10: acc.price_10
                  ? sr.price_10
                    ? Math.min(acc.price_10, sr.price_10)
                    : acc.price_10
                  : sr.price_10,
                price_100: acc.price_100
                  ? sr.price_100
                    ? Math.min(acc.price_100, sr.price_100)
                    : acc.price_100
                  : sr.price_100,
                price_1000: acc.price_1000
                  ? sr.price_1000
                    ? Math.min(acc.price_1000, sr.price_1000)
                    : acc.price_1000
                  : sr.price_1000,
                price_10000: acc.price_10000
                  ? sr.price_10000
                    ? Math.min(acc.price_10000, sr.price_10000)
                    : acc.price_10000
                  : sr.price_10000,
              };
            },
            { ...group[0] },
          );
          return [combinedDataItem, ...group];
        });
      setStockrecords(sortFn(res, sortBy.name, sortBy.direction));
    }
  }, [sortedStockrecords, sortBy]);

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

  const showDC = true;

  // const orderHandler = (qty: number) => (e: any) => {
  //   e.stopPropagation();
  //   dispatch(rfqModalOpen(product.upc, qty, "order"));
  // };

  const showMoreHandler = (id: number) => () => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const changeSort = (name: string) => {
    setSortBy((prevState) => {
      return { name, direction: prevState.name === name ? (prevState.direction === "asc" ? "desc" : "asc") : "asc" };
    });
  };

  const visitSellerHandler = (seller: Seller, url: string) => () => {
    dispatch(
      sendFeedbackMessageThunk("seller_site", {
        seller,
        url,
        date: new Date().toISOString(),
      }),
    );
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.trTh}>
          <th className={classes.thDistributor}>
            <TableSortLabel
              active={sortBy?.name === "partner_name"}
              direction={(sortBy?.name === "partner_name" && sortBy?.direction) || "asc"}
              className={classes.tableSort}
              onClick={() => changeSort("partner_name")}
            >
              Seller
            </TableSortLabel>
            <TableSortLabel
              active={sortBy?.name === "updatedTime"}
              direction={(sortBy?.name === "updatedTime" && sortBy?.direction) || "asc"}
              className={classes.tableSort}
              onClick={() => changeSort("updatedTime")}
            >
              <span className={classes.divider}>/</span>
              Updated
            </TableSortLabel>
          </th>
          <th className={classes.thStock}>
            <TableSortLabel
              active={sortBy?.name === "num_in_stock"}
              direction={(sortBy?.name === "num_in_stock" && sortBy?.direction) || "desc"}
              className={classes.tableSort}
              onClick={() => changeSort("num_in_stock")}
            >
              {t("distributor.in_stock")}
            </TableSortLabel>
          </th>
          <th className={classes.thIcon}></th>
          <th className={classes.thLeadPeriod}>
            <TableSortLabel
              active={sortBy?.name === "delivery_sort_value"}
              direction={(sortBy?.name === "delivery_sort_value" && sortBy?.direction) || "desc"}
              className={classes.tableSort}
              onClick={() => changeSort("delivery_sort_value")}
            >
              {t("distributor.lead_period")}
            </TableSortLabel>
          </th>
          <th className={classes.thMoq}>
            <TableSortLabel
              active={sortBy?.name === "moq"}
              direction={(sortBy?.name === "moq" && sortBy?.direction) || "desc"}
              className={classes.tableSort}
              onClick={() => changeSort("moq")}
            >
              {t("distributor.moq")}
            </TableSortLabel>
          </th>
          <th className={classes.thMpq}>{t("distributor.mpq")}</th>
          <th className={classes.thPkg}>{t("distributor.pkg")}</th>
          {showDC && (
            <th className={classes.thPkg}>
              <TableSortLabel
                active={sortBy?.name === "datecode_sort_value"}
                direction={(sortBy?.name === "datecode_sort_value" && sortBy?.direction) || "desc"}
                className={classes.tableSort}
                onClick={() => changeSort("datecode_sort_value")}
              >
                DC
              </TableSortLabel>
            </th>
          )}
          <th className={classes.thCurrency}></th>
          <th className={classes.thPricesHint}></th>
          {!!baseFilters?.base_num_in_stock &&
            !!baseFilters?.base_in_stock &&
            ![1, 10, 100, 1000, 10000].includes(baseFilters.base_num_in_stock) && (
              <th className={classes.trDynamicPriceBasedOnNumInStock}>{baseFilters.base_num_in_stock}</th>
            )}
          <th className={classes.th1}>
            <TableSortLabel
              active={sortBy?.name === "price_1"}
              direction={(sortBy?.name === "price_1" && sortBy?.direction) || "asc"}
              className={classes.tableSort}
              onClick={() => changeSort("price_1")}
            >
              {formatMoney(1, 0, ".", "`")}
            </TableSortLabel>
          </th>
          <th className={classes.th10}>
            <TableSortLabel
              active={sortBy?.name === "price_10"}
              direction={(sortBy?.name === "price_10" && sortBy?.direction) || "asc"}
              className={classes.tableSort}
              onClick={() => changeSort("price_10")}
            >
              {formatMoney(10, 0, ".", "`")}
            </TableSortLabel>
          </th>
          <th className={classes.th100}>
            <TableSortLabel
              active={sortBy?.name === "price_100"}
              direction={(sortBy?.name === "price_100" && sortBy?.direction) || "asc"}
              className={classes.tableSort}
              onClick={() => changeSort("price_100")}
            >
              {formatMoney(100, 0, ".", "`")}
            </TableSortLabel>
          </th>
          <Hidden mdDown>
            <th className={classes.th1000}>
              <TableSortLabel
                active={sortBy?.name === "price_1000"}
                direction={(sortBy?.name === "price_1000" && sortBy?.direction) || "asc"}
                className={classes.tableSort}
                onClick={() => changeSort("price_1000")}
              >
                {formatMoney(1000, 0, ".", "`")}
              </TableSortLabel>
            </th>
            <th className={classes.th10000}>
              <TableSortLabel
                active={sortBy?.name === "price_10000"}
                direction={(sortBy?.name === "price_10000" && sortBy?.direction) || "asc"}
                className={classes.tableSort}
                onClick={() => changeSort("price_10000")}
              >
                {formatMoney(10000, 0, ".", "`")}
              </TableSortLabel>
            </th>
          </Hidden>

          <th className={classes.thActions}></th>
        </tr>
      </thead>
      <tbody>
        {stockrecords?.map((srArray) => {
          const minPrices: any = {
            price_1: { price: srArray[0].price_1, stock_id: 0 },
            price_10: { price: srArray[0].price_10, stock_id: 0 },
            price_100: { price: srArray[0].price_100, stock_id: 0 },
            price_1000: { price: srArray[0].price_1000, stock_id: 0 },
            price_10000: { price: srArray[0].price_10000, stock_id: 0 },
          };
          srArray.forEach((sr, index) => {
            if (index > 0) {
              ["price_1", "price_10", "price_100", "price_1000", "price_10000"].forEach((amount) => {
                if (sr[amount as keyof SortedStockrecord] === minPrices[amount].price && !minPrices[amount].stock_id) {
                  minPrices[amount].stock_id = sr.id;
                }
              });
            }
          });

          return srArray.map((val, index) => {
            if (!showMore[val.partner] && index > 0) return null;
            if (showMore[val.partner] && index === 0) return null; // Do not show combined item

            const isShowProductLink = !!val.url && sellersWithProductLink?.find((seller) => seller.id === val.partner);
            const isShowMoreButton = srArray.length > 1 && index === (showMore[val.partner] ? 1 : 0);
            const isShowMoreActive = !!showMore[val.partner];
            const MOQ = val.moq;
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

            const dateCode = val.partner_sku.includes("datecode:") && val.partner_sku.split(":")[1];

            let dateUpdated: any;
            try {
              // Date constructor expects another date format in iOS Safari browser
              dateUpdated = val.date_updated && new Date(val.date_updated.replace(/ /g, "T"));
            } catch {
              dateUpdated = null;
            }

            return (
              <tr
                key={val.id}
                className={clsx(classes.tr, {
                  [classes.active]: isShowMoreActive,
                })}
              >
                <td className={clsx(classes.trDistributor, "product-seller")}>
                  {showSellerTooltip ? (
                    <Tooltip
                      classes={{ tooltip: classes.tooltip, popper: classes.tooltipPopper }}
                      placement="right"
                      interactive
                      title={
                        <div>
                          <h4 className={classes.tooltipTitle}>{val.partner_name}</h4>
                          {/* <Rating value={4} readOnly /> */}
                          <p>
                            {val.url
                              ? "Check this product on seller`s website or request it on ChipAssist"
                              : "You can request this product directly on ChipAssist"}
                          </p>
                          {val.url && (
                            <Box mb={0.5}>
                              <a href={val.url} target="_blank" rel="noreferrer" className={appTheme.hyperlink}>
                                View on seller`s website
                              </a>
                            </Box>
                          )}
                          <Button variant="contained" className={appTheme.buttonCreate} onClick={rfqOpenModal}>
                            Quick request
                          </Button>
                        </div>
                      }
                    >
                      <span className={clsx(classes.partnerName, appTheme.hyperlink)}>{val.partner_name}</span>
                    </Tooltip>
                  ) : (
                    <span className={classes.partnerName}>{val.partner_name}</span>
                  )}
                  {dateUpdated && (
                    <div className={classes.dateUpdated}>
                      {formatDistanceToNowStrict(dateUpdated, {
                        addSuffix: true,
                      })}
                    </div>
                  )}
                </td>
                <td className={`${classes.trStock} product-stock`}>
                  {formatMoney(val.num_in_stock, 0, ".", "`")}
                  {isShowMoreButton && !isShowMoreActive && val.num_in_stock > 0 && "+"}
                  {isShowMoreButton && !isShowMoreActive && (
                    <div className={classes.showMore} onClick={showMoreHandler(val.partner)}>
                      {t("show_more_stocks", { count: srArray.length - 1 })}{" "}
                    </div>
                  )}
                </td>
                <td>
                  {isShowMoreButton && (
                    <div className={classes.showMoreIcon} onClick={showMoreHandler(val.partner)}>
                      <KeyboardArrowDownIcon
                        className={clsx({
                          [classes.showMoreActive]: isShowMoreActive,
                        })}
                      />
                    </div>
                  )}
                </td>
                <td className={classes.trLeadTime}>
                  {val.lead_period_str
                    ? val.lead_period_str
                    : val.lead_period
                    ? `${val.lead_period}${t("common.d")}`
                    : "-"}
                </td>
                <td className={classes.trMoq}>
                  <span>{formatMoney(MOQ, 0, ".", "`")}</span>
                </td>
                <td className={`${classes.trMpq} product-card-mpq`}>{val.mpq}</td>
                <td className={`${!showDC ? classes.trPkg : classes.trPkgWithoutBorder}`}>
                  {packageAttribute?.value || "-"}
                </td>
                {showDC && (
                  <td className={`${classes.trPkg}`}>
                    {dateCode ? (
                      dateCode.length > 10 ? (
                        <Tooltip
                          enterTouchDelay={1}
                          classes={{ tooltip: commonClasses.tooltip }}
                          title={<div>{dateCode}</div>}
                        >
                          <span>{`${dateCode.slice(0, 10)}...`}</span>
                        </Tooltip>
                      ) : (
                        dateCode
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
                      classes={{ tooltip: classes.priceTooltip }}
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
                        <InfoIcon className={classes.priceIcon} />
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
                      })}
                    >
                      {formatMoney(currencyPrice(dynamicPriceBasedOnNumInStock, val.price_currency))}
                    </td>
                  )}
                {!sortedPrices.length && (
                  <td colSpan={isMdDown ? 3 : 5} style={{ textAlign: "center" }}>
                    {t("distributor.price_upon_request")}
                  </td>
                )}
                {!!sortedPrices.length && MOQ > 10000 && (
                  <td colSpan={isMdDown ? 3 : 5} style={{ textAlign: "center" }}>
                    {`${t("distributor.moq_big")} `}
                    {formatMoney(currencyPrice(getPrice(MOQ, val), val.price_currency))}
                    {` ${t("distributor.for_moq")} ${MOQ}`}
                  </td>
                )}
                {!!sortedPrices.length && MOQ <= 10000 && (
                  <React.Fragment>
                    <td
                      className={clsx(classes.trPrice, classes.tr1, {
                        [classes.strong]: isShowMoreActive && MOQ <= 1 && minPrices.price_1.stock_id === val.id,
                      })}
                    >
                      <Price>{MOQ <= 1 && val.price_1 ? formatMoney(val.price_1) : "-"}</Price>
                    </td>
                    <td
                      className={clsx(classes.trPrice, classes.tr10, {
                        [classes.strong]: isShowMoreActive && MOQ <= 10 && minPrices.price_10.stock_id === val.id,
                      })}
                    >
                      <Price>{MOQ <= 10 && val.price_10 ? formatMoney(val.price_10) : "-"}</Price>
                    </td>
                    <td
                      className={clsx(classes.trPrice, classes.tr100, {
                        [classes.strong]: isShowMoreActive && MOQ <= 100 && minPrices.price_100.stock_id === val.id,
                      })}
                    >
                      <Price>{MOQ <= 100 && val.price_100 ? formatMoney(val.price_100) : "-"}</Price>
                    </td>
                    <Hidden mdDown>
                      <td
                        className={clsx(classes.trPrice, classes.tr1000, {
                          [classes.strong]: isShowMoreActive && MOQ <= 1000 && minPrices.price_1000.stock_id === val.id,
                        })}
                      >
                        <Price>{MOQ <= 1000 && val.price_1000 ? formatMoney(val.price_1000) : "-"}</Price>
                      </td>
                      <td
                        className={clsx(classes.trPrice, classes.tr10000, {
                          [classes.strong]:
                            isShowMoreActive && MOQ <= 10000 && minPrices.price_10000.stock_id === val.id,
                        })}
                      >
                        <Price>{MOQ <= 10000 && val.price_10000 ? formatMoney(val.price_10000) : "-"}</Price>
                      </td>
                    </Hidden>
                  </React.Fragment>
                )}
                <td className={classes.tdActions}>
                  {isShowProductLink ? (
                    <a
                      href={val.url}
                      target="_blank"
                      rel="noreferrer"
                      className={clsx(appTheme.hyperlink, classes.partnerLink)}
                      onClick={visitSellerHandler({ id: val.partner, name: val.partner_name }, val.url)}
                    >
                      Visit site
                    </a>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      className={clsx(appTheme.buttonCreate, classes.contactSellerButton)}
                      onClick={sellerMessageOpenModal(val.partner, val.partner_name)}
                    >
                      Contact seller
                    </Button>
                  )}
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default DistributorsDesktop;
