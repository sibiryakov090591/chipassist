// import * as Sentry from "@sentry/react";
import { apiHost, searchTransport } from "@src/constants/defaults";
import { getAuthToken } from "@src/utils/auth";

function WebSocketError(message, url) {
  this.name = "WebSocket";
  this.url = url || "";
  this.message = message || "";
}
WebSocketError.prototype = Error.prototype;

// function onError(err) {
//   const my_err = new WebSocketError(`Error while connecting to ${err.currentTarget.url}`, err.currentTarget.url);
//   // Sentry.captureException(my_err);
//   throw my_err;
// }

class SocketClient {
  constructor(iface, hardUse = false) {
    this.iface = iface;
    this.url = `wss://${apiHost}:8443/ws/${iface}/`;
    this.connected = false;
    this.actionsStack = [];
    this.reconnectTime = 1000;

    if (searchTransport === "websocket" || hardUse) this.connect();
  }

  connect = () => {
    try {
      this.ws = new WebSocket(this.url);
      this.ws.onopen = (e) => this.onOpen(e);
      this.ws.onclose = this.onClose;
      // this.ws.onerror = onError;
    } catch (e) {
      console.log(`Websocket ERROR: ${e}`);
    }
  };

  onOpen = () => {
    this.connected = true;
    this.actionsStack.forEach((data) => this.ws.send(JSON.stringify({ ...data, token: getAuthToken() })));
    console.log("ws connected");
  };

  onClose = (e) => {
    if (e.wasClean) {
      console.log("ws disconnected good");
    } else {
      console.log(`Code: ${e.code} reason: ${e.reason}`);
      this.connected = false;
      // setTimeout(() => {
      //  this.ws = new WebSocket(this.url);
      //  this.connected = true;
      // this.reconnectTime += 1000;
      // }, this.reconnectTime);
    }
  };

  onMessage = (fn) => {
    this.ws.onmessage = (e) => {
      try {
        JSON.parse(e.data);
      } catch {
        const my_err = new WebSocketError(`${e.data}`, e.currentTarget.url);
        // Sentry.captureException(my_err);
        throw my_err;
      }

      fn(JSON.parse(e.data));
    };
  };

  send = (data) => {
    if (!this.ws) {
      return false;
    }
    switch (this.ws.readyState) {
      case 0: {
        this.actionsStack.push(data);
        break;
      }
      case 2:
      case 3: {
        this.actionsStack.push(data);
        this.connected = false;
        this.connect();
        break;
      }
      default: {
        this.ws.send(JSON.stringify({ ...data, token: getAuthToken() }));
        break;
      }
    }

    return true;
  };
}

export default SocketClient;
