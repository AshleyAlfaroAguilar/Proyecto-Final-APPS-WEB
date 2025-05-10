const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('FRIENDS', 'postgres', '1234567', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
});

module.exports = sequelize;
