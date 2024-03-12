import React, { useState, useEffect, useRef, useMemo, ChangeEvent } from "react";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  TableBody,
  Typography,
} from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { v4 as uuidv4 } from "uuid";
import {
  loadBomLineSearchThunk,
  // loadBomLinePricesThunk,
  // startBomLinePricesLoading,
  // socketBomLinePricesSearch,
  beforeBomLineSearch,
  socketBomLineSearch,
  // setBomLinePricesCount,
  deleteBomThunk,
  // simpleUpdateProducts,
  updateBomLineThunk,
  removeBomEditLineThunk,
  createBomLineThunk,
  bomLineFields,
  createBomCopy,
  exportBomThunk,
  saveCashModalProducts,
  saveBomNameThunk,
  getRfqRowCount,
  updateFrontItem,
} from "@src/store/bom/bomActions";
import constants from "@src/constants/constants";
import useCurrency from "@src/hooks/useCurrency";
import { formatMoney } from "@src/utils/formatters";
import { useSocketClient } from "@src/services/SocketClient";
import useHiddenColumns from "@src/components/Table/HiddenColumns/useHiddenColumns";
import useAppTheme from "@src/theme/useAppTheme";
import { invokeRestTransport, invokeWebsocketTransport } from "@src/services/useTransport";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import { bomCost, isShowBetterPriceHint } from "@src/utils/bom";
import findLastIndex from "lodash/findLastIndex";
import clsx from "clsx";
import { getCostAndQuantity, getDynamicMoq, isProductAvailable, validateQuantity } from "@src/utils/product";
import { Paginate } from "@src/components";
import {
  extendedLoadingOfSearchResultsForCashing,
  getProductsForCashingAction,
  setExtendedSearchFinished,
} from "@src/store/search/searchActions";
import Preloader from "@src/components/Preloader/Preloader";
import useAppSelector from "@src/hooks/useAppSelector";
import {
  BomFields,
  EditorBomData,
  Row,
  Groups,
  Items,
  Stockrecords,
  SelectedLine,
  GroupRfqData,
  BomGroup,
} from "@src/store/bom/bomTypes";
import SetsModal from "@src/views/chipassist/Bom/components/BomViewNew/BomEditor/SetsModal/SetsModal";
import Sticky from "react-sticky-el";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import BomTableRow from "@src/views/chipassist/Bom/components/BomViewNew/BomEditor/BomTableRow/BomTableRow";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import ProductSelectModal from "./ProductSelectModal/ProductSelectModal";
import TableHeadLabel, { parseOrderValues } from "../../TableHeadLabel/TableHeadLabel";
import { useStyles } from "./style";
import CheckoutModal from "./CheckoutModal/CheckoutModal";
import MoreButton from "../../MoreButton/MoreButton";
import { SaveProps } from "./ProductSelectModal/productSelectModalTypes";

interface TableHeadLabels {
  label: string;
  labelPostfix: string;
  name: string;
  hasSort: boolean;
  isHideable: boolean;
  isRequired: boolean;
  isShowDefault?: boolean;
}

interface Props {
  title: string;
  bom: EditorBomData;
  onSaveBom: (bomFields: BomFields) => void;
  actionText: string;
  page: number;
  pageSize: number;
  rowsType: string;
  renderPageSizeSelect: (className: string, bom: BomFields) => JSX.Element;
  onChangeOrderBy: (value: string) => void;
  orderByValue: string;
  renderRowsType: () => JSX.Element;
}

export const tableHeadLabels: TableHeadLabels[] = [
  {
    label: "column.number",
    labelPostfix: "",
    name: "id",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.part_number_bom_view",
    labelPostfix: "",
    name: "partnumber",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.qty",
    labelPostfix: "",
    name: "quantity",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "distributor.in_stock",
    labelPostfix: "",
    name: "num_in_stock",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "distributor.lead_period",
    labelPostfix: "",
    name: "lead_period",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "distributor.distributor",
    labelPostfix: "",
    name: "seller",
    hasSort: false,
    isHideable: false,
    isShowDefault: constants.id !== ID_ICSEARCH,
    isRequired: false,
  },
  {
    label: "column.product",
    labelPostfix: "",
    name: "product",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.unit_price",
    labelPostfix: "currency",
    name: "price",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.total_price",
    labelPostfix: "currency",
    name: "cost",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.status",
    labelPostfix: "",
    name: "status",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
];

const BomEditor: React.FC<Props> = (props) => {
  const { onSaveBom, renderPageSizeSelect, onChangeOrderBy, orderByValue } = props;

  const socketClient = useSocketClient("search");
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();

  const page = props.page || 1;
  const pageSize = props.pageSize || 25;
  const tableRef = useRef(null);
  const { currency, currencyPrice } = useCurrency();
  const { t } = useI18n("bom");

  const [bom, setBom] = useState<EditorBomData>({ ...props.bom });
  const [loaded, setLoaded] = useState(false);
  const [itemsQtyRef, setItemsQtyRef] = useState<any>({ ...props.bom }); // For sets
  // const [productsNeedUpdate, setProductsNeedUpdate] = useState(false);
  const [order, setOrder] = useState<string>(orderByValue ? parseOrderValues(orderByValue)[1] : "asc");
  const [orderBy, setOrderBy] = useState(
    orderByValue &&
      tableHeadLabels
        .filter((v) => v.hasSort)
        .map((v) => v.name)
        .includes(parseOrderValues(orderByValue)[0])
      ? parseOrderValues(orderByValue)[0]
      : "part_number_ref",
  );
  const [sets, setSets] = useState(1);
  const [selectedLines, setSelectedLines] = useState([]);
  const [stickyColumnsWidth, setStickyColumnsWidth] = useState([]);
  const [isActiveSticky, setIsActiveSticky] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [paginationGroups, setPaginationGroups] = useState<Array<[string, BomGroup]>>([]);
  const [groups, setGroups] = useState<Groups>(null);
  const [qtyDebounce, setQtyDebounce] = useState(null);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [isInvalidQty, setIsInvalidQty] = useState(false);
  const [openSetsModal, setOpenSetsModal] = useState(false);
  const [disabledNameBtn, setDisabledNameBtn] = useState(true);
  const [disabledSetsBtn, setDisabledSetsBtn] = useState(true);
  const [updatedProducts, setUpdatedProducts] = useState<{ [key: string]: boolean }>(null); // For update product only one time
  const [bomTotalCost, setBomTotalCost] = useState<number>(null);
  const [bomName, setBomName] = useState<string>(props.bom.name);
  const [feedbackHasBeenSend, setFeedbackHasBeenSend] = useState(false);

  // const stockrecordsForUpdate = useAppSelector((state) => state.bom.stockrecordsForUpdate);
  const isCoping = useAppSelector((state) => state.bom.copy?.copying);
  const cashProducts = useAppSelector((state) => state.bom.cashModalItems);
  const serviceTax = useAppSelector((state) => state.checkout.serviceTax);

  const hiddenDefault = tableHeadLabels.reduce((acc, val) => {
    // if (!val.isShowDefault && val.isHideable) return { ...acc, [val.label]: true };
    if (!val.isShowDefault) return { ...acc, [val.label]: true };
    return acc;
  }, {});

  const { hiddenColumns, RenderHideLabel } = useHiddenColumns("bomHiddenColumns", hiddenDefault, "bom");

  const rows: Row[] = useMemo(() => {
    return Object.keys(bom.items).map((key) => {
      return {
        ...bom.items[key],
        key,
      };
    });
  }, [bom.items]);

  useEffect(() => {
    const res = bomCost(bom.items, currencyPrice, true);
    setBomTotalCost(res);
  }, [bom.items, currency]);

  useEffect(() => {
    if (tableRef && tableRef.current) {
      const thWidths = Array.from(tableRef.current.querySelectorAll("th")).map((th: any) => th.offsetWidth);
      setStickyColumnsWidth(thWidths);
    }
  }, [tableRef.current]);

  useEffect(() => {
    let notValid = false;
    Object.values(bom.items).forEach((item) => {
      const stockrecord = item.product && item.product.stockrecords?.find((sr) => sr?.id === item.stockrecord);
      const dynamicMoq = getDynamicMoq(stockrecord);
      if (item.approved && dynamicMoq > item.quantity) {
        notValid = true;
      }
    });
    setIsInvalidQty(notValid);
  }, [bom.items]);

  useEffect(() => {
    const newData: Groups = {};
    let index = 1;
    rows
      .sort((a, b) => a.order_ref - b.order_ref)
      .forEach((row) => {
        if (newData[row.part_number_ref]) {
          // check duplicate
          if (newData[row.part_number_ref].items.some((i) => i.key === row.key)) return;

          newData[row.part_number_ref].items.push(row);
        } else {
          newData[row.part_number_ref] = { index, items: [row] };
          index += 1;
        }
      });
    if (!updatedProducts) {
      const initial = Object.keys(newData).map((key) => [key, false]);
      setUpdatedProducts(Object.fromEntries(initial));
    }
    setGroups(newData);
    setLoaded(true);
  }, [rows]);

  async function delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const asyncGetProducts = async (array: Array<string>[]) => {
    /* eslint-disable no-await-in-loop */
    /* eslint-disable no-continue */
    for (let i = 0; i < array.length; i += 1) {
      if (!window.document.querySelector("#bom-list-table")) break; // stop
      if (
        cashProducts &&
        cashProducts[array[i][0]] &&
        new Date().getTime() - cashProducts[array[i][0]].createdTime < constants.cashBomModalTime * 1000 * 60
      ) {
        continue;
      }

      if (array[i][1] === "available") {
        const res = await dispatch(
          getProductsForCashingAction(
            1,
            25,
            {
              search: encodeURIComponent(array[i][0]),
              base_num_in_stock: groups[array[i][0]].items[0].quantity_ref || 1,
              sim: "bom",
              search_type: "bom",
            },
            array[i][0],
          ),
        ).catch((e: any) => e); // Code doesn`t go next after request error without it

        let results = res?.results;
        if (res?.search_id) {
          let extendedRes = await dispatch(
            extendedLoadingOfSearchResultsForCashing(res?.search_id, {
              page: 1,
              page_size: 25,
              search: encodeURIComponent(array[i][0]),
              base_num_in_stock: groups[array[i][0]].items[0].quantity_ref || 1,
              sim: "bom",
              search_type: "bom",
            }),
          );
          while (extendedRes?.status === "PENDING") {
            if (!window.document.querySelector("#bom-list-table")) break;
            extendedRes = await dispatch(
              extendedLoadingOfSearchResultsForCashing(res?.search_id, {
                page: 1,
                page_size: 25,
                search: encodeURIComponent(array[i][0]),
                base_num_in_stock: groups[array[i][0]].items[0].quantity_ref || 1,
                sim: "bom",
                search_type: "bom",
              }),
            );
            await delay(2000);
          }
          dispatch(setExtendedSearchFinished());

          if (extendedRes?.results) {
            results = extendedRes.results;
          }
        }
        dispatch(saveCashModalProducts(array[i][0], results, null, !results));
      }

      if (array[i][1] === "rfq") {
        dispatch(getRfqRowCount(array[i][0])).then((res: GroupRfqData) => {
          dispatch(saveCashModalProducts(array[i][0], [], res));
        });
      }

      await delay(1000);
      /* eslint-enable no-await-in-loop */
      /* eslint-enable no-continue */
    }
  };

  useEffect(() => {
    if (loaded && groups) {
      const partNumbers: Array<string>[] = [];

      Object.entries(groups)
        .sort((a, b) => a[1].index - b[1].index)
        .forEach((item) => {
          const [key, group] = item;
          const validGroupForSearch = group.items.find((row) => {
            if (row.product) {
              const stockrecord = row.product.stockrecords?.find((sr) => sr.id === row.stockrecord);
              if (row.product.id && stockrecord?.id) return true;
              return false;
            }
            return false;
          });

          if (validGroupForSearch) {
            partNumbers.push([key, "available"]);
          } else {
            partNumbers.push([key, "rfq"]);
          }
        });

      if (constants.cashBomModalProducts && partNumbers.length) {
        asyncGetProducts(partNumbers);
      }
    }
  }, [loaded]);

  // const stockrecordsLoadingCount = rows.filter(
  //   (row: any) => bom.stockrecords[row.key] && bom.stockrecords[row.key].stockrecordsLoading,
  // ).length;

  // useEffect(() => {
  //   setProductsNeedUpdate(false);
  //   Object.keys(bom.items).forEach((key) => {
  //     if (bom.items[key]?.errors) setProductsNeedUpdate(true);
  //   });
  // }, []);

  useEffect(() => {
    setBom(() => {
      return { ...props.bom };
    });
    setItemsQtyRef({ ...props.bom });
  }, [props.bom]);

  useEffect(() => {
    if (paginationGroups?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [paginationGroups]);

  useEffect(() => {
    if (groups) {
      const newData = Object.entries(groups).sort((a, b) => a[1].index - b[1].index);
      setPaginationGroups(newData.slice((currentPage - 1) * pageSize, pageSize * currentPage));
    }
  }, [currentPage, pageSize, groups]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const changeProducts = (items: Row[], product: any, stockrecord: any, approved = false) => {
    if (!feedbackHasBeenSend) {
      dispatch(
        sendFeedbackMessageThunk("Bom_product_has_been_changed", {
          account: localStorage.getItem("email"),
          bom_id: bom.id,
          part_number_ref: items[0].part_number_ref,
          from: items[0].stockrecord,
          to: stockrecord.id,
        }),
      );
      setFeedbackHasBeenSend(true);
    }
    const stateStockrecords: Stockrecords = {};
    const stateItems: Items = {};
    const bomStockrecords = { ...bom.stockrecords };
    const bomItems = { ...bom.items };

    items.forEach((item) => {
      dispatch(removeBomEditLineThunk(bom.id, item.id));
      dispatch(
        createBomLineThunk(bom.id, {
          ...bomLineFields,
          part_number: product.upc || "",
          part_number_ref: item.part_number_ref || "",
          product,
          selected_product: product.id || t("select_product"),
          quantity: item.quantity,
          quantity_ref: item.quantity_ref || item.quantity,
          description: product.description || "",
          stockrecord: stockrecord.id,
          order_ref: item.order_ref,
          approved,
        }),
      ).then((res: any) => {
        if (res?.id) {
          dispatch(updateFrontItem(item.key, res));
        }
      });

      const stockrecordItems = bom.stockrecords[item.key]?.items?.filter((v) => v.id !== item.stockrecord) || [];
      stateStockrecords[item.key] = { items: [...stockrecordItems, stockrecord] };

      stateItems[item.key] = {
        id: uuidv4(),
        ...bomLineFields,
        part_number_ref: item.part_number_ref,
        part_number: product.upc || "",
        selected_product: product.id,
        product,
        description: product.description,
        stockrecord: stockrecord.id,
        quantity: item.quantity,
        quantity_ref: item.quantity_ref,
        approved,
        requested: false,
        rfq_id: null,
        rfq: null,
        units_count: null,
        order_ref: item.order_ref,
      };
    });

    const lastGroupItemIndex = findLastIndex(
      Object.entries(bomItems),
      (v) => v[1].part_number_ref === items[0].part_number,
    );

    const newItems: any = {
      ...(lastGroupItemIndex >= 0
        ? Object.fromEntries(Object.entries(bomItems).slice(0, lastGroupItemIndex))
        : bomItems),
      ...stateItems,
      ...(lastGroupItemIndex >= 0 ? Object.fromEntries(Object.entries(bomItems).slice(lastGroupItemIndex + 1)) : []),
    };

    items.forEach((item) => {
      delete bomItems[item.key];
      delete bomStockrecords[item.key];
    });

    const newBom = {
      ...bom,
      items: newItems,
      stockrecords: {
        ...bomStockrecords,
        ...stateStockrecords,
      },
    };

    onSaveBom(newBom);
  };

  const setSelectedProductsToFrontend = (items: SaveProps[]) => {
    if (!items.length) return false;

    const stateStockrecords: Stockrecords = {};
    const stateItems: Items = {};
    const bomStockrecords = { ...bom.stockrecords };
    const bomItems = { ...bom.items };
    const rfqDuplicatesItems = items.filter((item) => item.rowKey.includes("duplicate"));

    items
      .filter((item) => !item.rowKey.includes("duplicate"))
      .forEach((item) => {
        const rfqDuplicateItem = rfqDuplicatesItems.find((rfqItem) => rfqItem.rowKey === `${item.rowKey} duplicate`);

        if (!item.checked && !rfqDuplicateItem?.checked && bomItems[item.rowKey]) {
          return dispatch(removeBomEditLineThunk(bom.id, bomItems[item.rowKey].id));
        }

        if (!bomItems[item.rowKey]) {
          dispatch(
            createBomLineThunk(bom.id, {
              ...bomLineFields,
              part_number: item.product?.upc || item.partNumber || "",
              part_number_ref: item.partNumber || "",
              product: item.product || "",
              selected_product: item.productId || t("select_product"),
              quantity: item.qty,
              quantity_ref: item.qty_ref || item.qty,
              description: item.product?.description || "",
              stockrecord: item.stockrecordId,
              approved: false,
              order_ref: item.orderRef,
            }),
          ).then((res: any) => {
            if (res?.id) {
              dispatch(
                updateBomLineThunk(bom.id, {
                  id: res.id,
                  approved: true,
                }),
              ).then((resp: any) => dispatch(updateFrontItem(item.rowKey, resp)));
            }
          });
        } else {
          dispatch(
            updateBomLineThunk(bom.id, {
              ...bom.items[item.rowKey],
              product: item.productId || null,
              quantity: (item.checked ? item.qty : 0) + (rfqDuplicateItem?.checked ? rfqDuplicateItem.qty : 0),
              approved: false,
            }),
          ).then((res: any) => {
            if (res?.id) {
              dispatch(
                updateBomLineThunk(bom.id, {
                  id: res.id,
                  approved: true,
                }),
              );
            }
          });
        }

        const {
          partNumber,
          product,
          productId,
          productTitle,
          productDescription,
          stockrecordId,
          qty,
          qty_ref,
          stockrecord,
        } = item;
        const stockrecordItems = bom.stockrecords[item.rowKey]?.items?.filter((v) => v?.id !== stockrecordId) || [];
        stateStockrecords[item.rowKey] = { items: [...stockrecordItems, stockrecord] };

        stateItems[item.rowKey] = {
          id: uuidv4(),
          ...bomItems[item.rowKey],
          part_number_ref: bomItems[item.rowKey]?.part_number_ref || partNumber,
          part_number: partNumber,
          selected_product: productId,
          product,
          product_title: productTitle, // title of product
          description: productDescription,
          stockrecord: stockrecordId,
          quantity: (item.checked ? qty : 0) + (rfqDuplicateItem?.checked ? rfqDuplicateItem.qty : 0),
          quantity_ref: qty_ref || 1,
          approved: true,
          requested: !!item.request,
          rfq_id: null,
          rfq: null,
          order_ref: item.orderRef || null,
        };
        return true;
      });

    const lastGroupItemIndex = findLastIndex(
      Object.entries(bomItems),
      (v) => v[1].part_number_ref === items[0].partNumber,
    );

    const newItems: any = {
      ...(lastGroupItemIndex >= 0
        ? Object.fromEntries(Object.entries(bomItems).slice(0, lastGroupItemIndex))
        : bomItems),
      ...stateItems,
      ...(lastGroupItemIndex >= 0 ? Object.fromEntries(Object.entries(bomItems).slice(lastGroupItemIndex + 1)) : []),
    };

    items.forEach((item) => {
      const rfqDuplicateItem = rfqDuplicatesItems.find((rfqItem) => rfqItem.rowKey === `${item.rowKey} duplicate`);
      if (!item.checked && !rfqDuplicateItem?.checked) {
        delete newItems[item.rowKey];
        delete bomStockrecords[item.rowKey];
      }
    });

    const newBom = {
      ...bom,
      items: newItems,
      stockrecords: {
        ...bomStockrecords,
        ...stateStockrecords,
      },
    };
    onSaveBom(newBom);
    return true;
  };

  const onChangeBomField = (key: string, field: string) => (e: ChangeEvent<HTMLInputElement>, frontendOnly = false) => {
    const { value } = e.target;
    let resultValue: number | string = value;
    if (field === "quantity") {
      resultValue = !parseInt(value) ? 0 : parseInt(value);
    }
    setBomFieldValue(key, field, resultValue, frontendOnly);
  };

  const setBomFieldValue = (key: string, field: string, value: any, frontendOnly = false) => {
    setBom((prevState) => {
      return {
        ...prevState,
        items: {
          ...prevState.items,
          [key]: {
            ...prevState.items[key],
            [field]: value,
          },
        },
      };
    });

    if (!frontendOnly && bom.items[key]) {
      const lineData: { [key: string]: any } = { id: bom.items[key].id, rowKey: key, [field]: value };
      return dispatch(updateBomLineThunk(bom.id, lineData));
    }
    return Promise.resolve();
  };

  const onLineSearch = (key: string, query: string, numInStock: number) => {
    invokeWebsocketTransport(() => {
      dispatch(beforeBomLineSearch(key, query));
      socketClient.onMessage((data: any) => {
        dispatch(socketBomLineSearch(data, key));
      });
      socketClient.send({ ...{ search: query }, page: 1, page_size: 100 });
    });

    invokeRestTransport(() => {
      dispatch(loadBomLineSearchThunk(key, query, numInStock));
    });
  };

  const onPageChange = (data: any) => {
    window.scrollTo({ top: 140 });
    setCurrentPage(data.selected + 1);
  };

  // const onLineGetPrices = (lines: Array<{ key: string; productId: number; productUpc: string }>) => {
  //   const countForUpdate = stockrecordsLoadingCount ? lines.length + stockrecordsForUpdate : lines.length;
  //
  //   invokeWebsocketTransport(() => {
  //     dispatch(setBomLinePricesCount(countForUpdate));
  //     dispatch(startBomLinePricesLoading(lines, mode));
  //     socketClient.onMessage((data: any) => {
  //       dispatch(socketBomLinePricesSearch(data, lines, mode));
  //     });
  //     const searchArray = lines.map((val) => val.productUpc);
  //     socketClient.send({ upc: searchArray, page_size: 100 });
  //   });
  //
  //   invokeRestTransport(() => {
  //     dispatch(setBomLinePricesCount(countForUpdate));
  //     Promise.all(
  //       lines.map((val) => dispatch(loadBomLinePricesThunk(val.key, val.productId, val.productUpc, mode))),
  //     ).then(() => dispatch(simpleUpdateProducts(bom))); // For update last_update item field and hide Alert
  //   });
  // };

  // const onUpdatePriceClick = (id, data) => {
  //   dispatch(updateBomLineThunk(id, data));
  // };

  const startSearch = React.useCallback((value: string, numInStock: number) => {
    onSaveBom(bom);
    if (value) {
      onLineSearch(value, value, numInStock);
      localStorage.setItem("productQuery", value);
    }
  }, []);

  // eslint-disable-next-line no-shadow
  const onSortClick = (column: string) => {
    // eslint-disable-next-line no-nested-ternary
    const new_order = orderBy !== column ? "asc" : order === "asc" ? "desc" : "asc";
    setOrder(new_order);
    setOrderBy(column);
    if (onChangeOrderBy) {
      onChangeOrderBy(`${column}_${new_order}`);
    }
  };

  const totalCost = () => {
    return (
      <div className={`${classes.total} total-cost`}>
        {t("bom.edit.total_cost")}:
        <strong style={{ marginLeft: 5 }}>
          {formatMoney(bomTotalCost) || 0} {currency?.symbol}
        </strong>
      </div>
    );
  };

  const onOpenProductSelectModal = (items: Row[]) => () => {
    const lines: SelectedLine[] = [];
    items.forEach((row) => {
      const stockrecord = (row.product as Product)?.stockrecords.find((sr) => sr.id === row.stockrecord);
      const validQty = validateQuantity(row.quantity, stockrecord)?.validLowQuantity || row.quantity;

      if (stockrecord && validQty > stockrecord.num_in_stock) {
        const validAvailableQty =
          validateQuantity(stockrecord.num_in_stock, stockrecord)?.validLowQuantity || stockrecord.num_in_stock;
        const validRestQty =
          validateQuantity(validQty - validAvailableQty, stockrecord)?.validLowQuantity || validQty - validAvailableQty;
        lines.push({
          rowKey: row.key,
          partNumberForSearch: row.part_number_ref || row.part_number,
          partNumber: row.part_number,
          product: row,
          stockrecordId: row.stockrecord,
          qty: validAvailableQty,
          defaultQty: row.quantity_ref || 1,
          rfq: row.rfq,
          orderRef: row.order_ref,
        });
        lines.push({
          rowKey: `${row.key} duplicate`,
          partNumberForSearch: row.part_number_ref || row.part_number,
          partNumber: row.part_number,
          product: row,
          stockrecordId: row.stockrecord,
          qty: validRestQty,
          defaultQty: row.quantity_ref || 1,
          rfq: 1,
          orderRef: row.order_ref,
        });
        return false;
      }

      return lines.push({
        rowKey: row.key,
        partNumberForSearch: row.part_number_ref || row.part_number,
        partNumber: row.part_number,
        product: row,
        stockrecordId: row.stockrecord,
        qty: validQty,
        defaultQty: row.quantity_ref || 1,
        rfq: row.rfq,
        orderRef: row.order_ref,
      });
    });
    setSelectedLines(lines);
    setUpdatedProducts((prevState) => ({ ...prevState, [items[0].part_number_ref]: true }));
  };

  const onCloseProductSelectModal = React.useCallback(() => {
    setSelectedLines([]);
    localStorage.removeItem("productQuery");
  }, []);

  const onSubmitProductSelectModal = React.useCallback(
    (selectedItems: SaveProps[]) => {
      setSelectedProductsToFrontend(selectedItems);
    },
    [bom.items],
  );

  // const onSubmitProductSelectModal = (groupPartnumberRef = null) => (selectedItems) => {
  //   setSelectedProducts(selectedItems, groupPartnumberRef);
  // };

  const onChangeSets = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabledSetsBtn) setDisabledSetsBtn(false);

    const value = e.target.value.replace(/\D/gi, "");
    setSets(+value);
  };

  const onOpenSetsModal = () => {
    setOpenSetsModal(true);
  };

  const onApplyBomSets = () => {
    if (sets <= 0) return false;
    rows.map((item) => {
      const quantity_ref = itemsQtyRef.items[item.key]?.quantity_ref || 1;
      setBomFieldValue(item.key, "quantity", quantity_ref === 1 ? sets : quantity_ref * sets);
      return item;
    });
    setDisabledSetsBtn(true);
    setOpenSetsModal(false);
    return true;
  };

  // const onUpdateProducts = () => {
  //   setProductsNeedUpdate(false);
  //   onSaveBom(bom);
  //   const lines: Array<{ key: string; productId: number; productUpc: string }> = [];
  //   rows.forEach((row) => {
  //     if (row.product && row.product.id) {
  //       lines.push({ key: row.key, productId: row.product.id, productUpc: row.product.upc });
  //     }
  //   });
  //   onLineGetPrices(lines);
  // };

  const handleAddToCart = () => {
    setConfirmModalOpen(true);
  };

  const onExportBOM = (id: number, eType: "csv" | "xls") => () => {
    dispatch(exportBomThunk(id, eType));
  };

  const TableHeader = (columnsWidth: number[] = []) => {
    return (
      <TableHead>
        <TableRow className={`${appTheme.trTh} ${classes.trTh}`}>
          {tableHeadLabels
            .filter((th) => !hiddenColumns[th.label])
            .map((label, index) => {
              return (
                <TableCell
                  key={label.name}
                  className={clsx({
                    [classes.quantityTh]: label.name === "quantity",
                    [classes.priceTh]: label.name === "price",
                    [classes.statusTh]: label.name === "status",
                    [classes.numInStockTh]: label.name === "num_in_stock",
                    [classes.textAlignEnd]: label.name === "cost",
                  })}
                  style={{ width: columnsWidth[index] && `${columnsWidth[index]}px` }}
                >
                  <TableHeadLabel
                    labelOptions={label}
                    order={order}
                    orderBy={orderBy}
                    onSort={onSortClick}
                    HideComponent={RenderHideLabel}
                    mode={null}
                  />
                </TableCell>
              );
            })}
          {!bom.readonly && (
            <TableCell style={{ textAlign: "center" }}>
              <DeleteOutlineIcon style={{ fontSize: "1.7rem" }} />
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const onCloseModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const onDeleteBomEdit = () => {
    dispatch(deleteBomThunk([bom.id]));
  };

  const createCopy = (id: number, name: string) => () => {
    dispatch(createBomCopy(id, name));
  };

  const onDeleteBomLine = (items: Row[]) => {
    const newItems = { ...bom.items };
    items.forEach((item) => {
      dispatch(removeBomEditLineThunk(bom?.id, item.id));
      delete newItems[item.key];
    });
    setBom((prevState) => {
      return {
        ...prevState,
        items: newItems,
      };
    });
  };

  const qtyChangeHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();
    const groupRef = bom.items[key].part_number_ref;

    onChangeBomField(key, "quantity")(e, true);
    if (qtyDebounce) clearTimeout(qtyDebounce);
    const timeoutID = setTimeout(() => onChangeBomField(key, "quantity")(e, false), 600);
    setQtyDebounce(timeoutID);

    // set approved to false for all group items
    Object.entries(bom.items).forEach((entr) => {
      const [itemKey, item] = entr;
      if (item.approved && item.part_number_ref === groupRef) {
        setBomFieldValue(itemKey, "approved", false, false);
      }
    });
  };

  const deleteGroupHandler = (groupKey: string) => () => {
    const group = groups && groups[groupKey];
    if (group) {
      onDeleteBomLine(group.items);
    }
  };

  const deleteLineHandler = (groupKey: string) => (lineId: number | string) => {
    const line = groups && groups[groupKey]?.items.find((row) => row.id === lineId);
    if (line) {
      onDeleteBomLine([line]);
    }
  };

  const toggleRfqApproved = (items: Row[]) => () => {
    items.forEach((item) => setBomFieldValue(item.key, "approved", !item.approved));
  };

  const totalPages = useMemo(() => {
    return Math.ceil((groups ? Object.keys(groups).length : 1) / pageSize);
  }, [groups, pageSize]);

  const onChangeBomName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (disabledNameBtn && value.trim()) setDisabledNameBtn(false);
    if (!disabledNameBtn && !value.trim()) setDisabledNameBtn(true);

    setBomName(value);
  };

  const onSaveNameHandler = () => {
    const name = bomName.trim().replace(/\s{2,}/gi, " ");
    setDisabledNameBtn(true);
    dispatch(saveBomNameThunk(bom.id, name)).then(() => {
      dispatch(
        showBottomLeftMessageAlertAction({
          text: `${t("edit.bom_name_saved")}`,
          severity: "success",
        }),
      );
    });
  };

  const onStickyFixedToggle = (opened: boolean) => {
    if (!opened) return setIsActiveSticky(false);

    if (tableRef && tableRef.current) {
      const thWidths = Array.from(tableRef.current.querySelectorAll("th")).map((th: any) => th.offsetWidth);
      setStickyColumnsWidth(thWidths);
      setIsActiveSticky(true);
    }
    return true;
  };

  return (
    <div>
      {!loaded && <Preloader title={t("bom.opening_page")} />}
      {loaded && (
        <>
          <div className={classes.headerButtonsWrap}>
            <MoreButton
              buttonVariant="button"
              type="bomEdit"
              buttonClassName={clsx(classes.headerButton, classes.exportBom)}
              onExportCsv={onExportBOM(bom.id, "csv")}
              onExportXls={onExportBOM(bom.id, "xls")}
              readonly={bom.readonly}
            >
              {t("common.export")}
            </MoreButton>
            <ConfirmButton
              onAction={onDeleteBomEdit}
              theme="button"
              type="bomEdit"
              className={clsx(classes.headerButton, classes.deleteBom)}
              question={t("bom.delete_bom")}
              caption={t("bom.delete_bom")}
            />
          </div>

          <Sticky className={classes.stickyContainer} topOffset={50} onFixedToggle={onStickyFixedToggle}>
            <div className={classes.actionsContainer}>
              <Box display="flex" justifyContent="space-between">
                <div></div>
                <div className={classes.rightControls}>
                  {/* {renderRowsType && renderRowsType()} */}
                  {/* {!isActiveSticky && ( */}
                  {/*  <div style={{ marginRight: 15 }}> */}
                  {/*    <RenderAddColumnBar /> */}
                  {/*  </div> */}
                  {/* )} */}
                  {!!renderPageSizeSelect && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {t("common.show_by")}:
                      <div style={{ marginLeft: 10 }}>{renderPageSizeSelect(classes.pageSizeSelect, bom)}</div>
                    </div>
                  )}
                </div>
              </Box>

              <Box mt={1} mb={1} className={classes.headerSection}>
                <Box className={classes.headerNameSection}>
                  {bom.readonly ? (
                    <Typography className={classes.headerName} variant="h4" component="h4">
                      {bom.name}
                    </Typography>
                  ) : (
                    <Box display="flex">
                      <TextField
                        id="bom name"
                        name="bom_name"
                        label={`${t("bom.edit.bom_name")}*`}
                        type="text"
                        onChange={onChangeBomName}
                        fullWidth
                        variant="outlined"
                        className={classes.bomName}
                        value={bomName}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={clsx(classes.bomSetsApply, appTheme.buttonCreate)}
                        onClick={onSaveNameHandler}
                        disabled={disabledNameBtn || !bom.name}
                      >
                        {t("bom.edit.save")}
                      </Button>
                    </Box>
                  )}
                  {!bom.readonly && (
                    <React.Fragment>
                      <Box display="flex">
                        <TextField
                          id="bom sets"
                          name="bom_sets"
                          label={t("bom.edit.sets")}
                          type="text"
                          onChange={onChangeSets}
                          variant="outlined"
                          className={classes.bomSets}
                          value={sets}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={clsx(classes.bomSetsApply, appTheme.buttonCreate)}
                          disabled={sets <= 0 || disabledSetsBtn}
                          onClick={onOpenSetsModal}
                        >
                          {t("bom.edit.apply")}
                        </Button>
                      </Box>
                      {/* <Button */}
                      {/*  variant="contained" */}
                      {/*  size="small" */}
                      {/*  className={clsx(classes.bomActionBtn, appTheme.buttonPrimary)} */}
                      {/*  onClick={onUpdateProducts} */}
                      {/*  disabled={stockrecordsLoadingCount > 0} */}
                      {/* > */}
                      {/*  {t("bom.edit.update_products")} */}
                      {/* </Button> */}
                    </React.Fragment>
                  )}
                </Box>
                <Box className={classes.headerActions}>
                  {/* {bom.saving && <span className={classes.savingLabel}>{t("common.saving")}</span>} */}
                  {/* {stockrecordsLoadingCount > 0 && ( */}
                  {/*  <span className={classes.savingLabel}> */}
                  {/*    {t("bom.edit.updated", { */}
                  {/*      count: stockrecordsForUpdate - stockrecordsLoadingCount, */}
                  {/*      total: stockrecordsForUpdate, */}
                  {/*    })} */}
                  {/*  </span> */}
                  {/* )} */}
                  <Box display="flex" alignItems="center">
                    {totalCost}
                  </Box>
                  {bom.readonly ? (
                    <Button
                      onClick={createCopy(bom.id, bom.name)}
                      variant="contained"
                      color="primary"
                      className={`${classes.yellowBtn} ${classes.topBtn}`}
                      style={{ marginRight: 0 }}
                      size="small"
                      disabled={isCoping}
                    >
                      {isCoping && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
                      {t("bom.column.new_order_btn")}
                    </Button>
                  ) : (
                    <Button
                      style={{ marginRight: 0 }}
                      variant="contained"
                      size="small"
                      onClick={handleAddToCart}
                      className={`${appTheme.buttonCreate} ${classes.topBtn}`}
                      disabled={
                        bom.saving ||
                        // stockrecordsLoadingCount > 0 ||
                        !rows.some((i) => i.approved === true) ||
                        isInvalidQty
                      }
                    >
                      {t("bom.edit.add_to_cart_btn")}
                    </Button>
                  )}
                </Box>
              </Box>

              {/* {productsNeedUpdate && !bom.readonly && ( */}
              {/*  <Box className={classes.needUpdateAlert}> */}
              {/*    {t("bom.edit.update_products_alert_text")} */}
              {/*    <span className={classes.needUpdateAlertLink} onClick={onUpdateProducts}> */}
              {/*      {t("bom.edit.update_products_alert_link")} */}
              {/*    </span> */}
              {/*  </Box> */}
              {/* )} */}
            </div>
            <Table size="medium" className={classes.table} style={{ display: isActiveSticky ? "table" : "none" }}>
              {TableHeader(stickyColumnsWidth)}
            </Table>
          </Sticky>

          {bom && !!Object.entries(bom.items).length && (
            <div style={{ overflowX: "auto" }}>
              <Table id="bom-list-table" size="medium" className={classes.table} ref={tableRef}>
                {TableHeader()}
                <TableBody>
                  {paginationGroups.map((groupItem) => {
                    const [groupKey, group] = groupItem;
                    if (!group) return false;
                    const { index, items } = group;

                    const itemsData = items.map((item: Row) => {
                      let stockrecord;
                      if (bom.stockrecords[item.key]?.items?.length) {
                        const filteredStockrecords = bom.stockrecords[item.key].items.filter(
                          (v) => v?.id === item.stockrecord,
                        );
                        if (filteredStockrecords.length) {
                          const val = filteredStockrecords[0];
                          stockrecord = val;
                        }
                      }
                      const PNQ = getCostAndQuantity(item.quantity, stockrecord);
                      const minQty = PNQ ? PNQ.moq || 1 : 1;
                      const unitPrice = PNQ && PNQ.price ? PNQ.price.price || 0 : 0;
                      const isAvaible = isProductAvailable(stockrecord, item.quantity || 0);
                      const costNum = parseFloat(unitPrice) * +item.quantity;
                      const cost = costNum ? formatMoney(currencyPrice(costNum, stockrecord?.price_currency)) : "";

                      return {
                        id: item.id,
                        stockrecord,
                        minQty,
                        unitPrice,
                        isAvaible,
                        costNum,
                        cost,
                      };
                    });

                    const isRfq = !items?.find(
                      (i: any) =>
                        i.stockrecord &&
                        i.product &&
                        i.product.stockrecords.find((sr: Stockrecord) => sr.id === i.stockrecord),
                    );
                    // console.log("isRfq:", isRfq, "partNumber:", items[0].part_number_ref, items, itemsData);
                    const isAvailable = !items?.find((i: any) => {
                      const stockrecord = itemsData.find((v) => v.id === i.id)?.stockrecord;
                      return !isRfq && isProductAvailable(stockrecord, 1);
                    });
                    const { isShowPriceHint, price, betterStockrecord, betterProduct } = isShowBetterPriceHint(
                      itemsData,
                      items,
                      cashProducts ? cashProducts[groupKey]?.products : null,
                      currencyPrice,
                    );

                    if (!bom.readonly && !isRfq && updatedProducts && !updatedProducts[groupKey]) {
                      if (!items[0].approved && (isShowPriceHint || isAvailable)) {
                        if (betterStockrecord) {
                          // Change all items on better alternative product
                          changeProducts(items, betterProduct, betterStockrecord);
                          setUpdatedProducts((prevState) => ({ ...prevState, [groupKey]: true }));
                          console.log(`Group "${items[0].part_number_ref}" updated to better product from modal`);
                        } else {
                          // Change stockrecords of all items to null for RFQ status if not alternatives
                          itemsData.forEach((i) => {
                            const item = items.find((row: Row) => i.id === row.id);
                            if (item) setBomFieldValue(item.key, "stockrecord", null, false);
                          });
                          setUpdatedProducts((prevState) => ({ ...prevState, [groupKey]: true }));
                        }
                      }

                      // Cancel confirmation and change to alternative or RFQ if product approved and out of stock
                      if (items[0].approved && cashProducts && cashProducts[groupKey]) {
                        const isSomeoneOutOfStock = itemsData.some((i) => i.stockrecord && !i.stockrecord.num_in_stock);
                        if (isSomeoneOutOfStock) {
                          const productsNeedUpdate: Row[] = [];

                          itemsData.forEach((i) => {
                            const item = items.find((row: Row) => i.id === row.id);
                            if (item && i.stockrecord && !i.stockrecord.num_in_stock) {
                              productsNeedUpdate.push(item);
                            }
                          });

                          if (betterStockrecord) {
                            changeProducts(productsNeedUpdate, betterProduct, betterStockrecord, true);
                            console.log(`Group "${items[0].part_number_ref}" updated to better product from modal`);
                          } else {
                            productsNeedUpdate.forEach((item) => {
                              setBomFieldValue(item.key, "approved", false, false)
                                .then(() => setBomFieldValue(item.key, "stockrecord", null, false))
                                .then(() => setBomFieldValue(item.key, "approved", true, false));
                              console.log(`Line "${item.part_number_ref}" updated to null for RFQ status`);
                            });
                          }
                          setUpdatedProducts((prevState) => ({ ...prevState, [groupKey]: true }));
                        }
                      }
                    }

                    return (
                      <BomTableRow
                        key={groupKey}
                        isRfq={isRfq}
                        index={index}
                        groupKey={groupKey}
                        items={items}
                        itemsData={itemsData}
                        rfqData={cashProducts && cashProducts[groupKey]?.rfqData}
                        modalProducts={cashProducts && cashProducts[groupKey]}
                        isShowPriceHint={isShowPriceHint}
                        hintPrice={price}
                        hiddenColumns={hiddenColumns}
                        readonly={bom.readonly}
                        qtyChangeHandler={qtyChangeHandler}
                        onOpenProductSelectModal={onOpenProductSelectModal(items)}
                        toggleRfqApproved={toggleRfqApproved(items)}
                        deleteGroupHandler={deleteGroupHandler(groupKey)}
                        deleteLineHandler={deleteLineHandler(groupKey)}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          {totalPages > 1 && (
            <Box className={classes.pagination}>
              <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChange} />
            </Box>
          )}
          {!!selectedLines.length && (
            <ProductSelectModal
              onSaveData={onSubmitProductSelectModal}
              onClose={onCloseProductSelectModal}
              onStartSearch={startSearch}
              selectedLines={selectedLines}
              selectedPartnumber={selectedLines[0].partNumberForSearch}
              cashProducts={cashProducts[selectedLines[0].partNumberForSearch] || null}
            />
          )}
          {confirmModalOpen && (
            <CheckoutModal
              onCloseModal={onCloseModal}
              bom={bom}
              // cost={getTotalPrices(bomTotalCost, serviceTax, currencyPrice).result}
              // tax={serviceTax}
              // taxCost={getTotalPrices(bomTotalCost, serviceTax, currencyPrice).tax}
            />
          )}
          {openSetsModal && (
            <SetsModal onConfirmHandler={onApplyBomSets} onCloseHandler={() => setOpenSetsModal(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default BomEditor;
