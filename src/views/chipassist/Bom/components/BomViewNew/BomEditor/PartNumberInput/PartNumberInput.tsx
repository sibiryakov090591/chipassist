import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { TextField } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { onSuggestionsClearRequested, onSuggestionsFetchRequested } from "@src/store/suggestions/suggestionsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./partNumberInputStyles";

interface Props {
  value: string;
  partnumberRef: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const suggestTheme = {
  suggestionsContainer: "list",
  suggestion: "list-item",
  suggestionHighlighted: "list-item-highlight",
};

const PartNumberInput: React.FC<Props> = ({ value, partnumberRef, onChange, disabled = false }) => {
  const classes = useStyles();
  const suggestions = useAppSelector((state) => state.suggestions.suggestions);
  const [hasFocus, setHasFocus] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useI18n("bom");

  const onSuggestionSelected = (e: any, { suggestionValue }: any) => {
    onChange(suggestionValue);
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
    setHasFocus(false);
  };

  const onFieldChange = (e: any) => {
    onChange(e.currentTarget.value);
  };

  let partnumberRefLabel = partnumberRef;
  if (partnumberRef && partnumberRef.length > 25) {
    partnumberRefLabel = `${partnumberRef.slice(0, 24)}...`;
  }

  return (
    <div className={classes.autosuggest}>
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
            variant="outlined"
            placeholder={t("product.part_number")}
            name="part_number"
            fullWidth
            className={classes.field}
            autoFocus
            disabled={disabled}
            label={partnumberRefLabel}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};

export default PartNumberInput;
