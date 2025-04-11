const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Book = sequelize.define('Book', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  coverImage: {type: DataTypes.STRING, allowNull: true},
  audioFile: {type: DataTypes.BLOB('long'), allowNull: false},
  duration: {type: DataTypes.INTEGER, allowNull: false},
  isbn: {type: DataTypes.STRING, allowNull: true, unique: true},
  publicationDate: {type: DataTypes.DATE, allowNull: true},
  genre: {type: DataTypes.STRING, allowNull: true},
  price: {type: DataTypes.DECIMAL(10, 2), allowNull: true},
  isPublished: {type: DataTypes.BOOLEAN, defaultValue: false},
  authorId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
  timestamps: false
});

Book.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Book, { foreignKey: 'authorId', as: 'books' });

module.exports = Book; 