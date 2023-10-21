const Sequelize = require('sequelize');
const UserModel = require('./user');
const OrderModel = require('./order');

const sequelize = new Sequelize('timarttestdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

const models = {
  User: UserModel(sequelize, Sequelize),
  Order: OrderModel(sequelize, Sequelize),
  sequelize,
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = models;
