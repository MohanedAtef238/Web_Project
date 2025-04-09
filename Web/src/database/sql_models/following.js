const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Following = sequelize.define('Following', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  followerId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  authorId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW} 
}, {
  timestamps: false,
});

Following.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
Following.belongsTo(User, { as: 'author', foreignKey: 'authorId' });


User.hasMany(Following, { as: 'following', foreignKey: 'followerId' });
User.hasMany(Following, { as: 'followers', foreignKey: 'authorId' }); 

module.exports = Following; 