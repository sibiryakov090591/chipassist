import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./profileTypes";
import * as authActionTypes from "../authentication/authTypes";

const initialState: actionTypes.ProfileState = {
  profileInfo: null,
  selectedPartner: null,
  prevEmail: localStorage.getItem("prev_user_email") || null,
  isLoadingProfile: false,
  isUpdating: false,
  geolocation: null,
  isRemovingAvatar: false,
  showUpdateSuccess: false,
  isUpdatingPassword: false,
  showChangePasswordSuccess: false,
  changePasswordErrors: [],
  resetPasswordRequest: {
    isLoading: false,
    success: false,
    error: false,
  },
  resetPassword: {
    isLoading: false,
    success: false,
    error: false,
  },
  partnerProfile: {
    avatar: "",
    company_name: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    postcode: "",
    address: "",
    description: "",
    isLoading: true,
  },
};

const updatePrevEmail = (state: actionTypes.ProfileState, action: actionTypes.UpdatePrevEmail) => {
  localStorage.setItem("prev_user_email", action.payload);
  return updateObject(state, { prevEmail: action.payload });
};

export default function profile(state = initialState, action: actionTypes.ProfileActionTypes) {
  switch (action.type) {
    case actionTypes.CHANGE_PARTNER:
      return { ...state, selectedPartner: action.payload };
    case actionTypes.UPDATE_PREV_EMAIL:
      return updatePrevEmail(state, action);
    case actionTypes.SAVE_PROFILE_INFO:
      return updateObject(state, { profileInfo: action.payload });
    case actionTypes.PROFILE_UPDATE_R:
      return { ...state, isUpdating: true };
    case actionTypes.PROFILE_UPDATE_S:
      return {
        ...state,
        isUpdating: false,
        showUpdateSuccess: false,
        profileInfo: {
          ...state.profileInfo,
          firsName: action.response.first_name,
          lastName: action.response.last_name,
        },
      };
    case actionTypes.PROFILE_UPDATE_F:
      return { ...state, isUpdating: false };
    case authActionTypes.AUTH_LOGOUT:
      return { ...state, profileInfo: null };
    case actionTypes.HIDE_UPDATE_SUCCESS:
      return { ...state, showUpdateSuccess: false };
    case actionTypes.SHOW_UPDATE_SUCCESS:
      return { ...state, showUpdateSuccess: true };
    case actionTypes.REMOVE_AVATAR_R:
      return { ...state, isRemovingAvatar: true };
    case actionTypes.REMOVE_AVATAR_S:
      return { ...state, isRemovingAvatar: false, profileInfo: { ...state.profileInfo, avatar: null } };
    case actionTypes.REMOVE_AVATAR_F:
      return { ...state, isRemovingAvatar: false };
    case actionTypes.UPLOAD_AVATAR_R:
      return state;
    case actionTypes.UPLOAD_AVATAR_S:
      return { ...state, profileInfo: { ...state.profileInfo, avatar: action.response.photo } };
    case actionTypes.UPLOAD_AVATAR_F:
      return state;
    case actionTypes.CHANGE_PASSWORD_R:
      return { ...state, isUpdatingPassword: true, changePasswordErrors: [] };
    case actionTypes.CHANGE_PASSWORD_S:
      return { ...state, isUpdatingPassword: false, showChangePasswordSuccess: true };
    case actionTypes.CHANGE_PASSWORD_F:
      return { ...state, isUpdatingPassword: false, changePasswordErrors: action.error.response.data.password };
    case actionTypes.HIDE_CHANGE_PASSWORD_SUCCESS:
      return { ...state, showChangePasswordSuccess: false };
    case actionTypes.RESET_PASSWORD_REQUEST_R:
      return { ...state, resetPasswordRequest: { isLoading: true, error: false, success: false } };
    case actionTypes.RESET_PASSWORD_REQUEST_S:
      return { ...state, resetPasswordRequest: { isLoading: false, error: false, success: true } };
    case actionTypes.RESET_PASSWORD_REQUEST_F:
      return {
        ...state,
        resetPasswordRequest: { isLoading: false, error: action.error.response.data, success: false },
      };
    case actionTypes.RESET_PASSWORD_CLEAR:
      return { ...state, resetPasswordRequest: initialState.resetPasswordRequest };
    case actionTypes.RESET_PASSWORD_R:
      return { ...state, resetPassword: { isLoading: true, error: false, success: false } };
    case actionTypes.RESET_PASSWORD_S:
      return { ...state, resetPassword: { isLoading: false, error: false, success: true } };
    case actionTypes.RESET_PASSWORD_F:
      return {
        ...state,
        resetPassword: { isLoading: false, error: action.error.response.data, success: false },
      };
    case actionTypes.SET_COMPANY_ERRORS:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, addressErrors: action.payload },
      };
    case actionTypes.PROFILE_IS_LOADING:
      return {
        ...state,
        isLoadingProfile: action.payload,
      };
    case actionTypes.SET_GEOLOCATION:
      return {
        ...state,
        geolocation: action.payload,
      };
    case actionTypes.GET_PARTNER_INFORMATION_R:
      return {
        ...state,
        partnerProfile: {
          ...state.partnerProfile,
          isLoading: true,
        },
      };
    case actionTypes.GET_PARTNER_INFORMATION_S:
      return {
        ...state,
        partnerProfile: {
          ...state.partnerProfile,
          ...action.response,
          isLoading: false,
        },
      };
    case actionTypes.GET_PARTNER_INFORMATION_F:
      return {
        ...state,
        partnerProfile: {
          ...state.partnerProfile,
          isLoading: false,
        },
      };
    case actionTypes.SAVE_NEW_PARTNER_INFORMATION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
