export const SAVE_RFQ_LIST_FORM_STATE = "SAVE_RFQ_LIST_FORM_STATE";

interface SaveRfqListFormState {
  type: typeof SAVE_RFQ_LIST_FORM_STATE;
  payload: any;
}

export type RfqListActions = SaveRfqListFormState;
