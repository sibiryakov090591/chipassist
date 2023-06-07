import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "./chatTypes";

const initialState: actionTypes.ChatState = {
  filters: {
    upc_list: null,
    partners_list: null,
    values: {
      upc: null,
      partner: null,
    },
  },
  chatList: {
    page: null,
    total_pages: null,
    results: [],
    isLoading: true,
    loaded: false,
  },
  selectedChat: null,
  messages: {
    error: "",
    page: null,
    total_pages: null,
    results: [],
    isLoading: true,
    loaded: false,
  },
};

const chatReducer = (state = initialState, action: actionTypes.ChatActionTypes) => {
  switch (action.type) {
    case actionTypes.LOAD_CHAT_FILTERS_R:
      return state;
    case actionTypes.LOAD_CHAT_FILTERS_S: {
      return {
        ...state,
        filters: { ...state.filters, ...action.response },
      };
    }
    case actionTypes.LOAD_CHAT_FILTERS_F:
      return state;

    case actionTypes.ON_CHANGE_FILTERS_VALUES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          values: { ...action.payload },
        },
      };
    }

    case actionTypes.LOAD_CHAT_LIST_R:
      return { ...state, chatList: { ...state.chatList, isLoading: true } };
    case actionTypes.LOAD_CHAT_LIST_S: {
      const { page, total_pages, results } = action.response;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          results,
        },
        messages: {
          ...initialState.messages,
          ...(!results?.length && { isLoading: false, loaded: true }),
        },
      };
    }
    case actionTypes.LOAD_MORE_CHAT_LIST_S: {
      const { page, total_pages, results } = action.response;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          results: [...state.chatList.results, ...results],
        },
      };
    }
    case actionTypes.LOAD_CHAT_LIST_F:
      return {
        ...state,
        chatList: { ...state.chatList, isLoading: false, loaded: true },
        messages: { ...state.messages, isLoading: false, loaded: true },
      };

    case actionTypes.LOAD_MESSAGES_R:
      return { ...state, messages: { ...state.messages, isLoading: true } };
    case actionTypes.LOAD_MESSAGES_S: {
      const { page, total_pages, results } = action.response;
      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          results: results.reverse(),
        },
      };
    }
    case actionTypes.LOAD_MORE_MESSAGES_S: {
      const { page, total_pages, results } = action.response;
      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          results: [...results.reverse(), ...state.messages.results],
        },
      };
    }
    case actionTypes.LOAD_MESSAGES_F:
      return { ...state, messages: { ...state.messages, isLoading: false, loaded: true } };

    case actionTypes.SEND_MESSAGE_R:
      return { ...state, messages: { ...state.messages, error: "" } };
    case actionTypes.SEND_MESSAGE_F:
      return {
        ...state,
        messages: { ...state.messages, error: action.error?.response?.data?.text || "Something went wrong" },
      };

    case actionTypes.ADD_MESSAGE: {
      const newMessage: any = {
        id: uuidv4(),
        text: action.payload.message,
        sender: "You",
        read: true,
        created: new Date().toISOString(),
      };
      const selectedChat = state.chatList.results.find((chat) => chat.id === action.payload.chatId);
      const updatedChat = { ...selectedChat, messages: [newMessage, ...selectedChat.messages] };
      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: [updatedChat, ...state.chatList.results.filter((i) => i.id !== action.payload.chatId)],
        },
        messages: { ...state.messages, results: [...state.messages.results, newMessage] },
      };
    }

    case actionTypes.SELECT_CHAT:
      return {
        ...state,
        selectedChat: { ...action.payload },
        messages: { ...initialState.messages },
      };

    case actionTypes.DEDUCT_READ_MESSAGES:
      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: state.chatList.results.map((chat) => {
            if (chat.id === action.payload.chatId) {
              const newCount = Number(chat.unread_messages) - action.payload.count;
              return { ...chat, unread_messages: newCount > 0 ? newCount : 0 };
            }
            return chat;
          }),
        },
      };

    case actionTypes.CLEAR_CHAT_REDUCER:
      return { ...initialState };

    default:
      return state;
  }
};

export default chatReducer;
