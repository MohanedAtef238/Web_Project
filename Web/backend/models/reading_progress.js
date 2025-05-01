const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReadingProgress = sequelize.define('ReadingProgress', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  currentTime: {type: DataTypes.INTEGER, allowNull: true}, // Current position in seconds
  duration: {type: DataTypes.INTEGER, allowNull: true}, // Total duration in seconds
  lastPlayedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}, // Tracks when user last interacted with book
  isCompleted: {type: DataTypes.BOOLEAN, defaultValue: false}, // Marked true when user finishes the book
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW} // When user first started the book
}, {
  timestamps: false // We'll manage timestamps manually if we ever need to
});

ReadingProgress.associate = function(models) {
  ReadingProgress.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  ReadingProgress.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
};

module.exports = ReadingProgress; 