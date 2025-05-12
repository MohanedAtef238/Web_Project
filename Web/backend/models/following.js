const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Following = sequelize.define('Following', {
  followerId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  followedId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['followerId', 'followedId']
    }
  ]
});

Following.associate = function(models) {
  Following.belongsTo(models.User, {
    as: 'follower',
    foreignKey: 'followerId',
    onDelete: 'CASCADE'
  });
  Following.belongsTo(models.User, {
    as: 'followed',
    foreignKey: 'followedId',
    onDelete: 'CASCADE'
  });
};

module.exports = Following; 