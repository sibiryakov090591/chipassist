import { batch } from "react-redux";
import { isCartEnabled } from "@src/constants/common";
import { getCart } from "@src/store/cart/cartActions";
import { getUserAddressThunk, saveCanSkip, sendRequestThunk } from "@src/store/checkout/checkoutActions";
import { ApiClientInterface } from "@src/services/ApiClient";
import { RootState } from "@src/store";
import { Dispatch } from "redux";
import checkIsAuthenticated, { getAuthToken, removeAuthToken, setAuthToken } from "@src/utils/auth";
import { saveRfqItem, saveRfqListItems, sendQualityCheck, sendSellerMessage } from "@src/store/rfq/rfqActions";
import { updatePrevEmail } from "@src/store/profile/profileActions";
// import { CurrencyPrice } from "@src/store/common/commonTypes";
import {
  progressModalOpen,
  progressModalSetPartNumber,
  progressModalSuccess,
  saveRequestToLocalStorage,
  progressModalClose,
} from "@src/store/progressModal/progressModalActions";
import { LocalStorageItem } from "@src/store/progressModal/progressModalTypes";
import { savePcbModalItem } from "@src/store/pcb/pcbActions";
import { loadMiscAction, deleteMiscAction } from "@src/store/misc/miscActions";
import { NavigateFunction } from "react-router-dom";
import * as actionTypes from "./authTypes";
import * as cartActionTypes from "../cart/cartTypes";
import { AuthActionTypes } from "./authTypes";

export const defaultRegisterData: { [key: string]: any } = {
  email: "",
  first_name: "",
  last_name: "",
  company_name: "",
  inn: "",
  phone_number_str: "",
  line1: "",
  line2: "",
  country: "",
  company_variant: "end_user",
  policy_confirm: false,
  conditions_confirm: false,
  reseller_terms_confirm: false,
  field_of_business: "",
  receive_updates_confirm: false,
  line4: "",
};

export const authStart = (): AuthActionTypes => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const saveRegisterData = (data: any): AuthActionTypes => {
  return {
    type: actionTypes.SAVE_REGISTER_DATA,
    payload: data,
  };
};

export const authSuccess = (token: string = null): AuthActionTypes => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authFail = (error: any): AuthActionTypes => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return (dispatch: any) => {
    removeAuthToken();
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("pk");
    localStorage.removeItem("last_login");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    sessionStorage.removeItem("profile_refreshed");

    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
    dispatch({
      type: cartActionTypes.CLEAR_CART,
    });
  };
};

export function authMiscAction() {
  return {
    types: [actionTypes.AUTH_MISC_R, actionTypes.AUTH_MISC_S, actionTypes.AUTH_MISC_F],
    promise: (client: ApiClientInterface) =>
      client
        .get("/misc/")
        .then((res) => res.data)
        .catch((error) => {
          console.log("***AUTH_MISC_ERROR", error);
          throw error;
        }),
  };
}

export function authMiscPkAction(pk: string) {
  return {
    types: [actionTypes.AUTH_MISC_PK_R, actionTypes.AUTH_MISC_PK_S, actionTypes.AUTH_MISC_PK_F],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/misc/${pk}/`)
        .then((res) => res.data)
        .catch((error) => {
          console.log("***AUTH_MISC_ERROR", error);
          throw error;
        }),
  };
}

export const loginAction = (username: string, password: string) => {
  return {
    types: [actionTypes.LOGIN_R, actionTypes.LOGIN_S, actionTypes.LOGIN_F],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/login/`, { data: { username, password } })
        .then((res) => res.data)
        .catch((error) => {
          console.log("***AUTH_MISC_ERROR", error);
          throw error;
        }),
  };
};

export const loginAsAction = (email: string) => {
  return {
    types: [actionTypes.LOGIN_R, actionTypes.LOGIN_S, actionTypes.LOGIN_F],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/login-as/`, { data: { email } })
        .then((res) => res.data)
        .catch((error) => {
          console.log("***LOGIN_AS_ERROR", error);
          throw error;
        }),
  };
};

export const loginThunk = (username: string, password: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loginAction(username, password));
  };
};

export const logoutThunk = () => {
  return {
    types: [false, actionTypes.AUTH_LOGOUT_S, false],
    promise: (client: ApiClientInterface) =>
      client
        .get("/logout/")
        .then((res) => res.data)
        .catch((error) => {
          console.log("***LOGIN_AS_ERROR", error);
          throw error;
        }),
  };
};

export const saveValidData = (data: Record<string, any>): AuthActionTypes => {
  return {
    type: actionTypes.SAVE_VALID_DATA,
    payload: data,
  };
};

export const saveEmailAction = (email: string): AuthActionTypes => {
  return {
    type: actionTypes.SAVE_EMAIL,
    payload: email,
  };
};

export function authLoginAction(data: any) {
  return {
    types: [actionTypes.AUTH_LOGIN_R, actionTypes.AUTH_LOGIN_S, actionTypes.AUTH_LOGIN_F],
    promise: (client: ApiClientInterface) =>
      client
        .post("/auth_token/", { data })
        .then((res) => res.data)
        .catch((error) => {
          console.log("***AUTH_LOGIN_ERROR", error);
          throw error;
        }),
  };
}

export const authLogin = (data: any) => {
  return (dispatch: any) => {
    dispatch(authStart());
    return dispatch(authLoginAction(data))
      .then((res: any) => {
        batch(() => {
          console.log("AUTH RES", res);
          const { token } = res;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 100);
          const prev_user_email = localStorage.getItem("prev_user_email");
          if (prev_user_email !== data.email) {
            removeAuthToken();
            localStorage.removeItem("expirationDate");
            localStorage.removeItem("email");
            localStorage.removeItem("prev_user_email");
          }
          setAuthToken(token);
          localStorage.setItem("expirationDate", expirationDate.toString());
          localStorage.setItem("email", data.email);
          dispatch(updatePrevEmail(data.email));
          return dispatch(authSuccess(token));
        });
      })
      .catch((err: any) => {
        dispatch(authFail(err));
      });
  };
};

export function authSignupAction(data: any, requestParams: { [key: string]: any } = {}) {
  let params = "";
  if (requestParams) {
    Object.entries(requestParams).forEach((item) => {
      const [key, val] = item;
      params += `${params ? "&" : "?"}${key}=${val}`;
    });
  }
  return {
    types: [actionTypes.AUTH_SIGNUP_R, actionTypes.AUTH_SIGNUP_S, actionTypes.AUTH_SIGNUP_F],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/auth_register/${params}`, { data })
        .then((res) => res.data)
        .catch((err) => {
          console.log("***AUTH_SIGNUP_ERROR", err);
          return err.response;
        }),
  };
}

export const authSignup = (data: any, params: { [key: string]: any } = {}) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(authStart());
    dispatch(saveRegisterData(data));
    return dispatch(
      authSignupAction(
        { ...data, ...(getState().profile.geolocation && { geolocation: getState().profile.geolocation }) },
        { ...params, ...getState().common.utm },
      ),
    );
  };
};

export const authCheckState = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const token = getAuthToken();

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        console.log("saveEmailAction", getState().auth.email);
        dispatch(saveEmailAction(localStorage.getItem("email")));

        dispatch(getUserAddressThunk());
      }
    }
    if (isCartEnabled) dispatch(getCart());
  };
};

export function authMiscThunk() {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const isAuthenticated = !!getState().auth.token;

    if (isAuthenticated) {
      dispatch(authMiscAction());
    } else {
      setTimeout(() => {
        dispatch(authMiscThunk());
      }, 1000);
    }
  };
}

export function authUserProfile() {
  return (dispatch: any) => {
    dispatch({
      types: [actionTypes.AUTH_PROFILE_R, actionTypes.AUTH_PROFILE_S, actionTypes.AUTH_PROFILE_F],
      promise: (client: ApiClientInterface) =>
        client
          .get("/profile/0/")
          .then((res) => res.data)
          .catch((err) => {
            console.log("***AUTH_PROFILE_ERROR", err);
            throw err;
          }),
    }).then((response: any) => {
      dispatch(saveCanSkip(response.can_skip));
    });
  };
}

export const sendQuickRequestUnAuth = (item: any, token: string, email: string) => (dispatch: any) => {
  if (item && token) {
    dispatch(
      progressModalSetPartNumber(
        item.partNumber || item.part_number || `${item.rfq_list[0].part_number}, ...`,
        item.requestType,
      ),
    );
    switch (item.requestType) {
      case "rfq": {
        dispatch(progressModalOpen());
        const { sellersMessages, ...rfqData } = item;
        if (sellersMessages?.length) {
          sellersMessages.forEach((messageData: any) => dispatch(sendSellerMessage(messageData, token)));
        }
        return dispatch(saveRfqItem(rfqData, token)).then(() => {
          dispatch(deleteMiscAction("not_activated_request", email));
          localStorage.removeItem("progress_modal_data");
        });
      }
      case "rfq_list": {
        dispatch(progressModalOpen());
        return dispatch(saveRfqListItems(item.rfq_list, token)).then(() => {
          dispatch(deleteMiscAction("not_activated_request", email));
          localStorage.removeItem("progress_modal_data");
        });
      }
      case "order": {
        dispatch(progressModalOpen());
        dispatch(sendRequestThunk(item.rfqList, true, token)).then(() => {
          dispatch(deleteMiscAction("not_activated_request", email));

          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "sellerMessage": {
        dispatch(progressModalOpen());
        return dispatch(sendSellerMessage(item, token)).then(() => {
          dispatch(deleteMiscAction("not_activated_request", email));
          localStorage.removeItem("progress_modal_data");
        });
      }
      case "qualityCheck": {
        dispatch(progressModalOpen());
        return dispatch(sendQualityCheck(item, token)).then(() => {
          dispatch(deleteMiscAction("not_activated_request", email));
          localStorage.removeItem("progress_modal_data");
        });
      }
      case "pcb": {
        dispatch(progressModalOpen());
        const data: any = item;
        const formData = new FormData();
        formData.append("part_number", "part_number");
        Object.keys(item).map((name) => {
          if (typeof data[name] !== "boolean" && !data[name]) return false;
          if (name === "x_out") {
            formData.append("xout", data[name] === "Accept" ? "1" : "0");
            return true;
          }
          // if (name === "seller") {
          //   data[name].map((val) => formData.append("seller", val));
          //   return true;
          // }
          if (name === "file") {
            // data[name].forEach((val: Blob) => formData.append(`file[]`, val));
            return true;
          }
          formData.append(name, data[name]);
          return true;
        });
        return dispatch(savePcbModalItem(formData, null, token)).then(() => {
          dispatch(progressModalSuccess());
          dispatch(deleteMiscAction("not_activated_request", email));
          localStorage.removeItem("progress_modal_data");
        });
      }
      default:
        return Promise.reject();
    }
  }
  return Promise.reject();
};

export const sendQuickRequest = () => (dispatch: any) => {
  const item: LocalStorageItem =
    localStorage.getItem("progress_modal_data") && JSON.parse(localStorage.getItem("progress_modal_data"));
  if (item) {
    dispatch(progressModalSetPartNumber(item.partNumber || item.data?.partNumber, item.requestType));
    switch (item.requestType) {
      case "rfq": {
        dispatch(progressModalOpen());
        const { sellersMessages, ...rfqData } = item.data;
        if (sellersMessages?.length) {
          sellersMessages.forEach((messageData: any) => dispatch(sendSellerMessage(messageData)));
        }
        dispatch(saveRfqItem(rfqData)).then(() => {
          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "rfq_list": {
        dispatch(progressModalOpen());
        dispatch(saveRfqListItems(item.data)).then(() => {
          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "sellerMessage": {
        dispatch(progressModalOpen());
        dispatch(sendSellerMessage(item.data)).then(() => {
          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "qualityCheck": {
        dispatch(progressModalOpen());
        dispatch(sendQualityCheck(item.data)).then(() => {
          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "pcb": {
        dispatch(progressModalOpen());
        const { data } = item;
        const formData = new FormData();
        formData.append("part_number", "part_number");
        Object.keys(data).map((name) => {
          if (typeof data[name] !== "boolean" && !data[name]) return false;
          if (name === "x_out") {
            formData.append("xout", data[name] === "Accept" ? "1" : "0");
            return true;
          }
          // if (name === "seller") {
          //   data[name].map((val) => formData.append("seller", val));
          //   return true;
          // }
          if (name === "file") {
            // data[name].forEach((val: Blob) => formData.append(`file[]`, val));
            return true;
          }
          formData.append(name, data[name]);
          return true;
        });
        dispatch(savePcbModalItem(formData)).then(() => {
          dispatch(progressModalSuccess());
          localStorage.removeItem("progress_modal_data");
        });
        break;
      }
      case "order": {
        dispatch(progressModalOpen());
        dispatch(sendRequestThunk(item?.data?.rfqList, true)).then(() => {
          dispatch(progressModalClose());
        });
        break;
      }

      default:
        break;
    }
  }
};

export const login = (
  data: { email: string; username?: string; password?: string },
  token: string,
  navigate: NavigateFunction,
  location: { [key: string]: string } = null,
  // currencyPrice: CurrencyPrice,
) => async (dispatch: any) => {
  const misc = await dispatch(loadMiscAction("not_activated_request", data.email));
  if (misc.data) {
    saveRequestToLocalStorage(misc.data, misc.data.part_number || misc.data.partNumber, misc.data.requestType);
    await dispatch(deleteMiscAction("not_activated_request", data.email));
  } else {
    localStorage.removeItem("progress_modal_data");
  }

  const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 100);
  const prev_user_email = localStorage.getItem("prev_user_email");
  if (prev_user_email !== data.email) {
    removeAuthToken();
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("email");
    localStorage.removeItem("prev_user_email");
  }
  setAuthToken(token);
  localStorage.setItem("expirationDate", expirationDate.toString());
  localStorage.setItem("email", data.email);
  dispatch(updatePrevEmail(data.email));

  batch(() => {
    dispatch(saveEmailAction(data.email));
    dispatch(getUserAddressThunk());
    dispatch(getCart());
    dispatch(authSuccess(token));
    dispatch(sendQuickRequest());
  });

  batch(() => {
    if (checkIsAuthenticated()) {
      if (location?.backurl) {
        navigate(location?.backurl);
      } else if (localStorage.getItem("previousLocation")) {
        navigate(localStorage.getItem("previousLocation"));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  });

  localStorage.removeItem("registered_email");
  localStorage.removeItem("reset_email");
};
