/*DIFERENTE PRUEBA DE CONEXION*/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PAGINA', 'PaginaJ', 'Pagina123', {
  host: 'localhost',    
  dialect: 'mssql',
  port: 1433,                    // Asegúrate que es el correcto
  dialectOptions: {
    options: {
      encrypt: false,           // Si no usas SSL
      trustServerCertificate: true
    }
  },
  logging: false
});

module.exports = sequelize;


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente');
  } catch (error) {
    console.error('❌ Error conectando:', error);
  }
})();
