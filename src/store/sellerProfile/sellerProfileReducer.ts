import { SellerProfileInfo, UPLOAD_ALL_INFO, UPLOAD_AVATAR } from "@src/store/sellerProfile/sellerProfileTypes";

const initialState: SellerProfileInfo = {
  avatar: "",
  company_name: "",
  email: "",
  phone: "",
  website: "",
  country: "",
  postcode: 0,
  address: "",
  description: "",
  isLoading: false,
};

export const sellerProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_AVATAR:
      return { ...state, avatar: action.payload };
    case UPLOAD_ALL_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default sellerProfileReducer;
