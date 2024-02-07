import * as actionTypes from "./catalogTypes";
import { updateObject } from "../../utils/utility";

const initialState: actionTypes.CatalogState = {
  depth_1: [],
  depth_2: [],
  depth_3: [],
  depth_4: [],
  loaded: false,
  loading: false,
  normalizeData: [],
};

const saveCategories = (depth: number, data: actionTypes.CatalogCategory[], state: actionTypes.CatalogState) => {
  const name = `depth_${depth}`;

  return updateObject(state, {
    ...state,
    [name]: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      ...state[name],
      ...data,
    ],
  });
};

const createCategoryUrlName = (name: string, parentUrl = "", slugOnly = false) => {
  const normalizeUrl = name
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[\W_]{1,}/g, "-")
    .replace(/^-|-$/g, "");
  return parentUrl && !slugOnly ? `${parentUrl}/${normalizeUrl}` : normalizeUrl;
};

const normalizeCategoryName = (name: string) => {
  return name.replace(/&amp;/g, "&");
};

const createNormalizeChild = (item: any, parent: any, depth: number, state: actionTypes.CatalogState) => {
  const normalizeItem: any = { ...item };
  normalizeItem.breadcrumbs = [
    ...parent.breadcrumbs,
    { id: parent.id, name: parent.name, depth, url: parent.url, slug: createCategoryUrlName(parent.name, null, true) },
  ];
  normalizeItem.name = normalizeCategoryName(item.name);
  normalizeItem.slug = createCategoryUrlName(item.name, null, true);
  normalizeItem.url = createCategoryUrlName(item.name, parent.url);
  if (normalizeItem.has_children) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const category = state[`depth_${depth + 1}`]?.find((i: any) => i.id === item.id && i.children.length);
    const normalizeCategory = category ? { ...category } : { ...item };
    normalizeCategory.breadcrumbs = [...normalizeItem.breadcrumbs];
    normalizeCategory.name = normalizeCategoryName(normalizeCategory.name);
    normalizeCategory.slug = createCategoryUrlName(normalizeCategory.name, null, true);
    normalizeCategory.url = createCategoryUrlName(normalizeCategory.name, parent.url);
    normalizeItem.children =
      category && !!category.children.length
        ? category.children.map((child: any) => createNormalizeChild(child, normalizeCategory, depth + 1, state))
        : [];
  } else {
    normalizeItem.children = [];
  }
  return normalizeItem;
};

const setNormalizeCatalogData = (state: actionTypes.CatalogState) => {
  const data: any = [];
  state.depth_1.forEach((item: any) => {
    const normalizeItem = { ...item };
    normalizeItem.breadcrumbs = [];
    normalizeItem.name = normalizeCategoryName(item.name);
    normalizeItem.url = createCategoryUrlName(item.name);
    normalizeItem.slug = createCategoryUrlName(item.name, null, true);

    if (item.children.length) {
      normalizeItem.children = item.children.map((child: any) => {
        return createNormalizeChild(child, normalizeItem, 1, state);
      });
    }
    data.push(normalizeItem);
  });

  return updateObject(state, {
    ...state,
    loaded: true,
    loading: false,
    normalizeData: data,
  });
};

const catalog = (state = initialState, action: actionTypes.CatalogActionTypes) => {
  switch (action.type) {
    case actionTypes.SAVE_CATALOG_DEPTH:
      return saveCategories(action.payload.depth, action.payload.data, state);
    case actionTypes.SET_NORMALIZE_CATALOG_DATA:
      return setNormalizeCatalogData(state);
    case actionTypes.GET_CATALOG_R:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default catalog;
