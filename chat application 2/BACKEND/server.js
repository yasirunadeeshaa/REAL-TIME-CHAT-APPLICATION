const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");
const chatSocket = require("./sockets/chatSocket");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Initialize WebSocket
chatSocket(io);
// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//server.listen(3000, () => console.log("server running on port 3000")


