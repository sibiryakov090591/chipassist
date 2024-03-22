export const SET_QUERY_VALUE = "@search/SET_QUERY_VALUE";

export const SAVE_RESULT = "@search/SAVE_RESULT";
export const CLEAR_RESULT = "@search/CLEAR_RESULT";

export const LOAD_ATTRIBUTES_RESULTS_R = "@search/LOAD_ATTRIBUTES_RESULTS_R";
export const LOAD_ATTRIBUTES_RESULTS_S = "@search/LOAD_ATTRIBUTES_RESULTS_S";
export const LOAD_ATTRIBUTES_RESULTS_F = "@search/LOAD_ATTRIBUTES_RESULTS_F";

export const LOAD_ATTRIBUTES_RESULTS_ARRAY = [
  LOAD_ATTRIBUTES_RESULTS_R,
  LOAD_ATTRIBUTES_RESULTS_S,
  LOAD_ATTRIBUTES_RESULTS_F,
];

export const CHANGE_QUERY = "@search/CHANGE_QUERY";
export const CHANGE_MANUFACTURER = "@search/CHANGE_MANUFACTURER";
export const CHANGE_PAGE = "@search/CHANGE_PAGE";
export const CHANGE_PAGE_SIZE = "@search/CHANGE_PAGE_SIZE";

export const UPDATE_ATTRIBUTES = "@search/UPDATE_ATTRIBUTES";
export const UPDATE_ATTRIBUTES_MAP = "@search/UPDATE_ATTRIBUTES_MAP";
export const UPDATE_ENABLED_ATTRIBUTES = "@search/UPDATE_ENABLED_ATTRIBUTES";

export const SET_EXTENDED_SEARCH_STARTED = "@search/SET_EXTENDED_SEARCH_STARTED";
export const SET_EXTENDED_SEARCH_FINISHED = "@search/SET_EXTENDED_SEARCH_FINISHED";
export const SET_EXTENDED_SEARCH_RESULTS_COUNT = "@search/SET_EXTENDED_SEARCH_RESULTS_COUNT";
export const SET_EXTENDED_SEARCH_ID = "@search/SET_EXTENDED_SEARCH_ID";

export const CLEAR_ATTRIBUTES = "@search/CLEAR_ATTRIBUTES";

export const TOGGLE_RELOAD_SEARCH_FLAG = "@search/TOGGLE_RELOAD_SEARCH_FLAG";
export const TOGGLE_SMART_VIEW = "@search/TOGGLE_SMART_VIEW";

export const CREATE_FILTER_FIELDS = "@search/CREATE_FILTER_FIELDS";
export const REMOVE_FILTER_FIELD = "@search/REMOVE_FILTER_FIELD";
export const ADD_FILTER_FIELD = "@search/ADD_FILTER_FIELD";

export const CHANGE_FILTER_FIELD_VALUE = "@search/SAVE_FILTER_FIELD_VALUE";
export const CLEAR_FILTER_FIELDS_VALUES = "@search/CLEAR_FILTER_FIELDS_VALUES";

export const SEND_FILTERS_VALUES_R = "@search/SEND_FILTERS_VALUES_R";
export const SEND_FILTERS_VALUES_S = "@search/SEND_FILTERS_VALUES_S";
export const SEND_FILTERS_VALUES_F = "@search/SEND_FILTERS_VALUES_F";

export const SEND_FILTERS_VALUES_ARRAY = [SEND_FILTERS_VALUES_R, SEND_FILTERS_VALUES_S, SEND_FILTERS_VALUES_F];

export const SEND_FILTERS_VALUES_PRODUCTS_R = "@search/SEND_FILTERS_VALUES_PRODUCTS_R";
export const SEND_FILTERS_VALUES_PRODUCTS_S = "@search/SEND_FILTERS_VALUES_PRODUCTS_S";
export const SEND_FILTERS_VALUES_PRODUCTS_F = "@search/SEND_FILTERS_VALUES_PRODUCTS_F";

export const SEND_FILTERS_VALUES_PRODUCTS_ARRAY = [
  SEND_FILTERS_VALUES_PRODUCTS_R,
  SEND_FILTERS_VALUES_PRODUCTS_S,
  SEND_FILTERS_VALUES_PRODUCTS_F,
];

export const SAVE_SEARCH_QUERY_VALUE = "@search/SAVE_SEARCH_QUERY_VALUE";

export const REMOVE_FILTER_FIELDS = "@search/REMOVE_FILTER_FIELDS";
export const SAVE_FILTERS_VALUES = "@search/SAVE_FILTERS_VALUES";
export const RESET_FILTERS_VALUES = "@search/RESET_FILTERS_VALUES";

export const UPDATE_FILTERS_MAP = "@search/UPDATE_FILTERS_MAP";

export const EXTENDED_LOADING_OF_SEARCH_RESULT_R = "@search/EXTENDED_LOADING_OF_SEARCH_RESULTS_R";
export const EXTENDED_LOADING_OF_SEARCH_RESULT_S = "@search/EXTENDED_LOADING_OF_SEARCH_RESULTS_S";
export const EXTENDED_LOADING_OF_SEARCH_RESULT_F = "@search/EXTENDED_LOADING_OF_SEARCH_RESULTS_F";

export const EXTENDED_LOADING_OF_SEARCH_RESULT_ARRAY = [
  EXTENDED_LOADING_OF_SEARCH_RESULT_R,
  EXTENDED_LOADING_OF_SEARCH_RESULT_S,
  EXTENDED_LOADING_OF_SEARCH_RESULT_F,
];

export const REMOVE_OLD_ATTRIBUTES = "@search/REMOVE_OLD_ATTRIBUTES";
export const REMOVE_OLD_ATTRIBUTES_MAP = "@search/REMOVE_OLD_ATTRIBUTES_MAP";

export const SAVE_BASE_FILTERS = "@search/SAVE_BASE_FILTERS";
export const RESET_BASE_FILTERS = "@search/RESET_BASE_FILTERS";
export const UPDATE_FILTER_INC = "@search/UPDATE_FILTER_INC";
export const SAVE_PART_NUMBER_EXAMPLES = "@search/SAVE_PART_NUMBER_EXAMPLES";

export const SAVE_SEARCH_RESULTS_MAX_PRICE = "@search/SAVE_SEARCH_RESULTS_MAX_PRICE";
export interface BaseFilters {
  base_category_ids?: Array<number>;
  base_category_strings?: Array<string>;
  base_manufacturer_ids?: Array<number>;
  base_manufacturer_strings?: Array<string>;
  base_seller_ids?: Array<number>;
  base_seller_strings?: Array<string>;
  base_in_stock?: boolean;
  base_num_in_stock?: number;
  base_price_min?: number;
  base_price_max?: number;
}

export interface SearchState {
  isLoadingSearchResults: boolean;
  reloadSearchFlag: boolean;
  isLoadedAttributes: boolean;
  page: number;
  pageSize: number;
  query: string;
  queryValue: string;
  manufacturer: { id: number; name: string };
  attributes: { [index: string]: { id: string; code: string; name: string; type: string; values: any } }[];
  attributesMap: string[];
  enabledAttributesMap: any; // TODO types
  isExtendedSearchStarted: boolean; // TODO types
  extendedSearchId: number;
  extendedSearchResultsCount: number;
  extendedSearchParams: { [key: string]: any };
  filtersMap: any; // TODO types
  filtersValues: any; // TODO types
  isLoadingSearchResultsInProgress: boolean;
  isLoadingProductResultsInProgress: boolean;
  currentPage: number;
  count: number;
  totalPages: number;
  searchResultsCategories: any; // TODO types
  searchResultsAttributeGroups: []; // TODO types
  searchResultsManufacturers: []; // TODO types
  searchResultsSellers: []; // TODO types
  searchResultsMaxPrice: number;
  searchResultsMinPrice: number;
  partNumberExamples: string[];
  filterSize: number;
  filterInc: number;
  smart_view: boolean;
  baseFilters: BaseFilters;
}

export interface SaveResultAction {
  type: typeof SAVE_RESULT;
  payload: { count: number; totalPages: number };
}

export interface ClearResultAction {
  type: typeof CLEAR_RESULT;
}

export interface LoadAttributesResultRequestAction {
  type: typeof LOAD_ATTRIBUTES_RESULTS_R;
}

export interface LoadAttributesResultSuccessAction {
  type: typeof LOAD_ATTRIBUTES_RESULTS_S;
  response: any;
}

export interface LoadAttributesResultFailedAction {
  type: typeof LOAD_ATTRIBUTES_RESULTS_F;
}

export interface ChangeQueryAction {
  type: typeof CHANGE_QUERY;
  payload: string;
}

export interface ChangeManufacturerAction {
  type: typeof CHANGE_MANUFACTURER;
  payload: any;
}

export interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  payload: number;
}
export interface ChangePageSizeAction {
  type: typeof CHANGE_PAGE_SIZE;
  payload: number;
}

export interface UpdateAttributesAction {
  type: typeof UPDATE_ATTRIBUTES;
  payload: { [index: string]: { [index: string]: any } };
}
export interface UpdateAttributesMapAction {
  type: typeof UPDATE_ATTRIBUTES_MAP;
  payload: string[];
}
export interface UpdateEnabledAttributesAction {
  type: typeof UPDATE_ENABLED_ATTRIBUTES;
  payload: any;
}
export interface ExtendedLoadingSearchResultRequestAction {
  type: typeof EXTENDED_LOADING_OF_SEARCH_RESULT_R;
}

export interface ExtendedLoadingSearchResultFailedAction {
  type: typeof EXTENDED_LOADING_OF_SEARCH_RESULT_F;
  error?: any;
}
export interface SetExtendedSearchStartedAction {
  type: typeof SET_EXTENDED_SEARCH_STARTED;
  payload: number;
}
export interface SetExtendedSearchFinishedAction {
  type: typeof SET_EXTENDED_SEARCH_FINISHED;
  payload: number;
}
export interface SetExtendedSearchIdAction {
  type: typeof SET_EXTENDED_SEARCH_ID;
  payload: { id: number; params: { [key: string]: any } };
}
export interface ClearAttributesAction {
  type: typeof CLEAR_ATTRIBUTES;
}
export interface ToggleReloadSearchFlagAction {
  type: typeof TOGGLE_RELOAD_SEARCH_FLAG;
}
export interface ToggleSmartViewAction {
  type: typeof TOGGLE_SMART_VIEW;
}
export interface CreateFilterFieldsAction {
  type: typeof CREATE_FILTER_FIELDS;
  payload: string[];
}
export interface RemoveFilterFieldAction {
  type: typeof REMOVE_FILTER_FIELD;
  payload: string;
}

export interface AddFilterFieldAction {
  type: typeof ADD_FILTER_FIELD;
  payload: string;
}
export interface ChangeFilterFieldValueAction {
  type: typeof CHANGE_FILTER_FIELD_VALUE;
  attribute: { code: string; values: any };
}

export interface SendFiltersValuesRequestAction {
  type: typeof SEND_FILTERS_VALUES_R;
}
export interface SendFiltersValuesSuccessAction {
  type: typeof SEND_FILTERS_VALUES_S;
  response: any;
}
export interface SendFiltersValuesFailedAction {
  type: typeof SEND_FILTERS_VALUES_F;
  // error?: { message?: string; status: number };
  error?: any;
}

export interface SendFiltersValuesProductsRequestAction {
  type: typeof SEND_FILTERS_VALUES_PRODUCTS_R;
}
export interface SendFiltersValuesProductsSuccessAction {
  type: typeof SEND_FILTERS_VALUES_PRODUCTS_S;
  response: any;
}
export interface SendFiltersValuesProductsFailedAction {
  type: typeof SEND_FILTERS_VALUES_PRODUCTS_F;
}
export interface SaveFiltersValuesAction {
  type: typeof SAVE_FILTERS_VALUES;
  payload: { [index: string]: any };
}
export interface ResetFiltersValuesAction {
  type: typeof RESET_FILTERS_VALUES;
}
export interface SaveSearchQueryValueAction {
  type: typeof SAVE_SEARCH_QUERY_VALUE;
  payload: string;
}
export interface ClearFilterFieldsValuesAction {
  type: typeof CLEAR_FILTER_FIELDS_VALUES;
}
export interface RemoveFilterFieldsAction {
  type: typeof REMOVE_FILTER_FIELDS;
}
export interface UpdateFiltersMapAction {
  type: typeof UPDATE_FILTERS_MAP;
  payload: string[];
}
export interface RemoveOldAttributesAction {
  type: typeof REMOVE_OLD_ATTRIBUTES;
}
export interface RemoveOldAttributesMapAction {
  type: typeof REMOVE_OLD_ATTRIBUTES_MAP;
}

export interface SaveBaseFiltersAction {
  type: typeof SAVE_BASE_FILTERS;
  payload: BaseFilters;
}
export interface ResetBaseFiltersAction {
  type: typeof RESET_BASE_FILTERS;
}
export interface UpdateFilterIncAction {
  type: typeof UPDATE_FILTER_INC;
  payload: number;
}
export interface SaveSearchResultsMaxPriceAction {
  type: typeof SAVE_SEARCH_RESULTS_MAX_PRICE;
  payload: number;
  min: number;
}
export interface SetQueryValueAction {
  type: typeof SET_QUERY_VALUE;
  payload: string;
}
export interface SavePartNumberExamplesAction {
  type: typeof SAVE_PART_NUMBER_EXAMPLES;
  payload: string[];
}
export interface SetExtendedSearchCountAction {
  type: typeof SET_EXTENDED_SEARCH_RESULTS_COUNT;
  payload: number;
}

export type SearchActionTypes =
  | ChangeManufacturerAction
  | SetExtendedSearchCountAction
  | ToggleSmartViewAction
  | SavePartNumberExamplesAction
  | SetQueryValueAction
  | SaveResultAction
  | ClearResultAction
  | LoadAttributesResultRequestAction
  | LoadAttributesResultSuccessAction
  | LoadAttributesResultFailedAction
  | ChangeQueryAction
  | ChangePageAction
  | ChangePageSizeAction
  | UpdateAttributesAction
  | UpdateAttributesMapAction
  | UpdateEnabledAttributesAction
  | ExtendedLoadingSearchResultRequestAction
  | ExtendedLoadingSearchResultFailedAction
  | SetExtendedSearchStartedAction
  | SetExtendedSearchFinishedAction
  | SetExtendedSearchIdAction
  | ClearAttributesAction
  | ToggleReloadSearchFlagAction
  | CreateFilterFieldsAction
  | RemoveFilterFieldAction
  | AddFilterFieldAction
  | ChangeFilterFieldValueAction
  | SendFiltersValuesRequestAction
  | SendFiltersValuesSuccessAction
  | SendFiltersValuesFailedAction
  | SendFiltersValuesProductsRequestAction
  | SendFiltersValuesProductsSuccessAction
  | SendFiltersValuesProductsFailedAction
  | SaveFiltersValuesAction
  | ResetFiltersValuesAction
  | SaveSearchQueryValueAction
  | ClearFilterFieldsValuesAction
  | RemoveFilterFieldsAction
  | UpdateFiltersMapAction
  | RemoveOldAttributesAction
  | RemoveOldAttributesMapAction
  | SaveBaseFiltersAction
  | ResetBaseFiltersAction
  | UpdateFilterIncAction
  | SaveSearchResultsMaxPriceAction;
