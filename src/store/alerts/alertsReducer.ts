import * as actionTypes from "./alertsTypes";
import { AlertsActionTypes, AlertsState } from "./alertsTypes";

const initialState: AlertsState = {
  showAlertBottomLeft: false,
  showAlertTopRight: false,
  showAlertModal: false,
  showQuickOrderConfirmModal: false,
  showRegisterModal: false,
  alertBottomLeftMessage: {
    duration: 6000,
    severity: "error",
    text: null,
  },
  alertTopRightMessage: {
    duration: 6000,
    severity: "error",
    text: null,
  },
  alertModalMessage: null,
  addToListModal: {
    open: false,
    product: null,
  },
};

const alertsReducer = (state = initialState, action: AlertsActionTypes) => {
  switch (action.type) {
    case actionTypes.SHOW_BOTTOM_LEFT_MESSAGE:
      return {
        ...state,
        showAlertBottomLeft: true,
        alertBottomLeftMessage: { ...initialState.alertBottomLeftMessage, ...action.payload },
      };
    case actionTypes.HIDE_BOTTOM_LEFT_MESSAGE:
      return { ...state, showAlertBottomLeft: false };

    case actionTypes.SHOW_TOP_RIGHT_MESSAGE:
      return {
        ...state,
        showAlertTopRight: true,
        alertTopRightMessage: { ...initialState.alertTopRightMessage, ...action.payload },
      };
    case actionTypes.HIDE_TOP_RIGHT_MESSAGE:
      return { ...state, showAlertTopRight: false, alertTopRightMessage: initialState.alertTopRightMessage };

    case actionTypes.SHOW_MODAL_MESSAGE:
      return { ...state, showAlertModal: true, alertModalMessage: action.payload };
    case actionTypes.HIDE_MODAL_MESSAGE:
      return { ...state, showAlertModal: false };

    case actionTypes.SHOW_REGISTER_MODAL:
      return { ...state, showRegisterModal: true };
    case actionTypes.HIDE_REGISTER_MODAL:
      return { ...state, showRegisterModal: false };

    case actionTypes.SHOW_QUICK_ORDER_CONFIRM_MODAL:
      return { ...state, showQuickOrderConfirmModal: true };
    case actionTypes.HIDE_QUICK_ORDER_CONFIRM_MODAL:
      return { ...state, showQuickOrderConfirmModal: false };

    case actionTypes.SHOW_ADD_TO_LIST_MODAL:
      return { ...state, addToListModal: { ...state.addToListModal, open: true, product: action.payload } };
    case actionTypes.HIDE_ADD_TO_LIST_MODAL:
      return { ...state, addToListModal: { ...state.addToListModal, open: false, product: null } };

    default:
      return state;
  }
};

export default alertsReducer;
