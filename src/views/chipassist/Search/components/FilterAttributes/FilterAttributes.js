import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withBaseIcon } from "react-icons-kit";
import { timesOutline } from "react-icons-kit/typicons/timesOutline";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { removeFilterFieldAction } from "@src/store/search/searchActions";
import Dropdown from "./dropdown/Dropdown";
import FilterSelect from "./filterType/FilterSelect";
import FilterSlider from "./filterType/FilterSlider";
import { useStyles } from "./styles";

const Icon = withBaseIcon();

const getNumbersRange = (vals) => {
  const numbers = vals.reduce((acc, val) => {
    const number = parseFloat(val);
    if (!Number.isNaN(number)) acc.push(number);
    return acc;
  }, []);
  return numbers.sort((a, b) => a - b);
};

const getNumbersMinMax = (vals) => {
  const numbers = getNumbersRange(vals);
  if (!numbers.length) return [0, 0];
  return { min: numbers[0], max: numbers[numbers.length - 1] };
};

const FilterAttributes = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { isDisabled, values } = props;
  const dispatch = useAppDispatch();
  const { t } = useI18n("search");
  const attribute = props.attribute || {};

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
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const removeAttributeHandler = (e) => {
    e.stopPropagation();
    dispatch(removeFilterFieldAction(attribute.code));
  };

  const getFilterValue = (vals, type) => {
    const isNumber = ["integer", "float"].includes(type);

    if (!!Object.keys(vals).length && isNumber && Object.keys(vals).length > 1) {
      return (
        <div className={classes.attributeValueDiv}>
          {t("values")}: {vals.min} &ndash; {vals.max}
        </div>
      );
    }
    if (vals.length) {
      return (
        <div className={`${classes.attributeValueDiv} attribute-values`}>
          {t("values")}: {vals.join(", ")}
        </div>
      );
    }
    return <span></span>;
  };

  const isSlider = ["integer", "float"].includes(attribute.type) && attribute.values.length > 1;

  const getValues = (vals) => {
    if (isSlider) {
      if (attribute.values.length === 1) {
        return [];
      }
      return { min: vals.min, max: vals.max };
    }
    return vals;
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      target={
        <div
          onClick={toggleOpen}
          className={`${classes.attributeButton} ${isDisabled ? classes.isDisabled : ""} ${
            isSlider ? "attribute-button-slider" : "attribute-button-select"
          }`}
        >
          <div className={classes.attributeButtonFlexContainer}>
            <Icon className={classes.icon} onClick={removeAttributeHandler} icon={timesOutline} />
            <div className={classes.attributeContainer}>
              <div className={classes.attributeName}>
                {isSlider ? (
                  <span style={{ color: "#00007c" }}>{attribute.name}</span>
                ) : (
                  <span style={{ color: "#00003e" }}>{attribute.name}</span>
                )}
              </div>
            </div>
          </div>
          {getFilterValue(values, attribute.type)}
        </div>
      }
    >
      {isSlider && attribute.values.length > 1 ? (
        <FilterSlider attribute={attribute} prices={getValues(values)} maxPrices={getNumbersMinMax(attribute.values)} />
      ) : (
        <FilterSelect attribute={attribute} values={getValues(values)} />
      )}
    </Dropdown>
  );
};

FilterAttributes.propTypes = {
  className: PropTypes.string,
  attribute: PropTypes.object,
  values: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  isDisabled: PropTypes.any,
};

export default FilterAttributes;
