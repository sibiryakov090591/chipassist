import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import { LOAD_PRICE_DATA_ARRAY, SET_IS_OPEN, SET_DATA, ChartActionTypes } from "./chartTypes";

export const loadPriceDataThunk = (stockrecordId: number, priceId: number, dateFrom: string, dateTo: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: LOAD_PRICE_DATA_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(
            `/statistics/price_stock/?stock_record=${stockrecordId}&price_id=${priceId}&page_size=900&date_from=${dateFrom}&date_to=${dateTo}`,
          )
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_PRICE_DATA_ERROR", e);
            throw e;
          }),
    });
  };
};

export const setChartModalOpen = (isOpen: boolean): ChartActionTypes => {
  return { type: SET_IS_OPEN, payload: isOpen };
};

export const setChartData = (stockrecordId: number, priceId: number): ChartActionTypes => {
  return { type: SET_DATA, payload: { stockrecordId, priceId } };
};
