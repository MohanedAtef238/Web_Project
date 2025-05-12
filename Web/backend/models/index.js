const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./user');
const Book = require('./book');
const Playlist = require('./playlist');
const PlaylistBook = require('./playlist_book');
const ReadingProgress = require('./reading_progress');
const Favorite = require('./favorite');
const Following = require('./following');
const Review = require('./review');

// Create an object with all models
const models = {
  User,
  Book,
  Playlist,
  PlaylistBook,
  ReadingProgress,
  Favorite,
  Following,
  Review
};

// Initialize associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

// Sync database function
const syncDatabase = async () => {
  try {
    // First sync without force to preserve data
    await sequelize.sync({ force: false });
    
    // Then sync with alter to add any missing tables/columns
    await sequelize.sync({ alter: true });
    
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error syncing DB:", error);
    throw error; // Re-throw to handle it in the calling code
  }
};

// Export everything
module.exports = {
  sequelize,
  ...models,
  syncDatabase
}; 