import { Product, Stockrecord } from "@src/store/products/productTypes";
import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";

export const GET_CART_R = "@cart/GET_CART_R";
export const GET_CART_S = "@cart/GET_CART_S";
export const GET_CART_F = "@cart/GET_CART_F";
export const GET_CART_ARRAY = [GET_CART_R, GET_CART_S, GET_CART_F];

export const GET_CART_ITEMS_R = "@cart/GET_CART_ITEMS_R";
export const GET_CART_ITEMS_S = "@cart/GET_CART_ITEMS_S";
export const GET_CART_ITEMS_F = "@cart/GET_CART_ITEMS_F";
export const GET_CART_ITEMS_ARRAY = [GET_CART_R, GET_CART_S, GET_CART_F];
export const GET_CART_ITEMS_LOCAL_STORAGE = "@cart/GET_CART_ITEMS_LOCAL_STORAGE";

export const SAVE_CART = "@cart/SAVE_CART";
export const SAVE_CART_ITEMS = "@cart/SAVE_CART_ITEMS";
export const JOIN_CART_ITEMS = "@cart/JOIN_CART_ITEMS";

export const ADD_CART_ITEM_R = "@cart/ADD_CART_ITEM_R";
export const ADD_CART_ITEM_S = "@cart/ADD_CART_ITEM_S";
export const ADD_CART_ITEM_F = "@cart/ADD_CART_ITEM_F";
export const ADD_CART_ITEM_ARRAY = [ADD_CART_ITEM_R, ADD_CART_ITEM_S, ADD_CART_ITEM_F];
export const ADD_CART_ITEM_LOCAL_STORAGE = "@cart/ADD_CART_ITEM_LOCAL_STORAGE";

export const UPDATE_CART_ITEM_R = "@cart/UPDATE_CART_ITEM_R";
export const UPDATE_CART_ITEM_S = "@cart/UPDATE_CART_ITEM_S";
export const UPDATE_CART_ITEM_F = "@cart/UPDATE_CART_ITEM_F";
export const UPDATE_CART_ITEM_ARRAY = [UPDATE_CART_ITEM_R, UPDATE_CART_ITEM_S, UPDATE_CART_ITEM_F];
export const UPDATE_CART_ITEM_LOCAL_STORAGE = "@cart/UPDATE_CART_ITEM_LOCAL_STORAGE";

export const REMOVE_CART_ITEM_R = "@cart/REMOVE_CART_ITEM_R";
export const REMOVE_CART_ITEM_S = "@cart/REMOVE_CART_ITEM_S";
export const REMOVE_CART_ITEM_F = "@cart/REMOVE_CART_ITEM_F";
export const REMOVE_CART_ITEM_ARRAY = [REMOVE_CART_ITEM_R, REMOVE_CART_ITEM_S, REMOVE_CART_ITEM_F];
export const REMOVE_CART_ITEM_LOCAL_STORAGE = "@cart/REMOVE_CART_ITEM_LOCAL_STORAGE";

export const CLEAR_CART = "@cart/CLEAR_CART";
export const CLEAR_CART_ITEMS = "@cart/CLEAR_CART_ITEMS";

export const PRODUCT_UPDATE_START = "@cart/PRODUCT_UPDATE_START";
export const PRODUCT_UPDATE_SAVE = "@cart/PRODUCT_UPDATE_SAVE";
export const PRODUCT_UPDATE_FINISH = "@cart/PRODUCT_UPDATE_FINISH";

export const CHECKOUT_ERROR = "@cart/CHECKOUT_ERROR";
export const UPDATE_CART_COUNT = "@cart/UPDATE_CART_COUNT";

export interface CartState {
  info: CartInfo;
  loaded: boolean;
  count: number;
  total_pages: number;
  items: Array<BackendCartItem>;
  itemsLoaded: boolean;
  itemsUpdating: number[];
  itemsRemoving: number[];
  addMode: string;
  needsUpdateCounter: number;
}

export interface ExistingCartItem {
  basket_id: number;
  id: number;
  lineId: number | string;
  quantity: number;
  attribute?: string; // bom name
  url: string;
  upc: string;
  name?: string;
  description?: string;
  perItem?: string;
  img?: string;
  manufacture?: { id: number; name: string };
  stockrecords?: Stockrecord[];
  stockrecord?: Stockrecord;
  isDuplicate?: boolean;
  dateUpdated: string;
  numInStock: number;
  rfq?: 0 | 1;
  isUpdating: boolean;
  isRemoving: boolean;
  isAuthenticated: boolean;
  errors: { id: number | string; field: string; message: string; rfq: number }[];
  handleSetErrors: (
    id: number | string,
    field: string,
    message: string,
    rfq: number,
    isRemove?: boolean,
    isRemoveAll?: boolean,
  ) => void;
  priceRange?: PriceRange;
  sellers?: string[];
}

export interface PriceRange {
  from: number;
  to: number;
  fromCurrency: CurrenciesAllowed;
  toCurrency: CurrenciesAllowed;
}

export interface BackendCartItem {
  attributes: Array<any>;
  basket: string; // url
  date_updated?: string;
  is_tax_known?: boolean;
  price_currency?: string;
  price_excl_tax_excl_discounts?: string;
  price_incl_tax?: string;
  price_incl_tax_excl_discounts?: string;
  product: Product; // url
  productId: number; // used
  quantity: number;
  stockrecord: Stockrecord;
  url: string;
  warning: any;
  id?: number;
  rfq?: 0 | 1;
}

export interface CartInfo {
  currency?: string;
  id: number;
  is_tax_known?: boolean;
  lines: string; // url
  offer_discounts?: Array<any>;
  owner?: string; // url
  status: string;
  total_incl_tax?: string;
  total_incl_tax_excl_discounts?: string;
  total_tax?: string;
  url: string;
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

interface ClearCartItemsAction {
  type: typeof CLEAR_CART_ITEMS;
}

interface GetCartRequestAction {
  type: typeof GET_CART_R;
}

interface GetCartSuccessAction {
  type: typeof GET_CART_S;
}

interface GetCartFailureAction {
  type: typeof GET_CART_F;
}

interface GetCartItemsAction {
  type: typeof GET_CART_ITEMS_R | typeof GET_CART_ITEMS_S | typeof GET_CART_ITEMS_F;
}

interface GetCartItemsLocalStorageAction {
  type: typeof GET_CART_ITEMS_LOCAL_STORAGE;
  payload: {
    products: { data: Product }[];
    cartItems: { product: number; stockrecord: number; quantity: number; basket: number; rfq: 1 | 0 }[];
  };
}
interface SaveCartAction {
  type: typeof SAVE_CART;
  payload: CartInfo;
}

interface SaveCartItemsAction {
  type: typeof SAVE_CART_ITEMS;
  payload: {
    items: BackendCartItem[];
    count: number;
    total_pages: number;
  };
}

interface JoinCartItemsAction {
  type: typeof JOIN_CART_ITEMS;
  payload: {
    items: BackendCartItem[];
    count: number;
    total_pages: number;
  };
}

interface AddCartItemRequestAction {
  type: typeof ADD_CART_ITEM_R;
}
interface AddCartItemSuccessAction {
  type: typeof ADD_CART_ITEM_S;
  response: any;
}
interface AddCartItemFailedAction {
  type: typeof ADD_CART_ITEM_F;
}
interface AddCartItemLocalStorageAction {
  type: typeof ADD_CART_ITEM_LOCAL_STORAGE;
  payload: {
    id: string;
    product: Product;
    stockrecord: Stockrecord;
    quantity: number;
    rfq: 0 | 1;
  };
}
interface UpdateCartItemRequestAction {
  type: typeof UPDATE_CART_ITEM_R;
  payload: number;
}
interface UpdateCartItemSuccessAction {
  type: typeof UPDATE_CART_ITEM_S;
  response: any;
  payload: number;
}
interface UpdateCartItemFailedAction {
  type: typeof UPDATE_CART_ITEM_F;
  payload: number;
}

interface UpdateCartItemLocalStorageAction {
  type: typeof UPDATE_CART_ITEM_LOCAL_STORAGE;
  payload: { line_id: number; data: { quantity?: number; stockrecord?: number; price?: number; rfq?: number } };
}
interface RemoveCartItemRequestAction {
  type: typeof REMOVE_CART_ITEM_R;
  payload: number;
}
interface RemoveCartItemSuccessAction {
  type: typeof REMOVE_CART_ITEM_S;
  payload: number;
}
interface RemoveCartItemFailedAction {
  type: typeof REMOVE_CART_ITEM_F;
  payload: number;
}

interface RemoveCartItemLocalStorageAction {
  type: typeof REMOVE_CART_ITEM_LOCAL_STORAGE;
  payload: number;
}

interface ProductUpdateStartAction {
  type: typeof PRODUCT_UPDATE_START;
  payload: number | string;
}

interface ProductUpdateSaveAction {
  type: typeof PRODUCT_UPDATE_SAVE;
  payload: any;
}

interface ProductUpdateFinishAction {
  type: typeof PRODUCT_UPDATE_FINISH;
  payload: number | string;
}

interface CheckoutErrorAction {
  type: typeof CHECKOUT_ERROR;
  error: any;
}

interface UpdateCountAction {
  type: typeof UPDATE_CART_COUNT;
  payload: number;
}

export type CartActionTypes =
  | GetCartRequestAction
  | GetCartSuccessAction
  | GetCartFailureAction
  | GetCartItemsAction
  | GetCartItemsLocalStorageAction
  | SaveCartAction
  | SaveCartItemsAction
  | JoinCartItemsAction
  | AddCartItemRequestAction
  | AddCartItemSuccessAction
  | AddCartItemFailedAction
  | AddCartItemLocalStorageAction
  | UpdateCartItemRequestAction
  | UpdateCartItemSuccessAction
  | UpdateCartItemFailedAction
  | UpdateCartItemLocalStorageAction
  | RemoveCartItemRequestAction
  | RemoveCartItemSuccessAction
  | RemoveCartItemFailedAction
  | RemoveCartItemLocalStorageAction
  | ClearCartAction
  | ClearCartItemsAction
  | ProductUpdateStartAction
  | ProductUpdateSaveAction
  | ProductUpdateFinishAction
  | UpdateCountAction
  | CheckoutErrorAction;
