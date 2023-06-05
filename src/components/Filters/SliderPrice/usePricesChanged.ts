import React, { useEffect } from "react";
import usePrevious from "@src/hooks/usePrevious";

interface Props {
  currentMinPrice: number;
  currentMaxPrice: number;
  maxPrice: number;
  setState: React.Dispatch<React.SetStateAction<[number, number]>>;
  setMinState: React.Dispatch<React.SetStateAction<number>>;
  setMaxState: React.Dispatch<React.SetStateAction<number>>;
}

// TODO::price
const usePricesChanged = (
  currentMinPrice: Props["currentMinPrice"],
  currentMaxPrice: Props["currentMaxPrice"],
  minPrice: Props["maxPrice"],
  maxPrice: Props["maxPrice"],
  setState: Props["setState"],
  setMinState?: Props["setMinState"],
  setMaxState?: Props["setMaxState"],
) => {
  const prevMinPrice = usePrevious(minPrice);

  useEffect(() => {
    let min = currentMinPrice || 0;
    let max = currentMaxPrice || 0;

    if (prevMinPrice !== minPrice) {
      min = min < minPrice ? minPrice : min;
    }
    max = max < maxPrice ? max : maxPrice;

    // limits
    max = max !== 0 ? max : maxPrice;

    if (setMinState) setMinState(min);
    if (setMaxState) setMaxState(min);
    setState([min, max]);
  }, [currentMinPrice, currentMaxPrice, minPrice, maxPrice]);
};

export default usePricesChanged;
