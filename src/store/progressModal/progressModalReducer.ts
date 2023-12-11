import * as actionTypes from "./progressModalTypes";
import { LocalStorageItem } from "./progressModalTypes";

const localStorageData: LocalStorageItem = localStorage.getItem("progress_modal_data")
  ? JSON.parse(localStorage.getItem("progress_modal_data"))
  : null;

const initialState: actionTypes.ProgressModalState = {
  open: false,
  inProgress: false,
  success: false,
  error: false,
  errorMessage: "",
  partNumber: localStorageData?.partNumber || "",
  requestType: localStorageData?.requestType || null,
  tempRfq: null,
};

export default function progressModalReducer(state = initialState, action: actionTypes.ProgressModalActions) {
  switch (action.type) {
    case actionTypes.PROGRESS_MODAL_SET_PART_NUMBER:
      return { ...state, partNumber: action.payload.partNumber, requestType: action.payload.requestType };

    case actionTypes.PROGRESS_MODAL_OPEN:
      return { ...state, open: true, inProgress: true, success: false, error: false, errorMessage: "" };

    case actionTypes.PROGRESS_MODAL_SUCCESS:
      return { ...state, inProgress: false, success: true, error: false, errorMessage: "" };

    case actionTypes.PROGRESS_MODAL_ERROR:
      return { ...state, inProgress: false, error: true, errorMessage: action.payload, success: false };

    case actionTypes.PROGRESS_MODAL_CLOSE:
      return { ...state, open: false };

    case actionTypes.SAVE_TEMP_RFQ:
      return { ...state, tempRfq: action.payload };
    default:
      return state;
  }
}
