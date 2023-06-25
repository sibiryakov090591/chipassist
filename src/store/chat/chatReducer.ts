import * as actionTypes from "./chatTypes";
import { ChatListItem, ChatListMessage } from "./chatTypes";

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

      const newChats: ChatListItem[] = [];
      results.forEach((chat: ChatListItem) => {
        const existedChat = state.chatList.results.find((i) => i.id === chat.id);
        if (!existedChat) newChats.push(chat);
      });

      const updatedChats: ChatListItem[] = [];
      const filteredState = state.chatList.results.filter((chat) => {
        const updatedChat: ChatListItem = results.find((i: ChatListItem) => i.id === chat.id);
        if (
          updatedChat &&
          Number(updatedChat.unread_messages) > 0 &&
          Number(updatedChat.unread_messages) !== Number(chat.unread_messages)
        ) {
          updatedChats.push(updatedChat);
          if (updatedChat.id === state.selectedChat.id) isNeedToUpdateMessages = true;
          return false;
        }
        return true;
      });

      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: [...newChats, ...updatedChats, ...filteredState],
          unread_total,
        },
        messages: { ...state.messages, forceUpdate: state.messages.forceUpdate + (isNeedToUpdateMessages ? 1 : 0) },
      };
    }

    case actionTypes.UPDATE_MESSAGES_S: {
      const results = action.payload;
      const newMessages = results.filter(
        (message: ChatListMessage) => !message.read && !state.messages.results.find((i) => i.id === message.id),
      );

      return {
        ...state,
        messages: {
          ...state.messages,
          results: [...state.messages.results, ...newMessages],
        },
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
        messages: { ...initialState.messages, forceUpdate: 0 },
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
