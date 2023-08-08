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
        price: 0,
      },
      {
        index: 2,
        isDisabled: true,
        MPN: "",
        manufacturer: "",
        quantity: "",
        price: 0,
      },
    ],
    touched: [],
    errors: [],
  },
};

export default function rfqListReducer(state = initialState, action: any): any {
  switch (action.types) {
    case actionTypes.SAVE_RFQ_LIST_FORM_STATE:
      console.log(action.payload);
      return { ...state, formState: action.payload };
    default:
      return state;
  }
}
