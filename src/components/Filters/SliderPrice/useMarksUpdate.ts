import React, { useEffect } from "react";

interface Props {
  setMarksState: React.Dispatch<React.SetStateAction<[number, number]>>;
  minPrice: number;
  maxPrice: number;
}

// TODO::price
const useMarksUpdate = (
  setMarksState: Props["setMarksState"],
  minPrice: Props["minPrice"],
  maxPrice: Props["maxPrice"],
) => {
  useEffect(() => {
    const min = minPrice || 0;
    let max = maxPrice;
    max = maxPrice === minPrice ? maxPrice + 1 : max;
    setMarksState([min, max]);
  }, [minPrice, maxPrice]);
};

export default useMarksUpdate;
