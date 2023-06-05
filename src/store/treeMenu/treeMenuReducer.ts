import * as actionTypes from "./treeMenuTypes";

const initialState: actionTypes.TreeMenuState = {
  treeMenu: [],
  activeNode: null,
  search: null,
};

export default function treeMenuReducer(state = initialState, action: actionTypes.TreeMenuActions) {
  switch (action.type) {
    case actionTypes.CREATE_TREE_MENU:
      return { ...state, treeMenu: action.payload.treeMenu };
    default:
      return state;
  }
}
