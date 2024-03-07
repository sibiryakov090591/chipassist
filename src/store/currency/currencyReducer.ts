import constants from "@src/constants/constants";
import * as actionTypes from "./currencyTypes";

export const localCurrencyCode =
  constants.currencyChanger && (localStorage.getItem("currency") as actionTypes.CurrenciesAllowed);

const currencies: actionTypes.Currency[] = [
  {
    symbol: "₽",
    code: "RUB",
  },
  {
    symbol: "€",
    code: "EUR",
  },
  {
    symbol: "$",
    code: "USD",
  },
  {
    symbol: "¥",
    code: "CNY",
  },
  {
    symbol: "HK$",
    code: "HKD",
  },
];

const initialState: actionTypes.CurrencyState = {
  currencyList: currencies,
  initial:
    currencies.find((val) => val?.code === localCurrencyCode) ||
    currencies.find((val) => (constants.id === "icsearch" ? val?.code === "RUB" : val?.code === "EUR")),
  default: currencies.find((val) => (constants.id === "icsearch" ? val?.code === "RUB" : val?.code === "EUR")),
  selected:
    currencies.find((val) => val?.code === localCurrencyCode) ||
    currencies.find((val) => (constants.id === "icsearch" ? val?.code === "RUB" : val?.code === "EUR")),
  rates_from: {},
};

export default function common(state = initialState, action: actionTypes.CommonActionTypes) {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_CURRENCY:
      return {
        ...state,
        default: currencies.find((val) => val?.code === action.payload) || state.default,
      };
    case actionTypes.SET_CURRENCY:
      return {
        ...state,
        initial: currencies.find((val) => val?.code === action.payload) || state.default,
        selected: currencies.find((val) => val?.code === (localCurrencyCode || action.payload)) || state.selected,
      };
    case actionTypes.SET_CURRENCY_RATE: {
      if (!Array.isArray(action.payload.rates)) return state;

      const rates = action.payload.rates.map((val) => {
        const currency = state.currencyList.find((cur) => val.currency?.toUpperCase() === cur.code);
        return {
          ...val,
          symbol: currency?.symbol || "",
          code: val.currency?.toUpperCase(),
        };
      });
      return {
        ...state,
        rates_from: { ...state.rates_from, [action.payload.from]: rates },
      };
    }
    case actionTypes.CHANGE_CURRENCY: {
      return {
        ...state,
        selected: currencies.find((val) => val?.code === action.payload),
      };
    }
    default:
      return state;
  }
}
