import { ApiClientInterface } from "@src/services/ApiClient";
import { Dispatch } from "redux";

export const saveMiscAction = (name: string, data: any, value: any = null) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [null, null, null] as any,
    promise: (client: ApiClientInterface) =>
      client
        .post(`/misc/`, { data: { name, data, value }, cancelId: `saveMiscAction_${name}` })
        .then((res) => {
          // dispatch(showUpdateSuccess());
          return res.data;
        })
        .catch((e) => {
          console.log("***SAVE_MISC_ERROR", e);
          throw e;
        }),
  });
};

export const updateMiscAction = (name: string, data: any) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [null, null, null] as any,
    promise: (client: ApiClientInterface) =>
      client
        .put(`/misc/${name}/`, { data, cancelId: `updateMiscAction_${name}` })
        .then((res) => {
          // dispatch(showUpdateSuccess());
          return res.data;
        })
        .catch((e) => {
          console.log("***UPDATE_MISC_ERROR", e);
          throw e;
        }),
  });
};

export const loadMiscAction = (name: string, email: string = null) => ({
  types: [null, null, null] as any,
  promise: (client: ApiClientInterface) =>
    client
      .get(`/misc/${name}/${email ? `?email=${encodeURIComponent(email)}` : ""}`)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response?.status === 404) {
          return false;
        }
        throw e;
      }),
});

export const deleteMiscAction = (name: string, email: string = null) => ({
  types: [null, null, null] as any,
  promise: (client: ApiClientInterface) =>
    client
      .delete(`/misc/${name}/${email ? `?email=${encodeURIComponent(email)}` : ""}`)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response?.status === 404) {
          return false;
        }
        throw e;
      }),
});
