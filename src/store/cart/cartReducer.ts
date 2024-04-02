import { v4 as uuidv4 } from "uuid";
import { updateObject } from "@src/utils/utility";
import { CartActionTypes, CartInfo, CartState } from "./cartTypes";
import * as actionTypes from "./cartTypes";

const cartInfo: CartInfo = {
  currency: "",
  id: 0,
  is_tax_known: false,
  lines: "",
  offer_discounts: [],
  owner: "",
  status: "",
  total_incl_tax: "",
  total_incl_tax_excl_discounts: "",
  total_tax: "",
  url: "",
};

const initialState: CartState = {
  info: { ...cartInfo },
  loaded: true,
  count: 0,
  total_pages: 0,
  items: [],
  itemsLoaded: true,
  itemsUpdating: [],
  itemsRemoving: [],
  addMode: "minPrice",
  needsUpdateCounter: 0,
};

export default function cartReducer(state = initialState, action: CartActionTypes) {
  switch (action.type) {
    case actionTypes.GET_CART_R:
      return updateObject(state, { loaded: false, itemsLoaded: false });
    case actionTypes.GET_CART_S:
      return updateObject(state, { loaded: false, itemsLoaded: false });
    case actionTypes.GET_CART_F:
      return updateObject(state, { loaded: true, itemsLoaded: true });

    case actionTypes.GET_CART_ITEMS_R:
      return updateObject(state, { itemsLoaded: false });
    case actionTypes.GET_CART_ITEMS_S:
      return updateObject(state, { itemsLoaded: false });
    case actionTypes.GET_CART_ITEMS_F:
      return updateObject(state, { itemsLoaded: true });

    case actionTypes.SAVE_CART:
      return updateObject(state, {
        info: action.payload,
        loaded: true,
      });

    case actionTypes.SAVE_CART_ITEMS:
      return updateObject(state, {
        items: action.payload.items,
        count: action.payload.count,
        total_pages: action.payload.total_pages,
        itemsLoaded: true,
      });

    case actionTypes.JOIN_CART_ITEMS:
      return updateObject(state, {
        items: [...state.items, ...action.payload.items],
        count: action.payload.count,
        itemsLoaded: true,
      });

    case actionTypes.GET_CART_ITEMS_LOCAL_STORAGE: {
      const items: any = [];
      action.payload.cartItems.forEach((line: any) => {
        const product = action.payload.products.find((prod: any) => line.product === prod.data.id);
        const stockrecord = product?.data.stockrecords.find((item: any) => item.id === line.stockrecord);
        if (product) {
          items.push({
            id: uuidv4(),
            product: product.data,
            productId: product.data.id,
            stockrecord,
            quantity: line.quantity,
            rfq: line.rfq,
          });
        } else {
          // remove wrong product
          const cartItems = JSON.parse(localStorage.getItem("unauth_cart"));
          localStorage.setItem(
            "unauth_cart",
            JSON.stringify(
              cartItems?.filter((val: any) => val.product !== line.product && val.stockrecord !== line.stockrecord),
            ),
          );
        }
      });

      return updateObject(state, {
        loaded: true,
        items,
        itemsLoaded: true,
        count: items?.length || 0,
      });
    }

    case actionTypes.ADD_CART_ITEM_S: {
      const updatedItems = [...state.items, action.response];

      return updateObject(state, {
        info: { ...state.info },
        items: updatedItems,
      });
    }

    case actionTypes.UPDATE_CART_ITEM_R: {
      // return updateObject(state, { itemsUpdating: [...state.itemsUpdating, action.payload] });
      return state;
    }

    case actionTypes.UPDATE_CART_ITEM_S: {
      const updatedItems = [...state.items].map((item) => {
        if (item.id === action.response.id) return action.response;
        return item;
      });

      return updateObject(state, {
        info: { ...state.info },
        items: updatedItems,
        // itemsUpdating: [...state.itemsUpdating].filter((val) => val !== action.payload),
      });
    }

    case actionTypes.UPDATE_CART_ITEM_F: {
      // return updateObject(state, { itemsUpdating: [...state.itemsUpdating].filter((val) => val !== action.payload) });
      return state;
    }

    case actionTypes.UPDATE_CART_ITEM_LOCAL_STORAGE: {
      const cartItems = JSON.parse(localStorage.getItem("unauth_cart"));
      const item = state.items.find((val) => val.id === action.payload.line_id);
      const { quantity, stockrecord, price, rfq } = action.payload.data;
      const stockrecordEntity = item.product.stockrecords.find((val) => val.id === stockrecord) || item.stockrecord;
      localStorage.setItem(
        "unauth_cart",
        JSON.stringify(
          cartItems?.map((val: any) => {
            if (val.product === item.product.id) {
              return {
                ...val,
                price: price || val.price,
                quantity: quantity || item.quantity,
                stockrecord: stockrecordEntity?.id || item.stockrecord?.id || null,
                rfq: typeof rfq === "number" ? (rfq ? 1 : 0) : val.rfq,
              };
            }
            return val;
          }),
        ),
      );
      const items = state.items.map((val) => {
        if (val.id === action.payload.line_id) {
          return {
            ...val,
            quantity: quantity || item.quantity,
            stockrecord: stockrecordEntity || item.stockrecord,
            rfq: typeof rfq === "number" ? (rfq ? 1 : 0) : val.rfq,
          };
        }
        return val;
      });
      return updateObject(state, { items });
    }

    case actionTypes.ADD_CART_ITEM_LOCAL_STORAGE: {
      const { product, stockrecord, quantity, rfq, id } = action.payload;
      const item = {
        id,
        product,
        productId: product.id,
        stockrecord,
        quantity,
        rfq,
      };
      return updateObject(state, {
        items: [...state.items, item],
      });
    }

    case actionTypes.REMOVE_CART_ITEM_R: {
      return updateObject(state, { itemsRemoving: [...state.itemsRemoving, action.payload] });
    }

    case actionTypes.REMOVE_CART_ITEM_S: {
      const updatedItems = [...state.items].filter((item) => item.id !== action.payload);

      return updateObject(state, {
        info: { ...state.info },
        items: updatedItems,
        itemsRemoving: [...state.itemsRemoving].filter((val) => val !== action.payload),
      });
    }

    case actionTypes.REMOVE_CART_ITEM_F: {
      return updateObject(state, { itemsRemoving: [...state.itemsRemoving].filter((val) => val !== action.payload) });
    }

    case actionTypes.REMOVE_CART_ITEM_LOCAL_STORAGE: {
      const item = state.items.find((val) => val.id === action.payload);
      const cartItems = JSON.parse(localStorage.getItem("unauth_cart"));
      localStorage.setItem(
        "unauth_cart",
        JSON.stringify(
          cartItems?.filter((val: any) => val.product !== item.product.id && val.stockrecord !== item.stockrecord?.id),
        ),
      );
      return updateObject(state, {
        items: [...state.items].filter((val) => val.id !== action.payload),
        count: state.count - 1,
      });
    }

    case actionTypes.CLEAR_CART:
      return initialState;
    case actionTypes.CLEAR_CART_ITEMS:
      return { ...state, count: 0, items: [] };

    case actionTypes.PRODUCT_UPDATE_START:
      return updateObject(state, { itemsUpdating: [...state.itemsUpdating, action.payload] });

    case actionTypes.PRODUCT_UPDATE_SAVE: {
      const items = [...state.items].map((item) => {
        if (item.id === action.payload.lineId) {
          const product = action.payload.data.results?.find((prod: any) => prod.id === item.product.id);
          const stockrecord = product?.stockrecords?.find((val: any) => val.id === item.stockrecord.id);
          return {
            ...item,
            product: { ...item.product, product },
            stockrecord: { ...item.stockrecord, ...stockrecord, errors: item.stockrecord.errors },
          };
        }
        return item;
      });

      return updateObject(state, {
        items,
      });
    }

    case actionTypes.PRODUCT_UPDATE_FINISH:
      return updateObject(state, {
        itemsUpdating: [...state.itemsUpdating].filter((val) => val !== action.payload),
      });

    case actionTypes.CHECKOUT_ERROR: {
      if (action.error.response?.status === 400 && typeof action.error.response?.data === "object") {
        // const stockrecordErrors = action.error.response.data;
        // const ids = Object.keys(stockrecordErrors);
        // const items = [...state.items].map((item) => {
        //   if (ids.includes(item.stockrecord.id.toString())) {
        //     return {
        //       ...item,
        //       stockrecord: { ...item.stockrecord, errors: stockrecordErrors[item.stockrecord.id] },
        //     };
        //   }
        //   return item;
        // });
        return { ...state, needsUpdateCounter: state.needsUpdateCounter + 1 };
      }
      return state;
    }

    case actionTypes.UPDATE_CART_COUNT: {
      return updateObject(state, { count: action.payload });
    }

    default:
      return state;
  }
}
