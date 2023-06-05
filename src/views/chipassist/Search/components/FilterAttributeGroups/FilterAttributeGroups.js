import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { batch } from "react-redux";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import Dropdown from "@src/components/FiltersSelect/dropdown";
import { addFilterCategoryFields, setFilterInc } from "@src/store/search/searchActions";
import {
  selectStyles,
  // OptimizedMenuList,
  // OptimizedOption,
} from "@src/components/SelectNew";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Skeletons from "../Filters/components/Skeleton/Skeleton";
import { useStyles } from "./styles";

function FilterAttributeGroups() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const groups = useAppSelector((state) => state.search.searchResultsAttributeGroups) || [];
  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const dispatch = useAppDispatch();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const { t } = useI18n("search");

  const escHandler = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);

    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const filterValues = () => {
    const dataArray = [];
    if (groups === undefined) {
      console.log("===== ERROR: groups === undefined");
      return [];
    }

    groups.map((item) => {
      dataArray.push({
        value: item.id,
        label: item.name,
      });
      return item;
    });

    return dataArray;
  };

  const onSelectChange = (items) => {
    // eslint-disable-next-line no-param-reassign
    if (!items) items = [];
    setSelectedGroups(items);

    batch(() => {
      const values = items.map((val) => val.value);
      // TODO зачем нужен setFilterInc?
      dispatch(setFilterInc(0));
      dispatch(addFilterCategoryFields(values));
    });
  };

  return (
    <div>
      {!isLoadingSearchResultsInProgress ? (
        <React.Fragment>
          <Dropdown
            isOpen={isOpen}
            onClose={toggleOpen}
            setIsOpen={setIsOpen}
            target={
              <Button className={classes.button} onClick={toggleOpen}>
                {t("attibutes_group")}
              </Button>
            }
          >
            <Select
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
              value={selectedGroups}
              menuIsOpen
              onChange={onSelectChange}
              options={filterValues()}
              placeholder={t("search")}
              styles={selectStyles}
              tabSelectsValue={false}
            />
          </Dropdown>
          <div className={classes.selectedCategory}>
            <strong>{t("groups")}: </strong>
            {selectedGroups.length ? selectedGroups.map((val) => val.label).join(", ") : t("all")}
          </div>
        </React.Fragment>
      ) : (
        <Skeletons />
      )}
    </div>
  );
}

export default FilterAttributeGroups;
