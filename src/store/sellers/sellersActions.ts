import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./sellersTypes";

export function getAllSellers(page = 1, join = false) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: [actionTypes.ITEMS_FETCHING_R, actionTypes.ITEMS_FETCHING_S, actionTypes.ITEMS_FETCHING_F],
      promise: (client: ApiClientInterface) =>
        client
          .get(`partners/?page=${page}&page_size=900`)
          .then((res) => res.data)
          .then((res: any) => {
            dispatch(
              join ? { type: actionTypes.JOIN_ITEMS, payload: res } : { type: actionTypes.GET_All_ITEMS, payload: res },
            );

            if (res.page < res.total_pages) {
              dispatch(getAllSellers(res.page + 1, true));
            } else {
              dispatch({ type: actionTypes.ITEMS_FETCHED });
            }
          })
          .catch((e: any) => {
            console.log("***ITEMS_FETCHING_ERROR", e);
            throw e;
          }),
    });
  };
}

export const test = "test";
