import { Server } from "socket.io";

let io;

export function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.id);

        socket.on("joinScreening", (screeningId) => {
            socket.join(screeningId);
            console.log(`Socket ${socket.id} joined room ${screeningId}`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected", socket.id);
        });
    });

    return io;
}

export function getIo() {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
}
