import * as actionTypes from "./sellersTypes";

const initialState: actionTypes.SellersState = {
  items: [],
  isLoading: true,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case actionTypes.GET_All_ITEMS:
      return { ...state, items: payload.results };
    case actionTypes.JOIN_ITEMS:
      return { ...state, items: [...state.items, ...payload.results] };
    case actionTypes.ITEMS_FETCHING_R:
      return { ...state, isLoading: true };
    case actionTypes.ITEMS_FETCHING_S:
      return { ...state, isLoading: false };
    case actionTypes.ITEMS_FETCHING_F:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
