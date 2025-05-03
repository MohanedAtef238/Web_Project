const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');  // Add this to import socket.io

const userRoutes = require('./routes/users');
const followingRoutes = require('./routes/following');
const bookRoutes = require('./routes/books');
const playlistRoutes = require('./routes/playlists');
const favoriteRoutes = require('./routes/favorites');
const connectMongoDB = require('./config/mongodb');
const { sequelize, syncDatabase } = require('./models');

// Create an express app
const app = express();

// Create an HTTP server with Express
const server = http.createServer(app);

// Initialize Socket.io on top of the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow cross-origin requests (adjust as needed)
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware for handling CORS and JSON parsing
app.use(cors());
app.use(express.json());

// API Routes
app.use('/user', userRoutes);
app.use('/follow', followingRoutes);
app.use('/books', bookRoutes);
app.use('/playlists', playlistRoutes);
app.use('/favorites', favoriteRoutes);

// --- WebRTC Signaling Logic ---
// Socket.io connection and signaling logic
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // When a user joins a room (streaming session)
  socket.on("room:join", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined ${roomId}`);

    const users = io.sockets.adapter.rooms.get(roomId);

    if (users.size > 1) {
      const streamerId = [...users][0]; // First user in the room is the streamer

      io.to(streamerId).emit("room:listener-joined", socket.id); // Notify streamer
      io.to(socket.id).emit("room:streamer-connected", streamerId); // Notify listener
    }
  });

  // Handle WebRTC peer signaling
  socket.on("peer:signal", (targetId, data) => {
    io.to(targetId).emit("peer:signal", socket.id, data); // Forward the signal to the target
    console.log(`Signal from ${socket.id} to ${targetId}`);
  });

  // Handle user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
    // Notify others when a user disconnects (optional)
    if (socket.roomId) {
      socket.to(socket.roomId).emit("peer:disconnect", socket.id);
    }
  });
});

// Initialize databases and start server
const initializeApp = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log('MongoDB connected successfully');
    
    // Authenticate and sync Postgres with Sequelize
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully!');
    
    // Sync database tables
    await syncDatabase();
    
    // Start the server after the database connections are established
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();

module.exports = app;
