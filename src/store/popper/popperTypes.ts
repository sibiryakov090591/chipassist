export const INIT_IN_VIEW_ARRAY = "POPPER_INITIALIZATION";
export const UPDATE_IN_VIEW = "POPPER_UPDATE";
export const UPDATE_FIRST_ON_THE_SCREEN = "POPPER_UPDATE_FIRST";

export interface InitInViewArray {
  type: typeof INIT_IN_VIEW_ARRAY;
  payload: any;
}

export interface UpdateInViewArray {
  type: typeof UPDATE_IN_VIEW;
  payload: any;
}

export interface UpdateFirstOnTheScreen {
  type: typeof UPDATE_FIRST_ON_THE_SCREEN,
  payload: any
}

export type PopperActions = InitInViewArray | UpdateInViewArray;
