import manufacturers from "@src/constants/manufacturers";
import * as actionTypes from "./manufacturersTypes";
import { Items } from "./manufacturersTypes";

const data: { [key: string]: Items[] } = {};
manufacturers.forEach((item) => {
  const key = item?.name?.charAt(0)?.toUpperCase();
  if (data[key]) {
    data[key].push(item);
  } else {
    data[key] = [item];
  }
});

const initialState: actionTypes.ManufacturersState = {
  items: manufacturers,
  groups: data,
  loaded: true,
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
