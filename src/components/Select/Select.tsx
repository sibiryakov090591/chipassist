import React, { ChangeEvent } from "react";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import FormControl from "@material-ui/core/FormControl";
import MaterialSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { clsx } from "clsx";
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
  label?: string | JSX.Element;
}

const Select: React.FC<Props> = ({ options, placeholder, value, onChange, onClear, size, className, error, label }) => {
  const classes = useStyles();

  const onChangeHandler = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`${classes.selectWrap} ${className || ""}`}>
      <FormControl variant="outlined" size="small">
        {!!label && <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>}
        <MaterialSelect
          className={clsx(classes.select, {
            [classes.selected]: !!value && onClear,
            [error]: !!error,
            [size]: !!size,
          })}
          native
          fullWidth
          onChange={onChangeHandler}
          value={value || placeholder}
          {...(!!label && { label })}
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple",
          }}
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
        </MaterialSelect>
      </FormControl>
      {!!value && onClear && (
        <button className={classes.clearBtn} onClick={onClear} title="Clear">
          <BackspaceOutlinedIcon className={classes.clearBtnIc} />
        </button>
      )}
    </div>
  );
};

export default Select;
