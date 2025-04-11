const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  coverImage: {type: DataTypes.STRING, allowNull: true},
  audioFile: {type: DataTypes.BLOB('long'), allowNull: true},
  duration: {type: DataTypes.INTEGER, allowNull: false},
  isbn: {type: DataTypes.STRING, allowNull: true, unique: true},
  publicationDate: {type: DataTypes.DATE, allowNull: true},
  genre: {type: DataTypes.STRING, allowNull: true},
  isPublished: {type: DataTypes.BOOLEAN, defaultValue: false},
  authorId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
  timestamps: false
});

Book.associate = function(models) {
  Book.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  Book.belongsToMany(models.Playlist, { through: models.PlaylistBook, foreignKey: 'bookId' });
  Book.hasMany(models.Favorite, { foreignKey: 'bookId', as: 'favoritedBy' });
  Book.hasMany(models.ReadingProgress, { foreignKey: 'bookId', as: 'readers' });
};

module.exports = Book; 