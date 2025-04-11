const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
  timestamps: false
});

Favorite.associate = function(models) {
  Favorite.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Favorite.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
};

module.exports = Favorite; 