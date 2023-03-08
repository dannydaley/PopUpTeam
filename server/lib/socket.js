const { Server } = require("socket.io");
const crypto = require("crypto");

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_END,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // On connection
  io.on("connection", (socket) => {
    // On join room
    socket.on("join_room", (data) => {
      const roomName = generateRoomName(data.recipient, data.sender);
      socket.join(roomName); // Join a conversation
    });

    // On send message
    socket.on("send_message", (data) => {
      const roomName = generateRoomName(data.recipient, data.sender);
      socket.to(roomName).emit("receive_message", data); // Send to recipient
    });
  });

  return io;
};

// Generate room name
function generateRoomName(recipient, sender) {
  const users = [recipient, sender].sort(); // Sort users
  const hash = crypto.createHash("sha256"); // Create hash
  hash.update(users.join("")); // Join users
  return hash.digest("hex"); // Return hash
};

module.exports = socket;