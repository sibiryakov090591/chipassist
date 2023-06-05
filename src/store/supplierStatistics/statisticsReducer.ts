import * as actionTypes from "./statisticsTypes";

const initialState: actionTypes.StatisticsState = {
  data: null,
  isLoading: true,
};

export default function statisticsReducer(
  state = initialState,
  action: actionTypes.StatisticsActionTypes,
): actionTypes.StatisticsState {
  switch (action.type) {
    case actionTypes.LOAD_STATISTICS_R:
      return { ...state, isLoading: true };
    case actionTypes.LOAD_STATISTICS_S:
      return { ...state, isLoading: false, data: action.response };
    case actionTypes.LOAD_STATISTICS_F:
      return { ...state, isLoading: false, data: null };

    default:
      return state;
  }
}
