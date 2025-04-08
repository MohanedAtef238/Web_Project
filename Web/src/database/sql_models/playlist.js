const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Playlist = sequelize.define('Playlist', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  name: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  coverImage: {type: DataTypes.STRING, allowNull: true},
  isPublic: {type: DataTypes.BOOLEAN, defaultValue: true},
  userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  updatedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
});

Playlist.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Playlist, { foreignKey: 'userId', as: 'playlists' });

module.exports = Playlist; 