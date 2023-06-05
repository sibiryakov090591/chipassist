import { BomInitialState } from "@src/store/bom/bomTypes";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { RootState } from "@src/store";
import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { clearCheckout, sendRequestThunk } from "@src/store/checkout/checkoutActions";
import { getValidQuantityPriceStatus } from "@src/utils/product";
import { Dispatch } from "redux";
import constants from "@src/constants/constants";
import { ID_ELFARO } from "@src/constants/server_constants";
import { QuickOrder } from "@src/views/elfaro/Product/components/QuickOrderModal/QuickOrderModal";
import { progressModalClose } from "@src/store/progressModal/progressModalActions";
import { v4 as uuidv4 } from "uuid";
import { SEARCH_URL_EXTENDED, SEARCH_URL } from "../search/searchActions";
import { Stockrecord, Product } from "../products/productTypes";
import * as actionTypes from "./cartTypes";
import { saveRfqListItems } from "../rfq/rfqActions";

const apiClient = new ApiClient();
const { t } = staticI18n("bom");

/*
// TODO: this method is not used (the only "commented" usage is in CartPay.tsx component)
export const getToken = (data) => {
  return (dispatch) => {
    dispatch({
      types: actionTypes.GET_TOKEN,
      promise: (client) =>
        client
          .post(`https://api.securionpay.com/tokens`, {
            data: {
              ...data,
            },
          })
          .then((res) => res.data),
    }).then((response) => {
      console.log("response", response);
      dispatch({
        type: actionTypes.GET_TOKEN_DONE,
        payload: "",
      });
    });
  };
};
 */

const saveCart = (data: actionTypes.CartInfo): actionTypes.CartActionTypes => ({
  type: actionTypes.SAVE_CART,
  payload: data,
});

export const getCart = (page = 1, pageSize = 15, join = false) => {
  return (dispatch: any, getState: () => RootState) => {
    const isAuthenticated = getState().auth.token !== null;
    return isAuthenticated ? dispatch(getAuthCart(page, pageSize, join)) : dispatch(getUnauthCart());
  };
};

export const getUnauthCart = () => {
  const cart_items = (localStorage.getItem("unauth_cart") && JSON.parse(localStorage.getItem("unauth_cart"))) || [];
  const promises = cart_items.map((val: any) => apiClient.get(`/products/${val.product}/`));

  return (dispatch: any) => {
    Promise.all(promises)
      .then((res: any) =>
        dispatch({
          type: actionTypes.GET_CART_ITEMS_LOCAL_STORAGE,
          payload: { products: res, cartItems: cart_items },
        }),
      )
      .catch((error) => {
        console.log("***GET_CART_ITEMS_ERROR", error);
        throw error;
      });
  };
};

export const sendQuickOrder = (data: any) => {
  return (dispatch: any, getState: () => RootState) => {
    dispatch({
      types: [false, false, false],
      promise: (client: ApiClientInterface) => client.get(`/basket/`).then((res) => res.data),
    })
      .then((response: actionTypes.CartInfo) => {
        const isAuthenticated = getState().auth.token !== null;
        if (isAuthenticated && response?.id < 1) throw new Error(`Basket id is ${response?.id}`);
        dispatch({
          types: [false, false, false],
          promise: (client: ApiClientInterface) => client.get(`/baskets/${response.id}/lines/`).then((res) => res.data),
        }).then((items: any) => {
          const unauth_cart: QuickOrder[] = data;
          if (!unauth_cart?.length) return dispatch(getCart());

          const promises: any = [];
          unauth_cart.forEach((val: QuickOrder) => {
            promises.push(
              dispatch({
                types: [false, false, false],
                promise: (client: ApiClientInterface) =>
                  client
                    .post(`/baskets/${response.id}/lines/`, {
                      data: { ...val, basket: response.id },
                    })
                    .then((res) => res.data),
              }),
            );
          });
          Promise.all(promises).then(async () => {
            if (!items?.count) {
              await dispatch(getAuthCart(1, 100, true));
              await dispatch(sendRequestThunk([])); // TODO: set rfqList or back payCheckoutThunk
              dispatch(progressModalClose());
            } else {
              dispatch(progressModalClose());
              dispatch(getCart());
            }
          });
          return response;
        });
      })
      .catch((e: any) => {
        console.log("***QUICK_CHECKOUT_ERROR", e);
        throw e;
      });
  };
};

export const getAuthCart = (page = 1, pageSize = 15, join = false) => {
  return (dispatch: any, getState: () => RootState) => {
    return dispatch({
      types: actionTypes.GET_CART_ARRAY,
      promise: (client: ApiClientInterface) => client.get(`/basket/`).then((res) => res.data),
    })
      .then(async (response: actionTypes.CartInfo) => {
        const isAuthenticated = getState().auth.token !== null;
        if (isAuthenticated && response?.id < 1) throw new Error(`Basket id is ${response?.id}`);
        dispatch(saveCart(response));
        await dispatch(getCartItems(response.id, page, pageSize, join));
        if (localStorage.getItem("Quick_order")) return;

        const unauthCartItems = JSON.parse(localStorage.getItem("unauth_cart")) || [];
        if (unauthCartItems.length) {
          localStorage.removeItem("unauth_cart");
          unauthCartItems.forEach((val: any) => {
            console.log("ADD_CART_ITEM >>>>>>>>", { ...val, basket: response.id });
            dispatch({
              types: actionTypes.ADD_CART_ITEM_ARRAY,
              promise: (client: ApiClientInterface) =>
                client
                  .post(`/baskets/${response.id}/lines/`, {
                    data: { ...val, basket: response.id },
                  })
                  .then((res) => {
                    dispatch(updateCartCount(getState().cart.count + 1));
                    return res.data;
                  }),
            });
          });
        }
      })
      .catch((e: any) => {
        console.log("***GET_CART_ERROR", e);
        throw e;
      });
  };
};

export const getCartItems = (cartId: number, page = 1, pageSize = 15, join = false) => {
  return (dispatch: any) => {
    const params = `?page=${page}&page_size=${pageSize}`;
    return dispatch({
      types: actionTypes.GET_CART_ITEMS_ARRAY,
      promise: (client: ApiClientInterface) => client.get(`/baskets/${cartId}/lines/${params}`).then((res) => res.data),
    })
      .then((response: any) => {
        console.log("Successful cart loading - ", response);
        const items = response.results.map((item: any) => {
          const new_item = { ...item };
          new_item.productId = parseInt(new_item.product);
          new_item.linesId = new_item.id;
          return new_item;
        });

        dispatch(
          response.page !== 1
            ? {
                type: actionTypes.JOIN_CART_ITEMS,
                payload: {
                  items,
                  count: response.count,
                  total_pages: response.total_pages,
                },
              }
            : {
                type: actionTypes.SAVE_CART_ITEMS,
                payload: {
                  items,
                  count: response.count,
                  total_pages: response.total_pages,
                },
              },
        );

        if (join && response.page < response.total_pages) {
          dispatch(getCartItems(cartId, response.page + 1, pageSize, true));
        }
        return items;
      })
      .catch((e: any) => {
        console.log("***SAVE_CART_ITEMS_ERROR", e);
        throw e;
      });
  };
};

export const updateCartItem = (
  basket_id: number,
  line_id: number | string,
  data: { quantity?: number; stockrecord?: number; price?: number; rfq?: 0 | 1 },
) => {
  return (dispatch: any, getState: () => RootState) => {
    const isAuthenticated = getState().auth.token !== null;
    return isAuthenticated
      ? dispatch(updateAuthCartItem(basket_id, line_id, data))
      : dispatch(updateUnauthCartItem(line_id, data));
  };
};

export const updateUnauthCartItem = (
  line_id: number | string,
  data: { quantity?: number; stockrecord?: number; price?: number; rfq?: number },
) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.UPDATE_CART_ITEM_LOCAL_STORAGE,
      payload: { line_id, data },
    });
  };
};

export const updateAuthCartItem = (
  basket_id: number,
  line_id: number | string,
  data: { quantity?: number; stockrecord?: number; price?: number },
) => {
  return (dispatch: any) => {
    dispatch({
      types: actionTypes.UPDATE_CART_ITEM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .patch(`/baskets/${basket_id}/lines/${line_id}/`, {
            data,
            cancelId: `update_cart_item_${line_id}`,
          })
          .catch((e: any) => {
            console.log("***UPDATE_CART_ITEM_ERROR", e);
            throw e;
          })
          .then((res) => res.data),
      payload: line_id,
    });
  };
};

export const prepareBomCart = (
  basketId: number,
  items: actionTypes.BackendCartItem[],
  bomItems: BomInitialState["items"],
) => (dispatch: any) => {
  const promises: any = [];
  items.forEach((item) => {
    promises.push(apiClient.delete(`/baskets/${basketId}/lines/${item.id}/`));
  });
  return Promise.all(promises).then(() => {
    let isNeedToGetToCheckout = false;
    const rfqsList: any = [];
    dispatch(clearCartItems());
    Object.values(bomItems)
      .filter((v) => v.approved)
      // sorted rfqs to down
      .sort((a, b) => {
        if (a.stockrecord && !b.stockrecord) return -1;
        if (!a.stockrecord && b.stockrecord) return 1;
        return 0;
      })
      .forEach((item) => {
        if ((item.product as Product)?.stockrecords && item.stockrecord) {
          const stockrecord = (item.product as Product)?.stockrecords?.find((s) => s.id === item.stockrecord);
          // const { quantity: validQuantity } = getValidQuantityPriceStatus(item.quantity, stockrecord);
          // dispatch(addCartItem(item.product, stockrecord, validQuantity, null, false, false));

          // if (item.quantity > stockrecord.num_in_stock) {
          //   const restQty = getValidQuantityPriceStatus(item.quantity - validQuantity, stockrecord, 1).quantity;
          //   dispatch(addCartItem(item.product, stockrecord, restQty, `${item.id}`, false, false, 1));
          // }
          dispatch(addCartItem(item.product, stockrecord, item.quantity, null, false, false, 1));
          isNeedToGetToCheckout = true;
        } else if (!isNeedToGetToCheckout) {
          const data = {
            part_number: item.part_number,
            quantity: item.quantity,
          };
          rfqsList.push(data);
        }
      });
    if (!isNeedToGetToCheckout && rfqsList.length) dispatch(saveRfqListItems(rfqsList));
    return isNeedToGetToCheckout;
  });
};

export const removeCartItem = (basketId: number, id: number | string) => {
  return (dispatch: any, getState: () => RootState) => {
    const isAuthenticated = getState().auth.token !== null;
    return isAuthenticated ? dispatch(removeAuthCartItem(basketId, id)) : dispatch(removeUnauthCartItem(id));
  };
};

export const removeUnauthCartItem = (id: number | string) => {
  return (dispatch: any) => {
    return dispatch({
      type: actionTypes.REMOVE_CART_ITEM_LOCAL_STORAGE,
      payload: id,
    });
  };
};

export const removeAuthCartItem = (basketId: number, id: number | string) => {
  return (dispatch: any, getState: () => RootState) => {
    dispatch({
      types: actionTypes.REMOVE_CART_ITEM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client.delete(`/baskets/${basketId}/lines/${id}/`).then((res) => res.data),
      payload: id,
    })
      .then(() => dispatch(updateCartCount(getState().cart.count - 1)))
      .catch((e: any) => {
        console.log("***REMOVE_CART_ITEM_ERROR", e);
        throw e;
      });
  };
};

export const updateCartCount = (count: number) => ({
  type: actionTypes.UPDATE_CART_COUNT,
  payload: count,
});

export const clearCart = (): actionTypes.CartActionTypes => ({
  type: actionTypes.CLEAR_CART,
});

export const clearCartItems = (): actionTypes.CartActionTypes => ({
  type: actionTypes.CLEAR_CART_ITEMS,
});

export const addCartItem = (
  product: any,
  sr: Stockrecord,
  quantity: number,
  attribute: string = null,
  bomEditMode = false,
  notifications = true,
  isRfq = 0,
) => {
  return (dispatch: any, getState: () => RootState) => {
    // if (!sr && bomEditMode) {
    //   dispatch(
    //     showBottomLeftMessageAlertAction({
    //       text: `${product.manufacturer ? product.manufacturer.name : ""} ${product.upc}: ${t(
    //         "cart.error_add_cart",
    //       ).toLowerCase()}`,
    //       severity: "warning",
    //     }),
    //   );
    //   throw new Error("error while adding to cart!");
    // }

    const isAuthenticated = getState().auth.token !== null;

    const basketId = getState().cart.info.id;
    if (isAuthenticated && basketId < 1) throw new Error(`Basket id is ${basketId}`);

    let stockrecord: number = null;

    if (sr) {
      stockrecord = sr.id;
    } else if (!bomEditMode) {
      switch (getState().cart.addMode) {
        case "minPrice":
          stockrecord = getMinPriceStockrecordId(product.stockrecords);
          break;
        default:
          stockrecord = getMinPriceStockrecordId(product.stockrecords);
      }
    }
    const { quantity: validQuantity, price, isOnline } = getValidQuantityPriceStatus(quantity, sr, isRfq);

    const data = {
      product: product?.id,
      price: price.id || null,
      stockrecord,
      quantity: validQuantity,
      basket: basketId,
      attributes: (attribute && { option: 1, value: attribute }) || null,
      rfq: isRfq || (isOnline && !!price.id ? 0 : 1),
    };

    dispatch(clearCheckout());

    if (!isAuthenticated) {
      const unauth_cart =
        (localStorage.getItem("unauth_cart") && JSON.parse(localStorage.getItem("unauth_cart"))) || [];
      localStorage.setItem("unauth_cart", JSON.stringify([...unauth_cart, data]));

      const unAuthItem = {
        id: uuidv4(),
        product,
        price: price.id,
        stockrecord: product.stockrecords.find((val: any) => val.id === stockrecord),
        quantity: data.quantity,
        rfq: isRfq || (isOnline && !!price.id ? 0 : 1),
      };

      dispatch({
        type: actionTypes.ADD_CART_ITEM_LOCAL_STORAGE,
        payload: unAuthItem,
      });
      dispatch(updateCartCount(getState().cart.count + 1));
      return Promise.resolve(unAuthItem);
    }
    return dispatch({
      types: actionTypes.ADD_CART_ITEM_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .post(`/baskets/${basketId}/lines/`, {
            data,
          })
          .then((res) => {
            if (notifications) {
              dispatch(
                showBottomLeftMessageAlertAction({
                  text: `${product.manufacturer ? product.manufacturer.name : "" || ""} ${product.upc}: ${
                    sr?.partner_name || ""
                  } ${t("cart.added_cart").toLowerCase()}`,
                  // added_cart
                  severity: "success",
                }),
              );
            }
            dispatch(updateCartCount(getState().cart.count + 1));
            return res.data;
          })
          .catch((e) => {
            if (e.response.status === 401) {
              client.get("/profile/0/");
            }
            console.log("***ADD_TO_CART_ERROR", e);
            throw new Error(
              `${product.manufacturer ? product.manufacturer.name : "" || ""} ${product.upc}: ${
                sr?.partner_name || ""
              } ${t("cart.error_add_cart").toLowerCase()}`,
            );
          }),
    });
  };
};

const getMinPriceStockrecordId = (stockrecords: Array<Record<string, any>>) => {
  if (!stockrecords) return null;
  const sortedStockrecords = [...stockrecords]
    .sort((a, b) => {
      const pricesA = [...a?.prices].sort((priceA, priceB) => priceA?.amount - priceB?.amount);
      const pricesB = [...b?.prices].sort((priceC, priceD) => priceC?.amount - priceD?.amount);
      return pricesA[0]?.price - pricesB[0]?.price;
    })
    .filter((sr) => {
      const sortedPrices = [...sr?.prices].sort((priceA, priceB) => priceA?.amount - priceB?.amount);
      if (sortedPrices[0]?.price > 0) {
        return true;
      }
      return false;
    });

  return sortedStockrecords[0]?.id || null;
};

export const productUpdateStart = (lineId: number | string) => (dispatch: any) =>
  dispatch({ type: actionTypes.PRODUCT_UPDATE_START, payload: lineId });

export const productUpdateSave = (data: any, lineId: number | string) => (dispatch: any, getState: () => RootState) => {
  const { status } = data;
  const backet_id = getState().cart.info.id;
  const item = getState().cart.items.find((val) => val.id === lineId);
  switch (status) {
    case "PENDING":
      break;
    case "DONE":
      dispatch(updateCartItem(backet_id, lineId, { quantity: item.quantity }));
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_FINISH,
        payload: lineId,
      });
      break;
    default:
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_FINISH,
        payload: lineId,
      });
  }
  dispatch({ type: actionTypes.PRODUCT_UPDATE_SAVE, payload: { data, lineId } });
};

export const productUpdateThunk = (lineId: number | string) => {
  return (dispatch: any, getState: () => RootState) => {
    const backet_id = getState().cart.info.id;
    const item = getState().cart.items.find((val) => val.id === lineId);
    if (!item) return;

    let params = `?search=${encodeURIComponent(item.product.upc)}`;
    if (item.stockrecord.partner_name) {
      params += `&base_seller_strings=${item.stockrecord.partner_name}`;
    }
    dispatch({ type: actionTypes.PRODUCT_UPDATE_START, payload: lineId });
    dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(`${SEARCH_URL}${params}`)
          .then((res) => res.data)
          .catch((e: any) => {
            console.log("***PRODUCT_UPDATE_ERROR", e);
            dispatch({ type: actionTypes.PRODUCT_UPDATE_FINISH, payload: lineId });
            throw e;
          }),
    }).then((response: any) => {
      dispatch({ type: actionTypes.PRODUCT_UPDATE_SAVE, payload: { data: response, lineId } });

      if (constants.id !== ID_ELFARO && response.search_id) {
        dispatch(pollingUpdateProduct(response.search_id, lineId));
      } else {
        dispatch(updateCartItem(backet_id, lineId, { quantity: item.quantity }));
        dispatch({
          type: actionTypes.PRODUCT_UPDATE_FINISH,
          payload: lineId,
        });
      }
    });
  };
};

const pollingUpdateProduct = (search_id: number, lineId: number | string) => {
  return (dispatch: any, getState: () => RootState) => {
    const backet_id = getState().cart.info.id;
    const item = getState().cart.items.find((val) => val.id === lineId);
    if (!item) return;

    dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(
            `${SEARCH_URL_EXTENDED}${search_id}/?page_size=100&page=1&search=${encodeURIComponent(item.product.upc)}`,
          )
          .then((res) => res.data),
    })
      .then((response: any) => {
        if (response.status && response.status === "PENDING") {
          setTimeout(() => {
            dispatch(pollingUpdateProduct(search_id, lineId));
          }, 2000);
        } else if (response.status && response.status === "DONE") {
          dispatch({ type: actionTypes.PRODUCT_UPDATE_SAVE, payload: { data: response, lineId } });
          dispatch(updateCartItem(backet_id, lineId, { quantity: item.quantity }));
          dispatch({
            type: actionTypes.PRODUCT_UPDATE_FINISH,
            payload: lineId,
          });
        } else {
          dispatch({
            type: actionTypes.PRODUCT_UPDATE_FINISH,
            payload: lineId,
          });
          console.log("***CART_UPDATE_PRODUCT_ERROR", response);
          throw new Error(`CART_UPDATE_PRODUCT_ERROR basket:${backet_id}, line:${lineId}`);
        }
      })
      .catch((e: any) => {
        console.log("***UPDATE_PRODUCT_ERROR", e);
        throw e;
      });
  };
};

export function getTaxes(): any {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [null, null, null],
      promise: (client: ApiClientInterface) =>
        client
          .get(`taxes`)
          .then((res) => res?.data)
          .then((res: any) => res?.service_tax)
          .catch((e) => {
            console.log("***GET_TAXES_ERROR", e);
            throw e;
          }),
    });
  };
}
