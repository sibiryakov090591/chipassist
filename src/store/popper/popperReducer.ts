import * as actionTypes from "./popperTypes";

const initialState: any = {
  firstOnTheScreen: -1,
  inViewArray: [],
};

export default function popper(state = initialState, action: any): any {
  switch (action.type) {
    case actionTypes.INIT_IN_VIEW_ARRAY:
      return { ...state, inViewArray: [...new Array(action.payload).fill(false)] };
    case actionTypes.UPDATE_IN_VIEW:
      return {
        ...state,
        inViewArray: [
          ...state.inViewArray.slice(0, action.payload.key),
          action.payload.inView,
          ...state.inViewArray.slice(action.payload.key + 1, ...state.inViewArray.length),
        ],
      };
    case actionTypes.UPDATE_FIRST_ON_THE_SCREEN:
      return {
        ...state,
        firstOnTheScreen:
          state.inViewArray.indexOf(true) !== state.firstOnTheScreen
            ? state.inViewArray.indexOf(true)
            : state.firstOnTheScreen,
      };
    default:
      return state;
  }
}
