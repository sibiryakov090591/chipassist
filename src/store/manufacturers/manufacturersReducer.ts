import * as actionTypes from "./manufacturersTypes";

const initialState: actionTypes.ManufacturersState = {
  items: [],
  loaded: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case actionTypes.GET_All_ITEMS:
      return { ...state, items: [...payload.results] };
    case actionTypes.JOIN_ITEMS:
      return { ...state, items: [...state.items, ...payload.results] };
    case actionTypes.ITEMS_FETCHED:
      return { ...state, loaded: true };
    default:
      return state;
  }
};
