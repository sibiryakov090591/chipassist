import { LOCATION_CHANGE } from "react-router-redux";

const initialState = {
  previousLocation: null,
  previousSearch: null,
  currentLocation: null,
  currentSearch: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        previousLocation: state.currentLocation,
        previousSearch: state.currentSearch,
        currentLocation: action.payload.location.pathname,
        currentSearch: action.payload.location.search,
      };

    default:
      return state;
  }
};
