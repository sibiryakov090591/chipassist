import { DependencyList, useEffect } from "react";
import { searchTransport } from "@src/constants/defaults";
import { useSocketClient } from "@src/services/SocketClient";

interface RestFunc {
  (): void;
}

export function useRestTransport(fn: RestFunc, deps: DependencyList) {
  useEffect(() => {
    if (searchTransport === "rest") {
      fn();
    }
  }, [...deps]);
}

interface WebsocketConfig {
  beforeConnect?: () => void;
  afterConnect: (socketClient: any) => {};
}

export function useWebsocketTransport(endpoint: string, config: WebsocketConfig, deps: DependencyList) {
  const socketClient = useSocketClient(endpoint ?? "");
  useEffect(() => {
    if (searchTransport === "websocket") {
      if (config.beforeConnect) {
        config.beforeConnect();
      }
      if (socketClient.connected) {
        config.afterConnect(socketClient);
      }
    }
  }, [...deps, socketClient.connected]);
}

export function invokeRestTransport(fn: RestFunc) {
  if (searchTransport === "rest") {
    fn();
  }
}

export function invokeWebsocketTransport(fn: () => void) {
  if (searchTransport === "websocket") {
    fn();
  }
}
