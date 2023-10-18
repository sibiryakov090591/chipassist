export const ITEMS_FETCHING_R = "@sellers/ITEMS_FETCHING_R";
export const ITEMS_FETCHING_S = "@sellers/ITEMS_FETCHING_S";
export const ITEMS_FETCHING_F = "@sellers/ITEMS_FETCHING_F";
export const ITEMS_FETCHING = [ITEMS_FETCHING_R, ITEMS_FETCHING_S, ITEMS_FETCHING_F];
export const ITEMS_FETCHED = "@sellers/ITEMS_FETCHED";
export const GET_All_ITEMS = "@sellers/GET_All_ITEMS";
export const JOIN_ITEMS = "@sellers/JOIN_ITEMS";

interface Items {
  id: number;
  code: string;
  name: string;
  users: any[];
  url: string | null;
  lead_period: any;
  reliable?: string;
  whitelist?: string;
  link_to_site?: string;
  [key: string]: any;
}

export interface Seller {
  id: number;
  name: string;
  url?: string;
}

// State
export interface SellersState {
  items: Items[];
  isLoading: boolean;
}
