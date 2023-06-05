import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./ordersTypes";

export const PATHNAME = "/orders";
const LOCAL_FILTER_STATUS = "orderStatus";

const initialState: actionTypes.OrdersState = {
  orders: {},
  ordersLoading: false,
  filterStatus: localStorage.getItem(LOCAL_FILTER_STATUS),
};

export default function orders(state = initialState, action: actionTypes.OrdersActions) {
  switch (action.type) {
    case actionTypes.SAVE_ORDERS:
      return updateObject(state, {
        orders: action.payload,
        ordersLoading: false,
      });
    case actionTypes.LOAD_ORDERS_REQUEST:
      return updateObject(state, { ordersLoading: true });
    case actionTypes.LOAD_ORDERS_SUCCESS:
      return updateObject(state, { ordersLoading: false });
    case actionTypes.LOAD_ORDERS_FAILED:
      return updateObject(state, { ordersLoading: false });
    case actionTypes.SAVE_FILTER_STATUS:
      localStorage.setItem(LOCAL_FILTER_STATUS, action.payload);
      return updateObject(state, { filterStatus: action.payload });
    default:
      return state;
  }
}
