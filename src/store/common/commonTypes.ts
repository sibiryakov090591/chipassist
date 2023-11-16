import { Product } from "@src/store/products/productTypes";

export const SHOULD_UPDATE_BACKEND = "@common/SHOULD_UPDATE_BACKEND";
export const SHOULD_UPDATE_CARD = "@common/SHOULD_UPDATE_CARD";
export const ADD_PRODUCT_TO_CART_BLOCK = "@cart/ADD_PRODUCT_TO_CART_BLOCK";
export const DELETE_PRODUCT_CART_BLOCK = "@cart/DELETE_PRODUCT_CART_BLOCK";
export const SAVE_UTM = "@cart/SAVE_UTM";
export const SAVE_HREF = "@common/SAVE_HREF";

export interface CommonState {
  isShowQuickButton: boolean;
  shouldUpdateBackend: number; // counter
  shouldUpdateCard: number;
  addedProduct: {
    product: Product;
    quantity: number;
    lineId: number | string;
  };
  utm: { [key: string]: string };
  href: string;
}
export interface ShouldUpdateBackendAction {
  type: typeof SHOULD_UPDATE_BACKEND;
}

export interface ShouldUpdateCardAction {
  type: typeof SHOULD_UPDATE_CARD;
}

export interface DeleteProductCartBlockAction {
  type: typeof DELETE_PRODUCT_CART_BLOCK;
}

interface AddProductToCartBlockAction {
  type: typeof ADD_PRODUCT_TO_CART_BLOCK;
  payload: {
    product: Product;
    quantity: number;
    lineId: number | string;
  };
}

interface SaveUtmAction {
  type: typeof SAVE_UTM;
  payload: { [key: string]: string };
}

interface SaveHrefAction {
  type: typeof SAVE_HREF;
  payload: string;
}

export type CommonActionTypes =
  | SaveHrefAction
  | ShouldUpdateCardAction
  | ShouldUpdateBackendAction
  | AddProductToCartBlockAction
  | DeleteProductCartBlockAction
  | SaveUtmAction;
