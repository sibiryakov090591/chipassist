import * as actionTypes from "./rfqListTypes";

export const saveNewState = (newState: any) => {
  console.log("new values", newState);
  return {
    type: actionTypes.SAVE_RFQ_LIST_FORM_STATE,
    payload: newState,
  };
};

export default saveNewState;
