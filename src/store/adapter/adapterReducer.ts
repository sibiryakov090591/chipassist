import * as actionTypes from "./adapterTypes";
import { AdapterActionTypes, AdapterState } from "./adapterTypes";

const initialState: AdapterState = {
  upload: {
    uploading: false,
    error: "",
    selected: false,
  },
  items: [],
  itemsPagination: null,
  isItemsLoading: false,
  item: null,
  itemUpdating: null,
  settings: null,
};

const alertsReducer = (state = initialState, action: AdapterActionTypes) => {
  switch (action.type) {
    case actionTypes.GET_FILE_SETTINGS_S:
      return { ...state, settings: action.response?.items || [] };
    case actionTypes.GET_FILE_SETTINGS_F:
      return { ...state, settings: [] };
    case actionTypes.SET_UPLOAD_STATE:
      return { ...state, upload: { ...action.payload } };
    case actionTypes.GET_ITEMS_R: {
      return { ...state, isItemsLoading: true, itemsPagination: null };
    }
    case actionTypes.GET_ITEMS_S: {
      return {
        ...state,
        items: action.response.results,
        isItemsLoading: false,
        itemsPagination: {
          count: action.response.count,
          page: action.response.page,
          total_pages: action.response.total_pages,
        },
      };
    }
    case actionTypes.GET_ITEMS_F: {
      return { ...state, isItemsLoading: false, itemsPagination: null };
    }
    case actionTypes.UPDATE_ITEM_R: {
      return { ...state, itemUpdating: action.id };
    }
    case actionTypes.UPDATE_ITEM_S: {
      return {
        ...state,
        items: state.items.map((v) => {
          if (v.id === action.response.id) return action.response;
          return v;
        }),
        itemUpdating: null,
      };
    }
    case actionTypes.UPDATE_ITEM_F: {
      return { ...state, itemUpdating: null };
    }
    case actionTypes.DELETE_ITEM_R: {
      return { ...state, itemUpdating: action.id };
    }
    case actionTypes.DELETE_ITEM_S: {
      return { ...state, items: state.items.filter((v) => v.id !== action.payload), itemUpdating: null };
    }
    case actionTypes.DELETE_ITEM_F: {
      return { ...state, itemUpdating: null };
    }
    default:
      return state;
  }
};

export default alertsReducer;
