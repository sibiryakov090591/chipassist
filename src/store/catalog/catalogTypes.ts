export const SAVE_CATALOG_DEPTH = "@catalog/SAVE_CATALOG_DEPTH";
export const GET_CATALOG_R = "@catalog/GET_CATALOG_R";
export const SET_NORMALIZE_CATALOG_DATA = "@catalog/SET_NORMALIZE_CATALOG_DATA";

export interface CatalogState {
  depth_1: CatalogCategory[];
  depth_2: CatalogCategory[];
  depth_3: CatalogCategory[];
  depth_4: CatalogCategory[];
  loaded: boolean;
  loading: boolean;
  normalizeData: any;
}

export interface Child {
  id: number;
  name: string;
  is_public: boolean;
  has_children: boolean;
  path: string;
}

export interface CatalogCategory {
  id: number;
  name: string;
  children: Child[];
  slug: string;
  path: string;
}

export interface SaveCatalogAction {
  type: typeof SAVE_CATALOG_DEPTH;
  payload: {
    depth: number;
    data: CatalogCategory[];
  };
}

export interface SetLoadedCatalogAction {
  type: typeof SET_NORMALIZE_CATALOG_DATA;
}

export interface GetCatalogAction {
  type: typeof GET_CATALOG_R;
}

export type CatalogActionTypes = GetCatalogAction | SetLoadedCatalogAction | SaveCatalogAction;
