const { Sequelize, DataTypes  } = require ("sequelize");
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions
  }
);

// Cargar modelos
const Game = require('./Game')(sequelize);

const Usuario = require('./Usuario')(sequelize, DataTypes);



const db = {};
db.sequelize = sequelize;

db.Game = Game;
db.Usuario = Usuario;

module.exports = db;

