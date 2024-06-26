import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import { useRestTransport } from "@src/services/useTransport";
// import { loadBomListThunk } from "@src/store/bom/bomActions";
import {
  loadSearchResultsActionThunk,
  saveExtendedSearch,
  setExtendedSearchFinished,
} from "@src/store/search/searchActions";
import { batch } from "react-redux";
import { useLocation } from "react-router-dom";
import constants from "@src/constants/constants";
import { useState } from "react";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import useExtendedSearch from "./useExtendedSearch";

const isICSearch = constants.id === ID_ICSEARCH;

const useSearchLoadResults = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  let query = useAppSelector((state) => state.search.query);
  query = useURLSearchParams("query", true, "", false);
  let page = useAppSelector((state) => state.search.page);
  page = useURLSearchParams("page", false, 1, false);
  let pageSize = useAppSelector((state) => state.search.pageSize);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);
  let smart_view = useAppSelector((state) => state.search.smart_view);
  smart_view = useURLSearchParams("smart_view", false, smart_view, false);
  let manufacturerId = useAppSelector((state) => state.search.manufacturer?.id);
  manufacturerId = parseInt(useURLSearchParams("m_id", false, manufacturerId, false));
  // const orderBy = useURLSearchParams(
  //   "order_by",
  //   false,
  //   localStorage.getItem("mainOrderBy") || orderByValues[0].value,
  //   false,
  // );
  const orderBy = orderByValues[0].value;
  let filtersValues = useURLSearchParams("filters_values", true, {}, true);
  filtersValues.base_num_in_stock = 1;
  if (!isICSearch) {
    filtersValues = null;
  }
  const reloadSearchFlag = useAppSelector((state) => state.search.reloadSearchFlag);
  const { shouldUpdateBackend } = useAppSelector((state) => state.common);

  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [searchTimeoutId, setSearchTimeoutId] = useState<any>(null);

  const commonParams = {
    page,
    page_size: pageSize,
    order_by: orderBy,
    search: query,
    ignore_count: true,
    smart_view,
    ...(!!manufacturerId && { m_id: manufacturerId }),
    ...filtersValues,
    href: encodeURIComponent(window.location.href),
    ...(isFirstRequest && !!document.referrer && { referrer: encodeURIComponent(document.referrer) }),
  };

  useExtendedSearch("query", saveExtendedSearch, setExtendedSearchFinished);

  useRestTransport(() => {
    batch(() => {
      if (searchTimeoutId) clearTimeout(searchTimeoutId);
      // dispatch(loadBomListThunk(1, true));
      dispatch(loadSearchResultsActionThunk(commonParams)).then((res: any) => {
        batch(() => {
          setIsFirstRequest(false);
          setSearchTimeoutId(null);
        });
        return res;
      });
    });
  }, [location.search, reloadSearchFlag, shouldUpdateBackend]);

  return true;
};

export default useSearchLoadResults;
