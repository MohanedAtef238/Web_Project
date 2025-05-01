const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/users');
const followingRoutes = require('./routes/following');
const bookRoutes = require('./routes/books');
const playlistRoutes = require('./routes/playlists');
const favoriteRoutes = require('./routes/favorites');
const reviewRoutes = require('./routes/review');

const connectMongoDB = require('./config/mongodb');
const { sequelize, syncDatabase } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/follow', followingRoutes);
app.use('/books', bookRoutes);
app.use('/playlists', playlistRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/review', reviewRoutes);

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
    
    // Start server after database connections are established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();

module.exports = app; 