const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Playlist = require('./playlist');
const Book = require('./book');

const PlaylistBook = sequelize.define('PlaylistBook', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  playlistId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Playlists', key: 'id'}},
  bookId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Books', key: 'id'}},
  order: {type: DataTypes.INTEGER, allowNull: true},
  addedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
});

Playlist.belongsToMany(Book, { through: PlaylistBook, foreignKey: 'playlistId' });
Book.belongsToMany(Playlist, { through: PlaylistBook, foreignKey: 'bookId' });

module.exports = PlaylistBook; 