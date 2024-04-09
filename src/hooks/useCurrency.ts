import useAppSelector from "@src/hooks/useAppSelector";
import { currencyChanger } from "@src/constants/defaults";
import { Currency, CurrencyPrice, CurrenciesAllowed, GetCorrectCurrency } from "@src/store/currency/currencyTypes";

const useCurrency = (): {
  currency: Currency;
  currencyInitial: Currency;
  currencyPrice: CurrencyPrice;
  getCorrectCurrency: GetCorrectCurrency;
} => {
  const currency = useAppSelector((state) => state.currency);

  const currencyPrice: CurrencyPrice = (val: number, stockrecordCurrency: CurrenciesAllowed) => {
    const selectedCurrency = currency?.selected?.code;
    const rate = currency.rates_from[selectedCurrency]?.find((i) => i?.code === stockrecordCurrency)?.rate;
    if (!currencyChanger || !rate || stockrecordCurrency === selectedCurrency) return val;

    if (selectedCurrency === "RUB") {
      return parseFloat((val * rate).toFixed(4).toString());
    }

    return parseFloat((val / rate).toFixed(4).toString());
  };

  const getCorrectCurrency = (stockrecordCurrency: CurrenciesAllowed) => {
    const selectedCurrency = currency?.selected?.code;
    const rate = currency.rates_from[selectedCurrency]?.find((i) => i?.code === stockrecordCurrency)?.rate;
    if (!currencyChanger || !rate) return stockrecordCurrency || "-";
    return selectedCurrency;
  };

  return { currency: currency.selected, currencyInitial: currency.initial, currencyPrice, getCorrectCurrency };
};

export default useCurrency;
