import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";

export const LOAD_CHAT_FILTERS_R = "@chat/LOAD_CHAT_FILTERS_R";
export const LOAD_CHAT_FILTERS_S = "@chat/LOAD_CHAT_FILTERS_S";
export const LOAD_CHAT_FILTERS_F = "@chat/LOAD_CHAT_FILTERS_F";
export const LOAD_CHAT_FILTERS_ARRAY = [LOAD_CHAT_FILTERS_R, LOAD_CHAT_FILTERS_S, LOAD_CHAT_FILTERS_F];

export const LOAD_CHAT_LIST_R = "@chat/LOAD_CHAT_LIST_R";
export const LOAD_CHAT_LIST_S = "@chat/LOAD_CHAT_LIST_S";
export const LOAD_MORE_CHAT_LIST_S = "@chat/LOAD_MORE_CHAT_LIST_S";
export const LOAD_CHAT_LIST_F = "@chat/LOAD_CHAT_LIST_F";
export const LOAD_CHAT_LIST_ARRAY = [LOAD_CHAT_LIST_R, LOAD_CHAT_LIST_S, LOAD_CHAT_LIST_F];

export const UPDATE_CHAT_LIST_S = "@chat/UPDATE_CHAT_LIST_S";
export const UPDATE_MESSAGES_S = "@chat/UPDATE_MESSAGES_S";

export const UPDATE_STOCKRECORD_R = "@chat/UPDATE_STOCKRECORD_R";
export const UPDATE_STOCKRECORD_S = "@chat/UPDATE_STOCKRECORD_S";
export const UPDATE_STOCKRECORD_F = "@chat/UPDATE_STOCKRECORD_F";
export const UPDATE_STOCKRECORD_ARRAY = [UPDATE_STOCKRECORD_R, UPDATE_STOCKRECORD_S, UPDATE_STOCKRECORD_F];

export const LOAD_MESSAGES_R = "@chat/LOAD_MESSAGES_R";
export const LOAD_MESSAGES_S = "@chat/LOAD_MESSAGES_S";
export const LOAD_MORE_MESSAGES_S = "@chat/LOAD_MORE_MESSAGES_S";
export const LOAD_MESSAGES_F = "@chat/LOAD_MESSAGES_F";

export const SELECT_CHAT = "@chat/SELECT_CHAT";
export const CLEAR_CHAT = "@chat/CLEAR_CHAT";
export const ADD_MESSAGE = "@chat/ADD_MESSAGE";
export const SEND_MESSAGE_R = "@chat/SEND_MESSAGE_R";
export const SEND_MESSAGE_S = "@chat/SEND_MESSAGE_S";
export const SEND_MESSAGE_F = "@chat/SEND_MESSAGE_F";
export const SEND_MESSAGE_ARRAY = [SEND_MESSAGE_R, SEND_MESSAGE_S, SEND_MESSAGE_F];

export const ON_CHANGE_FILTERS_VALUES = "@chat/ON_CHANGE_FILTERS_VALUES";
export const DEDUCT_READ_MESSAGES = "@chat/DEDUCT_READ_MESSAGES";
export const SAVE_FILES = "@chat/SAVE_FILES";
export const CLEAR_CHAT_REDUCER = "@chat/CLEAR_CHAT_REDUCER";
export const READ_MESSAGE = "@chat/READ_MESSAGE";
export const SET_STOCK_ERROR = "@chat/SET_STOCK_ERROR";
export const CLEAR_STOCK_ERROR = "@chat/CLEAR_STOCK_ERROR";
export const TRIGGER_RELOAD_PAGE = "@chat/TRIGGER_RELOAD_PAGE";

export interface ChatState {
  filters: {
    upc_list: string[];
    partner_list: PartnersListItem[];
    values: {
      upc: string;
      partner: number;
    };
  };
  chatList: {
    total_pages: number;
    page_size: number;
    unread_total: number;
    page: number;
    results: ChatListItem[];
    isLoading: boolean;
    loadedPages: number[];
  };
  selectedChat: ChatListItem;
  stockrecordUpdating: boolean;
  stockrecordErrors: StockErrorsFields;
  messages: {
    error: string;
    total_pages: number;
    page: number;
    page_size: number;
    results: { [key: string]: ChatListMessage[] };
    isLoading: boolean;
    forceUpdate: number;
  };
  files: { [key: number]: FileType };
  triggerReloadPage: number;
}

export interface PartnersListItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
}

export interface FileType {
  type: string;
  url: string;
}

export interface StockErrorsFields {
  num_in_stock?: boolean;
  price?: boolean;
  leadTime?: boolean;
}

export interface ChatListItem {
  id: number;
  created: string;
  partner: ChatPartner;
  partner_name: string;
  title: string;
  details: {
    po?: any;
    invoice?: any;
    quantity: number;
    price: number;
  };
  rfq: {
    id?: number;
    upc: string;
    quantity: number;
    price: number;
    currency: CurrenciesAllowed;
    delivery_time: any;
    moq: number;
    mpq: number;
    num_in_stock: number;
  };
  unread_messages: number;
  messages: ChatListMessage[];
  stocks: ChatListStock[];
}

export interface ChatPartner {
  first_name: string;
  last_name: string;
  company_name: string;
}

export interface ChatListStock {
  currency: CurrenciesAllowed;
  id: number;
  upc: string;
  lead_period_str: string;
  moq: number;
  mpq: number;
  num_in_stock: number;
  packaging: string;
  partner_sku: string;
  prices: { id: number; amount: number; original?: number; price?: number }[];
}

export interface ChatListMessage {
  id: number;
  sender: string;
  read: boolean;
  read_by_partner: boolean;
  text: string;
  created: string;
  message_files: Array<{ id: number; file: string }>;
  starter: number;
  representatives: any[];
  po?: any;
  invoice?: any;
}

interface LoadChatFiltersRequestAction {
  type: typeof LOAD_CHAT_FILTERS_R;
}
interface LoadChatFiltersSuccessAction {
  type: typeof LOAD_CHAT_FILTERS_S;
  response: any;
}
interface LoadChatFiltersFailAction {
  type: typeof LOAD_CHAT_FILTERS_F;
  error: any;
}

interface LoadChatListRequestAction {
  type: typeof LOAD_CHAT_LIST_R;
}
interface LoadChatListSuccessAction {
  type: typeof LOAD_CHAT_LIST_S;
  response: any;
}
interface LoadMoreChatListSuccessAction {
  type: typeof LOAD_MORE_CHAT_LIST_S;
  response: any;
}
interface LoadChatListFailAction {
  type: typeof LOAD_CHAT_LIST_F;
  error: any;
}

interface UpdateChatListAction {
  type: typeof UPDATE_CHAT_LIST_S;
  response: any;
}

interface UpdateStockrecordAction {
  type: typeof UPDATE_STOCKRECORD_R | typeof UPDATE_STOCKRECORD_F;
}
interface UpdateStockrecordSuccessAction {
  type: typeof UPDATE_STOCKRECORD_S;
  payload: {
    stock: any;
    chatId: number;
  };
}

interface LoadMessagesRequestAction {
  type: typeof LOAD_MESSAGES_R;
}
interface LoadMessagesSuccessAction {
  type: typeof LOAD_MESSAGES_S;
  payload: {
    response: any;
    rewind: boolean;
  };
}
interface LoadMoreMessagesSuccessAction {
  type: typeof LOAD_MORE_MESSAGES_S;
  payload: {
    response: any;
    rewind: boolean;
  };
}
interface LoadMessagesFailAction {
  type: typeof LOAD_MESSAGES_F;
  error: any;
}

interface UpdateMessagesAction {
  type: typeof UPDATE_MESSAGES_S;
  payload: any;
}

interface SelectChatAction {
  type: typeof SELECT_CHAT;
  payload: any;
}

interface ClearChatAction {
  type: typeof CLEAR_CHAT;
  payload: any;
}

interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: { chatId: number; message: any };
}

interface SendMessageRequestAction {
  type: typeof SEND_MESSAGE_R;
}
interface SendMessageSuccessAction {
  type: typeof SEND_MESSAGE_S;
  response: any;
}
interface SendMessageFailAction {
  type: typeof SEND_MESSAGE_F;
  error: any;
}

interface DeductReadMessagesAction {
  type: typeof DEDUCT_READ_MESSAGES;
  payload: { chatId: number; count: number };
}

interface ClearChatReducerAction {
  type: typeof CLEAR_CHAT_REDUCER;
}

interface OnChangeFiltersValuesAction {
  type: typeof ON_CHANGE_FILTERS_VALUES;
  payload: any;
}

interface SaveFilesAction {
  type: typeof SAVE_FILES;
  payload: any;
}

interface SetStockErrorAction {
  type: typeof SET_STOCK_ERROR;
  payload: StockErrorsFields;
}

interface ClearStockErrorsAction {
  type: typeof CLEAR_STOCK_ERROR;
}

interface TriggerReloadPageAction {
  type: typeof TRIGGER_RELOAD_PAGE;
}

export type ChatActionTypes =
  | TriggerReloadPageAction
  | UpdateStockrecordAction
  | UpdateStockrecordSuccessAction
  | SaveFilesAction
  | SelectChatAction
  | ClearChatAction
  | AddMessageAction
  | SendMessageRequestAction
  | SendMessageSuccessAction
  | SendMessageFailAction
  | LoadChatFiltersRequestAction
  | LoadChatFiltersSuccessAction
  | LoadChatFiltersFailAction
  | LoadChatListRequestAction
  | LoadChatListSuccessAction
  | LoadMoreChatListSuccessAction
  | LoadChatListFailAction
  | UpdateChatListAction
  | UpdateMessagesAction
  | LoadMessagesRequestAction
  | LoadMessagesFailAction
  | LoadMessagesSuccessAction
  | LoadMoreMessagesSuccessAction
  | OnChangeFiltersValuesAction
  | DeductReadMessagesAction
  | SetStockErrorAction
  | ClearStockErrorsAction
  | ClearChatReducerAction;
