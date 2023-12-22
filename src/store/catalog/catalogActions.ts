import { ApiClientInterface } from "@src/services/ApiClient";
import { Dispatch } from "redux";
import { RootState } from "@src/store";
import { removeHost } from "@src/utils/transformUrl";
import * as actionTypes from "./catalogTypes";

const getCatalogDepth = (depth: number): any => {
  return {
    types: [actionTypes.GET_CATALOG_R, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`categories/?dictionary=true&depth=${depth}`)
        // .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATALOG_ERROR", e);
          throw e;
        }),
  };
};

export const getCatalogProducts = (id: number | string, page = 1): any => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`categories/${id}/dictionaryproducts/?page=${page || 1}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATALOG_ERROR", e);
          throw e;
        }),
  };
};

const getCatalogDepthNext = (nextLink: string): any => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(removeHost(nextLink))
        // .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATALOG_ERROR", e);
          throw e;
        }),
  };
};

const saveCatalogDepth = (depth: number, data: actionTypes.CatalogCategory[]): actionTypes.SaveCatalogAction => {
  return {
    type: actionTypes.SAVE_CATALOG_DEPTH,
    payload: {
      depth,
      data,
    },
  };
};

const getNextCatalogThunk = (depth: number, nextLink: string): any => {
  return async (dispatch: Dispatch<any>) => {
    const response = await dispatch(getCatalogDepthNext(removeHost(nextLink)));
    if (response.status < 400) {
      dispatch(saveCatalogDepth(depth, response.data.results));
    }
    if (response.data.links.next) {
      dispatch(getNextCatalogThunk(depth, response.data.links.next));
    }
    return response?.data;
  };
};

/* eslint-disable no-await-in-loop */
export const getCatalog = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    if (!getState().catalog.loaded) {
      // Load all categories
      for (let depth = 1; depth < 5; depth += 1) {
        const res = await dispatch(getCatalogDepth(depth));
        if (res.status < 400) {
          dispatch(saveCatalogDepth(depth, res.data.results));
        }
        if (res.data.links.next) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const nextRes = await dispatch(getNextCatalogThunk(depth, res.data.links.next));
        }
      }
      dispatch(setLoadedCatalog());
    }
  };
};
/* eslint-enable no-await-in-loop */

const setLoadedCatalog = (): actionTypes.SetLoadedCatalogAction => {
  return {
    type: actionTypes.SET_NORMALIZE_CATALOG_DATA,
  };
};
