import { io } from "socket.io-client";

export const sockets = io("http://localhost:4321", {
  transports: ["websocket"], // use websocket for more stable connection
});

sockets.on("connect", () => {
  console.log("✅ Connected to backend socket:", sockets.id);
});

sockets.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err);
});
