// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Connect to the WebSocket server

// eslint-disable-next-line react/prop-types
const Chat = ({ currentUser, chatPartner }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/messages/${currentUser}/${chatPartner}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error("Error fetching messages:", error));

    socket.on(`receiveMessage-${currentUser}`, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup function
    return () => {
        socket.off(`receiveMessage-${currentUser}`);
    };
    }, [currentUser, chatPartner]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { sender_id: currentUser, receiver_id: chatPartner, message };
            socket.emit("sendMessage", newMessage);
            setMessages((prev) => [...prev, newMessage]); // Optimistically update UI
            setMessage("");
        }
    };

    return (
        <div style={{ width: "400px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>Chat with User {chatPartner}</h3>
            <div style={{ height: "300px", overflowY: "auto", borderBottom: "1px solid #ccc" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ 
                        textAlign: msg.sender_id === currentUser ? "right" : "left",
                        padding: "5px"
                    }}>
                        <strong>{msg.sender_id === currentUser ? "You" : `User ${msg.sender_id}`}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ width: "80%", padding: "5px" }}
                />
                <button onClick={sendMessage} style={{ padding: "5px", marginLeft: "5px" }}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
