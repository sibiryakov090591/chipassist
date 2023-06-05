import { normalizeAttributeData, uniqueFromTwoArrays, updateObject } from "@src/utils/utility";
import * as actionTypes from "./searchTypes";
import { SearchState, BaseFilters } from "./searchTypes";

export const PATHNAME = "/search";

export const getBaseFiltersInitialState = (): BaseFilters => ({
  base_in_stock: localStorage.getItem("productStock") === "true",
  base_num_in_stock: localStorage.getItem("productStock") === "false" ? null : 1,
});

const initialState: SearchState = {
  isLoadingSearchResults: false,
  reloadSearchFlag: false,

  isLoadedAttributes: false,

  page: 1,
  pageSize: 15,
  query: "",
  queryValue: "",

  attributes: [],
  attributesMap: [],
  enabledAttributesMap: [],

  isExtendedSearchStarted: false,
  extendedSearchId: null,
  extendedSearchParams: null,

  filtersMap: [],
  filtersValues: {},

  isLoadingSearchResultsInProgress: false,
  isLoadingProductResultsInProgress: false,

  currentPage: 1,
  count: 0,
  totalPages: 0,

  searchResultsCategories: [],
  searchResultsAttributeGroups: [],
  searchResultsManufacturers: [],
  searchResultsSellers: [],
  searchResultsMaxPrice: null,
  searchResultsMinPrice: null,

  filterSize: 20,
  filterInc: 0,

  baseFilters: { ...getBaseFiltersInitialState() },
};

const updateAttributes = (action: actionTypes.UpdateAttributesAction, state: SearchState) => {
  let newAttributes = { ...state.attributes };
  Object.keys(action.payload).map((attribute) => {
    newAttributes = updateObject(newAttributes, {
      [attribute]: action.payload[attribute],
    });
    return attribute;
  });
  return updateObject(state, {
    attributes: newAttributes,
  });
};

const updateSearchResult = (
  state: SearchState,
  action: actionTypes.SendFiltersValuesSuccessAction | actionTypes.SendFiltersValuesProductsSuccessAction,
  isSearchComponent = true,
) => {
  const inProgress = isSearchComponent
    ? { isLoadingSearchResultsInProgress: false }
    : { isLoadingProductResultsInProgress: false };

  return updateObject(state, {
    ...inProgress,
    count: action.response.count,
    currentPage: action.response.page,
    totalPages: action.response.total_pages,
    searchResultsCategories: action.response.categories_list,
    searchResultsAttributeGroups: action.response?.group_list || [],
    searchResultsManufacturers: action.response.manufacturers_list,
    searchResultsSellers: action.response.sellers_list,
  });
};

export default function search(state = initialState, action: actionTypes.SearchActionTypes) {
  switch (action.type) {
    case actionTypes.SET_QUERY_VALUE:
      return updateObject(state, { queryValue: action.payload });

    case actionTypes.SAVE_RESULT:
      return updateObject(state, {
        count: action.payload.count,
        totalPages: action.payload.totalPages,
        isLoadingSearchResultsInProgress: false,
      });

    case actionTypes.CLEAR_RESULT:
      return updateObject(state, {
        count: 0,
      });

    case actionTypes.LOAD_ATTRIBUTES_RESULTS_R:
      return updateObject(state, { isLoadedAttributes: true });

    case actionTypes.LOAD_ATTRIBUTES_RESULTS_S: {
      const { o, m } = normalizeAttributeData(action.response.results);
      return updateObject(state, {
        attributes: { ...state.attributes, ...o },
        attributesMap: uniqueFromTwoArrays(state.attributesMap, m),
      });
    }

    case actionTypes.LOAD_ATTRIBUTES_RESULTS_F:
      return updateObject(state, { isLoadedAttributes: false });

    case actionTypes.CHANGE_QUERY:
      return updateObject(state, { query: action.payload });

    case actionTypes.CHANGE_PAGE:
      return updateObject(state, { page: action.payload });

    case actionTypes.CHANGE_PAGE_SIZE:
      return updateObject(state, { pageSize: action.payload });

    case actionTypes.UPDATE_ATTRIBUTES:
      return updateAttributes(action, state);

    case actionTypes.UPDATE_ATTRIBUTES_MAP:
      return updateObject(state, { attributesMap: uniqueFromTwoArrays(state.attributesMap, action.payload).sort() });

    case actionTypes.UPDATE_ENABLED_ATTRIBUTES:
      return updateObject(state, { enabledAttributesMap: action.payload });

    case actionTypes.EXTENDED_LOADING_OF_SEARCH_RESULT_R:
      return updateObject(state, { isExtendedSearchStarted: true });

    case actionTypes.EXTENDED_LOADING_OF_SEARCH_RESULT_F:
      if (action?.error?.response?.status !== 429) {
        return updateObject(state, { isExtendedSearchStarted: false });
      }
      return state;

    case actionTypes.SET_EXTENDED_SEARCH_STARTED:
      return updateObject(state, { isExtendedSearchStarted: true, extendedSearchId: action.payload });

    case actionTypes.SET_EXTENDED_SEARCH_FINISHED:
      if (action.payload && action.payload !== state.extendedSearchId) return state;
      return updateObject(state, { isExtendedSearchStarted: false });

    case actionTypes.SET_EXTENDED_SEARCH_ID:
      return { ...state, extendedSearchId: action.payload.id, extendedSearchParams: action.payload.params };

    case actionTypes.CLEAR_ATTRIBUTES:
      return updateObject(state, { attributesMap: [], attributes: {} });

    case actionTypes.TOGGLE_RELOAD_SEARCH_FLAG:
      return updateObject(state, { reloadSearchFlag: !state.reloadSearchFlag });

    case actionTypes.CREATE_FILTER_FIELDS:
      return updateObject(state, {
        filtersMap: action.payload.sort().slice(0, state.filterSize + state.filterInc - 1),
      });

    case actionTypes.REMOVE_FILTER_FIELD: {
      const nArr = state.filtersMap.slice();
      nArr.splice(state.filtersMap.indexOf(action.payload), 1);
      const newFiltersValues = { ...state.filtersValues };
      delete newFiltersValues[action.payload];
      return updateObject(state, { filtersMap: nArr, filtersValues: { ...newFiltersValues } });
    }

    case actionTypes.ADD_FILTER_FIELD: {
      const nArr = state.filtersMap.slice();
      nArr.push(action.payload);
      return updateObject(state, { filtersMap: nArr });
    }

    case actionTypes.CHANGE_FILTER_FIELD_VALUE:
      return updateObject(state, {
        filtersValues: updateObject(state.filtersValues, {
          [action.attribute.code]: action.attribute.values,
        }),
      });

    case actionTypes.SEND_FILTERS_VALUES_R:
      return updateObject(state, { isLoadingSearchResultsInProgress: true });

    case actionTypes.SEND_FILTERS_VALUES_S:
      return updateSearchResult(state, action, true);

    case actionTypes.SEND_FILTERS_VALUES_F: {
      if (action?.error?.message !== "request_cancelled" && action.error?.response?.status !== 429) {
        return updateObject(state, { isLoadingSearchResultsInProgress: false, isExtendedSearchStarted: false });
      }
      return state;
    }

    case actionTypes.SEND_FILTERS_VALUES_PRODUCTS_R:
      return updateObject(state, { isLoadingProductResultsInProgress: true });

    case actionTypes.SEND_FILTERS_VALUES_PRODUCTS_S:
      return updateSearchResult(state, action, false);

    case actionTypes.SEND_FILTERS_VALUES_PRODUCTS_F:
      return updateObject(state, { isLoadingProductResultsInProgress: false });

    case actionTypes.SAVE_FILTERS_VALUES:
      return updateObject(state, { filtersValues: action.payload });

    case actionTypes.RESET_FILTERS_VALUES:
      return updateObject(state, { filtersValues: {} });

    case actionTypes.SAVE_SEARCH_QUERY_VALUE:
      return updateObject(state, { filtersValues: updateObject(state.filtersValues, { search: action.payload }) });

    case actionTypes.CLEAR_FILTER_FIELDS_VALUES:
      return updateObject(state, {
        filtersValues: { search: state.filtersValues.search },
      });

    case actionTypes.REMOVE_FILTER_FIELDS:
      return updateObject(state, { filtersMap: [] });

    case actionTypes.UPDATE_FILTERS_MAP:
      return updateObject(state, {
        filtersMap: uniqueFromTwoArrays(state.filtersMap, action.payload)
          .sort()
          .slice(0, state.filterSize + state.filterInc - 1),
      });

    case actionTypes.REMOVE_OLD_ATTRIBUTES:
      return updateObject(state, { filters: {} });

    case actionTypes.REMOVE_OLD_ATTRIBUTES_MAP:
      return updateObject(state, { filtersMap: [] });

    case actionTypes.SAVE_BASE_FILTERS:
      return updateObject(state, { baseFilters: action.payload });

    case actionTypes.RESET_BASE_FILTERS:
      return updateObject(state, { baseFilters: { ...getBaseFiltersInitialState() } });

    case actionTypes.UPDATE_FILTER_INC:
      return updateObject(state, { filterInc: action.payload });

    case actionTypes.SAVE_SEARCH_RESULTS_MAX_PRICE: {
      let newState = { ...state, searchResultsMaxPrice: action.payload, searchResultsMinPrice: action.min };
      if (newState.baseFilters.base_price_max === null) {
        newState = { ...newState, baseFilters: { ...newState.baseFilters } };
      }
      return newState;
    }

    default:
      return state;
  }
}
