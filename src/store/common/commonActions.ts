import ApiClient from "@src/services/ApiClient";
import { Product } from "@src/store/products/productTypes";
import * as actionTypes from "./commonTypes";

const apiClient = new ApiClient();

export const shouldUpdateBackend = (): actionTypes.ShouldUpdateBackendAction => {
  return {
    type: actionTypes.SHOULD_UPDATE_BACKEND,
  };
};

export const shouldUpdateCard = (): actionTypes.ShouldUpdateCardAction => {
  return {
    type: actionTypes.SHOULD_UPDATE_CARD,
  };
};

export const checkUserActivityStatus = async () => {
  const result: any = await apiClient
    .get(`/user_events/status/`)
    .then((res) => res.data)
    .catch((e) => {
      console.log("***ERROR_CHECK_USER_ACTIVITY", e);
      throw e;
    });
  const email = localStorage.getItem("email");
  if (!result.mask || result.mask === "*") return true;
  return !!email.match(result.mask);
};

export const addProductToCartBlock = (product: Product, quantity: number, lineId: number | string) => ({
  type: actionTypes.ADD_PRODUCT_TO_CART_BLOCK,
  payload: {
    product,
    quantity,
    lineId,
  },
});

export const deleteProductCartBlock = () => ({
  type: actionTypes.DELETE_PRODUCT_CART_BLOCK,
});

export const saveUtm = (data: { [key: string]: string }) => ({
  type: actionTypes.SAVE_UTM,
  payload: data,
});

export default "common actions";
