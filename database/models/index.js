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
const Game = require('./Game')(sequelize, DataTypes);
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Carrito = require('./carrito')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Asociar modelos
db.Game = Game;
db.Usuario = Usuario;
db.Carrito = Carrito;

// Relaciones
if (typeof Game.associate === 'function') Game.associate(db);
if (typeof Usuario.associate === 'function') Usuario.associate(db);
if (typeof Carrito.associate === 'function') Carrito.associate(db);

module.exports = db;




module.exports = db;

