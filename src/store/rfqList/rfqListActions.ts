import * as actionTypes from "./rfqListTypes";

export const saveNewState = (newState: any) => {
  return {
    type: actionTypes.SAVE_RFQ_LIST_FORM_STATE,
    payload: newState,
  };
};

export const showHint = (isNeedToShow: boolean) => {
  return {
    type: actionTypes.SHOW_HINT,
    payload: isNeedToShow,
  };
};

export const collapseHint = (isNeedToCollapse: boolean) => {
  return {
    type: actionTypes.COLLAPSE_HINT,
    payload: isNeedToCollapse,
  };
};

export default saveNewState;
