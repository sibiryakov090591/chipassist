import {
  SellerProfileInfo,
  SET_EDIT_VIEW,
  UPLOAD_ALL_INFO,
  UPLOAD_AVATAR,
} from "@src/store/sellerProfile/sellerProfileTypes";

const initialState: SellerProfileInfo = {
  avatar: "",
  company_name: "",
  email: "",
  phone: "",
  website: "",
  country: "",
  city: "",
  postcode: "",
  address: "",
  description: "",
  isLoading: false,
  isEditView: false,
};

export const sellerProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_AVATAR:
      return { ...state, avatar: action.payload };
    case UPLOAD_ALL_INFO:
      return { ...state, ...action.payload };
    case SET_EDIT_VIEW:
      return { ...state, isEditView: action.payload };
    default:
      return state;
  }
};

export default sellerProfileReducer;
