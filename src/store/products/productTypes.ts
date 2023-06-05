import { Seller } from "@src/store/sellers/sellersTypes";
import { CurrenciesAllowed } from "../currency/currencyTypes";

export const SET_LOADED_PRODUCTS = "@products/SET_LOADED_PRODUCTS";

export const LOAD_PRODUCT_BY_ID_R = "@products/LOAD_PRODUCT_BY_ID_R";
export const LOAD_PRODUCT_BY_ID_S = "@products/LOAD_PRODUCT_BY_ID_S";
export const LOAD_PRODUCT_BY_ID_F = "@products/LOAD_PRODUCT_BY_ID_F";
export const LOAD_PRODUCT_BY_ID_ARRAY = [LOAD_PRODUCT_BY_ID_R, LOAD_PRODUCT_BY_ID_S, LOAD_PRODUCT_BY_ID_F];

export const SAVE_PRODUCTS = "@products/SAVE_PRODUCTS";
export const CLEAR_PRODUCTS = "@products/CLEAR_PRODUCTS";
export const SAVE_RFQS = "@products/SAVE_RFQS";
export const CLEAR_RFQS = "@products/CLEAR_RFQS";

export const LOAD_STOCK_LIST_S = "@products/LOAD_STOCK_LIST_S";

export const LOAD_SELLERS_WITH_PRODUCT_LINK_R = "@products/LOAD_SELLERS_WITH_PRODUCT_LINK_R";
export const LOAD_SELLERS_WITH_PRODUCT_LINK_S = "@products/LOAD_SELLERS_WITH_PRODUCT_LINK_S";
export const LOAD_SELLERS_WITH_PRODUCT_LINK_F = "@products/LOAD_SELLERS_WITH_PRODUCT_LINK_F";
export const LOAD_SELLERS_WITH_PRODUCT_LINK_ARRAY = [
  LOAD_SELLERS_WITH_PRODUCT_LINK_R,
  LOAD_SELLERS_WITH_PRODUCT_LINK_S,
  LOAD_SELLERS_WITH_PRODUCT_LINK_F,
];

export const STOCKRECORD_ERROR_OUTDATED = "3";
export const STOCKRECORD_ERROR_PRICE = "6";

export interface Attribute {
  id: number;
  category: string;
  name: string;
  value: string | number | string[] | number[];
  code: string;
  group: { id: number; name: string };
  type: "text" | "integer" | "float";
}

export interface Stockrecord {
  date_created: string;
  date_updated: string;
  show_date_updated?: string;
  id: number;
  manufacturer: {
    code: string;
    id: number;
    logo: string;
    logo_url: string;
    name: string;
    url: string;
    users: any;
  };
  moq: number;
  mpq: number;
  num_in_stock: number;
  low_stock_threshold: number;
  lead_period: number;
  lead_period_str: number | string;
  partner: number;
  partner_name: string;
  partner_sku: string;
  partner_url: string;
  price_currency: CurrenciesAllowed;
  prices: { id: number; amount: number; price: number }[];
  product: number;
  errors?: { id: string; message: string; comment?: string }[]; // used in cart
  status: "api" | "order" | null;
  url: string;
}

export interface Product {
  attributes: Attribute[];
  categories: { id: number; name: string; slug: string }[];
  children: any[];
  date_created: string;
  date_updated: string;
  description: string;
  id: number;
  images: any[];
  manufacturer: { id: number; name: string };
  options: [];
  price: { currency: string; excl_tax: string; incl_tax: string; tax: string };
  stockrecords: Stockrecord[];
  title: string;
  upc: string;
  exclusive: boolean;
}

export interface RfqProductData {
  results: RfqProductDataItem[];
  count: number;
  page: number;
  total_pages: number;
}

export interface RfqProductDataItem {
  id: number;
  currency: CurrenciesAllowed;
  min_price: number;
  min_moq: number;
  num_in_stock: number;
  upc: string;
  sellers: number;
  images: Array<{ name: string; original: string }>;
}

export interface ProductStateItem extends Product {
  manufacturer: { id: number; name: string };
  parentId: number;
}

export interface ProductsState {
  stockList: number[];
  sellersWithProductLink: Seller[];
  products: ProductStateItem[];
  productViewData: ProductStateItem;
  rfqData: RfqProductData;
}

// Actions
export interface SaveProducts {
  type: typeof SAVE_PRODUCTS;
  payload: ProductStateItem[];
}

export interface ClearProducts {
  type: typeof CLEAR_PRODUCTS;
  payload: ProductStateItem[];
}

export interface SaveRfqs {
  type: typeof SAVE_RFQS;
  payload: RfqProductData;
}

export interface ClearRfqs {
  type: typeof CLEAR_RFQS;
}

export interface SetLoadedProducts {
  type: typeof SET_LOADED_PRODUCTS;
}

export interface LoadProductDyIdS {
  type: typeof LOAD_PRODUCT_BY_ID_S;
  response: any;
}

export interface LoadStockList {
  type: typeof LOAD_STOCK_LIST_S;
  response: number[];
}

export interface LoadSellersWithProductLinkS {
  type: typeof LOAD_SELLERS_WITH_PRODUCT_LINK_S;
  response: Seller[];
}

export interface LoadSellersWithProductLinkR {
  type: typeof LOAD_SELLERS_WITH_PRODUCT_LINK_R;
}

export interface LoadSellersWithProductLinkF {
  type: typeof LOAD_SELLERS_WITH_PRODUCT_LINK_F;
  error: any;
}

export type ProductsActionsType =
  | LoadSellersWithProductLinkR
  | LoadSellersWithProductLinkS
  | LoadSellersWithProductLinkF
  | LoadStockList
  | LoadProductDyIdS
  | SetLoadedProducts
  | SaveProducts
  | ClearProducts
  | SaveRfqs
  | ClearRfqs;
