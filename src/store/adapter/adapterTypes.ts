export const SET_UPLOAD_STATE = "@adapter/SET_UPLOAD_STATE";

export const GET_FILE_SETTINGS_R = "@adapter/GET_FILE_SETTINGS_R";
export const GET_FILE_SETTINGS_S = "@adapter/GET_FILE_SETTINGS_S";
export const GET_FILE_SETTINGS_F = "@adapter/GET_FILE_SETTINGS_F";
export const GET_FILE_SETTINGS_ARRAY = [GET_FILE_SETTINGS_R, GET_FILE_SETTINGS_S, GET_FILE_SETTINGS_F];

export const GET_ITEMS_R = "@adapter/GET_ITEMS_R";
export const GET_ITEMS_S = "@adapter/GET_ITEMS_S";
export const GET_ITEMS_F = "@adapter/GET_ITEMS_F";
export const GET_ITEMS_ARRAY = [GET_ITEMS_R, GET_ITEMS_S, GET_ITEMS_F];

export const UPDATE_ITEM_R = "@adapter/UPDATE_ITEM_R";
export const UPDATE_ITEM_S = "@adapter/UPDATE_ITEM_S";
export const UPDATE_ITEM_F = "@adapter/UPDATE_ITEM_F";
export const UPDATE_ITEM_ARRAY = [UPDATE_ITEM_R, UPDATE_ITEM_S, UPDATE_ITEM_F];

export const DELETE_ITEM_R = "@adapter/DELETE_ITEM_R";
export const DELETE_ITEM_S = "@adapter/DELETE_ITEM_S";
export const DELETE_ITEM_F = "@adapter/DELETE_ITEM_F";
export const DELETE_ITEM_ARRAY = [DELETE_ITEM_R, DELETE_ITEM_S, DELETE_ITEM_F];

export interface AdapterItem {
  id: number;
  file: string;
  status: number;
  errors: any[];
}
export interface AdapterFileError {
  col: string;
  rows: string;
  rule: string;
  err_count: number;
}
export interface AdapterState {
  items: AdapterItem[];
  itemsPagination: {
    count: number;
    total_count: number;
    page: number;
    total_pages: number;
  };
  isItemsLoading: boolean;
  item: AdapterItem;
  itemUpdating: number;
  upload: {
    uploading: boolean;
    error: string;
    fileErrors: AdapterFileError[];
    selected: boolean;
  };
  settings: any[];
}

interface SetUploadStateAction {
  type: typeof SET_UPLOAD_STATE;
  payload: AdapterState["upload"];
}

interface GetItemsRequestAction {
  type: typeof GET_ITEMS_R;
}

interface GetItemsSuccessAction {
  type: typeof GET_ITEMS_S;
  response: {
    count: number;
    links: { next: string; previus: string };
    page: number;
    total_pages: number;
    total_count: number;
    results: AdapterItem[];
  };
}

interface GetItemsFailedAction {
  type: typeof GET_ITEMS_F;
}

interface UpdateItemRequestAction {
  type: typeof UPDATE_ITEM_R;
  id: number;
}

interface UpdateItemSuccessAction {
  type: typeof UPDATE_ITEM_S;
  response: AdapterItem;
  id: number;
}

interface UpdateItemFailedAction {
  type: typeof UPDATE_ITEM_F;
  id: number;
}

interface DeleteItemRequestAction {
  type: typeof DELETE_ITEM_R;
  id: number;
}

interface DeleteItemSuccessAction {
  type: typeof DELETE_ITEM_S;
  payload: number;
  id: number;
}

interface DeleteItemFailedAction {
  type: typeof DELETE_ITEM_F;
  id: number;
}

interface GetFileSettingsRequestAction {
  type: typeof GET_FILE_SETTINGS_R;
}

interface GetFileSettingsSuccessAction {
  type: typeof GET_FILE_SETTINGS_S;
  response: any;
}

interface GetFileSettingsFailureAction {
  type: typeof GET_FILE_SETTINGS_F;
}

export type AdapterActionTypes =
  | GetFileSettingsRequestAction
  | GetFileSettingsSuccessAction
  | GetFileSettingsFailureAction
  | SetUploadStateAction
  | GetItemsRequestAction
  | GetItemsSuccessAction
  | GetItemsFailedAction
  | UpdateItemRequestAction
  | UpdateItemSuccessAction
  | UpdateItemFailedAction
  | DeleteItemRequestAction
  | DeleteItemSuccessAction
  | DeleteItemFailedAction;
