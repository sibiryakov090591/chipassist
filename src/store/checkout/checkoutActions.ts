import { addCitiesApiUrl, removeHost } from "@src/utils/transformUrl";
import { batch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "@src/store";
import constants from "@src/constants/constants";
import { ID_ELFARO } from "@src/constants/server_constants";
import { progressModalError, progressModalSuccess } from "@src/store/progressModal/progressModalActions";
import { savePartNumberExamples } from "@src/store/search/searchActions";
import { getAuthToken } from "@src/utils/auth";
import * as actionTypes from "./checkoutTypes";
import { clearCart, clearCartItems, getCart } from "../cart/cartActions";
import ApiClient, { ApiClientInterface } from "../../services/ApiClient";
import { CheckoutActionTypes, CheckoutAddressErrors, CheckoutCardData, CheckoutCardErrors } from "./checkoutTypes";

const apiClient = new ApiClient();

export const openCheckout = (): CheckoutActionTypes => ({
  type: actionTypes.CHECKOUT_OPEN,
});

export const closeCheckout = (): CheckoutActionTypes => ({
  type: actionTypes.CHECKOUT_CLOSE,
});

export const clearCheckout = (): CheckoutActionTypes => ({
  type: actionTypes.CLEAR_CHECKOUT,
});

export const getUserAddressThunk = () => {
  return (dispatch: any) => {
    dispatch({
      types: actionTypes.GET_ADDRESS,
      promise: (client: ApiClientInterface) => client.get(`/useraddresses/?page_size=100`).then((res) => res.data),
    }).then((response: { results: any[] }) => {
      if (response.results.length) {
        const defaultShippingAddress =
          response.results.find((val) => val.is_default_for_shipping) ||
          response.results.sort((a, b) => b.id - a.id)[0];

        const defaultBillingAddress = response.results.sort((a, b) => a.id - b.id)[0];

        batch(() => {
          dispatch({ type: actionTypes.GET_ADDRESS, response });
          dispatch(fillAndSaveAddress(defaultShippingAddress));
          dispatch(fillAndSaveAddress(defaultBillingAddress, true));
        });
      }
    });
  };
};

export const fillAndSaveAddress = (data: any, isBilling = false) => (dispatch: any) => {
  dispatch({
    type: isBilling ? actionTypes.SAVE_BILLING_ADDRESS : actionTypes.SAVE_ADDRESS,
    payload: {
      id: data.id,
      title: data.title || "",
      inn: data.inn || "",
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      line1: data.line1 || "",
      line2: data.line2 || "",
      line3: data.line3 || "",
      line4: data.line4 || "",
      state: data.state || "",
      postcode: data.postcode || "",
      country: addCitiesApiUrl(data.country) || "",
      // phone_number: data.phone_number || "",
      phone_number_str: data.phone_number_str || "",
      company_name: data.company_name || "",
      notes: "",
      is_default_for_shipping: data.is_default_for_shipping,
      is_default_for_billing: data.is_default_for_billing,
    },
  });
};

export const saveBillingAddress = (data: any) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: actionTypes.SAVE_BILLING_ADDRESS,
      payload: data,
    });

    if (getState().checkout.shippingDuplicate) {
      dispatch({
        type: actionTypes.SAVE_ADDRESS,
        payload: data,
      });
    }
  };
};

export const saveShippingAddress = (data: any) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: actionTypes.SAVE_ADDRESS,
      payload: data,
    });

    if (getState().checkout.billingDuplicate) {
      dispatch({
        type: actionTypes.SAVE_BILLING_ADDRESS,
        payload: data,
      });
    }
  };
};

export const saveCardData = (data: CheckoutCardData): CheckoutActionTypes => ({
  type: actionTypes.SAVE_CARD_DATA,
  payload: data,
});

export const gotoNextStep = (): CheckoutActionTypes => ({
  type: actionTypes.GOTO_NEXT_STEP,
});

export const gotoPrevStep = (): CheckoutActionTypes => ({
  type: actionTypes.GOTO_PREV_STEP,
});

export const gotoStep = (step: number): CheckoutActionTypes => ({
  type: actionTypes.GOTO_STEP,
  payload: step,
});

export const switchShippingDuplicate = () => ({
  type: actionTypes.SWITCH_SHIPPING_DUPLICATE,
});

export const switchBillingDuplicate = () => ({
  type: actionTypes.SWITCH_BILLING_DUPLICATE,
});

export const quickOrderCheckoutThunk = (token = "") => {
  return (dispatch: any, getState: () => RootState) => {
    const { address, billingAddress } = getState().checkout;
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/checkout/`, {
            data: {
              token,
              payment: getState().checkout.isCardPay ? 1 : null,
              basket: getState().cart.info.url,
              total: getState().cart.info.total_incl_tax,
              shipping_charge: {
                currency: "EUR",
                excl_tax: "0",
                tax: "0",
              },
              shipping_method_code: "no-shipping-required",
              shipping_address: { ...address, line1: address.line1 || "address" },
              billing_address: { ...billingAddress, line1: billingAddress.line1 || "address" },
              set_shipping_address_default: getState().checkout.address.is_default_for_shipping,
            },
          })
          .then((res) => {
            dispatch(progressModalSuccess());
            localStorage.removeItem("progress_modal_data");
            dispatch(getCart());
            return res.data;
          })
          .catch((e) => {
            dispatch(progressModalError());
            console.log("***QUICK_ORDER_ERROR: ", e);
            throw e;
          }),
    });
  };
};

export const sendRequestThunk = (rfqList: any[], isQuickRequest = false, token: string = null) => {
  return (dispatch: any, getState: () => RootState) => {
    const cartItems = getState().cart.items;

    let params = "";
    const isShowQuickButton = localStorage.getItem("isShowQuickButton");
    if (isShowQuickButton && constants.id === ID_ELFARO)
      params += `?method_code=${isShowQuickButton === "true" ? "quick_button_showed" : "quick_button_hidden"}`;
    return dispatch({
      types: [actionTypes.CHECKOUT_START, actionTypes.CHECKOUT_PAY, actionTypes.CHECKOUT_ERROR],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/rfqs/list/${params}`, {
            data: { rfq_list: rfqList },
            config: { headers: { Authorization: `Token ${token || getAuthToken()}` } },
          })
          .then(async (res) => {
            rfqList.forEach((i) => {
              localStorage.setItem(i.part_number, JSON.stringify({ date: Date.now(), value: i.quantity }));
            });
            dispatch(clearCartItems());
            const promises: any = [];
            if (!isQuickRequest) {
              cartItems.forEach((item) => {
                promises.push(apiClient.delete(`/baskets/${getState().cart.info.id}/lines/${item.id}/`));
              });
              await Promise.all(promises);
            }
            // dispatch(showSuccess());
            return res.data;
          })
          .catch((e) => {
            dispatch(progressModalError());
            console.log("***CHECKOUT_BY_RFQ_ERROR: ", e);
            throw e;
          }),
    });
  };
};

export const payCheckoutThunk = (token = "") => {
  return (dispatch: any, getState: () => RootState) => {
    let params = "";
    const isShowQuickButton = localStorage.getItem("isShowQuickButton");
    if (isShowQuickButton && constants.id === ID_ELFARO)
      params += `?shipping_method_code=${isShowQuickButton === "true" ? "quick_button_showed" : "quick_button_hidden"}`;
    return dispatch({
      types: [actionTypes.CHECKOUT_START, actionTypes.CHECKOUT_PAY, actionTypes.CHECKOUT_ERROR],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/checkout/${params}`, {
            data: {
              token,
              payment: getState().checkout.isCardPay ? 1 : null,
              basket: getState().cart.info.url,
              // TODO::FIXME
              total: getState().cart.info.total_incl_tax,
              shipping_charge: {
                currency: "EUR",
                excl_tax: "0",
                tax: "0",
              },
              shipping_method_code: "no-shipping-required",
              // shipping_address: { ...address, line1: address.line1 || "address" },
              // billing_address: { ...billingAddress, line1: billingAddress.line1 || "address" },
              // set_shipping_address_default: getState().checkout.address.is_default_for_shipping,
            },
          })
          .then((res) => res.data)
          .then((response: Record<string, any>) => {
            if (response.errors) {
              dispatch(
                updateCardErrors({
                  ...getState().checkout.cardErrors,
                  apiServerError: getErrorMessage(response.errors),
                }),
              );
              if (response.number) dispatch(saveOrderId(response.number));
              if (response.invoice) dispatch(saveInvoiceUrl(`${response.invoice}`));
            } else {
              getState().cart.items.forEach((i) => {
                localStorage.setItem(i.product.upc, JSON.stringify({ date: Date.now(), value: i.quantity }));
              });
              dispatch(clearCart());
              dispatch(getCart());
              dispatch(getUserAddressThunk());
              dispatch(resetCheckout());
              dispatch(showSuccess());
              if (response.number) dispatch(saveOrderId(response.number));
              if (response.invoice) dispatch(saveInvoiceUrl(`${response.invoice}`));
            }
            return response;
          })
          .catch((e) => {
            let error;
            const { orderId } = getState().checkout;
            if (orderId) {
              dispatch(postPaymentThunk(token, orderId));
            }

            if (typeof e.response.data === "string") {
              error = e.response.data;
              console.log("***CHECKOUT_ERROR: ", error);
              return { errorMessage: error, apiStatus: e.response.status };
            }
            if (e.response.data?.errors) {
              error = e.response.data.errors;
              console.log("***CHECKOUT_ERROR: ", error);
              return { errorMessage: error, apiStatus: e.response.status };
            }
            if (e.response.data && (Object.values(e.response.data) as any)[0][0].message) {
              error = (Object.values(e.response.data) as any)[0][0].message;
              console.log("***CHECKOUT_ERROR: ", error);
              return { errorMessage: error, apiStatus: e.response.status };
            }

            throw error;
          }),
    });
  };
};

export const sendRequestInvoice = () => {
  return (dispatch: any, getState: () => RootState) => {
    dispatch({
      types: [null, actionTypes.CHECKOUT_PAY, actionTypes.CHECKOUT_ERROR],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/checkout/?rfq=1`, {
            data: {
              basket: getState().cart.info.url,
              total: getState().cart.info.total_incl_tax,
              shipping_charge: {
                currency: "EUR",
                excl_tax: "0",
                tax: "0",
              },
              shipping_method_code: "no-shipping-required",
              // shipping_address: getState().checkout.address,
              // billing_address: getState().checkout.billingAddress,
              set_shipping_address_default: getState().checkout.address.is_default_for_shipping,
            },
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***CHECKOUT_PAY_ERROR", e);
            throw e;
          }),
    }).then((response: Record<string, any>) => {
      if (response.errors) {
        dispatch(
          updateCardErrors({
            ...getState().checkout.cardErrors,
            apiServerError: getErrorMessage(response.errors),
          }),
        );
        dispatch(saveOrderId(response.number));
        dispatch(saveInvoiceUrl(`${response.invoice}`));
      } else {
        dispatch(clearCart());
        dispatch(getCart());
        dispatch(getUserAddressThunk());
        dispatch(resetCheckout());
        dispatch(showSuccess());
        dispatch(saveOrderId(response.number));
        dispatch(saveInvoiceUrl(`${response.invoice}`));
      }
    });
  };
};

export const postPaymentThunk = (token: string, orderId: number | string) => {
  return (dispatch: any, getState: () => RootState) => {
    dispatch({
      types: actionTypes.CHECKOUT_PAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/orders/${orderId}/payment/`, {
            data: { token },
          })
          .then((res) => res.data),
    })
      .then((response: Record<string, any>) => {
        if (response.status === "OK") {
          dispatch(clearCart());
          dispatch(getCart());
          dispatch(resetCheckout());
          dispatch(showSuccess());
        }
      })
      .catch((error: any) => {
        dispatch(
          updateCardErrors({
            ...getState().checkout.cardErrors,
            apiServerError: getErrorMessage(error),
          }),
        );
        console.log("***CHECKOUT_PAY_ERROR", error);
        throw error;
      });
  };
};

export const cancelInvoice = (orderId: string | number) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.CANCEL_INVOICE,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/orders/${orderId}/`, {
            data: { status: "Cancelled" },
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***CANCEL_INVOICE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getInvoicePageThunk = (url: string): any => {
  return () => {
    return apiClient.get(url).catch((e) => {
      console.log("***GET_INVOICE_PAGE_ERROR", e);
      throw e;
    });
  };
};

export const saveInvoiceUrl = (url: string): CheckoutActionTypes => ({
  type: actionTypes.SAVE_INVOICE_URL,
  payload: removeHost(url),
});

export const saveOrderId = (orderId: string): CheckoutActionTypes => ({
  type: actionTypes.SAVE_ORDER_ID,
  payload: orderId,
});

export const updateAddressErrors = (errors: CheckoutAddressErrors): CheckoutActionTypes => ({
  type: actionTypes.UPDATE_ADDRESS_ERRORS,
  payload: errors,
});

export const updateBillAddressErrors = (errors: CheckoutAddressErrors): CheckoutActionTypes => ({
  type: actionTypes.UPDATE_BILL_ADDRESS_ERRORS,
  payload: errors,
});

export const updateCardErrors = (errors: CheckoutCardErrors): CheckoutActionTypes => ({
  type: actionTypes.UPDATE_CARD_ERRORS,
  payload: errors,
});

export const resetCheckout = (): CheckoutActionTypes => ({
  type: actionTypes.RESET_CHECKOUT,
});

export const showSuccess = (): CheckoutActionTypes => ({
  type: actionTypes.SHOW_SUCCESS,
});

export const hideSuccess = (): CheckoutActionTypes => ({
  type: actionTypes.HIDE_SUCCESS,
});

export const saveCanSkip = (canSkip: boolean): CheckoutActionTypes => ({
  type: actionTypes.SAVE_CAN_SKIP,
  payload: canSkip,
});

export const switchSkipOnlinePay = (): CheckoutActionTypes => ({
  type: actionTypes.SWITCH_SKIP_ONLINE_PAY,
});

export const setCardPay = (value: boolean): CheckoutActionTypes => ({
  type: actionTypes.SET_CARD_PAY,
  payload: value,
});

export const setServiceTax = (value: number): CheckoutActionTypes => ({
  type: actionTypes.SET_SERVICE_TAX,
  payload: value,
});

export const getServiceTax = () => (dispatch: any) => {
  return dispatch({
    types: [null, null, null],
    promise: (client: ApiClientInterface) =>
      client
        .get(`apiv2/taxes/?page_size=500`, {
          noapi: true,
        })
        .then((res) => res?.data)
        .then((response) => {
          dispatch(savePartNumberExamples(response.upcs || []));
          return dispatch(setServiceTax(response.tax || 0));
        })
        .catch((e) => {
          console.log("***GET_TAXES_ERROR", e);
          throw e;
        }),
  });
};

const getErrorMessage = (error: string): string => {
  const res = error.match(/(Message: ).*/);

  if (!!res && !!res.length) {
    const dotIndex = res[0].indexOf(".");
    return dotIndex ? res[0].substring(0, dotIndex).substring(9) : res[0];
  }

  return "Error";
};
