import * as actionTypes from "./categoriesTypes";
import { normalizeData, uniqueFromTwoArrays, updateObject } from "../../utils/utility";
import { UpdateCategories, CategoriesState, CatalogCategory } from "./categoriesTypes";

const initialState: CategoriesState = {
  categoriesMap: [],
  categories: {},
  catalog: {
    depth_1: [],
    depth_2: [],
    depth_3: [],
    depth_4: [],
    loaded: false,
    loading: false,
    normalizeData: [],
  },
  topCategories: [{ value: "all", label: "All" }],
  loadedTopCategories: false,
  loadedCategories: false,
  categoryAttributes: [],
  selectedAttributes: [],
  selectedAttributesValues: {},
  filterAttributesValues: {},
};

// const normalizeDataWithParent = (data: UpdateCategories[], parentId: number) => {
//   const o: any = {};
//   const m: any = [];
//   for (let c = 0; c < data.length; c += 1) {
//     const val = data[c];
//     m.push(val.id);
//     o[val.id] = updateObject(val, {
//       parentId,
//     });
//   }
//   return { o, m };
// };

const saveCategories = (depth: number, data: CatalogCategory[], state: CategoriesState) => {
  const name = `depth_${depth}`;

  return updateObject(state, {
    catalog: {
      ...state.catalog,
      [name]: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ...state.catalog[name],
        ...data,
      ],
    },
  });
};

const updateCategories = (data: UpdateCategories[], state: CategoriesState) => {
  const { o, m } = normalizeData(data);
  return updateObject(state, {
    categories: updateObject(state.categories, o),
    categoriesMap: uniqueFromTwoArrays(state.categoriesMap, m),
  });
};

const prepareTopCategoriesData = (data: any, state: CategoriesState) => {
  const stateOptions = state.topCategories.slice();
  for (let c = 0; c < data.length; c += 1) {
    const category = data[c];

    stateOptions.push({
      value: category.id,
      label: category.name,
    });
  }
  return updateObject(state, {
    topCategories: stateOptions,
  });
};

const setLoadedTopCats = (state: CategoriesState) => {
  return updateObject(state, {
    loadedTopCategories: true,
  });
};

const createCategoryUrlName = (name: string, parentUrl = "") => {
  const normalizeUrl = name
    .toLowerCase()
    .replace(/&amp;/g, "")
    .replace(/[\W_]{1,}/g, "-")
    .replace(/^-|-$/g, "");
  return parentUrl ? `${parentUrl}/${normalizeUrl}` : normalizeUrl;
};

const normalizeCategoryName = (name: string) => {
  return name.replace(/&amp;/g, "&");
};

const createNormalizeChild = (item: any, parent: any, depth: number, state: CategoriesState) => {
  const normalizeItem: any = { ...item };
  normalizeItem.breadcrumbs = [...parent.breadcrumbs, { id: parent.id, name: parent.name, depth, url: parent.url }];
  normalizeItem.name = normalizeCategoryName(item.name);
  normalizeItem.url = createCategoryUrlName(item.name, parent.url);
  if (normalizeItem.has_children) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const category = state.catalog[`depth_${depth + 1}`]?.find((i: any) => i.id === item.id && i.children.length);
    const normalizeCategory = category ? { ...category } : { ...item };
    normalizeCategory.breadcrumbs = [...normalizeItem.breadcrumbs];
    normalizeCategory.name = normalizeCategoryName(normalizeCategory.name);
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

const setNormalizeCatalogData = (state: CategoriesState) => {
  const data: any = [];
  state.catalog.depth_1.forEach((item: any) => {
    const normalizeItem = { ...item };
    normalizeItem.breadcrumbs = [];
    normalizeItem.name = normalizeCategoryName(item.name);
    normalizeItem.url = createCategoryUrlName(item.name);

    if (item.children.length) {
      normalizeItem.children = item.children.map((child: any) => {
        return createNormalizeChild(child, normalizeItem, 1, state);
      });
    }
    data.push(normalizeItem);
  });

  return updateObject(state, {
    catalog: {
      ...state.catalog,
      loaded: true,
      loading: false,
      normalizeData: data,
    },
  });
};

// const saveChildrenCategories = (payload: any, state: CategoriesState) => {
//   const { o, m } = normalizeDataWithParent(payload.data, payload.parentId);
//
//   const newParentObject = updateObject(state.categories[payload.parentId], {
//     childrenIds: state.categories[payload.parentId].childrenIds
//       ? uniqueFromTwoArrays(state.categories[payload.parentId].childrenIds, m)
//       : m,
//   });
//
//   const newCategories = updateObject(state.categories, {
//     [payload.parentId]: newParentObject,
//   });
//
//   return updateObject(state, {
//     categories: updateObject(newCategories, o),
//     categoriesMap: uniqueFromTwoArrays(state.categoriesMap, m),
//   });
// };

const updateCategoriesFromSrc = (
  data: { categories: actionTypes.UpdateCategoriesFromSrc; categoriesMap: number[] },
  state: CategoriesState,
) => {
  return updateObject(state, {
    categories: updateObject(state.categories, data.categories),
    categoriesMap: uniqueFromTwoArrays(state.categoriesMap, data.categoriesMap),
  });
};

const setLoadedCategories = (state: CategoriesState) => {
  return updateObject(state, { loadedCategories: true });
};

// const removeSelectedAttribute = (state: CategoriesState, action: any) => {
//   const selectedAttributes = [...state.selectedAttributes];
//   selectedAttributes.splice(selectedAttributes.indexOf(action.payload), 1);
//   return {
//     ...state,
//     selectedAttributes,
//   };
// };

// const changeFilterAttributeValue = (state: CategoriesState, action: any) => {
//   return updateObject(state, {
//     filterAttributesValues: updateObject(state.filterAttributesValues, {
//       [action.code]: action.value,
//     }),
//   });
// };

// const removeFilterAttributedValue = (state: CategoriesState, action: any) => {
//   const newFilterValues = { ...state.filterAttributesValues };
//   delete newFilterValues[action.code];
//
//   return updateObject(state, {
//     filterAttributesValues: newFilterValues,
//   });
// };

const categories = (state = initialState, action: actionTypes.CategoriesActionTypes) => {
  switch (action.type) {
    case actionTypes.SAVE_CATEGORIES_DEPTH:
      return saveCategories(action.payload.depth, action.payload.data, state);
    case actionTypes.SET_NORMALIZE_CATALOG_DATA:
      return setNormalizeCatalogData(state);
    case actionTypes.GET_CATALOG_R:
      return { ...state, catalog: { ...state.catalog, loading: true } };
    case actionTypes.UPDATE_CATEGORIES:
      return updateCategories(action.payload, state);
    case actionTypes.PREPARE_TOP_CATEGORIES:
      return prepareTopCategoriesData(action.payload, state);
    case actionTypes.SET_LOADED_TOP_CATEGORIES:
      return setLoadedTopCats(state);
    // case actionTypes.SAVE_CHILDREN_CATEGORIES:
    //   return saveChildrenCategories(action.payload, state);
    case actionTypes.UPDATE_CATEGORIES_FROM_SRC:
      return updateCategoriesFromSrc(action.payload, state);
    case actionTypes.SET_LOADED_CATEGORIES:
      return setLoadedCategories(state);
    case actionTypes.SAVE_CATEGORY_ATTRIBUTES:
      return { ...state, categoryAttributes: action.payload };
    // case actionTypes.ADD_SELECTED_ATTRIBUTE:
    //   return {
    //     ...state,
    //     selectedAttributes: uniqueFromTwoArrays(state.selectedAttributes, [action.payload]),
    //   };
    // case actionTypes.REMOVE_SELECTED_ATTRIBUTE:
    //   return removeSelectedAttribute(state, action);
    // case actionTypes.CHANGE_FILTER_ATTRIBUTE_VALUE:
    //   return changeFilterAttributeValue(state, action);
    // case actionTypes.REMOVE_FILTER_ATTRIBUTE_VALUE:
    //   return removeFilterAttributedValue(state, action);
    default:
      return state;
  }
};

export default categories;
