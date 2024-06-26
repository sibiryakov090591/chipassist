import { batch } from "react-redux";
import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { RootState } from "@src/store";
import { normalizeAttributeData, uniqueFromTwoArrays } from "@src/utils/utility";
import { getBaseFiltersInitialState } from "@src/store/search/searchReducer";
import { saveProducts, clearProducts } from "@src/store/products/productsActions";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import * as actionTypes from "./searchTypes";

export const API_PATH = "apiv2";
export const SEARCH_URL = "/search/";
export const SEARCH_URL_EXTENDED = "/search_result/";

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

export const loadSearchResultsActionThunk = (params: { [index: string]: any } = null) => {
  return async (dispatch: any) => {
    dispatch(beforeSearchRequest(params));
    return dispatch(sendFiltersValueAction(params))
      .then((response: any) => {
        batch(() => {
          dispatch(saveFiltersValuesThunk(response, params.search));

          if (Number(params?.page) === 1) {
            dispatch({
              type: actionTypes.SET_EXTENDED_SEARCH_ID,
              payload: { id: 1, params },
            });
          }
        });
      })
      .catch((e: any) => {
        throw e;
      });
  };
};

export const beforeSearchRequest = (params: { [index: string]: any }) => {
  return (dispatch: any, getState: () => RootState) => {
    batch(() => {
      dispatch({
        type: actionTypes.SET_EXTENDED_SEARCH_ID,
        payload: { id: null, params: null },
      });
      dispatch(setExtendedSearchFinished());
      dispatch({ type: actionTypes.SEND_FILTERS_VALUES_ARRAY[0] });

      if (!!getState().search.query && getState().search.query !== params.search) {
        dispatch(resetBaseFilters());
        dispatch({ type: actionTypes.CLEAR_RESULT });
        dispatch(clearProducts());
      }

      dispatch(changeQueryAction(params.search));
      dispatch({ type: actionTypes.CHANGE_PAGE, payload: params.page });
      dispatch({ type: actionTypes.CHANGE_PAGE_SIZE, payload: params.page_size });
    });
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
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`${API_PATH}${SEARCH_URL}${params}`, {
          cancelId: "get_search_list",
          // config: { headers: { "Cache-Control": "no-cache" } },
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
    dispatch(setExtendedSearchResultsCount(response?.count ?? null));
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

export const changeManufacturer = (value: { id: number; name: string } | number) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    let manufacturerItem = value || null;
    if (typeof value !== "object") {
      const manufacturer = getState().manufacturers.items?.find((i) => i.id === value);
      if (manufacturer) {
        manufacturerItem = { id: manufacturer.id, name: manufacturer.name };
      }
    }
    return dispatch({
      type: actionTypes.CHANGE_MANUFACTURER,
      payload: manufacturerItem,
    });
  };
};

export const redirectToSearchPage = (
  navigate: NavigateFunction,
  query: string,
  page: number,
  pageSize: number,
  manufacturerId: number | string = null,
) => {
  navigate({
    pathname: "/search",
    search: `?query=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}${
      manufacturerId ? `&m_id=${manufacturerId}` : ""
    }`,
  });
};

export const onTryClickAction = (
  navigate: NavigateFunction,
  query: string,
  page: number,
  pageSize: number,
  manufacturerId: number | string = null,
  dispatch: any,
) => {
  const currentLocation = window.location.pathname;

  dispatch({ type: actionTypes.CLEAR_ATTRIBUTES });
  redirectToSearchPage(navigate, query, page, pageSize, manufacturerId);

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

export const sendFiltersValueAction = (data: { [key: string]: any }) => {
  return async (dispatch: any) => {
    return dispatch({
      types: [actionTypes.SEND_FILTERS_VALUES_ARRAY],
      promise: () => {
        return new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                count: +data.page === 1 ? 2 : 45,
                total_pages: +data.page === 1 ? 1 : 3,
                page: +data.page || 1,
                results: [...Array(+data.page === 1 ? 2 : 15)].map((_, index) => ({
                  id: index + 1,
                  attributes: [],
                  date_created: "2022-04-01T08:00:30.227196+02:00",
                  date_updated: "2024-05-25T20:22:34.029196+02:00",
                  description: "Cap Tant Wet 150uF 10V 10% (5.56 X 13.08mm) Axial 125°C",
                  manufacturer: { id: 576, name: "Vishay Intertechnology" },
                  stockrecords: [
                    {
                      id: index + 10,
                      date_created: "2022-04-01T08:00:30.227196+02:00",
                      date_updated: new Date(Date.now() - (index + 1) * 100000).toISOString(),
                      errors: [],
                      lead_period: "",
                      lead_period_str: "",
                      low_stock_threshold: 0,
                      moq: 1,
                      mpq: 1,
                      num_in_stock: 100,
                      packaging: "Each",
                      partner: 16,
                      partner_name: "Newark",
                      partner_sku: "61AC0858",
                      price_currency: "USD",
                      prices: [{ amount: 1, id: 56527900, price: 50.06 }],
                      product_url: "",
                    },
                  ],
                })),
              }),
            3000,
          );
        });
      },
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
      dispatch(saveSearchDataToCompare(response.results));
      dispatch(saveProducts(response.results));
      dispatch({
        type: actionTypes.SAVE_RESULT,
        payload: { query, count: response.count, totalPages: response.total_pages, currentPage: response.page },
      });
    });
  };
};

export const saveSearchDataToCompare = (response: any) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.SAVE_RESULT_TO_COMPARE,
      payload: response,
    });
  };
};

export const compareSearchResults = (newResponse: any) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.COMPARE_SEARCH_RESULTS,
      payload: newResponse,
    });
  };
};

export const setExtendedSearchFinished = () => {
  return {
    type: actionTypes.SET_EXTENDED_SEARCH_FINISHED,
  };
};

export const setExtendedSearchResultsCount = (count: number) => {
  return {
    type: actionTypes.SET_EXTENDED_SEARCH_RESULTS_COUNT,
    payload: count,
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

// const cleanBaseFilters = (base: { [index: string]: any }) => {
//   const baseFilters = { ...base };
//
//   baseFilters.base_num_in_stock = baseFilters.base_in_stock ? baseFilters.base_num_in_stock || 1 : "";
//   delete baseFilters.base_in_stock;
//
//   if (baseFilters.base_price_min && (baseFilters.base_price_min === "0" || baseFilters.base_price_min === 0)) {
//     delete baseFilters.base_price_min;
//   }
//   if (baseFilters.base_price_max && (baseFilters.base_price_max === "0" || baseFilters.base_price_max === 0)) {
//     delete baseFilters.base_price_max;
//   }
//
//   return baseFilters;
// };

export const setQueryValue = (value: string): actionTypes.SetQueryValueAction => {
  let res = value?.startsWith("SELLER:") || value?.startsWith("MANUFACTURER:") ? value : value?.toUpperCase();
  if (!res.includes('"')) {
    res = res.replace(/ /gi, "");
  }
  return {
    type: actionTypes.SET_QUERY_VALUE,
    payload: res,
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
