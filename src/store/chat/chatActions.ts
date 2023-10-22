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
    const pageSize = getState().chat.chatList.page_size;
    let params = `?user=${isUser}${
      !isUser && partner ? `&seller=${partner.id}` : ""
    }&level=messages&page=${page}&page_size=${pageSize}`;
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

export const updateChatList = (page: number) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { isLoading } = getState().chat.chatList;
    if (isLoading) return Promise.resolve();

    const filters = getState().chat.filters.values;
    const partner = getState().profile.selectedPartner;
    const pageSize = getState().chat.chatList.page_size;
    let params = `?user=${isUser}${
      !isUser && partner ? `&seller=${partner.id}` : ""
    }&level=messages&page=${page}&page_size=${pageSize}`;
    Object.entries(filters).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });

    return dispatch({
      types: [false, actionTypes.UPDATE_CHAT_LIST_S, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${params}`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***UPDATE_CHAT_LIST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getMessages = (chatId: number, filters: { [key: string]: any } = {}, join = false) => {
  return (dispatch: any, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const pageSize = getState().chat.messages.page_size;
    let params = `?user=${isUser}${
      !isUser && partner ? `&seller=${partner.id}` : ""
    }&level=messages&page_size=${pageSize}`;
    Object.entries(filters).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });
    return dispatch({
      types: [actionTypes.LOAD_MESSAGES_R, false, actionTypes.LOAD_MESSAGES_F],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${chatId}/messages/${params}`, { cancelId: "get_chat_messages" })
          .then(async (res) => {
            // download images
            const files: any = {};
            const filesPromises: any = [];
            res.data.results.forEach((i: ChatListMessage) => {
              i.message_attachments.forEach((file) => {
                const validType = file.file_name.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
                if (validType && !getState().chat.files[file.id]) {
                  filesPromises.push(
                    dispatch(downloadFile(file.id))
                      .then((blob: Blob) => {
                        files[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                      })
                      .catch((e: any) => e),
                  );
                }
              });
            });
            if (filesPromises.length) {
              await Promise.all(filesPromises);
              dispatch(saveFiles(files));
            }

            dispatch({
              type: join ? actionTypes.LOAD_MORE_MESSAGES_S : actionTypes.LOAD_MESSAGES_S,
              payload: {
                response: res.data,
                rewind: !!filters.rewind,
              },
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

export const updateMessages = (chatId: number, filters: { [key: string]: any } = {}) => {
  return (dispatch: any, getState: () => RootState) => {
    const { isLoading } = getState().chat.messages;
    if (isLoading) return Promise.resolve();

    const partner = getState().profile.selectedPartner;
    const pageSize = getState().chat.messages.page_size;
    let params = `?user=${isUser}${
      !isUser && partner ? `&seller=${partner.id}` : ""
    }&level=messages&page_size=${pageSize}`;
    Object.entries(filters).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/chats/${chatId}/messages/${params}`, { cancelId: "get_chat_messages" })
          .then(async (res) => {
            // download images
            const files: any = {};
            const filesPromises: any = [];
            res.data.results.forEach((i: ChatListMessage) => {
              i.message_attachments.forEach((file) => {
                const validType = file.file_name.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
                if (validType && !getState().chat.files[file.id]) {
                  filesPromises.push(
                    dispatch(downloadFile(file.id))
                      .then((blob: Blob) => {
                        files[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                      })
                      .catch((e: any) => e),
                  );
                }
              });
            });
            if (filesPromises.length) {
              await Promise.all(filesPromises);
              dispatch(saveFiles(files));
            }

            dispatch({
              type: actionTypes.UPDATE_MESSAGES_S,
              payload: res.data.results,
            });

            if (res.data.page > 1) {
              dispatch(updateMessages(chatId, { page: res.data.page - 1 }));
            }

            return res.data;
          })
          .catch((e) => {
            console.log("***LOAD_MESSAGES_ERROR", e);
            throw e;
          }),
    });
  };
};

export const sendMessage = (chatId: number, message: string, orderData: any = null) => {
  return (dispatch: any, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/message/${params}`, {
            data: { text: message?.trim(), ...(!!orderData && { po: orderData }) },
          })
          .then(async (res) => {
            const newMessage = {
              id: res.data.id || uuidv4(),
              text: message,
              sender: "You",
              read: true,
              read_by_partner: false,
              created: new Date().toISOString(),
              ...(res.data?.po && { po: res.data.po, message_attachments: res.data.message_attachments }),
              ...(res.data?.message_attachments && { message_attachments: res.data.message_attachments }),
            };
            if (res.data?.po) {
              // download order
              const previewFiles: any = {};
              const filesPromises: any = [];
              res.data.message_attachments.forEach((file: any) => {
                const validType = file.file_name.match(/\.(pdf)$/i);
                if (validType && !getState().chat.files[file.id]) {
                  filesPromises.push(
                    dispatch(downloadFile(file.id))
                      .then((blob: Blob) => {
                        previewFiles[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                      })
                      .catch((e: any) => e),
                  );
                }
              });
              await Promise.all(filesPromises);
              dispatch(saveFiles(previewFiles));
            }
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
          .get(`/chats/filter_data/${params}`, { cancelId: "get_chat_filters" })
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

  return (dispatch: any, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/attachments/${params}`, {
            data: formData,
            config: { timeout: 300000 }, // 5min
          })
          .then(async (res) => {
            const newMessage = {
              id: res.data.id || uuidv4(),
              text: "",
              message_attachments: res.data.message_attachments,
              sender: "You",
              read: true,
              created: new Date().toISOString(),
            };
            // download image
            const previewFiles: any = {};
            const filesPromises: any = [];
            res.data.message_attachments.forEach((file: any) => {
              const validType = file.file_name.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
              if (validType && !getState().chat.files[file.id]) {
                filesPromises.push(
                  dispatch(downloadFile(file.id))
                    .then((blob: Blob) => {
                      previewFiles[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                    })
                    .catch((e: any) => e),
                );
              }
            });
            await Promise.all(filesPromises);
            dispatch(saveFiles(previewFiles));
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

export const updateStockrecord = (data: any, chatId: number) => (dispatch: any, getState: () => RootState) => {
  const { selectedPartner } = getState().profile;
  if (!selectedPartner) return false;
  return dispatch({
    types: [actionTypes.UPDATE_STOCKRECORD_R, false, actionTypes.UPDATE_STOCKRECORD_F],
    promise: (client: ApiClientInterface) =>
      client
        .post(`/rfqs/response/`, {
          data: {
            seller: selectedPartner.id,
            data,
          },
        })
        .then((res) => {
          dispatch({ type: actionTypes.UPDATE_STOCKRECORD_S, payload: { stock: res.data, chatId } });
          return res.data;
        })
        .catch((e) => {
          console.log("***UPDATE_RESPONSE_FROM_CHAT_ERROR", e);
          throw e;
        }),
  });
};

export const selectChat = (item: any) => ({
  type: actionTypes.SELECT_CHAT,
  payload: item,
});

export const clearChat = () => ({
  type: actionTypes.CLEAR_CHAT,
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

export const setStockError = (fields: actionTypes.StockErrorsFields) => ({
  type: actionTypes.SET_STOCK_ERROR,
  payload: fields,
});

export const clearStockErrors = () => ({
  type: actionTypes.CLEAR_STOCK_ERROR,
});

export const triggerReloadPage = () => ({
  type: actionTypes.TRIGGER_RELOAD_PAGE,
});
