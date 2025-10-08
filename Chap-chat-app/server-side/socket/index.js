import Message from "../models/Message.js";
import User from "../models/User.js";

const socketInit = (io) => {
    io.on("connection", (Socket) => {
        console.log("socket connected:", Socket.id);

        Socket.on("join room", async ({ username, roomId }) => {
            const user = await User.findOneAndUpdate(
                { username },
                { SocketId: Socket.id, isOnline: true },
                { new: true }
            );
            Socket.join(roomId);
            io.to(roomId).emit("userjoined", { user, roomId });

            Socket.on("typing", () => {
                Socket.to(roomId).emit("typing", username);
            });
            Socket.on("stopTyping", () => {
                Socket.to(roomId).emit("stopTyping", username);
            });
            //send message
            Socket.on("sendMessage", async (data) => {
                const { content, roomId } = data;
                const message = await Message.create({
                    sender: user._id,
                    room: roomId,
                    content: content
                });
                const fullMessage = await message.populate("sender", "username");
                io.to(roomId).emit("newMessage", fullMessage);
            });
            //disconnect
            Socket.on("disconnect", async () => {
                const offlineUser = await User.findOneAndUpdate(
                    { SocketId: Socket.id },
                    { isOnline: false },
                );
                io.emit("userOffline", offlineUser.username);
            });
        });
    });
};

export default socketInit;