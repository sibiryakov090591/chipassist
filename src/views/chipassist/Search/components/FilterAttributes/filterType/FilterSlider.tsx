import React, { useState, useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Slider, { Mark } from "@material-ui/core/Slider";
import NumberFormat from "react-number-format";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { usePricesChanged, useMarksUpdate } from "@src/components/Filters/SliderPrice";
import { changeFilterValueThunk } from "@src/store/search/searchActions";
import { useStyles } from "../styles";

interface Props {
  prices: { min: number; max: number };
  maxPrices: { min: number; max: number };
  attribute: any;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  name: string;
}

interface BasePriceFilters {
  base_price_min: number;
  base_price_max: number;
  init: boolean;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        } as any);
      }}
      // isNumericString
      decimalScale={2}
    />
  );
};

function valuetext(value: number) {
  return `${value}`;
}

const FilterSlider: React.FC<Props> = (props) => {
  const [sliderMinPrice, setSliderMinPrice] = useState<number>(0);
  const [sliderMaxPrice, setSliderMaxPrice] = useState<number>(0);
  const [sliderVal, setSliderVal] = useState<[number, number]>([0, 1]);
  const [marks, setMarks] = useState<[number, number]>([0, 1]);

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("search");

  const { min: base_price_min, max: base_price_max } = props.prices;
  const { min: minPrice, max: maxPrice } = props.maxPrices;

  usePricesChanged(
    base_price_min,
    base_price_max,
    minPrice,
    maxPrice,
    setSliderVal,
    setSliderMinPrice,
    setSliderMaxPrice,
  );
  useMarksUpdate(setMarks, minPrice, maxPrice);

  useEffect(() => {
    const price_max = base_price_max || 0;
    if (!price_max && !maxPrice && !sliderVal[1]) {
      setSliderVal([0, 1]);
    }
  }, [base_price_max, maxPrice, sliderVal]);

  const sliderChangeHandler = (e: any, newValue: number | number[]) => {
    const value = newValue as [number, number];
    setSliderVal(value);
    setSliderMinPrice(value[0]);
    setSliderMaxPrice(value[1]);
  };

  const onPriceSliderChange = (e: any, newValue: number | number[]) => {
    const value = newValue as [number, number];
    setSliderVal(value);
    if (value[0] !== sliderMinPrice) {
      setSliderMinPrice(value[0]);
    }
    if (value[1] !== base_price_max) {
      const price = sliderMinPrice !== value[1] ? value[1] : sliderMinPrice + 1;
      setSliderMaxPrice(price);
    }

    dispatch(
      changeFilterValueThunk({
        code: props.attribute.code,
        values: { min: value[0], max: value[1], type: "range" },
      }),
    );
  };

  // changed
  const onChangePriceField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const price = parseFloat(value) || 0;
    let price_min = sliderVal[0];
    let price_max = sliderVal[1];

    if (name === "base_price_min" && price !== sliderMinPrice) {
      price_min = marks[0] > price ? marks[0] : price;
    }

    if (name === "base_price_max" && price !== sliderMaxPrice) {
      price_max = price;
    }

    if (sliderVal[0] !== price_min || sliderVal[1] !== price_max) {
      setSliderMinPrice(price_min);
      setSliderMaxPrice(price_max);
      setSliderVal([price_min, price_max !== 0 ? price_max : maxPrice]);

      dispatch(
        changeFilterValueThunk({
          code: props.attribute.code,
          values: {
            min: price_min !== 0 ? price_min : minPrice,
            max: price_max !== 0 ? price_max : maxPrice,
            type: "range",
          },
        }),
      );
    }
  };

  const getMarks = (vals: [number, number]): Mark[] => {
    return [
      {
        value: vals[0],
        label: vals[0],
      },
      {
        value: vals[1],
        label: vals[1],
      },
    ];
  };

  const isDisabled = (min: number, max: number) => {
    return (!min && !max) || min === max;
  };

  return (
    <div style={{ margin: "0px 20px" }} className="attribute-slider">
      <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.pricesFields}>
        <TextField
          fullWidth
          label={t("min")}
          placeholder={`${minPrice}`}
          name="base_price_min"
          onChange={onChangePriceField}
          value={sliderMinPrice !== minPrice ? sliderMinPrice || "" : ""} // TODO::price
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          disabled={isDisabled(minPrice, maxPrice)}
        />
        <TextField
          fullWidth
          label={t("max")}
          placeholder={`${maxPrice}`}
          name="base_price_max"
          onChange={onChangePriceField}
          value={sliderMaxPrice !== maxPrice ? sliderMaxPrice || "" : ""} // TODO::price
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          disabled={isDisabled(minPrice, maxPrice)}
        />
      </Box>
      <Slider
        value={sliderVal}
        onChange={sliderChangeHandler}
        onChangeCommitted={onPriceSliderChange}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={marks[0] || 0}
        max={marks[1] || 1}
        marks={getMarks(marks)} // TODO::price
        step={1}
        valueLabelDisplay={!minPrice && !maxPrice ? "off" : "on"}
        className={classes.slider}
        disabled={isDisabled(minPrice, maxPrice)}
      />
    </div>
  );
};

export default FilterSlider;
