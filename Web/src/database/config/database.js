const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Iqraaly', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


  //delete this sync part after testing
  sequelize.sync({ force: true }) // WARNING: this drops tables if they exist
  .then(() => console.log("Tables created"))
  .catch((err) => console.error("Error syncing DB", err));


module.exports = sequelize; 