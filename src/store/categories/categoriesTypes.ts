// Constants
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const PREPARE_TOP_CATEGORIES = "PREPARE_TOP_CATEGORIES";

export const SAVE_CATEGORIES_DEPTH = "SAVE_CATEGORIES_DEPTH";

export const GET_CATEGORIES_R = "GET_CATEGORIES_R";
export const GET_CATEGORIES_S = "GET_CATEGORIES_S";
export const GET_CATEGORIES_F = "GET_CATEGORIES_F";

export const SET_LOADED_TOP_CATEGORIES = "SET_LOADED_TOP_CATEGORIES";
export const GET_CATALOG_R = "@categories/GET_CATALOG_R";
export const SET_NORMALIZE_CATALOG_DATA = "SET_NORMALIZE_CATALOG_DATA";

export const SAVE_CHILDREN_CATEGORIES = "SAVE_CHILDREN_CATEGORIES";
export const UPDATE_CATEGORIES_FROM_SRC = "UPDATE_CATEGORIES_FROM_SRC";

export const LOAD_CATEGORIES_R = "LOAD_CATEGORIES_R";
export const LOAD_CATEGORIES_S = "LOAD_CATEGORIES_S";
export const LOAD_CATEGORIES_F = "LOAD_CATEGORIES_F";
export const LOAD_CATEGORIES_ARRAY = [LOAD_CATEGORIES_R, LOAD_CATEGORIES_S, LOAD_CATEGORIES_F];

export const SET_LOADED_CATEGORIES = "SET_LOADED_CATEGORIES";

export const SAVE_CATEGORY_ATTRIBUTES = "SAVE_CATEGORY_ATTRIBUTES";
export const ADD_SELECTED_ATTRIBUTE = "ADD_SELECTED_ATTRIBUTE";
export const REMOVE_SELECTED_ATTRIBUTE = "REMOVE_SELECTED_ATTRIBUTE";
export const CHANGE_FILTER_ATTRIBUTE_VALUE = "CHANGE_FILTER_ATTRIBUTE_VALUE";
export const REMOVE_FILTER_ATTRIBUTE_VALUE = "REMOVE_FILTER_ATTRIBUTE_VALUE";

// State
export interface UpdateCategoriesResults {
  code: string;
  id: number;
  name: string;
  option_group: any;
  type: string;
  url: string;
  values: string[];
}

interface Attributes {
  count: number;
  total_pages: number;
  page: number;
  results: UpdateCategoriesResults[];
}

export interface UpdateCategories {
  attributes: Attributes;
  breadcrumbs: string;
  description: string;
  id: number;
  image: string;
  name: string;
  parentId: number;
  slug: string;
  url: string;
}

interface Categories {
  ancestors_are_public: boolean;
  children: number[];
  children_url: string;
  depth: number;
  description: string;
  id: number;
  image: string | null;
  is_public: boolean;
  name: string;
  numchild: number;
  parentId: number;
  path: string;
  slug: string;
}

export interface UpdateCategoriesFromSrc {
  [key: string]: Categories;
}

export interface LoadCategoriesResponse {
  cat_map: number[];
  cat_store: {
    [key: string]: Categories;
  };
}

export interface LoadCategoryAttributes {
  attributes: Attributes;
  breadcrumbs: string;
  description: string;
  id: number;
  image: string | null;
  name: string;
  slug: string;
  url: string;
}

interface Categories {
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
  children: number[];
  children_url: string;
}

interface TopCategories {
  value: string | number;
  label: string;
}

interface CategoryAttributes {
  id: number;
  url: string;
  name: string;
  code: string;
  type: string;
  option_group: {
    url: string;
    options: any[];
    name: string;
  };
  values: string[];
}

export interface CategoriesState {
  categoriesMap: number[];
  categories: {
    [key: string]: Categories;
  };
  catalog: {
    depth_1: CatalogCategory[];
    depth_2: CatalogCategory[];
    depth_3: CatalogCategory[];
    depth_4: CatalogCategory[];
    loaded: boolean;
    loading: boolean;
    normalizeData: any;
  };
  topCategories: TopCategories[];
  loadedTopCategories: boolean;
  loadedCategories: boolean;
  categoryAttributes: CategoryAttributes[];
  selectedAttributes: any[];
  selectedAttributesValues: any;
  filterAttributesValues: any;
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

// Actions
export interface GetCategoriesAction {
  type: typeof SAVE_CATEGORIES_DEPTH;
  payload: {
    depth: number;
    data: CatalogCategory[];
  };
}

export interface UpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: UpdateCategories[];
}

export interface UpdateCategoriesFromSrcAction {
  type: typeof UPDATE_CATEGORIES_FROM_SRC;
  payload: {
    categories: UpdateCategoriesFromSrc;
    categoriesMap: number[];
  };
}

export interface PrepareTopCategoriesAction {
  type: typeof PREPARE_TOP_CATEGORIES;
  payload: UpdateCategories;
}

export interface SetLoadedTopCategoriesAction {
  type: typeof SET_LOADED_TOP_CATEGORIES;
}

export interface SaveCategoryAttributesAction {
  type: typeof SAVE_CATEGORY_ATTRIBUTES;
  payload: UpdateCategoriesResults[];
}

export interface SetLoadedCategoriesAction {
  type: typeof SET_LOADED_CATEGORIES;
}

export interface SetLoadedCatalogAction {
  type: typeof SET_NORMALIZE_CATALOG_DATA;
}

export interface GetCatalogAction {
  type: typeof GET_CATALOG_R;
}

export type CategoriesActionTypes =
  | GetCatalogAction
  | SetLoadedCatalogAction
  | GetCategoriesAction
  | SetLoadedCategoriesAction
  | SaveCategoryAttributesAction
  | SetLoadedTopCategoriesAction
  | PrepareTopCategoriesAction
  | UpdateCategoriesFromSrcAction
  | UpdateCategoriesAction;
