import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./suggestionsTypes";

const initialState: actionTypes.SuggestionState = {
  search: "",
  suggestions: [],
  loading: false,
};

const updateSuggestionsSuccess = (action: any, state: actionTypes.SuggestionState) => {
  return updateObject(state, {
    loading: false,
    suggestions: action.response?.data?.map((name: string) => ({ name })),
    search: action.response?.search,
  });
};

const updateClearSuggestions = (state: actionTypes.SuggestionState) => {
  return updateObject(state, {
    search: "",
    suggestions: [],
    loading: false,
  });
};

export default function suggestions(state = initialState, action: actionTypes.SuggestionsActions) {
  switch (action.type) {
    case actionTypes.LOAD_SUGGESTIONS_R:
      return updateObject(state, { loading: true });
    case actionTypes.LOAD_SUGGESTIONS_S:
      return updateSuggestionsSuccess(action, state);
    case actionTypes.LOAD_SUGGESTIONS_F:
      return updateObject(state, { loading: false });
    case actionTypes.CLEAR_SUGGESTION:
      return updateClearSuggestions(state);
    default:
      return state;
  }
}
