export const SET_DEFAULT_CURRENCY = "@currency/SET_DEFAULT_CURRENCY";
export const SET_CURRENCY = "@currency/SET_CURRENCY";
export const SET_CURRENCY_RATE = "@currency/SET_CURRENCY_RATE";
export const CHANGE_CURRENCY = "@currency/CHANGE_CURRENCY";

export type CurrenciesAllowed = "EUR" | "RUB" | "USD" | "HKD" | "CNY" | string;

export type Currency = {
  symbol: string;
  code: CurrenciesAllowed;
  rate?: number;
  nominal?: number;
  exchange?: string;
  valid_before?: string;
  currency?: CurrenciesAllowed;
};

export type CurrencyPrice = (val: number, stockrecordCurrency: CurrenciesAllowed) => number;

export type GetCorrectCurrency = (stockrecordCurrency: CurrenciesAllowed) => string;

export interface CurrencyState {
  currencyList: Currency[];
  initial: Currency;
  default: Currency;
  selected: Currency;
  rates_from: { [key: string]: Currency[] };
}

export interface SetDefaultCurrencyAction {
  type: typeof SET_DEFAULT_CURRENCY;
  payload: CurrenciesAllowed;
}

export interface SetCurrencyAction {
  type: typeof SET_CURRENCY;
  payload: CurrenciesAllowed;
}

export interface SetCurrencyRateAction {
  type: typeof SET_CURRENCY_RATE;
  payload: { rates: Currency[]; from: CurrenciesAllowed };
}

export interface ChangeCurrencyAction {
  type: typeof CHANGE_CURRENCY;
  payload: CurrenciesAllowed;
}

export type CommonActionTypes =
  | SetDefaultCurrencyAction
  | SetCurrencyAction
  | SetCurrencyRateAction
  | ChangeCurrencyAction;
