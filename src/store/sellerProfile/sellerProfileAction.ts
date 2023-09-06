import { UPLOAD_AVATAR } from "@src/store/sellerProfile/sellerProfileTypes";

export const uploadNewAvatar = (avatar: any) => {
  return (dispatch: any) => {
    return dispatch({ type: UPLOAD_AVATAR, payload: avatar });
  };
};

export default {
  uploadNewAvatar,
};
