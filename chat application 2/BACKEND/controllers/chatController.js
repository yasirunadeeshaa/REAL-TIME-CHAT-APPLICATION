const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.findAll({
            where: {
                senderId: senderId,
                receiverId: receiverId,
            },
            order: [["timestamp", "ASC"]],
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
};
