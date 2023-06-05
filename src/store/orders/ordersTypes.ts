export const SAVE_ORDERS = "SAVE_ORDERS";
export const LOAD_ORDERS_REQUEST = "LOAD_ORDERS_REQUEST";
export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS";
export const LOAD_ORDERS_FAILED = "LOAD_ORDERS_FAILED";
export const LOAD_ORDERS_ARRAY = [LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILED];

export const SAVE_FILTER_STATUS = "SAVE_FILTER_STATUS";

// State
interface BillingAddress {
  id: number;
  country: string;
  title: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  state: string;
  postcode: string;
  search_text: string;
}

interface ShippingAddress {
  id: number;
  country: string;
  title: string;
  first_name: string;
  last_name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  state: string;
  postcode: string;
  search_text: string;
  phone_number: string;
  notes: string;
}

interface Results {
  id: number;
  number: string;
  basket: string | null;
  url: string;
  lines: string;
  owner: string;
  billing_address: BillingAddress;
  currency: string;
  total_incl_tax: string;
  shipping_incl_tax: string;
  shipping_excl_tax: string;
  shipping_address: ShippingAddress;
  shipping_method: string;
  shipping_code: string;
  status: string;
  guest_email: string;
  date_placed: string;
  payment_url: string;
  invoice: string;
  offer_disc: any;
  voucher_discounts: any;
  document: number | null;
}

export interface Orders {
  count: number;
  total_pages: number;
  page: number;
  links: {
    next: string | null;
    previous: string | null;
  };
  results: Results;
}

export interface OrdersState {
  orders: Orders | {};
  ordersLoading: boolean;
  filterStatus: string | null;
}

// Actions
interface LoadOrdersStart {
  type: typeof LOAD_ORDERS_REQUEST;
}

interface LoadOrdersFinish {
  type: typeof LOAD_ORDERS_SUCCESS;
}

interface SaveOrders {
  type: typeof SAVE_ORDERS;
  payload: Orders;
}

interface SaveFilterStatus {
  type: typeof SAVE_FILTER_STATUS;
  payload: string;
}

interface LoadOrdersFailed {
  type: typeof LOAD_ORDERS_FAILED;
}

export type OrdersActions = LoadOrdersStart | LoadOrdersFinish | SaveOrders | SaveFilterStatus | LoadOrdersFailed;
