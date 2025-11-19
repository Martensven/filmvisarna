import { io } from "socket.io-client";

export const sockets = io("http://localhost:5170", {
  transports: ["websocket"], // use websocket for more stable connection
});


sockets.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err);
});
