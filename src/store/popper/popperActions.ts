import * as popperActions from "./popperTypes";

export const updateInViewArray = (key: any, inView: boolean) => {
  return {
    type: popperActions.UPDATE_IN_VIEW,
    payload: {
      key,
      inView,
    },
  };
};

export const updateFirstOnTheScreen = () => {
  return {
    type: popperActions.UPDATE_FIRST_ON_THE_SCREEN,
    payload: {},
  };
};

export const initArray = (len: any) => {
  return {
    type: popperActions.INIT_IN_VIEW_ARRAY,
    payload: len,
  };
};

export default {
  updateInViewArray,
  initArray,
  updateFirstOnTheScreen,
};
