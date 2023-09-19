import { SET_EDIT_VIEW, UPLOAD_ALL_INFO, UPLOAD_AVATAR } from "@src/store/sellerProfile/sellerProfileTypes";

export const uploadNewAvatar = (avatar: any) => {
  return (dispatch: any) => {
    return dispatch({ type: UPLOAD_AVATAR, payload: avatar });
  };
};

export const saveNewDetails = (data: any) => {
  return (dispatch: any) => {
    return dispatch({ type: UPLOAD_ALL_INFO, payload: data });
  };
};

export const turnEditMode = (isTurnOn: boolean) => {
  return (dispatch: any) => {
    return dispatch({ type: SET_EDIT_VIEW, payload: isTurnOn });
  };
};

export default {
  uploadNewAvatar,
};
