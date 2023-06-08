import * as actionTypes from "./blogTypes";

const initialState: actionTypes.BlogState = {
  isLoading: true,
  filters: {
    search: "",
  },
  list: {
    page: null,
    total_pages: null,
    results: [],
  },
  selected: null,
};

const blogReducer = (state = initialState, action: actionTypes.ChatActionTypes) => {
  switch (action.type) {
    case actionTypes.ON_CHANGE_FILTERS_VALUES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }

    case actionTypes.LOAD_ARTICLE_R:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_ARTICLE_S: {
      return {
        ...state,
        isLoading: false,
        selected: action.response.results,
      };
    }
    case actionTypes.LOAD_ARTICLE_F:
      return {
        ...state,
        isLoading: false,
        selected: null,
      };

    case actionTypes.LOAD_BLOG_LIST_R:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_BLOG_LIST_S: {
      const { total_pages, current_page, results } = action.response;
      return {
        ...state,
        isLoading: false,
        list: {
          total_pages,
          page: current_page,
          results,
        },
      };
    }
    case actionTypes.LOAD_BLOG_LIST_F:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_MORE_BLOG_LIST_S: {
      const { total_pages, current_page, results } = action.response;
      return {
        ...state,
        list: {
          total_pages,
          page: current_page,
          results: [...state.list.results, ...results],
        },
      };
    }

    default:
      return state;
  }
};

export default blogReducer;
