import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button } from "@material-ui/core";
import AsyncSelect from "react-select/async";
import Dropdown from "@src/components/FiltersSelect/dropdown";
import { selectStyles } from "@src/components/SelectNew";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

function AutocompleteDropdown({ defaultLabel, value, placeholder = "Search...", loadOptionsAction, changeHandler }) {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const loadAction = async (val, cb) => {
    if (val.length < 3) return cb([]);
    const res = await loadOptionsAction(val);
    if (!res.data || !res.data.length) return cb([]);
    const items = res.data.reduce((acc, curr) => {
      acc.push({ value: curr, label: curr });
      return acc;
    }, []);
    return cb(items);
  };

  const debounceQuery = useCallback(
    _.debounce((val, cb) => loadAction(val, cb), 500),
    [],
  );

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
    setIsOpen(false);
  };

  const handleLoad = (val, cb) => {
    debounceQuery(val, cb);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      target={
        <Button
          className={`${classes.button} ${appTheme.dropdownMenu} ${!value ? classes.buttonPromt : ""}`}
          onClick={toggleOpen}
        >
          <span className={classes.buttonText}>{value ? <span>{value}</span> : defaultLabel}</span>
          <i className={classes.buttonArrow} />
        </Button>
      }
    >
      <AsyncSelect
        cacheOptions
        autoFocus
        backspaceRemovesValue={true}
        components={{
          DropdownIndicator: null,
          IndicatorSeparator: null,
        }}
        isClearable={true}
        onChange={onSelectChange}
        loadOptions={handleLoad}
        // value={value ? { value, label: value } : ""}
        placeholder={placeholder}
        styles={selectStyles}
        tabSelectsValue={false}
      />
    </Dropdown>
  );
}

AutocompleteDropdown.propTypes = {
  defaultLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  loadOptionsAction: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string, // todo: seems like there's no effect. candidate to be removed
  required: PropTypes.bool,
  InputLabelProps: PropTypes.object,
};

export default AutocompleteDropdown;
