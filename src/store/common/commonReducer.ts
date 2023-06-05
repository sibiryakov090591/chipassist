import constants from "@src/constants/constants";
import { ID_ELFARO } from "@src/constants/server_constants";
import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./commonTypes";

// let isShowQuickButton = localStorage.getItem("isShowQuickButton") === "true";
let isShowQuickButton = true;
if (!localStorage.getItem("isShowQuickButton") && constants.id === ID_ELFARO) {
  // isShowQuickButton = Math.random() < 0.5;
  isShowQuickButton = true;
  localStorage.setItem("isShowQuickButton", `${isShowQuickButton}`);
}

const initialState: actionTypes.CommonState = {
  isShowQuickButton,
  shouldUpdateBackend: 0,
  shouldUpdateCard: 0,
  addedProduct: null,
  utm: {},
};

export default function common(state = initialState, action: actionTypes.CommonActionTypes) {
  switch (action.type) {
    case actionTypes.SHOULD_UPDATE_BACKEND:
      return { ...state, shouldUpdateBackend: state.shouldUpdateBackend + 1 };
    case actionTypes.SHOULD_UPDATE_CARD:
      return { ...state, shouldUpdateCard: state.shouldUpdateCard + 1 };
    case actionTypes.ADD_PRODUCT_TO_CART_BLOCK: {
      return updateObject(state, {
        addedProduct: { ...action.payload },
      });
    }
    case actionTypes.DELETE_PRODUCT_CART_BLOCK: {
      return updateObject(state, {
        addedProduct: null,
      });
    }
    case actionTypes.SAVE_UTM: {
      return updateObject(state, {
        utm: action.payload,
      });
    }
    default:
      return state;
  }
}
