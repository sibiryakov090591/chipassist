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
    if (extendedSearchId && prevExtendedSearchId !== extendedSearchId) {
      setTimeout(() => {
        extendedSearchRequest(extendedSearchId, query);
      }, 5000);
    }
  }, [extendedSearchId, timeoutId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(watchedParam);
    };
  }, [watchedParam]);

  const extendedSearchRequest = (searchId, query) => {
    if (!isActualQuery(query, watchedParam)) {
      return dispatch(cancelExtendedSearch());
    }
    dispatch(
      saveDataAction(
        {
          count: 45,
          total_pages: 3,
          results: [...Array(15)].map((_, index) => ({
            id: index + 1,
            attributes: [],
            date_created: "2022-04-01T08:00:30.227196+02:00",
            date_updated: "2024-05-25T20:22:34.029196+02:00",
            description: "Cap Tant Wet 150uF 10V 10% (5.56 X 13.08mm) Axial 125°C",
            manufacturer: { id: 576, name: "Vishay Intertechnology" },
            stockrecords: [
              {
                id: index + 10,
                date_created: "2022-04-01T08:00:30.227196+02:00",
                date_updated: new Date(Date.now() - (index + 1) * 100000).toISOString(),
                errors: [],
                lead_period: "",
                lead_period_str: "",
                low_stock_threshold: 0,
                moq: 1,
                mpq: 1,
                num_in_stock: 100,
                packaging: "Each",
                partner: 16,
                partner_name: "Newark",
                partner_sku: "61AC0858",
                price_currency: "USD",
                prices: [{ amount: 1, id: 56527900, price: 50.06 }],
                product_url: "",
              },
            ],
          })),
        },
        extendedSearchParams,
      ),
    );
    dispatch(finishedStateAction(extendedSearchParams));
    return true;
  };

  return true;
}

const isActualQuery = (query, localStorageKey) => localStorage.getItem(localStorageKey) === query;
