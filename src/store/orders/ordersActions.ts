import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import { RootState } from "@src/store";
import * as actionTypes from "./ordersTypes";

export const loadOrdersThunk = (a_page: number | string, a_pageSize: number | string, a_filters: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadOrdersStart());

    const page = parseInt(a_page.toString()) || 1;
    const pageSize = parseInt(a_pageSize.toString()) || 10;
    // const filters = a_filters;

    if (!a_filters || a_filters === "all") {
      // filters = ["Pending", "Being processed", "Complete", "co created", "co sent"];
    } else if (!Array.isArray(a_filters)) {
      // filters = [_.capitalize(a_filters)];
    }

    // const filters_query = `&filter_status=${filters.join("&filter_status=")}`;

    dispatch({
      types: actionTypes.LOAD_ORDERS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/orders/?page=${page}&page_size=${pageSize}`)
          .then((res) => res.data)
          .then((response: any) => {
            return dispatch(saveOrders(response));
          })
          .catch((error) => {
            console.log("ORDERS_ERROR", error);
            throw error;
          }),
    });
  };
};

export function getOrder(id: number): any {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.LOAD_ORDERS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`orders/${id}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***GET_ORDER_ERROR", e);
            throw e;
          }),
    });
  };
}

export function getOrderLines(id: number): any {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.LOAD_ORDERS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`orders/${id}/lines`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***GET_LINE_ERROR", e);
            throw e;
          }),
    });
  };
}

export function approveOrder(data: any, id: number) {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`orders/${id}`, { data })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***APPROVE_ORDER_ERROR", e);
            return e;
          }),
    });
  };
}

export function downloadFile(uid: string, type: "order" | "invoice") {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`orders/${uid}/invoice/?pdf=${type}`, { config: { responseType: "blob" } })
          .then((res) => {
            // FileDownload(res.data, `${orderNumber}-${type}.pdf`);
            return res.data;
          })
          .catch((e) => {
            console.log("***LOAD_INVOICE_ERROR", e);
            throw e;
          }),
    });
  };
}

export const loadOrdersStart = () => {
  return {
    type: actionTypes.LOAD_ORDERS_REQUEST,
  };
};

export const loadOrdersFinish = () => {
  return {
    type: actionTypes.LOAD_ORDERS_SUCCESS,
  };
};

export const saveOrders = (orders: actionTypes.Orders) => {
  return {
    type: actionTypes.SAVE_ORDERS,
    payload: orders,
  };
};

export const saveFilterStatus = (status: string) => {
  return {
    type: actionTypes.SAVE_FILTER_STATUS,
    payload: status,
  };
};

const returnAddressActionType = (first: any, second: any, isBillingAddress = false) => {
  let resultAction = "nothing";
  if (!first || !second) return resultAction;

  // addresses comparison
  const fieldsForChecking = [
    "first_name",
    "last_name",
    "line1",
    "line2",
    "line3",
    "line4",
    "state",
    "postcode",
    "phone_number_str",
    "notes",
    "is_default_for_shipping",
    "is_default_for_billing",
    "country",
    "company_name",
    "inn",
  ];
  fieldsForChecking.forEach((field) => {
    if (first[field] !== second[field]) {
      if (!["is_default_for_shipping", "is_default_for_billing", "notes"].includes(field)) {
        resultAction = "create";
      } else if (resultAction !== "create") {
        resultAction = "update";
      }
    }
  });
  if (resultAction === "create" && isBillingAddress) resultAction = "update";
  return resultAction;
};
export function AddressAction(address: any, isBillingAddress = false) {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { addressList } = getState().checkout;
    const actionType = returnAddressActionType(
      address,
      addressList?.find((i) => i.id === address?.id),
      isBillingAddress,
    );
    if (actionType === "create") return dispatch(newOrderAddress(address));
    if (actionType === "update") return dispatch(updateOrderAddress(address.id, address));
    return Promise.resolve({ data: address });
  };
}

const newOrderAddress = (data: any) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/profile/address/`, {
            data,
          })
          .then((res) => res)
          .catch((e) => {
            console.log("***CREATE_NEW_ORDER_ADDRESS_ERROR", e);
            return { data };
          }),
    });
  };
};

const updateOrderAddress = (id: number, data: any) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/useraddresses/${id}/`, {
            data,
          })
          .then((res) => res)
          .catch((e) => {
            console.log("***UPDATE_ORDER_ADDRESS_ERROR", e);
            return { data: { id } };
          }),
    });
  };
};
