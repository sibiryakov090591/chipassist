import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { TextField, Box } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { onSuggestionsClearRequested, onSuggestionsFetchRequested } from "@src/store/suggestions/suggestionsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import Popper from "@material-ui/core/Popper";
import { useStyles } from "./styles";

interface Props {
  value: string;
  partnumberRef: string;
  onChange: (value: string) => void;
  disabled: boolean;
  errorHandler: any;
  blurHandler: any;
}

const suggestTheme = {
  suggestionsContainer: "list",
  suggestion: "list-item",
  suggestionHighlighted: "list-item-highlight",
};

const PartNumberInput: React.FC<Props> = ({
  value,
  partnumberRef,
  onChange,
  disabled = false,
  errorHandler,
  blurHandler,
}) => {
  const classes = useStyles();
  const suggestions = useAppSelector((state) => state.suggestions.suggestions);
  const [hasFocus, setHasFocus] = useState(false);
  const dispatch = useAppDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onSuggestionSelected = (e: any, { suggestionValue }: any) => {
    onChange({ ...e, target: { ...e.target, value: suggestionValue, name: "MPN" } });
  };

  const onSuggestionsFetchRequestedHandler = (e: any) => {
    e.value = e.value.replace(/[^a-zA-Z0-9!@#$%^&*)(-_=+.,?№;:/]/g, "");
    dispatch(onSuggestionsFetchRequested(e.value));
  };

  const onSuggestionsClearRequestedHandler = () => {
    dispatch(onSuggestionsClearRequested());
  };

  const renderSuggestion = (suggestion: any) => <span>{suggestion.name}</span>;

  const getSuggestionValue = (suggestion: any) => suggestion.name;

  const onFieldFocus = (e: any) => {
    setAnchorEl(e.target);
    setShowTooltip(false);
    setHasFocus(true);
  };

  const onFieldBlur = () => {
    blurHandler();
    // if (e.target.value.indexOf(" ") !== -1) {
    //   e.target.value = e.target.value.replace(/\s/g, "");
    //   onChange(e);
    //   if (timer.current) {
    //     clearTimeout(timer.current);
    //   }
    //   timer.current = setTimeout(() => {
    //     setShowTooltip(true);
    //     if (closeTimer.current) {
    //       clearTimeout(closeTimer.current);
    //     }
    //     closeTimer.current = setTimeout(() => {
    //       setShowTooltip(false);
    //     }, 2000);
    //   }, 600);
    // }
    setHasFocus(false);
  };

  const onFieldChange = (e: any) => {
    const prevValue = e.target.value;
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9# /-]/g, "");
    setShowTooltip(prevValue !== e.target.value);
    onChange(e);
  };

  return (
    <div className={classes.autoSuggestField}>
      <Autosuggest
        onSuggestionSelected={onSuggestionSelected}
        theme={suggestTheme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequestedHandler}
        onSuggestionsClearRequested={onSuggestionsClearRequestedHandler}
        getSuggestionValue={getSuggestionValue}
        focusInputOnSuggestionClick={false}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={() => hasFocus && !showTooltip}
        inputProps={{
          value: value || "",
          onChange: onFieldChange,
          onFocus: onFieldFocus,
          onBlur: onFieldBlur,
        }}
        renderInputComponent={(inputProps: any) => (
          <>
            <TextField
              title={partnumberRef && partnumberRef.length > 25 ? partnumberRef : ""}
              aria-describedby={"mpn_field"}
              disabled={disabled}
              variant={"outlined"}
              name={"MPN"}
              label={"Part number *"}
              placeholder={"ex. KNP100"}
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.rfqInput}
              {...inputProps}
              {...errorHandler}
            />
            <Popper id={"mpn_field"} open={showTooltip} anchorEl={anchorEl}>
              {/* Spaces were successfully deleted */}
              <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                <span className={classes.error}>{'Only "a-z, A-Z, 0-9, /, #, -, ." are allowed in MPN'}</span>
              </Box>
            </Popper>
          </>
        )}
      />
    </div>
  );
};

export default PartNumberInput;
