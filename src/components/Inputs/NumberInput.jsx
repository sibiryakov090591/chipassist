import React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

const NumberInput = (props) => {
  const { onChange, isAllowedZero, customInput, ...other } = props;
  return (
    <NumberFormat
      {...other}
      customInput={customInput === false ? null : TextField}
      // onValueChange={(values) => {
      //   onChange({
      //     target: {
      //       name: props.name,
      //       value: values.floatValue,
      //     },
      //   });
      // }}
      onChange={onChange}
      allowNegative={false}
      onBlur={(e) => {
        if (parseFloat(e.currentTarget.value) === 0 && !isAllowedZero) {
          onChange({
            target: {
              name: props.name,
              value: "",
            },
          });
        }
      }}
    />
  );
};

export default NumberInput;
