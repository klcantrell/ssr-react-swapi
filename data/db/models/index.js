const Sequelize = require('sequelize');
const config = require('../config/config');
const User = require('./user');
// const Score = require('./score');

const db = {};

let sequelize;
if (config.use_aws) {
  sequelize = new Sequelize(config.use_aws, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); 
}

const modelModules = [
  User,
  // Score,
];

modelModules.forEach((modelModule) => {
  const model = modelModule(sequelize, Sequelize);
  db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;