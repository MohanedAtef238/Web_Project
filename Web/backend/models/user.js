const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true}, // https://sequelize.org/docs/v7/models/data-types/#uuids according to this it is the best datatype for assigning primary keys and will help us when indexing in the future as it isnt incrementing. so we can apply it while making use for the trees that make up the database.
  username: {type: DataTypes.STRING, allowNull: false, unique: true},
  email: {type: DataTypes.STRING, allowNull: false, unique: true},
  bio: {type: DataTypes.STRING, allowNull: true},
  password: {type: DataTypes.STRING, allowNull: false}, // Password validation will be added in frontend and backend
  isAuthor: {type: DataTypes.BOOLEAN, defaultValue: false}, // this was added to change the view of the profile for authors and non-authors
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
  timestamps: false 
});

User.associate = function(models) {
  User.hasMany(models.Book, { foreignKey: 'authorId', as: 'books' });
  User.hasMany(models.Favorite, { foreignKey: 'userId', as: 'favorites' });
  User.hasMany(models.Following, { 
    as: 'following',
    foreignKey: 'followerId',
    sourceKey: 'id'
  });
  User.hasMany(models.Following, { 
    as: 'followers',
    foreignKey: 'followedId',
    sourceKey: 'id'
  });
  User.hasMany(models.ReadingProgress, { foreignKey: 'userId', as: 'readingProgress' });
};

module.exports = User; 