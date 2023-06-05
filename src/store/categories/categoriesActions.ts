import { push } from "react-router-redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import { Dispatch } from "redux";
import { RootState } from "@src/store";
import { saveTreeMenu } from "@src/store/treeMenu/treeMenuActions";
import { removeHost, removeLocalHost } from "@src/utils/transformUrl";
import * as actionTypes from "./categoriesTypes";
import { CatalogCategory } from "./categoriesTypes";

const getCategoriesDepth = (depth: number): any => {
  return {
    types: [actionTypes.GET_CATALOG_R, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`categories/?dictionary=true&depth=${depth}`)
        // .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

export const getCatalogProducts = (id: number | string, page = 1): any => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`categories/${id}/dictionaryproducts/?page=${page || 1}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

const getCategoriesDepthNext = (nextLink: string): any => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(removeHost(nextLink))
        // .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

const getTopCategories = (): any => {
  return {
    types: [actionTypes.GET_CATEGORIES_R, actionTypes.GET_CATEGORIES_S, actionTypes.GET_CATEGORIES_F],
    promise: (client: ApiClientInterface) =>
      client
        .get("categories/")
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

const getTopCategoriesNext = (nextLink: string): any => {
  return {
    types: [actionTypes.GET_CATEGORIES_R, actionTypes.GET_CATEGORIES_S, actionTypes.GET_CATEGORIES_F],
    promise: (client: ApiClientInterface) =>
      client
        .get(removeLocalHost(nextLink))
        .then((res) => res.data)
        .catch((e) => {
          console.log("***GET_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

const updateCategories = (data: actionTypes.UpdateCategories[]): actionTypes.UpdateCategoriesAction => {
  return {
    type: actionTypes.UPDATE_CATEGORIES,
    payload: data,
  };
};

export const updateCategoriesFromSrc = (
  categories: actionTypes.UpdateCategoriesFromSrc,
  categoriesMap: number[],
): actionTypes.UpdateCategoriesFromSrcAction => {
  return {
    type: actionTypes.UPDATE_CATEGORIES_FROM_SRC,
    payload: {
      categories,
      categoriesMap,
    },
  };
};

export const prepareTopCategories = (data: actionTypes.UpdateCategories): actionTypes.PrepareTopCategoriesAction => {
  return {
    type: actionTypes.PREPARE_TOP_CATEGORIES,
    payload: data,
  };
};

const setLoadedTopCategories = (): actionTypes.SetLoadedTopCategoriesAction => {
  return {
    type: actionTypes.SET_LOADED_TOP_CATEGORIES,
  };
};

const saveCategoriesDepth = (depth: number, data: CatalogCategory[]): actionTypes.GetCategoriesAction => {
  return {
    type: actionTypes.SAVE_CATEGORIES_DEPTH,
    payload: {
      depth,
      data,
    },
  };
};

const getNextCategoriesCatalogThunk = (depth: number, nextLink: string): any => {
  return async (dispatch: Dispatch<any>) => {
    const response = await dispatch(getCategoriesDepthNext(removeHost(nextLink)));
    if (response.status < 400) {
      dispatch(saveCategoriesDepth(depth, response.data.results));
    }
    if (response.data.links.next) {
      dispatch(getNextCategoriesCatalogThunk(depth, response.data.links.next));
    }
    return response?.data;
  };
};

const getNextCategoriesThunk = (nextLink: string): any => {
  return (dispatch: Dispatch<any>) => {
    dispatch(getTopCategoriesNext(removeLocalHost(nextLink))).then((response: any) => {
      dispatch(updateCategories(response.results));
      dispatch(prepareTopCategories(response.results));

      if (response.next) {
        dispatch(getNextCategoriesThunk(response.next));
      } else {
        dispatch(setLoadedTopCategories());
      }
    });
  };
};

/* eslint-disable no-await-in-loop */
export const getCatalogCategoriesThunk = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    if (!getState().categories.loadedTopCategories) {
      // Load all categories
      for (let depth = 1; depth < 5; depth += 1) {
        const res = await dispatch(getCategoriesDepth(depth));
        if (res.status < 400) {
          dispatch(saveCategoriesDepth(depth, res.data.results));
        }
        if (res.data.links.next) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const nextRes = await dispatch(getNextCategoriesCatalogThunk(depth, res.data.links.next));
        }
      }
      dispatch(setLoadedCatalog());
    }
  };
};
/* eslint-enable no-await-in-loop */

export const getCategoriesThunk = (): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    if (!getState().categories.loadedTopCategories) {
      dispatch(getTopCategories()).then((response: any) => {
        dispatch(updateCategories(response.results));
        dispatch(prepareTopCategories(response.results));

        if (response.next) {
          dispatch(getNextCategoriesThunk(response.next));
        }
      });
    }
  };
};

const loadCategories = (): any => {
  return {
    types: actionTypes.LOAD_CATEGORIES_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get("categories-json/")
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

const setLoadedCategories = (): actionTypes.SetLoadedCategoriesAction => {
  return {
    type: actionTypes.SET_LOADED_CATEGORIES,
  };
};

const setLoadedCatalog = (): actionTypes.SetLoadedCatalogAction => {
  return {
    type: actionTypes.SET_NORMALIZE_CATALOG_DATA,
  };
};

export const loadCategoriesThunk = (): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const loaded = getState().categories.loadedCategories;
    if (!loaded) {
      dispatch(loadCategories()).then((response: actionTypes.LoadCategoriesResponse) => {
        const categories = response.cat_store;
        const categoriesMap = response.cat_map;

        dispatch(updateCategoriesFromSrc(categories, categoriesMap));

        const categoriesById = categories;
        function get_node_children(nodeElement: any): any {
          const new_node_children = [];
          for (const [key, value] of Object.entries(categoriesById)) {
            if (categoriesById[key].parentId === nodeElement.id) {
              const node = categoriesById[key].name;
              const node_children = get_node_children(categoriesById[key]);

              if (node_children.length === 0) {
                new_node_children.push({ ...value, name: node });
              } else {
                new_node_children.push({
                  ...value,
                  name: node,
                  children: node_children,
                });
              }
            }
          }
          return new_node_children;
        }

        const treeMenu = [];

        for (const [, value] of Object.entries(categoriesById)) {
          if (value.parentId === -1) {
            const node = value.name;
            const node_children = get_node_children(value);
            if (node_children.length === 0) {
              treeMenu.push({ ...value, name: node });
            } else {
              treeMenu.push({ ...value, name: node, children: node_children });
            }
          }
        }

        dispatch(saveTreeMenu(treeMenu));
        dispatch(setLoadedCategories());
      });
    }
  };
};

export const categoriesClickThunk = (categoriesId: number): any => {
  return (dispatch: Dispatch<any>) => {
    dispatch(push(`/categories/${categoriesId}`));
    dispatch(loadCategoryAttributesThunk(categoriesId));
  };
};

const loadCategoryAttributes = (categoriesId: number): any => {
  return {
    types: actionTypes.LOAD_CATEGORIES_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`categories/${categoriesId}/`)
        .then((res) => res.data)
        .catch((e) => {
          console.log("***LOAD_CATEGORIES_ERROR", e);
          throw e;
        }),
  };
};

export const loadCategoryAttributesThunk = (categoriesId: number): any => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadCategoryAttributes(categoriesId)).then((response: actionTypes.LoadCategoryAttributes) => {
      const attributes =
        response.attributes && response.attributes.results && response.attributes.results.length
          ? response.attributes.results
          : [];
      dispatch(saveCategoryAttributes(attributes));
    });
  };
};

export const saveCategoryAttributes = (
  attributes: actionTypes.UpdateCategoriesResults[],
): actionTypes.SaveCategoryAttributesAction => {
  return {
    type: actionTypes.SAVE_CATEGORY_ATTRIBUTES,
    payload: attributes,
  };
};
