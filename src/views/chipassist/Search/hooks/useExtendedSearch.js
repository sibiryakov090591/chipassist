import { useState, useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import usePrevious from "@src/hooks/usePrevious";
import {
  extendedLoadingOfSearchResultsThunk,
  cancelExtendedSearch,
  extendedPreloadingOfSearchResults,
  compareSearchResults,
} from "@src/store/search/searchActions";
import { useRestTransport } from "@src/services/useTransport";
import useAppSelector from "@src/hooks/useAppSelector";
import { getAuthToken } from "@src/utils/auth";

export default function useExtendedSearch(watchedParam, saveDataAction, finishedStateAction, queryParams = null) {
  const pollingTimeout = 3000;
  const [timeoutId, setTimeoutId] = useState(null);
  const [compareRequestTimeoutId, setCompareRequestTimeoutId] = useState(null);
  const [startReloadingTimeByError, setStartReloadingTimeByError] = useState(null); // try to search after 429 error for 30 seconds
  const dispatch = useAppDispatch();
  const extendedSearchId = useAppSelector((state) => state.search.extendedSearchId);
  const extendedSearchParams = useAppSelector((state) => state.search.extendedSearchParams);
  const prevExtendedSearchId = usePrevious(extendedSearchId);

  useRestTransport(() => {
    const query = localStorage.getItem(watchedParam);

    const pollingExtendedSearch = (id, request_query, timeout = null) => {
      console.log(
        `SEARCH. Extended search. search_result_ID: ${id} request_query: ${request_query} actual_query: ${query}. Token: ${getAuthToken()}`,
      );
      if (!isActualQuery(query, watchedParam)) {
        if (timeoutId) clearTimeout(timeoutId);
        dispatch(cancelExtendedSearch());
        return false;
      }
      const timeoutToken = setTimeout(() => {
        extendedSearchRequest(id, request_query, pollingExtendedSearch);
      }, timeout || pollingTimeout);
      setTimeoutId(timeoutToken);
      return true;
    };

    if (extendedSearchId && prevExtendedSearchId !== extendedSearchId) {
      if (compareRequestTimeoutId) clearTimeout(compareRequestTimeoutId);
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(cancelExtendedSearch());
      extendedSearchRequest(extendedSearchId, query, pollingExtendedSearch);
    }
  }, [extendedSearchId, timeoutId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(watchedParam);
    };
  }, [watchedParam]);

  const extendedSearchRequest = (searchId, query, repeater) => {
    if (!isActualQuery(query, watchedParam)) {
      return dispatch(cancelExtendedSearch());
    }
    return dispatch(extendedLoadingOfSearchResultsThunk(searchId, queryParams))
      .then((response) => {
        setStartReloadingTimeByError(null);
        if (response?.status === "PENDING") {
          repeater(searchId, query);
        } else if (response?.status === "DONE") {
          dispatch(saveDataAction(response, extendedSearchParams));
          const compareRequestToken = setTimeout(() => {
            dispatch(extendedPreloadingOfSearchResults(queryParams))
              .then((res) => {
                // dispatch(saveFiltersValuesThunk(res, query));
                dispatch(compareSearchResults(res?.results));
              })
              .finally(() => {
                dispatch(finishedStateAction(extendedSearchParams));
              });
          }, pollingTimeout);
          setCompareRequestTimeoutId(compareRequestToken);
        } else {
          dispatch(finishedStateAction(extendedSearchParams));
        }
      })
      .catch((e) => {
        if (
          e.response.status === 429 &&
          (!startReloadingTimeByError || Date.now() - startReloadingTimeByError < 30000)
        ) {
          if (!startReloadingTimeByError) setStartReloadingTimeByError(Date.now());
          dispatch(extendedPreloadingOfSearchResults(queryParams))
            .then((res) => {
              saveDataAction(res, extendedSearchParams);
            })
            .finally(() => {
              repeater(searchId, query, 9000);
            });
        } else {
          dispatch(finishedStateAction(extendedSearchParams));
          setStartReloadingTimeByError(null);
        }
      });
  };

  return true;
}

const isActualQuery = (query, localStorageKey) => localStorage.getItem(localStorageKey) === query;
