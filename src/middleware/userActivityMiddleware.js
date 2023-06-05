import SocketClient from "@src/services/SocketClient";
import { userActivity, userActivityPing } from "@src/constants/defaults";

const socketClient = userActivity ? new SocketClient("user", true) : null;

export default (store) => (next) => (action) => {
  if (!userActivity) return next(action);
  const activity = localStorage.getItem("activity");
  if (!store.getState().auth.token) return next(action);
  if (!activity) {
    localStorage.setItem("activity", Date.now());
    socketClient.send({ active: true });
  }
  if (parseInt(activity) + userActivityPing * 60000 < Date.now()) {
    socketClient.send({ active: true });
    localStorage.setItem("activity", Date.now());
  }
  return next(action);
};
