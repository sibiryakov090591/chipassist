import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./productTypes";

export const loadProductById = (productId: number | string, params: { [key: string]: any } = {}) => {
  let param = "";
  Object.entries(params).forEach((v) => {
    if (v[1] !== null) param += `${!param ? "?" : "&"}${v[0]}=${v[1]}`;
  });
  return {
    types: actionTypes.LOAD_PRODUCT_BY_ID_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`/products/${productId}${param}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_PRODUCT_BY_ID_ERROR", e);
          throw e;
        }),
  };
};

export const loadStockrecordById = (id: number | string, params: { [key: string]: any } = {}) => {
  let param = "";
  Object.entries(params).forEach((v) => {
    if (v[1] !== null) param += `${!param ? "?" : "&"}${v[0]}=${v[1]}`;
  });
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/products/stockrecords/${id}${param}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_STOCKRECORD_BY_ID_ERROR", e);
          throw e;
        }),
  };
};

export const loadProductsRfqData = (query: string, page: number, pageSize: number, orderBy: string = null) => (
  dispatch: any,
) => {
  const orderParam = orderBy ? `&order_by=${orderBy}` : "";
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`apiv2/search/rfq/?search=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}${orderParam}`, {
          noapi: true,
        })
        .then((res) => {
          if (res?.data?.results) dispatch(saveProductsRfqData(res.data));
          return res.data;
        })
        .catch((e) => {
          console.log("***LOAD_PRODUCTS_RFQS_DATA_ERROR", e);
          throw e;
        }),
  });
};

export const saveProducts = (data: actionTypes.ProductStateItem[]): actionTypes.SaveProducts => {
  return {
    type: actionTypes.SAVE_PRODUCTS,
    payload: data,
  };
};

export const clearProducts = () => ({ type: actionTypes.CLEAR_PRODUCTS });

export const saveProductsRfqData = (data: actionTypes.RfqProductData): actionTypes.SaveRfqs => {
  return {
    type: actionTypes.SAVE_RFQS,
    payload: data,
  };
};

export const clearProductsRfqData = (): actionTypes.ClearRfqs => ({ type: actionTypes.CLEAR_RFQS });

export const loadStockListIds = () => {
  return {
    types: [false, actionTypes.LOAD_STOCK_LIST_S, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/products/stocklist/`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_STOCK_LIST_ERROR", e);
          throw e;
        }),
  };
};

export const getProductLink = (productId: number, sellerId: number) => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/redirect/${productId}/${sellerId}/`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_PRODUCT_LINK_ERROR", e);
          throw e;
        }),
  };
};

export const SetProductIntoViewport = (productId: number): actionTypes.SetProductIntoViewport => {
  return {
    type: actionTypes.SET_PRODUCT_INTO_VIEWPORT,
    payload: productId,
  };
};

export const ShowProductRequestHint = () => {
  return {
    type: actionTypes.SHOW_PRODUCT_REQUEST_HINT,
  };
};

export const DisableProductRequestHint = () => {
  localStorage.setItem("product_request_hint_disabled", "true");
  return {
    type: actionTypes.DISABLE_PRODUCT_REQUEST_HINT,
  };
};
