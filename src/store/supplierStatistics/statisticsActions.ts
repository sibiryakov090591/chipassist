import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./statisticsTypes";

export const loadSupplierStatistics = (page = 1, pageSize = 15, sellerId: number | false) => (
  dispatch: Dispatch<any>,
) => {
  return dispatch({
    types: actionTypes.LOAD_STATISTICS_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`/rfqs/statistics/${sellerId}/?page=${page}&page_size=${pageSize}`, {
          cancelId: "load_supplier_statistics",
        })
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_SUPPLIER_STATISTIC_ERROR", e);
          throw e;
        }),
  });
};

export default "actions";
