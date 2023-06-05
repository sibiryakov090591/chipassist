import { push } from "react-router-redux";
import { logout } from "@src/store/authentication/authActions";

export default (store) => (next) => (action) => {
  if (
    action.error &&
    action.error.response &&
    action.error.response.status &&
    action.error.response.status === 401 &&
    !window.location.pathname.includes("auth/login")
  ) {
    let backurl = `${window.location.pathname}${window.location.search}`;
    backurl = backurl ? `?backurl=${encodeURIComponent(backurl)}` : "";
    store.dispatch(logout());
    store.dispatch(push(`/auth/login${backurl}`, { background: { pathname: "/" } }));
    return true;
  }
  return next(action);
};
