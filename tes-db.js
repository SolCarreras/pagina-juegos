require('dotenv').config();
const { Sequelize } = require('sequelize');
const cfg = require('./database/config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQL Server OK');
    await sequelize.close();
  } catch (err) {
    console.error('❌ Error conectando:', err);
  }
})();
