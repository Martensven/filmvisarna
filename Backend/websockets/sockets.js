import { Server } from "socket.io";

let io;
const pendingSeatsMap = {};   // { screeningId: Set([...seatIds]) }
const socketSeatMap = {};     // { socket.id: Set([...seatIds]) }

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.on("joinScreening", (screeningId) => {
      socket.join(screeningId);
      socket.data.screeningId = screeningId;
      console.log(`🎟️ Socket ${socket.id} joined screening ${screeningId}`);

      // Send the current state to the new user
      const pending = Array.from(pendingSeatsMap[screeningId] || []);
      socket.emit("seatUpdate", { bookedSeats: [], pendingSeats: pending });
    });

    socket.on("seatSelect", ({ screeningId, seatId }) => {
      if (!pendingSeatsMap[screeningId]) pendingSeatsMap[screeningId] = new Set();
      if (!socketSeatMap[socket.id]) socketSeatMap[socket.id] = new Set();

      // Add the seat to both maps
      pendingSeatsMap[screeningId].add(seatId);
      socketSeatMap[socket.id].add(seatId);

      console.log(`🟡 Seat selected: ${seatId} (screening: ${screeningId})`);
      io.to(screeningId).emit("seatUpdate", {
        bookedSeats: [],
        pendingSeats: Array.from(pendingSeatsMap[screeningId]),
      });
    });

    socket.on("seatUnselect", ({ screeningId, seatId }) => {
      if (pendingSeatsMap[screeningId]) pendingSeatsMap[screeningId].delete(seatId);
      if (socketSeatMap[socket.id]) socketSeatMap[socket.id].delete(seatId);

      console.log(`⚪ Seat unselected: ${seatId} (screening: ${screeningId})`);
      io.to(screeningId).emit("seatUpdate", {
        bookedSeats: [],
        pendingSeats: Array.from(pendingSeatsMap[screeningId] || []),
      });
    });

    socket.on("leaveScreening", (screeningId) => {
      console.log(`🚪 Socket ${socket.id} left ${screeningId}`);
      socket.leave(screeningId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
      const screeningId = socket.data.screeningId;

      // Remove that user's pending seats
      if (screeningId && socketSeatMap[socket.id]) {
        for (const seatId of socketSeatMap[socket.id]) {
          if (pendingSeatsMap[screeningId]) pendingSeatsMap[screeningId].delete(seatId);
        }
        delete socketSeatMap[socket.id];

        console.log(`🧹 Cleaned up seats for ${socket.id}`);
        io.to(screeningId).emit("seatUpdate", {
          bookedSeats: [],
          pendingSeats: Array.from(pendingSeatsMap[screeningId] || []),
        });
      }
    });
  });

  return io;
}

export function getIo() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}