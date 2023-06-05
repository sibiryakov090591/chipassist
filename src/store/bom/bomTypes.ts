import { Product as PProduct, Stockrecord } from "@src/store/products/productTypes";

export const SET_UPLOAD_STATE = "SET_UPLOAD_STATE";

export const LOAD_BOM_LIST_ARRAY = ["LOAD_BOM_LIST_R", "LOAD_BOM_LIST_S", "LOAD_BOM_LIST_F"];
export const LOAD_BOM_LIST_START = "LOAD_BOM_LIST_START";
export const LOAD_BOM_LIST_FINISH = "LOAD_BOM_LIST_FINISH";
export const CREATE_BOM_LINE_S = "CREATE_BOM_LINE_S";
export const DELETE_BOM_S = "DELETE_BOM_S";
export const UPDATE_BOM_LINE_S = "UPDATE_BOM_LINE_S";

export const GET_BOM_LINES_ARRAY = ["GET_BOM_LINES_R", "GET_BOM_LINES_S", "GET_BOM_LINES_F"];
export const GET_BOM_LINE_ARRAY = ["GET_BOM_LINE_R", "GET_BOM_LINE_S", "GET_BOM_LINE_F"];
export const GET_BOM_DATA_ARRAY = ["GET_BOM_DATA_R", "GET_BOM_DATA_S", "GET_BOM_DATA_F"];
export const GET_ATTRIBUTES_ARRAY = ["GET_ATTRIBUTES_R", "GET_ATTRIBUTES_S", "GET_ATTRIBUTES_F"];
export const CREATE_BOM_ARRAY = ["CREATE_BOM_R", "CREATE_BOM_S", "CREATE_BOM_F"];
export const EDIT_BOM_ARRAY = ["EDIT_BOM_R", "EDIT_BOM_S", "EDIT_BOM_F"];
export const DELETE_BOM_ARRAY = ["DELETE_BOM_R", "DELETE_BOM_S", "DELETE_BOM_F"];
export const CREATE_BOM_LINE_ARRAY = ["CREATE_BOM_LINE_R", "CREATE_BOM_LINE_S", "CREATE_BOM_LINE_F"];
export const UPDATE_BOM_LINE_ARRAY = ["UPDATE_BOM_LINE_R", "UPDATE_BOM_LINE_S", "UPDATE_BOM_LINE_F"];
export const DELETE_BOM_LINE_ARRAY = ["DELETE_BOM_LINE_R", "DELETE_BOM_LINE_S", "DELETE_BOM_LINE_F"];
export const GET_BOM_LINE_PRICES_ARRAY = ["GET_BOM_LINE_PRICES_R", "GET_BOM_LINE_PRICES_S", "GET_BOM_LINE_PRICES_F"];
export const CHECK_PARSING_ARRAY = ["CHECK_PARSING_R", "CHECK_PARSING_S", "CHECK_PARSING_F"];
export const EXPORT_BOM = ["EXPORT_BOM_R", "EXPORT_BOM_S", "EXPORT_BOM_F"];
export const LOAD_BOM_LINE_SEARCH_ARRAY = [
  "LOAD_BOM_LINE_SEARCH_R",
  "LOAD_BOM_LINE_SEARCH_S",
  "LOAD_BOM_LINE_SEARCH_F",
];

export const SAVE_ATTRIBUTES_LIST = "SAVE_ATTRIBUTES_LIST";
export const SAVE_BOM_LIST = "SAVE_BOM_LIST";
export const SAVE_BOM_LINES = "SAVE_BOM_LINES";
export const SAVE_BOM_EDIT = "SAVE_BOM_EDIT";
export const START_BOM_LINE_SEARCH = "START_BOM_LINE_SEARCH";
export const STOP_BOM_LINE_SEARCH = "STOP_BOM_LINE_SEARCH";
export const SAVE_BOM_CREATE = "SAVE_BOM_CREATE";
export const CREATE_NEW_BOM = "CREATE_NEW_BOM";
export const CLEAR_BOM_EDIT = "CLEAR_BOM_EDIT";
export const SAVE_BOM_LINE_PRICES = "SAVE_BOM_LINE_PRICES";
export const SAVE_BOM_LINE_STOCKRECORDS = "SAVE_BOM_LINE_STOCKRECORDS";
export const START_BOM_LINE_STOCKRECORDS_LOADING = "START_BOM_LINE_STOCKRECORDS_LOADING";
export const FINISH_BOM_LINE_STOCKRECORDS_LOADING = "FINISH_BOM_LINE_STOCKRECORDS_LOADING";
export const SET_BOM_LINE_STOCKRECORDS_COUNT = "SET_BOM_LINE_STOCKRECORDS_COUNT";
export const SAVE_MISC_ARRAY = ["SAVE_MISC_R", "SAVE_MISC_S", "SAVE_MISC_F"];
export const UPDATE_MISC_ARRAY = ["UPDATE_MISC_R", "UPDATE_MISC_S", "UPDATE_MISC_F"];
export const LOAD_MISC_ARRAY = ["LOAD_MISC_R", "LOAD_MISC_S", "LOAD_MISC_F"];

export const BOM_CREATE_COPY_ARRAY = ["BOM_CREATE_COPY_R", "BOM_CREATE_COPY_S", "BOM_CREATE_COPY_F"];
export const BOM_COPYING_START = "BOM_COPYING_START";
export const BOM_COPYING_ERROR = "BOM_COPYING_ERROR";
export const BOM_COPYING_FINISH = "BOM_COPYING_FINISH";
export const BOM_COPY_RESET = "BOM_COPY_RESET";

export const ENABLE_BOM_MERGE = "ENABLE_BOM_MERGE";
export const DISABLE_BOM_MERGE = "DISABLE_BOM_MERGE";
export const TOGGLE_MERGE_BOM = "TOGGLE_MERGE_BOM";
export const CASH_MODAL_PRODUCTS = "CASH_MODAL_PRODUCTS";
export const CLEAR_CASH_MODAL_PRODUCTS = "CLEAR_CASH_MODAL_PRODUCTS";
export const SET_MERGE_BOM_MULTIPLIER = "SET_MERGE_BOM_MULTIPLIER";
export const START_LOADING_MERGE_ITEMS = "START_LOADING_MERGE_ITEMS";
export const FINISH_LOADING_MERGE_ITEMS = "FINISH_LOADING_MERGE_ITEMS";
export const SAVE_MERGE_DATA = "SAVE_MERGE_DATA";
export const SAVE_MERGE_BOM_SAVING_DATA = "SAVE_MERGE_BOM_SAVING_DATA";
export const SET_EDIT_ROWS_FOR_DELETE = "SET_EDIT_ROWS_FOR_DELETE";
export const SAVE_ALL_BOM_PAGES = "SAVE_ALL_BOM_PAGES";
export const SET_CHECKOUT_BOM = "SET_CHECKOUT_BOM";
export const UPDATE_ITEM_DATA_AFTER_CREATE = "UPDATE_ITEM_DATA_AFTER_CREATE";
export const MARK_BOM_AS_INVALID = "MARK_BOM_AS_INVALID";

export interface BomLineFields {
  id?: number | string;
  name: string;
  quantity: number;
  quantity_ref: number;
  part_number: string;
  part_number_ref?: string;
  product: PProduct | "";
  product_title: string;
  selected_product: number | string;
  description: string;
  price: number;
  approved: boolean;
  attributes: any[];
  stockrecord: number;
  line_quantity: number;
  errors?: any[];
  rfq: number;
  requested: boolean;
  rfq_id: string | number;
  units_count: number;
  order_ref?: number | null;
}

export interface Items {
  [index: string]: BomLineFields;
}

export interface Stockrecords {
  [index: string]: {
    items: Stockrecord[];
    stockrecordsLoading?: boolean;
    stockrecordsUpdated?: boolean;
  };
}

export interface BomInitialState {
  data: any;
  id: string;
  name: string;
  cost: number;
  count: number;
  items: Items;
  error: string;
  saving: boolean;
  saved: boolean;
  search: any;
  stockrecords: Stockrecords;
  loading: boolean;
  total_pages: number;
  rowsForDelete: any[];
  readonly: boolean;
  created: string;
  parent: any;
  order: any;
  original: string;
  valid: boolean;
}

export interface MergeDataInitialState {
  processedLines: any[];
  rawLines: any[];
  conflict: {
    original: any;
    duplicate: any;
  };
  groups: any[];
  canSave: boolean;
}

export interface MergeSaveInitialState {
  saving: boolean;
  error: boolean;
  bomId: any;
}

export interface BomListResult {
  id: number;
  name: string;
  cost: string | null;
  created: string;
  parent: any;
  order: any;
  readonly: boolean | null;
}

export interface BomList {
  links: { next: string | null; previous: string | null };
  count: number;
  total_pages: number;
  page: number;
  results: BomListResult[];
}

export interface AttributesItem {
  id: number;
  url: string;
  option_group: any;
  name: string;
  code: string;
  type: string;
  values: string[];
}

export interface BomCreate {
  data: any;
  id: string;
  name: string;
  cost: number;
  count: number;
  items: any;
  error: string;
  saving: boolean;
  saved: boolean;
  search: any;
  stockrecords: Stockrecords;
  loading: boolean;
  total_pages: number;
  rowsForDelete: any[];
}

export interface Product {
  attributes: Array<{
    category: string;
    code: string;
    group: { id: number; name: string };
    id: number;
    name: string;
    type: string;
    value: string;
  }>;
  categories: Array<{
    name: string;
    id: number;
    slug: string;
  }>;
  children: any[];
  date_created: string;
  date_updated: string;
  description: string;
  id: number;
  images: any[];
  manufacturer: {
    id: number;
    name: string;
  };
  options: any[];
  parentId: number;
  price: {
    currency: string;
    excl_tax: string;
    incl_tax: string;
    tax: string;
  };
  stockrecords: any[];
  title: string;
  upc: string;
}

export interface CashModalItem {
  products: PProduct[];
  createdTime: number;
  unitsCount: number;
  loaded: boolean;
  rfqData: GroupRfqData;
}

export interface InitialState {
  upload: {
    uploading: boolean;
    error: string;
    selected: boolean;
  };
  bomList: BomList | {};
  isBomListLoading: boolean;
  bomItem: BomInitialState;
  cashModalItems: { [index: string]: CashModalItem };
  cashModalItemsLoading: boolean;
  attributes: AttributesItem[];
  copy: {
    copying: boolean;
    error: boolean;
    copyId: number | null;
  };
  mergeEnabled: boolean;
  mergeItems: any;
  mergeItemsLoading: boolean;
  mergeSave: MergeSaveInitialState;
  mergeData: MergeDataInitialState;
  stockrecordsForUpdate: number;
  bomCheckout: BomInitialState;
}

export interface EditorBomData {
  id: number;
  name: string;
  cost: number;
  count: number;
  items: Items;
  error: string;
  saving: boolean;
  saved: boolean;
  search: any;
  stockrecords: Stockrecords;
  rowsForDelete: any[];
  readonly: boolean;
}

export interface BomFields {
  [key: string]: any;
}

export interface Row extends BomLineFields {
  key: string;
}

export interface GroupRfqData {
  status: "found" | "not found";
  total_num_in_stock: number;
  number_of_products: number;
}

export interface BomGroup {
  index: number;
  items: Row[];
  rfqData?: GroupRfqData;
}

export interface Groups {
  [key: string]: BomGroup;
}

export interface SelectedLine {
  rowKey: string;
  partNumber: string;
  partNumberForSearch: string;
  product: BomLineFields;
  stockrecordId: number;
  qty: number;
  defaultQty: number;
  rfq: number;
  orderRef: number | null;
}

export interface GroupItem {
  id: number | string | React.ReactText;
  stockrecord: Stockrecord;
  minQty: number;
  unitPrice: any;
  isAvaible: boolean;
  costNum: number;
  cost: number | string | JSX.Element;
}

// Actions
export interface LoadBomListStart {
  type: typeof LOAD_BOM_LIST_START;
}

export interface LoadBomListFinish {
  type: typeof LOAD_BOM_LIST_FINISH;
}

export interface SaveBomList {
  type: typeof SAVE_BOM_LIST;
  payload: any;
}

export interface SaveAttributes {
  type: typeof SAVE_ATTRIBUTES_LIST;
  payload: any;
}

interface SetUploadState {
  type: typeof SET_UPLOAD_STATE;
  payload: any;
}

export interface CreateNewBom {
  type: typeof CREATE_NEW_BOM;
}

export interface ClearBomEdit {
  type: typeof CLEAR_BOM_EDIT;
}

export interface StartCreateBomCopy {
  type: typeof BOM_COPYING_START;
}

export interface SetCreateBomCopyError {
  type: typeof BOM_COPYING_ERROR;
}

export interface ResetCreateBomCopy {
  type: typeof BOM_COPY_RESET;
}

export interface EnableBomMerge {
  type: typeof ENABLE_BOM_MERGE;
}

export interface DisableBomMerge {
  type: typeof DISABLE_BOM_MERGE;
}

export interface StartLoadingMergeItems {
  type: typeof START_LOADING_MERGE_ITEMS;
}

export interface FinishLoadingMergeItems {
  type: typeof FINISH_LOADING_MERGE_ITEMS;
}

export interface CreateBomLineS {
  type: typeof CREATE_BOM_LINE_S;
  response: any;
}

export interface SaveBomLines {
  type: typeof SAVE_BOM_LINES;
}

export interface StartBomLinesSearch {
  type: typeof START_BOM_LINE_SEARCH;
}

export interface StopBomLinesSearch {
  type: typeof STOP_BOM_LINE_SEARCH;
}

export interface SaveBomLinesStockrecords {
  type: typeof SAVE_BOM_LINE_STOCKRECORDS;
}

export interface StartFinishStockrecordsLoading {
  type: typeof START_BOM_LINE_STOCKRECORDS_LOADING | typeof FINISH_BOM_LINE_STOCKRECORDS_LOADING;
}

export interface SaetBomLinesStockrecordsCount {
  type: typeof SET_BOM_LINE_STOCKRECORDS_COUNT;
  payload: any;
}

export interface SaveBomCreate {
  type: typeof SAVE_BOM_CREATE;
  payload: any;
}

export interface SaveBomEdit {
  type: typeof SAVE_BOM_EDIT;
  payload: any;
}

export interface UpdateBomLineS {
  type: typeof UPDATE_BOM_LINE_S;
  response: any;
}

export interface BomCopingFinish {
  type: typeof BOM_COPYING_FINISH;
  payload: number;
}

export interface ToggleMergeBom {
  type: typeof TOGGLE_MERGE_BOM;
  payload: number[];
}

export interface SetMergeBomMultiplier {
  type: typeof SET_MERGE_BOM_MULTIPLIER;
  payload: { id: number; multiplier: number };
}

export interface SaveMergeBomData {
  type: typeof SAVE_MERGE_DATA;
  payload: any;
}

export interface SaveMergeBomSavingData {
  type: typeof SAVE_MERGE_BOM_SAVING_DATA;
  payload: any;
}

export interface DeleteBom {
  type: typeof DELETE_BOM_S;
}

export interface SetEditRowsForDelete {
  type: typeof SET_EDIT_ROWS_FOR_DELETE;
}

export interface SaveAllBomPages {
  type: typeof SAVE_ALL_BOM_PAGES;
  payload: any[];
}

export interface SetCheckoutBom {
  type: typeof SET_CHECKOUT_BOM;
  payload: EditorBomData;
}

export interface UpdateItemAfterCreate {
  type: typeof UPDATE_ITEM_DATA_AFTER_CREATE;
  payload: any;
}

export interface SaveCashModalProducts {
  type: typeof CASH_MODAL_PRODUCTS;
  payload: {
    products: PProduct[];
    key: string;
    rfqData: GroupRfqData | null;
    isFailRequest: boolean;
  };
}

export interface ClearCashModalProducts {
  type: typeof CLEAR_CASH_MODAL_PRODUCTS;
}

export interface MarkBomAsInvalid {
  type: typeof MARK_BOM_AS_INVALID;
  payload: boolean;
}

export type BomActionsType =
  | SaveCashModalProducts
  | ClearCashModalProducts
  | StopBomLinesSearch
  | StartBomLinesSearch
  | UpdateItemAfterCreate
  | SaveAllBomPages
  | SaveBomEdit
  | SetEditRowsForDelete
  | SaveMergeBomSavingData
  | SetMergeBomMultiplier
  | DeleteBom
  | SaveMergeBomData
  | ToggleMergeBom
  | BomCopingFinish
  | UpdateBomLineS
  | SaveBomCreate
  | StartFinishStockrecordsLoading
  | SaetBomLinesStockrecordsCount
  | SaveBomLinesStockrecords
  | SaveBomLines
  | CreateBomLineS
  | FinishLoadingMergeItems
  | StartLoadingMergeItems
  | DisableBomMerge
  | SaveBomList
  | LoadBomListStart
  | LoadBomListFinish
  | SetUploadState
  | SaveAttributes
  | ClearBomEdit
  | CreateNewBom
  | StartCreateBomCopy
  | SetCreateBomCopyError
  | EnableBomMerge
  | ResetCreateBomCopy
  | SetCheckoutBom
  | MarkBomAsInvalid;
