import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { getEnvironmentKey, getUserId } from "../utils";

const SocketContext = React.createContext<SocketIOClient.Socket | undefined>(
  undefined
);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    const host = getEnvironmentKey("SERVER_HOST");
    const port = getEnvironmentKey("SERVER_PORT");

    const _socket = io(`http://${host}:${port}`, {
      path: "/chat",
      query: {
        userId: getUserId(),
      },
    });

    setSocket(_socket);

    return () => {
      _socket.close();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
