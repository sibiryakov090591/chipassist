export default function setUrl(navigate, path, page, pageSize, otherParams) {
  const params = [];

  if (page) {
    params.push(`page=${page}`);
  }

  if (pageSize) {
    params.push(`page_size=${pageSize}`);
  }

  if (otherParams) {
    // eslint-disable-next-line array-callback-return
    Object.keys(otherParams).map((param) => {
      params.push(`${param}=${otherParams[param]}`);
    });
  }

  navigate({
    pathname: path,
    search: params.length ? `?${params.join("&")}` : "",
  });
}

export const setUrlWithFilters = (
  pathname,
  navigate,
  query,
  page,
  pageSize,
  orderBy,
  filtersValues = null,
  baseFilters = null,
  otherParams = null,
) => {
  let params = `?query=${encodeURIComponent(query)}&page=${encodeURIComponent(page)}&page_size=${encodeURIComponent(
    pageSize,
  )}&order_by=${orderBy}`;

  if (otherParams) {
    Object.entries(otherParams).forEach((v) => {
      if (typeof v[1] === "boolean" || v[1]) params += `&${v[0]}=${v[1]}`;
    });
  }

  if (filtersValues) {
    const localfiltersValues = { ...filtersValues };
    if (pathname !== "/search") delete localfiltersValues.search;
    const localfiltersValuesString = encodeURIComponent(JSON.stringify(localfiltersValues));
    params += `&filters_values=${localfiltersValuesString}`;
  }

  if (baseFilters) {
    const withoutEmptyValues = {};
    Object.entries(baseFilters).forEach((filter) => {
      const [key, val] = filter;
      if (val) {
        withoutEmptyValues[key] = val;
      }
    });
    if (Object.keys(withoutEmptyValues).length) {
      const baseFiltersString = encodeURIComponent(JSON.stringify(withoutEmptyValues));
      params += `&base_filters=${baseFiltersString}`;
    }
  }
  navigate({
    pathname,
    search: params,
  });
};
