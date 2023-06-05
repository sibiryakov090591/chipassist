import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";
import FiltersContainer, {
  FilterPageSizeChoiceBar,
  FilterResultsBar,
  FilterStockBar,
  FilterOrderByBar,
} from "../FiltersBar";

const ProductNavBar = ({ orderBy, onOrderChange, onChangePageSize, isDisable }) => {
  const classes = useStyles();
  const itemsCount = useAppSelector((state) => state.search.count);

  return (
    <div className={classes.main}>
      <div className={classes.rightSide}>
        <FiltersContainer>
          <FilterResultsBar count={itemsCount || 0} />
          <FilterStockBar disable={isDisable} />
          <FilterPageSizeChoiceBar storageKey={`${"mainShowBy"}`} action={onChangePageSize} />
          <FilterOrderByBar value={orderBy} onChange={onOrderChange} />
        </FiltersContainer>
      </div>
    </div>
  );
};

export default ProductNavBar;
