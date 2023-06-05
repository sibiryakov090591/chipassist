import { INIT_ALERTS } from "@src/config";
import * as actionTypes from "./alertsTypes";
import { AlertMessage, AlertModalMessage, AlertsActionTypes } from "./alertsTypes";

export const showBottomLeftMessageAlertAction = (
  message: AlertMessage,
  apiDefaultMessage?: string,
  apiStatus?: number,
): AlertsActionTypes => {
  const mess = { ...message };
  if (!INIT_ALERTS && apiStatus === 500) mess.text = apiDefaultMessage;
  return {
    type: actionTypes.SHOW_BOTTOM_LEFT_MESSAGE,
    payload: mess,
  };
};

export const hideBottomLeftMessageAlertAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_BOTTOM_LEFT_MESSAGE,
  };
};

export const showTopRightMessageAlertAction = (message: AlertMessage): AlertsActionTypes => {
  return {
    type: actionTypes.SHOW_TOP_RIGHT_MESSAGE,
    payload: message,
  };
};

export const hideTopRightMessageAlertAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_TOP_RIGHT_MESSAGE,
  };
};

export const showAlertsModalMessageAction = (message: AlertModalMessage): AlertsActionTypes => {
  return {
    type: actionTypes.SHOW_MODAL_MESSAGE,
    payload: message,
  };
};
export const hideAlertsModalMessageAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_MODAL_MESSAGE,
  };
};
export const showRegisterModalAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.SHOW_REGISTER_MODAL,
  };
};
export const hideRegisterModalAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_REGISTER_MODAL,
  };
};

export const showQuickOrderConfirmModal = (): AlertsActionTypes => {
  return {
    type: actionTypes.SHOW_QUICK_ORDER_CONFIRM_MODAL,
  };
};
export const hideQuickOrderConfirmModal = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_QUICK_ORDER_CONFIRM_MODAL,
  };
};

export const showAddToListModalAction = (product: any): AlertsActionTypes => {
  return {
    type: actionTypes.SHOW_ADD_TO_LIST_MODAL,
    payload: product,
  };
};
export const hideAddToListModalAction = (): AlertsActionTypes => {
  return {
    type: actionTypes.HIDE_ADD_TO_LIST_MODAL,
  };
};
