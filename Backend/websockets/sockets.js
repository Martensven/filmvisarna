import { Server } from "socket.io";

let io;

const pendingSeatsMap = {};
const socketSeatMap = {};

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.on("joinScreening", (screeningId) => {
      socket.join(screeningId);
      socket.data.screeningId = screeningId;
      console.log(`🎟️ Socket ${socket.id} joined screening ${screeningId}`);

      const pendingArray = pendingSeatsMap[screeningId]
      ? Array.from(pendingSeatsMap[screeningId]).map(([seatId, owner]) => ({ seatId, owner, })): [];

      socket.emit("seatUpdate", {
        pendingSeats: pendingArray,
      });
    });


    socket.on("seatSelect", ({ screeningId, seatId }) => {
      if (!pendingSeatsMap[screeningId])
        pendingSeatsMap[screeningId] = new Map();
      if (!socketSeatMap[socket.id])
        socketSeatMap[socket.id] = new Set();

      pendingSeatsMap[screeningId].set(seatId, socket.id);
      socketSeatMap[socket.id].add(seatId);

      console.log(`🟡 Seat selected: ${seatId} (by ${socket.id})`);

      const pendingArray = Array.from(pendingSeatsMap[screeningId]).map(
        ([id, owner]) => ({ seatId: id, owner })
      );

      io.to(screeningId).emit("seatUpdate", {
        pendingSeats: pendingArray,
      });
    });

    socket.on("seatUnselect", ({ screeningId, seatId }) => {
      if (
        pendingSeatsMap[screeningId] &&
        pendingSeatsMap[screeningId].get(seatId) === socket.id
      ) {
        pendingSeatsMap[screeningId].delete(seatId);
      }
      if (socketSeatMap[socket.id]) socketSeatMap[socket.id].delete(seatId);

      console.log(`⚪ Seat unselected: ${seatId} (by ${socket.id})`);

      const pendingArray = Array.from(pendingSeatsMap[screeningId] || []).map(
        ([id, owner]) => ({ seatId: id, owner })
      );

      io.to(screeningId).emit("seatUpdate", {
        pendingSeats: pendingArray,
      });
    });

    socket.on("leaveScreening", (screeningId) => {
      console.log(`🚪 Socket ${socket.id} left ${screeningId}`);
      socket.leave(screeningId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
      const screeningId = socket.data.screeningId;

      if (screeningId && socketSeatMap[socket.id]) {
        for (const seatId of socketSeatMap[socket.id]) {
          if (
            pendingSeatsMap[screeningId] &&
            pendingSeatsMap[screeningId].get(seatId) === socket.id
          ) {
            pendingSeatsMap[screeningId].delete(seatId);
          }
        }
        delete socketSeatMap[socket.id];

        console.log(`🧹 Cleaned up seats for ${socket.id}`);

        const pendingArray = Array.from(pendingSeatsMap[screeningId] || []).map(
          ([id, owner]) => ({ seatId: id, owner })
        );

        io.to(screeningId).emit("seatUpdate", {
          pendingSeats: pendingArray,
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
