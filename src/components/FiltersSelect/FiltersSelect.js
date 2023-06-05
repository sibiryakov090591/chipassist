import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import Dropdown from "./dropdown";
import { DropdownIndicator } from "./components";
import { selectStyles, useStyles } from "./styles";

const FiltersSelect = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n("component");
  const { options } = props;

  const escHandler = useCallback((event) => {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
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
  const onSelectChange = (value) => {
    toggleOpen();
    props.selectChangeHandler(value);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      target={
        <Button className={classes.button} onClick={toggleOpen}>
          + {t("attribute")}
        </Button>
      }
    >
      <Select
        className="attribute-add"
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onChange={onSelectChange}
        options={options}
        placeholder={t("search.search")}
        styles={selectStyles}
        tabSelectsValue={false}
      />
    </Dropdown>
  );
};

FiltersSelect.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  selectChangeHandler: PropTypes.func.isRequired,
};

export default FiltersSelect;
