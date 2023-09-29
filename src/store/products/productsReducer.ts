import * as actionTypes from "./productTypes";

const initialState: actionTypes.ProductsState = {
  stockList: null,
  products: [],
  productViewData: null,
  requestHint: {
    intoViewportProductId: null,
    isShow: false,
  },
  rfqData: {
    results: [],
    count: 0,
    page: 1,
    total_pages: 1,
  },
};

export default function products(state = initialState, action: actionTypes.ProductsActionsType) {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCT_BY_ID_S:
      return { ...state, productViewData: action.response };
    case actionTypes.SAVE_PRODUCTS:
      return { ...state, products: action.payload };
    case actionTypes.CLEAR_PRODUCTS:
      return { ...state, products: [] };
    case actionTypes.SAVE_RFQS:
      return { ...state, rfqData: action.payload };
    case actionTypes.CLEAR_RFQS:
      return {
        ...state,
        rfqData: {
          results: [],
          count: 0,
          page: 1,
          total_pages: 1,
        },
      };
    case actionTypes.LOAD_STOCK_LIST_S:
      return { ...state, stockList: action.response };
    case actionTypes.SET_PRODUCT_INTO_VIEWPORT:
      return {
        ...state,
        requestHint: {
          ...state.requestHint,
          intoViewportProductId: action.payload,
        },
      };
    case actionTypes.DISABLE_PRODUCT_REQUEST_HINT:
      return {
        ...state,
        requestHint: {
          ...state.requestHint,
          isShow: false,
        },
      };
    case actionTypes.SHOW_PRODUCT_REQUEST_HINT:
      return {
        ...state,
        requestHint: {
          ...state.requestHint,
          isShow: true,
        },
      };
    default:
      return state;
  }
}
