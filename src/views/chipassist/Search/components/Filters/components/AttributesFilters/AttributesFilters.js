import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import FiltersSelect from "@src/components/FiltersSelect/FiltersSelect";
import { getComparator, stableSort } from "@src/utils/sort";
import { addFilterFieldAction, setFilterInc } from "@src/store/search/searchActions";
import useAppSelector from "@src/hooks/useAppSelector";
import FilterAttributes from "../../../FilterAttributes/FilterAttributes";
import Skeletons from "../Skeleton/Skeleton";
import { useStyles } from "./attributesFiltersStyles";

function AttributesFilters() {
  const classes = useStyles();
  const enabledAttributesMap = useAppSelector((state) => state.search.enabledAttributesMap) || {};
  const filtersValues = useAppSelector((state) => state.search.filtersValues);
  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const attributes = useAppSelector((state) => state.search.attributes);
  const attributesMap = useAppSelector((state) => state.search.attributesMap) || [];
  const filtersMap = useAppSelector((state) => state.search.filtersMap) || {};
  const filterSize = useAppSelector((state) => state.search.filterSize);
  const filterInc = useAppSelector((state) => state.search.filterInc);
  const dispatch = useAppDispatch();

  const selectChangeHandler = (value) => {
    dispatch(setFilterInc(filterInc + 1));
    dispatch(addFilterFieldAction(value.value));
  };

  const getFilterValues = () => {
    const dataArray = [];
    if (!attributesMap) {
      return [];
    }

    attributesMap.map((val) => {
      if (filtersMap && filtersMap.indexOf && filtersMap.indexOf(val) === -1) {
        dataArray.push({
          value: attributes[val].code,
          label: attributes[val].name,
        });
      }
      return val;
    });
    return stableSort(dataArray, getComparator("asc", "label"));
  };

  const attributesArray =
    filtersMap && filtersMap.slice
      ? filtersMap
          .slice(0, filterSize + filterInc)
          .filter((index) => attributes[index] !== undefined)
          .map((index) => attributes[index])
      : [];
  const sortedAttributes = stableSort(attributesArray, getComparator("asc", "name")) || {};
  const values = getFilterValues();

  return (
    <div className={classes.filtersRow}>
      {!isLoadingSearchResultsInProgress ? (
        sortedAttributes.map((attribute) => {
          const includes =
            enabledAttributesMap && enabledAttributesMap.includes ? enabledAttributesMap.includes(attribute.code) : 0;
          const isDisabled = !includes;

          return (
            <FilterAttributes
              attribute={attribute}
              key={attribute.id}
              isDisabled={isDisabled}
              values={filtersValues[attribute.code] || []}
            />
          );
        })
      ) : (
        <Skeletons />
      )}
      {!isLoadingSearchResultsInProgress && values.length > 0 && (
        <FiltersSelect options={values} selectChangeHandler={selectChangeHandler} />
      )}
    </div>
  );
}

export default AttributesFilters;
