import { getPartnerName } from "@src/utils/chat";
import isEqual from "lodash/isEqual";
import * as actionTypes from "./chatTypes";
import { ChatListItem, ChatListMessage } from "./chatTypes";

const initialState: actionTypes.ChatState = {
  filters: {
    upc_list: null,
    partner_list: null,
    values: {
      upc: null,
      partner: null,
    },
  },
  chatList: {
    page: null,
    total_pages: null,
    page_size: 15,
    unread_total: null,
    results: [],
    isLoading: true,
    loadedPages: [],
  },
  selectedChat: null,
  stockrecordUpdating: false,
  stockrecordErrors: null,
  messages: {
    error: "",
    page: null,
    total_pages: null,
    page_size: 25,
    results: {},
    isLoading: false,
    forceUpdate: 0,
  },
  files: {},
  triggerReloadPage: 0,
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
          results: results.map((i: any) => ({
            ...i,
            partner_name: getPartnerName(i.partner),
          })),
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
          results: [
            ...state.chatList.results,
            ...results.map((i: any) => ({
              ...i,
              partner_name: getPartnerName(i.partner),
            })),
          ],
          loadedPages: [...state.chatList.loadedPages, page],
        },
      };
    }
    case actionTypes.LOAD_CHAT_LIST_F:
      if (action.error.message === "request_cancelled") return state;
      return {
        ...state,
        chatList: { ...state.chatList, isLoading: false },
      };

    case actionTypes.UPDATE_CHAT_LIST_S: {
      const { results, unread_total } = action.response;
      let unreadCountSelectedChat = 0;
      let updatedSelectedChat: any = null;

      const newChats: ChatListItem[] = [];
      results.forEach((chat: ChatListItem) => {
        const existedChat = state.chatList.results.find((i) => i.id === chat.id);
        if (!existedChat) newChats.push({ ...chat, partner_name: getPartnerName(chat.partner) });
      });

      const updatedChats: ChatListItem[] = [];
      const filteredState = state.chatList.results.filter((chat) => {
        const updatedChat: ChatListItem = results.find((i: ChatListItem) => i.id === chat.id);
        if (
          updatedChat &&
          ((Number(updatedChat.unread_messages) > 0 &&
            Number(updatedChat.unread_messages) !== Number(chat.unread_messages)) ||
            !isEqual((chat.stocks && chat.stocks[0]) || {}, (updatedChat.stocks && updatedChat.stocks[0]) || {}))
        ) {
          updatedChats.push({ ...updatedChat, partner_name: getPartnerName(updatedChat.partner) });
          if (updatedChat.id === state.selectedChat?.id) {
            unreadCountSelectedChat = Number(updatedChat.unread_messages);
            updatedSelectedChat = updatedChat;
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
        ...((unreadCountSelectedChat > 0 ||
          !isEqual(
            (updatedSelectedChat?.stocks && updatedSelectedChat.stocks[0]) || {},
            (state.selectedChat?.stocks && state.selectedChat.stocks[0]) || {},
          )) && {
          selectedChat: { ...state.selectedChat, ...updatedSelectedChat, unread_messages: unreadCountSelectedChat },
        }),
        messages: { ...state.messages, forceUpdate: state.messages.forceUpdate + 1 },
      };
    }

    case actionTypes.UPDATE_MESSAGES_S: {
      const results = action.payload.reverse();
      const copy = { ...state.messages.results };

      const newRes = results.reduce((acc: any, message: ChatListMessage) => {
        const date = new Date(message.created).toLocaleDateString();
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
            const date = new Date(message.created).toLocaleDateString();
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
        const date = new Date(message.created).toLocaleDateString();
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
      const date = new Date(action.payload.message.created).toLocaleDateString();
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
        selectedChat: {
          ...action.payload,
          partner_name: action.payload.partner_name || getPartnerName(action.payload.partner),
        },
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

    case actionTypes.UPDATE_STOCKRECORD_R:
      return { ...state, stockrecordUpdating: true };
    case actionTypes.UPDATE_STOCKRECORD_S: {
      const { stock, chatId } = action.payload;

      const isExist = !!state.selectedChat.stocks.find((i) => i.id === stock.id);

      return {
        ...state,
        stockrecordUpdating: false,
        selectedChat: {
          ...state.selectedChat,
          stocks: isExist
            ? state.selectedChat.stocks.map((i) => {
                if (i.id === stock.id) {
                  return {
                    ...i,
                    ...stock,
                  };
                }
                return i;
              })
            : [stock, ...state.selectedChat.stocks],
        },
        chatList: {
          ...state.chatList,
          results: state.chatList.results.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                stocks: isExist
                  ? chat.stocks.map((i) => {
                      if (i.id === stock.id) {
                        return {
                          ...i,
                          ...stock,
                        };
                      }
                      return i;
                    })
                  : [stock, ...chat.stocks],
              };
            }
            return chat;
          }),
        },
      };
    }
    case actionTypes.UPDATE_STOCKRECORD_F:
      return { ...state, stockrecordUpdating: false };

    case actionTypes.CLEAR_CHAT_REDUCER:
      return { ...initialState };

    case actionTypes.SET_STOCK_ERROR:
      return { ...state, stockrecordErrors: action.payload };

    case actionTypes.CLEAR_STOCK_ERROR:
      return { ...state, stockrecordErrors: null };

    case actionTypes.TRIGGER_RELOAD_PAGE:
      return { ...state, triggerReloadPage: state.triggerReloadPage + 1 };

    default:
      return state;
  }
};

export default chatReducer;
