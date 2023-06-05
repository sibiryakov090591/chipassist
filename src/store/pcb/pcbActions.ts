import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { Dispatch } from "redux";
import { FEEDBACK_R, FEEDBACK_S, FEEDBACK_F } from "@src/store/authentication/authTypes";
import { progressModalError } from "@src/store/progressModal/progressModalActions";
import { getAuthToken } from "@src/utils/auth";
import * as actionTypes from "./pcbTypes";

const FileDownload = require("js-file-download");

const apiClient = new ApiClient();

export const getConstants = () => (dispatch: Dispatch<any>) => {
  return apiClient
    .get("/pcbs/control_elements/")
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CONSTANTS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log("***GET_CONSTANTS_ERROR", e);
      throw e;
    });
};

export const loadPcb = (page = 1, pageSize = 15, orderBy: string = null, sellersPcb = false, showAll = false) => (
  dispatch: Dispatch<any>,
) => {
  let url: string;
  let params = `?page_size=${pageSize}&page=${page}`;
  if (orderBy) {
    params = `${params}&order_by=${orderBy}`;
  }
  if (sellersPcb) {
    url = `/pcbs/sellers/${params}`;
    if (!showAll) {
      url = `${url}&response_empty=TRUE`;
    }
  } else {
    url = `/pcbs/${params}`;
  }
  dispatch({
    types: actionTypes.LOAD_PCB,
    promise: (client: ApiClientInterface) =>
      client
        .get(url)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_PCB_ERROR", e);
          throw e;
        }),
  });
};

export const saveRfg = (profileInfo: any) => {
  return {
    type: actionTypes.SAVE_PCB,
    payload: profileInfo,
  };
};

export const setPcbModalItem = (item: any) => {
  return {
    type: actionTypes.PCB_SET_MODAL_ITEM,
    payload: item,
  };
};

export const savePcbModalItem = (data: any, pcbModalUpdateId: number = null, token: string = null) => (
  dispatch: Dispatch<any>,
) => {
  const url = pcbModalUpdateId ? `/pcbs/${pcbModalUpdateId}/` : "/pcbs/";
  const cliSavePcbModalItem = pcbModalUpdateId
    ? (client: ApiClientInterface) =>
        client.patch(url, { data, config: { headers: { "Content-Type": "multipart/form-data" } } })
    : (client: ApiClientInterface) =>
        client.post(url, {
          data,
          config: {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Token ${token || getAuthToken()}` },
          },
        });
  return dispatch({
    types: actionTypes.SAVE_PCB_ARRAY,
    promise: (client: ApiClientInterface) =>
      cliSavePcbModalItem(client)
        .then((res) => {
          dispatch({ type: actionTypes.PCBS_NEED_UPDATE });
          dispatch({ type: actionTypes.PCB_SET_ERRORS, payload: {} });
          return res.data;
        })
        .catch((err) => {
          const errorMessage = err.response?.data
            ? Object.keys(err.response.data).reduce(
                (acc, val) => `${acc}<div>${val}: ${err.response.data[val][0]}</div>`,
                "",
              )
            : "";
          dispatch(progressModalError(errorMessage));
          if (err.response.status === 400) {
            dispatch({ type: actionTypes.PCB_SET_ERRORS, payload: err.response.data });
          }
          return Promise.reject(err);
        }),
  });
};

export const updatePcbStatus = (id: number, data: { status: string }) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: actionTypes.SAVE_PCB_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/pcbs/${id}/`, { data })
        .then((res) => {
          dispatch({ type: actionTypes.PCB_STATUS_UPDATE, payload: { id, data } });
          dispatch({ type: actionTypes.PCB_SET_ERRORS, payload: {} });
          return res.data;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            dispatch({ type: actionTypes.PCB_SET_ERRORS, payload: err.response.data });
          }
          return Promise.reject(err);
        }),
  });
};

export const clearPcbModalItem = () => {
  return {
    type: actionTypes.PCB_CLEAR_MODAL_ITEM,
  };
};

export const pcbModalOpen = () => {
  return {
    type: actionTypes.PCB_MODAL_OPEN,
  };
};

export const pcbModalUpdate = (item: actionTypes.PcbsItem) => {
  return {
    type: actionTypes.PCB_MODAL_UPDATE,
    payload: item,
  };
};

export const pcbModalClose = () => {
  return {
    type: actionTypes.PCB_MODAL_CLOSE,
  };
};

export const pcbResponse = (pcbId: number, data: any, responseId: number) => (dispatch: Dispatch<any>) => {
  const url = responseId ? `/pcbs/response/${responseId}/` : `/pcbs/${pcbId}/responses/`;
  const cliResponse = responseId
    ? (client: ApiClientInterface) => client.put(url, { data })
    : (client: ApiClientInterface) => client.post(url, { data });

  return dispatch({
    types: actionTypes.PCB_RESPONSE,
    promise: (client: ApiClientInterface) =>
      cliResponse(client)
        .then((res) => res.data)
        .then((res) => {
          dispatch(
            showBottomLeftMessageAlertAction({
              text: `Your response was ${data.status === "CREATED" ? "saved" : "sent"} successfully.`,
              severity: "success",
            }),
          );
          return res;
        }),
  });
};

export const clearPcbResponse = () => {
  return {
    type: actionTypes.CLEAR_PCB_RESPONSE,
  };
};

export const approveResponse = (pcbId: number, sellerId: number) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: actionTypes.PCB_APPROVE_RESPONSE,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/pcbs/${pcbId}/`, {
          data: { approved: sellerId },
        })
        .then((res) => res.data),
  });
};

export const deletePcbFromStore = (pcbId: number) => {
  return {
    type: actionTypes.DELETE_PCB_FROM_STORE,
    payload: pcbId,
  };
};

export const pcbUpdate = (id: number, data: any) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: actionTypes.PCB_UPDATE,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/pcbs/${id}/`, {
          data,
        })
        .then((res) => res.data)
        .then((res) => {
          dispatch({ type: actionTypes.PCB_UPDATE_ITEM, payload: { id, data } });
          return res;
        }),
  });
};

export const deletePcbThunk = (id: number) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .delete(`/pcbs/${id}/`)
          .then((res) => res.data)
          .then(() => {
            return dispatch({ type: actionTypes.PCBS_NEED_UPDATE });
          }),
    });
  };
};

export function getPcbSellers() {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get("partners/?page_size=900&filter_pcb=true")
          .then((res) => res.data)
          .then((res) => {
            dispatch({ type: actionTypes.PCB_GET_SELLERS, payload: res });
          }),
    });
  };
}

export function getPcbItem(id: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: actionTypes.PCB_ITEM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`pcbs/${id}/`)
          .then((res) => res.data)
          .then((res) => {
            dispatch({ type: actionTypes.PCB_GET_ITEM, payload: res });
          }),
    });
  };
}

export function getPcbPartnerItem(id: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: actionTypes.PCB_ITEM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`pcbs/sellers/${id}/`)
          .then((res) => res.data)
          .then((res) => {
            dispatch({ type: actionTypes.PCB_GET_ITEM, payload: res });
          }),
    });
  };
}

export const exportPcbThunk = (pcbId: number, exportType: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) =>
        client
          .get(`/pcbs/${pcbId}/export/${exportType}/`, {
            config: { responseType: "blob" },
          })
          .then((response) => {
            let extension = exportType;
            const contentType = response.headers["content-type"];
            if (contentType.indexOf("zip") !== -1) {
              extension = "zip";
            }
            FileDownload(response.data, `pcb_${pcbId}.${extension}`);
          }),
    });
  };
};

export function sendPcbFormData(
  email: string,
  name: string,
  company: string,
  phone: string,
  message: string,
  files: any[] = [],
): any {
  // .replace for fixing double plus bug
  const phoneWithPlus = `+${phone.replace(/\+/g, "")}`;

  const pcbMessage = `PCBs: email: ${email}; name: ${name || "-"}; company: ${company || "-"}; phone: ${
    phoneWithPlus || "-"
  }; message: ${message}`;

  const formData = new FormData();
  formData.append("message", pcbMessage);
  formData.append("level", "info");
  files.map((file, index) => formData.append(`${index + 1}_file`, file));

  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [FEEDBACK_R, FEEDBACK_S, FEEDBACK_F],
      promise: (client: ApiClientInterface) =>
        client
          .post("/register-user-feedback/", {
            data: formData,
          })
          .then((res) => res.data)
          .catch((error: any) => {
            console.log("***SEND_PCB_ERROR:", error);
            return error;
          }),
    });
  };
}
