export const UPLOAD_AVATAR = "@sellerProfile/UPLOAD_AVATAR";

export const UPLOAD_ALL_INFO = "@sellerProfile/UPLOAD_ALL_INFO";

export const SET_EDIT_VIEW = "@sellerProfile/SET_EDIT_VIEW";
export interface SellerProfileInfo {
  avatar: any;
  company_name: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  city: string;
  postcode: string;
  address: string;
  description: string;
  isLoading: boolean;
  isEditView: boolean;
}
