import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import { useRestTransport, useWebsocketTransport } from "@src/services/useTransport";
import { loadBomListThunk } from "@src/store/bom/bomActions";
import {
  beforeSearchRequest,
  loadSearchResultsActionThunk,
  saveExtendedSearch,
  setExtendedSearchFinished,
  socketSearchResult,
  toggleReloadSearchFlag,
  setSearchFinished,
} from "@src/store/search/searchActions";
import { getAuthToken } from "@src/utils/auth";
import { batch } from "react-redux";
import { useLocation } from "react-router-dom";
import constants from "@src/constants/constants";
import { useState } from "react";
import useExtendedSearch from "./useExtendedSearch";

const useSearchLoadResults = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  let query = useAppSelector((state) => state.search.query);
  query = useURLSearchParams("query", true, "", false);
  let page = useAppSelector((state) => state.search.page);
  page = useURLSearchParams("page", false, page, false);
  let pageSize = useAppSelector((state) => state.search.pageSize);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);
  let smart_view = useAppSelector((state) => state.search.smart_view);
  smart_view = useURLSearchParams("smart_view", false, smart_view, false);
  // const orderBy = useURLSearchParams(
  //   "order_by",
  //   false,
  //   localStorage.getItem("mainOrderBy") || orderByValues[0].value,
  //   false,
  // );
  const orderBy = orderByValues[0].value;
  let filtersValues = useURLSearchParams("filters_values", true, {}, true);
  let baseFilters = useURLSearchParams("base_filters", true, null, true);
  filtersValues.base_num_in_stock = localStorage.getItem("productStock") === "true" ? 1 : "";
  if (constants.isNewSearchPage) {
    filtersValues = null;
    baseFilters = null;
  }
  const reloadSearchFlag = useAppSelector((state) => state.search.reloadSearchFlag);
  const { shouldUpdateBackend, href } = useAppSelector((state) => state.common);

  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [searchTimeoutId, setSearchTimeoutId] = useState<any>(null);
  const [startReloadingTime, setStartReloadingTime] = useState<number>(null);

  useExtendedSearch("query", saveExtendedSearch, setExtendedSearchFinished, {
    page,
    page_size: pageSize,
    order_by: orderBy,
    search: query,
    ignore_count: true,
    smart_view,
    ...baseFilters,
    ...filtersValues,
  });

  useRestTransport(() => {
    batch(() => {
      if (searchTimeoutId) clearTimeout(searchTimeoutId);
      dispatch(loadBomListThunk(1, true));
      dispatch(
        loadSearchResultsActionThunk(query, page, pageSize, orderBy, filtersValues, baseFilters, {
          smart_view,
          href: encodeURIComponent(href),
          ...(isFirstRequest && { referrer: encodeURIComponent(document.referrer) }),
        }),
      )
        .then((res: any) => {
          setIsFirstRequest(false);
          setSearchTimeoutId(null);
          setStartReloadingTime(null);
          return res;
        })
        .catch((e: any) => {
          if (e.response?.status === 429) {
            if (!startReloadingTime || Date.now() - startReloadingTime < 30000) {
              const timeoutId = setTimeout(() => {
                dispatch(toggleReloadSearchFlag());
              }, 9000);
              if (!startReloadingTime) setStartReloadingTime(Date.now());
              return setSearchTimeoutId(timeoutId);
            }
            return dispatch(setSearchFinished());
          }
          throw e;
        });
      console.log(
        `SEARCH. Load search. location.search: ${
          location.search
        } reloadSearchFlag: ${reloadSearchFlag} shouldUpdateBackend: ${shouldUpdateBackend}. Token: ${getAuthToken()}`,
      );
    });
  }, [location.search, reloadSearchFlag, shouldUpdateBackend]);

  useWebsocketTransport(
    "search",
    {
      beforeConnect: () => {
        dispatch(beforeSearchRequest(query, page, pageSize, filtersValues, baseFilters));
      },
      afterConnect: (socketClient) => {
        batch(() => {
          dispatch(loadBomListThunk(1, true));
          socketClient.onMessage((data: any) => {
            dispatch(socketSearchResult(data, query));
          });
          // order_by проверить
          socketClient.send({
            ...{ search: query },
            ...filtersValues,
            ...baseFilters,
            page,
            page_size: pageSize,
            order_by: orderBy,
          });
        });
        return true;
      },
    },
    [location.search, reloadSearchFlag, shouldUpdateBackend],
  );

  return true;
};

export default useSearchLoadResults;
