import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import constants from "@src/constants/constants";
import * as actionTypes from "./chatTypes";

const isUser = constants.id !== "supplier_response";

export const getChatList = (page = 1, filters: any = {}, join = false) => {
  let params = `?user=${isUser}&level=messages&page=${page}&page_size=10`;
  Object.entries(filters).forEach((v) => {
    if (v[1] !== "All" && v[1] !== null) params += `&${v[0]}=${v[1]}`;
  });
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [
        actionTypes.LOAD_CHAT_LIST_R,
        join ? actionTypes.LOAD_MORE_CHAT_LIST_S : actionTypes.LOAD_CHAT_LIST_S,
        actionTypes.LOAD_CHAT_LIST_F,
      ],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${params}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_CHAT_LIST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getMessages = (chatId: number, filters: { [key: string]: any }, join = false) => {
  let params = `?user=${isUser}&level=messages`;
  Object.entries(filters).forEach((v) => {
    if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
  });
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [
        actionTypes.LOAD_MESSAGES_R,
        join ? actionTypes.LOAD_MORE_MESSAGES_S : actionTypes.LOAD_MESSAGES_S,
        actionTypes.LOAD_MESSAGES_F,
      ],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${chatId}/messages/${params}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_MESSAGES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const sendMessage = (chatId: number, message: string) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/message/?user=${isUser}`, {
            data: { text: message },
          })
          .then((res) => {
            dispatch(addMessage(chatId, message));
            return res.data;
          })
          .catch((e) => {
            console.log("***SEND_MESSAGE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const readMessage = (chatId: number, messageId: number) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/chats/${chatId}/messages/${messageId}/read/`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***READ_MESSAGE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getFilters = () => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.LOAD_CHAT_FILTERS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/filter_info/?user=${isUser}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***GET_CHAT_FILTERS_ERROR", e);
            throw e;
          }),
    });
  };
};

export const sendFiles = (chatId: number, files: File[]) => {
  const formData = new FormData();
  files.map((file, index) => formData.append(`attachment_${index + 1}`, file));

  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/attachment/?user=${isUser}`, {
            data: formData,
          })
          .then((res) => {
            // dispatch(addMessage(chatId, message));
            return res.data;
          })
          .catch((e) => {
            console.log("***SEND_CHAT_FILES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const downloadFile = (chatId: number, messageId: number) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${chatId}/attachment/${messageId}/?user=${isUser}`)
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            console.log("***LOAD_CHAT_FILE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const selectChat = (item: any) => ({
  type: actionTypes.SELECT_CHAT,
  payload: item,
});

export const addMessage = (chatId: number, message: string) => ({
  type: actionTypes.ADD_MESSAGE,
  payload: { chatId, message },
});

export const deductReadMessages = (chatId: number, count: number) => ({
  type: actionTypes.DEDUCT_READ_MESSAGES,
  payload: { chatId, count },
});

export const clearChatReducer = () => ({
  type: actionTypes.CLEAR_CHAT_REDUCER,
});

export const onChangeFiltersValues = (filters: any) => ({
  type: actionTypes.ON_CHANGE_FILTERS_VALUES,
  payload: filters,
});
