export const ITEMS_FETCHING = "@sellers/ITEMS_FETCHING";
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
}

export interface Seller {
  id: number;
  name: string;
  url?: string;
}

// State
export interface SellersState {
  items: Items[];
}
