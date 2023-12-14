import React, { useEffect } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { CurrenciesAllowed, Currency } from "@src/store/currency/currencyTypes";

interface Props {
  setCurrencyHandler: (currency: CurrenciesAllowed) => void;
  className: string;
  selected?: CurrenciesAllowed;
}

const CurrencyMenu: React.FC<Props> = ({ className, setCurrencyHandler, selected }) => {
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const [selectedCurrencyList, setSelectedCurrencyList] = React.useState<Currency[]>([]);

  useEffect(() => {
    if (currencyList?.length) {
      setSelectedCurrencyList(currencyList.filter((i) => ["EUR", "USD"].includes(i.code)));
    }
  }, [currencyList]);

  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setCurrencyHandler(value);
  };

  return (
    <select name="currency-list" className={className} value={selected} onChange={onChangeHandler}>
      {selectedCurrencyList.map((val) => (
        <option key={val.code} value={val.code}>
          {val.symbol} {val.code}
        </option>
      ))}
    </select>
  );
};

export default CurrencyMenu;
