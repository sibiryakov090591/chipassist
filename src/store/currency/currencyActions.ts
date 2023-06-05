import { ApiClientInterface } from "@src/services/ApiClient";
import { Dispatch } from "redux";
import { RootState } from "@src/store";
import * as actionTypes from "./currencyTypes";

export const getDefaultServiceCurrency = () => (dispatch: any) => {
  return dispatch({
    types: [null, null, null],
    promise: (client: ApiClientInterface) =>
      client
        .get("/currency/")
        .then((res) => res.data)
        .then((res: any) => {
          dispatch({ type: actionTypes.SET_DEFAULT_CURRENCY, payload: res });
        })
        .catch((e) => {
          console.log("***ERROR_GET_DEFAULT_CURRENCY", e);
          throw e;
        }),
  });
};

export const getCurrency = (currency: actionTypes.CurrenciesAllowed = null) => (dispatch: any) => {
  if (currency) {
    return dispatch(getCurrencyRate(currency)).then((r: any[]) => {
      dispatch({ type: actionTypes.SET_CURRENCY_RATE, payload: { rates: r, from: currency } });
      dispatch({ type: actionTypes.SET_CURRENCY, payload: currency });
      dispatch({ type: actionTypes.CHANGE_CURRENCY, payload: currency });
      return r;
    });
  }
  return dispatch({
    types: [null, null, null],
    promise: (client: ApiClientInterface) =>
      client
        .get("/currency/")
        .then((res) => res.data)
        .then((res: actionTypes.CurrenciesAllowed) => {
          dispatch(getCurrencyRate(res)).then((r: any[]) => {
            dispatch({ type: actionTypes.SET_CURRENCY_RATE, payload: { rates: r, from: res } });
            dispatch({ type: actionTypes.SET_CURRENCY, payload: res });
            dispatch({ type: actionTypes.CHANGE_CURRENCY, payload: res });
            return r;
          });
        })
        .catch((e) => {
          console.log("***ERROR_GET_CURRENCY", e);
          throw e;
        }),
  });
};

export const getCurrencyRate = (currency: actionTypes.CurrenciesAllowed) => (dispatch: Dispatch<any>) => {
  return dispatch({
    types: [null, null, null],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/currency/rate/?currency=ALL&curr_from=${currency}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***ERROR_GET_CURRENCY_RATE", e);
          throw e;
        }),
  });
};

export const changeCurrency = (code: actionTypes.CurrenciesAllowed): any => (
  dispatch: any,
  getState: () => RootState,
) => {
  const rates = getState().currency.rates_from[code];
  let validDate: boolean;
  try {
    validDate = Date.now() < new Date(rates[0].valid_before).getTime();
  } catch (e) {
    validDate = false;
  }
  if (rates && validDate) {
    dispatch({
      type: actionTypes.CHANGE_CURRENCY,
      payload: code,
    });
    return Promise.resolve();
  }

  return dispatch(getCurrencyRate(code)).then((r: any[]) => {
    dispatch({ type: actionTypes.SET_CURRENCY_RATE, payload: { rates: r, from: code } });
    dispatch({
      type: actionTypes.CHANGE_CURRENCY,
      payload: code,
    });
    return rates;
  });
};

export default "currency actions";
