import { updateObject } from "@src/utils/utility";
import { countriesList } from "@src/constants/countries";
import * as actionTypes from "./checkoutTypes";
import {
  CheckoutActionTypes,
  CheckoutAddress,
  CheckoutAddressErrors,
  CheckoutCardData,
  CheckoutCardErrors,
  CheckoutState,
} from "./checkoutTypes";

export const address: CheckoutAddress = {
  title: "",
  inn: "",
  first_name: "",
  last_name: "",
  line1: "",
  line2: "",
  line3: "",
  line4: "",
  state: "",
  postcode: "",
  country: "",
  // phone_number: "",
  phone_number_str: "",
  notes: "",
  company_name: "",
  is_default_for_shipping: false,
  is_default_for_billing: false,
};

export const addressErrors: CheckoutAddressErrors = {
  first_name: "",
  last_name: "",
  line1: "",
  line4: "",
  postcode: "",
  country: "",
  phone_number: "",
  company_name: "",
};

const cardErrors: CheckoutCardErrors = {
  number: "",
  expMonth: "",
  expYear: "",
  cvc: "",
  cardholderName: "",
  payServerError: "",
  apiServerError: "",
};

const cardData: CheckoutCardData = {
  number: "",
  expMonth: "",
  expYear: "",
  cvc: "",
  cardholderName: "",
};

const initialState: CheckoutState = {
  open: false,
  step: 1,
  inProgress: false,
  token: "",
  addressList: [],
  address: { ...address },
  addressLoaded: false,
  addressErrors: { ...addressErrors },
  billingAddress: { ...address },
  billingAddressLoaded: false,
  billingAddressErrors: { ...addressErrors },
  shippingDuplicate: false,
  billingDuplicate: false,
  countries: [...countriesList],
  countriesLoaded: false,
  cardData: { ...cardData },
  cardErrors: { ...cardErrors },
  showSuccess: false,
  orderId: null,
  canSkip: false,
  skipOnlinePay: false,
  invoiceUrl: "",
  isCardPay: false,
  serviceTax: 0,
};

export default function checkoutReducer(state = initialState, action: CheckoutActionTypes) {
  switch (action.type) {
    case actionTypes.GET_ADDRESS:
      return { ...state, addressList: action.response.results };

    case actionTypes.CHECKOUT_OPEN:
      return updateObject(state, {
        open: true,
      });

    case actionTypes.CHECKOUT_CLOSE:
      return updateObject(state, {
        open: false,
      });

    case actionTypes.SAVE_ADDRESS: {
      return updateObject(state, {
        address: { ...address, ...action.payload },
        addressLoaded: true,
      });
    }

    case actionTypes.SAVE_BILLING_ADDRESS:
      return updateObject(state, {
        billingAddress: { ...address, ...action.payload },
        billingAddressLoaded: true,
      });

    case actionTypes.GOTO_NEXT_STEP:
      return updateObject(state, {
        step: state.step + (state.billingDuplicate ? 2 : 1),
      });

    case actionTypes.GOTO_PREV_STEP:
      return updateObject(state, {
        step: state.step - (state.billingDuplicate ? 2 : 1),
      });

    case actionTypes.GOTO_STEP:
      return { ...state, step: action.payload };

    case actionTypes.SAVE_COUNTRIES:
      return updateObject(state, {
        countries: action.payload,
        countriesLoaded: true,
      });

    case actionTypes.SAVE_CARD_DATA:
      return updateObject(state, {
        cardData: action.payload,
      });

    case actionTypes.UPDATE_ADDRESS_ERRORS:
      return updateObject(state, {
        addressErrors: {
          ...state.addressErrors,
          ...action.payload,
        },
      });

    case actionTypes.UPDATE_BILL_ADDRESS_ERRORS:
      return updateObject(state, {
        billingAddressErrors: {
          ...state.billingAddressErrors,
          ...action.payload,
        },
      });

    case actionTypes.UPDATE_CARD_ERRORS:
      return updateObject(state, {
        cardErrors: {
          ...state.cardErrors,
          ...action.payload,
        },
      });

    case actionTypes.CHECKOUT_START:
      return { ...state, inProgress: true };
    case actionTypes.CHECKOUT_PAY:
      return { ...state, inProgress: false };

    case actionTypes.RESET_CHECKOUT:
      return updateObject(state, {
        open: false,
        step: 1,
        orderId: null,
        showSuccess: false,
      });

    case actionTypes.SHOW_SUCCESS:
      return updateObject(state, {
        showSuccess: true,
      });

    case actionTypes.HIDE_SUCCESS:
      return updateObject(state, {
        showSuccess: false,
      });

    case actionTypes.SWITCH_SHIPPING_DUPLICATE:
      return updateObject(state, {
        shippingDuplicate: !state.shippingDuplicate,
      });

    case actionTypes.SWITCH_BILLING_DUPLICATE:
      return updateObject(state, {
        billingDuplicate: !state.billingDuplicate,
      });

    case actionTypes.SAVE_ORDER_ID:
      return updateObject(state, {
        orderId: action.payload,
      });

    case actionTypes.SAVE_CAN_SKIP:
      return updateObject(state, {
        canSkip: action.payload,
      });

    case actionTypes.SWITCH_SKIP_ONLINE_PAY:
      return updateObject(state, {
        skipOnlinePay: !state.skipOnlinePay,
      });

    case actionTypes.SET_CARD_PAY:
      return updateObject(state, {
        isCardPay: action.payload,
      });

    case actionTypes.SAVE_INVOICE_URL:
      return updateObject(state, {
        invoiceUrl: action.payload,
      });
    case actionTypes.CLEAR_CHECKOUT:
      return updateObject(state, {
        invoiceUrl: "",
        step: 1,
        showSuccess: false,
      });
    case actionTypes.CHECKOUT_ERROR: {
      if (action.error.response?.status === 400 && typeof action.error.response?.data === "object") {
        return { ...state, step: 1, open: false, inProgress: false };
      }
      return state;
    }
    case actionTypes.SET_SERVICE_TAX:
      return { ...state, serviceTax: action.payload };

    default:
      return state;
  }
}
