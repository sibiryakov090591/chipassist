import { UPLOAD_ALL_INFO, UPLOAD_AVATAR } from "@src/store/sellerProfile/sellerProfileTypes";

export const uploadNewAvatar = (avatar: any) => {
  return (dispatch: any) => {
    return dispatch({ type: UPLOAD_AVATAR, payload: avatar });
  };
};

export const saveNewDetails = (data: any) => {
  return (dispatch: any) => {
    const { logoURL, ...rest } = data;
    return dispatch({ type: UPLOAD_ALL_INFO, payload: rest });
  };
};

export default {
  uploadNewAvatar,
};
