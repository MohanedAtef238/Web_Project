const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserInteraction = sequelize.define('UserInteraction', {
  userId: { type: DataTypes.UUID, allowNull: false },
  bookId: { type: DataTypes.UUID, allowNull: false },
  actionType: { type: DataTypes.STRING, allowNull: false }, // viewed, played, liked

  // Added these 2 for recs
  genre: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
}, {
  timestamps: false 
});

module.exports = UserInteraction;
