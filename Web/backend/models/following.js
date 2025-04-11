const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Following = sequelize.define('Following', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  followerId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  followedId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id'}},
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW} 
}, {
  timestamps: false,
});

Following.associate = function(models) {
  Following.belongsTo(models.User, { as: 'follower', foreignKey: 'followerId' });
  Following.belongsTo(models.User, { as: 'followed', foreignKey: 'followedId' });
};

module.exports = Following; 