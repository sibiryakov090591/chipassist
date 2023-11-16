import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";
import { ResponseManufacturer } from "@src/store/manufacturers/manufacturersTypes";
import { Stockrecord, Product } from "@src/store/products/productTypes";

export const LOAD_RFQ_R = "LOAD_RFQ_R";
export const LOAD_RFQ_S = "LOAD_RFQ_S";
export const LOAD_RFQ_F = "LOAD_RFQ_F";
export const SAVE_RFQ_R = "SAVE_RFQ_R";
export const SAVE_RFQ_S = "SAVE_RFQ_S";
export const SAVE_RFQ_F = "SAVE_RFQ_F";
export const RFQ_RESPONSE_R = "RFQ_RESPONSE_R";
export const RFQ_RESPONSE_S = "RFQ_RESPONSE_S";
export const RFQ_RESPONSE_F = "RFQ_RESPONSE_F";
export const RFQ_UPDATE_R = "RFQ_UPDATE_R";
export const RFQ_UPDATE_S = "RFQ_UPDATE_S";
export const RFQ_UPDATE_F = "RFQ_UPDATE_F";
export const APPROVE_RESPONSE_R = "APPROVE_RESPONSE_R";
export const APPROVE_RESPONSE_S = "APPROVE_RESPONSE_S";
export const APPROVE_RESPONSE_F = "APPROVE_RESPONSE_F";
export const APPROVE_RESPONSE = [APPROVE_RESPONSE_R, APPROVE_RESPONSE_S, APPROVE_RESPONSE_F];
export const RFQ_RESPONSE = [RFQ_RESPONSE_R, RFQ_RESPONSE_S, RFQ_RESPONSE_F];
export const RFQ_UPDATE = [RFQ_UPDATE_R, RFQ_UPDATE_S, RFQ_UPDATE_F];
export const LOAD_RFQ = [LOAD_RFQ_R, LOAD_RFQ_S, LOAD_RFQ_F];
export const CLEAR_SUPPLIER_RESPONSE_DATA = "CLEAR_SUPPLIER_RESPONSE_DATA";
export const SAVE_RFQ_ARRAY = [SAVE_RFQ_R, SAVE_RFQ_S, SAVE_RFQ_F];
export const SAVE_RFQ = "SAVE_RFQ";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const SET_ITEM = "SET_ITEM";
export const CLEAR_ITEM = "CLEAR_ITEM";
export const MODAL_OPEN = "MODAL_OPEN";

export const SELLER_MESSAGE_MODAL_OPEN = "@rfq/SELLER_MESSAGE_MODAL_OPEN";
export const SELLER_MESSAGE_MODAL_CLOSE = "@rfq/SELLER_MESSAGE_MODAL_CLOSE";
export const SEND_SELLER_MESSAGE_R = "@rfq/SEND_SELLER_MESSAGE_R";
export const SEND_SELLER_MESSAGE_S = "@rfq/SEND_SELLER_MESSAGE_S";
export const SEND_SELLER_MESSAGE_F = "@rfq/SEND_SELLER_MESSAGE_F";
export const SEND_SELLER_MESSAGE_ARRAY = [SEND_SELLER_MESSAGE_R, SEND_SELLER_MESSAGE_S, SEND_SELLER_MESSAGE_F];

export const QUALITY_CHECK_MODAL_OPEN = "@rfq/QUALITY_CHECK_MODAL_OPEN";
export const QUALITY_CHECK_MODAL_CLOSE = "@rfq/QUALITY_CHECK_MODAL_CLOSE";
export const QUALITY_CHECK_R = "@rfq/QUALITY_CHECK_R";
export const QUALITY_CHECK_S = "@rfq/QUALITY_CHECK_S";
export const QUALITY_CHECK_F = "@rfq/QUALITY_CHECK_F";
export const QUALITY_CHECK_ARRAY = [QUALITY_CHECK_R, QUALITY_CHECK_S, QUALITY_CHECK_F];

export const SET_QUERY_UPC = "SET_QUERY_UPC";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const CLEAR_RFQ_RESPONSE = "CLEAR_RFQ_RESPONSE";
export const DELETE_RFQ_FROM_STORE = "DELETE_RFQ_FROM_STORE";
export const RFQS_NEED_UPDATE = "RFQS_NEED_UPDATE";
export const SAVE_RFQ_RESPONSE = "SAVE_RFQ_RESPONSE";
export const REMOVE_RFQ_RESPONSE = "REMOVE_RFQ_RESPONSE";

export interface RfqSeller {
  id: number;
  name: string;
  location?: string;
}

// RFQ modal window
export interface NewRfqItem {
  userId?: string;
  partNumber: string;
  prevPartNumber: string;
  // companyName: string;
  quantity: string;
  price: string;
  currency: CurrenciesAllowed;
  title: "order" | "rfq";
  // deliveryDate: string;
  // validateDate: string;
  stockrecord: Stockrecord;
  product: Product;
  seller: Array<RfqSeller>;
  // address: string;
  comment?: string;
  productId: number;
}

export interface RfqItem {
  address: string;
  approved: null | boolean | any;
  comment: string;
  created: string;
  delivery_date: string;
  id: number;
  part_number: string;
  price: string;
  quantity: number;
  response_rfq: Array<RfqResponseBackend>;
  seller: Array<RfqSeller>;
  user: number;
  valid_date: string;
  currency: CurrenciesAllowed;
  status: string;
}

export interface SellerRfqItem {
  created: string;
  id: number;
  part_number: string;
  quantity: number;
  manufacturer: ResponseManufacturer;
  response_rfq: {
    your_quantity: number;
    unit_price: number;
    datecode: string;
    alter_upc: string;
    created: string;
    lead_time: string;
    comment: string;
    summary: {
      count: number;
      min_price: number;
      best_price_other: boolean;
      best_price_your: boolean;
    };
    manufacturers: ResponseManufacturer[];
    manufacturer: ResponseManufacturer;
  };
}

export interface RfqLoadingState {
  loading: boolean;
  error: boolean;
}

export interface RfqListBackendResponse {
  count?: number;
  links?: { previous: any; next: any };
  total_pages?: number;
  page?: number;
  results?: Array<RfqItem>;
}

export interface ResponseItem extends SellerRfqItem {
  stock: number;
  price: number;
  alter_upc: string;
  created: string;
  currency: CurrenciesAllowed;
  datecode: string;
  lead_time: number;
  selected_manufacturer: ResponseManufacturer;
  other_manufacturer_name: string;
  comment: string;
}

export interface RfqState {
  rfqs: RfqListBackendResponse;
  rfqsNeedUpdate: number;
  rfqsLoading: boolean;
  rfqSaving: boolean;
  rfqModalOpen: boolean;
  sellerMessageModal: SellerMessageModal;
  qualityCheckModal: SellerMessageModal;
  isNeedRfqModalOpenAgain: boolean;
  rfqItem: NewRfqItem;
  rfqResponseData: { [key: string]: ResponseItem };
  rfqResponse: RfqLoadingState;
  rfqUpdate: RfqLoadingState;
  rfqErrors: any;
}

interface SellerMessageModal {
  open: boolean;
  isNeedModalOpenAgain: boolean;
  partNumber: string;
  stockrecordId: number;
  sellerId: number;
  sellerName: string;
  isSending: boolean;
}

export interface RfqResponseBackend {
  rfq: number;
  seller: { id: number; name: string };
  id: number;
  name: string;
  price: string;
  delivery_date: string | null;
  valid_date: string | null;
  accepted: boolean;
}

interface SetRfqItemAction {
  type: typeof SET_ITEM;
  payload: NewRfqItem;
}

interface ClearRfqItemAction {
  type: typeof CLEAR_ITEM;
}

interface LoadRfqRequestAction {
  type: typeof LOAD_RFQ_R;
}

interface LoadRfqSuccessAction {
  type: typeof LOAD_RFQ_S;
  response: RfqListBackendResponse;
}

interface LoadRfqFailureAction {
  type: typeof LOAD_RFQ_F;
  error: any;
}

interface ClearSupplierResponseDataAction {
  type: typeof CLEAR_SUPPLIER_RESPONSE_DATA;
}

// TODO: delete?
interface SaveRfqAction {
  type: typeof SAVE_RFQ;
  payload: RfqListBackendResponse;
}

interface SaveRfqRequestAction {
  type: typeof SAVE_RFQ_R;
}

interface SaveRfqSuccessAction {
  type: typeof SAVE_RFQ_S;
}

interface SaveRfqFailureAction {
  type: typeof SAVE_RFQ_F;
  error: any;
}

interface UpdateRfqRequestAction {
  type: typeof RFQ_UPDATE_R;
}

interface UpdateRfqSuccessAction {
  type: typeof RFQ_UPDATE_S;
}

interface UpdateRfqFailureAction {
  type: typeof RFQ_UPDATE_F;
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: { id: number; data: Record<string, any> };
}

interface RfqModalOpenAction {
  type: typeof MODAL_OPEN;
  payload: {
    partNumber: string;
    productId: number;
    quantity: string | number;
    stockrecord: Stockrecord;
    product: Product;
    price: string;
    currency: CurrenciesAllowed;
    title: "order" | "rfq";
  };
}

interface RfqModalCloseAction {
  type: typeof MODAL_CLOSE;
}

interface SetSellerMessageData {
  type: typeof SELLER_MESSAGE_MODAL_OPEN;
  payload: {
    open: boolean;
    partNumber: string;
    sellerId: number;
    sellerName: string;
    stockrecordId: number;
  };
}

interface SetQualityCheckData {
  type: typeof QUALITY_CHECK_MODAL_OPEN;
  payload: {
    open: boolean;
    partNumber: string;
    sellerId: number;
    sellerName: string;
    stockrecordId: number;
  };
}

interface QualityCheckModalCloseAction {
  type: typeof QUALITY_CHECK_MODAL_CLOSE;
}

interface QualityCheckRequestAction {
  type: typeof QUALITY_CHECK_R;
}

interface QualityCheckSuccessAction {
  type: typeof QUALITY_CHECK_S;
  response: any;
}

interface QualityCheckFailureAction {
  type: typeof QUALITY_CHECK_F;
  error: any;
}

interface SellerMessageModalCloseAction {
  type: typeof SELLER_MESSAGE_MODAL_CLOSE;
}

interface SellerMessageRequestAction {
  type: typeof SEND_SELLER_MESSAGE_R;
}

interface SellerMessageSuccessAction {
  type: typeof SEND_SELLER_MESSAGE_S;
  response: any;
}

interface SellerMessageFailureAction {
  type: typeof SEND_SELLER_MESSAGE_F;
  error: any;
}

interface RfqResponseRequestAction {
  type: typeof RFQ_RESPONSE_R;
}

interface RfqResponseSuccessAction {
  type: typeof RFQ_RESPONSE_S;
  response: RfqResponseBackend;
}

interface RfqResponseFailureAction {
  type: typeof RFQ_RESPONSE_F;
}

interface ClearRfqResponseAction {
  type: typeof CLEAR_RFQ_RESPONSE;
}

interface ApproveRfqResponseSuccessAction {
  type: typeof APPROVE_RESPONSE_S;
  response: RfqItem;
}

interface DeleteRfqFromStoreAction {
  type: typeof DELETE_RFQ_FROM_STORE;
  payload: number;
}

interface RfqsNeedUpdateAction {
  type: typeof RFQS_NEED_UPDATE;
}

interface SetQueryUpcAction {
  type: typeof SET_QUERY_UPC;
  payload: string;
}

interface SaveRfqResponse {
  type: typeof SAVE_RFQ_RESPONSE;
  payload: ResponseItem;
}

interface RemoveRfqResponse {
  type: typeof REMOVE_RFQ_RESPONSE;
  payload: number;
}

export type RfqActionTypes =
  | QualityCheckFailureAction
  | QualityCheckSuccessAction
  | QualityCheckRequestAction
  | QualityCheckModalCloseAction
  | SetQualityCheckData
  | SetSellerMessageData
  | SellerMessageModalCloseAction
  | SellerMessageRequestAction
  | SellerMessageSuccessAction
  | SellerMessageFailureAction
  | ClearSupplierResponseDataAction
  | SaveRfqResponse
  | RemoveRfqResponse
  | SetQueryUpcAction
  | SetRfqItemAction
  | ClearRfqItemAction
  | LoadRfqRequestAction
  | LoadRfqSuccessAction
  | LoadRfqFailureAction
  | SaveRfqAction
  | SaveRfqRequestAction
  | SaveRfqSuccessAction
  | SaveRfqFailureAction
  | UpdateRfqRequestAction
  | UpdateRfqSuccessAction
  | UpdateRfqFailureAction
  | UpdateItemAction
  | RfqModalOpenAction
  | RfqModalCloseAction
  | RfqResponseRequestAction
  | RfqResponseSuccessAction
  | RfqResponseFailureAction
  | ClearRfqResponseAction
  | ApproveRfqResponseSuccessAction
  | DeleteRfqFromStoreAction
  | RfqsNeedUpdateAction;
