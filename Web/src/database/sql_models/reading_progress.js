const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const ReadingProgress = sequelize.define('ReadingProgress', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  currentPage: {type: DataTypes.INTEGER, allowNull: true},
  totalPages: {type: DataTypes.INTEGER, allowNull: true},
  percentageComplete: {type: DataTypes.FLOAT, allowNull: true},
  lastReadAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  isCompleted: {type: DataTypes.BOOLEAN, defaultValue: false},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  updatedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
});

// defining relationships, initial revision might be changed later.
ReadingProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ReadingProgress.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
User.hasMany(ReadingProgress, { foreignKey: 'userId', as: 'readingProgress' });
Book.hasMany(ReadingProgress, { foreignKey: 'bookId', as: 'readingProgress' });

module.exports = ReadingProgress; 