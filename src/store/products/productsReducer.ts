import * as actionTypes from "./productTypes";

const initialState: actionTypes.ProductsState = {
  stockList: null,
  sellersWithProductLink: null,
  products: [],
  productViewData: null,
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
    case actionTypes.LOAD_SELLERS_WITH_PRODUCT_LINK_S:
      return { ...state, sellersWithProductLink: action.response };
    case actionTypes.LOAD_SELLERS_WITH_PRODUCT_LINK_F:
      return { ...state, sellersWithProductLink: [] };
    default:
      return state;
  }
}
