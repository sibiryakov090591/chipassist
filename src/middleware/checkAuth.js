import { authCheckState } from "@src/store/authentication/authActions";
import { getAuthToken } from "@src/utils/auth";

export default (store) => (next) => (action) => {
  const localToken = getAuthToken();
  const profile_refreshed = sessionStorage.getItem("profile_refreshed");
  const stateToken = store.getState().auth?.token;
  if (localToken && !profile_refreshed && !stateToken) {
    sessionStorage.setItem("profile_refreshed", "true");
    store.dispatch(authCheckState());
  }

  return next(action);
};
