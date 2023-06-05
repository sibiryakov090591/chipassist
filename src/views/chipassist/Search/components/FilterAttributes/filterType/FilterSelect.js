import React from "react";
import PropTypes from "prop-types";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Select from "react-select";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import {
  selectStyles,
  // OptimizedMenuList,
  // OptimizedOption,
} from "@src/components/SelectNew";
import { changeFilterValueThunk } from "@src/store/search/searchActions";

const FilterSelect = (props) => {
  const dispatch = useAppDispatch();
  const { t } = useI18n("search");
  const { values } = props;
  const attribute = props.attribute || {};

  const onSelectChange = (vals) => {
    let items = vals;
    if (!vals) items = [];
    const codes = items.map((val) => val.value);

    dispatch(changeFilterValueThunk({ code: attribute.code, values: codes }));
  };

  const options = () => {
    const resultArray = [];
    if (attribute.values) {
      attribute.values.map((val) => {
        resultArray.push({ value: val, label: val });
        return val;
      });
    }
    return resultArray;
  };

  return (
    <div>
      <Select
        className="attribute-select"
        isMulti
        autoFocus
        backspaceRemovesValue={true}
        components={{
          DropdownIndicator: null,
          IndicatorSeparator: null,
          // MenuList: OptimizedMenuList,
          // Option: OptimizedOption,
        }}
        isClearable={true}
        menuIsOpen
        onChange={onSelectChange}
        options={options()}
        value={values.map((val) => ({ value: val, label: val }))}
        placeholder={t("search_values")}
        styles={selectStyles}
        tabSelectsValue={false}
      />
    </div>
  );
};

FilterSelect.propTypes = {
  attribute: PropTypes.object,
  values: PropTypes.array,
};

export default FilterSelect;
