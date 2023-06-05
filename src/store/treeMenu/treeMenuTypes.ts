export const CREATE_TREE_MENU = "CREATE_TREE_MENU";

// State
export interface TreeMenuState {
  treeMenu: SaveTreeMenu[];
  activeNode: any;
  search: any;
}

export interface SaveTreeMenu {
  id: number;
  path: string;
  depth: number;
  numchild: number;
  name: string;
  description: string;
  image: string | null;
  slug: string;
  is_public: boolean;
  ancestors_are_public: boolean;
  parentId: number;
  children: any;
  children_url: string;
}

// Actions
export interface SaveTreeMenuAction {
  type: typeof CREATE_TREE_MENU;
  payload: { treeMenu: SaveTreeMenu[] };
}

export type TreeMenuActions = SaveTreeMenuAction;
