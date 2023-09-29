export const SAVE_RFQ_LIST_FORM_STATE = "SAVE_RFQ_LIST_FORM_STATE";

export const SHOW_HINT = "SHOW_HINT";

export const COLLAPSE_HINT = "COLLAPSE_HINT";

interface SaveRfqListFormState {
  type: typeof SAVE_RFQ_LIST_FORM_STATE;
  payload: any;
}

export type RfqListActions = SaveRfqListFormState;
