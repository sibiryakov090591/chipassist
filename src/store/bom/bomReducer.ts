import * as actionTypes from "./bomTypes";
import { uniqueFromTwoArrays, updateObject } from "../../utils/utility";
import { SaveCashModalProducts } from "./bomTypes";

export const PATHNAME = "/bom";

export const bomInitialState: actionTypes.BomInitialState = {
  data: {},
  id: "",
  name: "",
  cost: 0,
  count: 0,
  items: {},
  error: "",
  saving: false,
  saved: false,
  search: {},
  stockrecords: {},
  loading: false,
  total_pages: 1,
  rowsForDelete: [],
  readonly: false,
  created: "",
  order: null,
  original: "",
  parent: null,
  valid: true,
};

const mergeDataInitialState: actionTypes.MergeDataInitialState = {
  processedLines: [],
  rawLines: [],
  conflict: {
    original: null,
    duplicate: null,
  },
  groups: [],
  canSave: false,
};

const mergeSaveInitialState: actionTypes.MergeSaveInitialState = {
  saving: false,
  error: false,
  bomId: null,
};

const initialState: actionTypes.InitialState = {
  upload: {
    uploading: false,
    error: "",
    selected: false,
  },
  bomList: {},
  isBomListLoading: false,
  bomItem: { ...bomInitialState },
  cashModalItems: {},
  cashModalItemsLoading: false,
  attributes: [],
  copy: {
    copying: false,
    error: false,
    copyId: null,
  },
  mergeEnabled: false,
  mergeItems: {},
  mergeItemsLoading: false,
  mergeSave: { ...mergeSaveInitialState },
  mergeData: { ...mergeDataInitialState },
  stockrecordsForUpdate: 0,
  bomCheckout: null,
};

const saveBomLine = (state: any, action: any) => {
  return updateObject(state, {
    bomLines: updateObject(state.bomLines, {
      [action.payload.bomId]: action.payload.lines,
    }),
  });
};

const saveCashModal = (state: any, action: SaveCashModalProducts) => {
  const { key, products, rfqData, isFailRequest } = action.payload;
  return updateObject(state, {
    cashModalItems: {
      ...state.cashModalItems,
      [key]: {
        products,
        createdTime: isFailRequest ? 0 : new Date().getTime(),
        loaded: true,
        rfqData,
      },
    },
  });
};

const startBomLineSearch = (state: any) => {
  return updateObject(state, {
    cashModalItemsLoading: true,
  });
};

const stopBomLineSearch = (state: any) => {
  return updateObject(state, {
    cashModalItemsLoading: false,
  });
};

const saveBomLineStockrecords = (state: any, action: any) => {
  return updateObject(state, {
    bomItem: updateObject(state.bomItem, {
      stockrecords: updateObject(state.bomItem.stockrecords, {
        [action.payload.key]: {
          ...state.bomItem.stockrecords[action.payload.key],
          items: action.payload.items,
        },
      }),
    }),
  });
};

const startBomLineStockrecordsLoading = (state: any, action: any) => {
  return updateObject(state, {
    bomItem: updateObject(state.bomItem, {
      stockrecords: updateObject(state.bomItem.stockrecords, {
        [action.payload.key]: {
          ...state.bomItem.stockrecords[action.payload.key],
          stockrecordsLoading: true,
          stockrecordsUpdated: false,
        },
      }),
    }),
  });
};

const finishBomLineStockrecordsLoading = (state: any, action: any) => {
  return updateObject(state, {
    bomItem: updateObject(state.bomItem, {
      stockrecords: updateObject(state.bomItem.stockrecords, {
        [action.payload.key]: {
          ...state.bomItem.stockrecords[action.payload.key],
          stockrecordsLoading: false,
          stockrecordsUpdated: true,
        },
      }),
    }),
  });
};

const toggleMergeItem = (state: actionTypes.InitialState, action: any) => {
  const newItems = action.payload;
  const items = { ...state.mergeItems };
  newItems.forEach((i: any) => {
    items[i] = {
      checked: items[i] ? !items[i].checked : true,
      multiplier: items[i] ? items[i].multiplier : 1,
    };
  });

  return { ...state, mergeItems: items };
};

const setMergeItemMultiplier = (state: actionTypes.InitialState, action: any) => {
  const itemId = action.payload.id;
  const { multiplier } = action.payload;
  const items = { ...state.mergeItems };
  items[itemId] = { ...items[itemId], multiplier };

  return { ...state, mergeItems: items };
};

const setBomEditRowsForDelete = (state: actionTypes.InitialState, action: any) => {
  return {
    ...state,
    bomItem: {
      ...state.bomItem,
      rowsForDelete: uniqueFromTwoArrays(state.bomItem.rowsForDelete, action.payload),
    },
  };
};

export default function cart(state = initialState, action: actionTypes.BomActionsType) {
  switch (action.type) {
    case actionTypes.SET_UPLOAD_STATE:
      return updateObject(state, { upload: { ...action.payload } });

    case actionTypes.SAVE_BOM_LIST:
      return updateObject(state, {
        bomList: { ...state.bomList, ...action.payload },
      });

    case actionTypes.LOAD_BOM_LIST_START:
      return updateObject(state, { isBomListLoading: true });

    case actionTypes.LOAD_BOM_LIST_FINISH:
      return updateObject(state, { isBomListLoading: false });

    case actionTypes.CREATE_BOM_LINE_S: {
      if (!action.response.rowKey) return state;
      const { rowKey } = action.response;
      return {
        ...state,
        bomItem: !state.bomItem.items[rowKey]
          ? state.bomItem
          : {
              ...state.bomItem,
              items: {
                ...state.bomItem.items,
                [rowKey]: { ...state.bomItem.items[rowKey], ...action.response },
              },
            },
      };
    }

    case actionTypes.SAVE_BOM_LINES:
      return saveBomLine(state, action);

    case actionTypes.START_BOM_LINE_SEARCH:
      return startBomLineSearch(state);

    case actionTypes.STOP_BOM_LINE_SEARCH:
      return stopBomLineSearch(state);

    case actionTypes.CASH_MODAL_PRODUCTS:
      return saveCashModal(state, action);

    case actionTypes.CLEAR_CASH_MODAL_PRODUCTS:
      return { ...state, cashModalItems: {} };

    case actionTypes.SAVE_BOM_LINE_STOCKRECORDS:
      return saveBomLineStockrecords(state, action);

    case actionTypes.SET_BOM_LINE_STOCKRECORDS_COUNT:
      return updateObject(state, { stockrecordsForUpdate: action.payload });

    case actionTypes.START_BOM_LINE_STOCKRECORDS_LOADING:
      return startBomLineStockrecordsLoading(state, action);

    case actionTypes.FINISH_BOM_LINE_STOCKRECORDS_LOADING:
      return finishBomLineStockrecordsLoading(state, action);

    case actionTypes.SAVE_BOM_CREATE:
      return updateObject(state, { bomItem: action.payload });

    case actionTypes.SAVE_BOM_EDIT:
      return updateObject(state, { bomItem: action.payload });

    case actionTypes.UPDATE_BOM_LINE_S: {
      if (!action.response.rowKey) return state;
      const { rowKey } = action.response;
      if (!state.bomItem.items[rowKey]) return state;
      const responseLine = { ...action.response };

      return {
        ...state,
        bomItem: {
          ...state.bomItem,
          items: {
            ...state.bomItem.items,
            [rowKey]: { ...state.bomItem.items[rowKey], ...responseLine },
          },
        },
      };
    }

    case actionTypes.CREATE_NEW_BOM:
      return updateObject(state, { bomItem: { ...bomInitialState } });

    case actionTypes.CLEAR_BOM_EDIT:
      return updateObject(state, { bomItem: { ...bomInitialState } });

    case actionTypes.SAVE_ATTRIBUTES_LIST:
      return updateObject(state, { attributes: action.payload });

    case actionTypes.BOM_COPYING_START:
      return {
        ...state,
        copy: { ...state.copy, copying: true, error: false, copyId: null },
      };
    case actionTypes.BOM_COPYING_FINISH:
      return {
        ...state,
        copy: {
          ...state.copy,
          copying: false,
          error: false,
          copyId: action.payload,
        },
      };
    case actionTypes.BOM_COPYING_ERROR:
      return {
        ...state,
        copy: { ...state.copy, copying: false, error: true, copyId: null },
      };
    case actionTypes.BOM_COPY_RESET:
      return {
        ...state,
        copy: { ...state.copy, copying: false, error: false, copyId: null },
      };

    case actionTypes.ENABLE_BOM_MERGE:
      return { ...state, mergeEnabled: true };
    case actionTypes.DISABLE_BOM_MERGE:
      return {
        ...state,
        mergeEnabled: false,
        mergeData: { ...mergeDataInitialState },
        mergeItems: {},
        mergeSave: { ...mergeSaveInitialState },
      };
    case actionTypes.TOGGLE_MERGE_BOM:
      return toggleMergeItem(state, action);
    case actionTypes.SET_MERGE_BOM_MULTIPLIER:
      return setMergeItemMultiplier(state, action);
    case actionTypes.START_LOADING_MERGE_ITEMS:
      return { ...state, mergeItemsLoading: true };
    case actionTypes.FINISH_LOADING_MERGE_ITEMS:
      return { ...state, mergeItemsLoading: false };
    case actionTypes.SAVE_MERGE_DATA:
      return { ...state, mergeData: action.payload };
    case actionTypes.SAVE_MERGE_BOM_SAVING_DATA:
      return { ...state, mergeSave: { ...state.mergeSave, ...action.payload } };
    case actionTypes.DELETE_BOM_S: {
      return { ...state, bomItem: { ...bomInitialState } };
    }
    case actionTypes.SAVE_ALL_BOM_PAGES: {
      return { ...state, bomItem: { ...state.bomItem, items: { ...state.bomItem.items, ...action.payload } } };
    }
    case actionTypes.SET_EDIT_ROWS_FOR_DELETE:
      return setBomEditRowsForDelete(state, action);
    case actionTypes.SET_CHECKOUT_BOM:
      return { ...state, bomCheckout: action.payload };
    case actionTypes.UPDATE_ITEM_DATA_AFTER_CREATE: {
      // Need update item id after create on backend
      const { itemKey, data } = action.payload;
      return {
        ...state,
        bomItem: {
          ...state.bomItem,
          items: {
            ...state.bomItem.items,
            [itemKey]: {
              ...state.bomItem.items[itemKey],
              ...data,
            },
          },
        },
      };
    }

    case actionTypes.MARK_BOM_AS_INVALID: {
      return { ...state, bomItem: { ...initialState, valid: !action.payload } };
    }

    default:
      return state;
  }
}
