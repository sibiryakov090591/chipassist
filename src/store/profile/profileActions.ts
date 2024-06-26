import { RootState } from "@src/store";
import { ApiClientInterface } from "@src/services/ApiClient";
import { Dispatch } from "redux";
import axios from "@src/utils/axios";
import { saveBillingAddress } from "@src/store/checkout/checkoutActions";
import { authSuccess } from "@src/store/authentication/authActions";
import * as actionTypes from "./profileTypes";
import { CREATE_ADDRESS_ARRAY, Partner, UPDATE_ADDRESS_ARRAY } from "./profileTypes";

export const isLoadingProfile = (val: boolean) => {
  return {
    type: actionTypes.PROFILE_IS_LOADING,
    payload: val,
  };
};

export const loadProfileInfoThunk = () => {
  return (dispatch: any) => {
    dispatch(isLoadingProfile(true));
    return dispatch({
      types: actionTypes.LOAD_PROFILE_INFO,
      promise: () => {
        return new Promise((res) => {
          setTimeout(
            () =>
              res({
                id: 1,
                firstName: "Test firstname",
                lastName: "Test lastname",
                email: "test@test.ru",
                isTestAccount: true,
                canSkip: false,
                partners: [],
                avatar: "https://andrew-sib.com/static/media/my_photo2.63ecbc26.jpg",
                addressErrors: null,
                addresses: [],
                defaultBillingAddress: {},
                defaultShippingAddress: {},
                addressViewItem: {},
              }),
            2000,
          );
        });
      },
    })
      .then((response: actionTypes.ProfileResponse) => {
        const profileInfo: any = response;
        if (profileInfo.defaultBillingAddress) {
          dispatch(saveBillingAddress(profileInfo.defaultBillingAddress));
        }
        dispatch(saveProfileInfo(profileInfo));
        dispatch(isLoadingProfile(false));
      })
      .catch((error: any) => {
        console.log("***LOAD_PROFILE_ERROR", error);
        throw error;
      })
      .finally(() => dispatch(authSuccess()));
  };
};

export const updateProfileInfoThunk = (data: any = null) => {
  return (dispatch: any, getState: () => RootState) => {
    const { profileInfo } = getState().profile;

    return dispatch({
      types: data ? [false, false, false] : actionTypes.PROFILE_UPDATE_ARRAY,
      promise: () =>
        new Promise((res) => {
          setTimeout(
            () =>
              res({
                first_name: profileInfo.firstName,
                last_name: profileInfo.lastName,
              }),
            2000,
          );
        }).then((res) => res),
    });
  };
};

export const unsubscribeUser = (email: string) => {
  return (dispatch: any) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/profile/unsubscribe/${email}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***PROFILE_UNSUBSCRIBE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const saveProfileInfo = (profileInfo: actionTypes.ProfileState["profileInfo"]) => {
  return {
    type: actionTypes.SAVE_PROFILE_INFO,
    payload: profileInfo,
  };
};

export const showUpdateSuccess = () => {
  return {
    type: actionTypes.SHOW_UPDATE_SUCCESS,
  };
};

export const hideUpdateSuccess = () => {
  return {
    type: actionTypes.HIDE_UPDATE_SUCCESS,
  };
};

export const updatePrevEmail = (value: string) => {
  return {
    type: actionTypes.UPDATE_PREV_EMAIL,
    payload: value,
  };
};

export const onChangePartner = (partner: Partner | false) => {
  if (partner) localStorage.setItem("selected_partner", partner.name);
  return {
    type: actionTypes.CHANGE_PARTNER,
    payload: partner,
  };
};

export const setGeolocation = (countryCode: string, countryName: string, city: string, country_code: string) => {
  return {
    type: actionTypes.GET_GEOLOCATION_S,
    payload: {
      country_code_iso3: countryCode,
      country_name: countryName,
      city,
      country_code,
    },
  };
};

export const setGeolocationFailure = () => {
  return {
    type: actionTypes.GET_GEOLOCATION_F,
  };
};

export const getGeolocation = () => {
  return (dispatch: any) => {
    return axios
      .get("https://ipapi.co/json/")
      .then((res) => res.data)
      .then((data: any) => {
        dispatch(setGeolocation(data.country_code_iso3, data.country_name, data.city, data.country_code));
        return data;
      })
      .catch((e: any) => {
        dispatch(setGeolocationFailure());
        console.log("***GET_GEOLOCATION_ERROR", e);
        throw e;
      });
  };
};

export const removeAvatarThunk = () => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.REMOVE_AVATAR_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .delete(`/profile/photo/`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***REMOVE_AVATAR_ERROR", e);
            throw e;
          }),
    });
  };
};

export const uploadAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.UPLOAD_AVATAR_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post("/profile/photo/", {
            data: formData,
          })
          .then((response) => response.data)
          .catch((e) => {
            console.log("***UPLOAD_AVATAR_ERROR", e);
            throw e;
          }),
    });
  };
};

export const changePasswordThunk = (password: string) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.CHANGE_PASSWORD_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .put(`/profile/0/`, {
            data: {
              password,
            },
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***CHANGE_PASSWORD_ERROR", e);
            throw e;
          }),
    });
  };
};

export const hideChangePasswordSuccess = () => {
  return {
    type: actionTypes.HIDE_CHANGE_PASSWORD_SUCCESS,
  };
};

export const resetPasswordRequestThunk = (email: string) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.RESET_PASSWORD_REQUEST_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/profile/password-request/`, {
            data: {
              email,
            },
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***RESET_PASSWORD_REQUEST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const resetPasswordThunk = (token: string, password: string, email: string) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.RESET_PASSWORD_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/profile/password-reset/`, {
            data: {
              token,
              password,
              email,
            },
          })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***RESET_PASSWORD_REQUEST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const clearResetPasswordState = () => ({ type: actionTypes.RESET_PASSWORD_CLEAR });

export const newCompanyAddress = (data: any) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: CREATE_ADDRESS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/profile/address/`, {
            data,
          })
          .then((res) => {
            dispatch({ type: actionTypes.PROFILE_NEED_UPDATE });
            dispatch(isLoadingProfile(false));
            return res;
          })
          .catch((e) => {
            dispatch(isLoadingProfile(false));
            if (e.response?.status >= 400 && e.response?.status <= 499) {
              dispatch({ type: actionTypes.SET_COMPANY_ERRORS, payload: e.response.data });
            }
            console.log("***NEW_COMPANY_ERROR", e);
            throw e;
          }),
    });
  };
};

export const deleteAddress = (id: number) => (dispatch: Dispatch<any>) => {
  dispatch(isLoadingProfile(true));
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .delete(`/useraddresses/${id}/`)
        .then((res) => {
          dispatch(isLoadingProfile(false));
          return res;
        })
        .catch((e) => {
          if (e.response?.status >= 400 && e.response?.status <= 499) {
            dispatch({ type: actionTypes.SET_COMPANY_ERRORS, payload: e.response.data });
          }
          dispatch(isLoadingProfile(false));
          console.log("***DELETE_ADDRESS_ERROR", e);
          throw e;
        }),
  });
};

export const updateCompanyAddress = (id: number, data: any) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: UPDATE_ADDRESS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/useraddresses/${id}/`, {
            data,
          })
          .then((res) => {
            dispatch(isLoadingProfile(false));
            return res;
          })
          .catch((e) => {
            dispatch(isLoadingProfile(false));
            console.log("***UPDATE_ADDRESS_ERROR", e);
            if (e.response?.status >= 400 && e.response?.status <= 499) {
              dispatch({ type: actionTypes.SET_COMPANY_ERRORS, payload: e.response.data });
            }
            throw e;
          }),
    });
  };
};

export const getPartnerInfo = (id: number) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.GET_PARTNER_INFORMATION_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/partners/${id}`)
          .then((res) => {
            const data = {
              avatar: res.data?.avatar || "",
              company_name: res.data?.company_name || res.data?.name || "",
              email: res.data?.email || "",
              phone: res.data?.phone || "",
              website: res.data?.url || "",
              country: res.data?.country || "",
              city: res.data?.city || "",
              postcode: res.data?.postcode || "",
              address: res.data?.address || "",
              description: res.data?.description || "",
            };
            return data;
          })
          .catch((e) => {
            throw e;
          }),
    });
  };
};

export const saveNewPartnerInfo = (id: number, data: any) => {
  return (dispatch: any) => {
    return dispatch({
      types: actionTypes.GET_PARTNER_INFORMATION_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/partners/${id}`, {
            data: {
              avatar: data.logoURL,
              company_name: data.company_name,
              email: data.email,
              phone: data.phone,
              url: data.website,
              country: data.country,
              city: data.city,
              postcode: data.postcode,
              address: data.address,
              description: data.description,
            },
          })
          .then()
          .catch((e) => {
            throw e;
          }),
    });
  };
};
