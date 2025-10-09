import Message from "../models/Message.js";
import User from "../models/User.js";

const socketInit = (io) => {
    io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Always listen for sendMessage once per connection
  socket.on("sendMessage", async (data) => {
    const { content, roomId } = data;
    const user = await User.findOne({ SocketId: socket.id });
    const message = await Message.create({
      sender: user._id,
      room: roomId,
      content
    });
    const fullMessage = await message.populate("sender", "username");

    // Broadcast to everyone except sender (to avoid double message)
    socket.broadcast.to(roomId).emit("newMessage", fullMessage);
  });

  socket.on("join room", async ({ username, roomId }) => {
    const user = await User.findOneAndUpdate(
      { username },
      { SocketId: socket.id, isOnline: true },
      { new: true }
    );
    socket.join(roomId);
    io.to(roomId).emit("userjoined", { user, roomId });
  });

  // Typing events (optional)
  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("typing", username);
  });
  socket.on("stopTyping", ({ roomId, username }) => {
    socket.to(roomId).emit("stopTyping", username);
  });

  // Disconnect
  socket.on("disconnect", async () => {
    const offlineUser = await User.findOneAndUpdate(
      { SocketId: socket.id },
      { isOnline: false }
    );
    io.emit("userOffline", offlineUser?.username);
  });
});

};

export default socketInit;