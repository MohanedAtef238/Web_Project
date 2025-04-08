const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const ReadingProgress = sequelize.define('ReadingProgress', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  currentTime: {type: DataTypes.INTEGER, allowNull: true}, // Current position in seconds
  duration: {type: DataTypes.INTEGER, allowNull: true}, // Total duration in seconds
  lastPlayedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}, // Tracks when user last interacted with book so we can order them by most recent
  isCompleted: {type: DataTypes.BOOLEAN, defaultValue: false}, // Marked true when user finishes the book
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW} // When user first started the book
}, {
  timestamps: false // We'll manage timestamps manually if we ever need to. so we can only use createdAt attribute
});

// defining relationships, initial revision might be changed later.
ReadingProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ReadingProgress.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
User.hasMany(ReadingProgress, { foreignKey: 'userId', as: 'listeningProgress' });
Book.hasMany(ReadingProgress, { foreignKey: 'bookId', as: 'listeners' });

module.exports = ReadingProgress; 