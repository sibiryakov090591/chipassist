import { History } from "history";
import { useLocation } from "react-router-dom";

export function setUrl(
  history: History,
  path: string,
  page: number,
  pageSize: number,
  otherParams?: { [index: string]: any },
) {
  const params = [];

  if (page) {
    params.push(`page=${page}`);
  }
  if (pageSize) {
    params.push(`page_size=${pageSize}`);
  }
  if (otherParams) {
    Object.keys(otherParams).forEach((param) => {
      if (otherParams[param]) params.push(`${param}=${otherParams[param]}`);
    });
  }
  history.push({
    pathname: path,
    search: params.length ? `?${params.join("&")}` : "",
  });
}

export const setUrlGetString = (filters: { [index: string]: string | number }): string => {
  return Object.entries(filters).reduce((acc, [key, val]) => {
    if (!val) return acc;
    if (!acc) return `?${key}=${val}`;
    return `${acc}&${key}=${val}`;
  }, "");
};
