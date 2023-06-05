import * as actionTypes from "./treeMenuTypes";

export function saveTreeMenu(treeMenu: any) {
  return {
    type: actionTypes.CREATE_TREE_MENU,
    payload: { treeMenu },
  };
}

export default "TreeMenu";
