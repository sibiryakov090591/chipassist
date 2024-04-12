import { BomFields, EditorBomData, GroupRfqData } from "@src/store/bom/bomTypes";
import { Product as PProduct, Stockrecord } from "@src/store/products/productTypes";
import { push } from "react-router-redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import { getUniqueId, uniqueFromTwoArrays } from "@src/utils/utility";
import {
  sendFiltersValueAction,
  setExtendedSearchFinished,
  SEARCH_URL,
  SEARCH_URL_EXTENDED,
  API_PATH,
} from "@src/store/search/searchActions";
import { Dispatch } from "redux";
import * as actionSearchTypes from "@src/store/search/searchTypes";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { getCurrentTime } from "@src/utils/date";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { RootState } from "@src/store";
import { isProductAvailable } from "@src/utils/product";
import { getAuthToken } from "@src/utils/auth";
import * as actionTypes from "./bomTypes";

const { t } = staticI18n("bom");

export const bomLineFields: actionTypes.BomLineFields = {
  name: "",
  quantity: 1,
  quantity_ref: 1,
  part_number_ref: "",
  part_number: "",
  product: "",
  product_title: "",
  selected_product: "Select distributor",
  description: "",
  price: null,
  approved: false,
  attributes: [],
  stockrecord: null,
  line_quantity: 0,
  rfq: 0,
  requested: false,
  rfq_id: "",
  units_count: 0,
};

const FileDownload = require("js-file-download");

const SignUpMessage = t("not_logged_in");

export const filterKeyForGroup = "part_number_ref";

export const markBomAsInvalid = (isInvalid: boolean): actionTypes.MarkBomAsInvalid => {
  return { type: actionTypes.MARK_BOM_AS_INVALID, payload: isInvalid };
};

export const loadBomListThunk = (page = 1, disableMsg = false, pageSize = 900, orderBy: string = null) => {
  return (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      if (disableMsg === true) {
        return false;
      }
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    dispatch(loadBomListStart());

    let params = `?page=${page}&page_size=${pageSize}`;
    if (orderBy) {
      params = `${params}&order_by=${orderBy}`;
    }
    const url = `/boms/${params}`;

    dispatch({
      types: actionTypes.LOAD_BOM_LIST_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(url, {
            cancelId: "get_bom_list",
          })
          .then((res) => res.data)
          .then((response: any) => {
            dispatch(saveBomList(response));
            dispatch(loadBomListFinish());
          })
          .catch((error) => {
            console.log("LOAD_BOM_ERROR", error);
            dispatch(loadBomListFinish());
            throw error;
          }),
    });

    return true;
  };
};

export const loadBomListStart = (): actionTypes.LoadBomListStart => {
  return {
    type: actionTypes.LOAD_BOM_LIST_START,
  };
};

export const loadBomListFinish = (): actionTypes.LoadBomListFinish => {
  return {
    type: actionTypes.LOAD_BOM_LIST_FINISH,
  };
};

export const deleteBomThunk = (bomLists: number[], page: number = null, pageSize = 25, order_by: string = null) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const response = await bomLists.map((id) =>
      dispatch({
        types: actionTypes.DELETE_BOM_ARRAY,
        promise: (client: ApiClientInterface) =>
          client
            .delete(`/boms/${id}/`)
            .then((res) => res.data)
            .catch((error) => {
              console.log("DELETE_BOM_ERROR", error);
              return error;
            }),
      }),
    );

    Promise.all(response)
      .then((res) => {
        const currentLocation = window.location.pathname;
        if (currentLocation !== "/bom/bom-list") {
          dispatch(push("/bom/bom-list"));
        }

        const bomList = { ...getState().bom.bomList };
        bomLists.forEach((id) => {
          bomList.results = [...bomList.results].filter((item) => item.id !== id);
        });
        dispatch(saveBomList(bomList));

        if (page && order_by) {
          dispatch(loadBomListThunk(page, false, pageSize, order_by));
        }
        dispatch(loadBomListFinish());
        return res;
      })
      .catch((e) => {
        dispatch(loadBomListFinish());
        console.log("DELETE_CHECKED_LISTS_ERROR", e);
        return e;
      });
  };
};

export const saveBomList = (list: actionTypes.BomList): actionTypes.SaveBomList => {
  return {
    type: actionTypes.SAVE_BOM_LIST,
    payload: list,
  };
};

export const saveAllBomPages = (items: any): actionTypes.SaveAllBomPages => {
  return {
    type: actionTypes.SAVE_ALL_BOM_PAGES,
    payload: items,
  };
};

export const getAttributesThunk = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: actionTypes.GET_ATTRIBUTES_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get("/productattributes/?droplist=")
          .then((res) => res.data)
          .then((response: any) => {
            dispatch(saveAttributes(response.results));
          })
          .catch((error) => {
            console.log("GET_ATTR_ERROR", error);
            throw error;
          }),
    });
  };
};

export const saveAttributes = (attributes: actionTypes.AttributesItem[]): actionTypes.SaveAttributes => {
  return {
    type: actionTypes.SAVE_ATTRIBUTES_LIST,
    payload: attributes,
  };
};

// bom file upload
export const uploadFileThunk = (
  file: any,
  columns: any,
  startingRow: any,
  returnRes = false,
  fullexport = false,
  noHeaderRow = false,
  delimiter: string = null,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("starting_row", startingRow);
  formData.append("partnum_col", columns.part_number);
  formData.append("quantity_col", columns.quantity);
  formData.append("desc_col", columns.description);
  formData.append("attrs_col", columns.attributes);
  formData.append("extid_col", columns.external_id);
  if (delimiter) formData.append("delimiter", `${delimiter}`);
  if (fullexport) formData.append("fullexport", `${fullexport}`);
  if (noHeaderRow) formData.append("noheader_row", `${noHeaderRow}`);

  return (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
      return false;
    }
    dispatch(setUploadState({ uploading: true, error: "", selected: true }));

    return dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .put("/boms/parse/", {
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
          })
          .then((response: any) => {
            if (response.status === 200) {
              const searchId = response.data.search_id;
              const bomId = response.data.id || response.data.bom_id;
              if (returnRes) {
                return response.data;
              }
              return dispatch(checkFileParsingState(searchId, bomId));
            }

            return dispatch(
              setUploadState({
                uploading: false,
                error: t("error_file_upload_backend"),
                selected: false,
              }),
            );
          })
          .catch((error) => {
            dispatch(
              setUploadState({
                uploading: false,
                error: t("error_file_upload"),
                selected: false,
              }),
            );
            console.log("***GET_ATTR_ERROR", error);
            throw error;
          }),
    });
  };
};

export const saveSocketUploadFile = (data: any, bomId: number) => {
  return (dispatch: Dispatch<any>) => {
    if (data.status !== "DONE") return false;
    dispatch(setUploadState({ uploading: false, error: "", selected: false }));
    dispatch(push(`/bom/${bomId}`));
    dispatch(
      showBottomLeftMessageAlertAction({
        text: t("file_uploaded"),
        severity: "success",
      }),
    );
    return true;
  };
};

export const checkFileParsingStateThunk = (searchId: number) => {
  return {
    types: actionTypes.CHECK_PARSING_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`${SEARCH_URL_EXTENDED}${searchId}/BOM/?search_type=bom`)
        .then((res) => res.data)
        .catch((error) => {
          console.log("***CHECK_PARSING_ERROR", error);
          throw error;
        }),
  };
};

export const checkFileParsingState = (searchId: number, bomId: number) => {
  return (dispatch: any) => {
    dispatch(checkFileParsingStateThunk(searchId))
      .then((response: any) => {
        switch (response.status) {
          case "ERROR": {
            dispatch(setUploadState({ uploading: false, error: t("error_file_upload_backend"), selected: false }));
            break;
          }
          case "PENDING" || "null" || "": {
            setTimeout(() => dispatch(checkFileParsingState(searchId, bomId)), 1000);
            break;
          }
          default: {
            dispatch(setUploadState({ uploading: false, error: "", selected: false }));
            dispatch(push(bomId ? `/bom/${bomId}` : `/bom/bom-list`));
            dispatch(
              showBottomLeftMessageAlertAction({
                text: t("file_uploaded"),
                severity: "success",
              }),
            );
          }
        }
      })
      .catch(() => {
        dispatch(setUploadState({ uploading: false, error: t("error_file_upload_backend"), selected: false }));
      });
  };
};

export const setUploadState = (fields: { uploading: boolean; error: string; selected: boolean }) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const uploadState = { ...getState().bom.upload, ...fields };
    dispatch({
      type: actionTypes.SET_UPLOAD_STATE,
      payload: uploadState,
    });
  };
};

export const loadBomLineSearchThunk = (key: string, query: string, defaultValue = 1) => {
  return (dispatch: any, getState: () => RootState) => {
    console.log("QUERY", query);
    if (query === null || query === "") {
      // eslint-disable-next-line no-undef
      dispatch(loadBomListFinish());
      console.log("EMPTY SEARCH. EXITING ..", query);
      return false;
    }

    dispatch(setExtendedSearchFinished());
    dispatch(startLoadingBomLineSearch());

    const page = 1;
    const pageSize = 25;
    const filters = { search: query, base_num_in_stock: defaultValue, sim: "bom", search_type: "bom" };

    return dispatch(sendFiltersValueAction({ page, page_size: pageSize, ...filters }, null))
      .then((response: any) => {
        if (response.search_id && getState().auth.token !== null) {
          dispatch(setExtendedSearchFinished());
          dispatch({
            type: actionSearchTypes.SET_EXTENDED_SEARCH_ID,
            payload: { id: response.search_id, params: { key } },
          });
        }
        dispatch(saveCashModalProducts(key, response.results));
        dispatch(stopLoadingBomLineSearch());
      })
      .catch((e: any) => {
        if (!e || e.message !== "request_cancelled") {
          dispatch(loadBomListFinish());
          dispatch(saveCashModalProducts(key, [], null, true));
          dispatch(stopLoadingBomLineSearch());
        }
      });
  };
};

export const beforeBomLineSearch = (key: string, query: string) => {
  return (dispatch: Dispatch<any>) => {
    console.log("QUERY", query);
    if (query === null || query === "") {
      // eslint-disable-next-line no-undef
      dispatch(loadBomListFinish());
      console.log("EMPTY SEARCH. EXITING ..", query);
      return false;
    }

    dispatch(setExtendedSearchFinished());
    dispatch(startLoadingBomLineSearch());
    return false;
  };
};

export const socketBomLineSearch = (data: any, key: string) => {
  return (dispatch: Dispatch<any>) => {
    const { status, search_id } = data;
    switch (status) {
      case "PENDING":
        dispatch({
          type: actionSearchTypes.SET_EXTENDED_SEARCH_STARTED,
          payload: search_id,
        });
        break;
      case "DONE":
        dispatch({
          type: actionSearchTypes.SET_EXTENDED_SEARCH_FINISHED,
          payload: search_id,
        });
        break;
      default:
        dispatch({
          type: actionSearchTypes.SET_EXTENDED_SEARCH_FINISHED,
          payload: search_id,
        });
    }

    dispatch(saveCashModalProducts(key, data));
  };
};

export const startLoadingBomLineSearch = () => {
  return {
    type: actionTypes.START_BOM_LINE_SEARCH,
  };
};

export const stopLoadingBomLineSearch = () => {
  return {
    type: actionTypes.STOP_BOM_LINE_SEARCH,
  };
};

// bom prices
export const loadBomLinePricesThunk = (key: string, productId: number, productUpc: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(startBomLinePricesLoading([{ key }]));
    return dispatch({
      types: actionTypes.GET_BOM_LINE_PRICES_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL}?page_size=100&search=${productUpc}`, {
            cancelId: `bom_search_byparams_${key}`,
            noapi: true,
          })
          .then((res) => res.data)
          .then((response: any) => {
            dispatch(saveBomLinePrices(response, { productId, key }, !response.search_id));

            if (response.search_id) {
              dispatch(pollingBomLinePrices(response.search_id, { productId, key }, productUpc));
            }
          })
          .catch((error) => {
            console.log("***LINE_PRICES_ERROR", error);
            throw error;
          }),
    });
  };
};

export const socketBomLinePricesSearch = (data: any, lines: any, mode = "") => {
  return (dispatch: Dispatch<any>) => {
    const { status } = data;
    const linesForUpdate = lines.filter((val: any) => data.results.find((item: any) => item.id === val.productId));
    console.log(lines, linesForUpdate);
    linesForUpdate.forEach((val: any) =>
      dispatch(saveBomLinePrices(data, { productId: val.productId, key: val.key, mode }, status === "DONE")),
    );
  };
};

const pollingBomLinePrices = (search_id: any, { productId, key }: any, search: string = null) => {
  return (dispatch: Dispatch<any>) => {
    let params = "?page_size=100&page=1";
    if (search) {
      params += `&search=${search}`;
    }

    dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL_EXTENDED}${search_id}/${params}`, {
            noapi: true,
          })
          .then((res) => res.data)
          .then((response: any) => {
            if (response.status && response.status === "PENDING") {
              setTimeout(() => {
                dispatch(pollingBomLinePrices(search_id, { productId, key }, search));
              }, 2000);
            } else if (response.status && response.status === "DONE") {
              dispatch(saveBomLinePrices(response, { productId, key }, true));
            } else if (response.error) {
              dispatch(finishBomLinePricesLoading(key));
            } else {
              dispatch(finishBomLinePricesLoading(key));
              console.log("***BOM_UPDATE_PRODUCT_ERROR", response);
              throw new Error(`BOM_UPDATE_PRODUCT_ERROR productId:${productId}, key:${key}`);
            }
          })
          .catch((error) => {
            console.log("SEARCH_RESULT_ERROR", error);
            throw error;
          }),
    });
  };
};

export const saveBomLinePrices = (response: any, params: any, isDone: boolean) => {
  const { productId, key } = params;
  const product = response.results.find((val: any) => val.id === productId);
  if (product && !!product.stockrecords.length) {
    product.stockrecords.map((stockrecord: any) => {
      return stockrecord?.prices.map((price: any) => {
        const item = { ...price };
        item.partner_name = stockrecord.partner_name;
        item.partner_id = stockrecord.id;
        item.moq = stockrecord.moq;
        item.mpq = stockrecord.mpq;
        return item;
      });
    });
  }

  return (dispatch: Dispatch<any>) => {
    dispatch(saveBomLineStockrecords(key, product ? product.stockrecords : []));
    if (isDone) dispatch(finishBomLinePricesLoading(key));
  };
};

export const startBomLinePricesLoading = (lines: any) => {
  return (dispatch: Dispatch<any>) => {
    lines.forEach((val: any) => {
      dispatch({
        type: actionTypes.START_BOM_LINE_STOCKRECORDS_LOADING,
        payload: {
          key: val.key,
        },
      });
    });
    return true;
  };
};

export const setBomLinePricesCount = (count: number) => {
  return {
    type: actionTypes.SET_BOM_LINE_STOCKRECORDS_COUNT,
    payload: count,
  };
};

export const finishBomLinePricesLoading = (key: string) => {
  return {
    type: actionTypes.FINISH_BOM_LINE_STOCKRECORDS_LOADING,
    payload: {
      key,
    },
  };
};

export const saveBomLineStockrecords = (key: string, items: any) => {
  return {
    type: actionTypes.SAVE_BOM_LINE_STOCKRECORDS,
    payload: {
      key,
      items,
    },
  };
};

// bom create
export const createEmptyBomThunk = (name: string) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.CREATE_BOM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/boms/`, {
            data: {
              name,
            },
          })
          .then((res) => res.data)
          .catch((error) => {
            console.log("***CREATE_BOM_ERROR", error);
            throw error;
          }),
    });
  };
};

export const createBomThunk = () => {
  return (dispatch: any, getState: () => RootState) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    const bom = getState().bom.bomItem;
    const name = bom.name || `Untitled_${getCurrentTime()}`;

    dispatch(saveBomCreate({ error: "" }));

    return dispatch(createEmptyBomThunk(name))
      .then((response: any) => {
        const bomId = response.id;
        const promises: any[] = [];

        Object.keys(bom.items).map((key) => {
          if (bom.items[key].part_number) {
            promises.push(dispatch(createBomLineThunk(bomId, { ...bomLineFields, ...bom.items[key], rowKey: key })));
          }
          return key;
        });

        Promise.all(promises)
          .then(() => {
            dispatch(saveBomCreate({ saved: true }));
          })
          .catch((error) => {
            console.log("CREATE_BOM_ERROR", error);
            dispatch(saveBomCreate({ error: t("error") }));
          });

        return bomId;
      })
      .catch(() => {
        dispatch(saveBomCreate({ error: t("error") }));
      });
  };
};

export const createBomLineThunk = (bomId: number, lineData: any) => {
  const product = typeof lineData.product === "object" ? lineData.product.id || "" : lineData.product;
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.CREATE_BOM_LINE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/boms/${bomId}/lines/`, { data: { ...lineData, product } })
          .then((res: any) => ({ ...res.data, rowKey: lineData.rowKey }))
          .catch((e) => {
            console.log("***CREATE_NEW_BOM_LINE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const addProductToBom = (bomId: number, product: any, fields = {}) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch(
      createBomLineThunk(bomId, {
        ...bomLineFields,
        part_number: product.upc || "",
        product: product.id || "",
        product_title: `${product.manufacturer ? product.manufacturer.name : "" || ""} ${product.upc}` || "",
        selected_product: product.id || t("select_product"),
        description: product.description || "",
        ...fields,
      }),
    );
  };
};

export const createNewBom = (): actionTypes.CreateNewBom => {
  return {
    type: actionTypes.CREATE_NEW_BOM,
  };
};

export const removeBomCreateItems = (itemsKeys: string[]) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const bomCreate = { ...getState().bom.bomItem };
    const items = { ...bomCreate.items };
    itemsKeys.map((key: any) => {
      delete items[key];
      return key;
    });
    bomCreate.items = items;
    dispatch(saveBomCreate(bomCreate));
  };
};

export const saveBomCreate = (bomFields: any) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const bom = { ...getState().bom.bomItem, ...bomFields };
    dispatch({
      type: actionTypes.SAVE_BOM_CREATE,
      payload: bom,
    });
  };
};

// edit bom
export const getBomEditThunk = (bomId: number, page = 1, pageSize = 25, orderBy = "id", type = "all") => {
  return (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    dispatch(clearBomEdit());
    dispatch(saveBomEdit({ loading: true }));

    dispatch({
      types: actionTypes.GET_BOM_DATA_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/boms/${bomId}/`)
          .then((res) => res.data)
          .then((response: any) => {
            dispatch(
              saveBomEdit({
                ...response,
                data: response,
                name: response.name,
                id: response.id,
                cost: response.cost || 0,
              }),
            );
            dispatch(getBomLinesThunk(bomId, page, pageSize, orderBy, type));
          })
          .catch((error) => {
            console.log("EDIT_BOM_ERROR", error);
            dispatch(saveBomEdit({ loading: false }));
            throw error;
          }),
    });
    return true;
  };
};

export const addToCartAllBomItems = (bomId: number, page = 1, pageSize = 25, orderBy = "id", type = "all") => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/boms/${bomId}/lines/?page=${page}&page_size=${pageSize}&order_by=${orderBy}&type=${type}`)
          .then((res) => res.data)
          .catch((error) => {
            console.log("***ADD_TO_CART_ERROR", error);
            throw error;
          }),
    });
  };
};

export const loadBomLinesThunk = (bomId: number, page = 1, pageSize = 25, orderBy = "id", type = "all") => {
  let pageNumber = page;
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.GET_BOM_LINES_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/boms/${bomId}/lines/?page=${pageNumber}&page_size=${pageSize}&order_by=${orderBy}&type=${type}`)
          .catch((error) => {
            console.log("***GET_BOM_LINES_ERROR", error);
            throw error;
          })
          .then((res) => res.data)
          .then((res: any) => {
            if (pageNumber > res.total_pages) {
              dispatch(saveBomEdit({ loading: true }));
              pageNumber = res.total_pages;
              return client
                .get(`/boms/${bomId}/lines/?page=${pageNumber}&page_size=${pageSize}&order_by=${orderBy}&type=${type}`)
                .then((response) => response.data);
            }
            return res;
          })
          // add last group
          .then((res) => {
            if (orderBy.includes(filterKeyForGroup) && res.page < res.total_pages && res.results.length) {
              const lastGroupPartnumberRef = [...res.results].pop().part_number_ref;
              return client
                .get(
                  `/boms/${bomId}/lines/?order_by=${orderBy}&type=${type}&part_number_ref=${encodeURIComponent(
                    lastGroupPartnumberRef,
                  )}`,
                )
                .then((resLast) => resLast.data)
                .then((resLast: any) => ({
                  ...res,
                  results: [
                    ...res.results.filter((v: any) => v.part_number_ref !== lastGroupPartnumberRef),
                    ...resLast.results,
                  ],
                }));
            }
            return res;
          })
          // add first group
          .then((res: any) => {
            if (orderBy.includes(filterKeyForGroup) && res.page > 1 && !!res.results.length) {
              const firstGroupPartnumberRef = res.page > 1 ? res.results[0].part_number_ref : null;
              return client
                .get(
                  `/boms/${bomId}/lines/?order_by=${orderBy}&type=${type}&part_number_ref=${encodeURIComponent(
                    firstGroupPartnumberRef,
                  )}`,
                )
                .then((resFirst) => resFirst.data)
                .then((resFirst: any) => ({
                  ...res,
                  results: [
                    ...resFirst.results,
                    ...res.results.filter((v: any) => v.part_number_ref !== firstGroupPartnumberRef),
                  ],
                }));
            }
            dispatch(saveBomEdit({ loading: false }));
            return res;
          }),
    });
  };
};

export const getBomLinesThunk = (bomId: number, page = 1, pageSize = 25, orderBy = "id_asc", type = "all") => {
  return (dispatch: any) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    return dispatch(loadBomLinesThunk(bomId, page, pageSize, orderBy, type))
      .then((response: any) => {
        dispatch(
          saveBomEdit({
            total_pages: response.total_pages,
            count: response.count,
          }),
        );
        dispatch(setBomEditLines(response, null, bomId)).then(() => {
          if (page < response.total_pages) {
            dispatch(loadBomLinesThunk(bomId, page + 1, pageSize, orderBy, type));
          }
        });
        return response;
      })
      .catch((error: any) => {
        dispatch(saveBomEdit({ loading: false }));
        console.log("***GET_BOM_LINES_ERROR", error);
        throw error;
      });
  };
};

export const saveBomNameThunk = (id: number, name: string) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [null, null, null],
    promise: (client: ApiClientInterface) =>
      client.patch(`/boms/${id}/`, {
        data: {
          name,
        },
      }),
  });
};

export const editBomThunk = (
  bomData: any,
  // page = 1, pageSize = 25, orderBy = "id"
) => {
  return (dispatch: any, getState: () => RootState) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    dispatch(saveBomEdit({ saved: false, error: "", saving: true }));

    const bom = { ...(bomData || getState().bom.bomItem) };

    return dispatch({
      types: actionTypes.EDIT_BOM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/boms/${bom.id}/`, {
            data: {
              name: bom.name,
            },
          })
          .then((res) => res.data)
          .then((response) => {
            const promises: any[] = [];
            const items = { ...bom.items };

            bom.rowsForDelete.map((key: any) => {
              const item = bom.items[key];
              if (item && item.id) {
                promises.push(
                  dispatch(removeBomEditLineThunk(bom.id, item.id))
                    .then((res: any) => {
                      delete items[key];
                      return res;
                    })
                    .catch((error: any) => {
                      return error;
                    }),
                );
              } else {
                delete items[key];
              }
              return key;
            });

            Object.keys(bom.items).map((key) => {
              const item = bom.items[key];
              if (!item.part_number) {
                if (item.id) {
                  promises.push(
                    dispatch(removeBomEditLineThunk(bom.id, item.id))
                      .then((res: any) => {
                        delete items[key];
                        return res;
                      })
                      .catch((error: any) => {
                        return error;
                      }),
                  );
                } else {
                  delete items[key];
                }
              }
              return key;
            });

            if (promises.length) {
              return Promise.all(promises)
                .then(() => {
                  bom.items = items;
                  bom.rowsForDelete = [];

                  // dispatch(saveBomEdit(bom));
                  // dispatch(updateBomLinesThunk(bom, response));

                  // dispatch(updateBomLinesThunk(bom, response)).then(() => {
                  //   dispatch(getBomLinesThunk(bom.id, page, pageSize, orderBy));
                  // });
                })
                .catch((error) => {
                  console.log("EDIT_BOM_ERROR", error);
                  dispatch(saveBomEdit({ error: t("error"), saving: false }));
                  throw error;
                });
            }

            bom.items = items;
            bom.rowsForDelete = [];
            // dispatch(saveBomEdit(bom));
            return dispatch(updateBomLinesThunk(bom, response)).then(() => {
              // dispatch(getBomLinesThunk(bom.id, page, pageSize, orderBy));
            });
          })
          .catch((error) => {
            console.log("EDIT_BOM_ERROR 2", error);
            dispatch(saveBomEdit({ error: t("error"), saving: false }));
            throw error;
          }),
    });
  };
};

export const simpleUpdateProducts = (bom: any) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .patch(`/boms/${bom.id}/`, {
          data: {
            name: bom.name,
          },
        })
        .then((response) => {
          dispatch(updateBomLinesThunk(bom, response.data));
        })
        .catch((error) => {
          console.log("UPDATE_PRODUCTS_ERROR", error);
          throw error;
        }),
  });
};

export const updateBomLinesThunk = (bom: any, response: any) => {
  return (dispatch: Dispatch<any>) => {
    const itemsKeys = [];
    const bomId = response.id;
    const cost = Object.keys(bom.items).length ? response.cost || 0 : 0;
    const promises: any[] = [];

    Object.keys(bom.items).map((key) => {
      console.log({ key });
      itemsKeys.push(key);
      if (bom.items[key].id) {
        promises.push(
          dispatch(
            updateBomLineThunk(bomId, {
              ...bom.items[key],
              product: bom.items[key].product.id || parseInt(bom.items[key].product) || null,
            }),
          ),
        );
      }
      // else {
      //   console.log("test", bom.items[key]);
      //   promises.push(
      //     dispatch(
      //       createBomLineThunk(bomId, {
      //         ...bomLineFields,
      //         ...bom.items[key],
      //         rowKey: key,
      //         product: bom.items[key].product.id || bom.items[key].product,
      //       }),
      //     ),
      //   );
      // }
      return key;
    });

    return Promise.all(promises)
      .then((res) => {
        const bomCost = res[res.length - 1] ? res[res.length - 1].bom_cost || 0 : cost;
        // dispatch(setBomEditLines(res, itemsKeys, bomId));
        dispatch(
          saveBomEdit({
            cost: bomCost,
            saved: true,
            saving: false,
          }),
        );
      })
      .catch((error) => {
        console.log("EDIT_BOM_ERROR", error);
        dispatch(saveBomEdit({ error: t("error"), saving: false }));
        throw error;
      });
  };
};

export const clearBomEdit = (): actionTypes.ClearBomEdit => {
  return {
    type: actionTypes.CLEAR_BOM_EDIT,
  };
};

export const setBomEditLines = (response: any, itemsKeys: any, bomId: number) => {
  return (dispatch: Dispatch<any>) => {
    const items: any = {};
    let groupsItems: any[] = [];
    const loadedGroupsItems: any[] = [];
    const promises: any[] = [];

    if (Array.isArray(response)) {
      response.map((item, index) => {
        items[itemsKeys ? itemsKeys[index] : getUniqueId()] = { ...item };
        groupsItems = uniqueFromTwoArrays(groupsItems, item.part_number_count);
        loadedGroupsItems.push(item.id);
        return item;
      });
    } else {
      response.results.map((item: any, index: number) => {
        items[itemsKeys ? itemsKeys[index] : getUniqueId()] = { ...item };
        groupsItems = uniqueFromTwoArrays(groupsItems, item.part_number_count);
        loadedGroupsItems.push(item.id);
        return item;
      });
    }

    groupsItems = groupsItems.filter((item) => loadedGroupsItems.indexOf(item) === -1);

    groupsItems.map((item) => {
      promises.push(
        dispatch({
          types: actionTypes.GET_BOM_LINE_ARRAY,
          promise: (client: ApiClientInterface) =>
            client
              .get(`/boms/${bomId}/lines/${item}/`)
              .then((res) => res.data)
              .catch((error) => {
                console.log("***GET_BOM_LINE_ERROR", error);
                throw error;
              }),
        }),
      );
      return item;
    });

    return Promise.all(promises)
      .then((res) => {
        const itemsCount = Object.keys(items).length;

        res.map((item, index) => {
          items[itemsKeys ? itemsKeys[itemsCount + index] : getUniqueId()] = {
            ...item,
            additional: true,
          };
          return item;
        });

        Object.keys(items).forEach((key) => {
          items[key].product_title = `${
            items[key].product.manufacturer ? items[key].product.manufacturer.name : "" || ""
          } ${items[key].product.upc}`;

          // TODO discpatch loop
          dispatch(saveBomLineStockrecords(key, items[key].product.stockrecords));
        });

        dispatch(saveAllBomPages(items));
        dispatch(saveBomEdit({ loading: false }));
      })
      .catch(() => {
        dispatch(saveAllBomPages(items));
        dispatch(saveBomEdit({ loading: false }));
      });
  };
};

export const saveBomEdit = (bomFields: BomFields) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const bom = { ...getState().bom.bomItem, ...bomFields };
    dispatch({
      type: actionTypes.SAVE_BOM_EDIT,
      payload: bom,
    });
  };
};

export const updateFrontItem = (itemKey: string, data: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.UPDATE_ITEM_DATA_AFTER_CREATE,
      payload: { itemKey, data },
    });
  };
};

export const addBomItem = (id: string, templateItemKey: any = null, mode = "") => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const bom = mode === "edit" ? { ...getState().bom.bomItem } : { ...getState().bom.bomItem };

    let template: any = {};
    let stockrecords: any = {};

    if (templateItemKey !== null) {
      template = { ...bom.items[templateItemKey] };
      delete template.id;

      stockrecords = { ...bom.stockrecords[templateItemKey] };
    }

    bom.items = {
      ...bom.items,
      [id]: {
        ...bomLineFields,
        ...template,
      },
    };

    bom.stockrecords = {
      ...bom.stockrecords,
      [id]: {
        ...stockrecords,
      },
    };

    if (mode === "edit") {
      dispatch(saveBomEdit(bom));
    } else {
      dispatch(saveBomCreate(bom));
    }
  };
};

export const setBomEditRowsForDelete = (itemsKeys: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.SET_EDIT_ROWS_FOR_DELETE,
      payload: itemsKeys,
    });
  };
};

export const removeBomEditItems = (itemsKeys: any) => {
  return (dispatch: any, getState: () => RootState) => {
    const bomEdit = { ...getState().bom.bomItem };
    const items = { ...bomEdit.items };
    const promises: any[] = [];

    itemsKeys.map((key: any) => {
      const item = bomEdit.items[key];
      if (item.id) {
        promises.push(
          dispatch(removeBomEditLineThunk(bomEdit.id, item.id))
            .then((response: any) => {
              delete items[key];
              return response;
            })
            .catch((error: any) => {
              return error;
            }),
        );
      } else {
        delete items[key];
      }
      return key;
    });

    if (promises.length) {
      Promise.all(promises).then(() => {
        bomEdit.items = items;
        dispatch(saveBomEdit(bomEdit));
      });
    } else {
      bomEdit.items = items;
      dispatch(saveBomEdit(bomEdit));
    }
  };
};

export const removeBomEditLineThunk = (bomId: number, lineId: number | string) => {
  return (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
      throw new Error("Error");
    }

    return dispatch({
      types: actionTypes.DELETE_BOM_LINE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .delete(`/boms/${bomId}/lines/${lineId}/`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***DELETE_BOM_LINE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const updateBomLineThunk = (bomId: number, lineData: any) => {
  console.log("PATCH_BOM_LINE", bomId, lineData);
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.UPDATE_BOM_LINE_ARRAY,
      // types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/boms/${bomId}/lines/${lineData.id}/`, {
            data: lineData,
          })
          .then((res: any) => ({ ...res.data, rowKey: lineData.rowKey }))
          .catch((e) => {
            console.log("***UPDATE_BOM_LINE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const exportBomThunk = (bomId: number, exportType: "csv" | "xls", orderBy = "id_asc") => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/boms/${bomId}/export/${exportType}/?order_by=${orderBy}`, {
            config: { responseType: "blob" },
          })
          .then((response) => {
            FileDownload(response.data, `bom_${bomId}.${exportType}`);
          })
          .catch((e) => {
            console.log("***EXPOT_ERROR", e);
            throw e;
          }),
    });
  };
};

export const createBomWithLinesThunk = (
  product: actionTypes.Product,
  fields: { stockrecord: Stockrecord; part_number_ref: string }[] = [],
) => {
  return (dispatch: any) => {
    return dispatch(createBomThunk()).then((bomId: number) => {
      dispatch(loadBomListThunk(1));
      fields.forEach((v) => {
        dispatch(addProductToBom(bomId, product, v)).then((response: any) => {
          console.log("CREATE_BOM_RESPONSE", response);
          return bomId;
        });
      });
      return bomId;
    });
  };
};

export const saveBomOrder = (bomId: number, orderData: any) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const bomList = { ...getState().bom.bomList };
    if (bomList.results) {
      bomList.results = bomList.results.map((item: any) => {
        if (item.id === bomId) {
          return {
            ...item,
            order: orderData,
          };
        }
        return item;
      });
    }
    dispatch(saveBomList(bomList));
  };
};

export const getRfqRowCount = (partNumber: string) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/rfqs/available/?search=${encodeURIComponent(partNumber)}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***GET_BOM_RFQ_ROW_COUNT_ERROR", e);
            throw e;
          }),
    });
  };
};

export const readonlyBom = (id: number, status: any) => {
  return (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }
    const RNLY = status ? 1 : 0;
    return dispatch({
      types: actionTypes.EDIT_BOM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/boms/${id}/readonly/${RNLY}/`, {})
          .then((res) => res.data)
          .then((response: any) => {
            return dispatch(
              saveBomEdit({
                ...response,
                data: response,
                name: response.name,
                id: response.id,
                cost: response.cost || 0,
              }),
            );
          })
          .catch((error) => {
            console.log("***READONLY_BOM_ERROR", error);
            throw error;
          }),
    });
  };
};

// create bom copy
export const startCreateBomCopy = (): actionTypes.StartCreateBomCopy => {
  return {
    type: actionTypes.BOM_COPYING_START,
  };
};

export const finishCreateBomCopy = (id: number): actionTypes.BomCopingFinish => {
  return {
    type: actionTypes.BOM_COPYING_FINISH,
    payload: id,
  };
};

export const setCreateBomCopyError = (): actionTypes.SetCreateBomCopyError => {
  return {
    type: actionTypes.BOM_COPYING_ERROR,
  };
};

export const resetCreateBomCopy = (): actionTypes.ResetCreateBomCopy => {
  return {
    type: actionTypes.BOM_COPY_RESET,
  };
};

export const createBomCopy = (id: number, name: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(startCreateBomCopy());

    return dispatch({
      types: actionTypes.BOM_CREATE_COPY_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/boms/${id}/copy/`, { data: { name: `${name}-copy` } })
          .then((res) => res.data)
          .then((response) => {
            const bomId = response?.id;
            if (response?.task_id && bomId) {
              dispatch(checkCopyParsingState(response.task_id, bomId));
              return true;
            }
            dispatch(setCreateBomCopyError());
            return false;
          })
          .catch((e) => {
            dispatch(setCreateBomCopyError());
            console.log("***BOM_CREATE_COPY_ERROR", e);
            throw e;
          }),
    });
  };
};

export const checkCopyParsingState = (taskId: number, bomId: number) => {
  return (dispatch: any) => {
    dispatch(checkFileParsingStateThunk(taskId))
      .then((response: any) => {
        switch (response.status) {
          case "ERROR": {
            dispatch(setCreateBomCopyError());
            break;
          }
          case "PENDING" || "null" || "": {
            setTimeout(() => dispatch(checkCopyParsingState(taskId, bomId)), 1000);
            break;
          }
          default: {
            dispatch(finishCreateBomCopy(bomId));
            dispatch(push(`/bom/${bomId}`));
          }
        }
      })
      .catch((e: any) => {
        dispatch(setCreateBomCopyError());
        console.log("***BOM_CREATE_COPY_ERROR", e);
        throw e;
      });
  };
};

// merge
export const enableBomMerge = (): actionTypes.EnableBomMerge => {
  return {
    type: actionTypes.ENABLE_BOM_MERGE,
  };
};

export const disableBomMerge = (): actionTypes.DisableBomMerge => {
  return {
    type: actionTypes.DISABLE_BOM_MERGE,
  };
};

export const toggleMergeBom = (lines: number[]): actionTypes.ToggleMergeBom => {
  return {
    type: actionTypes.TOGGLE_MERGE_BOM,
    payload: lines,
  };
};

/**
 * key - group partNumberRef
 * products - response search results
 * rfqData - if group row status is RFQ
 * isFailRequest - if response status > 400 (for stop suggestions preloader)
 */
export const saveCashModalProducts = (
  key: string,
  products: PProduct[] = [],
  rfqData: GroupRfqData = null,
  isFailRequest = false,
): actionTypes.SaveCashModalProducts => {
  const itemsList: PProduct[] = [];
  products.forEach((item) => {
    const product = { ...item };
    product.stockrecords = product.stockrecords.filter((sr: any) => isProductAvailable(sr));
    if (product.stockrecords.length) {
      itemsList.push(product);
    }
  });

  return {
    type: actionTypes.CASH_MODAL_PRODUCTS,
    payload: { products: itemsList, key, rfqData, isFailRequest },
  };
};

export const clearCashModalProducts = (): actionTypes.ClearCashModalProducts => {
  return {
    type: actionTypes.CLEAR_CASH_MODAL_PRODUCTS,
  };
};

export const setMergeItemMultiplier = (itemId: number, multiplier: number): actionTypes.SetMergeBomMultiplier => {
  return {
    type: actionTypes.SET_MERGE_BOM_MULTIPLIER,
    payload: {
      id: itemId,
      multiplier,
    },
  };
};

export const startLoadingMergeItems = (): actionTypes.StartLoadingMergeItems => {
  return {
    type: actionTypes.START_LOADING_MERGE_ITEMS,
  };
};

export const finishLoadingMergeItems = (): actionTypes.FinishLoadingMergeItems => {
  return {
    type: actionTypes.FINISH_LOADING_MERGE_ITEMS,
  };
};

export const saveMergeData = (mergeData: any): actionTypes.SaveMergeBomData => {
  return {
    type: actionTypes.SAVE_MERGE_DATA,
    payload: mergeData,
  };
};

export const saveMergeBomSavingData = (fields: any): actionTypes.SaveMergeBomSavingData => {
  return {
    type: actionTypes.SAVE_MERGE_BOM_SAVING_DATA,
    payload: fields,
  };
};

export const mergeLines = (method = "skip", forAll = false) => {
  // eslint-disable-next-line consistent-return
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const mergeData = { ...getState().bom.mergeData };
    const processedLines = [...mergeData.processedLines];
    const rawLines = [...mergeData.rawLines];
    const groups: any[] = [];
    const conflict: any = { original: null, duplicate: null };

    while (rawLines.length) {
      let isDuplicate = false;

      for (let i = 0; i < processedLines.length; i += 1) {
        isDuplicate = isBomLinesEqual(rawLines[0], processedLines[i]);

        if (isDuplicate) {
          conflict.original = i;
          conflict.duplicate = 0;

          if (!forAll) {
            return dispatch(
              saveMergeData({
                processedLines,
                rawLines,
                conflict,
                groups,
                canSave: false,
              }),
            );
          }
          switch (method) {
            case "skip":
              rawLines.splice(0, 1);
              break;
            case "replace":
              processedLines[conflict.original] = { ...rawLines[0] };
              rawLines.splice(0, 1);
              break;
            case "join":
              processedLines[conflict.original] = {
                ...processedLines[conflict.original],
              };
              processedLines[conflict.original].quantity += rawLines[0].quantity;
              rawLines.splice(0, 1);
              break;
            default:
              break;
          }

          conflict.original = null;
          conflict.duplicate = null;

          break;
        }
      }

      if (!isDuplicate) {
        processedLines.push(rawLines[0]);
        rawLines.splice(0, 1);
      }
    }

    dispatch(
      saveMergeData({
        processedLines,
        rawLines,
        conflict,
        groups,
        canSave: false,
      }),
    );
    dispatch(setMergeBomGroups());
  };
};

export const resolveMergeLinesConflict = (method = "skip", forAll = false) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const mergeData = { ...getState().bom.mergeData };
    const processedLines = [...mergeData.processedLines];
    const rawLines = [...mergeData.rawLines];

    switch (method) {
      case "skip":
        rawLines.splice(0, 1);
        break;
      case "replace":
        processedLines[mergeData.conflict.original] = { ...rawLines[0] };
        rawLines.splice(0, 1);
        break;
      case "join":
        processedLines[mergeData.conflict.original] = {
          ...processedLines[mergeData.conflict.original],
        };
        processedLines[mergeData.conflict.original].quantity += rawLines[0].quantity;
        rawLines.splice(0, 1);
        break;
      default:
        break;
    }

    mergeData.processedLines = processedLines;
    mergeData.rawLines = rawLines;
    mergeData.conflict = { original: null, duplicate: null };
    mergeData.canSave = !rawLines.length;
    dispatch(saveMergeData(mergeData));
    dispatch(mergeLines(method, forAll));
  };
};

export const setMergeBomGroups = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const mergeData = { ...getState().bom.mergeData };
    const items = mergeData.processedLines;
    let groups = [];

    for (let i = 0; i < items.length; i += 1) {
      let isInGroup = false;
      groups.map((group) => {
        const item = { ...group };
        if (group.product === items[i].product) {
          isInGroup = true;
          item.items = uniqueFromTwoArrays(item.items, [i]);
          item.partNumbers = uniqueFromTwoArrays(item.partNumbers, [items[i].part_number]);
        } else if (item.items.includes(i)) {
          isInGroup = true;
        }
        return item;
      });

      if (!isInGroup) {
        groups.push({
          items: [i],
          partNumbers: [items[i].part_number],
          partNumber: items[i].part_number,
          product: items[i].product,
        });
      }
    }

    groups = groups.filter((group) => group.items.length > 1);
    mergeData.groups = groups;

    if (!groups.length) {
      mergeData.canSave = true;
    }

    dispatch(saveMergeData(mergeData));
  };
};

export const resolveMergeBomGroups = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const mergeData = { ...getState().bom.mergeData };
    const processedLines = [...mergeData.processedLines];
    const stockrecordsToCheck: any[] = [];

    mergeData.groups.map((group: any) => {
      return group.items.map((itemIndex: any) => {
        const stockrecordExists = stockrecordsToCheck.filter(
          (line) => line.stockrecord === processedLines[itemIndex].stockrecord,
        );
        if (stockrecordExists.length > 0) {
          //* ** BOM LINE MERGE_STOCKRECORD ***
          const quantity =
            (processedLines[stockrecordExists[0].refid].quantity || 0) + (processedLines[itemIndex].quantity || 0);
          // console.log("GROUP_ITEM_STREC_OLD", stockrecordExists[0].refid, processedLines[stockrecordExists[0].refid], "NEW", processedLines[itemIndex], "QUANTITY", quantity );
          processedLines[stockrecordExists[0].refid].quantity = quantity;
          delete processedLines[itemIndex];
        } else {
          stockrecordsToCheck.push({
            ...processedLines[itemIndex],
            refid: itemIndex,
          });
          processedLines[itemIndex] = {
            ...processedLines[itemIndex],
            part_number: group.partNumber,
          };
        }
        return itemIndex;
      });
    });

    mergeData.canSave = true;
    mergeData.groups = [];
    mergeData.processedLines = processedLines;

    dispatch(saveMergeData(mergeData));
  };
};

export const isBomLinesEqual = (line1: any, line2: any) => {
  if (
    line1.part_number === line2.part_number &&
    line1.product === line2.product &&
    line1.stockrecord === line2.stockrecord
  ) {
    return true;
  }
  return false;
};

export const loadMergeItemsThunk = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(startLoadingMergeItems());

    const { mergeItems } = getState().bom;
    const promises: any[] = [];
    const multipliers: any[] = [];

    Object.keys(mergeItems).map((key) => {
      if (mergeItems[key].checked) {
        promises.push(dispatch(loadAllBomItemsThunk(key)));
        multipliers.push(parseInt(mergeItems[key].multiplier) || 1);
      }
      return true;
    });

    Promise.all(promises)
      .then((response) => {
        dispatch(finishLoadingMergeItems());

        const mergeData = { ...getState().bom.mergeData };
        let rawLines: any[] = [];

        if (response.length > 1) {
          for (let i = 1; i < response.length; i += 1) {
            const newLinesArray = [];
            for (let j = 0; j < response[i].length; j += 1) {
              const newLine = { ...response[i][j], quantity: response[i][j].quantity * multipliers[i] };
              newLinesArray.push(newLine);
            }

            rawLines = [...rawLines, ...newLinesArray];
          }
        }

        const lines: any[] = [];
        response[0].map((item: any) => {
          const newLine = { ...item, quantity: item.quantity * multipliers[0] };
          return lines.push(newLine);
        });

        mergeData.processedLines = lines;
        mergeData.rawLines = rawLines;
        dispatch(saveMergeData(mergeData));
        dispatch(mergeLines());
      })
      .catch(() => {
        dispatch(finishLoadingMergeItems());
      });
  };
};

export const loadAllBomItemsThunk = (bomId: any) => {
  return (dispatch: any) => {
    return dispatch(loadBomLinesThunk(bomId, 1, 100, "id"))
      .then((response: any) => {
        let items = [...response.results];
        if (response.total_pages > 1) {
          let page = 2;
          const promises = [];

          while (page <= response.total_pages) {
            promises.push(dispatch(loadBomLinesThunk(bomId, page, 100, "id")));
            page += 1;
          }

          return Promise.all(promises)
            .then((res) => {
              res.map((responseItem) => {
                items = [...items, ...responseItem.results];
                return responseItem;
              });
              return items;
            })
            .catch((error) => {
              return error;
            });
        }
        return items;
      })
      .catch((error: any) => {
        return error;
      });
  };
};

export const createMergeBomThunk = (name: any) => {
  return (dispatch: any, getState: () => RootState) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    dispatch(saveMergeBomSavingData({ saving: true, error: false }));

    const items = getState().bom.mergeData.processedLines;

    return dispatch(createEmptyBomThunk(name))
      .then((response: any) => {
        const bomId = response.id;
        const promises: any[] = [];

        items.map((item: any) => {
          promises.push(dispatch(createBomLineThunk(bomId, { ...bomLineFields, ...item, approved: false })));
          return item;
        });

        Promise.all(promises)
          .then(() => {
            // const bomList = { ...getState().bom.bomList };
            // bomList.count += 1;
            // bomList.results = [...bomList.results, response];
            //
            // dispatch(saveBomList(bomList));
            dispatch(
              saveMergeBomSavingData({
                saving: false,
                error: false,
                bomId,
              }),
            );
            // );
          })
          .catch(() => {
            dispatch(
              saveMergeBomSavingData({
                saving: false,
                error: true,
                bomId: null,
              }),
            );
          });
        return bomId;
      })
      .catch(() => {
        dispatch(saveMergeBomSavingData({ saving: false, error: true, bomId: null }));
      });
  };
};

const loadBomPage = (bomId: number, page: number, pageSize: number, orderBy = "id", type = "all") => (
  dispatch: any,
) => {
  return dispatch({
    types: actionTypes.GET_BOM_LINES_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`/boms/${bomId}/lines/?page=${page}&page_size=${pageSize}&order_by=${orderBy}&type=${type}`)
        .then((res) => res.data)
        .catch((error: any) => {
          dispatch(saveBomEdit({ loading: false }));
          console.log("***GET_BOM_LINES_ERROR", error);
          throw error;
        }),
  });
};

export const loadAllBomPagesThunk = (bomId: number, page: number, pageSize: number, orderBy = "id", type = "all") => {
  return async (dispatch: Dispatch<any>) => {
    if (!getAuthToken()) {
      return dispatch(showBottomLeftMessageAlertAction({ text: SignUpMessage, severity: "warning" }));
    }

    dispatch(clearBomEdit());
    dispatch(saveBomEdit({ loading: true }));

    dispatch({
      types: actionTypes.GET_BOM_DATA_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/boms/${bomId}/`)
          .then((res) => res.data)
          .then((response: any) => {
            dispatch(
              saveBomEdit({
                ...response,
                data: response,
                name: response.name,
                id: response.id,
                cost: response.cost || 0,
              }),
            );
          })
          .catch((error) => {
            console.log("***EDIT_BOM_ERROR", error);
            dispatch(saveBomEdit({ loading: false }));
            throw error;
          }),
    });

    const items: any = {};

    const res: any = await dispatch(loadBomPage(bomId, page, pageSize, orderBy, type));
    dispatch(
      saveBomEdit({
        total_pages: res.total_pages,
        count: res.count,
      }),
    );
    res.results.forEach((item: any) => {
      const key = getUniqueId();
      dispatch(saveBomLineStockrecords(key, item.product.stockrecords));
      items[key] = item;
    });

    for (let i = 2; i <= res.total_pages; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const response: any = await dispatch(loadBomPage(bomId, i, pageSize, orderBy, type));
      response.results.forEach((item: any) => {
        const key = getUniqueId();
        dispatch(saveBomLineStockrecords(key, item.product.stockrecords));
        items[key] = item;
      });
    }

    dispatch(saveBomEdit({ items, loading: false }));

    return items;
  };
};

export const setCheckoutBom = (bom: EditorBomData): actionTypes.SetCheckoutBom => {
  return { type: actionTypes.SET_CHECKOUT_BOM, payload: bom };
};

export const updateBom = (bomId: string | number, data: any) => ({
  types: [null, null, null] as any,
  promise: (client: ApiClientInterface) =>
    client
      .patch(`/boms/${bomId}/`, { data })
      .then((res) => res.data)
      .catch((error) => {
        console.log("***UPDATE_BOM_ERROR", error);
        throw error;
      }),
});
