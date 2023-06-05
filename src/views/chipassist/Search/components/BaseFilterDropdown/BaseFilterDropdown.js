import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import useAppTheme from "@src/theme/useAppTheme";
import Dropdown from "@src/components/FiltersSelect/dropdown";
import {
  selectStyles,
  StyledBadge,
  StyledTypography,
  OptimizedMenuList,
  OptimizedOption,
} from "@src/components/SelectNew";
import { useStyles } from "./styles";

function BaseFilterDropdown({ defaultLabel, selectedItems, placeholder = "Search...", options, changeHandler }) {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

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

  const onSelectChange = (item) => {
    changeHandler(item);
  };

  // eslint-disable-next-line no-shadow
  const isOptionDisabled = (_v, options) => {
    return options.some((i) => i.value === "All");
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      target={
        <Button className={`${classes.button} ${appTheme.dropdownMenu}`} onClick={toggleOpen}>
          <span className={classes.buttonText}>
            {selectedItems.length ? (
              <StyledBadge color="primary" badgeContent={selectedItems.length}>
                <StyledTypography>{defaultLabel}</StyledTypography>
              </StyledBadge>
            ) : (
              defaultLabel
            )}
          </span>
          <i className={classes.buttonArrow} />
        </Button>
      }
    >
      <CreatableSelect
        autoFocus
        isMulti
        backspaceRemovesValue={true}
        components={{
          DropdownIndicator: null,
          IndicatorSeparator: null,
          MenuList: OptimizedMenuList,
          Option: OptimizedOption,
        }}
        isClearable={true}
        menuIsOpen
        onChange={onSelectChange}
        options={options}
        isOptionDisabled={isOptionDisabled}
        value={selectedItems}
        placeholder={placeholder}
        formatCreateLabel={(userInput) => `Add "${userInput}"`}
        styles={selectStyles} // если нужны локальные стили, то можно смерджитьс локальным
        tabSelectsValue={false}
      />
    </Dropdown>
  );
}

BaseFilterDropdown.propTypes = {
  defaultLabel: PropTypes.string.isRequired,
  selectedItems: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  changeHandler: PropTypes.func.isRequired,
};

export default BaseFilterDropdown;
