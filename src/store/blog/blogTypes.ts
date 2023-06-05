export const LOAD_BLOG_LIST_R = "@blog/LOAD_BLOG_LIST_R";
export const LOAD_BLOG_LIST_S = "@blog/LOAD_BLOG_LIST_S";
export const LOAD_MORE_BLOG_LIST_S = "@blog/LOAD_MORE_BLOG_LIST_S";
export const LOAD_BLOG_LIST_F = "@blog/LOAD_BLOG_LIST_F";
export const LOAD_BLOG_LIST_ARRAY = [LOAD_BLOG_LIST_R, LOAD_BLOG_LIST_S, LOAD_BLOG_LIST_F];

export const LOAD_ARTICLE_R = "@blog/LOAD_ARTICLE_R";
export const LOAD_ARTICLE_S = "@blog/LOAD_ARTICLE_S";
export const LOAD_ARTICLE_F = "@blog/LOAD_ARTICLE_F";
export const LOAD_ARTICLE_ARRAY = [LOAD_ARTICLE_R, LOAD_ARTICLE_S, LOAD_ARTICLE_F];

export const ON_CHANGE_FILTERS_VALUES = "@blog/ON_CHANGE_FILTERS_VALUES";

export interface BlogState {
  isLoading: boolean;
  filters: {
    search: string;
  };
  list: {
    page: number;
    total_pages: number;
    results: Article[];
  };
  selected: SelectedArticle;
}

export interface Article {
  id: number;
  date: string;
  intro: string;
  body: JSX.Element;
}

export interface SelectedArticle extends Article {
  next: number;
  previous: number;
}

interface LoadBlogListRequestAction {
  type: typeof LOAD_BLOG_LIST_R;
}
interface LoadBlogListSuccessAction {
  type: typeof LOAD_BLOG_LIST_S;
  response: any;
}
interface LoadMoreBlogListSuccessAction {
  type: typeof LOAD_MORE_BLOG_LIST_S;
  response: any;
}
interface LoadBlogListFailAction {
  type: typeof LOAD_BLOG_LIST_F;
  error: any;
}

interface LoadArticleRequestAction {
  type: typeof LOAD_ARTICLE_R;
}
interface LoadArticleSuccessAction {
  type: typeof LOAD_ARTICLE_S;
  response: any;
}
interface LoadArticleFailAction {
  type: typeof LOAD_ARTICLE_F;
  error: any;
}

interface OnChangeFiltersValuesAction {
  type: typeof ON_CHANGE_FILTERS_VALUES;
  payload: any;
}

export type ChatActionTypes =
  | OnChangeFiltersValuesAction
  | LoadArticleRequestAction
  | LoadArticleSuccessAction
  | LoadArticleFailAction
  | LoadBlogListRequestAction
  | LoadBlogListSuccessAction
  | LoadMoreBlogListSuccessAction
  | LoadBlogListFailAction;
