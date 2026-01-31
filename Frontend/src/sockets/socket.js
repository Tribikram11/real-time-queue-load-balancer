import { io } from "socket.io-client";

export const createSocket = (role, id) => {
  return io("http://localhost:5000", {
    query: { role, id },
  });
};
