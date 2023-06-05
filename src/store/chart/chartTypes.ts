export const LOAD_PRICE_DATA_R = "@chart/LOAD_PRICE_DATA_R";
export const LOAD_PRICE_DATA_S = "@chart/LOAD_PRICE_DATA_S";
export const LOAD_PRICE_DATA_F = "@chart/LOAD_PRICE_DATA_F";
export const LOAD_PRICE_DATA_ARRAY = [LOAD_PRICE_DATA_R, LOAD_PRICE_DATA_S, LOAD_PRICE_DATA_F];

export const SET_IS_OPEN = "@chart/SET_IS_OPEN";
export const SET_DATA = "@chart/SET_DATA";

export interface ChartState {
  isLoading: boolean;
  isOpen: boolean;
  data: any; // TODO types
  stockrecordId: number;
  priceId: number;
}

interface LoadPriceDataRequestAction {
  type: typeof LOAD_PRICE_DATA_R;
}
interface LoadPriceDataSuccessAction {
  type: typeof LOAD_PRICE_DATA_S;
  response: any;
}
interface LoadPriceDataFailAction {
  type: typeof LOAD_PRICE_DATA_F;
}

interface SetChartModalOpenAction {
  type: typeof SET_IS_OPEN;
  payload: boolean;
}

interface SetChartDataAction {
  type: typeof SET_DATA;
  payload: { stockrecordId: number; priceId: number };
}

export type ChartActionTypes =
  | LoadPriceDataRequestAction
  | LoadPriceDataSuccessAction
  | LoadPriceDataFailAction
  | SetChartModalOpenAction
  | SetChartDataAction;
