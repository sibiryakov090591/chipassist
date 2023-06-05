import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import _, { uniqueId } from "lodash";
import Icon from "react-icons-kit";
import { ic_check } from "react-icons-kit/md/ic_check";
import Highlighter from "react-highlight-words";
import Draggable from "react-draggable";
import {
  Checkbox,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  Paper,
  Button,
  Table,
  TableSortLabel,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getUniqueId } from "@src/utils/utility";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { NumberInput } from "@src/components/Inputs";
import Preloader from "@src/components/Preloader/Preloader";
import ExtendedSearchBar from "@src/views/chipassist/Search/components/ProgressBar";
import useExtendedSearch from "@src/views/chipassist/Search/hooks/useExtendedSearch";
import { saveCashModalProducts } from "@src/store/bom/bomActions";
import { setExtendedSearchFinished } from "@src/store/search/searchActions";
import { useStyles as useCartStyles } from "@src/views/chipassist/Cart/components/CartItems/CartItem/cartItemStyles";
import { useStyles as useProductStyles } from "@src/components/ProductCard/productCardStyles";
import { formatMoney } from "@src/utils/formatters";
import {
  getAllPrices,
  getDynamicMoq,
  getPrice,
  isDuplicateStockrecord,
  isProductAvailable,
  validateQuantity,
} from "@src/utils/product";
import useAppTheme from "@src/theme/useAppTheme";
import constants from "@src/constants/constants";
import InfoIcon from "@src/components/Icons/InfoIcon";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import RowFilters from "./components/RowFilters";
// import PartNumberInput from "../PartNumberInput/PartNumberInput";
import { SaveProps, Props, Item, FilterValues } from "./productSelectModalTypes";
import { pushIn, createItem } from "./productSelectModalFunctions";
import { useStyles } from "./productSelectModalStyles";
import { useStyles as useEditorStyles } from "../style";

const PaperComponent = (props: any) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const ProductSelectModal: React.FC<Props> = ({
  onClose,
  onSaveData,
  onStartSearch,
  selectedLines,
  selectedPartnumber,
  cashProducts,
}) => {
  const relatedFilters = ["manufacturer", "partnumber", "distributor"];
  const [relatedFilterQueue, setRelatedFilterQueue] = useState<Map<string, number>>(new Map()); // [manufacturer: 1, partnumber: 2 ]
  const [filterValues, setFilterValues] = useState<FilterValues>({
    manufacturer: 0,
    partnumber: 0,
    distributor: 0,
    moq: "",
    price: "",
    stock: "",
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [partnumbers, setPartnumbers] = useState([]);
  // const [isNewSearch, setIsNewSearch] = useState(false); // For set new cash
  const [notValidQty, setNotValidQty] = useState(false);
  const [distributors, setDistributors] = useState([]);
  // const [partNumber, setPartNumber] = useState(selectedPartnumber);
  const [cost, setCost] = useState(0);
  const [sortBy, setSortBy] = useState<{ name: string; direction: "desc" | "asc" }>({
    name: "price",
    direction: "asc",
  });
  const [defaultQty, setDefaultQty] = useState<number>(1);
  const [productsForSave, setProductsForSave] = useState<SaveProps[]>([]);
  const [products, setProducts] = useState([]);
  // const [activeFilter, setActiveFilter] = useState(filterValue);
  const canSkip = useAppSelector((state) => state.profile?.profileInfo?.canSkip);
  const loading = useAppSelector((state) => state.bom.cashModalItemsLoading);
  // const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);

  const selectedQty = selectedLines[0]?.defaultQty || 1;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const classesCart = useCartStyles();
  const classesProduct = useProductStyles() as any;
  const classesEditor = useEditorStyles() as any;
  const { currency, currencyPrice } = useCurrency();
  const { t } = useI18n("bom");

  const isValidCashTime = cashProducts
    ? new Date().getTime() - cashProducts?.createdTime < constants.cashBomModalTime * 1000 * 60
    : false;

  useEffect(() => {
    let notValid = false;
    productsForSave.forEach((line) => {
      // const dynamicMoq = getDynamicMoq(line.stockrecord);
      const qtyError = validateQuantity(line.qty || 1, line.stockrecord);
      if (line.checked && qtyError) {
        notValid = true;
      }
    });
    setNotValidQty(notValid);
  }, [productsForSave]);

  useEffect(() => {
    if (!cashProducts || !isValidCashTime) {
      startSearch(selectedPartnumber);
    }
  }, []);

  useEffect(() => {
    if (selectedQty) setDefaultQty(selectedQty);
  }, [selectedQty]);

  useEffect(() => {
    const res = productsForSave
      .filter((v) => v.checked)
      .reduce(
        (acc, val) =>
          acc + currencyPrice(getPrice(val.qty, val.stockrecord), val.stockrecord?.price_currency) * val.qty,
        0,
      );
    setCost(res);
  }, [productsForSave]);

  useEffect(() => {
    const manufacturers_arr: { id: number | string; name: number | string }[] = [];
    const partnumbers_arr: { id: number | string; name: number | string }[] = [];
    const distributors_arr: { id: number | string; name: number | string }[] = [];
    let results: Item[] = [];
    let selectedResults: Item[] = [];
    let freshProductsForSave = [...productsForSave];

    selectedLines.forEach((line) => {
      if (!line.product) return;
      if (freshProductsForSave.some((v) => v.rowKey === line.rowKey)) return;

      freshProductsForSave = freshProductsForSave.filter((v) => v.rowKey !== line.rowKey);

      const prod = productsForSave?.find((v) => v.rowKey === line.rowKey);
      const qty = prod?.qty || defaultQty || selectedQty;

      const item = createItem(
        currencyPrice,
        line.product.product,
        line.product.product.stockrecords?.find((v) => v.id === line.stockrecordId),
        prod,
        qty,
        line.orderRef,
        line.rowKey,
        line.rfq,
      );
      selectedResults.push(item);
      if (!prod) {
        batch(() => {
          setProductsForSave((prevState) => [
            ...prevState,
            {
              rowKey: line.rowKey,
              product: item.product,
              productId: item.productId,
              stockrecordId: item.stockrecord?.id,
              stockrecord: item.stockrecord,
              partNumber: line.partNumber,
              productTitle: item.productTitle,
              productDescription: item.productDescription,
              qty: line.qty || defaultQty || selectedQty,
              qty_ref: selectedQty || line.qty || defaultQty,
              checked: item.stockrecord ? !!item.stockrecord : true,
              orderRef: item.orderRef || null,
              rfq: line.rfq,
            },
          ]);
        });
      }
    });

    freshProductsForSave.forEach((prod) => {
      const prodForSave = productsForSave?.find((v) => v.rowKey === prod.rowKey);
      const qty = prod.qty || defaultQty || selectedQty;
      const item = createItem(
        currencyPrice,
        prod.product,
        prod.product.stockrecords.find((v) => v.id === prod.stockrecord?.id),
        prodForSave,
        qty,
        prod.orderRef,
        prod.rowKey,
        prod.rfq,
      );
      if (!prod.checked) {
        results = [...results, item];
      } else {
        selectedResults.push(item);
      }
    });

    if (cashProducts?.products) {
      const resultsArray = cashProducts.products;
      if (resultsArray) {
        resultsArray.forEach((val) =>
          val.stockrecords?.forEach((stockrecord) => {
            const qty = selectedQty || defaultQty;

            // let do_break = false;
            const unusedFilters = relatedFilters;

            // relatedFilterQueue.forEach((i, filterName) => {
            //   switch (filterName) {
            //     case "manufacturer":
            //       pushIn(manufacturers_arr, val.manufacturer.id, val.manufacturer.name);
            //       if (!!filterValues?.manufacturer && filterValues?.manufacturer !== val.manufacturer.name) {
            //         do_break = true;
            //         break;
            //       }
            //       unusedFilters = unusedFilters.filter((filter) => filter !== filterName);
            //       break;
            //     case "partnumber":
            //       pushIn(partnumbers_arr, val.upc, val.upc);
            //       if (!!filterValues?.partnumber && filterValues?.partnumber !== val.upc) {
            //         do_break = true;
            //         break;
            //       }
            //       unusedFilters = unusedFilters.filter((filter) => filter !== filterName);
            //       break;
            //     case "distributor":
            //       pushIn(distributors_arr, stockrecord?.partner, stockrecord?.partner_name);
            //       if (!!filterValues?.distributor && filterValues?.distributor !== stockrecord?.partner_name) {
            //         do_break = true;
            //         break;
            //       }
            //       unusedFilters = unusedFilters.filter((filter) => filter !== filterName);
            //       break;
            //     default:
            //       break;
            //   }
            // });

            if (!relatedFilterQueue.size || unusedFilters.includes("manufacturer")) {
              pushIn(manufacturers_arr, val.manufacturer.id, val.manufacturer.name);
            }
            if (!relatedFilterQueue.size || unusedFilters.includes("partnumber")) {
              pushIn(partnumbers_arr, val.upc, val.upc);
            }
            if (!relatedFilterQueue.size || unusedFilters.includes("distributor")) {
              pushIn(distributors_arr, stockrecord?.partner, stockrecord?.partner_name);
            }

            // Filters =====
            if (selectedResults.some((v) => v.stockrecord?.id === stockrecord?.id)) return;
            if (results.some((v) => v.stockrecord?.id === stockrecord?.id)) return;

            // const validUpdateTime = (constants.STOCK_RECORD_PERIOD_OF_RELEVANCE || 24) * 60 * 60 * 1000;
            // const isUpdated = new Date().getTime() - Date.parse(stockrecord?.date_updated) <= validUpdateTime;

            // if (!isUpdated) return;
            // =============

            const item = createItem(
              currencyPrice,
              val,
              stockrecord,
              productsForSave,
              qty,
              selectedLines[0].orderRef || null,
              getUniqueId(),
            );

            if (
              isDuplicateStockrecord(
                [...selectedResults.map((v) => v.stockrecord), ...results.map((v) => v.stockrecord)],
                item.stockrecord,
              )
            )
              return;

            // if (do_break) return;
            results = [...results, item];
          }),
        );
      }
    }

    results = _.orderBy(results, [sortBy.name], [sortBy.direction]);
    selectedResults = _.orderBy(selectedResults, [sortBy.name], [sortBy.direction]);

    setProducts(
      [...selectedResults, ...results].filter((i) => {
        const productForSave = productsForSave.find((v) => v.rowKey === i.rowKey);
        if (productForSave?.checked) return true;
        if (
          !!filterValues.price &&
          filterValues.price <= currencyPrice(getPrice(i.qty, i.stockrecord), i.stockrecord?.price_currency)
        )
          return false;
        if (!!filterValues.stock && filterValues.stock > i.stockrecord?.num_in_stock) return false;
        if (!!filterValues.moq && filterValues.moq < i.moq) return false;
        if (!!filterValues?.manufacturer && filterValues.manufacturer !== i.manufacturer) return false;
        if (!!filterValues?.partnumber && filterValues.partnumber !== i.upc) return false;
        if (!!filterValues?.distributor && filterValues?.distributor !== i.stockrecord.partner_name) return false;

        return true;
      }),
    );

    batch(() => {
      setManufacturers(_.orderBy(manufacturers_arr, ["name"]));
      setPartnumbers(_.orderBy(partnumbers_arr, ["name"]));
      setDistributors(_.orderBy(distributors_arr, ["name"]));
    });
  }, [cashProducts, sortBy, filterValues]);

  useExtendedSearch(
    "productQuery",
    (response: any, { key }: any) => saveCashModalProducts(key, response.results),
    setExtendedSearchFinished,
    {
      page_size: 25,
      page: 1,
      search: selectedPartnumber,
      base_num_in_stock: defaultQty,
      sim: "bom",
      search_type: "bom",
      ignore_count: true,
    },
  );

  const onCloseModal = () => {
    // if (constants.cashBomModalProducts && !isExtendedSearchStarted) {
    //   if (!cashProducts || !isValidCashTime) {
    //     dispatch(saveCashModalProducts(selectedPartnumber, cashProducts?.products));
    //   }
    // }
    onClose(selectedPartnumber);
  };

  const changeSort = (name: string) => {
    setSortBy((prevState) => {
      return { name, direction: prevState.name === name ? (prevState.direction === "asc" ? "desc" : "asc") : "asc" };
    });
  };

  const clearFilters = () => {
    batch(() => {
      setFilterValues({ manufacturer: 0, partnumber: 0, distributor: 0, moq: "", price: "", stock: "" });
      setSortBy({ name: sortBy?.name || "default", direction: sortBy?.direction || "asc" });
      setRelatedFilterQueue(new Map());
    });
  };

  const onQtyChange = (e: React.ChangeEvent<HTMLInputElement>, item: Item) => {
    let qty = parseInt(e.target.value);
    qty = !item.rfq && item.stockrecord?.num_in_stock < qty ? item.stockrecord?.num_in_stock : qty;

    setProductsForSave((prevState) => {
      const existedProduct = prevState.find((val) => val.rowKey === item.rowKey);
      if (existedProduct) {
        if (!qty) return [...prevState.filter((val) => val.rowKey !== item.rowKey)];
        return [...prevState.filter((val) => val.rowKey !== item.rowKey), { ...existedProduct, qty, checked: true }];
      }
      if (!qty) return prevState;
      return [
        ...prevState,
        {
          rowKey: item.rowKey,
          product: item.product,
          productId: item.productId,
          stockrecordId: item.stockrecord?.id,
          stockrecord: item.stockrecord,
          partNumber: selectedPartnumber,
          productTitle: item.productTitle,
          productDescription: item.productDescription,
          qty,
          qty_ref: selectedQty || 1,
          checked: true,
          orderRef: item.orderRef,
        },
      ];
    });
  };

  const onCheckedChange = (e: React.ChangeEvent<HTMLInputElement>, item: Item, request = false) => {
    const checked = !!e.target.checked;
    setProductsForSave((prevState) => {
      const existedProduct = prevState.find((val) => val.rowKey === item.rowKey);
      const dynamicMoq = getDynamicMoq(item.stockrecord);
      let qty = existedProduct?.qty || (dynamicMoq > defaultQty ? dynamicMoq : defaultQty) || selectedQty;

      qty = item.stockrecord?.num_in_stock < qty && !request ? item.stockrecord?.num_in_stock : qty;

      let obj: SaveProps;
      if (!existedProduct) {
        obj = {
          rowKey: item.rowKey,
          product: item.product,
          productId: item.productId,
          stockrecordId: item.stockrecord?.id,
          stockrecord: item.stockrecord,
          partNumber: selectedPartnumber,
          productTitle: item.productTitle,
          productDescription: item.productDescription,
          qty,
          qty_ref: selectedQty || 1,
          checked,
          request,
          orderRef: item.orderRef,
        };
      } else {
        obj = {
          ...existedProduct,
          rowKey: existedProduct.rowKey,
          qty,
          qty_ref: selectedQty || 1,
          checked,
        };
      }
      return [...prevState.filter((val) => val.rowKey !== item.rowKey), { ...obj }];
    });
  };

  // const onDefaultQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let qty = parseInt(e.target.value);
  //   if (qty === 0) {
  //     qty = 1;
  //   }
  //   if (qty > 0) {
  //     batch(() => {
  //       setDefaultQty(qty);
  //       if (productsForSave.length) {
  //         setProductsForSave((prevState) => [
  //           ...prevState.map((val) => {
  //             const qtyVal = val.stockrecord?.num_in_stock < qty ? val.stockrecord?.num_in_stock : qty;
  //             if (val.checked) return { ...val, qty: qtyVal };
  //             return val;
  //           }),
  //         ]);
  //       }
  //     });
  //   }
  // };

  const onSelectClick = () => {
    onSaveData(productsForSave);
    onClose(selectedPartnumber);
  };

  // const onChangePartNumber = (value: string) => {
  //   setPartNumber(value);
  // };

  const startSearch = (value: string) => {
    onStartSearch(value, defaultQty);
  };

  // const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsNewSearch(true);
  //   startSearch(selectedPartnumber);
  // };

  return (
    <Dialog
      PaperComponent={PaperComponent}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="product-select"
      className={classes.productSelectModalContainer}
      onClose={onCloseModal}
      open={true}
    >
      <DialogTitle style={{ cursor: "move", backgroundColor: "#7CAEDE", height: 35 }} id="draggable-dialog-title" />
      <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
        <CloseIcon />
      </IconButton>
      <div className={`${classes.productSelectModal} bom-product-modal`}>
        <Box display="flex" alignItems="center" className={classes.buttonsContainer}>
          <Box className={classes.actionPn}>
            <form>
              <Box display="flex" alignItems="center">
                <span className={classes.title}>{t("product_modal.part_number")}:</span>
                <span className={classes.titlePartNumber}>{selectedPartnumber}</span>
                {/* <PartNumberInput */}
                {/*  value={partNumber} */}
                {/*  partnumberRef={selectedPartnumber} */}
                {/*  onChange={onChangePartNumber} */}
                {/*  disabled={productsForSave.some((val) => val.checked)} */}
                {/* /> */}
                {/* <Button */}
                {/*  variant="contained" */}
                {/*  color="primary" */}
                {/*  className={`${appTheme.buttonPrimary} ${classes.searchBtn}`} */}
                {/*  type="submit" */}
                {/*  disabled={productsForSave.some((val) => val.checked)} */}
                {/* > */}
                {/*  {t("search_v")} */}
                {/* </Button> */}
              </Box>
            </form>
          </Box>
          {/* <NumberInput */}
          {/*  className={classes.actionQty} */}
          {/*  style={{ width: 120 }} */}
          {/*  label={t("qty_default")} */}
          {/*  variant="outlined" */}
          {/*  size="small" */}
          {/*  required */}
          {/*  InputLabelProps={{ */}
          {/*    shrink: true, */}
          {/*  }} */}
          {/*  value={defaultQty} */}
          {/*  onChange={onDefaultQtyChange} */}
          {/*  decimalScale={0} */}
          {/*  isAllowedZero={false} */}
          {/* /> */}
          <div className={classes.actionButtons}>
            <Button style={{ whiteSpace: "nowrap" }} variant="contained" type="button" onClick={clearFilters}>
              {t("product_modal.clear_filters")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={`${appTheme.buttonCreate} ${classes.actionButton} bom-modal-confirm-button`}
              onClick={onSelectClick}
              disabled={loading || !productsForSave.some((v) => v.checked) || notValidQty}
            >
              {t("product_modal.save")}
            </Button>
          </div>
        </Box>

        <Box mt={2} mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <div>{!loading && <ExtendedSearchBar className={classes.extendedSearchBar} />}</div>
          <div>
            <div className={`${classesEditor.total} total-cost`}>
              {t("bom.edit.cost")}:
              <strong style={{ marginLeft: 5 }}>
                {formatMoney(cost || 0)} {currency.symbol}
              </strong>
            </div>
          </div>
        </Box>

        <div className={classes.tableScroll}>
          {/* height = 0 for position sticky working */}
          <Table style={{ height: 0 }} size="small" className={`${classes.productsTable} bom-product-modal-table`}>
            <TableHead>
              <TableRow id="productsTableHeaderNames" className={`${classes.productsTableHeaderNames}`}>
                <TableCell>{t("product.manufacturer")}</TableCell>
                <TableCell>{t("product.part_number")}</TableCell>
                {constants.id !== ID_ICSEARCH && <TableCell>{t("distributor.distributor")}</TableCell>}
                <TableCell className={classes.textAlignEnd}>{t("distributor.moq")}</TableCell>
                <TableCell className={classes.textAlignEnd}>{t("distributor.mpq")}</TableCell>
                <TableCell className={`${classes.noWrap} ${classes.textAlignEnd}`}>
                  <TableSortLabel
                    active={sortBy?.name === "price"}
                    direction={(sortBy?.name === "price" && sortBy?.direction) || "asc"}
                    className={classes.tableSort}
                    onClick={() => changeSort("price")}
                  >
                    {t("distributor.price")}, {currency.symbol}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={`${classes.noWrap} ${classes.textAlignEnd}`}>
                  <TableSortLabel
                    active={sortBy?.name === "num_in_stock"}
                    direction={(sortBy?.name === "num_in_stock" && sortBy?.direction) || "asc"}
                    className={classes.tableSort}
                    onClick={() => changeSort("num_in_stock")}
                  >
                    {t("distributor.in_stock")}
                  </TableSortLabel>
                </TableCell>
                <TableCell>{t("distributor.lead_period")}</TableCell>
                {canSkip && (
                  <TableCell>
                    <TableSortLabel
                      active={sortBy?.name === "updated"}
                      direction={(sortBy?.name === "updated" && sortBy?.direction) || "asc"}
                      className={classes.tableSort}
                      onClick={() => changeSort("updated")}
                    >
                      {t("distributor.updated")}
                    </TableSortLabel>
                  </TableCell>
                )}
                <TableCell>
                  <TableSortLabel
                    active={sortBy?.name === "qty"}
                    direction={(sortBy?.name === "qty" && sortBy?.direction) || "asc"}
                    className={classes.tableSort}
                    onClick={() => changeSort("qty")}
                  >
                    {t("distributor.qty")}
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Icon icon={ic_check} />
                </TableCell>
                <TableCell>{t("bom.product_modal.is_stock")}</TableCell>
              </TableRow>
              <RowFilters
                {...{
                  manufacturers,
                  partnumbers,
                  distributors,
                  relatedFilters,
                  relatedFilterQueue,
                  setRelatedFilterQueue,
                  filterValues,
                  setFilterValues,
                }}
                loading={loading}
              />
            </TableHead>

            <TableBody>
              {loading && (
                <TableRow className={classes.tableContentWhiteSpace}>
                  <TableCell colSpan={100}>
                    <Preloader title="" />
                  </TableCell>
                </TableRow>
              )}
              {!loading && !products?.length && (
                <TableRow className={classes.tableContentWhiteSpace}>
                  <TableCell colSpan={100}>
                    <h1>{t("product_modal.nothing")}</h1>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                products?.map((item) => {
                  const productForSave = productsForSave.find((v) => v.rowKey === item.rowKey);
                  const prices = getAllPrices(item.stockrecord);
                  const price = getPrice(productForSave?.qty || defaultQty || 0, item.stockrecord);

                  const isAvaible = isProductAvailable(item.stockrecord) && !item.rfq;
                  const isRequested = !!selectedLines.find((v) => v.rowKey === item.rowKey)?.rfq?.id;
                  const qtyError = validateQuantity(productForSave?.qty || 1, item.stockrecord);
                  const dynamicMoq = getDynamicMoq(item.stockrecord);

                  return (
                    <React.Fragment key={item.id}>
                      <TableRow
                        className={`${(productForSave?.checked && classesProduct.trSelected) || ""} bom-modal-line`}
                        style={{ boxShadow: "none" }}
                      >
                        <TableCell>{item.manufacturer}</TableCell>
                        <TableCell>
                          <Highlighter
                            searchWords={[selectedPartnumber]}
                            textToHighlight={item.part_number}
                            autoEscape={true}
                          />
                        </TableCell>
                        {constants.id !== ID_ICSEARCH && <TableCell>{item.distributor}</TableCell>}
                        <TableCell className={classes.textAlignEnd}>
                          {dynamicMoq}
                          {productForSave?.checked && qtyError ? (
                            <div className={classes.errorText}>
                              {t(qtyError.i18message)} {qtyError.amount}
                            </div>
                          ) : null}
                        </TableCell>
                        <TableCell className={classes.textAlignEnd}>{item.mpq}</TableCell>
                        <TableCell className={`${classes.textAlignEnd} bom-modal-row-price`}>
                          <div style={{ display: "flex", justifyContent: "end", whiteSpace: "nowrap" }}>
                            <span>{price && formatMoney(currencyPrice(price, item.stockrecord?.price_currency))}</span>
                            <Tooltip
                              classes={{ tooltip: classesCart.priceTooltip }}
                              title={
                                <React.Fragment>
                                  <table className={classesCart.priceTooltipTable}>
                                    <thead>
                                      <tr>
                                        <th style={{ fontWeight: 600 }}>{t("product.qty")}:</th>
                                        {[...prices.keys()].map((v) => (
                                          <th key={v}>{formatMoney(v, 2, ".", "`")}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td style={{ fontWeight: 600 }}>
                                          {t("product.price")} {currency.symbol}:
                                        </td>
                                        {[...prices.values()].map((v) => (
                                          <td key={uniqueId("price_")}>
                                            {v && formatMoney(currencyPrice(v, item.stockrecord?.price_currency))}
                                          </td>
                                        ))}
                                      </tr>
                                    </tbody>
                                  </table>
                                </React.Fragment>
                              }
                              placement="bottom"
                            >
                              <div style={{ cursor: "help", marginLeft: "5px" }}>
                                <Hidden smDown>
                                  <InfoIcon />
                                </Hidden>
                              </div>
                            </Tooltip>
                          </div>
                        </TableCell>
                        <TableCell className={`${classes.textAlignEnd} bom-modal-row-stock`}>
                          {item.num_in_stock}
                        </TableCell>
                        <TableCell>
                          {item.lead_period_str || (item.lead_period && `${item.lead_period}${t("common.d")}`) || "-"}
                        </TableCell>
                        {canSkip && <TableCell>{item.updatedVal}</TableCell>}
                        <TableCell>
                          <NumberInput
                            variant="outlined"
                            size="small"
                            style={{ width: 80 }}
                            value={productForSave?.qty || ""}
                            disabled={!item.stockrecord?.num_in_stock}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              onQtyChange(e as React.ChangeEvent<HTMLInputElement>, item)
                            }
                            decimalScale={0}
                            error={productForSave?.checked && !!qtyError}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            className={appTheme.checkbox}
                            checked={productForSave?.checked || false}
                            onChange={(e: any) => onCheckedChange(e, item, !isAvaible && !isRequested)}
                            color="primary"
                            style={{ transform: "scale(2)", backgroundColor: "inherit" }}
                            disableRipple
                          />
                        </TableCell>
                        <TableCell>
                          {isAvaible && !item.rfq ? (
                            <span className={classes.statusText}>{t("product.status_online")}</span>
                          ) : (
                            <span className={classes.statusText} style={{ color: "#2B8FA7" }}>
                              {t("product.status_rfq")}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Dialog>
  );
};

// Force stop rerender
const areEqual = (prev: any) => {
  if (prev.cashProducts === null) return false;
  return true;
};

export default React.memo(ProductSelectModal, areEqual);
