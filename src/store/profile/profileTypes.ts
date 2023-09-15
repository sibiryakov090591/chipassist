import { AUTH_LOGOUT } from "@src/store/authentication/authTypes";
import { SellerProfileInfo } from "@src/store/sellerProfile/sellerProfileTypes";

export const LOAD_PROFILE_INFO = ["LOAD_PROFILE_INFO_R", "LOAD_PROFILE_INFO_S", "LOAD_PROFILE_INFO_F"];
export const SAVE_PROFILE_INFO = "SAVE_PROFILE_INFO";

export const PROFILE_UPDATE_R = "PROFILE_UPDATE_R";
export const PROFILE_UPDATE_S = "PROFILE_UPDATE_S";
export const PROFILE_UPDATE_F = "PROFILE_UPDATE_F";
export const PROFILE_UPDATE_ARRAY = [PROFILE_UPDATE_R, PROFILE_UPDATE_S, PROFILE_UPDATE_F];
export const REMOVE_AVATAR_R = "REMOVE_AVATAR_R";
export const REMOVE_AVATAR_S = "REMOVE_AVATAR_S";
export const REMOVE_AVATAR_F = "REMOVE_AVATAR_F";
export const REMOVE_AVATAR_ARRAY = [REMOVE_AVATAR_R, REMOVE_AVATAR_S, REMOVE_AVATAR_F];
export const SHOW_UPDATE_SUCCESS = "SHOW_UPDATE_SUCCESS";
export const HIDE_UPDATE_SUCCESS = "HIDE_UPDATE_SUCCESS";
export const UPLOAD_AVATAR_R = "UPLOAD_AVATAR_R";
export const UPLOAD_AVATAR_S = "UPLOAD_AVATAR_S";
export const UPLOAD_AVATAR_F = "UPLOAD_AVATAR_F";
export const UPLOAD_AVATAR_ARRAY = [UPLOAD_AVATAR_R, UPLOAD_AVATAR_S, UPLOAD_AVATAR_F];
export const CHANGE_PASSWORD_R = "CHANGE_PASSWORD_R";
export const CHANGE_PASSWORD_S = "CHANGE_PASSWORD_S";
export const CHANGE_PASSWORD_F = "CHANGE_PASSWORD_F";
export const CHANGE_PASSWORD_ARRAY = [CHANGE_PASSWORD_R, CHANGE_PASSWORD_S, CHANGE_PASSWORD_F];
export const HIDE_CHANGE_PASSWORD_SUCCESS = "HIDE_CHANGE_PASSWORD_SUCCESS";
export const RESET_PASSWORD_REQUEST_R = "RESET_PASSWORD_REQUEST_R";
export const RESET_PASSWORD_REQUEST_S = "RESET_PASSWORD_REQUEST_S";
export const RESET_PASSWORD_REQUEST_F = "RESET_PASSWORD_REQUEST_F";
export const RESET_PASSWORD_REQUEST_ARRAY = [
  RESET_PASSWORD_REQUEST_R,
  RESET_PASSWORD_REQUEST_S,
  RESET_PASSWORD_REQUEST_F,
];
export const RESET_PASSWORD_R = "RESET_PASSWORD_R";
export const RESET_PASSWORD_S = "RESET_PASSWORD_S";
export const RESET_PASSWORD_F = "RESET_PASSWORD_F";
export const RESET_PASSWORD_ARRAY = [RESET_PASSWORD_R, RESET_PASSWORD_S, RESET_PASSWORD_F];
export const RESET_PASSWORD_CLEAR = "RESET_PASSWORD_CLEAR";

export const SET_COMPANY_ERRORS = "SET_COMPANY_ERRORS";
export const PROFILE_NEED_UPDATE = "PROFILE_NEED_UPDATE";
export const ADDRESS_ITEM = "ADDRESS_ITEM";
export const PROFILE_IS_LOADING = "PROFILE_IS_LOADING";
export const CLEAR_ADDRESS_ITEM = "CLEAR_ADDRESS_ITEM";

export const SET_GEOLOCATION = "SET_GEOLOCATION";
export const UPDATE_PREV_EMAIL = "UPDATE_PREV_EMAIL";
export const CHANGE_PARTNER = "@profile/CHANGE_PARTNER";

export const GET_PARTNER_INFORMATION_R = "@sellerProfile/GET_PARTNER_INFORMATION_R";
export const GET_PARTNER_INFORMATION_S = "@sellerProfile/GET_PARTNER_INFORMATION_S";
export const GET_PARTNER_INFORMATION_F = "@sellerProfile/GET_PARTNER_INFORMATION_F";

export const GET_PARTNER_INFORMATION = "@sellerProfile/GET_PARTNER_INFORMATION";

export const SAVE_NEW_PARTNER_INFORMATION = "@sellerProfile/SAVE_NEW_PARTNER_INFORMATION";

export interface ProfileState {
  profileInfo: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    canSkip: boolean;
    partners: Partner[];
    avatar: string;
    addressErrors: { [key: string]: string[] };
    addresses: any[];
  };
  selectedPartner: Partner | false;
  prevEmail: string;
  isLoadingProfile: boolean;
  isUpdating: boolean;
  geolocation: Geolocation;
  isRemovingAvatar: boolean;
  showUpdateSuccess: boolean;
  isUpdatingPassword: boolean;
  showChangePasswordSuccess: boolean;
  changePasswordErrors: [];
  resetPasswordRequest: {
    isLoading: boolean;
    success: boolean;
    error: any;
  };
  resetPassword: {
    isLoading: boolean;
    success: boolean;
    error: any;
  };
  partnerProfile: SellerProfileInfo;
}

export interface Partner {
  id: number;
  name: string;
  pcb?: boolean;
}

export interface ProfileResponse {
  id: number;
  username?: string;
  email: string;
  first_name: string;
  last_name: string;
  can_skip: boolean;
  date_joined: string;
  mailing: number;
  partners: { id: number; name: string; pcb?: boolean }[];
  photo: string;
  company: any;
  address: any;
}

export interface Geolocation {
  country_code_iso3: string;
  country_name: string;
  city: string;
  country_code: string;
}

interface SaveProfileInfoAction {
  type: typeof SAVE_PROFILE_INFO;
  payload: ProfileState["profileInfo"];
}

interface ProfileUpdateRequestAction {
  type: typeof PROFILE_UPDATE_R;
}

interface ProfileUpdateSuccessAction {
  type: typeof PROFILE_UPDATE_S;
  response: ProfileResponse;
}

interface ProfileUpdateFailedAction {
  type: typeof PROFILE_UPDATE_F;
}

interface HideUpdateSuccessAction {
  type: typeof HIDE_UPDATE_SUCCESS;
}

interface ShowUpdateSuccessAction {
  type: typeof SHOW_UPDATE_SUCCESS;
}

interface RemoveAvatarRequestAction {
  type: typeof REMOVE_AVATAR_R;
}

interface RemoveAvatarSuccessAction {
  type: typeof REMOVE_AVATAR_S;
}

interface RemoveAvatarFailedAction {
  type: typeof REMOVE_AVATAR_F;
}

interface UploadAvatarRequestAction {
  type: typeof UPLOAD_AVATAR_R;
}

interface UploadAvatarSuccessAction {
  type: typeof UPLOAD_AVATAR_S;
  response: ProfileResponse;
}

interface UploadAvatarFailedAction {
  type: typeof UPLOAD_AVATAR_F;
}

interface ChangePasswordRequestAction {
  type: typeof CHANGE_PASSWORD_R;
}

interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_S;
  response: ProfileResponse;
}

interface ChangePasswordFailedAction {
  type: typeof CHANGE_PASSWORD_F;
  error: any;
}

interface HideChangePasswordSuccessAction {
  type: typeof HIDE_CHANGE_PASSWORD_SUCCESS;
}

interface ResetPasswordRequestRequestAction {
  type: typeof RESET_PASSWORD_REQUEST_R;
}

interface ResetPasswordRequestSuccessAction {
  type: typeof RESET_PASSWORD_REQUEST_S;
}

interface ResetPasswordRequestFailedAction {
  type: typeof RESET_PASSWORD_REQUEST_F;
  error: any;
}

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_R;
}

interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_S;
  response: ProfileResponse;
}

interface ResetPasswordFailedAction {
  type: typeof RESET_PASSWORD_F;
  error: any;
}

interface ResetPasswordClearAction {
  type: typeof RESET_PASSWORD_CLEAR;
}

interface SetCompanyErrorsAction {
  type: typeof SET_COMPANY_ERRORS;
  payload: { [key: string]: string[] };
}

interface ProfileIsLoading {
  type: typeof PROFILE_IS_LOADING;
  payload: boolean;
}

export interface UpdatePrevEmail {
  type: typeof UPDATE_PREV_EMAIL;
  payload: string;
}

export interface ChangePartner {
  type: typeof CHANGE_PARTNER;
  payload: Partner;
}

interface SetGeolocation {
  type: typeof SET_GEOLOCATION;
  payload: {
    country_code_iso3: string;
    country_name: string;
    city: string;
    country_code: string;
  };
}

interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

interface GetPartnerInformation {
  type: typeof GET_PARTNER_INFORMATION;
  payload: {
    avatar: any;
    company_name: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    postcode: number;
    address: string;
    description: string;
  };
}

interface SaveNewPartnerInformation {
  type: typeof SAVE_NEW_PARTNER_INFORMATION;
}

interface GetPartnerInformationR {
  type: typeof GET_PARTNER_INFORMATION_R;
}

interface GetPartnerInformationS {
  type: typeof GET_PARTNER_INFORMATION_S;
}

interface GetPartnerInformationF {
  type: typeof GET_PARTNER_INFORMATION_F;
}

export type ProfileActionTypes =
  | ChangePartner
  | LogoutAction
  | UpdatePrevEmail
  | SaveProfileInfoAction
  | SetGeolocation
  | ProfileUpdateRequestAction
  | ProfileUpdateSuccessAction
  | ProfileUpdateFailedAction
  | ShowUpdateSuccessAction
  | HideUpdateSuccessAction
  | RemoveAvatarRequestAction
  | RemoveAvatarSuccessAction
  | RemoveAvatarFailedAction
  | UploadAvatarRequestAction
  | UploadAvatarSuccessAction
  | UploadAvatarFailedAction
  | ChangePasswordRequestAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailedAction
  | HideChangePasswordSuccessAction
  | ResetPasswordRequestRequestAction
  | ResetPasswordRequestSuccessAction
  | ResetPasswordRequestFailedAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailedAction
  | ResetPasswordClearAction
  | SetCompanyErrorsAction
  | ProfileIsLoading
  | GetPartnerInformation
  | SaveNewPartnerInformation
  | GetPartnerInformationR
  | GetPartnerInformationS
  | GetPartnerInformationF;
