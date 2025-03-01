# Real-time Chat System

## Overview

This is a real-time chat system built with **Node.js, Express, WebSockets (Socket.io), MySQL**, and **React** (frontend). It supports **real-time messaging** and **message history storage**.

## Features

- Real-time messaging using **WebSockets (Socket.io)**
- Message history stored in **MySQL**
- REST API to fetch previous chat messages
- Frontend integration using **React.js**

---

## Technologies Used

### Backend

- **Node.js**
- **Express.js**
- **Socket.io** (WebSockets for real-time communication)
- **MySQL** (for message storage)
- **cors** (for handling CORS issues)
- **dotenv** (for environment variables)

### Frontend

- **React.js**
- **Socket.io-client** (for WebSocket connection)
- **Axios** (for API calls)

---

## Installation & Setup

### Prerequisites

- Install **Node.js** and **MySQL**

### Backend Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-repo/chat-system.git
   cd chat-system
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create a `.env` file** in the project root and add:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=chatdb
   ```

4. **Setup MySQL Database**

   ```sql
   CREATE DATABASE chatdb;
   USE chatdb;

   CREATE TABLE messages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       sender_id INT NOT NULL,
       receiver_id INT NOT NULL,
       message TEXT NOT NULL,
       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the server**
   ```sh
   node server.js
   ```
   Server will start on **http://localhost:5000**

### Frontend Setup

1. **Navigate to frontend folder**
   ```sh
   cd frontend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start React app**
   ```sh
   npm start
   ```

---

## API Endpoints

### Fetch Chat History

**GET** `/messages/:sender_id/:receiver_id`

- Fetches previous messages between two users

**Example Request:**

```sh
GET http://localhost:5000/messages/1/2
```

**Response:**

```json
[
  {
    "id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "Hello!",
    "timestamp": "2024-02-20 12:00:00"
  }
]
```

---

## WebSocket Events

### Send Message

- **Event:** `sendMessage`
- **Payload:** `{ sender_id, receiver_id, message }`

### Receive Message

- **Event:** `receiveMessage-<receiver_id>`
- **Payload:** `{ sender_id, message }`

---

## Future Enhancements

- User authentication (JWT)
- Typing indicators
- Group chats
- Read receipts

---

## License

MIT License

---

## Author

Developed by **[Your Name]** 🚀
