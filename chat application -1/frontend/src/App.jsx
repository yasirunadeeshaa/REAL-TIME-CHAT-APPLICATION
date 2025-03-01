// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Chat from "./components/Chat";

function App() {
    const [currentUser] = useState(1); // Example logged-in user ID
    const [chatPartner, setChatPartner] = useState(2); // Default chat partner ID

    return (
        <div className="app">
            <h1>Chat System</h1>
            <label>Select Chat Partner:</label>
            <select onChange={(e) => setChatPartner(Number(e.target.value))}>
                <option value={2}>Chat with User 2</option>
                <option value={3}>Chat with User 3</option>
            </select>
            <Chat currentUser={currentUser} chatPartner={chatPartner} />
        </div>
    );
}

export default App;


