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
    loadedPages: [],
  },
  selectedChat: null,
  messages: {
    error: "",
    page: null,
    total_pages: null,
    page_size: 15,
    results: {},
    isLoading: false,
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
          page,
          total_pages,
          unread_total,
          results,
          loadedPages: [page],
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
        chatList: { ...state.chatList, isLoading: false },
      };

    case actionTypes.UPDATE_CHAT_LIST_S: {
      const { results, unread_total } = action.response;
      let unreadCountSelectedChat = 0;

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
          if (updatedChat.id === state.selectedChat?.id) {
            unreadCountSelectedChat = Number(updatedChat.unread_messages);
          }
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
        ...(unreadCountSelectedChat > 0 && {
          selectedChat: { ...state.selectedChat, unread_messages: unreadCountSelectedChat },
        }),
        messages: { ...state.messages, forceUpdate: state.messages.forceUpdate + 1 },
      };
    }

    case actionTypes.UPDATE_MESSAGES_S: {
      const results = action.payload.reverse();
      const copy = { ...state.messages.results };

      const newRes = results.reduce((acc: any, message: ChatListMessage) => {
        const date = message.created.slice(0, 10);
        const existedMessage = state.messages.results[date]?.find((i) => i.id === message.id);
        if (!message.read && !existedMessage) {
          if (acc[date]) acc[date] = [...acc[date], message];
          if (!acc[date]) acc[date] = [message];
        } else if (existedMessage && existedMessage.read_by_partner !== message.read_by_partner) {
          acc[date] = acc[date].map((i: any) => {
            if (i.id === message.id) return message;
            return i;
          });
        }
        return acc;
      }, copy);

      return {
        ...state,
        messages: {
          ...state.messages,
          results: newRes,
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
          page,
          total_pages,
          results: results.reverse().reduce((acc: any, message: any) => {
            const date = message.created.slice(0, 10);
            if (acc[date]) {
              acc[date].push(message);
            } else {
              acc[date] = [message];
            }
            return acc;
          }, {}),
        },
      };
    }
    case actionTypes.LOAD_MORE_MESSAGES_S: {
      const { page, total_pages, results } = action.payload.response;

      const copy = { ...state.messages.results };
      const res = action.payload.rewind ? results : results.reverse();
      const newRes = res.reduce((acc: any, message: any) => {
        const date = message.created.slice(0, 10);
        if (acc[date]) {
          if (action.payload.rewind) acc[date] = [message, ...acc[date]];
          if (!action.payload.rewind) acc[date] = [...acc[date], message];
        } else {
          if (action.payload.rewind) return { [date]: [message], ...acc };
          if (!action.payload.rewind) return { ...acc, [date]: [message] };
        }
        return acc;
      }, copy);

      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: false,
          page,
          total_pages,
          results: newRes,
        },
      };
    }
    case actionTypes.LOAD_MESSAGES_F:
      return { ...state, messages: { ...state.messages, isLoading: false } };

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
      const date = action.payload.message.created.slice(0, 10);
      const newRes = { ...state.messages.results };
      if (newRes[date]) newRes[date] = [...newRes[date], action.payload.message];
      if (!newRes[date]) newRes[date] = [action.payload.message];
      return {
        ...state,
        chatList: {
          ...state.chatList,
          results: [updatedChat, ...state.chatList.results.filter((i) => i.id !== action.payload.chatId)],
        },
        messages: { ...state.messages, results: newRes },
      };
    }

    case actionTypes.SELECT_CHAT:
      return {
        ...state,
        selectedChat: { ...action.payload },
        messages: { ...initialState.messages, forceUpdate: 0, isLoading: true },
      };
    case actionTypes.CLEAR_CHAT:
      return {
        ...state,
        selectedChat: null,
        chatList: initialState.chatList,
        messages: initialState.messages,
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
