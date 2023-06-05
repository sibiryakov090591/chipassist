export const SHOW_BOTTOM_LEFT_MESSAGE = "@alerts/SHOW_BOTTOM_LEFT_MESSAGE";
export const HIDE_BOTTOM_LEFT_MESSAGE = "@alerts/HIDE_BOTTOM_LEFT_MESSAGE";

export const SHOW_REGISTER_MODAL = "@alerts/SHOW_REGISTER_MODAL";
export const HIDE_REGISTER_MODAL = "@alerts/HIDE_REGISTER_MODAL";

export const SHOW_TOP_RIGHT_MESSAGE = "@alerts/SHOW_TOP_RIGHT_MESSAGE";
export const HIDE_TOP_RIGHT_MESSAGE = "@alerts/HIDE_TOP_RIGHT_MESSAGE";

export const SHOW_MODAL_MESSAGE = "@alerts/SHOW_MODAL_MESSAGE";
export const HIDE_MODAL_MESSAGE = "@alerts/HIDE_MODAL_MESSAGE";
export const SHOW_QUICK_ORDER_CONFIRM_MODAL = "@alerts/SHOW_QUICK_ORDER_CONFIRM_MODAL";
export const HIDE_QUICK_ORDER_CONFIRM_MODAL = "@alerts/HIDE_QUICK_ORDER_CONFIRM_MODAL";

export const SHOW_ADD_TO_LIST_MODAL = "@alerts/SHOW_ADD_TO_LIST_MODAL";
export const HIDE_ADD_TO_LIST_MODAL = "@alerts/HIDE_ADD_TO_LIST_MODAL";

export interface AlertMessage {
  duration?: number | null;
  severity?: "success" | "error" | "warning";
  text: string;
}

export interface AlertModalMessage {
  title: string;
  description: string;
  severity: "success" | "error" | "warning";
}

export interface AddToListModal {
  open: boolean;
  product: any;
}

export interface AlertsState {
  showAlertBottomLeft: boolean;
  showAlertTopRight: boolean;
  showAlertModal: boolean;
  showQuickOrderConfirmModal: boolean;
  showRegisterModal: boolean;
  alertBottomLeftMessage: AlertMessage;
  alertTopRightMessage: AlertMessage;
  alertModalMessage: AlertModalMessage;
  addToListModal: AddToListModal;
}

interface ShowAlertsMessageAction {
  type: typeof SHOW_BOTTOM_LEFT_MESSAGE;
  payload: AlertMessage;
}
interface HideAlertsMessageAction {
  type: typeof HIDE_BOTTOM_LEFT_MESSAGE;
}
interface ShowTopRightAlertsMessageAction {
  type: typeof SHOW_TOP_RIGHT_MESSAGE;
  payload: AlertMessage;
}
interface HideTopRightAlertsMessageAction {
  type: typeof HIDE_TOP_RIGHT_MESSAGE;
}
interface ShowAlertsModalMessageAction {
  type: typeof SHOW_MODAL_MESSAGE;
  payload: AlertModalMessage;
}
interface HideAlertsModalMessageAction {
  type: typeof HIDE_MODAL_MESSAGE;
}
interface ShowRegisterModalAction {
  type: typeof SHOW_REGISTER_MODAL;
}
interface HideRegisterModalAction {
  type: typeof HIDE_REGISTER_MODAL;
}
interface QuickOrderConfirmModalAction {
  type: typeof SHOW_QUICK_ORDER_CONFIRM_MODAL | typeof HIDE_QUICK_ORDER_CONFIRM_MODAL;
}
interface ShowAddToListModalAction {
  type: typeof SHOW_ADD_TO_LIST_MODAL;
  payload: number;
}
interface HideAddToListModalAction {
  type: typeof HIDE_ADD_TO_LIST_MODAL;
}

export type AlertsActionTypes =
  | HideRegisterModalAction
  | ShowRegisterModalAction
  | QuickOrderConfirmModalAction
  | ShowAlertsMessageAction
  | HideAlertsMessageAction
  | ShowTopRightAlertsMessageAction
  | HideTopRightAlertsMessageAction
  | ShowAlertsModalMessageAction
  | HideAlertsModalMessageAction
  | ShowAddToListModalAction
  | HideAddToListModalAction;
