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
const Comment = require('./comment');

const initializeAssociations = () => {
  User.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
  User.hasMany(Playlist, { foreignKey: 'userId', as: 'playlists' });
  User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
  User.hasMany(Following, { as: 'following', foreignKey: 'followerId' });
  User.hasMany(Following, { as: 'followers', foreignKey: 'authorId' });
  User.hasMany(ReadingProgress, { foreignKey: 'userId', as: 'readingProgress' });
  Book.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
  Book.belongsToMany(Playlist, { through: PlaylistBook, foreignKey: 'bookId' });
  Book.hasMany(Favorite, { foreignKey: 'bookId', as: 'favoritedBy' });
  Book.hasMany(ReadingProgress, { foreignKey: 'bookId', as: 'readers' });
  Playlist.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
  Playlist.belongsToMany(Book, { through: PlaylistBook, foreignKey: 'playlistId' });
  Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Favorite.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
  Following.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
  Following.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
  ReadingProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  ReadingProgress.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
};

initializeAssociations();


const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error syncing DB:", error);
  }
};

module.exports = {
  sequelize,
  User,
  Book,
  Playlist,
  PlaylistBook,
  ReadingProgress,
  Favorite,
  Following,
  Review,
  Comment,
  syncDatabase
}; 