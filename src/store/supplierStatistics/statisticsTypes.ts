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
    results: ResponseItem[];
  };
  isLoading: boolean;
}

export interface ResponseItem {
  id: number;
  country: string;
  competitive_price: number;
  date: string;
  manufacturer_name: string;
  stockrecord_id: number;
  mpn: string;
  position: string;
  price: number;
  quantity: number;
  num_in_stock: number;
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
