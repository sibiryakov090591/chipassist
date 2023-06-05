import { useEffect, useMemo } from "react";
import SocketClient from "./SocketClient";

const useSocketClient = (iface, hardUse = false) => {
  const socketClient = useMemo(() => new SocketClient(iface, hardUse), [iface, hardUse]);

  useEffect(() => {
    return () => {
      if (socketClient.ws) socketClient.ws.close(1000, "Job done");
    };
  }, []);

  return {
    connected: socketClient.connected,
    send: socketClient.send,
    onMessage: socketClient.onMessage,
  };
};

export default useSocketClient;
