import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  if (io) return io; // 🛑 prevent double init

  io = new Server(server, {
    cors: {
      origin: [
        "https://blog-app-giqg.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174"
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
