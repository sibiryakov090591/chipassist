export const GET_ADDRESS = "GET_ADDRESS";

export const CHECKOUT_OPEN = "CHECKOUT_OPEN";
export const CHECKOUT_CLOSE = "CHECKOUT_CLOSE";

export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const SAVE_BILLING_ADDRESS = "SAVE_BILLING_ADDRESS";
export const SAVE_CAN_SKIP = "SAVE_CAN_SKIP";
export const SWITCH_SKIP_ONLINE_PAY = "SWITCH_SKIP_ONLINE_PAY";
export const SET_CARD_PAY = "SET_CARD_PAY";

export const GOTO_NEXT_STEP = "GOTO_NEXT_STEP";
export const GOTO_PREV_STEP = "GOTO_PREV_STEP";
export const GOTO_STEP = "GOTO_STEP";

export const SWITCH_SHIPPING_DUPLICATE = "SWITCH_SHIPPING_DUPLICATE";
export const SWITCH_BILLING_DUPLICATE = "SWITCH_BILLING_DUPLICATE";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const SAVE_COUNTRIES = "SAVE_COUNTRIES";

export const SAVE_CARD_DATA = "SAVE_CARD_DATA";

export const CHECKOUT_START = "CHECKOUT_START";
export const CHECKOUT_PAY = "CHECKOUT_PAY";
export const CHECKOUT_ERROR = "@cart/CHECKOUT_ERROR";

export const QUICK_ORDER_START = "QUICK_ORDER_START";
export const QUICK_ORDER_PAY = "QUICK_ORDER_PAY";
export const QUICK_ORDER_ERROR = "QUICK_ORDER_ERROR";
export const QUICK_ORDER_ARRAY = [QUICK_ORDER_START, QUICK_ORDER_PAY, QUICK_ORDER_ERROR];
export const QUICK_ORDER_CLOSE = "QUICK_ORDER_CLOSE";
export const QUICK_ORDER_SET_ITEM = "QUICK_ORDER_SET_ITEM";

export const UPDATE_ADDRESS_ERRORS = "UPDATE_ADDRESS_ERRORS";
export const UPDATE_BILL_ADDRESS_ERRORS = "UPDATE_BILL_ADDRESS_ERRORS";
export const UPDATE_CARD_ERRORS = "UPDATE_CARD_ERRORS";

export const RESET_CHECKOUT = "RESET_CHECKOUT";
export const SHOW_SUCCESS = "SHOW_SUCCESS";
export const HIDE_SUCCESS = "HIDE_SUCCESS";

export const SAVE_ORDER_ID = "SAVE_ORDER_ID";

export const SAVE_INVOICE_URL = "SAVE_INVOICE_URL";
export const CLEAR_CHECKOUT = "CLEAR_CHECKOUT";
export const CANCEL_INVOICE = "CANCEL_INVOICE";
export const SET_SERVICE_TAX = "SET_SERVICE_TAX";

export interface CheckoutAddress {
  id?: number;
  title: string;
  inn: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  state: string;
  postcode: string;
  country: string;
  // phone_number: string;
  phone_number_str: string;
  company_name: string;
  notes: string;
  is_default_for_shipping: boolean;
  is_default_for_billing: boolean;
}

export interface CheckoutAddressErrors {
  title?: string;
  inn?: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2?: string;
  line3?: string;
  line4: string; // city
  state?: string;
  postcode: string;
  country: string;
  phone_number: string;
  company_name: string;
  notes?: string;
}

export interface CheckoutCardErrors {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardholderName: string;
  payServerError: string;
  apiServerError: string;
}

export interface CheckoutCardData {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardholderName: string;
}

export interface CheckoutState {
  open: boolean;
  step: number;
  inProgress: boolean;
  token: string;
  addressList: CheckoutAddress[];
  address: CheckoutAddress;
  addressLoaded: boolean;
  addressErrors: CheckoutAddressErrors;
  billingAddress: CheckoutAddress;
  billingAddressLoaded: boolean;
  billingAddressErrors: CheckoutAddressErrors;
  shippingDuplicate: boolean;
  billingDuplicate: boolean;
  countries: Array<any>;
  countriesLoaded: boolean;
  cardData: CheckoutCardData;
  cardErrors: CheckoutCardErrors;
  showSuccess: boolean;
  orderId: string | number | null;
  canSkip: boolean;
  skipOnlinePay: boolean;
  invoiceUrl: string;
  isCardPay: boolean;
  errors?: any;
  serviceTax: number;
}

interface OpenCheckoutAction {
  type: typeof CHECKOUT_OPEN;
}

interface CloseCheckoutAction {
  type: typeof CHECKOUT_CLOSE;
}

interface SaveBillingAddressAction {
  type: typeof SAVE_BILLING_ADDRESS;
  payload: CheckoutAddress;
}

interface SaveCardDataAction {
  type: typeof SAVE_CARD_DATA;
  payload: CheckoutCardData;
}

interface GotoNextStepAction {
  type: typeof GOTO_NEXT_STEP;
}

interface GotoPrevStepAction {
  type: typeof GOTO_PREV_STEP;
}

interface GotoStepAction {
  type: typeof GOTO_STEP;
  payload: number;
}

interface SaveInvoiceUrlAction {
  type: typeof SAVE_INVOICE_URL;
  payload: string;
}

interface SaveOrderIdAction {
  type: typeof SAVE_ORDER_ID;
  payload: string;
}

interface UpdateAddressErrorsAction {
  type: typeof UPDATE_ADDRESS_ERRORS;
  payload: CheckoutAddressErrors;
}

interface UpdateBillAddressErrorsAction {
  type: typeof UPDATE_BILL_ADDRESS_ERRORS;
  payload: CheckoutAddressErrors;
}

interface UpdateCardErrorsAction {
  type: typeof UPDATE_CARD_ERRORS;
  payload: CheckoutCardErrors;
}

interface ResetCheckoutAction {
  type: typeof RESET_CHECKOUT;
}

interface ShowSuccessAction {
  type: typeof SHOW_SUCCESS;
}

interface HideSuccessAction {
  type: typeof HIDE_SUCCESS;
}

interface SaveCanSkipAction {
  type: typeof SAVE_CAN_SKIP;
  payload: boolean;
}

interface SwitchSkipOnlinePayAction {
  type: typeof SWITCH_SKIP_ONLINE_PAY;
}

interface SetCardPayAction {
  type: typeof SET_CARD_PAY;
  payload: boolean;
}

interface GetAddressAction {
  type: typeof GET_ADDRESS;
  response: { results: any };
}

interface SaveAddressAction {
  type: typeof SAVE_ADDRESS;
  payload: CheckoutAddress;
}

interface SaveCountriesAction {
  type: typeof SAVE_COUNTRIES;
  payload: any;
}

interface SwitchShippingDuplicateAction {
  type: typeof SWITCH_SHIPPING_DUPLICATE;
}

interface SwitchBillingDuplicateAction {
  type: typeof SWITCH_BILLING_DUPLICATE;
}

interface ClearCheckoutAction {
  type: typeof CLEAR_CHECKOUT;
}
interface CheckoutStartAction {
  type: typeof CHECKOUT_START;
}
interface CheckoutPayAction {
  type: typeof CHECKOUT_PAY;
}
interface CheckoutErrorAction {
  type: typeof CHECKOUT_ERROR;
  error: any;
}
interface SetServiceTaxAction {
  type: typeof SET_SERVICE_TAX;
  payload: number;
}

export type CheckoutActionTypes =
  | SetServiceTaxAction
  | OpenCheckoutAction
  | ClearCheckoutAction
  | GetAddressAction
  | SaveAddressAction
  | CloseCheckoutAction
  | SaveCardDataAction
  | GotoNextStepAction
  | GotoPrevStepAction
  | GotoStepAction
  | SaveInvoiceUrlAction
  | SaveOrderIdAction
  | SaveCountriesAction
  | UpdateAddressErrorsAction
  | UpdateBillAddressErrorsAction
  | UpdateCardErrorsAction
  | ResetCheckoutAction
  | ShowSuccessAction
  | HideSuccessAction
  | SaveCanSkipAction
  | SwitchShippingDuplicateAction
  | SwitchBillingDuplicateAction
  | SwitchSkipOnlinePayAction
  | SetCardPayAction
  | SaveBillingAddressAction
  | CheckoutStartAction
  | CheckoutPayAction
  | CheckoutErrorAction;
