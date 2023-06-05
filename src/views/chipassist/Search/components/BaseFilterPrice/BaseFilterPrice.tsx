import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Slider, { Mark } from "@material-ui/core/Slider";
import NumberFormat from "react-number-format";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { usePricesChanged, useMarksUpdate } from "@src/components/Filters/SliderPrice";
import { useStyles } from "./style";

interface Props {
  prices: { min: number; max: number };
  minPrice: number;
  maxPrice: number;
  onPriceChanged: (newPrice: { min: number; max: number }) => void;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  name: string;
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

const BaseFilterPrice: React.FC<Props> = ({ prices, minPrice, maxPrice, onPriceChanged }) => {
  const [sliderVal, setSliderVal] = useState<[number, number]>([0, 1]);
  const [marks, setMarks] = useState<[number, number]>([0, 1]);

  const classes = useStyles();
  const { t } = useI18n("search");

  usePricesChanged(prices.min, prices.max, minPrice, maxPrice, setSliderVal);
  useMarksUpdate(setMarks, minPrice, maxPrice);

  const sliderChangeHandler = (e: any, newValue: number | number[]) => {
    const value = newValue as [number, number];
    setSliderVal(value);
  };

  const onPriceSliderChange = (e: any, newValue: number | number[]) => {
    const value = newValue as [number, number];
    onPriceChanged({ min: value[0], max: value[1] });
  };

  const onChangePriceField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const price = parseFloat(value) || 0;
    onPriceChanged(name === "base_price_min" ? { ...prices, min: price } : { ...prices, max: price });
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
    <div>
      {t("price")}
      <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.pricesFields}>
        <TextField
          fullWidth
          label={t("min")}
          placeholder={`${minPrice}`}
          name="base_price_min"
          onChange={onChangePriceField}
          value={prices.min || ""}
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
          value={prices.max || ""}
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
      <div style={{ padding: "0 20px" }}>
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
    </div>
  );
};

export default BaseFilterPrice;
