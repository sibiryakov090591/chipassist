import {
  ChartState,
  LOAD_PRICE_DATA_R,
  LOAD_PRICE_DATA_S,
  LOAD_PRICE_DATA_F,
  SET_IS_OPEN,
  SET_DATA,
  ChartActionTypes,
} from "./chartTypes";

const initialState: ChartState = {
  isLoading: false,
  isOpen: false,
  data: null,
  stockrecordId: null,
  priceId: null,
};

export default (state = initialState, action: ChartActionTypes) => {
  switch (action.type) {
    case LOAD_PRICE_DATA_R:
      return { ...state, isLoading: true };
    case LOAD_PRICE_DATA_S:
      return { ...state, data: action.response.results, isLoading: false };
    case LOAD_PRICE_DATA_F:
      return { ...state, isLoading: false };
    case SET_IS_OPEN:
      return { ...state, isOpen: action.payload };
    case SET_DATA:
      return { ...state, stockrecordId: action.payload.stockrecordId, priceId: action.payload.priceId };
    default:
      return state;
  }
};
