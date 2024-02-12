import { batch } from "react-redux";
import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { RootState } from "@src/store";
import { normalizeAttributeData, uniqueFromTwoArrays } from "@src/utils/utility";
import { getBaseFiltersInitialState } from "@src/store/search/searchReducer";
import { saveProducts, clearProducts } from "@src/store/products/productsActions";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import constants from "@src/constants/constants";

import { ID_CHIPASSIST, ID_ELFARO, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import * as actionTypes from "./searchTypes";

export const API_PATH = [ID_CHIPASSIST, ID_MASTER, ID_ELFARO].includes(constants.id) ? "apiv2" : "api";
export const SEARCH_URL =
  constants.id === ID_ELFARO ? "/search/" : constants.id === ID_ICSEARCH ? "/search-byparams/" : "/search/"; // for elfaro was "/searches/"
export const SEARCH_URL_EXTENDED = constants.id === ID_ELFARO ? "/search_result/" : "/search_result/"; // for elfaro was "/search_results/"

const apiClient = new ApiClient();

export const loadAttributesResultsAction = (attributes: any, pageSize: number) => {
  const params: { [key: string]: any } = null;
  if (pageSize) {
    params.page_size = pageSize;
  }

  let urlParams = "";
  if (attributes && attributes.length) {
    urlParams += "?droplist=";

    attributes.map((attribute: any) => {
      urlParams += `&filter_code=${attribute}`;
      return attribute;
    });
  }

  return {
    types: actionTypes.LOAD_ATTRIBUTES_RESULTS_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`/productattributes/${urlParams}`, { params })
        .then((res) => res.data)
        .catch((e: any) => {
          console.log("***LOAD_ATTRIBUTES_RESULTS_ERROR", e);
          throw e;
        }),
  };
};

export const loadSearchResultsActionThunk = (
  query: string,
  page: number,
  pageSize: number,
  orderBy: string,
  filtersValues: { [index: string]: number | string },
  baseFilters: { [index: string]: any },
  otherParams: { [index: string]: any } = null,
  component = "search",
  removeAuth = false,
  isFirstRequest = false,
) => {
  return async (dispatch: any) => {
    let filters = dispatch(beforeSearchRequest(query, page, pageSize, filtersValues, baseFilters, component));
    // if (constants.id === ID_ELFARO) {
    //   filters = { ...filters, rfq: localStorage.getItem("productStock") === "true" ? 0 : 1 };
    // }
    if (otherParams) filters = { ...filters, ...otherParams };
    if (isFirstRequest) filters = { ...filters, query: window };
    // await dispatch(loadProductsRfqData(query, page, pageSize, orderBy));
    return dispatch(sendFiltersValueAction(page, pageSize, orderBy, filters, component, true, removeAuth))
      .then((response: any) => {
        batch(() => {
          dispatch(saveFiltersValuesThunk(response, query));
          dispatch(getCategoriesAttributesThunk());
          dispatch({
            type: actionTypes.SAVE_SEARCH_RESULTS_MAX_PRICE,
            payload: Math.ceil(parseFloat(response.max_price)),
            min: Math.ceil(parseFloat(response.min_price)),
          });

          if (constants.id !== ID_ELFARO) {
            // disable extended search for Elfaro
            dispatch({
              type: actionTypes.SET_EXTENDED_SEARCH_ID,
              payload: { id: response.search_id, params: { page, pageSize, orderBy, filters, component, query } },
            });
          }
        });
      })
      .catch((e: any) => {
        dispatch(cancelExtendedSearch());
        if (e?.response?.status === 401) {
          return dispatch(
            loadSearchResultsActionThunk(
              query,
              page,
              pageSize,
              orderBy,
              filtersValues,
              baseFilters,
              otherParams,
              component,
              true,
            ),
          );
        }
        throw e;
      });
  };
};

export const beforeSearchRequest = (
  query: string,
  page: number,
  pageSize: number,
  filtersValues: { [index: string]: number | string },
  baseFilters: { [index: string]: any },
  component = "search",
) => {
  return (dispatch: any, getState: () => RootState) => {
    let filters = { search: query };

    const action =
      component === "search"
        ? actionTypes.SEND_FILTERS_VALUES_ARRAY[0]
        : actionTypes.SEND_FILTERS_VALUES_PRODUCTS_ARRAY[0];

    batch(() => {
      dispatch({
        type: actionTypes.SET_EXTENDED_SEARCH_ID,
        payload: { id: null, params: null },
      });
      dispatch(setExtendedSearchFinished());

      dispatch({ type: action });
      if (filtersValues !== null) {
        filters = { ...filters, ...filtersValues };
        dispatch(setFiltersValues(filtersValues));
      } else {
        dispatch(resetFiltersValues());
      }

      if (baseFilters !== null) {
        const base = cleanBaseFilters({ ...baseFilters });
        filters = { ...filters, ...base };
        console.log(filters, "filters", filtersValues);
        dispatch(saveBaseFilters(baseFilters));
      } else {
        dispatch(resetBaseFilters());
      }

      if (!!getState().search.query && getState().search.query !== query) {
        dispatch(resetBaseFilters());
        dispatch({ type: actionTypes.CLEAR_RESULT });
        dispatch(clearProducts());
      }

      dispatch(changeQueryAction(query));
      dispatch({ type: actionTypes.CHANGE_PAGE, payload: page });
      dispatch({ type: actionTypes.CHANGE_PAGE_SIZE, payload: pageSize });
    });
    return filters;
  };
};

export const extendedPreloadingOfSearchResults = (urlParams: { [key: string]: any } = null) => {
  const params =
    (urlParams &&
      Object.entries(urlParams).reduce((acc, entry) => {
        const [key, val] = entry;
        if (key === "search") {
          if (val.startsWith("SELLER:")) {
            // search seller's products
            const sellerName = val.replace(/^SELLER:\s*/i, "")?.trim();
            return `${acc ? `${acc}&` : "?"}s=${encodeURIComponent(sellerName)}`;
          }
          if (val.startsWith("MANUFACTURER:")) {
            // search manufacturer's products
            if (urlParams?.m_id) return acc; // search by ID if it exists
            const manufacturerName = val.replace(/^MANUFACTURER:\s*/i, "")?.trim();
            return `${acc ? `${acc}&` : "?"}m=${encodeURIComponent(manufacturerName)}`;
          }
          return `${acc ? `${acc}&` : "?"}${key}=${encodeURIComponent(val)}`;
        }
        return `${acc ? `${acc}&` : "?"}${key}=${val}`;
      }, "")) ||
    "";

  return {
    types: [false, actionTypes.SEND_FILTERS_VALUES_S, actionTypes.SEND_FILTERS_VALUES_F],
    promise: (client: ApiClientInterface) =>
      client
        .get(`${API_PATH}${SEARCH_URL}${params}`, {
          cancelId: "get_search_list",
          config: { headers: { "Cache-Control": "no-cache" } },
          noapi: true,
        })
        .then((res) => res.data)
        .catch((e: any) => {
          console.log("***SEND_FILTERS_PRELOADING_VALUES_ERROR", e);
          throw e;
        }),
  };
};

export const extendedLoadingOfSearchResultsThunk = (searchId: number, urlParams: { [key: string]: any } = null) => {
  // FIXIT move search_result check into loop
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.SET_EXTENDED_SEARCH_STARTED,
    });

    const params =
      (urlParams &&
        Object.entries(urlParams).reduce((acc, entry) => {
          const [key, val] = entry;
          if (key === "search") {
            if (val.startsWith("SELLER:")) {
              // search seller's products
              const sellerName = val.replace(/^SELLER:\s*/i, "")?.trim();
              return `${acc ? `${acc}&` : "?"}s=${encodeURIComponent(sellerName)}`;
            }
            if (val.startsWith("MANUFACTURER:")) {
              // search manufacturer's products
              if (urlParams?.m_id) return acc; // search by ID if it exists
              const manufacturerName = val.replace(/^MANUFACTURER:\s*/i, "")?.trim();
              return `${acc ? `${acc}&` : "?"}m=${encodeURIComponent(manufacturerName)}`;
            }
            return `${acc ? `${acc}&` : "?"}${key}=${encodeURIComponent(val)}`;
          }
          return `${acc ? `${acc}&` : "?"}${key}=${val}`;
        }, "")) ||
      "";

    return dispatch({
      types: actionTypes.EXTENDED_LOADING_OF_SEARCH_RESULT_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL_EXTENDED}${searchId}/${params}`, {
            noapi: true,
          })
          .then((res) => res.data)
          .catch((e: any) => {
            console.log("***EXTENDED_LOADING_OF_SEARCH_RESULT_ERROR", e);
            throw e;
          }),
    });
  };
};

export const extendedLoadingOfSearchResultsForCashing = (
  searchId: number,
  urlParams: { [key: string]: any } = null,
) => {
  // FIXIT move search_result check into loop
  return (dispatch: any) => {
    const params =
      (urlParams &&
        Object.entries(urlParams).reduce((acc, entry) => {
          const [key, val] = entry;
          if (key === "search") {
            if (val.startsWith("SELLER:")) {
              // search seller's products
              const sellerName = val.replace(/^SELLER:\s*/i, "")?.trim();
              return `${acc ? `${acc}&` : "?"}s=${encodeURIComponent(sellerName)}`;
            }
            if (val.startsWith("MANUFACTURER:")) {
              // search manufacturer's products
              if (urlParams?.m_id) return acc; // search by ID if it exists
              const manufacturerName = val.replace(/^MANUFACTURER:\s*/i, "")?.trim();
              return `${acc ? `${acc}&` : "?"}m=${encodeURIComponent(manufacturerName)}`;
            }
            return `${acc ? `${acc}&` : "?"}${key}=${encodeURIComponent(val)}`;
          }
          return `${acc ? `${acc}&` : "?"}${key}=${val}`;
        }, "")) ||
      "";

    return dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL_EXTENDED}${searchId}/${params}`, {
            noapi: true,
          })
          .then((res) => res.data)
          .catch((e: any) => {
            console.log("***EXTENDED_LOADING_OF_SEARCH_RESULT_ERROR", e);
            throw e;
          }),
    });
  };
};

export const socketSearchResult = (data: any, query: string, component = "search") => {
  return (dispatch: any, getState: () => RootState) => {
    const { status, search_id } = data;

    switch (status) {
      case "PENDING":
        dispatch({
          type: actionTypes.SET_EXTENDED_SEARCH_STARTED,
          payload: search_id,
        });
        break;
      case "DONE":
        dispatch({
          type: actionTypes.SET_EXTENDED_SEARCH_FINISHED,
          payload: search_id,
        });
        break;
      default:
        dispatch({
          type: actionTypes.SET_EXTENDED_SEARCH_FINISHED,
          payload: search_id,
        });
    }

    // Skip if recived result from prev extended search
    if (search_id && search_id !== getState().search.extendedSearchId) return true;

    const action =
      component === "search"
        ? actionTypes.SEND_FILTERS_VALUES_ARRAY[1]
        : actionTypes.SEND_FILTERS_VALUES_PRODUCTS_ARRAY[1];
    batch(() => {
      dispatch({ type: action, response: data });
      dispatch(saveFiltersValuesThunk(data, query));
      dispatch(getCategoriesAttributesThunk());
      dispatch({
        type: actionTypes.SAVE_SEARCH_RESULTS_MAX_PRICE,
        payload: Math.ceil(parseFloat(data.max_price)),
        min: Math.ceil(parseFloat(data.min_price)),
      });
    });
    // });
    return true;
  };
};

export const saveExtendedSearch = (response: any, params: any) => {
  return (dispatch: any) => {
    // const { page, pageSize, orderBy, filters, component, query } = params;
    const { query } = params;
    if (response.results && response.results.length > 0) {
      batch(() => {
        dispatch(saveFiltersValuesThunk(response, query));
        dispatch(getCategoriesAttributesThunk());
        dispatch({
          type: actionTypes.SAVE_SEARCH_RESULTS_MAX_PRICE,
          payload: Math.ceil(parseFloat(response.max_price)),
          min: Math.ceil(parseFloat(response.min_price)),
        });
      });
    } else {
      dispatch(setExtendedSearchFinished());
    }
  };
};

export const cancelExtendedSearch = () => {
  return setExtendedSearchFinished();
};

export const changeQueryAction = (query: string) => {
  localStorage.setItem("query", query);
  return {
    type: actionTypes.CHANGE_QUERY,
    payload: query,
  };
};

export const redirectToSearchPage = (navigate: NavigateFunction, query: string, page: number, pageSize: number) => {
  navigate({
    pathname: "/search",
    search: `?query=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`,
  });
};

export const onTryClickAction = (
  navigate: NavigateFunction,
  query: string,
  page: number,
  pageSize: number,
  dispatch: any,
) => {
  const currentLocation = window.location.pathname;

  dispatch({ type: actionTypes.CLEAR_ATTRIBUTES });
  redirectToSearchPage(navigate, query, page, pageSize);

  if (currentLocation === "/search") {
    dispatch(toggleReloadSearchFlag());
  }
};

export const toggleReloadSearchFlag = () => {
  return {
    type: actionTypes.TOGGLE_RELOAD_SEARCH_FLAG,
  };
};

export const removeFilterFieldAction = (value: string) => {
  return {
    type: actionTypes.REMOVE_FILTER_FIELD,
    payload: value,
  };
};

export const addFilterFieldAction = (value: string) => {
  return {
    type: actionTypes.ADD_FILTER_FIELD,
    payload: value,
  };
};

export const addFilterCategoryFields = (categoryIds: number[]) => {
  return (dispatch: any, getState: () => RootState) => {
    // TODO перенести в reducer
    let groups: { [index: string]: any }[] = [];

    if (categoryIds.length) {
      groups = getState().search.searchResultsAttributeGroups.filter((item: any) => categoryIds.includes(item.id));
    } else {
      groups = getState().search.searchResultsAttributeGroups;
    }

    const filtersValues = groups.reduce((acc: any, val) => {
      const attrs = val.attributes.results.map(
        (item: { id: string; code: string; name: string; type: string; values: any }) => item.code,
      );
      return [...acc, ...attrs];
    }, []) as string[];

    dispatch({ type: actionTypes.CREATE_FILTER_FIELDS, payload: filtersValues });
  };
};

export const sendFiltersValueAction = (
  page: number,
  pageSize: number,
  orderBy: string = null,
  data: { [key: string]: any },
  component: string = null,
  showProggress = true,
  removeAuth = false,
) => {
  return (dispatch: any) => {
    const orderParam = orderBy ? `&order_by=${orderBy}` : "";
    let params = "";
    Object.entries(data).forEach((entry) => {
      const [key, val] = entry;
      if (key === "m_id" && !val) return;
      if (key === "search") {
        if (val.startsWith("SELLER:")) {
          // search seller's products
          const sellerName = val.replace(/^SELLER:\s*/i, "")?.trim();
          params += `&s=${encodeURIComponent(sellerName)}`;
        } else if (val.startsWith("MANUFACTURER:")) {
          // search manufacturer's products
          if (data?.m_id) return; // search by ID if it exists
          const manufacturerName = val.replace(/^MANUFACTURER:\s*/i, "")?.trim();
          params += `&m=${encodeURIComponent(manufacturerName)}`;
        } else {
          params += `&${key}=${encodeURIComponent(val)}`;
        }
      } else {
        params += `&${key}=${val}`;
      }
    });

    return dispatch({
      types: !showProggress
        ? actionTypes.SEND_FILTERS_VALUES_S
        : component === "search"
        ? actionTypes.SEND_FILTERS_VALUES_ARRAY
        : actionTypes.SEND_FILTERS_VALUES_PRODUCTS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL}?&page_size=${pageSize}&page=${page}${orderParam}${params}`, {
            cancelId: "get_search_list",
            config: removeAuth ? { headers: { Authorization: null } } : null,
            noapi: true,
          })
          .then((res) => res.data)
          .catch((e: any) => {
            console.log("***SEND_FILTERS_VALUES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getProductsForCashingAction = (page: number, pageSize: number, data: any, cancelId: string) => {
  return (dispatch: any) => {
    let params = "";
    Object.entries(data).forEach((entr) => {
      const [key, val] = entr;
      params += `&${key}=${val}`;
    });

    return dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(`${API_PATH}${SEARCH_URL}?&page_size=${pageSize}&page=${page}${params}`, {
            cancelId,
            noapi: true,
          })
          .then((res) => res.data)
          .catch((e: any) => {
            console.log("***GET_PRODUCTS_FOR_CASHING_ERROR", e);
            throw e;
          }),
    });
  };
};

export const searchAcReturn = (value: string) => {
  return apiClient
    .post("/search_ac/", {
      data: { search: value },
    })
    .then((res) => res.data)
    .catch((e: any) => {
      console.log("***SEARCH_AC_ERROR", e);
      throw e;
    });
};

export const setFiltersValues = (fields: { [index: string]: any }) => {
  return (dispatch: any) => {
    const filtersValues = { ...fields };
    dispatch({
      type: actionTypes.SAVE_FILTERS_VALUES,
      payload: filtersValues,
    });
  };
};

export const resetFiltersValues = () => {
  return {
    type: actionTypes.RESET_FILTERS_VALUES,
  };
};

export const changeFilterValueThunk = (attribute: { code: string; values: any }) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.CHANGE_FILTER_FIELD_VALUE,
      attribute,
    });
  };
};

export const saveSearchQueryAction = (query: string) => {
  return {
    type: actionTypes.SAVE_SEARCH_QUERY_VALUE,
    payload: query,
  };
};

export const clearFilterFieldsValuesAction = () => {
  return {
    type: actionTypes.CLEAR_FILTER_FIELDS_VALUES,
  };
};

export const removeFilterFieldsAction = () => {
  return {
    type: actionTypes.REMOVE_FILTER_FIELDS,
  };
};

export const loadFiltersAction = () => {
  return (dispatch: any, getState: () => RootState) => {
    const name = "params";
    return dispatch(loadMiscAction(name)).then((response: any) => {
      if (response && response.data && response.data.baseFilters) {
        const baseFilters = {
          ...getState().search.baseFilters,
          ...response.data.baseFilters,
        };
        dispatch(saveBaseFilters(baseFilters));
      }

      if (response && response.data && response.data.filtersMap) {
        const filters: any = [];
        const missingFilters: any = [];
        const { attributes } = getState().search;

        response.data.filtersMap.map((item: any) => {
          filters.push(item);

          if (!attributes[item]) {
            missingFilters.push(item);
          }

          return item;
        });

        if (missingFilters.length) {
          dispatch(loadAttributesResultsAction(missingFilters, null));
        }
        dispatch({ type: actionTypes.CREATE_FILTER_FIELDS, payload: filters });

        const enabledAttributes = getEnabledAttributes(getState, filters);
        const enabledAttributesMap = uniqueFromTwoArrays(getState().search.enabledAttributesMap, enabledAttributes);
        dispatch({ type: actionTypes.UPDATE_ENABLED_ATTRIBUTES, payload: enabledAttributesMap });
      }
    });
  };
};

export const checkFiltersAction = () => {
  return (dispatch: any) => {
    const name = "params";
    return dispatch(loadMiscAction(name)).then((response: any) => {
      return response;
    });
  };
};

export const saveFiltersAction = (localBaseFilters: any) => {
  return (dispatch: any, getState: () => RootState) => {
    const { filtersValues } = getState().search;
    const filtersValuesForSave: any = {};
    const { filtersMap } = getState().search;
    const name = "params";
    const data: any = {};

    if (Object.keys(filtersMap).length) {
      data.filtersMap = filtersMap;

      filtersMap.map((value: any) => {
        filtersValuesForSave[value] = filtersValues[value];
        return value;
      });

      data.filtersValues = filtersValuesForSave;
    }

    if (JSON.stringify(localBaseFilters) !== JSON.stringify(getBaseFiltersInitialState())) {
      data.baseFilters = localBaseFilters;
    }

    dispatch(checkFiltersAction())
      .then((response: any) => {
        if (response && response.data) {
          return dispatch(updateMiscAction(name, data));
        }
        return dispatch(saveMiscAction(name, data));
      })
      .catch(() => {
        return dispatch(saveMiscAction(name, data));
      });
  };
};

export const clearOldAttributesThunk = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.REMOVE_OLD_ATTRIBUTES_MAP,
    });
    dispatch({
      type: actionTypes.REMOVE_OLD_ATTRIBUTES,
    });
  };
};

export const getCategoriesAttributesThunk = () => {
  return (dispatch: any, getState: () => RootState) => {
    const categoriesList = getState().search.searchResultsAttributeGroups;

    dispatch(clearOldAttributesThunk()); // <-- removing old attributes here
    const attributes = categoriesList.reduce((res, val: any) => {
      if (val.attributes && val.attributes.results) {
        return [...res, ...val.attributes.results];
      }
      return res;
    }, []);

    updateAttributes(dispatch, getState, attributes);
  };
};

const updateAttributes = (
  dispatch: any,
  getState: () => RootState,
  attributes: { id: string; code: string; name: string; type: string; values: any }[],
) => {
  const { o, m } = normalizeAttributeData(attributes);
  const toEnable = uniqueFromTwoArrays(getState().search.filtersMap, m);
  batch(() => {
    dispatch({ type: actionTypes.UPDATE_ATTRIBUTES, payload: o });
    dispatch({ type: actionTypes.UPDATE_ATTRIBUTES_MAP, payload: m });
    dispatch({ type: actionTypes.UPDATE_FILTERS_MAP, payload: m });
    dispatch({ type: actionTypes.UPDATE_ENABLED_ATTRIBUTES, payload: toEnable });
  });
};

export const saveBaseFilters = (fields: { [index: string]: any }) => {
  return (dispatch: any, getState: () => RootState) => {
    const filters = { ...getState().search.baseFilters, ...fields };
    dispatch({
      type: actionTypes.SAVE_BASE_FILTERS,
      payload: filters,
    });
  };
};

export const resetBaseFilters = () => {
  return {
    type: actionTypes.RESET_BASE_FILTERS,
  };
};

export const setFilterInc = (data: number) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.UPDATE_FILTER_INC,
      payload: data,
    });
  };
};

const getEnabledAttributes = (getState: () => RootState, attributes: string[]) => {
  const enabledAttributes: any = [];
  const { products } = getState().products;

  attributes.map((item: string) => {
    let isFind = false;
    products.forEach((product) => {
      const attrs = product.attributes;
      attrs.map((attr: any) => {
        if (attr.code === item) {
          isFind = true;
        }
        return attr;
      });
    });

    if (isFind) {
      enabledAttributes.push(item);
    }
    return item;
  });

  return enabledAttributes;
};

export const saveFiltersValuesThunk = (response: any, query: string) => {
  return (dispatch: any) => {
    batch(() => {
      dispatch(saveProducts(response.results));
      dispatch({
        type: actionTypes.SAVE_RESULT,
        payload: { query, count: response.count, totalPages: response.total_pages },
      });
    });
  };
};

export const setExtendedSearchFinished = () => {
  return {
    type: actionTypes.SET_EXTENDED_SEARCH_FINISHED,
  };
};

export const setSearchFinished = () => {
  return {
    type: actionTypes.SEND_FILTERS_VALUES_F,
  };
};

export const toggleSmartView = () => {
  return {
    type: actionTypes.TOGGLE_SMART_VIEW,
  };
};

export const savePartNumberExamples = (partNumbers: string[]) => {
  return {
    type: actionTypes.SAVE_PART_NUMBER_EXAMPLES,
    payload: partNumbers,
  };
};

export const saveSearchResultsMaxPrice = (maxPrice: number, minPrice: number) => {
  return {
    type: actionTypes.SAVE_SEARCH_RESULTS_MAX_PRICE,
    payload: maxPrice,
    min: minPrice,
  };
};

const cleanBaseFilters = (base: { [index: string]: any }) => {
  const baseFilters = { ...base };

  baseFilters.base_num_in_stock = baseFilters.base_in_stock ? baseFilters.base_num_in_stock || 1 : "";
  delete baseFilters.base_in_stock;

  if (baseFilters.base_price_min && (baseFilters.base_price_min === "0" || baseFilters.base_price_min === 0)) {
    delete baseFilters.base_price_min;
  }
  if (baseFilters.base_price_max && (baseFilters.base_price_max === "0" || baseFilters.base_price_max === 0)) {
    delete baseFilters.base_price_max;
  }

  return baseFilters;
};

export const setQueryValue = (value: string): actionTypes.SetQueryValueAction => {
  return {
    type: actionTypes.SET_QUERY_VALUE,
    payload: value?.startsWith("SELLER:") || value?.startsWith("MANUFACTURER:") ? value : value?.toUpperCase(),
  };
};

export const getRfqsHintCount = (partNumber: string, sellerLevel = 1) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`apiv2/search/rfqs/?search=${encodeURIComponent(partNumber)}&seller_level=${sellerLevel}`, {
            config: { timeout: 5000 },
            noapi: true,
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***GET_RFQs_COUNT_FOR_HINT_ERROR", e);
            throw e;
          }),
    });
  };
};
