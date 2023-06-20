import * as actionTypes from "./chatTypes";
import { ChatListItem } from "./chatTypes";

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
    page_size: 10,
    unread_total: null,
    results: [],
    isLoading: true,
    loaded: false,
    loadedPages: [],
  },
  selectedChat: null,
  messages: {
    error: "",
    page: null,
    total_pages: null,
    page_size: 15,
    results: [],
    isLoading: true,
    loaded: false,
    forceUpdate: 0,
  },
  files: {},
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
      const { page, total_pages, unread_total, results } = action.response;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          unread_total,
          results,
          loadedPages: [page],
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
          loadedPages: [...state.chatList.loadedPages, page],
        },
      };
    }
    case actionTypes.LOAD_CHAT_LIST_F:
      return {
        ...state,
        chatList: { ...state.chatList, isLoading: false, loaded: true },
        messages: { ...state.messages, isLoading: false, loaded: true },
      };

    case actionTypes.UPDATE_CHAT_LIST_S: {
      const { results, unread_total } = action.response;
      let isNeedToUpdateMessages = false;

      const filteredState = state.chatList.results.filter((chat) => {
        const existedChat: ChatListItem = results.find((i: ChatListItem) => i.id === chat.id);
        if (existedChat && existedChat.id === state.selectedChat.id && Number(existedChat.unread_messages) > 0) {
          isNeedToUpdateMessages = true;
        }
        return !existedChat;
      });

      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: [...results, ...filteredState],
          unread_total,
        },
        // selectedChat: isNeedToUpdateMessages ? { ...state.selectedChat } : state.selectedChat, // force updating messages
        messages: { ...state.messages, forceUpdate: state.messages.forceUpdate + (isNeedToUpdateMessages ? 1 : 0) },
      };
    }

    case actionTypes.LOAD_MESSAGES_R:
      return { ...state, messages: { ...state.messages, isLoading: true } };
    case actionTypes.LOAD_MESSAGES_S: {
      const { page, total_pages, results } = action.payload.response;
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
      const { page, total_pages, results } = action.payload.response;
      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: false,
          loaded: true,
          page,
          total_pages,
          results: action.payload.rewind
            ? [...results.reverse(), ...state.messages.results]
            : [...state.messages.results, ...results.reverse()],
        },
      };
    }
    case actionTypes.LOAD_MESSAGES_F:
      return { ...state, messages: { ...state.messages, isLoading: false, loaded: true } };

    case actionTypes.SAVE_FILES:
      return {
        ...state,
        files: { ...state.files, ...action.payload },
      };

    case actionTypes.SEND_MESSAGE_R:
      return { ...state, messages: { ...state.messages, error: "" } };
    case actionTypes.SEND_MESSAGE_F:
      return {
        ...state,
        messages: { ...state.messages, error: action.error?.response?.data?.text || "Something went wrong" },
      };

    case actionTypes.ADD_MESSAGE: {
      const selectedChat = state.chatList.results.find((chat) => chat.id === action.payload.chatId);
      const updatedChat = { ...selectedChat, messages: [action.payload.message, ...selectedChat.messages] };
      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: [updatedChat, ...state.chatList.results.filter((i) => i.id !== action.payload.chatId)],
        },
        messages: { ...state.messages, results: [...state.messages.results, action.payload.message] },
      };
    }

    case actionTypes.SELECT_CHAT:
      return {
        ...state,
        selectedChat: { ...action.payload },
        messages: { ...initialState.messages },
      };

    case actionTypes.DEDUCT_READ_MESSAGES: {
      const newTotal = Number(state.chatList.unread_total) - action.payload.count;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          unread_total: newTotal > 0 ? newTotal : 0,
          results: state.chatList.results.map((chat) => {
            if (chat.id === action.payload.chatId) {
              const newCount = Number(chat.unread_messages) - action.payload.count;
              return { ...chat, unread_messages: newCount > 0 ? newCount : 0 };
            }
            return chat;
          }),
        },
      };
    }

    case actionTypes.CLEAR_CHAT_REDUCER:
      return { ...initialState };

    default:
      return state;
  }
};

export default chatReducer;
