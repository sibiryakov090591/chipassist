import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import constants from "@src/constants/constants";
import { RootState } from "@src/store";
import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "./chatTypes";
import { ChatListMessage } from "./chatTypes";

const isUser = constants.id !== "supplier_response";

const createChatMock = (id: any): any => {
  return {
    id,
    created: new Date().toISOString(),
    partner: {
      first_name: "Alex",
      last_name: "Smith",
      company_name: "Google",
    },
    partner_name: "Alex",
    title: "MAX3232",
    details: {
      quantity: 100,
      price: 25,
    },
    rfq: {
      id: uuidv4(),
      upc: "MAX3232",
      quantity: 100,
      price: 25,
      currency: "USD",
      delivery_time: "1 week",
      moq: 1,
      mpq: 1,
      num_in_stock: 1000,
    },
    unread_messages: 3,
    messages: [
      {
        id: id + 1,
        sender: "Alex",
        read: false,
        read_by_partner: true,
        text: "Hello, this is test message text from Alex...",
        created: new Date().toISOString(),
        message_files: [],
        starter: 1,
        representatives: [],
      },
    ],
    stocks: [],
  };
};

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
    console.log(params);
    return dispatch({
      types: [
        actionTypes.LOAD_CHAT_LIST_R,
        join ? actionTypes.LOAD_MORE_CHAT_LIST_S : actionTypes.LOAD_CHAT_LIST_S,
        actionTypes.LOAD_CHAT_LIST_F,
      ],
      promise: () =>
        new Promise((res) =>
          setTimeout(
            () =>
              res({
                page: 1,
                total_pages: 1,
                results: Array(5)
                  .fill(1)
                  .map((_, i) => createChatMock(i + 1)),
              }),
            2000,
          ),
        ).catch((e) => {
          console.log("***LOAD_CHAT_LIST_ERROR", e);
          throw e;
        }),
    });
  };
};

export const getChat = (id: number | string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    console.log(id, params);
    return dispatch({
      types: [false, false, false],
      promise: () =>
        new Promise((res) => setTimeout(() => res(createChatMock(id)), 2000))
          .then((res) => {
            dispatch(selectChat(res));
          })
          .catch((e) => {
            console.log("***LOAD_CHAT_ERROR", e);
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
    console.log(params);
    return dispatch({
      types: [false, actionTypes.UPDATE_CHAT_LIST_S, false],
      promise: () =>
        new Promise((res) =>
          setTimeout(
            () =>
              res({
                results: Array(5)
                  .fill(1)
                  .map((_, i) => createChatMock(i + 1)),
                unread_total: 5,
              }),
            1000,
          ),
        ).catch((e) => {
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
    console.log(params);
    return dispatch({
      types: [actionTypes.LOAD_MESSAGES_R, false, actionTypes.LOAD_MESSAGES_F],
      promise: () =>
        new Promise((res) =>
          setTimeout(
            () =>
              res({
                data: {
                  results: Array(6)
                    .fill(1)
                    .map((_, i) => createChatMock(i + 1).messages[0]),
                },
              }),
            2000,
          ),
        )
          .then(async (res: any) => {
            // download images
            const files: any = {};
            const filesPromises: any = [];
            if (res.data.results) {
              res.data.results.forEach((i: ChatListMessage) => {
                if (!i.message_files) return false;
                return i.message_files.forEach((file) => {
                  const validType = file?.file?.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
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
            }
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
            if (res?.data?.results) {
              res.data.results.forEach((i: ChatListMessage) => {
                if (!i.message_files) return false;
                return i.message_files.forEach((file) => {
                  const validType = file?.file?.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
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
            }
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

export const sendMessage = (chatId: number, message: string, orderData: any = null, type: "po" | "invoice" = null) => {
  return (dispatch: any, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    console.log(params, orderData, type);
    return dispatch({
      types: actionTypes.SEND_MESSAGE_ARRAY,
      promise: () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 1000))
          .then(async (res: any) => {
            const newMessage = {
              id: res.data.id || uuidv4(),
              text: message,
              sender: "You",
              read: true,
              read_by_partner: false,
              created: new Date().toISOString(),
              ...(res.data?.po && { po: res.data.po, message_files: res.data.message_files }),
              ...(res.data?.invoice && { invoice: res.data.invoice, message_files: res.data.message_files }),
              ...(res.data?.message_files && { message_files: res.data.message_files }),
            };
            if (res.data?.po || res.data?.invoice) {
              // download order
              const previewFiles: any = {};
              const filesPromises: any = [];
              if (res?.data.message_files) {
                res.data.message_files.forEach((file: any) => {
                  if (!file) return false;
                  const validType = file?.file?.match(/\.(pdf)$/i);
                  if (validType && !getState().chat.files[file.id]) {
                    filesPromises.push(
                      dispatch(downloadFile(file.id))
                        .then((blob: Blob) => {
                          previewFiles[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                        })
                        .catch((e: any) => e),
                    );
                  }
                  return true;
                });
              }
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

export const readMessage = (messageId: number) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const partner = getState().profile.selectedPartner;
    const params = `?user=${isUser}${!isUser && partner ? `&seller=${partner.id}` : ""}`;
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/chats/messages/${messageId}${params}`, { data: { status: 3 } })
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
          .post(`/chats/${chatId}/files/${params}`, {
            data: formData,
            config: { timeout: 300000 }, // 5min
          })
          .then(async (res) => {
            const newMessage = {
              id: res.data.id || uuidv4(),
              text: "",
              message_files: res.data.message_files,
              sender: "You",
              read: true,
              created: new Date().toISOString(),
            };
            // download image
            const previewFiles: any = {};
            const filesPromises: any = [];
            if (res?.data.message_files) {
              res.data.message_files.forEach((file: any) => {
                if (!file) return false;
                const validType = file?.file?.match(/\.(png|jpg|jpeg|svg|pdf)$/i);
                if (validType && !getState().chat.files[file.id]) {
                  filesPromises.push(
                    dispatch(downloadFile(file.id))
                      .then((blob: Blob) => {
                        previewFiles[file.id] = { type: validType[0], url: URL.createObjectURL(blob) };
                      })
                      .catch((e: any) => e),
                  );
                }
                return true;
              });
            }
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
          .get(`/chats/files/${fileId}/${params}`, {
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
        .post(`/rfqs/response/?source=chat`, {
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

export function previewOrderPdf(chatId: number, data: any) {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .post(`/chats/${chatId}/messages/preview/`, { data, config: { responseType: "blob" } })
          .then((res) => res.data)
          .then((blob: Blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              window.open(url, "_blank");
            }
          })
          .catch((e) => {
            console.log("***LOAD_INVOICE_ERROR", e);
            throw e;
          }),
    });
  };
}

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
