import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import { RootState } from "@src/store";
import constants from "@src/constants/constants";
import { ID_CHIPASSIST } from "@src/constants/server_constants";
import * as actionTypes from "./blogTypes";

const BLOG_URL = `https://${constants.id === ID_CHIPASSIST ? "blog.chipassist.com" : "blog.camaster.site"}`;

export const getBlogList = (page = 1, filters: { [key: string]: any } = {}, join = false) => {
  let params = `?page=${page}&page_size=25`;
  Object.entries(filters).forEach((v) => {
    if (v[1] || typeof v[1] === "boolean")
      params += `&${v[0]}=${v[0] === "search" ? encodeURIComponent(v[1].trim()) : v[1]}`;
  });
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: join ? [false, actionTypes.LOAD_MORE_BLOG_LIST_S, false] : actionTypes.LOAD_BLOG_LIST_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`${BLOG_URL}/api/blogs/${params}`, { noapi: true })
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_BLOG_LIST_ERROR", e);
            throw e;
          }),
    });
  };
};

export const getArticle = (slug: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { search } = getState().blog.filters;
    const params = search ? `?search=${encodeURIComponent(search.trim())}` : "";
    return dispatch({
      types: actionTypes.LOAD_ARTICLE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`${BLOG_URL}/api/blogs/${slug}/${params}`)
          .then((res) => {
            return res.data.results;
          })
          .catch((e) => {
            console.log("***LOAD_ARTICLE_ERROR", e);
            throw e;
          }),
    });
  };
};

export const onChangeFiltersValues = (filters: any) => ({
  type: actionTypes.ON_CHANGE_FILTERS_VALUES,
  payload: filters,
});
