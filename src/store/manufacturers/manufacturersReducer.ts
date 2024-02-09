import * as actionTypes from "./manufacturersTypes";
import { Items } from "./manufacturersTypes";

const initialState: actionTypes.ManufacturersState = {
  items: [],
  groups: {},
  loaded: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case actionTypes.GET_All_ITEMS:
      return { ...state, items: [...payload.results] };
    case actionTypes.JOIN_ITEMS:
      return { ...state, items: [...state.items, ...payload.results] };
    case actionTypes.ITEMS_FETCHED: {
      const data: { [key: string]: Items[] } = {};
      [...state.items]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((item) => {
          const key = item?.name?.charAt(0)?.toUpperCase();
          if (data[key]) {
            data[key].push(item);
          } else {
            data[key] = [item];
          }
        });
      return { ...state, groups: data, loaded: true };
    }
    default:
      return state;
  }
};
