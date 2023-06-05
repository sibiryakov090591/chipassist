import React, { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { showCategories } from "@src/constants/defaults";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { getAllSellers } from "@src/store/sellers/sellersActions";
import { getAllManufacturers } from "@src/store/manufacturers/manufacturersActions";
import { saveBaseFilters } from "@src/store/search/searchActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import BaseFilterDropdown from "../BaseFilterDropdown/BaseFilterDropdown";
import { useStyles } from "./style";

function returnSelectedItems(items, ids) {
  if (!items) {
    return [];
  }
  return items.reduce((res, val) => {
    if (ids.includes(val.id)) res.push(val);
    return res;
  }, []);
}

function createSelectOptions(current_items, isString = false, all_items = []) {
  if (!current_items) {
    return [];
  }
  if (isString) {
    return current_items.reduce((res, item) => {
      res.push({ value: item, label: item, __isNew__: true });
      return res;
    }, []);
  }

  if (all_items.length === 0) {
    return current_items.reduce((res, item) => {
      res.push({ value: item.id, label: item.name });
      return res;
    }, []);
  }

  const current_ids = current_items.map((val) => val.id);
  const enabled = [];
  const disabled = [];

  all_items.map((val) => {
    if (current_ids.includes(val.id)) {
      enabled.push({ value: val.id, label: val.name });
    } else {
      disabled.push({ value: val.id, label: val.name, isDisabled: true });
    }
    return val;
  });

  return [...enabled, ...disabled];
}

function BaseFilters(props) {
  const dispatch = useAppDispatch();

  const baseFilters = useAppSelector((state) => state.search.baseFilters) || [];

  const selectedCategoryIds = baseFilters ? baseFilters.base_category_ids || [] : [];
  const selectedCategoryStrings = baseFilters ? baseFilters.base_category_strings || [] : [];
  const selectedManufacturerIds = baseFilters ? baseFilters.base_manufacturer_ids || [] : [];
  const selectedManufacturerStrings = baseFilters ? baseFilters.base_manufacturer_strings || [] : [];
  const selectedSellerIds = baseFilters ? baseFilters.base_seller_ids || [] : [];
  const selectedSellerStrings = baseFilters ? baseFilters.base_seller_strings || [] : [];

  const categories_objects = useAppSelector((state) => state.categories.categories);
  const all_categories = Object.keys(categories_objects).map((val) => categories_objects[val]);
  const availableCategories = useAppSelector((state) => state.search.searchResultsCategories);
  const selectedCategories = returnSelectedItems(availableCategories, selectedCategoryIds);

  const all_manufacturers = useAppSelector((state) => state.manufacturers.items);
  const availableManufacturers = useAppSelector((state) => state.search.searchResultsManufacturers);
  const selectedManufacturers = returnSelectedItems(availableManufacturers, selectedManufacturerIds);

  const all_sellers = useAppSelector((state) => state.sellers.items);
  const availableSellers = useAppSelector((state) => state.search.searchResultsSellers).reduce(
    (acc, val) => (acc.find((v) => v.id === val.id) ? acc : [...acc, val]),
    [],
  );
  const selectedSellers = returnSelectedItems(availableSellers, selectedSellerIds);

  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const { t } = useI18n("search");
  const classes = useStyles();
  const appTheme = useAppTheme();

  useEffect(() => {
    if (dispatch) {
      dispatch(getAllManufacturers());
      dispatch(getAllSellers());
    }
  }, [dispatch, shouldUpdateBackend]);

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === "base_num_in_stock" && value !== "") {
      const inStock = +value;
      if (!Number.isInteger(inStock) || inStock < 1 || inStock > 1000000) {
        return;
      }
    }
    dispatch(saveBaseFilters({ [e.target.name]: e.target.value }));
  };

  const onSelectChange = (filterMultiName, filterSoloName, items) => {
    const values = items || [];
    const filters = {
      [filterMultiName]: [],
      [filterSoloName]: [],
    };
    values.forEach((val) => {
      // __isNew__ present from third party
      // eslint-disable-next-line no-underscore-dangle
      const key = val.__isNew__ ? filterSoloName : filterMultiName;
      filters[key].push(val.value);
    });
    dispatch(saveBaseFilters(filters));
  };

  const onChangeInStock = () => {
    dispatch(saveBaseFilters({ base_in_stock: !baseFilters.base_in_stock }));
  };

  return (
    <div className={classes.baseFiltersItems}>
      {!props.categoriesHidden && (
        <div className={classes.lineWrapper}>
          <BaseFilterDropdown
            defaultLabel={t("common.categories")}
            selectedItems={[
              ...createSelectOptions(selectedCategories),
              ...createSelectOptions(selectedCategoryStrings, true),
            ]}
            options={createSelectOptions(availableCategories, false, all_categories)}
            changeHandler={(selected) => onSelectChange("base_category_ids", "base_category_strings", selected)}
          />
        </div>
      )}
      <BaseFilterDropdown
        defaultLabel={t("common.manufacturers")}
        selectedItems={[
          ...createSelectOptions(selectedManufacturers),
          ...createSelectOptions(selectedManufacturerStrings, true),
        ]}
        options={createSelectOptions(availableManufacturers, false, all_manufacturers)}
        changeHandler={(selected) => onSelectChange("base_manufacturer_ids", "base_manufacturer_strings", selected)}
      />
      <BaseFilterDropdown
        defaultLabel={t("distributor.distributors")}
        selectedItems={[...createSelectOptions(selectedSellers), ...createSelectOptions(selectedSellerStrings, true)]}
        options={createSelectOptions(availableSellers, false, all_sellers)}
        changeHandler={(selected) => onSelectChange("base_seller_ids", "base_seller_strings", selected)}
      />
      <FormControlLabel
        control={
          <Checkbox
            className={appTheme.checkbox}
            checked={baseFilters.base_in_stock}
            onChange={onChangeInStock}
            name="base_in_stock"
            color="default"
          />
        }
        label={t("distributor.in_stock")}
      />
      <TextField
        className={showCategories ? classes.lastItem : ""}
        fullWidth
        label={t("qty_in_stock")}
        name="base_num_in_stock"
        onChange={onFieldChange}
        type="text"
        value={baseFilters.base_num_in_stock || ""}
        variant="outlined"
        disabled={!baseFilters.base_in_stock}
      />
    </div>
  );
}

export default BaseFilters;
