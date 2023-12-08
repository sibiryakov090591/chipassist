import { saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./progressModalTypes";
import { ProgressModalActions, RequestTypes } from "./progressModalTypes";

export const progressModalOpen = (): ProgressModalActions => {
  return {
    type: actionTypes.PROGRESS_MODAL_OPEN,
  };
};

export const progressModalSuccess = (): ProgressModalActions => {
  return {
    type: actionTypes.PROGRESS_MODAL_SUCCESS,
  };
};

export const progressModalError = (message = ""): ProgressModalActions => {
  return {
    type: actionTypes.PROGRESS_MODAL_ERROR,
    payload: message,
  };
};

export const progressModalClose = (): ProgressModalActions => {
  return {
    type: actionTypes.PROGRESS_MODAL_CLOSE,
  };
};

export const progressModalSetPartNumber = (partNumber: string, requestType: RequestTypes): ProgressModalActions => {
  return {
    type: actionTypes.PROGRESS_MODAL_SET_PART_NUMBER,
    payload: { partNumber, requestType },
  };
};

export const saveRequestToLocalStorage = (item: any, partNumber: string, requestType: actionTypes.RequestTypes) => {
  localStorage.setItem("progress_modal_data", JSON.stringify({ data: item, partNumber, requestType }));
};

export const changeMisc = (name: string, data: {}, value: string = null) => (dispatch: any) => {
  return dispatch(saveMiscAction(name, data, value))
    .then((res: any) => {
      if (res.error) dispatch(updateMiscAction(name, data));
    })
    .catch(() => dispatch(updateMiscAction(name, data)));
};

export const sendVerificationCode = (code: string[], email: string) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/profile/activate/${code.join("")}`, { data: { email: email ? email.toLowerCase() : "" } })
        .then((res) => res.data)
        .catch((e) => {
          console.log("***SEND_VERIFICATION_CODE_ERROR", e);
          throw e;
        }),
  });
};

export const saveTemporaryRfq = (rfq: any): ProgressModalActions => {
  return {
    type: actionTypes.SAVE_TEMP_RFQ,
    payload: rfq,
  };
};

export default "ProgressModalTypes";
