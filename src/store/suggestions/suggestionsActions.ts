import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./suggestionsTypes";

export const onSuggestionsFetchRequested = (value: string) => {
  return (dispatch: Dispatch<any>) => {
    if (value.length >= 3) {
      dispatch({
        types: actionTypes.LOAD_SUGGESTIONS_ARRAY,
        promise: (client: ApiClientInterface) =>
          client
            .get(`apiv2/search_ac/?search=${encodeURIComponent(value)}`, { cancelId: "search_ac", noapi: true })
            .then((res) => res.data)
            .catch((e: any) => {
              console.log("***LOAD_SUGGESTIONS_ERROR", e);
              throw e;
            }),
      });
    }
  };
};

export const onSuggestionFetchRequestedManufacturer = (MPN: string) => {
  return (dispatch: Dispatch<any>) => {
    if (MPN !== "") {
      dispatch({
        types: actionTypes.LOAD_SUGGESTIONS_ARRAY,
        promise: (client: ApiClientInterface) => client.post(""),
      });
    }
  };
};

export const onSuggestionsClearRequested = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.CLEAR_SUGGESTION,
    });
  };
};
