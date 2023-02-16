const { Server } = require("socket.io");

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // On connection
  io.on("connection", (socket) => {
    // On send message
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data); // Send to recipient
    });
  });

  return io;
};

module.exports = socket;