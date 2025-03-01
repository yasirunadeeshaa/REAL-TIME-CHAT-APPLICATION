const Message = require("../models/Message");

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("sendMessage", async (data) => {
            try {
                const newMessage = await Message.create({
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    message: data.message,
                });

                io.to(data.receiverId).emit("receiveMessage", newMessage);
            } catch (error) {
                console.error("Message saving error:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = chatSocket;
