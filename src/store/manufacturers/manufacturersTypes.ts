export const ITEMS_FETCHING = "@manufacturers/ITEMS_FETCHING";
export const ITEMS_FETCHED = "@manufacturers/ITEMS_FETCHED";
export const GET_All_ITEMS = "@manufacturers/GET_All_ITEMS";
export const JOIN_ITEMS = "@manufacturers/JOIN_ITEMS";

export interface Items {
  id: number;
  code?: string;
  name: string;
  users?: any[];
  url?: string | null;
  logo?: any;
  logo_url?: any;
}

export interface ResponseManufacturer {
  id: number;
  name: string;
}

// State
export interface ManufacturersState {
  items: Items[];
  loaded: boolean;
}
