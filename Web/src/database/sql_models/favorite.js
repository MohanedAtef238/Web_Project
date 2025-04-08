const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const Favorite = sequelize.define('Favorite', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
  timestamps: false
});

// Define the relationships
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Favorite.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Book.hasMany(Favorite, { foreignKey: 'bookId', as: 'favoritedBy' });

module.exports = Favorite; 