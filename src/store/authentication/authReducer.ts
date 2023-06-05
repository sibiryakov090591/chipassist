import { getAuthToken } from "@src/utils/auth";
import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./authTypes";
import { AuthActionTypes, AuthState } from "./authTypes";

const initialState: AuthState = {
  token: getAuthToken() || null,
  error: null,
  loading: false,
  email: null,
  registerData: null,
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        error: null,
        loading: true,
      });
    case actionTypes.SAVE_REGISTER_DATA:
      return updateObject(state, {
        registerData: action.payload,
      });
    case actionTypes.AUTH_SIGNUP_S:
      return updateObject(state, {
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_SIGNUP_F:
      return updateObject(state, {
        loading: false,
      });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        registerData: null,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        email: null,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        email: null,
      });
    case actionTypes.SAVE_VALID_DATA:
      return updateObject(state, {
        validTime: action.payload.validTime,
        token: action.payload.token, // TODO: investigate this `action.token`
        email: action.payload.email,
      });
    case actionTypes.SAVE_EMAIL:
      return updateObject(state, {
        email: action.payload,
      });
    default:
      return state;
  }
};

export default authReducer;
