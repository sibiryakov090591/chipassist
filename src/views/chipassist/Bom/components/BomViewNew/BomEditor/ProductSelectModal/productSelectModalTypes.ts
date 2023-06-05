import { RfqItem } from "@src/store/rfq/rfqTypes";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import { CashModalItem } from "@src/store/bom/bomTypes";

export interface SaveProps {
  rowKey: string;
  partNumber: string;
  product: Product;
  productTitle: string;
  productId: number;
  productDescription: string;
  stockrecordId: number;
  stockrecord: Stockrecord;
  qty: number;
  qty_ref: number;
  checked: boolean;
  request?: boolean;
  orderRef: number;
  rfq?: any;
}
export interface SelectedLine {
  rowKey: string;
  partNumber: string;
  partNumberForSearch: string;
  product: Product & { part_number: string; product: Product };
  stockrecordId: number;
  qty: number;
  defaultQty: number;
  rfq: RfqItem;
  orderRef: number;
}
export interface Props {
  onClose: (partnumber: string) => void;
  onSaveData: (items: SaveProps[]) => void;
  onStartSearch: (query: string, numInStock: number) => void;
  selectedLines: SelectedLine[];
  selectedPartnumber: string;
  cashProducts: CashModalItem;
}

export interface Item {
  stockrecord: Stockrecord;
  rowKey: string;
  id: string;
  product: Product;
  productId: number;
  productTitle: string;
  productDescription: string;
  upc: string;
  manufacturer: string;
  part_number: string;
  distributor: string;
  moq: number | boolean;
  mpq: number;
  num_in_stock: number;
  lead_period: number;
  lead_period_str: string | number;
  price: number;
  qty: number;
  updated: number;
  updatedVal: string;
  disabled: boolean;
  orderRef: number;
  rfq: number;
}

export interface FilterValues {
  manufacturer: number | string;
  partnumber: number | string;
  distributor: number | string;
  moq: number | string;
  price: number | string;
  stock: number | string;
}
