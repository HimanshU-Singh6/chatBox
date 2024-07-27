import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

const getSocket = () => {
  const token = localStorage.getItem('token')
  return socketio(import.meta.env.VITE_SOCKET_URI, {
    withCredentials: true,
    auth: { token },
  });
};

const SocketContext = createContext({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
