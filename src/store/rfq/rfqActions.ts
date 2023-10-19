import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
// import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { RootState } from "@src/store";
import {
  progressModalError,
  progressModalOpen,
  progressModalSuccess,
} from "@src/store/progressModal/progressModalActions";
import constants from "@src/constants/constants";
import { ID_ELFARO } from "@src/constants/server_constants";
import { getAuthToken } from "@src/utils/auth";
import { Stockrecord, Product } from "@src/store/products/productTypes";
import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";
import { shouldUpdateCard } from "@src/store/common/commonActions";
import * as actionTypes from "./rfqTypes";
import { NewRfqItem, RfqActionTypes } from "./rfqTypes";

// const apiClient = new ApiClient();
// const { t } = staticI18n("rfq");
const FileDownload = require("js-file-download");

export const exportSupplierRfqs = (all: boolean, days: number, sellerId: number) => (dispatch: Dispatch<any>) => {
  if (!sellerId) return false;
  const dateFrom = Date.now() - 1000 * 60 * 60 * 24 * (days - 1);
  const dateFormat = new Date(dateFrom).toISOString().slice(0, 10);
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(
          `/rfqs/sellers?seller_id=${sellerId}&all=${all ? "TRUE" : "FALSE"}&date_from=${dateFormat}&is_export=TRUE`,
          {
            config: { responseType: "blob" },
          },
        )
        .then((res) => {
          FileDownload(res.data, `ChipAssist_RFQs.xls`);
        })
        .catch((e) => {
          console.log("***EXPORT_SUPPLIER_REQUESTS_ERROR", e);
          throw e;
        }),
  });
};

export const importSupplierRfqs = (sellerId: number, file: Blob) => (dispatch: Dispatch<any>) => {
  if (!sellerId) return false;
  const data = new FormData();
  data.append("seller", `${sellerId}`);
  data.append("file", file);
  return dispatch({
    types: [actionTypes.LOAD_RFQ_R, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .put(`/rfqs/response/parse`, {
          data,
        })
        .then((res) => {
          dispatch(clearSupplierResponseData());
          dispatch(
            showBottomLeftMessageAlertAction({
              text: "Thank you! Your response was sent successfully.",
              severity: "success",
            }),
          );
          return res.data;
        })
        .catch((e) => {
          console.log("***IMPORT_SUPPLIER_REQUESTS_ERROR", e);
          throw e;
        }),
  });
};

export const getSupplierRfqs = (
  page = 1,
  pageSize = 15,
  all: boolean,
  days: number,
  sellerId: number | false,
  hasResponse: boolean,
) => (dispatch: Dispatch<any>) => {
  const dateFrom = Date.now() - 1000 * 60 * 60 * 24 * (days - 1); // last days
  const dateFormat = new Date(dateFrom).toISOString().slice(0, 10);
  return dispatch({
    types: actionTypes.LOAD_RFQ,
    promise: (client: ApiClientInterface) =>
      client
        .get(
          `/rfqs/sellers?seller_id=${sellerId || "FALSE"}&page=${page}&page_size=${pageSize}&all=${
            all ? "TRUE" : "FALSE"
          }&date_from=${dateFormat}&has_response=${hasResponse}`,
          { cancelId: "load_supplier_requests" },
        )
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_SUPPLIER_REQUESTS_ERROR", e);
          throw e;
        }),
  });
};

export const saveResponse = (item: actionTypes.ResponseItem) => {
  return {
    type: actionTypes.SAVE_RFQ_RESPONSE,
    payload: item,
  };
};

export const clearSupplierResponseData = () => {
  return {
    type: actionTypes.CLEAR_SUPPLIER_RESPONSE_DATA,
  };
};

export const sendRfqsResponse = (sellerId: number) => (dispatch: any, getState: () => RootState) => {
  if (!sellerId) return false;
  const data: any = {};
  Object.values(getState().rfq.rfqResponseData).forEach((rfq) => {
    let comment = rfq.comment.trim();
    if (rfq.other_manufacturer_name)
      comment = `${comment ? `${comment}; ` : ""}Manufacturer name: ${rfq.other_manufacturer_name}`;
    data[rfq.part_number] = {
      price: rfq.price,
      stock: Number(rfq.stock || 0),
      lead_time: rfq.lead_time,
      datecode: rfq.datecode.trim(),
      comment,
      alter_upc: rfq.alter_upc?.trim() || "",
      currency: rfq.currency,
      id: rfq.id,
      manufacturer_id: rfq.selected_manufacturer?.id || null,
    };
  });
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/response/`, {
          data: {
            seller: sellerId,
            data,
          },
        })
        .then((res) => {
          dispatch(clearSupplierResponseData());
          dispatch(
            showBottomLeftMessageAlertAction({
              text: "Thank you! Your response was sent successfully.",
              severity: "success",
            }),
          );
          return res.data;
        })
        .catch((e) => {
          console.log("***SEND_SELLER_RESPONSE_ERROR", e);
          throw e;
        }),
  });
};

export const loadRfq = (page = 1, pageSize = 15, orderBy: string = null, sellersRfq = false, showAll = false) => (
  dispatch: Dispatch<any>,
) => {
  let url: string;
  let params = `?page_size=${pageSize}&page=${page}`;
  if (orderBy) {
    params = `${params}&order_by=${orderBy}`;
  }
  if (sellersRfq) {
    url = `/rfqs/sellers/${params}`;
    if (!showAll) {
      url = `${url}&response_empty=TRUE`;
    }
  } else {
    url = `/rfqs/${params}`;
  }
  dispatch({
    types: actionTypes.LOAD_RFQ,
    promise: (client: ApiClientInterface) =>
      client
        .get(url)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_RFQ_ERROR", e);
          throw e;
        }),
  });
};

export const setRfqItem = (item: NewRfqItem): RfqActionTypes => {
  return {
    type: actionTypes.SET_ITEM,
    payload: item,
  };
};

export const removeRfqResponse = (id: number): RfqActionTypes => {
  return {
    type: actionTypes.REMOVE_RFQ_RESPONSE,
    payload: id,
  };
};

export const saveRfqItem = (rfq: { [key: string]: any }, token: string = null) => (dispatch: any) => {
  const data: { [key: string]: any } = {};
  Object.entries(rfq).forEach((v) => {
    const [key, value] = v;
    if (value) data[key] = typeof value === "string" ? value.trim() : value;
  });
  let params = "";
  const isShowQuickButton = localStorage.getItem("isShowQuickButton");
  if (isShowQuickButton && constants.id === ID_ELFARO)
    params += `?method_code=${isShowQuickButton === "true" ? "quick_button_showed" : "quick_button_hidden"}`;
  return dispatch({
    types: actionTypes.SAVE_RFQ_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/list/${params}`, {
          data: { rfq_list: [data] },
          config: { headers: { Authorization: `Token ${token || getAuthToken()}` } },
        })
        .then((res) => {
          dispatch(progressModalOpen());
          dispatch(progressModalSuccess());

          localStorage.setItem(
            data.productId || "RFQ_from_empty_search",
            JSON.stringify({ date: Date.now(), value: data.quantity }),
          );
          if (data.productId) {
            dispatch(shouldUpdateCard());
          }
          return res.data;
        })
        .catch((e) => {
          dispatch(progressModalOpen());
          dispatch(progressModalError(e.response?.data?.errors ? e.response.data.errors[0].error : ""));
          console.log("***SAVE_RFQ_ERROR", e);
          throw e;
        }),
  });
};

export const saveRfqItemFromBom = (data: any) => (dispatch: any) => {
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/`, { data })
        .then((res) => {
          localStorage.setItem("before_unload_alert_disabled", "true");
          localStorage.setItem("product_request_hint_disabled", "true");
          return res.data;
        })
        .catch((e) => {
          console.log("***SAVE_RFQ_FROM_BOM_ERROR", e);
          throw e;
        }),
  });
};

export const saveRfqListItems = (data: any, token: string = null, disableProgressModal = false) => (dispatch: any) => {
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/list/`, {
          data: { rfq_list: data },
          config: { headers: { Authorization: `Token ${token || getAuthToken()}` } },
        })
        .then((res) => {
          localStorage.setItem("before_unload_alert_disabled", "true");
          localStorage.setItem("product_request_hint_disabled", "true");
          if (!disableProgressModal) {
            dispatch(progressModalOpen());
            dispatch(progressModalSuccess());
          }
          return res.data;
        })
        .catch((e) => {
          if (!disableProgressModal) {
            dispatch(progressModalOpen());
            dispatch(progressModalError(e.response?.data?.errors ? e.response.data.errors[0].error : ""));
          }
          console.log("***SAVE_RFQ_LIST_ERROR", e);
          throw e;
        }),
  });
};

export const sendSellerMessage = (item: { [key: string]: any }, token: string = null) => (dispatch: any) => {
  const data: { [key: string]: any } = {};
  Object.entries(item).forEach((v) => {
    const [key, value] = v;
    if (value) data[key] = typeof value === "string" ? value.trim() : value;
  });

  return dispatch({
    types: actionTypes.SEND_SELLER_MESSAGE_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/list/?message=true`, {
          data: { rfq_list: [data] },
          config: { headers: { Authorization: `Token ${token || getAuthToken()}` } },
        })
        .then((res) => {
          localStorage.setItem("before_unload_alert_disabled", "true");
          localStorage.setItem("product_request_hint_disabled", "true");
          dispatch(progressModalOpen());
          dispatch(progressModalSuccess());
          return res.data;
        })
        .catch((e) => {
          dispatch(progressModalOpen());
          dispatch(progressModalError(e.response?.data?.errors ? e.response.data.errors[0].error : ""));
          console.log("***SEND_SELLER_MESSAGE_ERROR", e);
          throw e;
        }),
  });
};

export const clearRfqItem = (): RfqActionTypes => {
  return {
    type: actionTypes.CLEAR_ITEM,
  };
};

export const rfqModalOpen = (
  partNumber = "",
  quantity: string | number = "",
  stockrecord: Stockrecord = null,
  price: string = null,
  currency: CurrenciesAllowed = null,
  product: Product = null,
  title: "rfq" | "order" = "rfq",
  productId = 0,
): RfqActionTypes => {
  return {
    type: actionTypes.MODAL_OPEN,
    payload: { partNumber, productId, quantity, title, stockrecord, price, currency, product },
  };
};

export const setSellerMessageData = (
  open: boolean,
  partNumber: string,
  sellerId: number,
  sellerName: string,
  stockrecordId: number,
): RfqActionTypes => {
  return {
    type: actionTypes.SELLER_MESSAGE_MODAL_OPEN,
    payload: { open, partNumber, sellerId, sellerName, stockrecordId },
  };
};

export const sellerMessageModalClose = (): RfqActionTypes => {
  return {
    type: actionTypes.SELLER_MESSAGE_MODAL_CLOSE,
  };
};

export const setRFQQueryUpc = (payload = ""): RfqActionTypes => {
  return {
    type: actionTypes.SET_QUERY_UPC,
    payload,
  };
};

export const rfqModalClose = (): RfqActionTypes => {
  return {
    type: actionTypes.MODAL_CLOSE,
  };
};

export const rfqResponse = (rfqId: number, price: string, validDate: string, sellerId: string) => (dispatch: any) => {
  return dispatch({
    types: actionTypes.RFQ_RESPONSE,
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/response/${rfqId}/`, {
          data: { price, valid_date: validDate, seller: sellerId },
        })
        .then((res) => res.data),
  })
    .then((res: any) => {
      dispatch(
        showBottomLeftMessageAlertAction({
          text: "Your response was sent successfully.",
          severity: "success",
        }),
      );
      return res;
    })
    .catch((e: any) => {
      console.log("***RFQ_RESPONSE_ERROR", e);
      throw e;
    });
};

export const clearRfqResponse = (): RfqActionTypes => {
  return {
    type: actionTypes.CLEAR_RFQ_RESPONSE,
  };
};

export const approveResponse = (rfqId: number, sellerId: string) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: actionTypes.APPROVE_RESPONSE,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/rfqs/${rfqId}/`, {
          data: { approved: sellerId },
        })
        .then((res) => res.data)
        .catch((e: any) => {
          console.log("***APPROVE_RESPONSE_ERROR", e);
          throw e;
        }),
  });
};

export const deleteRfqFromStore = (rfqId: number): RfqActionTypes => {
  return {
    type: actionTypes.DELETE_RFQ_FROM_STORE,
    payload: rfqId,
  };
};

export const rfqUpdate = (rfq: actionTypes.RfqItem, data: any) => (dispatch: any) => {
  return dispatch({
    types: actionTypes.RFQ_UPDATE,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/rfqs/${rfq.id}/`, {
          data: {
            quantity: rfq.quantity,
            ...data,
          },
        })
        .then((res) => res.data)
        .then((res: any) => {
          dispatch({ type: actionTypes.UPDATE_ITEM, payload: { id: rfq.id, data } });
          return res;
        })
        .catch((e: any) => {
          console.log("***RFQ_UPDATE_ERROR", e);
          throw e;
        }),
  });
};

export const deleteRfqThunk = (id: number) => {
  return (dispatch: any) => {
    dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) => client.delete(`/rfqs/${id}/`).then((res) => res.data),
    })
      .then(() => {
        dispatch({ type: actionTypes.RFQS_NEED_UPDATE });
      })
      .catch((e: any) => {
        console.log("***RFQ_DELETE_ERROR", e);
        throw e;
      });
  };
};
