import { SellerProfileInfo, UPLOAD_AVATAR } from "@src/store/sellerProfile/sellerProfileTypes";

const initialState: SellerProfileInfo = {
  avatar: "",
};

export const sellerProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_AVATAR:
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
};

export default sellerProfileReducer;
