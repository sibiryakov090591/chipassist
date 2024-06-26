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

export const GET_GEOLOCATION_S = "@profile/GET_GEOLOCATION_S";
export const GET_GEOLOCATION_F = "@profile/GET_GEOLOCATION_F";
export const UPDATE_PREV_EMAIL = "UPDATE_PREV_EMAIL";
export const CHANGE_PARTNER = "@profile/CHANGE_PARTNER";

export const GET_PARTNER_INFORMATION_R = "@sellerProfile/GET_PARTNER_INFORMATION_R";
export const GET_PARTNER_INFORMATION_S = "@sellerProfile/GET_PARTNER_INFORMATION_S";
export const GET_PARTNER_INFORMATION_F = "@sellerProfile/GET_PARTNER_INFORMATION_F";
export const GET_PARTNER_INFORMATION_ARRAY = [
  GET_PARTNER_INFORMATION_R,
  GET_PARTNER_INFORMATION_S,
  GET_PARTNER_INFORMATION_F,
];

export const GET_PARTNER_INFORMATION = "@sellerProfile/GET_PARTNER_INFORMATION";

export const SAVE_NEW_PARTNER_INFORMATION = "@sellerProfile/SAVE_NEW_PARTNER_INFORMATION";

export const CREATE_ADDRESS_R = "@sellerProfile/CREATE_ADDRESS_R";
export const CREATE_ADDRESS_S = "@sellerProfile/CREATE_ADDRESS_S";
export const CREATE_ADDRESS_F = "@sellerProfile/CREATE_ADDRESS_F";

export const CREATE_ADDRESS_ARRAY = [CREATE_ADDRESS_R, CREATE_ADDRESS_S, CREATE_ADDRESS_F];

export const UPDATE_ADDRESS_R = "@sellerProfile/UPDATE_ADDRESS_R";
export const UPDATE_ADDRESS_S = "@sellerProfile/UPDATE_ADDRESS_S";
export const UPDATE_ADDRESS_F = "@sellerProfile/UPDATE_ADDRESS_F";

export const UPDATE_ADDRESS_ARRAY = [UPDATE_ADDRESS_R, UPDATE_ADDRESS_S, UPDATE_ADDRESS_F];

export interface ProfileState {
  profileInfo: ProfileInfo;
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

export interface ProfileInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isTestAccount: boolean;
  canSkip: boolean;
  partners: Partner[];
  avatar: string;
  addressErrors: { [key: string]: string[] };
  addresses: Address[];
  defaultBillingAddress: Address;
  defaultShippingAddress: Address;
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
  address: Address[];
}

export interface Geolocation {
  country_code_iso3?: string;
  country_name?: string;
  city?: string;
  country_code?: string;
  loaded: boolean;
}

export interface Address {
  id: number;
  title: string;
  inn: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  state: string;
  postcode: string;
  country: string;
  phone_number: string;
  phone_number_str: string;
  company_name: string;
  notes: string;
  search_text: string;
  url: string;
  is_default_for_shipping: boolean;
  is_default_for_billing: boolean;
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
  type: typeof GET_GEOLOCATION_S;
  payload: {
    country_code_iso3: string;
    country_name: string;
    city: string;
    country_code: string;
  };
}

interface SetGeolocationError {
  type: typeof GET_GEOLOCATION_F;
}

interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

interface SaveNewPartnerInformation {
  type: typeof SAVE_NEW_PARTNER_INFORMATION;
}

interface GetPartnerInformationR {
  type: typeof GET_PARTNER_INFORMATION_R;
}

interface GetPartnerInformationS {
  type: typeof GET_PARTNER_INFORMATION_S;
  response: {
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

interface GetPartnerInformationF {
  type: typeof GET_PARTNER_INFORMATION_F;
}

interface CreateAddressR {
  type: typeof CREATE_ADDRESS_R;
}

export interface CreateAddressS {
  type: typeof CREATE_ADDRESS_S;
  response: any;
}

interface CreateAddressF {
  type: typeof CREATE_ADDRESS_F;
  error: any;
}

interface UpdateAddressR {
  type: typeof UPDATE_ADDRESS_R;
}

export interface UpdateAddressS {
  type: typeof UPDATE_ADDRESS_S;
  response: any;
}

interface UpdateAddressF {
  type: typeof UPDATE_ADDRESS_F;
  error: any;
}

export type ProfileActionTypes =
  | ChangePartner
  | LogoutAction
  | UpdatePrevEmail
  | SaveProfileInfoAction
  | SetGeolocation
  | SetGeolocationError
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
  | SaveNewPartnerInformation
  | GetPartnerInformationR
  | GetPartnerInformationS
  | GetPartnerInformationF
  | CreateAddressR
  | CreateAddressS
  | CreateAddressF
  | UpdateAddressR
  | UpdateAddressS
  | UpdateAddressF;
