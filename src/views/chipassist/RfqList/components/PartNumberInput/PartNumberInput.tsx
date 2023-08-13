import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { TextField } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { onSuggestionsClearRequested, onSuggestionsFetchRequested } from "@src/store/suggestions/suggestionsActions";
import useAppSelector from "@src/hooks/useAppSelector";
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

  const onSuggestionSelected = (e: any, { suggestionValue }: any) => {
    onChange({ ...e, target: { ...e.target, value: suggestionValue, name: "MPN" } });
  };

  const onSuggestionsFetchRequestedHandler = (e: any) => {
    dispatch(onSuggestionsFetchRequested(e.value));
  };

  const onSuggestionsClearRequestedHandler = () => {
    dispatch(onSuggestionsClearRequested());
  };

  const renderSuggestion = (suggestion: any) => <span>{suggestion.name}</span>;

  const getSuggestionValue = (suggestion: any) => suggestion.name;

  const onFieldFocus = () => {
    setHasFocus(true);
  };

  const onFieldBlur = () => {
    blurHandler();
    setHasFocus(false);
  };

  const onFieldChange = (e: any) => {
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
        shouldRenderSuggestions={() => hasFocus}
        inputProps={{
          value: value || "",
          onChange: onFieldChange,
          onFocus: onFieldFocus,
          onBlur: onFieldBlur,
        }}
        renderInputComponent={(inputProps: any) => (
          <TextField
            title={partnumberRef && partnumberRef.length > 25 ? partnumberRef : ""}
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
        )}
      />
    </div>
  );
};

export default PartNumberInput;
