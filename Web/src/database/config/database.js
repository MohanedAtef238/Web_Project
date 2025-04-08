const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookstore_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize; 