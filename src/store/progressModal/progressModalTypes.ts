export const PROGRESS_MODAL_OPEN = "PROGRESS_MODAL_OPEN";
export const PROGRESS_MODAL_SUCCESS = "PROGRESS_MODAL_SUCCESS";
export const PROGRESS_MODAL_ERROR = "PROGRESS_MODAL_ERROR";
export const PROGRESS_MODAL_CLOSE = "PROGRESS_MODAL_CLOSE";
export const PROGRESS_MODAL_SET_PART_NUMBER = "PROGRESS_MODAL_SET_PART_NUMBER";
export const PROGRESS_MODAL_SET_REQUEST_TYPE = "PROGRESS_MODAL_SET_REQUEST_TYPE";

export type RequestTypes = "rfq" | "pcb" | "order" | "sellerMessage" | "rfq_list";

// State
export interface ProgressModalState {
  open: boolean;
  inProgress: boolean;
  success: boolean;
  error: boolean;
  errorMessage: string;
  partNumber: string;
  requestType: RequestTypes;
}

export interface LocalStorageItem {
  data: any;
  partNumber: string;
  requestType: RequestTypes;
}

// Actions
export interface ProgressModalAction {
  type: typeof PROGRESS_MODAL_OPEN | typeof PROGRESS_MODAL_SUCCESS | typeof PROGRESS_MODAL_CLOSE;
}
export interface SetErrorProgressModalAction {
  type: typeof PROGRESS_MODAL_ERROR;
  payload: string;
}
export interface SetPartNumberProgressModalAction {
  type: typeof PROGRESS_MODAL_SET_PART_NUMBER;
  payload: { partNumber: string; requestType: RequestTypes };
}

export type ProgressModalActions = ProgressModalAction | SetPartNumberProgressModalAction | SetErrorProgressModalAction;
