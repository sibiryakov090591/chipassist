export const LOAD_SUGGESTIONS_R = "LOAD_SUGGESTIONS_R";
export const LOAD_SUGGESTIONS_S = "LOAD_SUGGESTIONS_S";
export const LOAD_SUGGESTIONS_F = "LOAD_SUGGESTIONS_F";

export const LOAD_SUGGESTIONS_ARRAY = [LOAD_SUGGESTIONS_R, LOAD_SUGGESTIONS_S, LOAD_SUGGESTIONS_F];

export const CLEAR_SUGGESTION = "CLEAR_SUGGESTION";

// State
export interface SuggestionState {
  search: string;
  suggestions: { name: string }[];
  loading: boolean;
}

// Actions
interface OnSuggestionsClearRequested {
  type: typeof CLEAR_SUGGESTION;
}

interface OnSuggestionsRequestAction {
  type: typeof LOAD_SUGGESTIONS_R;
}

interface OnSuggestionsSuccessAction {
  type: typeof LOAD_SUGGESTIONS_S;
}

interface OnSuggestionsFailureAction {
  type: typeof LOAD_SUGGESTIONS_F;
}

export type SuggestionsActions =
  | OnSuggestionsClearRequested
  | OnSuggestionsRequestAction
  | OnSuggestionsSuccessAction
  | OnSuggestionsFailureAction;
