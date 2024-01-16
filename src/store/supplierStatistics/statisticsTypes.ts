import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";

export const LOAD_STATISTICS_R = "@supplierStatistics/LOAD_STATISTICS_R";
export const LOAD_STATISTICS_S = "@supplierStatistics/LOAD_STATISTICS_S";
export const LOAD_STATISTICS_F = "@supplierStatistics/LOAD_STATISTICS_F";
export const LOAD_STATISTICS_ARRAY = [LOAD_STATISTICS_R, LOAD_STATISTICS_S, LOAD_STATISTICS_F];

export interface StatisticsState {
  data: {
    total_count: number;
    total_pages: number;
    page_size: number;
    page: number;
    count: number;
    results: StatisticsItem[];
  };
  isLoading: boolean;
}

export interface StatisticsItem {
  rfq_id: number;
  rfq_quantity: number;
  rfq_mpn: string;
  response_quantity: number;
  response_price: number;
  response_created: string;
  response_datecode: string;
  country: string;
  manufacturer_name: string;
  competitive_price: number;
  your_currency: CurrenciesAllowed;
  competitive_currency: CurrenciesAllowed;
  position: string;
}

interface LoadStatisticsRequestAction {
  type: typeof LOAD_STATISTICS_R;
}

interface LoadStatisticsSuccessAction {
  type: typeof LOAD_STATISTICS_S;
  response: any;
}

interface LoadStatisticsFailureAction {
  type: typeof LOAD_STATISTICS_F;
}

export type StatisticsActionTypes =
  | LoadStatisticsRequestAction
  | LoadStatisticsSuccessAction
  | LoadStatisticsFailureAction;
