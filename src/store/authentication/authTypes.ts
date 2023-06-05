export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SAVE_VALID_DATA = "SAVE_VALID_DATA";
export const AUTH_PROFILE_R = "AUTH_PROFILE_R";
export const AUTH_PROFILE_S = "AUTH_PROFILE_S";
export const AUTH_PROFILE_F = "AUTH_PROFILE_F";
export const AUTH_PROFILE_SKIP = "AUTH_PROFILE_SKIP";

export const AUTH_SIGNUP_R = "AUTH_SIGNUP_R";
export const AUTH_SIGNUP_S = "AUTH_SIGNUP_S";
export const AUTH_SIGNUP_F = "AUTH_SIGNUP_F";

export const AUTH_LOGIN_R = "AUTH_LOGIN_R";
export const AUTH_LOGIN_S = "AUTH_LOGIN_S";
export const AUTH_LOGIN_F = "AUTH_LOGIN_F";

export const AUTH_LOGOUT_R = "AUTH_LOGOUT_R";
export const AUTH_LOGOUT_S = "AUTH_LOGOUT_S";
export const AUTH_LOGOUT_F = "AUTH_LOGOUT_F";

export const AUTH_MISC_R = "AUTH_MISC_R";
export const AUTH_MISC_S = "AUTH_MISC_S";
export const AUTH_MISC_F = "AUTH_MISC_F";

export const AUTH_MISC_PK_R = "AUTH_MISC_PK_R";
export const AUTH_MISC_PK_S = "AUTH_MISC_PK_S";
export const AUTH_MISC_PK_F = "AUTH_MISC_PK_F";

export const SAVE_EMAIL = "SAVE_EMAIL";
export const SAVE_REGISTER_DATA = "SAVE_REGISTER_DATA";

export const LOGIN_R = "LOGIN_R";
export const LOGIN_S = "LOGIN_S";
export const LOGIN_F = "LOGIN_F";

export const FEEDBACK_R = "FEEDBACK_R";
export const FEEDBACK_S = "FEEDBACK_S";
export const FEEDBACK_F = "FEEDBACK_F";
export const FEEDBACK_START = "FEEDBACK_START";

export interface AuthState {
  token: string | null;
  error: Record<string, any> | null;
  loading: boolean;
  email: string | null;
  registerData: any;
}

interface AuthStartAction {
  type: typeof AUTH_START;
}

interface SaveRegisterDataAction {
  type: typeof SAVE_REGISTER_DATA;
  payload: any;
}

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  token: string;
}

interface AuthFailAction {
  type: typeof AUTH_FAIL;
  error: Record<string, any>;
}

interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

interface AuthSignup {
  type: typeof AUTH_SIGNUP_R | typeof AUTH_SIGNUP_S | typeof AUTH_SIGNUP_F;
  payload?: any;
}

interface SaveValidDataAction {
  type: typeof SAVE_VALID_DATA;
  payload: Record<string, any>;
}

interface SaveEmailAction {
  type: typeof SAVE_EMAIL;
  payload: string;
}

export type AuthActionTypes =
  | SaveRegisterDataAction
  | AuthSignup
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailAction
  | LogoutAction
  | SaveValidDataAction
  | SaveEmailAction;
