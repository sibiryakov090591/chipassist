import * as actionTypes from "./rfqListTypes";

const initialState: any = {
  formState: {
    isValid: false,
    values: [
      {
        index: 1,
        isDisabled: false,
        MPN: "",
        manufacturer: "",
        quantity: "",
        price: "",
      },
      {
        index: 2,
        isDisabled: true,
        MPN: "",
        manufacturer: "",
        quantity: "",
        price: "",
      },
    ],
    touched: [],
    errors: [],
    lastFilledIndex: 0,
  },
};

export default function rfqListReducer(state = initialState, action: any): any {
  switch (action.type) {
    case actionTypes.SAVE_RFQ_LIST_FORM_STATE:
      console.log("action payload: ", action.payload);
      return { ...state, formState: { ...action.payload.form, lastFilledIndex: action.payload.lastFilledIndex } };
    default:
      console.log("default");
      return state;
  }
}
