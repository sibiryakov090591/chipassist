import React, { ChangeEvent } from "react";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import { useStyles } from "./style";

interface Props {
  options: Array<{ value: number; title: string }>;
  value: any;
  onChange: any;
  placeholder?: any;
  onClear?: any;
  size?: any;
  className?: any;
  error?: string;
}

const Select: React.FC<Props> = ({ options, placeholder, value, onChange, onClear, size, className, error }) => {
  const classes = useStyles();

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${classes.selectWrap} ${className || ""}`}>
      <div className={`${classes.selectContainer} ${error || ""} ${size || ""}`}>
        <select
          className={`${classes.select} ${!value && classes.selectGrayColor} show-by`}
          onChange={onChangeHandler}
          value={value || placeholder}
        >
          {placeholder && (
            <option disabled value={placeholder}>
              {placeholder}
            </option>
          )}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.title}
              </option>
            ))}
        </select>
      </div>
      {!!value && onClear && (
        <button className={classes.clearBtn} onClick={onClear} title="Clear">
          <BackspaceOutlinedIcon className={classes.clearBtnIc} />
        </button>
      )}
    </div>
  );
};

export default Select;
