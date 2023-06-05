import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./manufacturersTypes";

export function getAllManufacturers(page = 1, join = false) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: actionTypes.ITEMS_FETCHING,
      promise: (client: ApiClientInterface) =>
        client
          .get(`manufacturers/?page=${page}&page_size=900`)
          .then((res) => res.data) // костыль пока жду этот список в search-byparams
          .then((res: any) => {
            dispatch(
              join ? { type: actionTypes.JOIN_ITEMS, payload: res } : { type: actionTypes.GET_All_ITEMS, payload: res },
            );

            if (res.page < res.total_pages) {
              dispatch(getAllManufacturers(res.page + 1, true));
            } else {
              dispatch({ type: actionTypes.ITEMS_FETCHED });
            }
          })
          .catch((e) => {
            console.log("***ITEMS_FETCHING_ERROR", e);
            throw e;
          }),
    });
  };
}

export function test() {
  return "test";
}
