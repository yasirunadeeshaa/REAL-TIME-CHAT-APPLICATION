require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }, // Allow frontend to connect
});

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Replace with your MySQL password
    database: "chatdb",
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
        process.exit(1);
    }
    console.log("✅ MySQL Connected...");
});

// ✅ Store message in MySQL
const saveMessage = (sender_id, receiver_id, message) => {
    const query = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
    db.query(query, [sender_id, receiver_id, message], (err) => {
        if (err) console.error("DB Error:", err);
    });
};

// ✅ WebSocket Connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", ({ sender_id, receiver_id, message }) => {
        saveMessage(sender_id, receiver_id, message);

        // Emit message to the specific receiver
        io.emit(`receiveMessage-${receiver_id}`, { sender_id, message });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ✅ Fetch Chat History API
app.get("/messages/:sender_id/:receiver_id", (req, res) => {
    const { sender_id, receiver_id } = req.params;
    const query = `
        SELECT * FROM messages 
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?) 
        ORDER BY timestamp ASC`;
    
    db.query(query, [sender_id, receiver_id, receiver_id, sender_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
