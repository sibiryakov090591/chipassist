import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import constants from "@src/constants/constants";
import { RootState } from "@src/store";
import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "./chatTypes";
import { ChatListMessage } from "./chatTypes";

const isUser = constants.id !== "supplier_response";

export const getChatList = (page = 1, filters: any = {}, join = false) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    let params = `?user=${isUser}${
      !isUser && partner ? `&seller=${partner.id}` : ""
    }&level=messages&page=${page}&page_size=10`;
    Object.entries(filters).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });
    return dispatch({
      types: [
        actionTypes.LOAD_CHAT_LIST_R,
        join ? actionTypes.LOAD_MORE_CHAT_LIST_S : actionTypes.LOAD_CHAT_LIST_S,
        actionTypes.LOAD_CHAT_LIST_F,
      ],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${params}`, { cancelId: "get_chat_list" })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_CHAT_LIST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getMessages = (chatId: number, filters: { [key: string]: any }, join = false) => {
  return (dispatch: any, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    let params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}&level=messages`;
    Object.entries(filters).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });
    return dispatch({
      types: [actionTypes.LOAD_MESSAGES_R, false, actionTypes.LOAD_MESSAGES_F],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${chatId}/messages/${params}`, { cancelId: "get_chat_messages" })
          .then(async (res) => {
            // read messages
            const promises: any = [];
            res.data.results.forEach((message: ChatListMessage) => {
              if (!message.read) {
                promises.push(dispatch(readMessage(chatId, message.id)));
              }
            });
            if (promises.length) {
              Promise.all(promises).then(() => dispatch(deductReadMessages(chatId, promises.length)));
            }

            // download images
            const files: any = {};
            const filesPromises: any = [];
            res.data.results.forEach((i: ChatListMessage) => {
              i.message_attachments.forEach((file) => {
                const validType = file.file_name.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
                if (validType && !getState().chat.files[file.id]) {
                  filesPromises.push(
                    dispatch(downloadFile(file.id)).then((blob: Blob) => {
                      files[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                    }),
                  );
                }
              });
            });
            await Promise.all(filesPromises);
            dispatch(saveFiles(files));
            dispatch({
              type: join ? actionTypes.LOAD_MORE_MESSAGES_S : actionTypes.LOAD_MESSAGES_S,
              payload: res.data,
            });
            return res.data;
          })
          .catch((e) => {
            console.log("***LOAD_MESSAGES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const sendMessage = (chatId: number, message: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/message/${params}`, {
            data: { text: message },
          })
          .then((res) => {
            const newMessage = {
              id: uuidv4(),
              text: message,
              sender: "You",
              read: true,
              created: new Date().toISOString(),
            };
            dispatch(addMessage(chatId, newMessage));
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
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/chats/${chatId}/messages/${messageId}/read/${params}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***READ_MESSAGE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getFilters = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: actionTypes.LOAD_CHAT_FILTERS_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/filter_info/${params}`, { cancelId: "get_chat_filters" })
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
  files.map((file) => formData.append(`files[]`, file));

  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/attachments/${params}`, {
            data: formData,
          })
          .then((res) => {
            const newMessage = {
              id: uuidv4(),
              text: "",
              message_attachments: res.data.message_attachments,
              sender: "You",
              read: true,
              created: new Date().toISOString(),
            };
            dispatch(addMessage(chatId, newMessage));
            return res.data;
          })
          .catch((e) => {
            console.log("***SEND_CHAT_FILES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const downloadFile = (fileId: number) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/attachments/${fileId}/${params}`, {
            config: { responseType: "blob" },
          })
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

export const saveMessages = (data: any) => ({
  type: actionTypes.LOAD_MESSAGES_S,
  payload: data,
});

export const saveMoreMessages = (data: any) => ({
  type: actionTypes.LOAD_MORE_MESSAGES_S,
  payload: data,
});

export const addMessage = (chatId: number, message: any) => ({
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

export const saveFiles = (files: any) => ({
  type: actionTypes.SAVE_FILES,
  payload: files,
});
