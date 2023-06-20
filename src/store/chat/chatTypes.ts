import { RfqSeller } from "@src/store/rfq/rfqTypes";

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

export const LOAD_MESSAGES_R = "@chat/LOAD_MESSAGES_R";
export const LOAD_MESSAGES_S = "@chat/LOAD_MESSAGES_S";
export const LOAD_MORE_MESSAGES_S = "@chat/LOAD_MORE_MESSAGES_S";
export const LOAD_MESSAGES_F = "@chat/LOAD_MESSAGES_F";

export const SELECT_CHAT = "@chat/SELECT_CHAT";
export const ADD_MESSAGE = "@chat/ADD_MESSAGE";
export const SEND_MESSAGE_R = "@chat/SEND_MESSAGE_R";
export const SEND_MESSAGE_S = "@chat/SEND_MESSAGE_S";
export const SEND_MESSAGE_F = "@chat/SEND_MESSAGE_F";
export const SEND_MESSAGE_ARRAY = [SEND_MESSAGE_R, SEND_MESSAGE_S, SEND_MESSAGE_F];

export const ON_CHANGE_FILTERS_VALUES = "@chat/ON_CHANGE_FILTERS_VALUES";
export const DEDUCT_READ_MESSAGES = "@chat/DEDUCT_READ_MESSAGES";
export const SAVE_FILES = "@chat/SAVE_FILES";
export const CLEAR_CHAT_REDUCER = "@chat/CLEAR_CHAT_REDUCER";

export interface ChatState {
  filters: {
    upc_list: string[];
    partners_list: RfqSeller[];
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
    loaded: boolean;
    loadedPages: number[];
  };
  selectedChat: ChatListItem;
  messages: {
    error: string;
    total_pages: number;
    page: number;
    page_size: number;
    results: ChatListMessage[];
    isLoading: boolean;
    loaded: boolean;
  };
  files: { [key: number]: FileType };
}

export interface FileType {
  type: string;
  url: string;
}

export interface ChatListItem {
  id: number;
  created: string;
  partner: RfqSeller;
  rfq: {
    upc: string;
    quantity: number;
    price: number;
  };
  unread_messages: number;
  messages: ChatListMessage[];
}

export interface ChatListMessage {
  id: number;
  sender: string;
  read: boolean;
  text: string;
  created: string;
  message_attachments: Array<{ id: number; file_name: string }>;
  starter: number;
  representatives: any[];
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

interface SelectChatAction {
  type: typeof SELECT_CHAT;
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

export type ChatActionTypes =
  | SaveFilesAction
  | SelectChatAction
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
  | LoadMessagesRequestAction
  | LoadMessagesFailAction
  | LoadMessagesSuccessAction
  | LoadMoreMessagesSuccessAction
  | OnChangeFiltersValuesAction
  | DeductReadMessagesAction
  | ClearChatReducerAction;
